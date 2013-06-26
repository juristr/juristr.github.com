---
layout: post
title: "Server Cannot Append Header After HTTP Headers Have Been Sent"
description: ""
category: 
tags: [ASP.net]
---

TL;DR: Calling Response.End() is absolutely evil! Avoid it whenever possible. A couple of days ago a coworker send me an exception log entry from his application asking for some help on debugging it. The exception wasn't totally new to me as I encountered it already in the context of setting caching headers in an ASP.net MVC application.

The error occured at `System.Web.HttpResponse.AppendHeader` and said

> Server cannot append header after HTTP headers have been sent

I knew the potential culprit (or at least the one provocating the exception) was one of our shared HttpModules we use for handling single-signon authentication throughout our apps. Basically, in the `EndRequest` event the code looked like (pseudo code):

    void context_EndRequest(object sender, EventArgs e)
    {
        if (a != b)
        {
            ...
            HeaderUtils.SetMyCustomHeader("myValue");
            ...
        }
    }

The essence of the code above is that in certain circumstances a header value is being set in the `EndRequest` event and that line cause the exception to throw.
