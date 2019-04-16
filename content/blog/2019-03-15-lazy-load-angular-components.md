---
type: post
title: "Lazy load Angular Components"
lead: >-
  Or better..Angular Modules. Learn about the state of lazy loading in Angular
date: 2019-03-15T10:00:00+01:00
comments: true
url: /blog/2019/03/state-lazy-loading-components-angular
# image: /blog/assets/imgs/rxjs-finalize.jpg
categories:
  - Angular
tags:
  - angular
  - performance
  - lazy loading
draft: true
---

{{<intro>}}
  Improving the startup time of your app is crucial for a good quality app. Reducing the app's bundle size is one way to help with that and that's also where lazy loading comes into play. In this article we're going to explore the current options for lazy loading modules and components in Angular
{{</intro>}}

<!--more-->

{{< postad >}}

## What means lazy loading after all?

When we talk about "lazy loading" **we** mean **loading on demand**. Our goal is to have the main JavaScript bundle (for Angular apps usually `main.js`) as small as possible so that our app can boot up really fast. 

Say we have the "settings" area in our app where the user can specify certain configurations. We know the users only rarely enter these areas. As a result, we want to defer the loading of the corresponding JavaScript for that area as much as possible. Maybe we don't even load it at all. At the latest, when the user clicks on the corresponding menu item, we can execute a HTTP request, fetch the JavaScript file and load up that section of the app.

Now, for this to work, all our compiled TypeScript code for that "settings" area of our app needs to be isolated and compiled into a dedicated JavaScript file that gets deployed along all the other assets, right? That's the only way so that we can then fetch that specific file when needed. Sounds complex :thinking:, but luckily Angular is build on great tooling which does this separate file bundling for us :smiley:.

## What can be lazy loaded?

Great, so now we know what lazy loadig is, but before we dive straight in, let's first define **what can be lazy loaded** in an Angular application. You might be tempted to say "I want to lazy load an Angular component", right? After all that's what you want to visualize at a given moment. However, that's not entirely possible.

The basic unit in Angular is a **module**. If you think about your Angular components, they have dependencies on other components, like Angular Material. But the component itself doesn't specify those dependencies. Rather components are all registered on modules which are then connected between them. As of now (Angular version 7), modules are necessary for Angular in order to "know" how your code works, which dependencies are needed, which components are used in the templates.

Therefore...

<blockquote class="emphasized">The basic unit that can be lazy loaded are <strong>Modules</strong></blockquote>

And with them - of course - come the bundled components which we're ultimately interested in.

## Lazy Loading Routes

Probably the most easy and most widespread usage of lazy loading in Angular apps right now is **via routes**.

```typescript
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'issues',
    loadChildren: './issue-list/issue-list.module#IssueListModule',
  },
  {
    path: 'search',
    loadChildren: './search/search.module#SearchModule'
  }
];
```

Here's an example of a lazy loaded configuration. Rather than specifying the component in the route configuration, we specify the relative path to the module to load, in the form of a string value.

When you re-launch the Angular CLI compilation process, you may immediately note that you get more JavaScript files being produced and not just the standard `main.js`, `runtime.js`, ...

<figure>
  <a href="/blog/assets/imgs/lazy-loaded-bundling-cli.png" class="image--zoom">
    <img src="/blog/assets/imgs/lazy-loaded-bundling-cli.png">
  </a>
  <figcaption>One bundle per lazy loaded file produced by the CLI. Note the issue-list-issue-list-module.js etc..</figcaption>
</figure>

> **Note:** referencing the component in the route configuration - as you would do normally - is not possible as it would imply a JavaScript import statement, thus hard-wire the corresponding file & prevent lazy loading.

## Manual Lazy Loading of Modules

But what about when we need a more fine-grained control over lazy loading, and not just with routes? What if we want to open a dialog for instance, and lazy load its containing component just when the user decides to open that specific dialog?  
Let's assume we want to lazy load a component called `LabelListComponent`. First, we isolate it in a NgModule and **define it to be the bootstrapping component**:

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelListComponent } from './label-list/label-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [LabelListComponent],
  imports: [CommonModule, SharedModule],
  exports: [LabelListComponent],
  bootstrap: [LabelListComponent]
})
export class LabelsModule {}
```

Now we need to figure out how to **lazy load the Angular Module**. But before starting, do you remember the requirement of compiling things into a separate file? When having a lazy loaded router module, the Angular CLI autoamtically takes care for compiling all the JavaScript parts required by that module into a dedicated file that can then be fetched lazily at runtime.  
For the modules we want to bundle separately, we **need to tell the CLI explicitly** which modules should be bundled separately. For doing so, open the `angular.json` and add the path to the modle to the `lazyModules` array. Here's an example.

```json
{
  ...
  "projects": {
    "issue-tracker": {
      ...
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            ...
            "lazyModules": [
              "src/app/shared-components/labels/labels.module",
              "src/app/shared-components/users/users.module"
            ]
          }
        }
      }
    }
  }
}
```

Next, for lazy loading the module itself, we can use Angular's `NgModuleFactoryLoader`. Here's a quick example:

```typescript
import { Injectable, NgModuleFactoryLoader, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LazyModuleService {

  constructor(
    private loader: NgModuleFactoryLoader,
    private injector: Injector
  ) {}

  loadModule(path: string): Promise<HTMLElement> {
    this.loader
      .load(path)
      .then(moduleFactory => {
        const moduleRef = moduleFactory.create(this.injector).instance;
        
        // TODO: do something interesting with the module

      })
      .catch(err => {
        console.error('error loading module', err);
      });
  }
}
```

But we're not done yet. Remember, in the end **we're interested in visualizing the component** in a lazy fashion. Loading the NgModule is just a means to come to that.


### Limitations of this approach

There are some limitations that come with this approach though:

- we cannot have any `@Input` and `@Output` on these components. Rather we need to communicate over services in this case (which can be totally fine)
- we can only have one lazy loaded component per module. Since we're automatically bootstrapping the `bootstrap` component of the lazy module, there's just one we can instantiate
- complicated..ok, to be fair, `lazy-af` makes it pretty simple actually :wink:, but still

## Lazy Loading with Angular Elements

Angular Elements to the rescue :muscle: :heart_eyes:.

- extremely lightweight
- just DOM api