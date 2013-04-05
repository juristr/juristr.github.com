---
layout: post
title: "FormCollection problem - HTTPModule"
description: ""
category:
tags: [ASP.net, troubleshooting]
---

I was hunting quite a nice bug/strange behavior of our system the last couple of **days** (yes, days...). Actually, the strange effect came out in the context of another issue.

## The Problem

- Form NameValueCollection is empty at postback
- Happens only if you access the Form NameValueCollection inside a module and
- if you access your app in the root on IIS, like `http://myserver.com/` whereas it works with `http://myserver.com/Default.aspx`.

## The Root Cause

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


