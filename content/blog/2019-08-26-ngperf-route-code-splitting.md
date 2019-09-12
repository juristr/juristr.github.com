---
type: post
title: "Angular Performance: Route Level Code Splitting"
lead: Learn about route-level code splitting and lazy loading with Angular
date: 2019-08-26T12:45:59+02:00
comments: true
url: /blog/2019/08/ngperf-route-level-code-splitting
image: /blog/assets/imgs/ngperf/ngperf-lazyloading.jpg
categories:
  - Angular
tags:
  - angular
  - videos
draft: false
---

{{<intro>}}
  This article is part of my "Angular Performance Week" series, where I publish a new video each day based on the performance articles on web.dev/angular. Today we're taking a look at route-level code splitting to increase the TTI of our application.
{{</intro>}}
<!--more-->

{{< postad >}}

> Note: this article and attached Egghead video lesson are based on the articles on [web.dev/angular](https://web.dev/angular) by [Minko Gechev](https://twitter.com/mgechev) and [Stephen Fluin](https://twitter.com/stephenfluin). Full credit goes to them :thumbsup:

## Angular Performance Series

1. **Route Level Code Splitting**
1. [Preload Lazy Routes in Angular](/blog/2019/08/ngperf-preloading-lazy-routes)
1. [Performance budgets with the Angular CLI](/blog/2019/08/ngperf-setting-performance-budgets)
1. [Optimize Angular's Change Detection](/blog/2019/08/ngperf-optimize-change-detection)
1. [Virtual Scrolling for large lists with the CDK](/blog/2019/08/ngperf-virtual-scrolling-cdk)
1. [Precaching with the Angular Service Worker](/blog/2019/08/ngperf-precaching-serviceworker)

Don't miss the other videos [by subscribing to my newsletter](/newsletter).

## Route Level Code Splitting

TTI (Time to interactive) is an interesting metric that measures how long it takes for your app to be responsive, s.t. the user can interact. This is a good performance indicator. One way to improve TTI is to only load the minimum necessary part of our app, and then consequently "lazy load" other parts as they are needed.

In this video lesson we're going to implement route-level code splitting and lazy loading, step by step.

<!-- {{<egghead-lesson uid="lessons/egghead-apply-route-level-code-splitting-and-lazy-loading-with-the-angular-cli" >}} -->
{{<youtube gxlCl5P_PC8>}}

### Bonus: Showing a loading indicator for lazy routes

<!-- {{<egghead-lesson uid="lessons/egghead-show-a-loading-indicator-for-lazy-routes-in-angular" >}} -->
{{<youtube C0FBR4EUqgk>}}

### Original web.dev article

Wanna read the original web.dev article? [Check it out here!](https://web.dev/route-level-code-splitting-in-angular/).
