---
title: How to add a reading time indicator to your blog in ten minutes
description: ''
show_img_in_detail: true
coverimage: true
category: null
categories:
  - JavaScript
  - The Desk
reposts:
  - 'http://css.dzone.com/articles/how-add-reading-time-indicator'
date: 2013-07-23T00:00:00.000Z
comments: true
url: /blog/2013/07/how-to-setup-reading-time-indicator-ten-minutes
type: post
image: /blog/assets/imgs/reading-time_banner.png
---

Time is money, right, and given that nowadays we are continuously being flooded with an enormous amount of information, we need to be fast in consuming it and particularly good at filtering what's worth and what isn't. "Read it later" services such as [Instapaper](http://www.instapaper.com/) or [Pocket](http://getpocket.com/) are flourishing, but when do you decide to read something immediately or later? Often depending on how long it takes to read and how much time you have right now. Therefore, many popular blogging platforms (i.e. Medium for instance) have added a reading time indicator on top of each post. I just had a couple of minutes of time and tried to add it to my blog here and was surprised how simple it is.

## How does it work?

Reading speed is measured in words per minute (short: wpm). An average person reads between 200 and 250 wpm. As such the formula for the reading time is nothing more than the number of words in your blog post divided by the reading speed of an average person.

                            total words
    reading time =  round(-----------------)
                            reading speed

On my blog here I use 200 wpm, so even with some distractions in between you should be able to read it in the displayed amount of time.

## Implementation

For the implementation we use JavaScript. It's the easiest way to process your text on the site once it is rendered. But of course, if your blogging platform allows to process it statically, before rendering, you might use that approach as well.

The first thing to do is to **count the number of words of your post**. You should have one DOM element which contains your post body. For instance on my blog:

    <div class="article-body">
        ...
    </div>

**Rule 1:** Google for your problem. There's quite a high probability someone had the same problem already before, and probably even better than you might have done it (otherwise simply extend and [contribute](/blog/2012/02/dont-rant-become-social-and-contribute/)). 

Indeed, [Countable](http://radlikewhoa.github.io/Countable/) seems to be exactly what I was searching for.

> Countable is a JavaScript function to add live paragraph-, word- and character-counting to an HTML element. Countable is a zero-dependency library and comes in at 1KB when minified and gzipped. <cite><a href="http://radlikewhoa.github.io/Countable/">Countable GitHub site</a></cite>

While it could even count your words live, in this special case we need to perform it just once. This is done with

    Countable.once($('.article-body')[0], function (counter) {
        console.log(counter)
    })

`counter` is an object with the following properties

    Object {
        paragraphs: 21, 
        words: 377, 
        characters: 1834, 
        all: 2252
    }

Now it really becomes quite easy. The **calculation of the minutes** is done as follows

    Countable.once($('.article-body')[0], function (counter) {
        var wpm = 200,
            estimatedRaw = counter.words / wpm,
            minutes = Math.round(estimatedRaw);

        var effectiveTime = (minutes < 1) ? "a couple of secs" : minutes + " min read";

        //display it
        $('.reading-time').html(effectiveTime);
    });

That's it. 

<figure class="image--medium">
    <img src="/blog/assets/imgs/reading_time.png" />
    <figcaption>Screenshot of the reading time indicator on this blog here</figcaption>
</figure>

This example **shows only the minutes**. Given that it is an approximation, displaying seconds doesn't really make sense, but if you wish you can easily also accomplish that.  
As you can see, I _perform a rounding_ as the division by the wpm gives you values like for instance `2.3122`. 2 represents the minutes, while the remainder 0.3122 represents the seconds. Simply multiply them by 60 and you get the actual values. In JavaScript this could be realized like:  
_(check the code below as I didn't try it explicitly)_

    var wpm = 200,
        estimatedRaw = counter.words / wpm,
        remainder = estimatedRaw % 1,
        minutes = estimatedRaw - remainder,
        seconds = Math.round(remainder * 60);

## Shortcomings

Obviously it is quite difficult to also consider source code reading which requires not only to read the words but certainly more mental analysis and understanding.

_(Image source: images.google.com)_
