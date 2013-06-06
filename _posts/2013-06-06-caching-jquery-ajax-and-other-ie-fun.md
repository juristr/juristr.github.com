---
layout: post
title: "Caching, jQuery Ajax and Other IE Fun"
description: ""
show_img_in_detail: false
category: 
tags: [WebDev, JavaScript]
---

In the last couple of days I had quite a fun time debugging problems of our JavaScript SPAs on oldIE (thanks God we got the Browserstack licenses). Anyway, I encountered some quite interesting behavior of IE with jQuery Ajax calls and cached responses.

## "HTTP/1.1 304 Not Modified": No Way! You Won't Catch Me

To have this experiment work, ensure you have your browser caches active.

![](/blog/assets/imgs/chrome_cacheenabled.png)

Take the following ajax request to a static JSON file

    $.ajax({
            url: '/data.json',
            type: 'GET',
            dataType: 'JSON',
            success: function(data, textStatus, jqXHR){
                console.log('Data received: ' + data);
            }
        });

The first request probably returns with a `Http/1.1 200 OK` while any subsequent (if caching is activated on the server) will return with a `Http/1.1 304 Not Modified`. You nicely see this in Chrome's Network panel

![](/blog/assets/imgs/jsonfile_cached.png)

Now, assume you'd like to perform some operation just on `Http/1.1 200` and not on `304` requests as well. Easy enough, right? You simply check against the `jqXHR.status` object:

    ...
    success: function(data, textStatus, jqXHR){
        if(jqXHR.status === 200){
            console.log('Got a good request');
        }
    }

Interestingly though, for the above request I'd get

    Got a good request
    Got a good request
    Got a good request

...printed on my console and indeed, when checking against the jqXHR request, the `jqXHR.status` returns `200` for `Http/1.1 200` as well as for `Http/1.1 304`. Why this?? This is **by design of the XMLHttpRequest** object.

> For 304 Not Modified responses that are a result of a user agent generated conditional request the user agent must act as if the server gave a 200 OK response with the appropriate content. \[...\] <cite><a href="http://www.w3.org/TR/2009/WD-XMLHttpRequest-20091119/">w3c.org [RFC2616]</a></cite>

### Wait..there is a way!

Actually there is a way to also get the `304` status codes in your jQuery ajax callback. Again:

> [...] The user agent must allow setRequestHeader() to override automatic cache validation by setting request headers (e.g., If-None-Match, If-Modified-Since), in which case 304 Not Modified responses must be passed through. <cite><a href="http://www.w3.org/TR/2009/WD-XMLHttpRequest-20091119/">w3c.org [RFC2616]</a></cite>

But note, you don't have access to the browser's `If-Modified-Since` or E-Tag information. jQuery however keeps track about it and allows you to use the `ifModified` flag on the ajax options:

    $.ajax({
        url: '/data.json',
        type: 'GET',
        dataType: 'JSON',
        ifModified:true,
        success: function(data, textStatus, jqXHR){
            if(jqXHR.status === 200){
                console.log('Got a good request');
            } else {
                console.log('Hey, a 304 request');
            }

            console.log('Data: ' + data);
        }
    });

Executing this now again, where the first request returns a 200 and the subsequent ones a 300 response status gives me the following on the log:

    Got a good request
    Data: <snip>JSON string</snip>
    Hey, a 304 request
    Data: undefined
    Hey, a 304 request
    Data: undefined

Hell, wtf?? Yep, again this is by design:

> \[...\] in which case 304 Not Modified responses must be passed through \[...\]

..and indeed, a `304` response does not carry any data.

## Ok, but Why Should This Be An Issue?

Normally it won't, just don't put the `ifModified` flag and you're fine. In my specific scenario however, I had to analyze for changes in a specific response header, so I used the `ajaxComplete(..)` function like

    var currentHeaderVal = undefined;

    $(document).ajaxComplete(function(e, xhr, settings){
        var newHeaderVal = xhr.getResponseHeader('MY-HEADER');
        if(currentHeaderVal !== newHeaderVal){
            //do something fancy
        }
    });

On the server-side some mechanism injected the `MY-HEADER` value. The idea is simple and it also works (on Chrome, Firefox and any other decent browser) but, surprise, surprise, on IE it doesn't. When using `xhr.getResponseHeader('MY-HEADER')`, IE returns the **headers from the previously cached request** which obviously are not necessarily valid any more.

As such, the idea was to check the `xhr.status` in order to just read the headers from `200` type requests, like

    var newHeaderVal = xhr.getResponseHeader('MY-HEADER');
    if(xhr && xhr.status === 200){
        if(currentHeaderVal !== newHeaderVal){
            //do something fancy
        }
    }

...but as we know now, that won't work.

## Links

- [http://bugs.jquery.com/ticket/8394](http://bugs.jquery.com/ticket/8394)
- [http://forum.jquery.com/topic/how-to-fix-browser-cache-and-notmodified-respond-for-json-jquery-ajax-ifmodified-true-break-on-data-respond](http://forum.jquery.com/topic/how-to-fix-browser-cache-and-notmodified-respond-for-json-jquery-ajax-ifmodified-true-break-on-data-respond)