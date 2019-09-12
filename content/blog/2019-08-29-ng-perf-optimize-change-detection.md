---
type: post
title: "Angular Performance: Optimize Angular Change Detection"
lead: Angular is fast, but with your help it can be even faster!
date: 2019-08-29T12:45:59+02:00
comments: true
url: /blog/2019/08/ngperf-optimize-change-detection
image: /blog/assets/imgs/ngperf/optimize-change-detection.jpg
categories:
  - Angular
tags:
  - angular
  - videos
draft: false
---

{{<intro>}}
  This article is part of my "Angular Performance Week" series, where I publish a new video each day based on the performance articles on web.dev/angular. Angular is fast, but we can make it even faster. One way is by tuning its change detection system. Let's see how.
{{</intro>}}
<!--more-->

{{< postad >}}

> Note: this article and attached Egghead video lesson are based on the articles on [web.dev/angular](https://web.dev/angular) by [Minko Gechev](https://twitter.com/mgechev) and [Stephen Fluin](https://twitter.com/stephenfluin). Full credit goes to them :thumbsup:

## Angular Performance Series

1. [Route Level Code Splitting](/blog/2019/08/ngperf-route-level-code-splitting/)
1. [Preload Lazy Routes in Angular](/blog/2019/08/ngperf-preloading-lazy-routes)
1. [Performance budgets with the Angular CLI](/blog/2019/08/ngperf-setting-performance-budgets)
1. **Optimize Angular's Change Detection**
1. [Virtual Scrolling for large lists with the CDK](/blog/2019/08/ngperf-virtual-scrolling-cdk)
1. [Precaching with the Angular Service Worker](/blog/2019/08/ngperf-precaching-serviceworker)

Don't miss the other videos [by subscribing to my newsletter](/newsletter).

## Optimize Angular's Change Detection

Change Detection is the magic behind Angular that automatically recognizes when changes happen. That’s either due to manual triggering or through asynchronous events. Once a change is detected, it iterates through the various Angular Components and triggers a refresh. Usually it is very fast, however - especially in larger apps - it might trigger lots of computations and thus block the main browser thread. In this lesson we’re going to learn how to optimize Angular’s change detection mechanism by **reducing the amount of components it needs to update** and via **pure pipes**.

<!-- {{<egghead-lesson uid="lessons/egghead-optimize-angular-s-change-detection" >}} -->
{{<youtube Ki0V0DPCrzQ>}}

### Original web.dev article

Wanna read the original web.dev article? [Check it out here!](https://web.dev/faster-angular-change-detection/).
