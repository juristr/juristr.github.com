---
layout: post_new
title: "Webpack, SystemJS, JSPM, ES6 Modules, what??"
lead: "Confused? Understandable..I'm trying to shed some light on this"
show_img_in_detail: true
coverimage: false
category: angular2
tags: []
---

<p class="article-intro">
	When doing some research about which Angular 2 starter project to use, you will inevitably stumble across Webpack and SystemJS+JSPM. In this article I'll try to shed some light on these tools, referencing some good articles and highlighting some of their core messages.
</p>

{% include postads %}

**Disclaimer: I did not yet work extensively with either of the two tools.**.

Let's try to clarify some things right upfront.

**[Webpack](https://webpack.github.io/)** is a module bundler designed for big projects. It assembles ideas from browserify and Require.js. It takes modularity even to static assets like CSS and images and employs a concept called _[code splitting](http://webpack.github.io/docs/code-splitting.html)_. It is configuration based, more opinionated, tries to make good decisions for you (the "magic") but it's still flexible enough for most situations.

**[SystemJS](https://github.com/systemjs/systemjs)** is a module loader designed for the future, compatible with what people know under the ES6/ES2015 module loading spec, which, btw. [has been removed from the ES2015 spec](http://awal.js.org/blog/es6/2015/09/10/state-of-es6-modules.html) (for now). It is a _dynamic_ module loader in that it supports loading them dynamically in the browser. It supports production bundling but allows for optimization for when HTTP/2 is broadly available.

**[JSPM](http://jspm.io/)** defines itself as "frictionless browser pkg management". Most remarkably it allows you to use bower, npm, even include GitHub repositories, all in very much the same way and bundle them together without requiring any other tool. It handles versioning and understands any module format (ES6, AMD, CommonJS and global). It is based on SystemJS.

SystemJS and JSPM are the new kids on the block. If you want to put them on a timeline it would be more like..

```
Grunt -> Gulp -> Webpack -> SystemJS+JSPM
```

This is just to give an orientation, by no means completely accurate, complete (there's also Browserify), nor a hint on which direction you should go. Let's explore in more depth what people are saying about these tools.

## Webpack

<figure>
	<img src="/blog/assets/imgs/webpack-systemjs/webpackgithub.png">
</figure>

#### Pete Hunt (Instagram): Webpack Howto
[https://github.com/petehunt/webpack-howto](https://github.com/petehunt/webpack-howto)

A very nice and concise introduction to Webpack by Pete Hunt from Instagram, with small configuration examples.

His answer to [Substack's criticism](https://gist.github.com/substack/68f8d502be42d5cd4942)

> Webpack is extremely modular. What makes webpack great is that it lets plugins inject themselves into more places in the build process when compared to alternatives like browserify and requirejs. Many things that may seem built into the core are just plugins that are loaded by default and can be overridden (i.e. the CommonJS require() parser).

#### Webpack compared
[http://survivejs.com/webpack_react/webpack_compared/](http://survivejs.com/webpack_react/webpack_compared/)  
[https://christianalfoni.github.io/react-webpack-cookbook/](https://christianalfoni.github.io/react-webpack-cookbook/)

Nice article giving a good overview, from Make to Grunt, Gulp, Browserify, JSPM and Webpack. According to the article you should use Webpack because...

- won't solve everything. It does solve the difficult problem of bundling
- has live reloading build-in
- has hot-module replacement which is nice with [react-hotloader](https://github.com/gaearon/react-hot-loader)
- you can load dependencies as you need them

#### Substack on Webpack vs. Browserify
[https://gist.github.com/substack/68f8d502be42d5cd4942](https://gist.github.com/substack/68f8d502be42d5cd4942)

Claims Webpack is trying to pull more (too much) logic into it's core for easy usage but at the cost of modularity.

> Generally speaking, most of this confusion stems from how webpack is more willing to pull features into its core to ease discoverability while browserify is more likely to push features out to userland instead.

[Namam Goel follows-up](http://blog.namangoel.com/browserify-vs-webpack-js-drama) on Substack's criticism on Webpack. But he clearly says that from his perspective both tools follow a different kind of philosophy. But we won't go too much into the details of Webpack vs. Browserify as that's not the scope of this article. An interesting point:

- Webpack applies it's loader logic on everything, even on `node_modules`, unless excluded explicitly.

It has to obviously, in order to be able to load those node packages into the browser.

#### Browserify vs. Webpack
[https://medium.com/@housecor/browserify-vs-webpack-b3d7ca08a0a9#.xv1l5ph6f](https://medium.com/@housecor/browserify-vs-webpack-b3d7ca08a0a9#.xv1l5ph6f)

This article provides some good insights into some Webpack features.

- more opinionated, integrated
- Webpack offers enough power out of the box that you typically don’t need Grunt or Gulp at all
- "Configuration-based systems are preferable to imperative systems if they make the right assumptions about your goals up front."
- inlining CSS and images...: "Well, Webpack will consider the size of this file. If it’s small, it’ll inline the stylesheet, otherwise load it!" Same holds for images.

#### Egghead.io - Intro to Webpack
[https://egghead.io/lessons/javascript-intro-to-webpack](https://egghead.io/lessons/javascript-intro-to-webpack)

<figure>
	<a href="https://egghead.io/lessons/javascript-intro-to-webpack"><img src="/blog/assets/imgs/webpack-systemjs/egghead-webpackintro.png"></a>
</figure>

This is really just a ~4 minute intro by Kent C. Dodds where he uses Webpack to code a simple demo.

## SystemJS

<figure>
	<img src="/blog/assets/imgs/webpack-systemjs/systemjsgithub.png">
</figure>

#### JSPM vs Webpack
[http://ilikekillnerds.com/2015/07/jspm-vs-webpack/](http://ilikekillnerds.com/2015/07/jspm-vs-webpack/)

- The power of JSPM actually lies in its ability to manage dependencies from multiple sources and bundle them.
- works out of the box with both BabelJS and Traceur for transpiling

There are other points mentioned in the article, though, where I don't fully agree like: _"Another major benefit being you don’t need any form of build tool or task running to compile your code (at least during development)."_  
Sure, this is nice to quickly setup your dummy hello world example. But you will definitely need a proper build process and you better create it now when your app is simple rather than sticking it in later.

> While JSPM might not be seen as important now in the face of existing tools, when HTTP/2 and its handy multiplexing is more widely supported, tools like JSPM are going to be at the forefront of package and dependency management in the long run as hacks like minification and bundling soon become unnecessary in an attempt to make our web applications faster.

#### Using browserify/webpack? Why not try jspm and SystemJS
[http://nervosax.com/2015/08/05/why-not-try-jspm-and-systemjs/](http://nervosax.com/2015/08/05/why-not-try-jspm-and-systemjs/)

- advantage JSPM: manages packages and can load from bower/npm/github
- SystemJS built for the future -> especially HTTP/2
- Powerful [plugin system](https://github.com/systemjs/systemjs#plugins)
- Problems
  - young project
	- often buggy
	- future is not here (yet)
	- there are workarounds, though

#### Reddit: Why is not SystemJS dominating the field..
[https://www.reddit.com/.../why_is_not_systemjs_dominating_the_field_of/](https://www.reddit.com/r/javascript/comments/2is81v/why_is_not_systemjs_dominating_the_field_of/)

Interesting Reddit discussion, where even [Guy Bedford](https://twitter.com/guybedford), creator of JSPM and SystemJS, participates.

Bedford says that the unique part of JSPM over other tooling is

1. All dependencies are peer dependencies in jspm.
1. The full version solution is contained in a single configuration file, which can be version-controlled and easily shared (like npm shrinkwrap and the exact node_modules folder state combined into a single manifest).
1. Because it is based on a dynamic spec-compliant browser loader first, dynamic loading of modules in the browser can be done very easily and naturally.

Moreover...

> jspm does actually support bundling, but we allow the optimization potential of separate files in future.  
> With HTTP/2 separate files are useful as it allows the browser to handle fine-grained caching of shared resources, instead of having to always custom optimize bundles.

#### Video: JavaScript in 2015
[https://www.youtube.com/watch?t=33&v=iukBMY4apvI](https://www.youtube.com/watch?t=33&v=iukBMY4apvI)

Nice video that demos SystemJS and JSPM with a very simple example.

## Conclusion

So, what's the conclusion of all this?

SystemJS + JSPM seems to be more future proof, supporting ES6 modules out of the box (although people could argue this does no more hold as modules have been removed from the official spec) and already optimizes for HTTP/2. The question is when that "tomorrow" will be here. When will HTTP/2 be available? Here's an [interesting article that tries to answer this](http://daniel.haxx.se/blog/2015/03/31/the-state-and-rate-of-http2-adoption/). From the article:

> My estimate: By the end of 2015 the leading HTTP server products with a market share of more than 80% of the server market will support HTTP/2.

Webpack on the other side feels like it is the result of trying to solve the biggest issues people have when dealing with frontend development and bundling and trying to solve that for them. It is thus more opinionated and comes with a lot of "magic".

https://twitter.com/juristr/status/672706658972356608

