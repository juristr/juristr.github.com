---
title: Configure Ahead of Time (AoT) for your Angular app using the Angular CLI
lead: Learn how to leverage the true power of AoT compilation with the CLI
categories:
  - Angular
  - JavaScript
date: 2016-12-03T01:00:00.000Z
comments: true
url: /blog/2016/12/configure-aot-with-angular-cli
type: post
image: /blog/assets/imgs/aot-compilation-cover.png
---

<div class="article-intro">
  In <a href="/blog/2016/10/lets-create-ur-first-ng2-app/" target="_blank">our previous video</a> we learned how to use the <a href="" target="_blank">Angular CLI</a> to create our first Angular application. Now it's time to prepare it for production. That requires some building, bundling, minifying and "Ahead of Time" compilation. In this video we will learn how simple it can be by using the Angular CLI.
</div>

{{< postad >}}

> **TL;DW (Too long, didn't watch):** You can simply append the `--aot` to your build instruction, like `ng build --prod --aot`. Ya, it's really that damn simple :smiley: 

> **UPDATE (March 1st, 2017) -** The Angular CLI now automatically builds with AoT enabled if you use the `--prod` flag. So there's no need to add it explicitly. The `--aot` flag still remains though if you wanted to use AoT in dev mode for instance.

This video you will learn about...

- how to use the Angular CLI to create a production bundle
- what Ahead-of-time (AoT) compilation is about
- how to use the Angular CLI to activate AoT compilation

<iframe width="853" height="480" src="https://www.youtube.com/embed/nxMCBKpRC60" frameborder="0" allowfullscreen="allowfullscreen"> </iframe>

You can download [the source code I use in the video from my repository](https://github.com/juristr/video-your-first-ng2-app).

#### Links

{%
  include article-link.html
  url="https://angular.io/docs/ts/latest/cookbook/aot-compiler.html"
  title="Angular Docs Cookbook: Ahead of Time Compilation"
  text="Learn how to use Ahead-of-time compilation"
  imageurl="/blog/assets/imgs/linkpics/angular2logo.svg"
>}}

