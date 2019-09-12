---
type: post
title: "Angular Performance: Precaching with the Service Worker"
lead: Cache your app with Angular's integrated service worker package
date: 2019-08-31T12:45:59+02:00
comments: true
url: /blog/2019/08/ngperf-precaching-serviceworker
image: /blog/assets/imgs/ngperf/precaching-serviceworker.jpg
categories:
  - Angular
tags:
  - angular
  - videos
draft: false
---

{{<intro>}}
  This article is part of my "Angular Performance Week" series, where I publish a new video each day based on the performance articles on web.dev/angular. Today we're diving into the service worker API, in specific by leveraging Angular's integrated service worker package.
{{</intro>}}
<!--more-->

{{< postad >}}

> Note: this article and attached Egghead video lesson are based on the articles on [web.dev/angular](https://web.dev/angular) by [Minko Gechev](https://twitter.com/mgechev) and [Stephen Fluin](https://twitter.com/stephenfluin). Full credit goes to them :thumbsup:

## Angular Performance Series

1. [Route Level Code Splitting](/blog/2019/08/ngperf-route-level-code-splitting/)
1. [Preload Lazy Routes in Angular](/blog/2019/08/ngperf-preloading-lazy-routes)
1. [Performance budgets with the Angular CLI](/blog/2019/08/ngperf-setting-performance-budgets)
1. [Optimize Angular's Change Detection](/blog/2019/08/ngperf-optimize-change-detection)
1. [Virtual Scrolling for large lists with the CDK](/blog/2019/08/ngperf-virtual-scrolling-cdk)
1. **Precaching with the Angular Service Worker**

Don't miss the other videos [by subscribing to my newsletter](/newsletter).

## Caching with Angular's Service Worker Package

To further speed up our app and to provide a more pleasant experience in flaky network conditions, we may want to use a service worker that allows us to apply precaching mechanisms. Luckily the Angular team already offers a service worker module that is well integrated with the framework. Let’s have a look at how to apply that to our application.

<!-- {{<egghead-lesson uid="lessons/egghead-apply-precaching-with-the-angular-service-worker" >}} -->
{{<youtube 2-SoCdPo4l8>}}

### Original web.dev article

Wanna read the original web.dev article? [Check it out here!](https://web.dev/precaching-with-the-angular-service-worker/).
