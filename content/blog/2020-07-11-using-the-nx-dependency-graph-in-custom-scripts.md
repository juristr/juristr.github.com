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

* **dependency graph -** Nx understands your workspace
* **["affected" commands](https://nx.dev/angular/guides/ci/monorepo-affected#rebuilding-and-retesting-what-is-affected) -** that allow you to only build what really changed
* **[computational caching](https://nx.dev/angular/workspace/computation-caching#computation-caching) -** Victor Savkin also wrote a blog post on ["How to never build or test twice"](https://blog.nrwl.io/how-to-never-build-or-test-the-same-code-twice-2dc58e413279)
* **it is tech agnostic -** while Nx currently focuses mostly on the JavaScript ecosystem, there's nothing in Nx that is particularly bound to it. As such even Java or .Net projects can be built with it

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

## Access the project-graph from code

Nx comes with a set of built-in automations. But after all, each workspace is unique and you should customize it to your needs. For those custom automation scripts you might want to be able to access the dependency graph.

### Approach 1: From TypeScript

**Inside your TypeScript files**, you can get the nodes of the dep-graph as follows:

```typescript
import { createProjectGraph } from '@nrwl/workspace/src/core/project-graph';

const graph = createProjectGraph();
```

### Approach 2: Output to JSON

You can also **output the graph into a json file** like

```
nx dep-graph --file=testgraph.json
```

This is especially useful if you need to pipe it into another program again.

### Approach 3: Print Affected

If you look at [the distributed CI setup](https://nx.dev/angular/guides/ci/distributed-builds) on the Nx docs, there’s an example for the Azure setup, which uses the dependency graph to calculate the affected nodes for then distributing the build accordingly.

This is an excerpt from that Node.js script:

```javascript
const execSync = require('child_process').execSync;

const array = JSON.parse(
    execSync(`npx nx print-affected --base=${baseSha} --target=${target}`)
      .toString()
      .trim()
  ).tasks.map((t) => t.target.project);
```

## Where to use it



## Leverage Dep-Graph in workspace schematics

Nx helps you automate and tailor your workspace to your needs. The best way to go is to create [custom workspace schematics](https://nx.dev/angular/workspace/schematics/workspace-schematics#workspace-schematics).

Inside a workspace schematic you can import the dep-graph as follows:

```ts
import { createProjectGraph } from '@nrwl/workspace/src/core/project-graph';

const graph = createProjectGraph();
```

## Leverage Dep-Graph in custom scripts

Another way to automate your

## Output Dep-Graph to a file

## Conclusion