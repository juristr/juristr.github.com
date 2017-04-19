---
layout: post
title: "Boot your ajax app: Creating a splash screen with NProgress"
lead: "Make your app look awesome"
postimg: "/blog/assets/imgs/ajax-splash.png"
show_img_in_detail: true
coverimage: false
category: 
tags: ["JavaScript", "CSS"]
---

While single-page JavaScript apps tend to be more dynamic and usually more interactive from the user point of view, they also most often have a longer startup time compared to more classic, server-side rendered apps. That's usually where progress indicators and splash screens come into play.

{% assign message = "IMPORTANT: I was naive. Using progress bars is an antipattern and should be avoided. Rather try to optimize startup using strategies such as code splitting, lazy loading, caching with service workers, or even pre-rendering on the server." %} 
{% include warn-notice.html %}

Obviously, the focus should clearly lie in optimizing the startup time to the maximum possible in order to avoid having the need for a splash screen at all. But as we all know that doesn't always work out.

Instead, what I really hate is when you see the app loading in pieces, meaning, you see how the JS app is being constructed while starting up, seing HTML views being added and filled with data while it is being received from some server-backend. I guess we can agree upon the fact that this is not the best user experience we can possibly have.

What I usually do when starting up my SPA (Single Page App) is to..

1. hide the main HTML DOM container where your app lives in (often `<div class='container js-appcontainer' style="display:none"></div>`)
1. show some progress indicator, signaling the user that something is going on
1. meanwhile start your JavaScript app, loading all of the required resources, including further JS files, view templates, data from backend through ajax calls, etc..
1. once finished, show the app container -> `$('.js-appcontainer').fadeIn('fast')`
1. hide the progress indicator

See - for instance - how GMail does it:

<figure>
  <img src="/blog/assets/imgs/ajax-gmail.png" />
  <figcaption>GMail progress indicator</figcaption>
</figure>

In the simplest case you show an animated gif and that's it. In a more sophisticated approach you might want to show the user some degree of real-time progress as the app loads. **[NProgress](http://ricostacruz.com/nprogress/)** ([GitHub](https://github.com/rstacruz/nprogress)) might be a nice option in that case.

<figure>
  <img src="/blog/assets/imgs/nprogress-demo.gif" />
  <figcaption>NProgress demo</figcaption>
</figure>

The hard part about (non-infinite) progress bars is to properly advance the progress indicator based on the work that is being done and that's where NProgress really shines. You start it with a simple `NProgress.start()` and it will advance indefinitely. By then using `NProgress.inc()` in your loading logic, you can then make it advance a little faster before you then call `NProgress.done()` when you're finished.

I used this kind of approach in one of our apps, however the client noted that it might be too unimpressive, in the sense that people might not see the progress indicator. Well, fair enough, it's the client, so an alternative would be to have a screen-centered splash-screen like approach we know from common desktop apps. But still, I didn't want to leave NProgress behind, mainly due to the simplicity in its usage.

## Splash screen with NProgress

As such I quickly hacked down the following prototype. I basically came up with the this HTML template...

    <div class="splash card">
        <div role="spinner">
            <div class="spinner-icon"></div>
        </div>
        <img class="img-circle" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png">
        <p class="lead" style="text-align:center">Please wait...</p>
        <div class="progress">
            <div class="mybar" role="bar">
        </div>
        </div>
    </div>

...which I configured to be rendered by NProgress:

    NProgress.configure({
        template: splashHtml
    });

`splashHtml` is a variable that holds the HTML code shown above. Ideally this comes from some templating engine, otherwise simple inline the HTML in your JS code. Some CSS to make it pretty (and obviously include Bootstrap for some more awesomeness)...

      .splash {
        position:absolute;
        top:40%;
        left:0;
        right:0;
        margin: auto;
      }

      .splash img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        height: 100px;
        width: 100px;
      }

      .card {
        background-color: #f7f7f7;
        padding: 20px 25px 15px;
        margin: 0 auto 25px;
        width: 380px;
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
      }

      .mybar {
        background: #29d;
        height:2px;
      }

      .progress {
        height: 2px;
      }

      .spinner-icon {
        position: absolute;
        right: 20px;
      }

_(Don't take that too serious...I'm not a designer, nor did I optimize it)_

...and voilá, the result:

<figure>
  <img src="/blog/assets/imgs/splash-demo.gif" />
  <figcaption>Splash screen demo</figcaption>
</figure>

Obviously feel free to exchange the img with your application logo..this one is just a placeholder I quickly grabbed from the Google Login window.  
Also note that I used Bootstrap which adds some nicer font-style and moreover handles the progress bar position using the `.progress` class. If you want to avoid that, simply add the missing CSS styles by yourself.

You can **find the entire code** in this JsFiddle: [http://jsfiddle.net/juristr/PmLCM/1/](http://jsfiddle.net/juristr/PmLCM/1/)

## How do I wait for all ajax requests to terminate??

An issue you might encounter is on how you can wait for all ajax requests to terminate in order to know when the app really finished starting and is ready for being shown to the user. With jQuery it turns out to be quite straightforward. `$.active` returns the number of active ajax calls and hence, by polling this variable you can determine when the app finished loading:

    // wait till all ajax calls are done
    var checkAjaxCalls = function () {
        if ($.active > 0) {
            setTimeout(checkAjaxCalls,300);
        } else {
            //all done
            $('.js-splashscreen').hide();
            $('.js-container').fadeIn();
            NProgress.done();
        }
    };
    checkAjaxCalls();
