---
title: Using the Nx Dependency Graph in Custom Scripts
date: 2020-07-11T14:32:45.545Z
lead: Unleash the power of Nx
url: /blog/2020/07/use-nx-dep-graph-in-custom-scripts
draft: false
categories:
  - tooling
tags:
  - angular
  - tooling
---
{{<intro>}}
  One of the powerful pilars of the open source [Nx monorepo toolkit](https://nx.dev) is its dependency graph. In this article we're going to look into how you can leverage it in your own scripts.
{{</intro>}}
<!--more-->

{{< postad >}}

[Nx](https://nx.dev) is an open source toolkit to help you scale development with monorepos. What makes Nx stand out are

- **dependency graph -** Nx understands your workspace
- **["affected" commands](https://nx.dev/angular/guides/ci/monorepo-affected#rebuilding-and-retesting-what-is-affected) -** that allow you to only build what really changed
- **[computational caching](https://nx.dev/angular/workspace/computation-caching#computation-caching) -** Victor Savkin also wrote a blog post on ["How to never build or test twice"](https://blog.nrwl.io/how-to-never-build-or-test-the-same-code-twice-2dc58e413279)
- **it is tech agnostic -** while Nx currently focuses mostly on the JavaScript ecosystem, there's nothing in Nx that is particularly bound to it. As such even Java or .Net projects can be built with it

In this article I'd like to focus on the **dependency graph** in particular. Behind the scenes, whenever you reference a libary within your workspace, Nx keeps track of that. As a result, it can build up a dependency graph that is used - for example - to enable the before mentioned **"affected commands"**. "affected commands" can speed up your CI time quite a bit, by only running what really changed. When running your CI job (or even just locally), you can for instance execute unit tests for all affected apps & libs within your workspace using

```
$ nx affected:test
```

Read more [about it on the Nx docs](https://nx.dev/angular/guides/ci/monorepo-affected#rebuilding-and-retesting-what-is-affected).

The intersting part is that the graph can also be visualized by running

```
$ nx dep-graph
```

or by running `affected:dep-graph` to only visualize the affected nodes.

[Isaac Mann](https://twitter.com/MannIsaac) has a nice video on Youtube walking you through the visualization of the dep-graph

{{< youtube cMZ-ReC-jWU >}}

## Leverage Dep-Graph in workspace schematics

Nx helps you automate and tailor your workspace to your needs. The best way to go is to create [custom workspace schematics](https://nx.dev/angular/workspace/schematics/workspace-schematics#workspace-schematics).

...

## Leverage Dep-Graph in custom scripts

...

## Output Dep-Graph to a file



## Conclusion