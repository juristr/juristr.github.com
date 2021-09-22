---
type: post
title: Run Angular Material Migrations with Nx
date: 2021-08-12T07:40:00+01:00
lead: Let's look into some particularities when running migrations for Angular Material with Nx
url: /blog/2021/08/running-migrations-angular-material-with-nx
draft: true
image: /blog/assets/imgs/nextjs-nx-series/nextjs-nx-storybook-cover.jpg
categories:
  - Angular
  - Nx
tags:
  - Angular
  - Nx
comments: true
---

{{<intro>}}
Bla bla
{{</intro>}}

<!--more-->

{{< postad >}}

Angular's goal was always to be an **everygreen framework** very much like Chrome is everygreen and automatically updates itself. Obviously this implies being on top of the continuously evolving web platform. That's quite a difficult task thought, as you have to balance new features, with backwards compatibility and yet keep the codebase clean and maintainable.

Angular opted to have breaking changes (roughly every 6 months) which might initially seem brutal and a dealbreaker for having a flourishing community around the framework. Why? Well many simply cannot invest every 6 months just in technological upgrade. That's the reason the Angular and specifically the [Angular CLI team](https://angular.io/cli) researched into having **automatic code migrations**.

Automatic code migrations work with the ["ng update"](https://angular.io/cli/update) command, which takes the current local version, downloads the new version and runs migration scripts that not only update the `package.json` but also **directly update the codebase, removing possible breaking changes**.

[Nx](https://nx.dev) pretty much adopoted a similar concept, but also adjusted them slightly to large codebases, where a single migration run might not be sufficient. Read more about [multi step automatic code migrations here](/blog/2020/11/multi-step-automatic-code-migrations/).

## What's the deal with Angular Material migrations?

When Angular Material runs their migrations, to find the projects, they look into either a `build` entry in the `angular.json` or a `test` entry that has the `tsconfig` property set. Here are the details:

https://github.com/angular/components/blob/9107ac078b6aadd5c1a57dc31a9d57d5d1736cfd/src/cdk/schematics/ng-update/devkit-migration-rule.ts#L82-L89

In an Nx workspace, there might be libraries that have no `build` target (unless they are [buildable or publishable libraries](https://nx.dev/latest/angular/structure/buildable-and-publishable-libraries)). Usually all of them have a `test` target, but they don't have a `tsconfig` property set on the Jest based tests.

{{<figure url="/blog/assets/imgs/material-nx-migrations.png" size="full">}}



## Adjusting `angular.json` to run Material migrations


```json
{
  "projects": {
    "client": {
      ...
      "architect": {
        "build": {
            ...
        },
        ...
        "test": {
          "builder": "@nrwl/jest:jest",
          "options": {
            "jestConfig": "apps/style-guide/client/jest.config.js",
            "passWithNoTests": true
          },
          "outputs": ["coverage/apps/style-guide/client"]
        }
      }
    }
  }
}
```

> *Note:* if you're using the newer version of the Nx angular.json or workspace.json you might see **targets** instead of **architect**.
