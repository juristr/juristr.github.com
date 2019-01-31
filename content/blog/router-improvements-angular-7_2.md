---
type: post
title: "Explore Angular Router's  runGuardsAndResolvers"
lead: >-
  `runGuardsAndResolvers` allows you to take control over when the router executes your guards and resolvers.
date: 2019-01-31T18:39:51+01:00
comments: true
# url: /blog/2018/10/journey-promises-to-rxjs
image: /blog/assets/imgs/run-guards-resolver-post.png
categories:
  - Angular
tags:
  - Angular
  - router
  - guards
  - resolvers
draft: false
---

{{<intro>}}
  Learn how we can use new options introduced for the `runGuardsAndResolvers` setting for the Angular Router configuration to get a better control over when to run our resolvers and guards.
{{</intro>}}

I'm pretty sure you know about Router guards and resolvers and what they are good for. If not, don't worry. I have a [full course out on Egghead.io](https://egghead.io/courses/learn-angular-router-for-real-world-applications) :wink:.  

The `runGuardsAndResolvers` options ([here's the official doc](https://angular.io/api/router/RunGuardsAndResolvers)) is actually quite a hidden functionality and not that much used. However, it has been there already since about Angular v4. The possibilities at that time were quite limited though, something like the following:

```typescript
// packages/router/src/router.ts (Angular v4)
private shouldRunGuardsAndResolvers(
    curr: ActivatedRouteSnapshot, future: ActivatedRouteSnapshot,
    mode: RunGuardsAndResolvers): boolean {
  switch (mode) {
    case 'always':
      return true;

    case 'paramsOrQueryParamsChange':
      return !equalParamsAndUrlSegments(curr, future) ||
          !shallowEqual(curr.queryParams, future.queryParams);

    case 'paramsChange':
    default:
      return !equalParamsAndUrlSegments(curr, future);
  }
}
```

Basically there were three options, `always`, `paramsOrQueryParamsChange` and `paramsChange`. Given a route configuration, we can set a property `runGuardsAndResolvers` and set it accordingly to one of those two options.

```typescript

RouterModule.forRoot([
  ...
  {
    path: 'home/:id',
    component: HomeComponent,
    ...
    runGuardsAndResolvers: 'paramsChange'
  }
])

```

By **default** if you don't specify any mode, the router will apply what is called `paramsChange` mode, meaning it will re-run the guards and resolvers whenever the path or path params change. Examples of URLs satisfying this condition and hence execute the guards & resolvers would be the following:

- `/home/1` => `/home/2`
- `/home/1` => `/home/1;param1=38`
- `/home/1;param1=38` => `/home/1;param1=20`

Examples **not** firing a change

- `/home/1` => `/home/1?queryParam=hi`
- ...

On the other side, when setting it to `paramsOrQueryParamsChange` the guards and resolvers fire on most changes to the URL and is just very similar to the `always` option (the only difference being probably URL fragment changes):

- `/home/1` => `/home/2`
- `/home/1` => `/home/1;param1=38`
- `/home/1;param1=38` => `/home/1;param1=20`
- `/home/1` => `/home/1?queryParam=hi`

Basically as the name suggests, it fires whenever the params (i.e. `;param1=..`) changes or a query param (i.e. `?someQuery=..`). One might not guess, but it also changes for al modifications of the path, like in the very first example when moving from `/home/1` to `/home/2`.

## New Modes in Angular 7.1 and 7.2

Angular v7 introduced a couple of new options to the `runGuardsAndResolvers`. The first one (introduced in `7.1`) is the `pathParamsChange`.

When applying the `pathParamsChange` setting, the router will only re-run guards and resolvers when the path params change, thus ignoring optional parameters and query params.  
As a result, **only the following route change** will fire a re-evaluation.

- `/home/1` => `/home/2`

Changes like

- `/home/1` => `/home/1;param1=38`
- `/home/1;param1=38` => `/home/1;param1=20`
- `/home/1` => `/home/1?queryParam=hi`
- ...

...won't provocate a change.

---

Angular `v7.2` then brought another variant, called `pathParamsOrQueryParamsChange`. This is a new option is basically the same as the `pathParamsChange`, but it also takes the query params into consideration.

Resolvers and guards are evaluated for these example routes:

- `/home/1` => `/home/2`
- `/home/1` => `/home/1?queryParam=hi`

They won't fire for the following URL changes, though:

- `/home/1;param1=38` => `/home/1;param1=20`

---

If you need even more flexibility, it's now even possible to pass a function to the `runGuardsAndResolvers` that will be invoked by the framework, passing the current and future `ActivatedRouteSnapshot`. That gives you full flexibility to inspect the current router state and decide accordingly.

```typescript
const routes: Routes = [
  {
    path: 'home/:id',
    component: HomeComponent,
    ...
    runGuardsAndResolvers: (curr: ActivatedRouteSnapshot, future: ActivatedRouteSnapshot) => {
      // inspect the current router state and then return true|false
      return false;
    }
  }
];
```

## Running Stackblitz

Here's a running Stackblitz example for you to play around with the various options.

{{<stackblitz uid="edit/blog-router-guards-and-resolvers" >}}


## Conclusion

Next time, whenever you want more control over your resolvers and guards, you now know the options you have at disposal:

- `paramsChange` (default)
- `paramsOrQueryParamsChange`
- `always`
- `pathParamsChange` (only `v7.1+`)
- `pathParamsOrQueryParamsChange` (only `v7.2+`)
- passing in a custom function  (only `v7.2+`)

When would you want to use these?

> The primary use case for such a mode is when updating the UI and getting the URL to be in sync with local changes. For example, if displaying a sortable table, changing the sort direction is often handled by the table itself. But you would want to update the URL to be in sync with what's being displayed to the user. As long as the table sort direction is stored as a matrix parameter, you can use this option to update the URL without causing the overhead of re-running guards and resolvers. <cite><a href="https://github.com/angular/angular/pull/27464/commits/6cf65394b19007d8dba5147257886baf74ffee53">GitHub commit message</a></cite>
