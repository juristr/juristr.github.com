---
type: post
title: Publishable Angular Libraries with Nx
date: 2021-02-25T17:55:22+01:00
lead: How you can use Nx to setup publishable Angular libraries
url: /blog/2021/03/angular-publishable-libs-with-nx
draft: false
categories:
  - angular
  - tooling
  - nx
tags:
  - angular
  - tooling
  - nx
comments: true
---
{{<intro>}}
  ...
{{</intro>}}

<!--more-->

{{< postad >}}

{{<toc>}}

## Wait, isn't Nx for Monorepos?

...

## Simple publishable libraries

That's pretty easy. Just execute one of Nx's generators (aka schematics):

```
$ npx nx generate @nrwl/angular:library --name=thelib --importPath=@myorg/thelib --publishable
```

This generates a [publishable library](https://nx.dev/latest/angular/structure/buildable-and-publishable-libraries#publishable-libraries) for you. By running..

```
$ npx nx build thelib --prod
```

> Note, `thelib` is the name of the library we generated before

..it produces a folder in `dist/` with the bundled and minified resources, ready to publish to npm or some other package registry.

