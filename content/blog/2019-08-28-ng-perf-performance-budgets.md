---
type: post
title: "Angular Performance: Performance budgets with the Angular CLI"
lead: Learn how to set performance budgets using the Angular CLI
date: 2019-08-28T12:45:59+02:00
comments: true
url: /blog/2019/08/ngperf-setting-performance-budgets
image: /blog/assets/imgs/ngperf/ngperf-cli-budgets.jpg
categories:
  - Angular
tags:
  - angular
  - videos
draft: false
---

{{<intro>}}
  This article is part of my "Angular Performance Week" series, where I publish a new video each day based on the performance articles on web.dev/angular. This article focuses on how we can define performance budgets with the Angular CLI.
{{</intro>}}
<!--more-->

{{< postad >}}

> Note: this article and attached Egghead video lesson are based on the articles on [web.dev/angular](https://web.dev/angular) by [Minko Gechev](https://twitter.com/mgechev) and [Stephen Fluin](https://twitter.com/stephenfluin). Full credit goes to them :thumbsup:

## Angular Performance Series

1. [Route Level Code Splitting](/blog/2019/08/ngperf-route-level-code-splitting/)
1. [Preload Lazy Routes in Angular](/blog/2019/08/ngperf-preloading-lazy-routes)
1. **Performance budgets with the Angular CLI**
1. [Optimize Angular's Change Detection](/blog/2019/08/ngperf-optimize-change-detection)
1. Virtual Scrolling for large lists with the CDK _(coming next...)_
1. Precaching with the Angular Service Worker _(coming next...)_

Don't miss the other videos [by subscribing to my newsletter](/newsletter).

## Configuring Performance Budgets

Measuring is extremely important, without numbers we don’t know about potential problems and we don’t have a base we can improve upon. [Performance Budgets](https://web.dev/performance-budgets-101) are a way to impose limits on metrics that may affect our app’s performance. In this lesson we’ll learn how to configure the Angular CLI to configure performance budgets, to monitor them and to alert us when we violate them.

{{<egghead-lesson uid="lessons/egghead-calculate-and-measure-performance-budgets-with-the-angular-cli" >}}


### Original web.dev article

Wanna read the original web.dev article? [Check it out here!](https://web.dev/performance-budgets-with-the-angular-cli/).
