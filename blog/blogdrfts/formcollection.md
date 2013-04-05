---
layout: post
title: "FormCollection problem - HTTPModule"
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

When you encounter problems of this kind in an HttpModule the best way is to take a look at its life cycle and start moving the suspicious code line through the events from the earliest to the latest one in the life cycle. And see there, when moving the access to the `httpRequest.Form` to the later `PostRequestHandlerExecute`event, it started working. It seemed like accessing the form's NameValueCollection to early, it breaks and any subsequent accesses in later events get an empty collection. Hence, also the `Default.aspx` page's events don't work because there are no POST values sent to it.

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

But you don't get any exception at all. The Form collection is simply empty. Since I got curious, I took ILSpy to decompile the `Form` property and my expectations got confirmed. The first instruction when the property gets invoked is a call to `HttpValueCollection EnsureForm()` on the `HttpRequest` object which has the following logic:

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

As you can see, the method instantiates a new `HttpValueCollection`in case the form is null and initializes it with the current form values.

- `Form` gets invoked at a point when there are no values

## The Root Cause

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

## Naive Solution - Redirect

Place a redirect file on the root, like an a `default.asp`, an `index.html` or something that will be executed before the `Default.aspx`. The simplest probably being

    <html>
    <head>
    <meta http-equiv="refresh" content="0,URL='Default.aspx'">
    </head>
    <body></body>
    </html>

## Solution

When accessing the form collection in the `PostRequestHandlerExecute` it seems to work. When placed in any of the events before, the request to `http://myserver.com/` gets the request eventarguments and any following handlers don't. This is probably due to accessing the form collection.

Open Questions:

- Why does the /register get it and the following handler not, mainly because the Form is present and read correctly
- Why did I not get the Form values in the original AuthenticationModule??
- Why does it work when directly accessing the `/default.aspx` site?? Must be related to the redirect internally

## Links

- http://stackoverflow.com/questions/5353667/accessing-the-form-collection-in-an-ihttpmodule-causes-event-handler-not-to-get
- http://stackoverflow.com/questions/7197020/httpmodule-is-breaking-postback-events


