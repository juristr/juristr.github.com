---
type: post
title: Automatic Multi-Step Code Migrations with Nx
date: 2021-01-03T10:00:00+01:00
lead: How the Angular CLI changed the way we think about breaking changes & how
  Nx is different with its multi-step migration command
url: /blog/2020/11/multi-step-automatic-code-migrations
draft: false
categories:
  - angular
tags:
  - angular
  - tooling
  - nx
comments: true
---
{{<intro>}}
  Besides the actual framework, the Angular team has introduced a lot of tooling around Angular with the goal of giving devs more time to focus on the actual code rather than fighting with tooling itself. One such feature is the ability to automatically upgrade the framework across breaking changes.
{{</intro>}}

<!--more-->

{{< postad >}}

{{<toc>}}

## Evergreen framework

When the Angular team initially announced the concept of "evergreen framework", developers were kinda skeptical as well as worried. The plan: weekly bugfix releases, monthly features with larger, potentially breaking changes **every 6 months**.

To be able to innovate, breaking changes are necessary at some point. However, that only works if the community is also able to keep up and stay close to the latest releases.

## Ng update

The solution to that is "ng update", a process that automatically updates not only the npm packages, but also runs migration scripts (Code schematics aka generators) to migrate the code and configuration files to the new version in the event of breaking changes.

The [Angular Update site](https://update.angular.io) has useful instructions on what to run in order to properly update to the next version of Angular.

## Automated code migrations at scale

`ng update` works fully automated, analyzing the workspace and then upgrading Angular and other Angular related packages.

While this works most of the time, it isn't ideal for large teams. If you work on a large repository (maybe even in a monorepo), the moment you upgrade it to the next Angular version **you're not really done**. At any moment in time, there are dozens of PRs open, waiting to be merged. Those branches _didn't run the Angular migrations_ and you'll run into merge conflicts and even dead code or wrong configuration files.


## Nx Multi-step migration process



{{<egghead-lesson uid="/lessons/egghead-update-your-nx-workspace-with-nx-migrations" >}}

