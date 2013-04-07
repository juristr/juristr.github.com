---
layout: post
title: "Post Back breaks on IIS Redirect To Default Page"
description: ""
category:
tags: [ASP.net, troubleshooting]
---

A couple of days ago one of my work mates asked for help about an issue he was having in his application. The problem was basically that the application didn't seem to react to postbacks, but strangely only on the `Default.aspx` page. After quite a while of debugging and fiddling around, I was able to break it down to being an issue of the default page redirect done by IIS.

## The Story

IIS was configured to load and return the so-called "default page" to the client when accessing the application on its root using an extension less URL like `http://myserver.com/`. In that specific case `Default.aspx` page was returned. When now performing a postback on that site it just didn't work. The browser sent the form values but inspecting the server-side trace information they didn't arrive at the page and thus the post-back wasn't recognized. Note, this would also mean no click handlers would be fired etc.  
On the other side, when I accessed the application with its full path like `http://myserver.com/Default.aspx` everything worked as excpected.

## The Culprit

Since the the Default.aspx page didn't contain  anything strange that could have such effect, I started to selectively switch off our registered HttpModules and look there, it turned out that one of them seemed to be the culprit.

So having

- the module active and
- accessing the application at `http://myserver.com/`

**didn't work** while deactivating the module or by directly invoking `Default.aspx` **it worked** instead.

I was able to break the problem down to the following line in the `HttpModule:

    var argument = httpRequest.Form["__EVENTARGUMENT"];

Why the hell should this line break the post-back values??

When you encounter problems of this kind in an HttpModule the best way is to take a look at its life cycle and start moving the suspicious code line through the events from the earliest to the latest one in the life cycle. And see there, when moving the code above to the later `PostRequestHandlerExecute`event, it started working. It seemed like accessing the form's NameValueCollection to early, it breaks and any subsequent accesses in later events get an empty collection. Hence, also the `Default.aspx` page's events don't work because there are no POST values sent to it.

<table class="table table-striped">
    <tbody>
        <tr>
            <td>BeginRequest</td>
            <td>fail</td>
        </tr>
        <tr>
            <td>AuthenticateRequest</td>
            <td>fail</td>
        </tr>
        <tr>
            <td>AuthorizeRequest</td>
            <td>fail</td>
        </tr>
        <tr>
            <td>ResolveRequestCache</td>
            <td>fail</td>
        </tr>
        <tr>
            <td>AcquireRequestState</td>
            <td>fail</td>
        </tr>
        <tr>
            <td>PreRequestHandlerExecute</td>
            <td>fail</td>
        </tr>
        <tr>
            <td><b>PostRequestHandlerExecute</b></td>
            <td><b>success</b></td>
        </tr>
        <tr>
            <td>ReleaseRequestState</td>
            <td>success</td>
        </tr>
        <tr>
            <td>UpdateRequestCache</td>
            <td>success</td>
        </tr>
        <tr>
            <td>EndRequest</td>
            <td>success</td>
        </tr>
    </tbody>
</table>

Interesting, so the request handler has to first execute, otherwise the POST values are lost, but why? There's no exception being thrown.

## The Root Cause

After some research I finally identified the root cause of why this problem happens. It is due to how IIS in ASP.net 4 handles requests made to the application root (i.e. `http://myserver.com/`). ASP.net 4 renders an empty form action when a request to an extensionless url is made that resolves to a default document.

    <form name="aspnetForm" method="post" action="" id="aspnetForm">

A POST with an empty form action causes subtle changes in how it is being processed by IIS and ASP.net:

> When the action attribute is an empty string, the IIS DefaultDocumentModule object will create a child request to Default.aspx. Under most conditions, this child request is transparent to application code, and the Default.aspx page runs normally. <cite><a href="http://www.asp.net/whitepapers/aspnet4/breaking-changes#0.1__Toc256770154" rel="nofollow">ASP.net 4 Breaking Changes</a></cite>

So far so good, but that doesn't explain why the post-back breaks, right! The real problem is due to the **interaction between managed and integrated mode**.

> However, a potential interaction between managed code and IIS 7 or IIS 7.5 Integrated mode can cause managed .aspx pages to stop working properly during the child request. <cite><a href="http://www.asp.net/whitepapers/aspnet4/breaking-changes#0.1__Toc256770154" rel="nofollow">ASP.net 4 Breaking Changes</a></cite>

The whitepaper mentions a couple of conditions where such odd behavior may happen:

1. An .aspx page is sent to the browser with the form element’s action attribute set to "".
1. The form is posted back to ASP.NET.
1. A **managed HTTP module** reads some part of the entity body. For example, a module reads **Request.Form** or **Request.Params**. This causes the entity body of the POST request to be read into managed memory. As a result, the entity body is no longer available to any native code modules that are running in IIS 7 or IIS 7.5 Integrated mode.
1. The IIS **DefaultDocumentModule** object eventually runs and creates a child request to the Default.aspx document. However, because the entity body has already been read by a piece of managed code, there is no entity body available to send to the child request.
1. When the HTTP pipeline runs for the child request, the handler for .aspx files runs during the handler-execute phase.
1. Because there is no entity body, there are no form variables and no view state, and therefore no information is available for the .aspx page handler to determine what event (if any) is supposed to be raised. As a result, none of the postback event handlers for the affected .aspx page run.

In my specific situation it was the HttpModule which accessed the `Request.Form` for checking the presence of a specific event argument. As a result, when transitioning to the child request of the `Default.aspx` document, the entity body was no more available. **<===????**

    <modules runAllManagedModulesForAllRequests="true">
        <add name="Company.Web.TestModule" type="Company.Web.TestModule, Company.Web" />
    </modules>

## Solution: Simply Redirect

The simplest solution (if we can call it like that) is to simply prevent IIS to make the internal default page redirection and instead execute the redirect by yourself.

Place a redirect file on the root, like an a `default.asp`, an `index.html` or something that will be executed before the `Default.aspx`. The simplest probably being

    <html>
    <head>
    <meta http-equiv="refresh" content="0,URL='Default.aspx'">
    </head>
    <body></body>
    </html>

## Solution: Add the ManagedHandler Precondition

...

> **The ManagedHandler Precondition:**  
> IIS 7.0 introduces a new managed extensibility model. Handlers and Modules can now be written in managed code and directly integrated into the IIS request pipeline. But switching between managed and native code is an expensive operation. The managedHandler precondition was introduced to allow optimizing the performance of requests where no managed code needs to be involved, for example when static files (.html, .jpg etc.) are served. No managed code is called if the request is served by a native handler and every managed module is configured with the managedHandler precondition. A practical scenario is Forms authentication. The managed Forms authentication module has a managedHandler precondition and is therefore only called when ASP.NET content (e.g. \*.aspx) pages are requested. If a .html page is requested the forms authentication is not called. If you want to protect all your content with forms authentication you can simply remove the managedHandler precondition from the Forms authentication module entry. <cite><a href="http://blogs.iis.net/thomad/archive/2006/11/04/precondition-what.aspx" rel="nofollow">Achtung! IIS7 Preconditions</a></cite>


For instance, the f

- native, integrated mode invokes module which accesses the FormBody
- Then managed part gets called but at that point, the FormBody has already been read and as such it is no more available.
- when moving the access to a later stage causes the child http handler to first invoke the FormBody and thus preserves the original namevalue collection

http://www.asp.net/whitepapers/aspnet4/breaking-changes#0.1__Toc256770154


The main issue here is that you **won't get any exception at all** when accessing `HttpRequest.Form` too early. Why? I decompiled it and discovered that internally it calles a method `HttpValueCollection EnsureForm()` on the `HttpRequest` object which has the following logic:

    internal HttpValueCollection EnsureForm()
    {
        if (this._form == null)
        {
            this._form = new HttpValueCollection();
            if (this._wr != null)
            {
                this.FillInFormCollection();
            }
            this._form.MakeReadOnly();
        }
        return this._form;
    }

It basically simply creates a new (and in the exceptional situation) empty collection which is ultimately returned by the property `Form`. Any subsequent call will finish in returning that empty collection which is why my application didn't get any event arguments from the `POST`.


## Solution

When accessing the form collection in the `PostRequestHandlerExecute` it seems to work. When placed in any of the events before, the request to `http://myserver.com/` gets the request eventarguments and any following handlers don't. This is probably due to accessing the form collection.

Open Questions:

- Why does the /register get it and the following handler not, mainly because the Form is present and read correctly
- Why did I not get the Form values in the original AuthenticationModule??
- Why does it work when directly accessing the `/default.aspx` site?? Must be related to the redirect internally

## Links

- http://stackoverflow.com/questions/5353667/accessing-the-form-collection-in-an-ihttpmodule-causes-event-handler-not-to-get
- http://stackoverflow.com/questions/7197020/httpmodule-is-breaking-postback-events
- http://stackoverflow.com/questions/11048863/modules-runallmanagedmodulesforallrequests-true-meaning


