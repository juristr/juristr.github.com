---
type: post
title: Scale React Development with Nx
date: 2020-10-27T23:04:02+01:00
lead: Learn about scaling React development with Nx, with my free Egghead course
url: /blog/2020/10/scale-react-dev-with-nx
draft: false
image: /blog/assets/imgs/egh_scalingreactnx.png
categories:
  - reactjs
  - tooling
tags:
  - reactjs
  - tooling
comments: true
---

{{<intro>}}
I'm super happy to announce the release of my latest Egghead course on scaling React development with Nx. Let me briefly dive into what the course is about, why I targeted it specifically to React.js developers and who should watch it!
{{</intro>}}

<!--more-->

{{< postad >}}

{{<toc>}}

> **Disclaimer 1:** I actually work at Nrwl since January and was able to record this course as part of our 20% time, where we work on open source and other stuff. 


> **Disclaimer 2:** I've been an Nx user for much longer, even before joining Nrwl, simply because I'm convinced it helps developers in a variety of different ways to be more productive and create higher quality outcomes.

## Click to check out the course

{{<egghead-course uid="playlists/scale-react-development-with-nx-4038" lesson_img="/blog/assets/imgs/egh_scalingreactnx.png" >}}

I'm a huge fan of the Egghead illustrations, designed by Egghead's Art Directory [Maggie Appleton](https://twitter.com/Mappletons). And so I asked her about the story behind the illustration and what drove her inspiration when creating it.

The logo represents a coral reef as an analogy to Nx bundling together different organisms (technologies) into one cohesive ecosystem. You can think of the various sea organisms as being the different technologies around Angular, React.js and Node. Also, given Nrwl is themed around Narwhals this is really on point :smiley:.

## What's in the course?

On the surface, starting a project sounds easy. First you make some directories, install some dependencies, then you write some code. But there's a bit more to it than just those three steps.

The type of project you're working on impacts the decisions you make. It gets more complicated when you're working on multiple projects that are related. For example, maybe you have a customer-facing frontend app, an admin dashboard app, and a single backend used for both.

How does this change your directory structures? How should you share code between projects? What happens when you add a Design System into the mix? It can get hard to keep things straight in your head.

Nx is a tool that aims to solve these problems for you, whether you're working solo on a small full-stack app or on a dev team of thousands. It's not just an opinionated folder structure. When you create an app with Nx, it generates unit and e2e test setups as well as preparing bundling and code-splitting with Webpack, and stubbing out common features like routing.

One of the coolest features of Nx is its Dependency Graph. The graph can visually show you the relationship between the parts of your application, and is optimized to ensure that compiling, testing, and linting only happens in the affected areas of your project.


## I'm a React.js dev, why should I watch this?

Nope, Nx is a general purpose development tool, designed to help scale development especially on large monorepos. It actually emerged as an extension to the Angular CLI, but evolved to be much more than just an improved CLI on top of the Angular ecosystem. As of writing this article, Nx supports the Angular and React ecosystem out of the box, with more coming.

I targeted the course specifically to React.js developers because thye 
 
https://egghead.io/playlists/scale-react-development-with-nx-4038