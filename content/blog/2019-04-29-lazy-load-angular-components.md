---
type: post
title: "Lazy load Angular Components"
lead: >-
  Or better..how to lazy load Angular Modules. Learn about the state of lazy loading and lazy loading on steroids with Angular Elements
date: 2019-04-29T14:00:00+01:00
comments: true
url: /blog/2019/04/state-lazy-loading-components-angular
image: /blog/assets/imgs/lazy-load-components.jpg
categories:
  - Angular
tags:
  - angular
  - performance
  - lazy loading
  - videos
---

{{<intro>}}
  Lazy loading is hot recently and for a good reason. It's all about speed! The Chrome team at Google in specific (around Addy Osmani) tries to push out content (and new APIs) to optimize the heck out of web pages. Now there's one thing modern, JavaScript heavy websites often suffer: startup speed. <!--more-->Improving the startup time of these new modern apps is crucial for getting a high quality app, UX and even gaining better SEO. There are different strategies we can apply to help with that. Reducing the app's bundle size is one way to help with that and that's also where lazy loading comes into play. Right now the most popular way of lazy loading is for sure using Angular routes. In this article however we're going to explore some further options, also powered by Angular Elements.
{{</intro>}}

{{< postad >}}

{{<toc>}}

## What means lazy loading after all?

While single-page applications tend to be fast once they are loaded, their initial load time often suffers. This is because of the huge amount of JavaScript that needs to be downloaded, parsed and interpreted by the browser only for then delegating the whole rendering to the SPA JavaScript app. As you can see this differs quite a lot from classic server-side rendered apps, where the HTML is already ready to be rendered by the browser. As a result we need to optimize for that. One approach is to make the main JavaScript bundle - necessary for booting the app (for Angular apps usually `main.js`) - become as small as possible, so that our app can boot up really fast. This is when "lazy loading" comes into play. And with lazy loading **we** really mean to defer loading unused bits & just **load them on demand**. 

<blockquote class="emphasized">"Lazy loading = loading on demand"</blockquote>

Say we have the "settings" area in our app where the user can specify certain configurations. We know the users only rarely enter these areas. As a result, we want to defer the loading of the corresponding JavaScript for that area as much as possible. Maybe we don't even load it at all. At the latest, when the user clicks on the corresponding menu item, we can execute a HTTP request, fetch the JavaScript file and load up that section of the app.

Now, for this to work, all our compiled TypeScript code for that "settings" area of our app needs to be isolated and compiled into a dedicated JavaScript file that gets deployed separately along all the other assets, right? That's required such that we can then fetch that specific file at runtime, when needed. Sounds complex :thinking:, but luckily Angular is build on great tooling (looking at you Webpack :wink:), which does this file bundling for us :smiley:.

## What can be lazy loaded?

Great, so now we know what lazy loading is, but before we dive straight in, let's first define **what can be lazy loaded** in an Angular application. You might be tempted to say "I want to lazy load an Angular component", right? After all that's what you want to visualize at a given moment. However, that's not entirely possible.

The basic unit in Angular is a **module**. If you think about your Angular components, they have dependencies on other components, like Angular Material. But the component itself doesn't specify those dependencies. Rather components are all registered on modules which are then connected between them. As of now (Angular version 7), modules are necessary for Angular in order to "know" how your code works, which dependencies are needed, which components are used in the templates.

Therefore...

<blockquote class="emphasized">"The basic unit that can be lazy loaded are <strong>NgModules</strong>"</blockquote>

And with them - of course - come the bundled components which we're ultimately interested in.

## Lazy Loading Angular Routes

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

Here's an example of a lazy loaded configuration. Rather than specifying the component in the route configuration, we specify the relative path to the module to load, in the form of a string value. Why a string value? The reason is that we cannot use the `component` property as you do with non-lazy routes, because that implies importing the according component type from a file, thus "hard-wiring" it together. As a result it would not be lazy any more :smiley:.

> **Also note**, these "magic strings" will [change in Angular v8](https://github.com/angular/angular/commit/c61df39), allowing us to load them using the `import` syntax, like `loadChildren: () => import('./lazy-route/lazy.module').then(mod => mod.LazyModule)`

Great, when you then re-launch the Angular CLI compilation process, you may immediately note that you get more JavaScript files being produced and not just the standard `main.js`, `runtime.js`, ... Note the `home-home.module.js`, `search-search.module.js` etc.

<figure>
  <a href="/blog/assets/imgs/lazy-loaded-bundling-cli.png" class="image--zoom">
    <img src="/blog/assets/imgs/lazy-loaded-bundling-cli.png">
  </a>
  <figcaption>One bundle per lazy loaded file produced by the CLI. Note the issue-list-issue-list-module.js etc..</figcaption>
</figure>


### Egghead lessons on lazy loading and preloading

**Lazy load a route with the Angular router**
{{<egghead-lesson uid="lessons/angular-lazy-load-a-route-with-the-angular-router" >}}

**Avoid delays for lazy modules by applying a preloading strategy with the Angular router**
{{<egghead-lesson uid="lessons/angular-avoid-delays-for-lazy-modules-by-applying-a-preloading-strategy-with-the-angular-router" >}}

**Define a custom preloading strategy for the Angular router**
{{<egghead-lesson uid="lessons/angular-define-a-custom-preloading-strategy-for-the-angular-router" >}}

## Manual Lazy Loading of Modules

But what about when we need a more fine-grained control over lazy loading, and not just with routes? What if we want to open a dialog for instance, and lazy load its containing component just when the user decides to open that specific dialog?  
Let's assume we want to lazy load a component called `UserListComponent`. First, we isolate it in an NgModule since that's our unit of lazy loading (if you remember).

### Compiling the module into a dedicated JS bundle

Now we need to figure out how to **lazy load the Angular Module**. But before starting, we need to make sure our module gets compiled into a separate JS file that can then be lazy loaded. For the routing, the Angular CLI makes sure to create that bundle whenever it sees a `loadChildren` and according path. For our own non-routed NgModule, we need to take care about that part ourselves. We **need to tell the CLI explicitly** which modules should be bundled separately. This can be done in the `angular.json`, by adding the path of the lazy module to the `lazyModules` array. Here's an example.

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
              "src/app/shared-components/users/users.module"
            ]
          }
        }
      }
    }
  }
}
```

### Loading the module at runtime

Once the compilation process is configured, we need to make sure we're able to load the corresponding module JS file at runtime and boot it.  
Angular gives us the `NgModuleFactoryLoader` for that. Here's a quick example of a `LazyModuleService` I created, that takes a path to a module and loads it accordingly.

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

**But we're not done yet.** Remember, in the end **we're interested in visualizing the component** in a lazy fashion. Loading the NgModule is just a means to achieve that.

### Finally, dynamically instantiating the component

What's missing is to instantiate the component dynamically. For that we need to get hold of the component type and then using a `ComponentFactoryResolver` we can instantiate the component accordingly and attach it to the view. Anyways, if you want to go into the details, I have an entire article on that for you :wink:

{{<article-link
    url="/blog/2017/07/ng2-dynamic-tab-component/"
    title="Create a dynamic tab component with Angular"
    text="Learn about advanced topics such as dynamic components, ComponentFactoryResolver, ViewContainerRef, ngTemplateOutlet and much more..."
    imageurl="/blog/assets/imgs/ng-dynamic-tabs/multi-tab-editing.png"
>}}

But we don't have to do it by ourselves. [Aaron Frost](https://twitter.com/aaronfrost) and his crew of [herodevs](https://twitter.com/herodevs) created a small library that handles it for you, check it out: [@herodevs/lazy-af](https://www.npmjs.com/package/@herodevs/lazy-af).  
The library automates the steps we've been talking about before. In order to know which of the components to instantiate, the library uses the `bootstrap` property of the `NgModule`. As such we need to add our dynamic component there:

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [UserListComponent],
  imports: [CommonModule, SharedModule],
  exports: [UserListComponent],
  bootstrap: [UserListComponent] // <==
})
export class UsersModule {}
```

But [check out their README](https://www.npmjs.com/package/@herodevs/lazy-af), which describes the details :smiley: and guides you through the setup step by step.

## Lazy Loading with Angular Elements

Finally, let's come to the **meat of this article**: **lazy loading components** with Angular Elements :tada:.

### Intro to Angular Elements

Angular Elements are the new kid on the block in the Angular ecosystem. Elements allows you to automatically convert (or wrap) every Angular Component as "Custom Element". Custom Elements are one of the specs under the umbrella term of **Web Components**. 

Head over to my other blog article for more details:

{{<article-link 
   url="/blog/2019/04/intro-to-angular-elements" 
   title="Introduction to Angular Elements" 
   text="Learn how to automatically convert your Angular Components to native Custom Elements" 
   imageurl="/blog/assets/imgs/egghead-artwork-angular-elements.png" 
>}}

Other than that, you may want to check out my latest Egghead course on the topic:

{{<egghead-course uid="courses/getting-started-with-angular-elements" lesson_img="/blog/assets/imgs/egghead-artwork-angular-elements.png" >}}

### Lazy loading & Angular Elements?

But what do Angular Elements have to do with lazy loading? When speaking about Elements, many immediately think about **compiling them into standalone JavaScript files** s.t. they can then be embedded in other frameworks or in "micro-app" architectures. While that's a totally valid use case, this is by far not the only one. Angular Elements can be extremely powerful to be used within an Angular apps itself. As you probably guessed already, **one of these use cases is for dynamically loading components**.

<blockquote class="emphasized">
  Angular Elements are not just about compiling them into standalone JS files to be used outside of Angular.
</blockquote>

With Angular Elements, we can already **dynamically instantiate and add a component** to our template in an extremely easy fashion: namely just by appending its tag to the DOM:

```typescript
@Component({
  selector: 'app-root',
  template: `
    <h1>Angular Elements</h1>
    <div id="container"></div>
    <button (click)="addGreeter()">Add greeter</button>
  `
})
export class AppComponent {
  addGreeter() {
    const container = document.getElementById('container');
    container.innerHTML = '<do-greet></do-greet>';
  }
}
```

Once the tag is in the template, the browser interprets it, and if there's a corresponding custom element registered, it will instantiate it automatically for us. Obviously `do-greet` needs [to be an Angular Element](https://egghead.io/lessons/angular-transform-an-angular-component-into-a-native-custom-element). But [compared to dynamically instantiating a traditional Angular component dynamically](/blog/2017/07/ng2-dynamic-tab-component/), this is a looot easier. It's just using the **native DOM API**!

Great, so now we know how to dynamically instantiate an Angular Element. However, in order that the Angular Element get properly instantiated when we insert the tag, it has to be registered. We simply package our Angular Element into a module and lazy load it (just as we learned in the previous section).

<blockquote class="emphasized">
  "Lazy loading Angular Elements means packaging them in lazy Angular Modules"
</blockquote>

So in a first step, we create a module with our Angular Element inside a separate module (let's call it) "UsersModule".

```typescript
...
import { UserListComponent } from './user-list/user-list.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [UserListComponent],
  imports: [CommonModule, SharedModule],
  entryComponents: [UserListComponent]
})
export class UsersModule {
  constructor(injector: Injector) {
    // registering our Angular Component
    const el = createCustomElement(UserListComponent, { injector });
    customElements.define('app-user-list', el);
  }
}
```

We import a `UserListComponent` which is the one we want to lazy load and define it to be an Angular Element. We also need to declare the module to be bundled separately, s.t. we're able to properly lazy load it later (as we've read in the section before).

```json
// angular.json
"lazyModules": ["src/app/users/users.module"]
```

Now that our "lazy component" gets bundled separately, we can start lazy loading it. For that I created a helper service `ComponentLoaderService`.

```typescript
// core/component-loader.service.ts
...

@Injectable({
  providedIn: 'root'
})
export class ComponentLoaderService {
  private componentRegistry = {
    'app-user-list': {
      modulePath: 'src/app/users/users.module#UsersModule',
      moduleRef: null
    }
  };

  constructor(
    private loader: NgModuleFactoryLoader,
    private injector: Injector
  ) {}

}
```

As you can see, the service has a component registry, which is nothing more than a map having the component selector as key and an object with the `modulePath` to load as well as the instantiated module reference (so that we don't re-fetch already instantiated modules). You could of course also use a different data structure such as a `Set`. This whole configuration map is just for having a nicer API later. It allows us basically to invoke a function `loadComponent('app-user-list')`, passing it the tag name of the component to load, rather than having to know the module and passing it the entire path to the module itself.


I also inject the `NgModuleFactoryLoader` which we use to fetch and instantiate a lazy module. Note, we need to register it in the providers section of our `AppModule` (or where you need it).

```typescript
@NgModule({
  ...
  providers: [
    { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Otherwise you might get an exception such as this one:

```
Error: StaticInjectorError(AppModule)[NgModuleFactoryLoader]: 
  StaticInjectorError(Platform: core)[NgModuleFactoryLoader]: 
    NullInjectorError: No provider for NgModuleFactoryLoader!
```

Finally the `loadComponent(...)` method. Let's paste it in here before explaining it:

```typescript
// core/component-loader.service.ts
import { Injectable, NgModuleFactoryLoader, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentLoaderService {
  ...

  loadComponent(componentTag: string): Promise<HTMLElement> {
    const cmpRegistryEntry = this.componentRegistry[componentTag];
    if (!cmpRegistryEntry) {
      throw new Error(
        `Unrecognized component "${componentTag}". Make sure it is registered in the component registry`
      );
    }

    if (cmpRegistryEntry.moduleRef) {
      return new Promise(resolve => {
        const componentInstance = document.createElement(componentTag);
        resolve(componentInstance);
      });
    } else {
      const path = cmpRegistryEntry.modulePath;

      return new Promise((resolve, reject) => {
        this.loader
          .load(path)
          .then(moduleFactory => {
            const moduleRef = moduleFactory.create(this.injector).instance;
            cmpRegistryEntry.moduleRef = moduleRef;

            // instantiate the component
            const componentInstance = document.createElement(componentTag);
            resolve(componentInstance);
          })
          .catch(err => {
            console.error('error loading module', err);
            reject(err);
          });
      });
    }
  }
}
```

The method takes a selector and lazy loads its corresponding module + instantiates it. So the first thing it does is to check the selector is actually defined in the "component registry". The next part...

```typescript
if (cmpRegistryEntry.moduleRef) {
  return new Promise(resolve => {
    const componentInstance = document.createElement(componentTag);
    resolve(componentInstance);
  });
} else {
  ...
}
```

...verifies whether the `moduleRef` property has a value. If that's the case, the module has already been instantiated, so we just need to create an instance of our Angular Element using the native browser API and resolve the `Promise`.

Otherwise we need to load the module that contains the component that should be lazy loaded. As you now know, we get the path of the module via the `modulePath` of our component registry. We pass that to the `NgModuleFactoryLoader` which we injected as `loader` into our service. Once the module is loaded, we create it using `moduleFactory.create(...)` passing it the injector. Finally, we again instantiate our Angular Element and return it (by resolving our Promise).

```typescript
...
if (cmpRegistryEntry.moduleRef) {
  ...
} else {
  const path = cmpRegistryEntry.modulePath;

  return new Promise((resolve, reject) => {
    this.loader
      .load(path)
      .then(moduleFactory => {
        const moduleRef = moduleFactory.create(this.injector).instance;
        cmpRegistryEntry.moduleRef = moduleRef;

        // instantiate the component
        const componentInstance = document.createElement(componentTag);
        resolve(componentInstance);
      })
      .catch(err => {
        console.error('error loading module', err);
        reject(err);
      });
  });
}
```

**How do we use this?** At some other place of our app - for instance the `AppComponent` - we simply inject our `ComponentLoaderService` and invoke its `loadComponent` function passing the selector of the component we wish to lazy load. Once the returning Promise resolves, we have an instance of the component and can pass data to it. In the code below we pass an array of users to its `users` input property. Finally, using the `ElementRef` we query for some `<div id="user-container">` and append our Angular Element.

```typescript
export class AppComponent {
  title = 'Lazy Loading Elements';

  constructor(
    private componentLoader: ComponentLoaderService,
    private elementRef: ElementRef
  ) {}

  onLoadUsers() {
    this.componentLoader.loadComponent('app-user-list').then(componentEl => {
      componentEl['users'] = [
        {
          name: 'Juri'
        },
        {
          name: 'Steffi'
        }
      ];

      this.elementRef.nativeElement
        .querySelector('#user-container')
        .appendChild(componentEl);
    });
  }
}
```

Unfortunately the code-splitting and lazy loading example does not work on Stackblitz. You can see the whole code on this GitHub repo however: https://github.com/juristr/ng-element-lazy-manual

## Automatic lazy loading with Angular Elements

Wait! We could automated that whole stuff and put it into a library!! Exactly, I've already done that and I'll post about it in my upcoming article. Keep an eye on my blog, subscribe to its feed or simply follow me on [Twitter](https://twitter.com/juristr) for more updates :wink:.


## Conclusion

In this article we've seen various approaches for lazy loading Angular modules and ultimately the components they contain.

- Lazy loading via Angular routing
- configure the Angular CLI to automatically bundle Angular Modules as separate JavaScript files
- Lazy load Angular modules manually using the `NgModuleFactoryLoader`
- Lazy loading Angular Components using the `lazy-af` npm library
- Lazy loading Angular Components using Angular Elements

There are pros and cons to each of them. In my next article we're going to look into how we can even optimize the lazy loading of Angular Elements and package that functionality up as an independent library. Stay tuned :tada: