---
type: post
title: "Create Nx Libs with Assets"
lead: "Learn how to create Nx libraries don't only ship code but also assets"
date: 2020-05-21T00:01:04+02:00
comments: true
url: /blog/2020/05/nx-libs-with-assets
image: /blog/assets/imgs/libs-with-assets-bg.png
categories:
  - Angular
  - Nx
tags:
  - rxjs
  - angular
  - Nx
draft: false
---

{{<intro>}}
  One of the core pieces of [Nx](https://nx.dev) are libraries. They enable to seamlessly share functionality across various apps and other libs within the monorepository. Exporting code is easy, but how can we export things like assets? :thinking:
{{</intro>}}
<!--more-->

{{< postad >}}

## TL;DR

Here's a short video that walks you through.

{{<youtube iU2PKRaTGQ0>}}

## How assets work with the Angular CLI

When you generate a new Angular application, you usually get an `src/assets` folder generated as well. That folder is specifically there to host your static files, usually images, but also JSON files etc if you want. When you compile your app, that folder will be copied over to your `dist/` output directory. Similarly when you `ng serve` the app, the webpack dev server will make sure to expose them under `/assets/...`. But how does the CLI know?

Let's open up the `angular.json` file. Since Nx extends the Angular CLI in various ways, you'll find that in an Nx workspace as well. If you go to your app's configuration, you'll find an `assets` entry, which lists the files and folders that should be copied.

```json
{
  "version": 1,
  "projects": {
    "demoapp": {
      "projectType": "application",
      ...
      "root": "apps/demoapp",
      ...
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            ...
            "assets": [
              "apps/demoapp/src/favicon.ico",
              "apps/demoapp/src/assets"
            ],
            ...
          },
          ...
        },
      }
    },
  },
  ...
}
```

## How can an Nx lib provide assets to an app

Usually you export code from a library. But sometimes it also makes sense to export images and other asset files as well.

So the first step to do that is to create an actual `assets` folder that allows us to host them.

{{<figure url="/blog/assets/imgs/libs-with-assets.png" size="medium">}}

Next, we need to configure the target app's asset configuration. As we've seen before, that's being done in the `angular.json`. All we need to do is to add the following section:

```json
"assets": [
  ...
  {
    "input": "libs/greeter/src/assets",
    "glob": "**/*",
    "output": "assets/greeter"
  }
]
```

## Opportunity: automate with Nx Workspace Schematics

Configuring `assets` this way is quite a manual approach, which is why this is a great opportunity to **automate it with Nx Workspace schematics**. You can [read more about that in the Nx docs](https://nx.dev/angular/workspace/schematics/workspace-schematics).

## Play around with it by yourself

GitHub repository: https://github.com/juristr/nxtips-libs-with-assets

