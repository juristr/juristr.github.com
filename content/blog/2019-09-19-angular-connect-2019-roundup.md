---
type: post
title: "Angular Connect 2019 Roundup"
lead: My core takeaway from AngularConnect 2019
date: 2019-09-19T10:39:44+02:00
comments: true
url: /blog/2019/09/angular-connect-2019-roundup
# image: /blog/assets/imgs/rx-to-promise-journey/rxjourney-bg.jpg
# categories:
#   - Angular
# tags:
#   - rxjs
#   - angular
draft: true
---

{{<intro>}}
  I'm not at AngularConnect 2019 (unfortunately). But I'm following along very closely with the Angular community (and as an Angular GDE) I'm particularly excited what's currently being announced in London :wink:. As such I'm summarizing here my main takeaway from the conf.
{{</intro>}}
<!--more-->

{{< postad >}}


Note, _I'll update this blog post as I catch up with talks from the conf, so don't forget to check back_  
_Last update: 8th May 2019 11:30pm GMT+2 - check my [Twitter stream for more](https://twitter.com/juristr)_

---

{{< toc >}}

## Disclaimer

This is my personal summary of the sessions from AngularConnect. While I summarize the things with my own words, the material used such as images, graphs, source code examples are not my own. Most of them are from the Youtube videos or slide of the respective speakers of the various sessions.

## Keynote (day 1)

_Stephen Fluin & Igor Minar - [Youtube](), [Slides]()_

First and foremost, before going ahead with "tech details", this is what the Angular community stands for..

{{<figure url="/blog/assets/imgs/angularconnect19/day1-keynote01.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-keynote02.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-keynote03.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-keynote04.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-keynote05.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-keynote06.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-keynote07.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-keynote08.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-keynote09.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-keynote10.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-keynote11.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-keynote12.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-keynote13.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-keynote14.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-keynote15.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-keynote16.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-keynote17.png" size="full">}}

### Demos

- [Styling Demo with Ivy](https://github.com/matsko/ivy-styling-demo)
- [Lazy Loading Components](https://github.com/IgorMinar/ivy-lazy-load-component)

## Deep Dive into the Angular Compiler

_Alex Rickabaugh - [Youtube](), [Slides]()_

{{<figure url="/blog/assets/imgs/angularconnect19/day1-compiler01.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-compiler02.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-compiler03.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-compiler04.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-compiler05.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-compiler06.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-compiler07.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-compiler08.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-compiler09.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-compiler10.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-compiler11.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-compiler12.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-compiler13.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-compiler14.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-compiler15.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-compiler16.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-compiler17.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-compiler18.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-compiler19.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-compiler20.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-compiler21.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-compiler22.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-compiler23.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-compiler24.png" size="full">}}
{{<figure url="/blog/assets/imgs/angularconnect19/day1-compiler25.png" size="full">}}

## How we make Angular Fast

_Misko Hevery - [Youtube](), [Slides]()_

- optimized for Memory handling
- low memory footprint
- optimize for contributions => ngDevMode: generates a bunch of more code and decorators that help understand what's going on

## The architecture of components: Managing complexity without a State Management Solution

_Erin Coughlan - [Youtube](), [Slides]()_

---

## Keynote (Day 2)

_Minko Gechev - [Youtube](), [Slides](https://speakerdeck.com/mgechev/angularconnect-2nd-day-keynote)_

{{<figure url="/blog/assets/imgs/angularconnect19/day2-keynote01.png" size="full">}}

Although it might often seem, the Angular team doesn't work in isolation. It works in close collaboration with other parties, for instance they were one of the main drivers behind decorators in collaboration with W3C. 

{{<figure url="/blog/assets/imgs/angularconnect19/day2-keynote02.png" size="full">}}

There's also a constant collaboration with the Chrome team at Google

{{<figure url="/blog/assets/imgs/angularconnect19/day2-keynote03.png" size="full">}}

...recently focusing mostly on points such as

- PWAs
- Web Performance
- Web Standards
- Testing
- Much more!

One outcome is [web.dev/angular](https://web.dev/angular).

{{<figure url="/blog/assets/imgs/angularconnect19/day2-keynote04.png" size="full">}}

The articles on [web.dev](https://web.dev) are mostly performance related, an important and common topic both the Angular and Chrome team have. It's all about reducing the TTI (Time to Interactive). Frankly, make apps load faster. [Addy Osmani (@addyosmani)](https://twitter.com/addyosmani) published last year (and this year as well) the so-called "Cost of JavaScript".

{{<figure url="/blog/assets/imgs/angularconnect19/day2-keynote06.png" size="full">}}

It once again showed that shipping JavaScript is the most costly operation of modern web applications. As such, the less JavaScript we need to ship, the better. **Lazy Loading** is one way of achieving this, basically to **just ship the minimum necessary code** to our users to boot up the application and only load the remaining parts once they are needed. **Route level code splitting** and lazy loading is built into Angular and is probably the easiest way to achieve that. 

{{<figure url="/blog/assets/imgs/angularconnect19/day2-keynote05.png" size="full">}}

To make it even easier, the Angular team has improved the schematics in the CLI s.t. generating a lazy route is as easy as

```
$ ng g module ranking --route ranking --module app.module
```

{{<article-link 
   url="/blog/2019/08/ngperf-route-level-code-splitting/" 
   title="My free video on route-level code splitting" 
   text="" 
   imageurl="" 
>}}

{{<figure url="/blog/assets/imgs/angularconnect19/day2-keynote07.png" size="full">}}

When you apply lazy loading and route level code splitting you usually want to apply preloading mechanisms. With Angular you can either preloading all lazy modules, implementing custom preloading strategies or using libraries such as [ngx-quicklink](https://github.com/mgechev/ngx-quicklink).

{{<article-link 
   url="/blog/2019/08/ngperf-preloading-lazy-routes/" 
   title="My free video on preloading strategies with Angular" 
   text="" 
   imageurl="" 
>}}

You can step up the game even further **by applying predictive preloading** with [Guess.js](https://github.com/guess-js). 

{{<figure url="/blog/assets/imgs/angularconnect19/day2-keynote10.png" size="full">}}


Minko presents how Guess.js can be integrated into an Angular application with [ngx-build-plus](https://github.com/manfredsteyer/ngx-build-plus) and how it uses Google Analytics and Tensorflow to build a neural network of which routes to preload lazily. 

Another way keeping our app performant is by **applying constraints**, for instance **performance budgets**.

{{<figure url="/blog/assets/imgs/angularconnect19/day2-keynote08.png" size="full">}}

Since Angular 8, you can specify different kind of performance budgets in your `angular.json`. This becomes really powerful as they are also run in CI.

{{<article-link 
   url="/blog/2019/08/ngperf-setting-performance-budgets/" 
   title="My free video on configuring performance budgets with the Angular CLI" 
   text="" 
   imageurl="" 
>}}

Starting with `v8.2.0` you can now also impose budgets on styles :tada:.

{{<figure url="/blog/assets/imgs/angularconnect19/day2-keynote09.png" size="full">}}

Minko talks about the **Angular Collaborators** program.

{{<figure url="/blog/assets/imgs/angularconnect19/day2-keynote11.png" size="full">}}

Angular is open source, but it is hard to submit PRs for bigger features. The team has priorities internally at Google and needs to make sure new feature requests align with those priorities. As such it created the Angular Collaborators program, basically to build a set of "trusted" external contributors that work more closely with the team and help also other new contributors get their PRs get through.

Another newly introduced feature in Angular 8 was **ng deploy**.

{{<figure url="/blog/assets/imgs/angularconnect19/day2-keynote12.png" size="full">}}

[Shmuela Jacobs](https://twitter.com/ShmuelaJ) presents how easily you can use `ng deploy` to deploy an Angular app to Azure.  
Related to `ng deploy` you may also want to give [Johannes Hoppe's](https://twitter.com/JohannesHoppe) [**ng deploy starter project**](https://github.com/angular-schule/ngx-deploy-starter) a look. It allows you to easily get started with ng deploy and customize it to your own needs.

{{<figure url="/blog/assets/imgs/angularconnect19/day2-keynote13.png" size="full">}}

### Extensibility API

{{<figure url="/blog/assets/imgs/angularconnect19/day2-keynote14.png" size="full">}}

## How Angular Works

_Kara Erickson - [Youtube](), [Slides](https://docs.google.com/presentation/d/1l3GLCqitNQ5G6fgS59gsUkD_EGnIwdnuWP-tKYrxmEI/edit#slide=id.g26d86d3325_0_0)_

---

_More coming soon...check [my Twitter account to get notified](https://twitter.com/juristr)_

