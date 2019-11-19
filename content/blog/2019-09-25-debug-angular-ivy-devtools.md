---
type: post
title: "Debugging Angular Ivy Applications from the Devtools Console"
lead: "Learn how Ivy allows us to debug our components directly from the browser devtools"
date: 2019-09-25T22:44:36+02:00
comments: true
url: /blog/2019/09/debugging-angular-ivy-console
image: /blog/assets/imgs/debugging-ivy-bg.jpg
categories:
  - Angular
tags:
  - rxjs
  - angular
draft: false
---

{{<intro>}}
  Do you remember how in AngularJS (v1.x) we could easily debug/change the state of our components from the browser's devtools. Guess what: now with Ivy a new easy API returns that openes up a variety of new ways. Let's see how that works.
{{</intro>}}

<!--more-->

{{< postad >}}

Do you remember the good old AngularJS days :wink:, where you could simply write...

```
> angular.element($0).scope()
```

...to your browser's devtools console and get access to the scope of your component to manipulate and inspect it? About 3 years ago (man time passes by), I wrote a blog post about [Debugging Angular Applications](/blog/2016/02/debugging-angular2-console/). It highlighted how you could easily inspect the component state from the browser devtools console with AngularJS and how that changed with the early versions of Angular (2+). In fact starting from the early versions of Angular 2+ the `ng.probe` API has been introduced to allow you to interact with the component state from your console.

<blockquote class="emphasized">"Ivy is an enabler" <cite>Igor Minar</cite></blockquote>

With Ivy new APIs have been added to the global `ng` object. If you open up your devtools (i.e. Chrome's Devtools) and type `ng`, you'll see something like this:

{{<figure url="/blog/assets/imgs/ivydebug-ng-api.png" size="full">}}

What we can do now is to go to the "Elements" panel in the devtools and choose for instance the `<mat-drawer>` component (which comes from [Angular Material](https://material.angular.io/components/sidenav/overview)).

{{<figure url="/blog/assets/imgs/ivydebug-select-item-inspect.png" size="full">}}

When you click on an element, you then have it at disposal as `$0` in the devtools console (`$1` the second last, `$2` the third last etc..you get the idea). We can now use the `ng.getComponent(...)` and directly pass it the DOM tag we've selected previously, basically `$0`. We can store the component in a variable and then start to interact with it.

{{<figure url="/blog/assets/imgs/ivydebug-matdrawer-instance.png" size="full">}}

For instance let's invoke the `toggle()` function of the `<mat-drawer>` to close the side menu.

<video width="100%" controls autoplay>
  <source src="/blog/assets/imgs/ivy-debug.mov" type="video/mp4">
</video>

The commands executed are:

```
// grab the component instance of the DOM element stored in $0
let matDrawer = ng.getComponent($0);

// interact with the component's API
matDrawer.toggle();

// trigger change detection on the component
ng.markDirty(matDrawer);
```

## What's happening to the `ng.probe` API?

It most probably won't be supported by Ivy

> In Ivy, we don't support NgProbe because we have our own set of testing utilities with more robust functionality. We shouldn't bring in NgProbe because it prevents DebugNode and friends from tree-shaking properly.

[More details here](https://github.com/angular/angular/blob/master/packages/platform-browser/src/dom/debug/ng_probe.ts#L40-L47).

## Conclusion

This new API allows us to quickly interact with components and test out things without having to go back and forth between our editor and browser. But even more, new devtools extensions can be developed on top of these APIs to facilitate our lifes even more. For instance, if you take a look at the components, they have a `__ngContext__` attached which has a `debug` object with lots of interesting methods to query the component and it's template properties. Note however, these APIs (or some of them) are only available in development mode and will be compiled away in production mode.
