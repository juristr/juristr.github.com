---
title: 'Egghead Lesson: Simple caching with RxJS'
lead: Video session on how to implement simple caching using RxJS in Angular
categories:
  - Angular
  - RxJS
  - Egghead
date: 2018-11-11T01:00:00.000Z
comments: true
url: /blog/2018/11/videolesson-rxjs-caching-angular
type: post
image: /blog/assets/imgs/caching-video-cover.png
---

<div class="article-intro">
    This is the accompanying article for my latest Egghead video lesson on caching data in Angular by leveraging RxjS.
</div>

{{< postad >}}

Caching is hard, it's one of the hard topics in software development because so many things can go wrong. Even though some implementations are quite easily doable, the problem usually lies in when to invalidate the cache to not show stale data to the user and debugging issues (because you might run into your cache and not see what you'd actually expect). We've been all there, and still, often we need to cache data to improve the performance of our apps. Things I'm always considering there is...

- to delay the caching at the very latest moment. Try other optimizations before, and in case add in caching later
- consider server-side API level caching, whether that is response headers or cache servers like Redis. Note that the API is the single entry point where you have the best knowledge about data freshness.

## Caching in Angular

Caching in Angular can be implemented in many ways. For instance if you're using ngrx for state management, you somehow have a cache implemented out of the box. That's because your store functions as local in-memory database. Once you have it filled, you don't necessarily have to go back to the API (again, watch out for stale data here :wink:).

In this article I'm not going to deep dive into it, there are lots of articles out there. Especially the one on [Advanced Caching with RxJS](https://blog.thoughtram.io/angular/2018/03/05/advanced-caching-with-rxjs.html) from [Dominik](https://twitter.com/elmd_) from the [Thoughtram team](https://blog.thoughtram.io). I just recorded a video session for Egghead, largely based on his article and implementation of a simple caching mechanism with RxJS.

## The Video Lesson

{{<egghead-lesson uid="lessons/angular-cache-data-in-angular-services-using-rxjs">}}
 

## Running Stackblitz example

Also, here's a running Stackblitz example.

{{<stackblitz uid="edit/angular-egghead-rxjs-caching" >}}
 

## Like the video?

Consider buying an [Egghead subscription](https://egghead.io/pricing?from=go-pro-nav)! There are tons of interesting videos up there, all around frontend development. Also make sure to check out [my videos & courses published there as well](/videos) and I have some more in the pipe just about to be published :)
