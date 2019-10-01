---
type: post
title: "Manually Lazy Load an Angular Module with ViewEngine and Ivy"
lead: Find out how to lazy load an NgModule compatible with ViewEngine and Ivy
date: 2019-10-01T00:09:59+02:00
comments: true
url: /blog/2019/10/lazyload-module-ivy-viewengine
image: /blog/assets/imgs/lazy-load-module-bg.jpg
categories:
  - Angular
tags:
  - angular
draft: false
---

{{<intro>}}
  I have written about [lazy loading components](/blog/2019/04/state-lazy-loading-components-angular/#manual-lazy-loading-of-modules) in the past, that covers some of the topics mentioned here as well. Today in this post I'd like to exclusively focus on how to approach lazy loading of an Angular Module in a way that is compatible with ViewEngine and Ivy.
{{</intro>}}
<!--more-->

{{< postad >}}

{{<warn-notice message="Contents are based on Angular version 8+" >}}

{{<toc>}}

## What is ViewEngine, what is Ivy?

So first of all, before starting right away, what is ViewEngine, what is Ivy? The Angular team is currently working on a complete inner rewrite of the compiler (codename: **Ivy**), basically the part of Angular that turns your Angular template HTML into executable, performant JavaScript code. If you're using Angular <= 7, you're running on **ViewEngine**. Starting with Angular 8, Ivy has been shipped behind a flag in experimental mode, while in Angular v9 it is active by default.  
"Ivy is an enabler" as Igor Minar said recently at Angular Connect. The rewrite does not only come with a more performant frameowork (at build and runtime), but opens up the way for a lot of new features and more advanced use cases. But that's another story.

## Lazy Loading in Angular

Probably the most used and - if you want - default way of lazy loading modules in Angular is through the router. By simply specifying a route configuration with the `import(...)`, Angular will take care of splitting that corresponding module out into a separate JavaScript file and then to lazy load it on demand once that specific route gets activated.

```typescript
RouterModule.forRoot([
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  }
])
```

More about that here:

{{<article-link 
   url="/blog/2019/08/ngperf-route-level-code-splitting/" 
   title="Angular Performance: Route Level Code Splitting" 
   text="" 
   imageurl="" 
>}}

## Manually Lazy Load Modules

Let's assume we have the following, very simple `NgModule` we want to lazy load:

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule]
})
export class LazyModule {
  constructor() {
    console.log('lazy loaded: 🔥');
  }
}
```

What we want to achieve is to get the console message being printed out.


### Activate code splitting

If we want to lazy load a module, that specific module and all its dependencies have to be bundled into a separate JavaScript file, s.t. we can then fetch that file lazily over the network. In Angular the CLI (and underlying Webpack) will take care of this **code splitting**. All we have to do is to use the dynamic `import(...)` statement.

> **Note**, prior to Angular 8 you had to use a custom syntax like `loadChildren: './about/about.module#AboutModule'`.

As soon as we write...

```typescript
...
onLazy() {
  import('./lazy/lazy.module').then(m => m.LazyModule);
}
...
```

...into a click handler of our `AppComponent`, the Angular CLI detects it and generates a separate JS bundle for it.

{{<figure url="/blog/assets/imgs/lazy-load-code-splitting.png" size="full">}}

Also, clicking the button that triggers the `onLazy()` function shows how the bundle is dynamically fetched over the network.

<video width="100%" controls autoplay>
  <source src="/blog/assets/imgs/lazy-load-recording.mov" type="video/mp4">
</video>

### Instantiating the Module

However in the Devtools console we don't see the excepted `console.log` message of our `LazyModule`. The reason is that its file has been fetched, but the NgModule itself didn't get instantiated. For this purpose let's create a service `LazyLoaderService`. We want to be able to change our `onLazy()` function s.t. we can call our `LazyLoaderService` and pass in the dynamic import function.

```typescript
onLazy() {
  this.lazyLoaderService.loadModule(() =>
    import('./lazy/lazy.module').then(m => m.LazyModule)
  );
}
```

The `loadModule` function is implemented as follows:

```typescript
import {
  Compiler, Injectable, Injector, NgModuleFactory, Type
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LazyLoaderService {
  constructor(private compiler: Compiler, private injector: Injector) {}

  loadModule(path: any) {
    (path() as Promise<NgModuleFactory<any> | Type<any>>)
      .then(elementModuleOrFactory => {
        if (elementModuleOrFactory instanceof NgModuleFactory) {
          // if ViewEngine
          return elementModuleOrFactory;
        } else {
          try {
            // if Ivy
            return this.compiler.compileModuleAsync(elementModuleOrFactory);
          } catch (err) {
            throw err;
          }
        }
      })
      .then(moduleFactory => {
        try {
          const elementModuleRef = moduleFactory.create(this.injector);
          const moduleInstance = elementModuleRef.instance;

          // do something with the module...
        } catch (err) {
          throw err;
        }
      });
  }
}
```

Note the part in the middle:

```typescript
...
.then(elementModuleOrFactory => {
  if (elementModuleOrFactory instanceof NgModuleFactory) {
    // if ViewEngine
    return elementModuleOrFactory;
  } else {
    try {
      // if Ivy
      return this.compiler.compileModuleAsync(elementModuleOrFactory);
    } catch (err) {
      throw err;
    }
  }
})
...
```

We need to distinguish here whether the result of the dynamic import is a `NgModuleFactory` (in ViewEngine) or whether it is `Type<any>` (in Ivy). In the latter case we need to use the `Compiler` to asynchronously compile the module on the fly. Once we have that, we can create the instance of the Module itself:

```typescript
const elementModuleRef = moduleFactory.create(this.injector);
const moduleInstance = elementModuleRef.instance;
```

With that, our `LazyModule` should get loaded and instantiated properly.

{{<figure url="/blog/assets/imgs/lazy-loaded-module.png" size="full">}}

## Conclusion

Notice that prior to Angular 8 you had to use the `NgModuleFactoryLoader` which was part of the lazy loading "with magic strings" (i.e. `loadChildren: './about/about.module#AboutModule'`) and which is now deprecated. You also don't need to register the `SystemJsNgModuleLoader` provider any more.

```typescript
{ provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader },
```

Other than that, you have seen that manually lazy loading Angular Modules isn't that difficult after all. But it is also only just the first step, as in the end we want to lazy load the component :wink:.

### Example Code

**GitHub repo:** [https://github.com/juristr/manually-lazy-load-ngmodule](https://github.com/juristr/manually-lazy-load-ngmodule). 

If you are on Angular 8, my sample repo contains a script that can help you quickly enable Ivy to see how that works:

```
$ npm run enable-ivy true

// or

$ yarn enable-ivy true
```

