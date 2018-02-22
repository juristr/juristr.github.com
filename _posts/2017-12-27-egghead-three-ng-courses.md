---
layout: post_new
title: "Three new Angular Courses to celebrate end of the Year 2017"
lead: "Angular HTTP, Dynamic Components, Dynamic Forms"
postimg: "/blog/assets/imgs/new-egghead-courses-postlogo.png"
ads: false
tags: [ "Angular" ]
---

<div class="article-intro">
	2017 has been AMAAAAZING (more in a later post..maybe). So before the year ends let's celebrate it with some new Angular courses. I've just released 3 of them last week on <a href="https://egghead.io/instructors/juri-strumpflohner" target="_blank">egghead.io</a> :fire:
</div>

I've worked hard in the last couple of months to get ready for this massive release and to finally get some Angular love to <a href="https://egghead.io/instructors/juri-strumpflohner" target="_blank">Egghead.io</a>. Now they're ready and out in the wild for you. Here's a quick wrap-up on all of the 3 courses. Enjoy :smiley:

## Learn Http in Angular

Well this is something you'll most probably have to deal with in any serious Angular app. Whenever you need some data to show in your app, you're going to query some backend API. But hey, why an entire course on it, I could simply use the native fetch API, right? Sure, but there's more. Angular comes with **its own Http service**, which not only makes it super easy to query your backend API, but it also natively integrates with **RxJS Observables** and **TypeScript**.

There are currently 2 Http modules within Angular. `@angular/http` is the "old", and starting with Angular version 5, deprecated package. The new one resides under `@angular/common/http` and has a couple of really nice improvements such as

* better integration with TypeScript, allowing to basically specify the expected TypeScript type when executing an HTTP request
* making HTTP interceptors super easy to write which is especially useful for appending common headers or performing global HTTP error handling and retries
* progress events for like file uploads
* better mocking during unit testing

...and a lot more. All of which we're going to cover in the course :smiley:.

<a href="https://egghead.io/courses/learn-http-in-angular" class="external-link" data-client="eggheadio" data-uid="courses/learn-http-in-angular" style="font-size: 27px;text-align:center;display: block;font-weight: bold;border: 1px solid;width: 70%;margin: 0 auto;">
    <img src="/blog/assets/imgs/egghead-logo-http.png" style="width:350px"><br>
    Start course now<br>
    <i style="font-size:14px">(paid course<sup>*</sup> )</i>
</a>

## Create Dynamic Components in Angular

Components are nice and sweet, but c'mon, once things get more real, you'll need some more dynamic behavior :sunglasses:. That's exactly what we're going to learn in this course. In the course I'm taking an Angular tabs component (I wrote [a blog post on creating a tab component a while back](/blog/2016/02/learning-ng2-creating-tab-component/)) and make it dynamic. We'll learn about

* `<ng-template>`, how to define them, what they're good for and how we can pass them around
* how to place a `<ng-template>` at some arbitrary place using `ngTemplateOutlet`
* how to pass in data to these `<ng-template>` definitions using `ngTemplateOutletContext`
* and finally how to dynamically instantiate an Angular component by using things like `ViewContainerRef`, `ComponentFactoryResolver` and so on...

<a href="https://egghead.io/courses/create-dynamic-components-in-angular" class="external-link" data-client="eggheadio" data-uid="courses/create-dynamic-components-in-angular" style="font-size: 27px;text-align:center;display: block;font-weight: bold;border: 1px solid;width: 70%;margin: 0 auto;">
    <img src="/blog/assets/imgs/egghead-logo-dyn-cmp.png" style="width:350px"><br>
    Start course now<br>
    <i style="font-size:14px">(paid course<sup>*</sup> )</i>
</a>

Oh, I happen to have a [blog post on dynamic tabs](/blog/2017/07/ng2-dynamic-tab-component/) as well :wink:.

## Create Dynamic Forms in Angular

Finally, forms. Angular has two different options for that: Template driven and Model driven, better known as Reactive Forms. Both have pros and cons of course. If you come from AngularJS (v1.x) then you'll immediately like the template driven approach. `ngModel` and friends make you feel at home. But I highly recommend you to take a closer look at the **reactive forms approach**. It's new and might seem a little bit odd initially, but they're extremely powerful. In this course we will even go a step further and explore how we can use them to build forms in completely dynamic manner, based on some JavaScript object which could even be sent from your backend server API.

<a href="https://egghead.io/courses/create-dynamic-forms-in-angular" class="external-link" data-client="eggheadio" data-uid="courses/create-dynamic-forms-in-angular" style="font-size: 27px;text-align:center;display: block;font-weight: bold;border: 1px solid;width: 70%;margin: 0 auto;">
    <img src="/blog/assets/imgs/egghead-logo-dyn-forms.png" style="width:350px"><br>
    Start course now<br>
    <i style="font-size:14px">(paid course<sup>*</sup> )</i>
</a>

## What's next?

This is not all, it's just the beginning :smiley:. I've some more courses, blog posts under way. So keep an eye [on Twitter](https://twitter.com/juristr) and on my [Egghead instructor profile](https://egghead.io/instructors/juri-strumpflohner).

---

_\* All courses are usually free for the first 3 days and will then automatically switch to become part of the PRO course series. It basically means that you need to be a <a href="https://egghead.io/pricing">PRO subscriber</a> on Egghead.io to watch them. If you wanna support my efforts, then definitely go & get a PRO membership if you didn't already. It's totally worth it and you won't only get my courses, but tons of others in the frontend dev space, covering TypeScript, RxJS and much more :smiley:_
