---
layout: post
title: "Setting up our company internal blog with Ghost"
postimg: "/blog/assets/imgs/ghost-blog-bg.jpg"
show_img_in_detail: true
coverimage: true
category: 
tags: ["blogging"]
---

I'm blogging now for roughly [about 7 years](/blog/all/). I really enjoy it. Not only have I learned lots of stuff about HTML, CSS and how websites work in general while hacking on my blog but also got lots of interesting opportunities. Anyways, this article is less about the positive sites of having a blog but more about the technical setup, using the newest currently available stuff on the blogging engines market: [Ghost](http://ghost.org).

First of all, it's **open source all in**, running on a Linux setup, using [Node](http://nodejs.org/) as its engines and [Ghost](https://ghost.org) as the platform, which again, is a Kickstarter funded, [open source project](https://github.com/tryghost).

<figure>
  <img src="/blog/assets/imgs/ghost-companyblog.png" />
  <figcaption>Our new ghost-powered company blog</figcaption>
</figure>

## Why Ghost?

It runs on Node!! Just kidding..while personally I love [Jekyll](http://jekyllrb.com) (which also powers this blog), Ghost is probably just right in between the full flexibility of publishing your markdown-written posts using a `git push` and the full-lockin Google Blogger powered engine, which only hardly lets you touch your blog's HTML and is more made for non-hackers.  
Secondly I wanted to get some experience about hosting a Node.js based application on our company infrastructure. Beside that, the [upcoming features](https://ghost.org/features/) look awesome.

## Setup

I am not going to repeat the installation instruction as you can find them in a very detailed form directly on [the official Ghost guide](http://docs.ghost.org/installation/linux/). I'd rather like to mention some of the issues you have to pay attention.

### Node version

make sure you have the latest Node version; my setup uses `v0.10.21`


##sqlite3

Ghost requires [node-sqlite3](https://github.com/mapbox/node-sqlite3). In a recent version of sqlite3, their maintainers decided to directly publish different, pre-build executables for the different platforms. Depending on where you



