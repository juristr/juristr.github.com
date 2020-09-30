---
type: post
title: Using the Nx Dependency Graph in Custom Scripts
date: 2020-09-30T11:09:52+02:00
lead: Unleash the power of the Nx dep-graph
url: /blog/2020/09/use-nx-dep-graph-in-custom-scripts
draft: false
image: /blog/assets/imgs/dependency-graph.png
categories:
  - tooling
tags:
  - angular
  - tooling
comments: true
---
{{<intro>}}
  One of the powerful pilars of the open source [Nx monorepo toolkit](https://nx.dev) is its dependency graph. In this article we're going to look into how we can leverage it in our own scripts.
{{</intro>}}

<!--more-->

{{< postad >}}

[Nx](https://nx.dev) is an open source dev toolkit to help you scale development with monorepos. What makes Nx stand out is

* **dependency graph -** Nx understands your workspace
* **["affected" commands](https://nx.dev/angular/guides/ci/monorepo-affected#rebuilding-and-retesting-what-is-affected) -** that allow you to only build what really changed
* **[computational caching](https://nx.dev/angular/workspace/computation-caching#computation-caching) -** Victor Savkin also wrote a blog post on ["How to never build or test twice"](https://blog.nrwl.io/how-to-never-build-or-test-the-same-code-twice-2dc58e413279)
* **it is tech agnostic -** while Nx currently focuses mostly on the JavaScript ecosystem, there's nothing in Nx that is particularly bound to it. As such even Java or .Net projects can be built with it

In this article I'd like to focus on the **dependency graph** in particular. Behind the scenes, whenever you reference a libary within your workspace, Nx keeps track of that. By knowing the structure of the monorepo, Nx is able to provide significant improvements to the developer experience. One such improvement are the so-called “affected” commands. For instance to run your tests:

```
$ nx affected:test
```

or 

```
$ nx affected:build
```

to run the build of your apps and libs. Affected commands only execute the test/build/... on the changed apps and libs. As you can imagine, such commands can help you speed up your CI pipeline time quite a bit. Read more [about it on the Nx docs](https://nx.dev/angular/guides/ci/monorepo-affected#rebuilding-and-retesting-what-is-affected).

The intersting part is that the graph can also be visualized by running

```
$ nx dep-graph
```

or by running `affected:dep-graph` to only visualize the affected nodes.

[Isaac Mann](https://twitter.com/MannIsaac) has a short video that walks you through the visualization of the dep-graph

{{< youtube cMZ-ReC-jWU >}}

## Access the project-graph from code

Nx comes with a set of built-in automations. But after all, each workspace is unique and you should customize it to your needs. For those custom automation scripts it might be helpful to be able to leverage the dependency graph as well. There are several ways this can be done.

### Approach 1: From TypeScript

**Inside your TypeScript files**, you can get the nodes of the dep-graph as follows:

```typescript
import { createProjectGraph } from '@nrwl/workspace/src/core/project-graph';

const graph = createProjectGraph();
```

**Note,** the import is a deep import grabbing the function from the `core/project-graph` file. Since that is not part of the public API, it might be subject to changes. Just be aware of that.

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
    execSync(`npx nx print-affected --base=${baseSha}`)
      .toString()
      .trim()
  ).tasks.map((t) => t.target.project);
```

## Approach 4: Print Affected Apps & Libs

The above mentioned **approach 3** gives you already a lot of flexibility because it allows you to filter and manipulate the resulting JSON output.

As an alternative you can also use `affected:apps` and `affected:libs`. Especially if you pass the `—-plain` flag, it gives you a plain space-separated list of apps/libs you can again parse from a custom script.

```
$ nx affected:apps —-base=master —-plain
```

More can be [found on the Nx docs](https://nx.dev/angular/cli/affected-apps).

## Where to use it

There are two primary use cases for this inside an Nx monorepo.

- **[Workspace schematics](https://nx.dev/angular/workspace/schematics/workspace-schematics#workspace-schematics) -** Schematics is a fancy word for “generators”, scripts that can be written in TypeScript and which are able to create, update or delete code from your workspace. Nx itself comes with a set of built-in schematics. Workspace schematics allow you to create ad-hoc schematics inside your monorepo
- **Custom scripts -** These are usually placed in the `tools` folder of your Nx repo and can be shell scripts, Node.js scripts or whatever you really like.
- **Optimize your CI setup -** by implementing [distributed builds](https://nx.dev/angular/guides/ci/distributed-builds) that parallelize across multiple nodes. 

## Conclusion

In this article we’ve briefly looked into the [Nx](https://nx.dev) dependency graph, how it works and especially how you can leverage it from your own code.