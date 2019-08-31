---
type: post
title: "Angular Performance: Virtual Scrolling with the CDK"
lead: Reduce the amount of DOM nodes with CDK's virtual scrolling
date: 2019-08-30T12:45:59+02:00
comments: true
url: /blog/2019/08/ngperf-virtual-scrolling-cdk
image: /blog/assets/imgs/ngperf/ngperf-virtual-scrolling.jpg
categories:
  - Angular
tags:
  - angular
  - videos
draft: false
---

{{<intro>}}
  This article is part of my "Angular Performance Week" series, where I publish a new video each day based on the performance articles on web.dev/angular.
{{</intro>}}
<!--more-->

{{< postad >}}

> Note: this article and attached Egghead video lesson are based on the articles on [web.dev/angular](https://web.dev/angular) by [Minko Gechev](https://twitter.com/mgechev) and [Stephen Fluin](https://twitter.com/stephenfluin). Full credit goes to them :thumbsup:

## Angular Performance Series

1. [Route Level Code Splitting](/blog/2019/08/ngperf-route-level-code-splitting/)
1. [Preload Lazy Routes in Angular](/blog/2019/08/ngperf-preloading-lazy-routes)
1. [Performance budgets with the Angular CLI](/blog/2019/08/ngperf-setting-performance-budgets)
1. [Optimize Angular's Change Detection](/blog/2019/08/ngperf-optimize-change-detection)
1. **Virtual Scrolling for large lists with the CDK**
1. [Precaching with the Angular Service Worker](/blog/2019/08/ngperf-precaching-serviceworker)

Don't miss the other videos [by subscribing to my newsletter](/newsletter).

## Leverage the Angular CDK to implement virtual scrolling

Browsers become faster every day, but still, **DOM updates are costly**. If we have large lists, the browser needs to render them upfront, creating hundreds if not thousands of DOM nodes, even though the user might not scroll that far down the list. Not only does this slow down the scrolling itself, but even the page load of our app can suffer from it. To optimize this experience, we can use **virtual scrolling**, in particular, in this lesson we’re using Angular’s CDK to implement that.

{{<egghead-lesson uid="lessons/egghead-apply-virtual-scrolling-to-large-lists-with-the-angular-cdk" >}}

### Original web.dev article

Wanna read the original web.dev article? [Check it out here!](https://web.dev/virtualize-lists-with-angular-cdk/).
