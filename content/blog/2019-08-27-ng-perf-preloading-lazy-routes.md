---
type: post
title: "Angular Performance: Preloading Lazy Routes"
lead: Optimize runtime performance by preloading lazy routes
date: 2019-08-27T12:45:59+02:00
comments: true
url: /blog/2019/08/ngperf-preloading-lazy-routes
image: /blog/assets/imgs/ngperf/ngperf-preloading.jpg
categories:
  - Angular
tags:
  - angular
  - videos
draft: false
---

{{<intro>}}
  This article is part of my "Angular Performance Week" series, where I publish a new video each day based on the performance articles on web.dev/angular. Today we're going to have a look at various ways to preload lazy routes in Angular: preloading all modules, custom preloading and with [ngx-quicklink](https://github.com/mgechev/ngx-quicklink).
{{</intro>}}
<!--more-->

{{< postad >}}

> Note: this article and attached Egghead video lesson are based on the articles on [web.dev/angular](https://web.dev/angular) by [Minko Gechev](https://twitter.com/mgechev) and [Stephen Fluin](https://twitter.com/stephenfluin). Full credit goes to them :thumbsup:

## Angular Performance Series

1. [Route Level Code Splitting](/blog/2019/08/ngperf-route-level-code-splitting/)
1. **Preload Lazy Routes in Angular**
1. [Performance budgets with the Angular CLI](/blog/2019/08/ngperf-setting-performance-budgets)
1. [Optimize Angular's Change Detection](/blog/2019/08/ngperf-optimize-change-detection)
1. [Virtual Scrolling for large lists with the CDK](/blog/2019/08/ngperf-virtual-scrolling-cdk)
1. [Precaching with the Angular Service Worker](/blog/2019/08/ngperf-precaching-serviceworker)

Don't miss the other videos [by subscribing to my newsletter](/newsletter).

## Preload All Modules

In the [previous article](/blog/2019/08/ngperf-route-level-code-splitting) we talked about lazy loading Angular routes with the Angular CLI. When you lazy load a module the user gets the benefit of faster loading of the application. However this comes at the cost of a delay when the module gets loaded at runtime. To mitigate this issue, we can apply some preloading strategy. Angular comes with a default one, that preloads all lazy modules. Let's see how to implement that.

<!-- {{<egghead-lesson uid="lessons/egghead-preload-all-lazy-loaded-modules-with-angular" >}} -->
{{<youtube 0kU-nC3umHQ>}}

## Custom Preloading Strategy

[Preloading all modules](https://egghead.io/lessons/egghead-preload-all-lazy-loaded-modules-with-angular?af=fj2vsx) is quite an extreme approach and might not always be desirable. For instance, you don't want to preload lazy routes a user might not even have access to. Therefore, in this lesson we're going to have a look at how to define a custom preloading strategy in Angular.

<!-- {{<egghead-lesson uid="lessons/egghead-implement-a-custom-preloading-strategy-with-angular" >}} -->
{{<youtube ZGyTnHm_fa8>}}

## Preloading with ngx-quicklink

In a [previous lesson we learned about implementing a custom preloading strategy](https://egghead.io/lessons/egghead-implement-a-custom-preloading-strategy-with-angular?af=fj2vsx). That gives you a lot of control over which route to preload and which not, whether it is based on the user's permissions or some runtime app config. In this lesson we're using [ngx-quicklink](https://github.com/mgechev/ngx-quicklink), a library that drastically simplifies the custom preloading, by automatically loading all visible links on the page.

<!-- {{<egghead-lesson uid="lessons/egghead-custom-route-preloading-with-ngx-quicklink-and-angular" >}} -->
{{<youtube fZAozYgYzhI>}}

### Original web.dev article

Wanna read the original web.dev article? [Check it out here!](https://web.dev/route-preloading-in-angular/).
