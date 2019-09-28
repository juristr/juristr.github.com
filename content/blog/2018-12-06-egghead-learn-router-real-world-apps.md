---
title: Learn Angular Router for Real-World Applications
lead: My Egghead course on the Angular router
categories:
  - Angular
date: 2018-12-06T01:00:00.000Z
comments: true
url: /blog/2018/12/egghead-learn-router-real-world-apps
type: post
image: /blog/assets/imgs/egghead-router-course.png
---

<div class="article-intro">
    Finally, it's out!!! My Angular router course is now available on Egghead, go grab it :)
</div>

<!--more-->

{{< postad >}}

I'm glad it's finally out. I've been working on this course for quite a while now, on and off. The router is a complex topic and still needed in nearly every real-world Angular app out there. The biggest challenge in creating this course was to keep lessons bite-sized and still useful and complete, but mostly to start with newcomers and get them to become productive with the router quickly. I drafted out lots of lessons, but ultimately decided to split the course in two.

That said here's the 1st one: this course is meant to introduce you to the Angular router and bring you up to speed in about **~60 minutes** (of videos). Have fun, and if you have any questions. just comment here or below the single lesson on Egghead.

> Also, **hurry**, Egghead is doing a **sale with up to 45% off**. Support Egghead, support me, and especially grow your own career [by getting access to tons of top-notch video lessons](https://egghead.io/pricing).

<figure class="image--medium">
    <a href="https://egghead.io/courses/learn-angular-router-for-real-world-applications?af=fj2vsx" class="external-link" data-client="eggheadio" data-uid="courses/learn-angular-router-for-real-world-applications">
      <img src="/blog/assets/imgs/egghead-router-course.png" />
    </a>
    <figcaption>Maggie Appleton's awesome illustration for my Egghead router course. Love it!</figcaption>
</figure>

<h2><a href="https://egghead.io/courses/learn-angular-router-for-real-world-applications?af=fj2vsx" class="external-link" data-client="eggheadio" data-uid="courses/learn-angular-router-for-real-world-applications">About the course</a></h2>

One of the fundamental concepts for building a successful large-scale application is breaking it down into smaller, potentially independent, but mainly more controllable and maintainable parts. This starts at the component level, the module level, and finally the application routing level. Routing is a core part of every application—it should be part of every developer’s tool belt.

This course will guide you step-by-step from understanding the basic concepts of routing to mastering expert-level topics. We'll start by setting up and configuring the router, then define simple routes and child routes and best practices of organizing them using the Routing Module pattern.

You'll learn about the supported URL types and its segments, how to define them, and how to leverage RxJS Observables for subscribing to route updates. We'll also learn how to secure routes with various types of guards and about performance tuning with the router’s lazy loading and preloading capabilities.


<h3><a href="https://egghead.io/lessons/angular-define-and-configure-a-route-with-the-angular-router?af=fj2vsx" class="external-link" data-client="eggheadio" data-uid="courses/learn-angular-router-for-real-world-applications">Define and configure a route with the Angular router</a></h3>

Components are first class citizens in an Angular application. Therefore, naturally each route points to an Angular component which gets activated whenever that route is triggered. In this lesson we will learn how to define such “routing components”, how to configure them on our router and how to activate them accordingly. Note, the router has been already installed using `npm install @angular/router --save`.

<h3><a href="https://egghead.io/lessons/angular-create-a-redirect-rule-with-the-angular-router?af=fj2vsx" class="external-link" data-client="eggheadio" data-uid="courses/learn-angular-router-for-real-world-applications">Create a redirect rule with the Angular router</a></h3>

A common use case is to redirect to some home view of your application, especially at the first visit of the user. In this lesson we are going to learn how to define a redirect with the Angular router.

<h3><a href="https://egghead.io/lessons/angular-catch-an-invalid-route-navigation-with-the-angular-router?af=fj2vsx" class="external-link" data-client="eggheadio" data-uid="courses/learn-angular-router-for-real-world-applications">Catch an invalid route navigation with the Angular router</a></h3>

Usually on web sites, if you pay attention to a good user experience, you define a custom 404 page, telling the user he arrived at some dead end. Similarly we should do for our Angular application routing. In this lesson we learn how to define such “404 route” using the Angular router.

<h3><a href="https://egghead.io/lessons/angular-organize-routes-using-the-routing-modules-pattern-in-angular?af=fj2vsx" class="external-link" data-client="eggheadio" data-uid="courses/learn-angular-router-for-real-world-applications">Organize routes using the Routing Modules pattern in Angular</a></h3>

When our routing configuration gets more complex it is suggested to organize routes using the so-called “Routing Module” pattern. Simply speaking, this means moving the route definitions and everything else related to routing into its own dedicated NgModule, a sub module of the feature module you’re working on. In this lesson we will take a look how to migrate a simple routing configuration to reflect the Routing Module pattern.

<h3><a href="https://egghead.io/lessons/angular-define-and-read-route-parameters-with-the-angular-router?af=fj2vsx" class="external-link" data-client="eggheadio" data-uid="courses/learn-angular-router-for-real-world-applications">Define and read route parameters with the Angular router</a></h3>

An Angular URL can be structured into segments, each of which is formed by its path and series of additional information such as parameters, query parameters and fragment. Parameters are a way to provide a per segment scoped information, such as the ID of an object to be visualized by the activated component. In this lesson we learn how to define and read route parameters from within an Angular component in order to further process it.

<h3><a href="https://egghead.io/lessons/angular-define-and-read-query-parameters-with-the-angular-router?af=fj2vsx" class="external-link" data-client="eggheadio" data-uid="courses/learn-angular-router-for-real-world-applications">Define and read query parameters with the Angular router</a></h3>

An Angular URL can be structured into segments, each of which is formed by its path and a series of additional information such as parameters, query parameters and fragment. Query parameters are a way to provide useful data to components, with the particularity that they are shared across many activated routes and therefore accessible from multiple component. In this lesson we will learn how to define and read a route’s query parameters.

<h3><a href="https://egghead.io/lessons/angular-forward-url-parameters-to-an-angular-service-to-retrieve-the-desired-data?af=fj2vsx" class="external-link" data-client="eggheadio" data-uid="courses/learn-angular-router-for-real-world-applications">Forward URL parameters to an Angular Service to retrieve the desired data</a></h3>

One of the most common patterns is to read some kind of ID from a URL parameter and invoke an Angular Service which in turn fetches the data based on the parameters. In this lesson we’ll take a look how we can get the data from the URL and forward it to the Angular service. We will also learn how to leverage RxJS operators to make our code more readable.

<h3><a href="https://egghead.io/lessons/angular-create-a-hyperlink-to-an-angular-route-using-routerlink?af=fj2vsx" class="external-link" data-client="eggheadio" data-uid="courses/learn-angular-router-for-real-world-applications">Create a hyperlink to an Angular route using RouterLink</a></h3>

Usually when defining different routes, we want to give the user the possibility to switch between them. Most often this happens through hyperlinks defined in some kind of application menu. In this lesson we will take a closer look how to define links to different application routes. Moreover we will learn how to leverage Angular’s `routerLink` directive for this job.

<h3><a href="https://egghead.io/lessons/angular-highlight-the-currently-active-route-with-the-routerlinkactive-directive-in-angular?af=fj2vsx" class="external-link" data-client="eggheadio" data-uid="courses/learn-angular-router-for-real-world-applications">Highlight the currently active route with the `routerLinkActive` directive in Angular</a></h3>

When you have an application menu with a series of links pointing to different application routes, you definitely want to highlight which route is currently active by styling its corresponding link. Fortunately in Angular this is quite easy to achieve. In this lesson we will learn to leverage the routerLink directive and in particular its `routerLinkActive` property.

<h3><a href="https://egghead.io/lessons/angular-resolve-data-as-part-of-the-route-transition-in-angular?af=fj2vsx" class="external-link" data-client="eggheadio" data-uid="courses/learn-angular-router-for-real-world-applications">Resolve data as part of the route transition in Angular</a></h3>

Usually our route contains some identifier as parameter which we then read in the activated component to fetch further data to be displayed. However, in some cases we might be better served to resolve that data before the actual component gets activated. The Angular router allows us to implement such thing by using a so-called route `Resolver`. In this lesson we’re going to take a closer look and implement one by ourselves.

<h3><a href="https://egghead.io/lessons/angular-pass-static-data-to-a-component-as-part-of-the-route-transition-in-angular?af=fj2vsx" class="external-link" data-client="eggheadio" data-uid="courses/learn-angular-router-for-real-world-applications">Pass static data to a component as part of the route transition in Angular</a></h3>

While route resolvers are useful fetching the data to be passed to the routed component, statically configured data is useful for configuration purposes. In this lesson we learn about the data property which is part of Angular's route definition and which allows us to pass in some static data that can be used from within a route resolver, route guard or even the routed component to customise it's behaviour.

<h3><a href="https://egghead.io/lessons/angular-navigate-to-another-route-from-within-my-angular-component-code?af=fj2vsx" class="external-link" data-client="eggheadio" data-uid="courses/learn-angular-router-for-real-world-applications">Navigate to another route from within my Angular component code</a></h3>

Often we don’t have some URL we can create and have the user click on it for redirecting to another route. We simply need to do it from within our Angular component code. Say for instance you click a save button and once the record has been successfully stored on your backend, you want to redirect to another route. In this lesson we're going to take a closer look at the various router navigate functions.

<h3><a href="https://egghead.io/lessons/angular-preserve-the-current-route-s-query-parameters-when-navigating-with-the-angular-router?af=fj2vsx" class="external-link" data-client="eggheadio" data-uid="courses/learn-angular-router-for-real-world-applications">Preserve the current route’s query parameters when navigating with the Angular Router</a></h3>

When we redirect to a different route from within our component's code using the Router.navigate or from within a component template via a `[routerLink]` directive, we may want to preserve the current route’s query parameters and carry them on to the next route. In this lesson we'll learn about the router's preserveQueryParams option as well as the `[queryParams]` directive on the `[routerLink]`.

<h3><a href="https://egghead.io/lessons/angular-create-a-side-by-side-navigation-between-a-list-and-its-detail-with-the-angular-router?af=fj2vsx" class="external-link" data-client="eggheadio" data-uid="courses/learn-angular-router-for-real-world-applications">Create a side-by-side navigation between a list and its detail with the Angular Router</a></h3>

Mostly all advanced routing mechanisms allow not only for top-level routes, but also to define child routes. Consider an application menu having a “People” entry and within that component we have a list of names which in turn when clicking on them open a side-view directly displaying the details of that specific person. We just pictured a multi-level route. In this lesson we will define and configure such a child route and learn how they work with the Angular router.

<h3><a href="https://egghead.io/lessons/angular-navigate-to-a-component-relative-location-with-the-angular-router?af=fj2vsx" class="external-link" data-client="eggheadio" data-uid="courses/learn-angular-router-for-real-world-applications">Navigate to a component relative location with the Angular router</a></h3>

In a well structured and modularized Angular application we may not want to have our components know the entire path of a route, but rather we may just want to redirect “locally” within the current route. The Angular router allows us to specify such relative navigation which is what we’re going to learn in this lesson.

<h3><a href="https://egghead.io/lessons/angular-navigate-to-a-component-relative-location-with-the-angular-router?af=fj2vsx" class="external-link" data-client="eggheadio" data-uid="courses/learn-angular-router-for-real-world-applications">Navigate to a component relative location with the Angular router</a></h3>

In a well structured and modularized Angular application we may not want to have our components know the entire path of a route, but rather we may just want to redirect “locally” within the current route. The Angular router allows us to specify such relative navigation which is what we’re going to learn in this lesson.

<h3><a href="https://egghead.io/lessons/egghead-lazy-load-a-route-with-the-angular-router?af=fj2vsx" class="external-link" data-client="eggheadio" data-uid="courses/learn-angular-router-for-real-world-applications">Lazy load a route with the Angular router</a></h3>

Sometimes in big applications, it might simply not be feasible to have the user download it entirely at startup. After all, not all of the application modules might be used with the same frequency, or even not be accessible at all based on user rights. In this lesson we will therefore explore how to lazy load application modules with the Angular router and hence optimize the time to interactive of our application

<h3><a href="https://egghead.io/lessons/egghead-avoid-delays-for-lazy-modules-by-applying-a-preloading-strategy-with-the-angular-router?af=fj2vsx" class="external-link" data-client="eggheadio" data-uid="courses/learn-angular-router-for-real-world-applications">Avoid delays for lazy modules by applying a preloading strategy with the Angular router</a></h3>

Lazy loading your Angular modules has some substantial performance benefits at application startup. However, when the user then activates a lazy loaded route, there’s the cost of having to wait for that Angular module to be fetched and fully loaded. To mitigate this issue, the Angular router gives us the possibility to preload a lazy loaded route at runtime.

<h3><a href="https://egghead.io/lessons/angular-define-a-custom-preloading-strategy-for-the-angular-router?af=fj2vsx" class="external-link" data-client="eggheadio" data-uid="courses/learn-angular-router-for-real-world-applications">Define a custom preloading strategy for the Angular router</a></h3>

While Angular's built-in `PreloadAllModules` strategy works well, in a larger application you might want to get a bit more fine-grained control over which route to preload and which to only load once the user clicks the corresponding link. In this lesson we're creating a custom preloading strategy to exactly do that.

<h3><a href="https://egghead.io/lessons/egghead-prevent-a-route-activation-based-on-user-permissions-with-the-angular-router?af=fj2vsx" class="external-link" data-client="eggheadio" data-uid="courses/learn-angular-router-for-real-world-applications">Prevent a route activation based on user permissions with the Angular router</a></h3>

Security has to be done at the API level on the server side. However, for a better user experience we may want to prevent the user from entering areas of our application he’s not authorized to access. By using the `CanActivate` route guard we make this happen.

<h3><a href="https://egghead.io/lessons/egghead-prevent-a-route-from-being-lazy-loaded-based-on-user-permissions-with-the-angular-router?af=fj2vsx" class="external-link" data-client="eggheadio" data-uid="courses/learn-angular-router-for-real-world-applications">Prevent a route from being lazy loaded based on user permissions with the Angular router</a></h3>

What if we have a lazy loaded application module behind some route and we want to prevent an unauthorized user from accessing it? We can directly implement a `CanLoad` route guard to even prevent the lazy loaded module from being downloaded. That’s what we are going to do in this lesson.

<h3><a href="https://egghead.io/lessons/egghead-notify-user-about-unsaved-data-when-leaving-a-component-using-the-angular-router?af=fj2vsx" class="external-link" data-client="eggheadio" data-uid="courses/learn-angular-router-for-real-world-applications">Notify user about unsaved data when leaving a component using the Angular Router</a></h3>

Sometimes we want to be able to prevent the user from navigating away from a given screen. Especially if some data has been modified but not yet saved. The `CanDeactivate` guard allows us to do exactly this. In this lesson we will take a closer look by implementing one by ourselves.

## That's it!

I really hope you enjoy it. If you have any feedback regarding the course or about new courses you'd like me to create, feel free to either contact me on [Twitter (@juristr)](https://twitter.com/juristr) (DMs are open) or [open an AMA](https://github.com/juristr/ama/issues/new). Enjoy!
