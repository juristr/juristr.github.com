---
layout: post_new
title: "Egghead Lesson: Avoid memory leaks when subscribing to RxJS Observables in Angular Components"
lead: "A free Egghead lesson on avoiding memory leaks in Angular components"
postimg: "/blog/assets/imgs/egghead-memory-leaks.png"
tags: [ "Angular" ]
---

<div class="article-intro">
	RxJS is a first class citizen in every Angular application. It's extremely powerful, but there are also some things you should know and be aware of when using it. Memory leaks is one thing that could happen when you subscribe to "long-running" Observables.
</div>

{% include postads %}

There's already a lot of articles and talks out there about avoiding potential RxJS memory leaks in Angular components. Here are some of my favorite:

{% include article-link.html
    url="https://blog.angularindepth.com/rxjs-avoiding-takeuntil-leaks-fb5182d047ef"
    title="RxJS: Avoiding takeUntil Leaks (by Nicholas Jamieson)"
    text="Using the takeUntil operator to automatically unsubscribe from an observable is a mechanism that’s explained in Ben Lesh’s Don’t Unsubscribe article."
    imageurl="https://pbs.twimg.com/profile_images/894008804060184576/qtM7AmZw_400x400.jpg"
%}

{% include article-link.html
    url="https://youtu.be/OOF2WIFTMaI"
    title="NgTalks: Kwinten Pisman - Keep your memor(ies|y) safe!"
    text="Using the takeUntil operator to automatically unsubscribe from an observable is a mechanism that’s explained in Ben Lesh’s Don’t Unsubscribe article."
    imageurl="https://pbs.twimg.com/profile_images/719906774778789888/z5_arO9z_200x200.jpg"
%}

Since I was about to prepare a proper example for an Angular workshop, I thought this could be useful for a lot of people out there and registered an Egghead lesson (which I made available for free).  
In the lesson I walk through showing you the actual memory leak, and then I walk through fixing the memory leak by 

- manually unsubscribing
- using the `takeUntil` operator
- using the `async` pipe which will handle the whole subscription/unsubscription for us (cleanest way)

Some key take aways: an observable coming from Angular's http client doesn't need to be unsubscribed, as it **immediately completes** once the HTTP call terminates. Still, often these observables are behind service functions which can easily be refactored into different observables and thus might need to be unsubscribed in the future. So watch out for those scenarios.

Similarly, when using `takeUntil`, make sure it's the **last operator in the `.pipe(..)`**, just as explained by both of the link I referenced above. So here you you go:

{% assign uid = "lessons/angular-avoid-memory-leaks-when-subscribing-to-rxjs-observables-in-angular-components" %}
{% include egghead-lesson.html %}

Also, here's a running Stackblitz example.

{% assign uid = "edit/angular-state-mgmnt-scan" %}
{% include stackblitz.html %}

## Like the video?

Consider buying an [Egghead subscription](https://egghead.io/pricing?from=go-pro-nav)! There are tons of interesting videos up there, all around frontend development. Also make sure to check out [my videos & courses published there as well](/videos) and I have some more in the pipe just about to be published :)
