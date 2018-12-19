---
layout: post_new
title: "New in Angular 7.1: Better Redirects in Angular Route Guards"
lead: "Learn how to properly redirect in an Angular route guard"
postimg: "/blog/assets/imgs/better-route-guards/route-guard-sketch.png"
tags: [ "Angular"]
---

<div class="article-intro">
    Angular version 7.1 not only comes with bugfixes but includes also a bunch of new features. In this post I’d like to particularly take a look at the optimizations added to route guards.
</div>

{% include postads %}

{% assign message = "Contents are based on Angular version >= 7.1.0" %}
{% include warn-notice.html %}

{% include toc.html %}

<figure>
    <img src="/blog/assets/imgs/better-route-guards/route-guard-sketch.png" />
    <figcaption>Yes, I'm trying to do some sketches. Beginner here :D</figcaption>
</figure>


Here is the release changelog of the features added in **Angular version 7.1.0**.

<figure>
    <img src="/blog/assets/imgs/better-route-guards/changelog.png" />
    <figcaption><a href="https://github.com/angular/angular/blob/master/CHANGELOG.md#features">Angular 7.1 Changelog</a></figcaption>
</figure>

> **TL;DR:** until now the route guard allowed to return a boolean (or the async variants such as `Promise<boolean>`, `Observable<boolean>`) to indicate whether the route should be activated or not. Now you can also return a UrlTree that indicates the new router state that should be activated instead.

## Route Guards - A quick primer

What are [route guards](https://angular.io/guide/router#milestone-5-route-guards)? As the name suggests, they allow you to guard access to a certain route. The usual example is the one of an authenticated area of your app, or an admin section that requires special permissions to be accessed. In the following code sample you see a very veeeery simple implementation of a possible guard.

```javascript
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.isLoggedIn) {
      return false;
    } else {
      return true;
    }
  }
}
```

You can then register them on the Angular route definition, like this:

```javascript
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  }
];
```

Note, I always mention this when talking about “guards”: **security doesn’t happen on the client.** Rather route guards (and other mechanisms) are a UX feature as we prevent the user from entering an area where he is not allowed to enter. The final **security checks however happen at the server side**!

## Blocking is not enough

Just returning `true` or `false` is actually not enough. We need to tell the user what happened. Either by launching some notification or most often by **redirecting to some other view**.

To implement such use we can simply inject the router into the `AuthGuard` and redirect accordingly.

```javascript
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.isLoggedIn) {
      // redirect to some view explaining what happened
      router.navigateByUrl('/notauthorized');
      return false;
    } else {
      return true;
    }
  }
}
```

## NEW: Returning a UrlTree

Until Angular <= 7.1 the only options to return from an AuthGuard were boolean expressions:

```javascript
export interface CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean;
}
```

Starting with version 7.1 we can **now also return a** `**UrlTree**` object.


> What is a `UrlTree`? The [Angular docs describes](https://angular.io/api/router/UrlTree) it as follows: “Since a router state is a tree, and the URL is nothing but a serialized state, the URL is a serialized tree. UrlTree is a data structure that provides a lot of affordances in dealing with URLs”.

The easiest way to create such an `UrlTree` is by using the `parseUrl(…)` or `createUrlTree(…)` functions of the `Router` object.

```javascript
router.parseUrl('/notauth');
this.router.createUrlTree(['/notauth']);
```

Knowing this, we can change our original implementation of the guard to the following:

```javascript
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.isLoggedIn) {
      return router.parseUrl('/notauthorized');
    } else {
      return true;
    }
  }
}
```

## Ok, so what? It’s all about prioritization!

From a mere user perspective nothing actually changes. If the user has the necessary permissions, the route will be activated, otherwise he/she will be redirected to the “not authorized” route, displaying some message.
The difference lies in how Angular can now take care of the redirect and do a couple of optimizations.

**Prioritization**
The main advantage is **prioritization**. With the old API, there was no way for prioritizing redirects. Assume you’re having multiple guards active doing async validation and redirects on failure. It was purely dependent on the execution time of those async operations: whichever async guard invoked a redirect as last was the one to win.
By now returning an `UrlTree` rather than running the redirect directly, Angular can take care of executing it and make sure to properly prioritize multiple route guards potentially running. The prioritization works by **giving the guard closest to the root of the application the highest priority**. As a result, if a child guard returns `false` or a `UrlTree` but its parent hasn’t resolved yet, it’ll wait until the parent resolves. If the parent guard check fails, it’ll take priority over all the others.

**Navigation Cancellation**
Another benefit is the possibility to cancel all other navigation events. Whenever a `UrlTree` is returned from a route guard, Angular fires a `NavigationCancel` event, thus effectively cancelling all running navigation events and kicking off a new navigation to the indicated URL.


## Running Stackblitz

Also, here's a running Stackblitz example.

{% assign uid = "edit/blog-router-redirects" %}
{% include stackblitz.html %}


## Conclusion

Wrapping up, we’ve seen what route guards are all about and how the new API introduced in Angular v7.1 allows us to redirect to a new view by simply returning a `UrlTree` object. This slight change allows for two major optimizations Angular can make: prioritization and navigation cancellation.

*(thanks* [*Jason Aden*](https://twitter.com/jasonaden1) *for giving me some insights into the new behavior and motivation behind adding this new API)*

