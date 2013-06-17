---
layout: post
title: "Learning JavaScriptMVC"
description: ""
postimg: "/blog/assets/imgs/learningjmvc_cover.jpg"
show_img_in_detail: true
category: 
tags: [book review, JavaScript, WebDev]
---

About half a year ago, Packt Publishing approached me for a technical review of a new book about JavaScriptMVC they were about to publish. I agreed and started to participate in the review process. Now, after a bit of a delay the book was successfully published and last week I also got my copy of the book delivery at home: "Learning JavaScriptMVC".

## So what is the book about?

As you might have guessed, the book is about JavaScript  programming. More specifically it is about developing single-page JavaScript applications by using the [JavaScriptMVC framework](http://javascriptmvc.com). JMVC (short for JavaScriptMVC) is one of the dozens of JavaScript MVC frameworks out there beside others like Backbone, AngularJS, Ember, Spine etc...  
So far I actually didn't write that much about it on my blog here, although I heavily use it since we adopted it as our main SPA (Single Page Application) framework at work. Hopefully, in the next months I'm able to publish something more about it.

The book is a very basic introduction to the framework and is therefore perfectly suited for novices in this area.

## Structure

(About the chapters and their corresponding content)

## Conclusion - Words about JMVC

IMHO, JavaScriptMVC is great, especially if you're completely new to the world of JavaScript SPAs. JMVC is great because it bundles everything you need

- **Code Generators -** for generating the JavaScript application structure which is quite nice for having a starting point. Moreover the generators are flexible and extensible s.t. you can easily customize it for your corporate environment.
- **Testing -** Full integration with QUnit and FuncUnit, a JMVC evolution of QUnit for more advanced UI testing.
- **Dependency Management -** It contains a dependency management module which is a must if you create large applications.
- **Templating Engine -** A templating engine for client-side HTML rendering. By default it uses [EmbeddedJS]http://embeddedjs.com/), but you can easily swap it out with your favorite one if you like.
- **Class suport & Data Modeling -** It provides a class system with full inheritance and data models for exchanging data with a server backend.
- **jQuery Widget Factory & utils -** A bunch of jQuery utilities
- **Production Builds -** for generating super-compressed JavaScript files for deploying into production.
- **Code Cleaning and Linting -** a set of utilities for linting and cleaning your JavaScript code.
- (and a lot more...)

Therefore, as mentioned, if you're new to this whole world of JavaScript and you have no clue about what AMD and QUnit is or how you can trigger custom JavaScript events and build and minify a JavaScript application, then it is definitely for you. It allows you to quickly get productive while at the same time you can approach all the above mentioned topics with more tranquility ;).

> Strange, I didn't hear anything about JavaScriptMVC so far.

Well yes, that might be true. Although the guys at Bitovi (the consulting company that created the framework) did and do an excellent work in creating and further developing the framework (as well as giving support on their [forum](http://forum.javascriptmvc.com)) there isn't much visibility on the general community on the web. Hopefully this will change with [CanJS](http://canjs.com), an [evolution of JMVC's MVC](http://bitovi.com/blog/2012/04/introducing-canjs.html) part.

### Links

- [Learning JavaScriptMVC, Wojciech Bednarski, Packt Publishing, May 2013](http://www.packtpub.com/building-javasript-web-applications-using-javascriptmvc/book)
