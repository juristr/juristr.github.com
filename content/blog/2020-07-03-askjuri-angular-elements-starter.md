---
type: post
title: "AskJuri: Learning about Angular Elements"
lead: >-
  Write some cool lead here
date: 2020-07-03T17:13:18+02:00
comments: true
url: /blog/2020/06/askjuri-learning-angular-elements
image: /blog/assets/imgs/askjuri-material-ng-elements.png
categories:
  - Angular
tags:
  - angular
  - askjuri
draft: false
---

{{<intro>}}
  Hi Juri, could you perhaps point me in the right direction with respect to training material for Angular Elements. Also, what are the pros and cons?
{{</intro>}}
<!--more-->

{{< postad >}}

## Question

Hi Juri, could you perhaps point me in the right direction with respect to training material for Angular Elements. Also, what are the pros and cons?

## Answer

Hi! Sure.

I have published an introductory Angular Elements course on Eggehad a while ago. Here's the link to it: [Getting Started with Angular Elements](https://egghead.io/courses/getting-started-with-angular-elements)

{{<egghead-lesson uid="lessons/angular-course-intro-to-angular-elements" >}}

**So, the main benefit of Angular Elements** are that you can share your Angular components as "Custom Elements" with other non-Angular projects. Say you have a React application and you'd like to us the - say - payment flow component you created in Angular, then you can wrap that component as an Angular Element, compile it and import it into your React application.

There's a downside though: building Angular Elements into a single JS file can get quite big, since you also embed parts of the Angular runtime to actually have the Angular Element running. Ivy helps there a bit in terms of better compilation and smaller bundle sizes, but there's still some way to go until they become really small.

Therefore, for bundling and compiling I'd definitely take a look at Manfred Steyer's [ngx-build-plus](https://github.com/manfredsteyer/ngx-build-plus), especially how to exclude common things like the Angular Core, RxJs etc and only load them once. That's especially important if you load multiple Angular Elements on a page.

