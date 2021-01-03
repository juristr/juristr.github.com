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

When the Angular team initially announced the concept of "evergreen framework", developers were kinda skeptical as well as worried. The plan: weekly bugfix releases, monthly features with larger, potentially breaking changes **every 6 month**.

## Ng update

When the Angular team initially announced a breaking change every 6 months, the developer community 

Innovation needs breaking changes at some point.

...

- breaking changes are necessary for pushing innovation
- can be problematic for teams as fixing breaking changes doesn't deliver end-user value; no one pays for that, but still needed to delivery value in the long run => maintainance work
- Updating software a no-brainer nowadays -> e.g. Chrome for instance has become evergreen
- Angular team tries to change that by applying the evergreen concept to code

## Automated code migrations with large scale teams

- problem: you have to run multiple times, cannot just run once


## Nx Multi-step migration process

{{<egghead-lesson uid="/lessons/egghead-update-your-nx-workspace-with-nx-migrations" >}}

