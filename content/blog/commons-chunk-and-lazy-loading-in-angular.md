---
type: post
title: Commons Chunk and Lazy Loading in Angular
date: 2021-02-10T21:54:00+01:00
lead: What is the commons chunk, why is it there and how can it be disabled with
  the Angular CLI
url: /blog/2021/02/commons-chunk-lazy-loading-angular-cli
draft: false
comments: true
---
{{<intro>}}
  Since I get this question often, why not write it down! What we're going to look at in this article is lazy loading in Angular, but in specific about the "common chunk" and the "commonChunk" option in the Angular builder configuration.
{{</intro>}}

<!--more-->

{{< postad >}}

## Lazy loading in Angular

The simplest do apply lazy loading is to use the Angular Router's built-in functionality.

```typescript
const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersModule),
  },
];
```

Rather than referencing the modules, an `import` statement is being used, based on which, Webpack (which is currently used as the Angular builder and bundler underneath) knows how to split the JS files s.t. they can be loaded on an as-needed basis. In fact, if you serve or compile your application, you should see these code-splitted JS files (chunks) being printed out on the console:

![](/blog/assets/imgs/ng-lazy-chunks.png)

Here's a free Egghead video that demonstrates that

{{<egghead-lesson uid="lessons/angular-apply-route-level-code-splitting-and-lazy-loading-with-the-angular-cli" >}}

### Other ways to lazy load?

Here are some articles and talks I gave about other ways to lazy load things in Angular:

* [Talk: Lazy Loading on Steroids with Angular Elements](/blog/2019/12/jsbe-lazy-loading-ngelements/)
* [Manually Lazy Load an Angular Module with ViewEngine and Ivy](/blog/2019/10/lazyload-module-ivy-viewengine/)
* [Lazy Loading with Angular Elements and ngx-lazy-el](/blog/2019/11/lazy-loading-angular-ngx-lazy-el/)
* [Angular Performance Series: list of articles about perf optimizations including lazy loading, preloading etc..](/blog/2019/08/ngperf-route-level-code-splitting/)

## Common chunk

What is the "common.js" chunk? As we discussed when using lazy loading we get these different bundles being created automatically, in our simple example above it is the `products-products-module.js` and `orders-orders.module.js`.

However, as soon as you have some shared piece, some shared module with a couple of components that both, the products and orders lazy loaded modules use, you suddenly get this

![](/blog/assets/imgs/ng-lazy-chunks-common.png)

What happens here is that the Angular CLI by default, groups all shared code (used in at least 2 locations) into a `common.js` chunk. This JS file **is loaded at startup**.