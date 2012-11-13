---
layout: post
title: "Output Caching in ASP.net MVC"
description: ""
category: 
tags: [ASP.net MVC, C#, WebDev]
reposts: ["http://dotnet.dzone.com/articles/output-caching-aspnet-mvc", "http://www.dotnetcodegeeks.com/2012/11/output-caching-in-asp-net-mvc.html"]
---
{% include JB/setup %}

Although nowadays most of us have broadband connections, resource caching is important as loading a resource from your local HD is (by now) still faster than fetching it remotely. In this post I'd like to explore how to control the ASP.net MVC caching behavior and its effects when using ajax requests for retrieving data.

## Default ASP.net MVC Caching Behavior
If you don't specify anything at all and you have a plain normal action method like

    public JsonResult Details(long id)
    {
        //snip snip
        return Json(theResult, JsonRequestBehavior.AllowGet);
    }

then ASP.net MVC will return the response with the following headers:

    Cache-Control:private
    Connection:Close
    Content-Length:81836
    Content-Type:application/json; charset=utf-8
    Date:Mon, 29 Oct 2012 08:08:44 GMT
    Server:ASP.NET Development Server/11.0.0.0
    X-AspNet-Version:4.0.30319
    X-AspNetMvc-Version:3.0

According to the offical W3.org docs, `Cache-Control:private` ...

> ...Indicates that all or part of the response message is intended for a single user and MUST NOT be cached by a shared cache. This allows an origin server to state that the specified parts of the response are intended for only one user and are not a valid response for requests by other users. A private (non-shared) cache MAY cache the response.

As a result, the browser might cache such ajax request made by a JavaScript client, which most of the time might not be desired. Especially our beloved IE used a massive caching approach leading to strange effects.

## Disabling Caching Behavior
Lets first take a look on how to completely disable caching.

### Globally on the Server (Custom Approach)
If we want to completely disable any kind of caching behavior, we could employ a kind of brute force approach by implementing a **custom global action filter** that sets the corresponding headers:

    public class MvcApplication : System.Web.HttpApplication
    {
        ...
         public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new NoCacheGlobalActionFilter());
        }
        ...
    }

    public class NoCacheGlobalActionFilter : ActionFilterAttribute
    {
        public override void OnResultExecuted(ResultExecutedContext filterContext)
        {
            ...
            HttpCachePolicyBase cache = filterContext.HttpContext.Response.Cache;
            cache.SetCacheability(HttpCacheability.NoCache);
            
            base.OnResultExecuted(filterContext);
        }
    }

The response headers will vary as follows:

    Cache-Control:no-cache
    Connection:Close
    Content-Length:81836
    Content-Type:application/json; charset=utf-8
    Date:Mon, 29 Oct 2012 08:48:40 GMT
    Expires:-1
    Pragma:no-cache
    Server:ASP.NET Development Server/11.0.0.0
    X-AspNet-Version:4.0.30319
    X-AspNetMvc-Version:3.0

Note the `Cache-Control ` and `Expires` header that has been added. This will prevent any kind of caching, on the server as well as on the client side.

### Globally on the Server (OutputCache)
But rather than creating a custom filter, why not just re-use something existing. ASP.net has already a build-in caching mechanism called **OutputCache**. It is quite powerful and I'll go into more detail soon. As a result you could annotate your controller as follows

    [OutputCache(Duration = 0)]
    public class SomeController : Controller  {

    }

in order to prevent caching. Consequently the response headers contain a `Cache-Control: public, max-age=0` header.

Attention, you could also specify the following in your web.config:

    <caching>
        <outputCache enableOutputCache="false" />
    </caching>

However, this won't prevent caching. Instead it just indicates that **no kind of caching** mechanism should be applied. By just disabling the output cache we get the default cache headers used by ASP.net MVC which falls back to `Cache-Control: private`, thus again opening the browser the possibility to cache requests.

### On the Client-Side using jQuery
Beside disabling the cache on the server-side, you also have the possibility to control the caching behavior on the client-side. [jQuery's ajax](http://api.jquery.com/jQuery.ajax/) - for instance - allows you to specify a `cache` flag. Lets look at its effects. Executing an ajax request with

    $.ajax({
        type: 'GET',
        url: '/nation',
        ...
    });

uses the following headers:

    GET /nation HTTP/1.1
    Host: localhost:4120
    Connection: keep-alive
    X-Requested-With: XMLHttpRequest
    User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4
    Referer: http://localhost:4120/frontend/accounts/index.html
    Accept-Encoding: gzip,deflate,sdch
    Accept-Language: en,de;q=0.8,en-US;q=0.6,it;q=0.4
    Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.3

and answers with

    HTTP/1.1 200 OK
    Server: ASP.NET Development Server/11.0.0.0
    Date: Mon, 29 Oct 2012 08:54:35 GMT
    X-AspNet-Version: 4.0.30319
    X-AspNetMvc-Version: 3.0
    Cache-Control: private
    Content-Type: application/json; charset=utf-8
    Content-Length: 81836
    Connection: Close

Instead, by using setting `cache: false` like

    $.ajax({
        type: 'GET',
        cache: false,
        url: '/nation',
        ...
    });

the request headers look as follows

    GET /nation?_=1351500913222 HTTP/1.1
    Host: localhost:4120
    Connection: keep-alive
    X-Requested-With: XMLHttpRequest
    User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4
    Referer: http://localhost:4120/frontend/accounts/index.html
    Accept-Encoding: gzip,deflate,sdch
    Accept-Language: en,de;q=0.8,en-US;q=0.6,it;q=0.4
    Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.3

The response parameters don't vary. But note that jQuery adds an additional, random generated request parameter `_=...` which is used to enforce a cache invalidation.

## Enable Caching
Before I illustrated how to disable caching behavior. Now I'd like to take a look on how to enable it.

### On the Server Side
While you could easily write your custom caching attribute using action filters, there is no need at all. ASP.net has the **OutputCache** mechanism which also provides a `OutputCacheAttribute` that can be applied to Controller actions. For instance we could decorate our controller action like

    [OutputCache(Duration=3, VaryByParam="*")]
    public JsonResult Details(long id)
    {
        //snip snip
        return Json(theResult, JsonRequestBehavior.AllowGet);
    }

This causes the following response headers to be injected:

    HTTP/1.1 200 OK
    Server: ASP.NET Development Server/11.0.0.0
    Date: Mon, 29 Oct 2012 09:18:35 GMT
    X-AspNet-Version: 4.0.30319
    X-AspNetMvc-Version: 3.0
    Cache-Control: public, max-age=3
    Expires: Mon, 29 Oct 2012 09:18:37 GMT
    Last-Modified: Mon, 29 Oct 2012 09:18:34 GMT
    Vary: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 81836
    Connection: Close

Those of interest here are `Cache-Control`, `Expires` and `Last-Modified`.

### Client Side Caching
We could potentially also enforce client-side caching mechanisms. I'm thinking about using techniques that have been made available with HTML5 like

- [ApplicationCache](http://www.html5rocks.com/en/tutorials/appcache/beginner/)
- [Client-side storage](http://www.html5rocks.com/en/tutorials/offline/storage/) such as localStorage and sessionStorage

To what regards the localStorage approach, there exists a nice jQuery plugin on GitHub which might be worth looking at: [jQuery-ajax-jstorage-cache](https://github.com/nectify/jquery-ajax-jstorage-cache) (with a [fork by Paul Irish](https://github.com/paulirish/jquery-ajax-localstorage-cache) as well).

## Conclusion: Caching Where and When I need It
In a real world application you'd obviously expect to have a proper combination of disabling/enabling the cache where appropriate. This implies to have the possibility to use an approach where you define a global default which can be overwritten where needed. 

The approach I applied is to enforce **disabling of the cache on a global basis** for then enabling it on an as-needed basis. That is, all our controllers inherit from a custom `BaseController` class which performs some additional common work. I then annotated that class as follows

    [OutputCache(Duration=0, VaryByParam="*")]
    public class BaseController : Controller
    { ... }

On those action methods where I explicitly desire caching behavior I can now add the OutputCache attribute to enforce it:

    public class SomeController : BaseController
    {
        public JsonResult UnCachedAction(){ ... }

        [OutputCache(Duration=60, VaryByParam="id")]
        public JsonResult CachedAction(long id){ ... }
    }

This turns out to be quite powerful as the amount of custom code involved is kept at a minimum. If you're interested in using the OutputCache mechanism I'd suggest you to also take a look at custom [Cache Profiles](http://goo.gl/sSPZt).