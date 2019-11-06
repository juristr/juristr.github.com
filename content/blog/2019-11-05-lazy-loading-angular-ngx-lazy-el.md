---
type: post
title: Lazy Loading with Angular Elements and ngx-lazy-el
lead: Learn how Angular Elements and ngx-lazy-el can help with lazy loading
date: 2019-11-06T12:00:28+01:00
comments: true
url: /blog/2019/11/lazy-loading-angular-ngx-lazy-el
image: /blog/assets/imgs/lazyloading-ngx-lazy-el.jpg
categories:
  - Angular
tags:
  - angular
  - web performance
draft: false
---

{{<intro>}}
  Modern web apps often suffer of bad startup time. This frustrates your users. Even worse (especially for public facing apps), it might even result in being penalized on the Google search index. In this article we’re going into the details of lazy loading with Angular, in particular how to lazy load non-routed components with the help of Angular Elements.
{{</intro>}}

{{< postad >}}

{{< toc >}}

## Why Lazy Loading

The main issue with modern JavaScript heavy web applications is, well, they are heavy. What often happens is you enter the url in the browser, and the webapp opens with a nice loading indicator. The main reason is the cost of JavaScript. Addy Osmani [wrote about it]([https://v8.dev/blog/cost-of-javascript-2019](https://v8.dev/blog/cost-of-javascript-2019)).

Loading indicators, as fancy as they might get, should really be avoided after all. To **reduce the startup time**, we need to make sure to keep our initial bundle size (the JS file required to load the app) as small as possible. In Angular we have a couple of different options:

- **Differential Loading -** starting with the Angular CLI v8, there is built-in support for differential loading. The CLI basically creates two different production bundles for your app. One for legacy browsers, compiled in ES5 and containing a bunch of polyfills and one in ES2015 (as of now) for the evergreen browsers (Chrome, Firefox,...) that doesn’t contain the additional overhead of polyfills etc. That can considerably reduce the size of shipped JavaScript for modern browsers.
- **Performance budgets -** another new feature in the Angular CLI v8 are performance budgets. Performance budgets are a way for you to specify a threshold that should not be exceeded. If you combine this with your CI build, you can get notified immediately by having your build break whenever the configured performance budget is exceeded. Check out [my article on how to configure performance budgets with the Angular CLI]([https://juristr.com/blog/2019/08/ngperf-setting-performance-budgets/](/blog/2019/08/ngperf-setting-performance-budgets/))
- **Lazy Loading -** Ultimately however, we need to apply lazy loading strategies, that is, to only the minimum necessary JavaScript for the app to boot. Then, only later when the user starts to interact with the app, we download further JS on the fly.

## TL;DR

{{<youtube UhJuVN5KIFk >}}

**Source code:** ...

## Lazy Loading in Angular

The main way of lazy loading in Angular right now (v8), is via the router. In your route configuration, rather than passing a direct component reference, we can use a dynamic import statement (starting from Angular v8) that points to the module we want to lazy load:

```javascript
{
  path: 'about',
  loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
}
```

Here are some of my past articles on lazy loading. Check them out :smiley:

{{<article-link 
   url="/blog/2019/10/lazyload-module-ivy-viewengine" 
   title="Manually Lazy Load an Angular Module with ViewEngine and Ivy" 
   text="" 
   imageurl="" 
>}}


{{<article-link 
   url="/blog/2019/04/state-lazy-loading-components-angular/" 
   title="Lazy load Angular Components" 
   text="" 
   imageurl="" 
>}}

## Angular Elements in a Nutshell

**First of all, what are Angular Elements?** The modern frameworks such as Angular, React, Vue etc all pretty much agree on the concept of component based design. Angular pioneered this idea somehow with AngularJS v1.x in that it allowed you to extend the existing HTML with **new, custom defined HTML tags**. The issue? Those were obviously not portable. And so over time a dream started to emerge in which people would be able to **share components across frameworks**, independent whether you use Angular, Vue or React or even just a plain old HTML page. How many times did you re-implement that datepicker control? Your modal dialog window? Yea I know... 😒.

Well guess what, there is a browser native API (under the umbrella term of Web Components) called “Custom Elements” that allows you to define and register new tags:

```typescript
customElements.define('hello-world', HelloWorld)
```

Here, `HelloWorld` is a JavaScript class usually extending `HTMLElement`. You can [read more here]([https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)).

Angular has a library which you can find in `@angular/elements` that makes it easy to take an Angular component, wrap it s.t. it is compatible with the Custom Elements API, s.t. you can then register it using the `customElements.define(...)` function we’ve just seen. Usually that looks something like

```typescript
import { createCustomElement } from '@angular/elements'

...

const myWrappedEl = createCustomElement(GreeterComponent, { injector: injector });
customElements.define('hello-world', myWrappedEl);
```

As you can see we use the `createCustomElement` utility function defined by `@angular/elements` passing in our Angular component `GreeterComponent`. Then we can pass the wrapped component ahead to the browser native `customElements.define(...)` function.

If you wanna know more, check out [my article and Egghead course that introduces Angular Elements step by step]([https://juristr.com/blog/2019/04/intro-to-angular-elements/](/blog/2019/04/intro-to-angular-elements/)).

## How do Angular Elements help with Lazy Loading?

Well the idea came to my mind when looking at existing libraries for lazy loading Angular components, such as

- [https://www.npmjs.com/package/@herodevs/hero-loader](https://www.npmjs.com/package/@herodevs/hero-loader)
- [https://www.npmjs.com/package/ngx-loadable](https://www.npmjs.com/package/ngx-loadable)

Those are awesome libraries that aim to help you to lazy load components in the template. Since Angular doesn’t support lazy loading of components out of the box (yet, Ivy will change that 🔥), these libs have to find a way around it. As a result, many do something like this:

```html
<lazy-load-placeholder selector="hello-world" module="./hello-world/hello-world.module"></lazy-load-placeholder>
```

However, this approach makes it hard to do native `@Input` and `@Output` bindings as you would normally do with Angular components. The main reason is that the components get instantiated programmatically (in your TS code). So if you need to pass in Input/Output properties, you’d have to do that in your TS code. That could work via some callbacks the lazy loading component exposes, like

```html
<lazy-load-placeholder ... (componentLoaded)="onComponentLoaded($event)"></lazy-load-placeholder>
```

Inside the `onComponentLoaded(...)` you could get the component instance passed, and hence you can directly set the input properties.

**However I wanted to have a more declarative approach** that lets you use your components just as you normally do in your Angular templates. So what about Angular Elements. The interesting thing there is that once the Custom Element is registered, the browser will take care of instantiating it and do the proper binding. 

Let’s have a concrete look. Assume we have a module `GreeterModule` that internally registers its components as an Angular Element (just as we learned in the section before).

```typescript
@NgModule({
    declarations: [GreeterComponent],
    ...
})
export class GreeterModule {

    constructor(injector: Injector) {
      const myWrappedEl = createCustomElement(GreeterComponent, { injector: injector });
      customElements.define('hello-world', myWrappedEl);
    }

}
```

Assume now we **lazy loading** the `GreeterModule` using the technique I described in [my related article]([https://juristr.com/blog/2019/10/lazyload-module-ivy-viewengine](/blog/2019/10/lazyload-module-ivy-viewengine)). Once the `GreeterModule` gets loaded on the fly and instantiated, the constructor will be called and as a consequence the Angular Element will be registered. Now, the **browser knows** about our tag and we can just literally paste it into the DOM to have it being instantiate and work.

```html
<hello-world></hello-world>
```

Since Custom Elements are first class citizens in Angular, you can also use input and output bindings.

```html
<hello-world [name]="person.name" (greet)="onGreet($event)"></hello-world>
```

This will just work! Actually, you couldn’t even tell whether you’re looking at a component or Angular Element.

## Lazy loading with ngx-lazy-el

Now that you know the mechanism, I actually created a libary that automates the lazy loading with Angular Elements for you.

{{<article-link 
   url="https://github.com/juristr/ngx-lazy-el" 
   title="GitHub: ngx-lazy-el" 
   text="" 
   imageurl="" 
>}}

After installing the libary, expose the component on your lazy loaded module that you’d like to have wrapped and lazy loaded as Angular element.

```typescript
@NgModule({
    declarations: [GreeterComponent]
    ...
})
export class GreeterModule {
    customElementComponent: Type<any> = GreeterComponent
}
```

The `ngx-lazy-el` library will read the `customElementComponent` to know which component should automatically be wrapped as Angular Element.

Next, go to your `AppModule` to define the lazy configuration, very much just like you might be accustomed with the Angular router:

```typescript
const lazyConfig = [
    {
      selector: 'hello-world',
      loadChildren: () => import('./greeter/greeter.module').then((m) => m.GreeterModule)
];

@NgModule({
    imports: [
      NgxLazyModule.forRoot(lazyConfig)
    ]
})
```

After having configured our lazy module, we can just start using our component **with the selector specified in the lazyConfig**. For example:

```html
<div *ngIf="isVisible">
    <hello-world *ngxLazyEl [name]="person.name" (greet)="onGreet($event)"></hello-world>
</div>
```

Note the `*ngxLazyEl` directive. It is responsible for actually reading the tag name (`hello-world`) and looking up the `lazyConfig` to find the lazy module to load, load it and once it is loaded, it will render the `<hello-world>` into the DOM where then the browser takes over. That’s it. Whenever `isVisible` is true, the `GreeterModule` would be lazily loaded over the network, its `customElementComponent` (in this example our `GreeterComponent`) would be wrapped as an Angular Element and then shown on the page.

## Conclusion

Definitely check out the video linked at the very beginning oft this article where I walk you step by step though the process of lazy loading with [ngx-lazy-el](https://github.com/juristr/ngx-lazy-el). Other than that, you should now have some understanding

- what we need to “lazy load a component”
- an overview of what Angular Elements are about
- how Angular Elements can potentially help with lazyl loading
- how to use the ngx-lazy-el library

Questions? Ping me on [Twitter](https://twitter.com/juristr).
