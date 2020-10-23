---
type: post
title: Decomposing the Majestic Monolith with Nx
date: 2020-10-23T14:58:36+02:00
lead: Learn how to decompose your Angular app into a more modular and
  maintainable structure with Nx
url: /blog/2020/10/decompose-majestic-monolith-with-nx
draft: false
categories:
  - angular
  - tooling
  - reactjs
tags:
  - angular
  - tooling
  - reactjs
comments: true
---
{{<intro>}}
  In this article, we're going to have a look at how we can improve our application architecture by splitting it up into a more modular structure. 
{{</intro>}}

<!--more-->

{{< postad >}}

{{<toc>}}

> Note, while in this article I'm mostly talking about Angular, these concepts apply the same to React or other frameworks as well. Even to backend frameworks like Node.js.

## The (majestic) Monolith

If you generate a plain normal Angular app nowadays, you'll get what I call a monolithic structure. If you follow the [folder by feature principle](https://angular.io/guide/styleguide#folders-by-feature-structure), then you'll have a single application, with a bunch of folders, each of which contains the corresponding feature in it.

{{<figure url="/blog/assets/imgs/angular-monolith.png" size="medium" >}}

As shown in the picture above, the app structure is monolithic. Let's explore some of the potential issues you might face as a team when following such structure, especially when you have to scale it.

### Feature Boundaries



https://twitter.com/LayZeeDK/status/1317927987845734414?s=20

## Conclusion

Why would someone want to use Nx in a smaller project?

* **creating stronger feature boundaries -** structuring features in folders is much looser and gives you less constraints. Plus, generating a library you have to explicitly esport things in the main `index.ts` file, thus you have to think more about your feature library’s API than you probably would in a folder
* **Generators help you set up the configuration** stuff and thus you can focus on what matters: shipping code. Also it sets you up with **best practices**, like generating a Unit test setup, e2e test setup for you etc..
* **The dependency graph** can even help in smaller projects getting to understand better what your project’s structure looks like. You often see architectural diagrams which are basically outdated the moment you create them. This is generated each time out of your source code and thus reflects the actual reality
* **Things like “affected” commands or the computation cache** are already beneficial in a small project. If your build doesn’t take half an hour but 10 mins you already get a lot of

![](/blog/assets/imgs/aspnetprojectstructure.jpg)