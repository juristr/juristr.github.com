---
layout: post
title: "Strange Error When Downloading File in IE8 from SSL Site"
date: 2012-07-16
comments: true
tags: [  ASP.net MVC, Web dev ]
---

A couple of days ago, one of our clients called indicating that he wasn't able to download a file from our server. The file was basically generated on the fly from our ASP.net MVC backend. I tried it and obviously it <a href="http://www.codinghorror.com/blog/2007/03/the-works-on-my-machine-certification-program.html" target="_blank">"worked on my machine"</a>. After quite some investigation it turned out that nice, lovely IE played his role again.

> Internet Explorer cannot download the &lt;file&gt; from &lt;server&gt;.  
> Internet Explorer was not able to open this Internet site. The requested site is either unavailable or cannot be found. Please try later.

The following error basically:<br />

![](/blog/assets/imgs/downloaderrorcaching.png)
 
 The ASP.net MVC backend method looked very simple actually, something like:

    public FileResult GenerateReportForSomeData(FormCollection data)
    {
        //snip snip: call aspose to render the PDF report
        return new File(fileData, "application/pdf", filename);
    }

The JavaScript client fired up the invocation of the url, the browser executed that and got a file download instruction back which worked perfectly in Chrome, Firefox and IE9 (surprisingly). **IE8 failed**!

When inspecting the response headers I got

    Cache-Control: no-cache
    Content-Disposition: attachment; filename=mygeneratedreport.pdf
    Content-Length: 76997
    Content-Type: applictaion/pdf
    Pragma: no-cache
    Expires: -1

..and some others. **Note the caching headers** instructing the browser to **not cache** the response. Oh yes, I remember, added them to prevent strange side effects, given that we don't want to have caching on our JSON REST Api if not specified explicitly (btw, [here's a SO question open if you can answer](http://stackoverflow.com/questions/10892924/overriding-caching-defined-in-global-actionfilter); I was already successful in fixing this in some 1st trials, but that's another story).

But, yep, unsurprisingly it turns out IE really has a problem with cache control headers when downloading files from a SSL protected site: [http://support.microsoft.com/kb/316431](http://support.microsoft.com/kb/316431)  
Basically, when it sees a `no-cache` header then rather than not caching the resource it interprets it as that it shouldn't be possible to save the file to the local disk.

## The Solution
There is no clean solution for this problem, all you can do is to create a hack and limit it to the cases where it should apply, that is in case of a file download if the browser is IE and its version is less than v9.

By default I have a BaseController class on each of my ASP.net MVC3 controllers which handles some shared endpoints for me. On that I had added an `[OutputCache(Duration=0)]` in order to prevent any kind of caching by default. [See this article](blog/2012/10/output-caching-in-aspnet-mvc/) for further details. To fix the mentioned IE bug I had to override the default [OutputCacheAttribute](http://aspnetwebstack.codeplex.com/SourceControl/changeset/view/e6ea9683f1db#src/System.Web.Mvc/OutputCacheAttribute.cs) as follows ([plz refer to this gist for eventual updates](https://gist.github.com/4633225)):

    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Web;
    using System.Web.Mvc;

    namespace Juristr.Mvc
    {
        /// <summary>
        /// Custom OutputCache to overcome a bug in IE8:
        /// - http://support.microsoft.com/kb/316431
        /// - http://blogs.msdn.com/b/ieinternals/archive/2009/10/02/internet-explorer-cannot-download-over-https-when-no-cache.aspx
        /// - http://stackoverflow.com/questions/13119340/ie6-8-unable-to-download-file-from-https-site
        /// </summary>
        public class EnhancedOutputCacheAttribute : OutputCacheAttribute
        {

            public override void OnActionExecuted(ActionExecutedContext filterContext)
            {

                if (!IsFileResultAndOldIE(filterContext))
                    base.OnActionExecuted(filterContext);
                else
                {
                    //try the best to avoid any kind of caching
                    filterContext.HttpContext.Response.Cache.SetCacheability(HttpCacheability.Private);
                    filterContext.HttpContext.Response.Cache.SetMaxAge(new TimeSpan(0));
                    filterContext.HttpContext.Response.Cache.SetExpires(DateTime.Now.AddMinutes(-5D));
                }
            }

            public override void OnActionExecuting(ActionExecutingContext filterContext)
            {
                if (!IsFileResultAndOldIE(filterContext))
                    base.OnActionExecuting(filterContext);
            }

            public override void OnResultExecuted(ResultExecutedContext filterContext)
            {
                if (!IsFileResultAndOldIE(filterContext))
                    base.OnResultExecuted(filterContext);
            }

            public override void OnResultExecuting(ResultExecutingContext filterContext)
            {
                if (!IsFileResultAndOldIE(filterContext))
                    base.OnResultExecuting(filterContext);
            }

            /// <summary>
            /// 
            /// </summary>
            /// <param name="filterContext"></param>
            /// <returns><c>true</c> for FileResults and if the browser is < IE9</returns>
            private bool IsFileResultAndOldIE(dynamic filterContext)
            {
                return filterContext.Result is FileResult &&
                       filterContext.HttpContext.Request.IsSecureConnection &&
                       string.Equals(filterContext.HttpContext.Request.Browser.Browser, "IE", StringComparison.OrdinalIgnoreCase) &&
                       filterContext.HttpContext.Request.Browser.MajorVersion < 9;
            }

        }
    }

Any better solution for this?? Plz drop me a line.