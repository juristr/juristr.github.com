---
layout: post
title: "Web meets Desktop"
lead: "Make web applications talk to your desktop"
postimg: "/blog/assets/imgs/logo-nightwatch.png"
show_img_in_detail: true
coverimage: false
category:
tags: ["Software testing", "JavaScript", "Node"]
---

Yesterday [Atom.io](http://atom.io) has been launched, GitHub's latest effort in the market of text editors. What's most remarkable is the approach that is being taken: **the native web**, web applications running on the desktop.

> [...] For this reason, we didn't build Atom as a traditional web application. Instead, Atom is a specialized variant of Chromium designed to be a text editor rather than a web browser. Every Atom window is essentially a locally-rendered web page. <cite><a href="http://blog.atom.io/2014/02/26/the-nucleus-of-atom.html">Atom blog</a></cite>

Atom is powered by probably the most modern web browser engine Chromium and Node.js.

> Another great thing about writing code for Atom is the guarantee that it's running on the newest version of Chromium. That means we can ignore issues like browser compatibility and polyfills. We can use all the web's shiny features of tomorrow, today.

Such sentences make (web) developer's dreams come true ;)

<div style="text-align:center">
  <img src="http://blog.atom.io/img/under-the-hood.gif" />
</div>

## So..do we still need desktop apps?

No, not really! The tech-stack Atom - for instance - is running on is capable of handling most of the scenarios I can think of.

- **Build great UIs** ...well today's modern web apps have much nicer and appealing UIs anyway. Moreover HTML and CSS3 are extremely suitable to build good UIs, the easiest I've worked so far (among Swing, SWT, WinForms designer and even WPF XAML language). It is just more intuitive (not only 'cause I'm a web developer). Microsoft developed XAML as a language for decoupling the UI from the logic, s.t. designers could style the app without having to know anything about programming; the web has this already, for free.
- **Access to the FS or ability to spawn processes??** Node.js does [the](http://nodejs.org/api/fs.html) [job](http://nodejs.org/api/process.html).
- **Access a DB?** Again, Node, just Google for it and I'm pretty sure you find some guy that created an NPM package for it.
- ..alternatively you can always **wrap some native library**, maybe a [C# dll](http://tjanczuk.github.io/edge/)??
- **Graphics and 3D?** Have you seen the [Chrome WebGL experiments](http://www.chromeexperiments.com/webgl/) or [Three.js](http://threejs.org/) and [associated demos](http://acko.net/).
- ...

There are lots of other use cases, easily realizable within modern web applications.

![](/blog/assets/imgs/slack-logo.png)

[Slack](https://slack.com/) is another great example. Would you have imagined to build instant messaging as a web application a couple of years ago?? Probably not, right? Slack has a great UI, entirely build on the web by using Chrome notifications and Web sockets for real-time communication.

## Where to start?

A good point to start is [Node-webkit](https://github.com/rogerwang/node-webkit).

> node-webkit is an app runtime based on Chromium and node.js. You can write native apps in HTML and Javascript with node-webkit. It also lets you call Node.js modules directly from the DOM and enables a new way of writing native applications with all Web technologies.

You should definitely have a closer look at the [list of apps and companies using Node-webkit](https://github.com/rogerwang/node-webkit/wiki/List-of-apps-and-companies-using-node-webkit). There are some quite impressive examples and use cases like [remote collaboration tools](https://www.sqwiggle.com/), Markdown editors, time trackers and also [Lighttable](http://www.lighttable.com/), another popular text editor.

### How does it work

The simplest approach of developing a node-webkit application is to simply wrap your existing webapp.

## Conclusion

Still, there's a long way to go. The first steps have been made and the signals are evident that the web pushes towards the desktop.

- push your limits, leave your "comfort zone" and thing different
