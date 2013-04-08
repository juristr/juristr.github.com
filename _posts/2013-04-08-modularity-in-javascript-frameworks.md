---
layout: post
title: "Modularity in JavaScript MVC Frameworks"
description: ""
postimg: /blog/assets/imgs/jmvc_observer.png
show_img_in_detail: true
category: 
tags: [JavaScript, Software Architecture]
---

JavaScript MVC architectures are a de-facto standard when you create complex single-page JavaScript applications. But it doesn't stop here. MVC helps to separate reponsibilities for coordinating the data (model) and visualization (view), but it doesn't have a concept for coordination among an application's modules or widgets as you might call them.

## Modules? I don't Have Anything Similar to that!

Modules is probably not the right term in JavaScript applications, better call 'em **widgets**. A widget is something atomic with a clear responsibility, a **mini-app** basically that can be instantiated (possibly multiple times) on an arbitrary part of your application. You might not be accustomed to think from such perspective and therefore start straight off without building your app. That might work just fine initially, but once it gets more complex you'll get into trouble for sure. Therefore, next time when you start building something bigger, stop for a moment and try to identify possible widgets.

Consider for example GitHub's site:

<figure>
    <img src="/blog/assets/imgs/githubsite_modular_widgets.png" />
    <figcaption>Some potential widgets of the GitHub site</figcaption>
</figure>

I just quickly went over its UI and the marked regions "might" possibly be independent widgets (but I'm sure there are even more than those). 

Separating your application into smaller parts is essential for keeping your architecture clean, reusable and mainly maintainable. The principle is a known concept in computer science: "divide and conquer". 

Smaller parts have

- lower complexity
- are easier to test
- easier to extend
- cause less headaches
- (etc...)


## But Wait: My Widgets Have to Communicate!

Sure, modules (or widgets) within your application need to communicate with each other. Such communication creates dependencies as _widget A_ needs to have a reference to _widget B_ if it needs to invoke some operation on it, right? Well, not necessarily, as that would again couple those widgets together and you couldn't exchange _widget B_ arbitrarily without having to also change _widget A_.

Therefore, a common practice for creating a modular architecture is to decouple communication among components through **event broadcasting** mechanisms. Candidates are pub/sub architectures but also the Observer pattern. Below are just some frameworks I picked out that target the issue of modularizing large-scale applications.

### AuraJS - Widget Architecture for Backbone

![](/blog/assets/imgs/aurajslogo.png)

[Addy Osmani](https://twitter.com/addy) - who is a big proponent of JavaScript architecture best practices - started a project called [AuraJS](https://github.com/aurajs) with the intention to bring such modular widget-like architecture to Backbone. 

> Aura is a decoupled, event-driven architecture for developing widget-based applications. It takes advantage of patterns and best practices for developing maintainable applications and gives you greater control over widget-based development. Aura gives you complete control of a widget's lifecycle, allowing developers to dynamically start, stop, reload and clean-up parts of their application as needed. <cite><a href="https://github.com/aurajs/aura">AuraJS GitHub</a></cite>

You can read more on [its GitHub repo](https://github.com/aurajs/aura) or [here](http://addyosmani.github.io/aura/).

Addy also published some good reads related to this topic. You should definitely take a look at them:

- [Patterns for Large-Scale JavaScript Application Architecture](http://addyosmani.com/largescalejavascript/)
- [Presentation: Scalable JavaScript Application Architecture](http://www.slideshare.net/nzakas/scalable-javascript-application-architecture)

### MarionetteJS - Another Backbone Extension

![](/blog/assets/imgs/marionettejs_logo.png)

Similar to AuraJS, also [MarionetteJS](http://marionettejs.com/) takes an event-driven architecture approach. 

> Backbone.Marionette is a composite application library for Backbone.js that aims to simplify the construction of large scale JavaScript applications. <cite><a href="http://marionettejs.com/">MarionetteJS Homepage</a></cite>

A couple of weeks ago, they released v1.0 with components like `RegionManager` and `EventAggregator`. Those concepts sound quite similar to [PRISM](http://compositewpf.codeplex.com/) (another modular application framework for .Net) and indeed when [I asked the author](http://lostechies.com/derickbailey/2013/03/25/marionettejs-v1-0-now-with-stickers/#comment-842786661):

<blockquote>
    <p>:) definitely not coincidence. I spent 5+ years building large scale winforms apps, and worked with prism just enough to understand the composite architecture it created. I built a very large system with patterns from the Enterprise Integration Patterns book, which are all present in PRISM and Marionette now. This is definitely the influence and direction that I took with Marionette :)</p>
</blockquote>

## Decoupling in JavaScriptMVC

JavaScriptMVC has the concept of modularization already build-in since v3.2.

> The secret to building large apps is to NEVER build large apps. Break up your applications into small pieces. Then assemble those testable, bite-sized pieces into your big application. <cite><a href="http://javascriptmvc.com/docs.html#!organizing">JMVC Docs: Organizing Your App</a></cite>

Already the proposed folder structure of a JavaScriptMVC project suggests such approach. A couple of days ago, Justin (one of the creators of JavaScriptMVC) published two videos where he dives into this concept again.

![](/blog/assets/imgs/jmvc_justin_tweet.png)

The videos give a preview of how the upcoming release of JavaScriptMVC v3.3 further facilitates such decoupling among widgets.

### Part 1 - MVC Architecture and the Observer Pattern

<iframe width="560" height="315" src="http://www.youtube.com/embed/NZi5Ru4KVug" frameborder="0" allowfullscreen="allowfullscreen"> </iframe>

### Part 2 - Development process

<iframe width="560" height="315" src="http://www.youtube.com/embed/yFxDY5SQQp4" frameborder="0" allowfullscreen="allowfullscreen"> </iframe>
