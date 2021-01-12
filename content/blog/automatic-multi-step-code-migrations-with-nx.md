---
type: post
title: Automatic Multi-Step Code Migrations with Nx
date: 2021-01-08T10:00:00+01:00
lead: How the Angular CLI changed the way we think about breaking changes & how
  Nx is different with its multi-step migration command
url: /blog/2020/11/multi-step-automatic-code-migrations
draft: false
image: /blog/assets/imgs/update-background.jpg
categories:
  - angular
tags:
  - angular
  - tooling
  - nx
comments: true
---
{{<intro>}}
  Apart from the framework itself, one outcome from Google's Angular team is for sure the tooling. One important tooling feature is the ability to automatically upgrade Angular codebases across breaking changes. Let's see how that works and why it is important.
{{</intro>}}

<!--more-->

{{< postad >}}

{{<toc>}}

## Evergreen framework

This idea came with the dream of the "evergreen framework" where the majority of people would always have the latest version of the framework installed. This obviously allows to innovate faster. For realizing such concept however, upgrading needs to be easy and straightforward, otherwise the developer community won't be able to keep pace and fragmentation would start.

Upgrading however is rarely easy, especially when breaking changes are involved. And sooner or later those will be required.

## Ng update

As a solution to that, the Angular team released "ng update", a process that automatically updates not only the npm packages, but also runs migration scripts (Code schematics aka generators) to migrate the code and configuration files to the new version in the event of breaking changes.

The [Angular Update site](https://update.angular.io) has useful instructions on what to run in order to properly update to the next version of Angular.

## Automated code migrations at scale

`ng update` works fully automated, analyzing the workspace and then upgrading Angular and other Angular related packages in one go.

While this works most of the time, it isn't ideal for large teams. If you work on a large repository (maybe even in a monorepo), the moment you upgrade to the next Angular version **you're not really done**. The development is still ongoing as it isn't really feasible to stop development during the upgrade period. Instead, the migration needs to happen alongside development.

Thus, at any moment in time, there are potentially dozens of PRs open, waiting to be merged. Those branches haven't executed the Angular migration and might therefore be behind, leading to stale files and outdated config files, not to speak about the merge conflicts when we try to merge back into the main branch.

## Nx Multi-step migration process

To solve the above issue, [Nx](https://nx.dev) comes with its own, multi-step migration command: `nx migrate` ([check out the docs](https://nx.dev/latest/cli/migrate)). While it is inspired by how the Angular CLI does the upgrade, it works slightly differently with the aim to make it easier to upgrade especially for large-scale environments.

Nx migrate's goal is to automate the process up to a certain point and then to leave the rest to the developer, allowing them to take control over the migration process. It works as follows:

```
$ nx migrate latest
```

1. triggers the analysis of the local workspace to determine the packages that need to be updated. 
1. It then **updates the `package.json`** with the new version numbers, without however installing them.
1. It generates a `migration.json` containing pointers to the scripts that need to be exected to migrate the code and configuration files to the next version.

At this point the upgrade process halts, allowing the developer to **inspect and in case adjust** the changes made to the `package.json` as well as the content of the `migrations.json`.

If the changes look reasonable, the developer installs the packages with

```
$ yarn install # or npm install
```

Finally, executing

```
$ nx migrate --run-migrations=migrations.json
```

runs all the migration scripts to upgrade the codebase.

### Migrating multiple times

The key of this migration process is that first, it **allows to inspect** the intermediate steps of the upgrade and allows to **adjust** if needed. And second, the `migrations.json` allows to **run migrations multiple times**. Here's the content of a potential `migrations.json` file.

```json
{
  "migrations": [
    {
      "version": "11.0.0-beta.0",
      "description": "Rename emotion packages to match new 11.0.0 package names",
      "factory": "./src/migrations/update-11-0-0/rename-emotion-packages-11-0-0",
      "package": "@nrwl/react",
      "name": "rename-emotion-packages-11.0.0"
    },
    {
      "version": "11.0.0-beta.0",
      "description": "Update libraries",
      "factory": "./src/migrations/update-11-0-0/update-11-0-0",
      "package": "@nrwl/react",
      "name": "update-11.0.0"
    },
    {
      "version": "10.2.1-beta.1",
      "description": "Adjusts the tsconfig mapping",
      "factory": "./src/migrations/update-10-2-1/update-10-2-1",
      "package": "@nrwl/storybook",
      "name": "update-10.2.1"
    },
    {
      "version": "10.3.1-beta.1",
      "description": "Add missing storybook config to lint target",
      "factory": "./src/migrations/update-10-3-0/update-10-3-0",
      "package": "@nrwl/storybook",
      "name": "update-10.3.1"
    },
    {
      "version": "11.0.12",
      "description": "Update storybook if installed and above 6",
      "factory": "./src/migrations/update-11-0-12/update-storybook",
      "package": "@nrwl/storybook",
      "name": "update-11-0-12"
    }
  ]
}
```

As such, the `migrations.json` can be checked into the repository. All open PRs and branches can rebase with the latest `main` branch and re-execute the `nx migrate --run-migrations=migrations.json` command to migrate their own branch as well. That way we avoid dead code or huge merge conflicts.

### Egghead lesson: Upgrading with Nx migrate

{{<egghead-lesson uid="lessons/egghead-update-your-nx-workspace-with-nx-migrations" >}}

Other resources:

- [Nx migrate docs](https://nx.dev/latest/cli/migrate)

