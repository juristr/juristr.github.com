---
type: post
title: Deploy a single app from an Nx workspace
date: 2020-11-26T10:43:16+01:00
lead: ...
url: /blog/2020/11/deploy-app-from-nx-workspace
draft: false
categories:
  - nx
comments: true
---
{{<intro>}}
When people start using an [Nx workspace](https://nx.dev) with multiple apps, they often get confused when it comes to deployment. How do I deploy just a single application?
{{</intro>}}

<!--more-->

## affected:build

Nx comes with the so-called "affected" commands. What affected commands do is basically to analyze your git commit history and figure out which apps and/or libs have been affected by your change. As a result, only those and the dependent other apps and libs will be built/tested/linted etc. This is for scaling reasons since these operations might be computation and time intense tasks. Here's a quick video that shows you how it works. 

{{<egghead-lesson uid="lessons/javascript-scale-ci-runs-with-nx-affected-commands" >}}

But what about about deployment? If I have different apps in my workspace and I just want to deploy a single one, say "my-app". How would I do that?

## Building and deploying a single application

