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

Simplest way is to use the Angular Router's built-in way

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

Rather than referencing the modules, an `import` statement is being used, based on which Webpack (which is currently used as the Angular builder and bundler underneath) knows how to split the JS files s.t. they can be loaded on a as-needed basis. In fact if you serve or compile your application, you should see these code-splitted JS files (chunks) being printed out on the console:

![](/blog/assets/imgs/ng-lazy-chunks.png)

## Common chunk

