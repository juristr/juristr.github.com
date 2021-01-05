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

To be able to innovate, breaking changes are necessary at some point. However, that only works if the community is able to keep up with the latest releases.

## Ng update

The solution to that is "ng update", a process that automatically updates not only the npm packages, but also runs migration scripts (Code schematics aka generators) to migrate the code and configuration files to the new version in the event of breaking changes.

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

```json
{
  "migrations": [
    {
      "version": "10.1.0-beta.0",
      "description": "Migrate .eslintrc files to use tsconfig with a wildcard",
      "factory": "./src/migrations/update-10-1-0/migrate-eslintrc-tsconfig-wildcard",
      "package": "@nrwl/workspace",
      "name": "migrate-eslintrc-tsconfig-wildcard"
    },
    {
      "version": "10.3.0-beta.0",
      "description": "Add @nrwl/cli as dependency",
      "factory": "./src/migrations/update-10-3-0/add-cli-dependency",
      "package": "@nrwl/workspace",
      "name": "add-cli-dependency"
    },
    {
      "version": "10.3.0-beta.0",
      "description": "Update typescript to v4",
      "factory": "./src/migrations/update-10-3-0/update-typescript",
      "package": "@nrwl/workspace",
      "name": "update-10-3-0"
    },
    {
      "version": "10.3.0-beta.1",
      "description": "Adds .vscode/extensions.json to a workspace",
      "factory": "./src/migrations/update-10-3-0/add-vscode-extensions",
      "package": "@nrwl/workspace",
      "name": "add-vscode-extensions"
    },
    {
      "version": "10.3.0-beta.0",
      "description": "Adds `buildableProjectDepsInPackageJsonType` for web and angular package builders",
      "factory": "./src/migrations/update-10-3-0/add-buildable-project-deps-in-package-json-type",
      "package": "@nrwl/workspace",
      "name": "add-buildable-project-deps-in-package-json-type"
    },
    {
      "version": "10.4.0-beta.5",
      "description": "Add an explicit dependency on @nrwl/tao",
      "factory": "./src/migrations/update-10-4-0/add-explicit-dep-on-tao",
      "package": "@nrwl/workspace",
      "name": "add-explicit-dep-on-tao"
    },
    {
      "version": "10.4.5",
      "description": "Update the 'update' npm script to invoke nx migrate",
      "factory": "./src/migrations/update-10-4-0/update-script-to-invoke-nx-migrate",
      "package": "@nrwl/workspace",
      "name": "update-script-to-invoke-nx-migrate"
    },
    {
      "version": "11.0.0-beta.3",
      "description": "Update the decoration script when using Angular CLI",
      "factory": "./src/migrations/update-11-0-0/update-decorate-angular-cli",
      "package": "@nrwl/workspace",
      "name": "update-decorate-angular-cli"
    },
    {
      "version": "11.0.0-beta.3",
      "description": "Update the @types/node package",
      "factory": "./src/migrations/update-11-0-0/update-node-types",
      "package": "@nrwl/workspace",
      "name": "update-node-types"
    },
    {
      "version": "11.0.0-beta.3",
      "description": "Rename tools/schematics into tools/generators",
      "factory": "./src/migrations/update-11-0-0/rename-workspace-schematics",
      "package": "@nrwl/workspace",
      "name": "rename-workspace-schematics"
    },
    {
      "version": "11.0.0-beta.15",
      "description": "Adds `outputs` based on builders",
      "factory": "./src/migrations/update-11-0-0/add-outputs-in-workspace",
      "package": "@nrwl/workspace",
      "name": "add-outputs-in-workspace"
    },
    {
      "version": "11.0.0",
      "description": "Check that the right update command is used",
      "factory": "./src/migrations/update-11-0-0/update-command-check",
      "package": "@nrwl/workspace",
      "name": "update-command-check"
    },
    {
      "version": "11.0.2",
      "description": "Rename the workspace-schematic script into workspace-generator script",
      "factory": "./src/migrations/update-11-0-0/rename-workspace-schematic-script",
      "package": "@nrwl/workspace",
      "name": "rename-workspace-schematic-script"
    },
    {
      "version": "10.1.0-beta.4",
      "description": "Update jest to v26",
      "factory": "./src/migrations/update-10-1-0/update-10-1-0",
      "package": "@nrwl/jest",
      "name": "update-10.1.0"
    },
    {
      "version": "10.2.0",
      "description": "Remove deprecated jest builder options",
      "factory": "./src/migrations/update-10-2-0/update-10-2-0",
      "package": "@nrwl/jest",
      "name": "update-10.2.0"
    },
    {
      "version": "10.3.0-beta.1",
      "description": "Adds all jest projects into the root jest config",
      "factory": "./src/migrations/update-10-3-0/update-projects-property",
      "package": "@nrwl/jest",
      "name": "update-projects-property"
    },
    {
      "version": "10.3.1-beta.1",
      "description": "Fix ts-jest migration",
      "factory": "./src/migrations/update-10-3-0/update-ts-jest",
      "package": "@nrwl/jest",
      "name": "update-ts-jest"
    },
    {
      "version": "10.3.0-beta.1",
      "description": "Adds a jest extension to the recommended extensions for vscode",
      "factory": "./src/migrations/update-10-3-0/add-jest-extension",
      "package": "@nrwl/jest",
      "name": "add-jest-extension"
    },
    {
      "version": "10.3.0-beta.1",
      "description": "Update @typescript-eslint to v4.3",
      "factory": "./src/migrations/update-10-3-0/update-10-3-0",
      "package": "@nrwl/linter",
      "name": "update-10.3.0"
    },
    {
      "version": "10.3.0-beta.0",
      "description": "Migrate to the new ESLint builder and ESLint config style",
      "factory": "./src/migrations/update-10-3-0/update-eslint-builder-and-config",
      "package": "@nrwl/linter",
      "name": "update-eslint-builder-and-config"
    },
    {
      "version": "10.3.0-beta.2",
      "description": "Add explicit .json file extension to .eslintrc files, not using an extension is deprecated",
      "factory": "./src/migrations/update-10-3-0/add-json-ext-to-eslintrc",
      "package": "@nrwl/linter",
      "name": "add-json-ext-to-eslintrc"
    },
    {
      "version": "10.3.0-beta.3",
      "description": "Update implicitDependencies within nx.json to include root .eslintrc.json",
      "factory": "./src/migrations/update-10-3-0/add-root-eslintrc-json-to-workspace-implicit-deps",
      "package": "@nrwl/linter",
      "name": "add-root-eslintrc-json-to-workspace-implicit-deps"
    },
    {
      "version": "10.3.1-beta.1",
      "description": "Revert any node_modules lintFilesPatterns that were accidentally included by update-eslint-builder-and-config",
      "factory": "./src/migrations/update-10-3-1/revert-node-modules-files-in-eslint-builder-options",
      "package": "@nrwl/linter",
      "name": "revert-node-modules-files-in-eslint-builder-options"
    },
    {
      "version": "10.4.0-beta.0",
      "description": "Update ESLint config files to use preset configs which eslint-plugin-nx exports",
      "factory": "./src/migrations/update-10-4-0/update-eslint-configs-to-use-nx-presets",
      "package": "@nrwl/linter",
      "name": "update-eslint-configs-to-use-nx-presets"
    },
    {
      "version": "10.4.0-beta.1",
      "description": "Update root ESLint config to use overrides",
      "factory": "./src/migrations/update-10-4-0/update-root-eslint-config-to-use-overrides",
      "package": "@nrwl/linter",
      "name": "update-root-eslint-config-to-use-overrides"
    },
    {
      "version": "10.4.0-beta.1",
      "description": "Update libraries",
      "factory": "./src/migrations/update-10-4-0/update-10-4-0",
      "package": "@nrwl/react",
      "name": "update-10.4.0"
    },
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

The key of this migration process is that first, it **allows to inspect** the intermediate steps of the upgrade and allows to **adjust** if needed. And second, the `migrations.json` allows to **run migrations multiple times**.

As such, the `migrations.json` can be checked into the repository. All open PRs and branches can rebase with the latest `main` branch and re-execute the `nx migrate --run-migrations=migrations.json` command to migrate their own branch as well. That way we avoid dead code or huge merge conflicts.

### Egghead lesson: Upgrading with Nx migrate

{{<egghead-lesson uid="lessons/egghead-update-your-nx-workspace-with-nx-migrations" >}}

- [Nx migrate docs](https://nx.dev/latest/cli/migrate)

