---
layout: post
title: "Simulate a slow network connection"
description: ""
category: bliki
tags: []
---

I guess that I don't have to start talking about the importance of testing in the software development process. There are couple of different kind of tests which I'm not going to mention now, but generally speaking a good test should verify the correct implementation of the business requirements but also test the software on its boundaries and edge cases.

## From a User's Perception
Beside automated tests, often a good indicator might also be the personal perception when using the software. Sounds strange, but **how does it feel** to use the application. Is it fluid, responsive or rather laggy and inconvenient to use. These kind of indicators are often hard to objectively define but they count a lot and might contribute more to the overall user satisfaction than you might actually think.

Couple of days ago I got inspired by a Tweet between [Addy Osmani](https://twitter.com/addyosmani) and [Sindre Sorhus](https://twitter.com/sindresorhus):

<figure>
    <img src="/blog/assets/imgs/addy_sindre_tweetnetspeed.png" />
    <figcaption><a href="https://twitter.com/sindresorhus/status/291537387975229440">Tweet</a> between Addy and Sindre about speed throttling tools</figcaption>
</figure>

## Do you Test your Application under Different Network Speeds?? How often?
I can just remember to have done it once because it was an explicit non-functional requirement from our customer as there where people connecting through 56k modems(!!).  When I regularly did it was when doing mobile development with Android. There it's a must as mobile connections are highly vulnerable in terms of network connection failures or speed differences. Depending on your user's [internet service provider](http://www.clearinternetservice.org/) or general connectivity, there might be quite different kind of network speeds.

But what about web applications, especially when creating rich JavaScript web clients where you have a lot of caching possibilities.

## How to Simulate Different Network Types

### On Windows
There are several tools available for windows. Probably the simplest approach is to use [Fiddler2](http://www.fiddler2.com/fiddler2/), a tool which you should have installed anyway as a web developer. Just download and start it. In the menu, there's an entry called "Rules", open it and navigate to "Performance". There you should see an item called **"Simulate Modem Speeds"**.

<figure>
    <img src="/blog/assets/imgs/fiddler2modemspeed.png" />
    <figcaption>Fiddler2</figcaption>
</figure>



[Plugin for delaying response](http://fiddlerdelayext.codeplex.com/)


### On OSX