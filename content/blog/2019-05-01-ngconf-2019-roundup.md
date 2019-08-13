---
type: post
title: "Angular 8 and the Future - NGConf 2019 Roundup"
lead: >-
  My core takeaway from NGConf 2019
date: 2019-05-01T17:30:08+02:00
comments: true
# url: /blog/2018/10/journey-promises-to-rxjs
image: /blog/assets/imgs/ngconf2019/ngconf-post-cover.png
categories:
  - Angular
tags:
  - angular
---

{{<intro>}}
  I'm not at NGConf 2019 (unfortunately). But I'm following along very closely with the Angular community (and as an Angular GDE) I'm particularly excited what's currently being announced at Salt Lake City :wink:. As such I'm summarizing here my main takeaway from the conf.
{{</intro>}}
<!--more-->

{{< postad >}}


Note, _I'll update this blog post as I catch up with talks from the conf, so don't forget to check back_  
_Last update: 8th May 2019 11:30pm GMT+2 - check my [Twitter stream for more](https://twitter.com/juristr)_

---


{{< toc >}}

## Disclaimer

This is my personal summary of the sessions from ngconf. While I summarize the things with my own words, the material used such as images, graphs, source code examples are not my own. Most of them are from the Youtube videos or slide of the respective speakers of the various sessions.

## Keynote (day 1)

_Brad Green & Igor Minar - [Youtube](https://youtu.be/O0xx5SvjmnU), [Slides](https://docs.google.com/presentation/d/19yTRqHT1v4SQz5kXCL6OrIWvH9M20029s_ri5Eil03Y/edit?usp=sharing)_

First and foremost, before going ahead with "tech details", this is what the Angular community stands for..

{{<figure url="/blog/assets/imgs/ngconf2019/angular-values.png" size="full">}}

..and I can just confirm this 100%. Especially also the community aspect: I've been in the community for a couple of years now, visited conferences, spoke at conferences and all are extremely welcoming, friendly and helpful.


**Angular is a platform**, no more just a framework, which comprises a number of products.

{{<figure url="/blog/assets/imgs/ngconf2019/angular-products.png" size="full">}}

You don't have to use all of them. You can plug them in based on your needs. The Angular team behind, makes sure they all fit together nicely and that the tooling around is built to be best integrated and makes you most productive.

Angular version 8 is currently (as of writing this article) in RC mode and is to be released ~end of May.

{{<figure url="/blog/assets/imgs/ngconf2019/angular-release-timeline.png" size="full" caption="Angular release timeline for v8 and v9">}}

### Differential Loading

One of the main features that are coming in v8 is **differential loading**. Performance has high priority for the Angular team and the Chrome team at Google in general. Among other optimization techniques (i.e. [see my lazy loading article](/blog/2019/04/Lazy-Loading-Components-with-Angular-Elements/)), differential loading creates two different bundles: one for legacy browsers and one (with reduced polyfills) for modern evergreen browsers.

{{<figure url="/blog/assets/imgs/ngconf2019/differential-loading.png" size="full">}}

In your `index.html` this might then look similar to

```html
<html>
<body>
  ...
  <script src="runtime-es2015.dad4acd01345fe10b787.js" type="module"></script>
  <script src="runtime-es5.6cffd6705a5f1b5672ec.js" nomodule></script>
  
  <script src="polyfills-es2015.7a264d14fd7126ba8db0.js" type="module"></script>
  <script src="polyfills-es5.e0a0858fa7791e140ae9.js" nomodule></script>
  
  <script src="main-es2015.10d662e5c82a4d9bdd45.js" type="module"></script>
  <script src="main-es5.650a5faad890ed815a26.js" nomodule></script></body>
</body>
</html>
```

The `type="module"` will be interpreted by modern browsers, loading the `es2015` optimized bundles, while legacy browsers will fallback to the `nomodule` script tags. This allows to save ~7-20% of the current bundle size. And the best of all? No server-side infrastructure changes are needed. This is entirely handled by the browser 🎉.

But there are more features to come:

{{<figure url="/blog/assets/imgs/ngconf2019/features-v8.png" size="full" caption="Angular v8 features">}}

### Builders

**Builders** are a new feature of the stabilized API also known as "Architect" that allows to extend the current Angular CLI build process. Like Angular Schematic allow you to extend and hook into the code scaffolding process of the CLI, allowing you to provide your own generators, _builders allow you to customize the CLI_.  
You see those builders already if you inspect your `angular.json` file:

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "",
  "projects": {
    "demoapp": {
      ...
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            ...
          },
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          ...
        },
      }
    }
  },
}
```

This opens up a huge set of possibilities to decide by yourself which tools should run and you can orchestrate them by yourself. Like on top of builders you could create functionality to automatically deploy directly from the CLI.

### Deploy from the CLI

Minko also demonstrated this by deploying to Firebase. More [here](#automated-deploy-via-cli).

### Web Workers and Lazy Loading

**Web Workers** support has been improved, allowing to move some intense processing out into a separate worker thread to not interfere with the main UI thread of the browser.

**Lazy Loading** will also finally no more rely on "magic strings" that the Angular CLI has to know about, parse and apply code splitting. You see those strings for instance in the Router's lazy loading configuration:

```javascript
// example lazy route
{
  path: 'search',
  loadChildren: './search/search.module#SearchModule'
}
```

Starting from v8 you can use the native `import()` API and rewrite it like

```javascript
{
  path: 'search',
  loadChildren: () => import('./search/search.module').then(mod => mod.LazyModule)
}
```

### WIP: Bazel and Ivy

There's some work in progress as well:

{{<figure url="/blog/assets/imgs/ngconf2019/angular-version-9.png" size="full">}}

**Bazel** is one of those. It's the open source version of Google's internal "Blaze" build tool that powers its huge internal monorepo. Bazel is known for being extremely fast, especially due to its ability of allowing it to scale on the cloud as well (Google has an internal requirement that on average a rebuild of any codebase size should never take longer than ~3 secs :scream:)

{{<figure url="/blog/assets/imgs/ngconf2019/bazel-features.png" size="full" caption="Bazel features">}}

A dedicated team within the Angular team is currently working on bringing Bazel to the Angular community s.t. we can all benefit from such a super-power build tool. Currently it's still an "early version" which can be used and works already, but is still a bit rough. By Q9 the goal is that everyone will be able to basically just enable a flag on the CLI configuration and Bazel will take care of the build rather than Webpack (something like that. details are still in the works ofc).

So far internally at Google some really big improvements could be observed by using Bazel:

{{<figure url="/blog/assets/imgs/ngconf2019/bazel-build-time-reduction.png" size="full" caption="Build time improvements powered by Bazel">}}

And of course the new **Ivy renderer**. Here are the goals for it:

{{<figure url="/blog/assets/imgs/ngconf2019/ivy-features-overview.png" size="full">}}

The current focus for v8 was especially to guarantee **backwards compatibility**. Most important, **Ivy won't be on by default in v8**. The team ships it with v8 with the possibility to opt-in. Currently inside Google 97% of all of the unit, integration and screenshot tests are currently passing.

{{<figure url="/blog/assets/imgs/ngconf2019/ivy-tests-google.png" size="full" caption="Passing unit, integration and screenshot tests @ Google">}}

This makes the team quite confident, however they're using the time to Angular v9 (in Q4 this year) to get some further feedback from the community.

{{<figure url="/blog/assets/imgs/ngconf2019/ivy-backwards-risks.png" size="full">}}

The Angular team is interested in getting feedback for projects with lots of different dependencies to see how well these work with Ivy

That said, you can definitely opt-in your Angular v8 app. You can try Ivy today by generating a new v8 app with

```
$ ng new my-app --enable-ivy
```

..or enable it on an existing v8 app by adding the `enableIvy` in your `tsconfig.app.json`

```json
{
  "compilerOptions": { ... },
  "angularCompilerOptions": {
    "enableIvy": true
  }
}
```

All the details can be found on [https://next.angular.io/guide/ivy](https://next.angular.io/guide/ivy).

### Ivy Features

So what does Ivy bring us most importantly? First of all **smaller bundles**.

{{<figure url="/blog/assets/imgs/ngconf2019/ivy-size-chart.png" size="full">}}

To explain this image:

- View Engine is the current rendering engine
- View Engine + Differential is to use the current renderer with the new differential loading being introduced in v8
- Ivy Compat + Differential is what you get when activating the `enableIvy` flag and this is where the team needs the most feedback.
- Ivy Future API + Differential is an experimental, not yet documented API that will dramatically reduce the size.

Besides that, Ivy comes with some really nice side effects as well:

- **Lower memory requirements -** the team has observed 30% reduction in application simulation and Angular Material library tests take 91% less memory
- **Faster tests -** the Angular framework unit test time decreased by 38%, those of the material library by 80%
- _plus a lot of outstanding bugs have been fixed_

### Angular Everygreen

{{<figure url="/blog/assets/imgs/ngconf2019/angular-evergreen.png" size="full">}}

One of the goals of Angular straight from the beginning was to become an "evergreen platform". If you think about the fast evolving web tech, this is quite a crazy goal, right? But now we're already at version 8 and we're getting reports from company's out there that upgrade across "potentially breaking verions" without hassle and in record time. Just read [Air France KLM's post](https://medium.com/airfrance-klm/how-we-upgraded-a-website-with-half-a-billion-annual-users-to-angular-7-in-less-then-a-day-71de33a1108e).

### Angular Scaling in the Industry

In the following chart, we see the scaling Angular.js (v1) aimed for. It was for quickly building small to medium sized apps.

{{<figure url="/blog/assets/imgs/ngconf2019/scaling-angularjs.png" size="full" caption="AngularJS scaling from small to medium apps">}}

However due to technical limits, it wasn't able to scale that beyond, which is the main reason Angular (2+) started. The goal was to have all of the reach of AngularJS + what Angular 2+ would bring. Instead, right now this is the situation, currently mostly suitable for the enterprise use case:

{{<figure url="/blog/assets/imgs/ngconf2019/scaling-current-angular.png" size="full">}}

With Angular Ivy and especially [Angular Elements](/blog/2019/04/intro-to-angular-elements/) this can be extended to the small apps as well, where no full blown app is needed but just small integration points and components.

{{<figure url="/blog/assets/imgs/ngconf2019/scaling-angular-ivy.png" size="full" caption="Scaling with Ivy and Angular Elements">}}

A new project named "Photon" is targeting the upper part of the curve, where the really big enterprise apps lie.

{{<figure url="/blog/assets/imgs/ngconf2019/scaling-angular-photon.png" size="full" caption="Upper scaling with Photon">}}

As you note, there's still a space in the very upper part (Billion user apps), and while the team cannot announce anything yet, they're collaborating with a Google internal team that is specifically designing those apps to evaluate whether Angular could expand into that space as well. 

### Angular and OSS

As most know, Angular is developed completely OSS on GitHub and brought into Google. Google actually runs on **development HEAD** (which sounds crazy). But at the same time, by continuously integrating Angular from GitHub over Google's CI into the Google monorepo, thousands of automated tests are triggered. Not just those of the framework itself, but of other apps running on Angular. This give the team further confidence about the stability of Angular.

Also, there's a vivid exchange and a mutual benefit between Google and the OSS community.

{{<figure url="/blog/assets/imgs/ngconf2019/angular-oss.png" size="full">}}

Projects like Ivy came from the OSS community into Google and now have a major impact. Similar, build tools like Bazel started at Google and are now in the process of being open sourced.

### Angular Collaborators

The Angular ecosystem grows and grows and more PRs come in from OSS contributors. In order to make sure the team doesn't get overwhelmed, but still helping those PRs successfully land, it needs to find a strategy for scaling these efforts. Thus, **Angular Collaborators** has been launched. They are basically in the following part of the "hierarchy" (what a bad word).

{{<figure url="/blog/assets/imgs/ngconf2019/angular-collaborators.png" size="full">}}

The goal is to have a trusted set of collaborators which get mentoring from actual Angular team members, get invited to meetings etc, and which can then help other OSS contributors with their PRs.

{{<figure url="/blog/assets/imgs/ngconf2019/angular-collaborators-goals.png" size="full">}}

How do you join?

- **Community:** be an awesome contributor
- **Enterprise:** devrel [at] angular.io

Finally...

{{<figure url="/blog/assets/imgs/ngconf2019/empathy-respect.png" size="full">}}

## Keynote (day 3)

_Misko Hevery and Stephen Fluin - [Youtube](https://www.youtube.com/watch?v=-kYtw3CSe6s), [Slides](http://bit.ly/angular-rd-report)_

The Angular Team develops on GitHub, in public.

{{<figure url="/blog/assets/imgs/ngconf2019/key3-innovate-open.png" size="full">}}

As such they also **innovate in the open**, they make experiments, PRs containing proof of concepts they need in order to progress the platform and explore new ideas. As such **not every line of code necessarily affects you**. This often resuls in misinterpretation when those commits or PRs land on social media, on reddit etc, without further context.

The process a new Angular feature goes through is more or less something like this:

{{<figure url="/blog/assets/imgs/ngconf2019/key3-process.png" size="full" caption="Informal process from idea to implementation of new Angular features">}}

**Ideas** continuously emerge, mostly out of an existing problem. From that knowledge a **theory** evolves, exploration of what would happen if "X" is done/implemented (via proof of concepts, design docs,...). If that works out, the team starts to implement the underlying primitives that make it **possible**. Also initially not the full set of tooling is being implemented, but rather some of it is left to the community. If the community responds very well, the team starts to help **make it easy**, by adding documentation, higher the quality bar, via opt-in and self-run commands. Finally the goal is to make it **automatic**, i.e. via ng-update, schematics, fully integrate it into the platform and make it the "only way" (or suggested way of doing something).

Such projects that are early experiments land as so-called Angular Labs project.

{{<figure url="/blog/assets/imgs/ngconf2019/key3-ng-labs.png" size="full">}}

For such projects, the goal might change, APIs might change and also failure is an option. Some of the projects that have gone through this Labs mode and graduated are for instance: CDK (2017), Elements (2018), Schematics (2018), Builders (with 8.0 - 2019).

Current Labs projects are:

{{<figure url="/blog/assets/imgs/ngconf2019/key3-current-ng-labs.png" size="full" caption="Current Angular Labs projects">}}

### Future Ideas

{{<figure url="/blog/assets/imgs/ngconf2019/key3-future-ideas.png" size="full">}}

#### Fastest possible apps

The focus here is TTI (Time to Interactive). The best way to achieve better TTI is basically "the less code, the better". The hard task is to understand the difference between the code you will need vs. the one you "might need". Like if there is a button on the UI, the code executed for that button click is "code you might need". If the user doesn't click it, you don't need it.

{{<figure url="/blog/assets/imgs/ngconf2019/key3-code-needed.png" size="full">}}

This is really difficult to understand and tree shaking cannot solve this for us. Currently by default Angular provides lazy load boundaries around routes, which is something where Angular needs to improve. I did dig into the lazy loading part in one of my articles here:

{{<article-link 
   url="/blog/2019/04/state-lazy-loading-components-angular/" 
   title="Lazy load Angular Components" 
   text="Or better..how to lazy load Angular Modules. Learn about the state of lazy loading and lazy loading on steroids with Angular Elements" 
   imageurl="" 
>}}

#### Replayable vs. Resumable

{{<figure url="/blog/assets/imgs/ngconf2019/key3-replayable-vs-resumable.png" size="full">}}

Right now we have replayable apps. The server might perform some prerendering, the client takes over, does the bootstrap again, fetches the data again etc...Different to that, a resumable app just takes over and goes ahead, without the need to replicate certain steps.

{{<figure url="/blog/assets/imgs/ngconf2019/key3-resumable-chart.png" size="full">}}

Replayable is quite easy and we're comfortable doing it. Resumable is harder but totally worth it (for certain use cases). However, in order to be able to create resumable apps, Angular needs to be aware of the state it manages and provide ways to rehydrate the DOM. 

{{<figure url="/blog/assets/imgs/ngconf2019/key3-state.png" size="full">}}

The goal is basically if yo have various controls and components on your page (rendered via server side rendering), the logic behind the component (i.e. the JavaScript) is only loaded if the user starts interacting with it (i.e. by typing into an input field etc..). So lazy loading has to go further and not only for routes but rather for

- interactions
- injected services
- code for re-rendering

**Ivy** paves the way for starting to think about adding such features.

#### Ideas of implementing a resumable Todo app

{{<figure url="/blog/assets/imgs/ngconf2019/key3-disclaimer.png" size="full">}}

[More here &raquo;](https://youtu.be/-kYtw3CSe6s?t=1308)


## Angular for the Enterprise

_Stephen Fluin - [Youtube](https://youtu.be/4d1HYKL2tt4)_

Stephen's goal with the talk is to reduce the information asymmetry. Although there's a quite extensive [documentation on the official Angular site](https://angular.io), certain question come up always again as core challenges. Moreover each of us developing Angular apps has different solutions and approaches. So let's share them, blog about it, create OSS libraries.

{{<figure url="/blog/assets/imgs/ngconf2019/ng-enterprise-information-asymmetry.png" size="full">}}

### Mobile Apps

First of all "Why do you need an app?". What's the goal? Answering these questions may influence also the technology you choose. There are currently these approaches available with Angular: PWAs, Ionic or go even native with NativeScript.

{{<figure url="/blog/assets/imgs/ngconf2019/ng-enterprise-mobileapps.png" size="full">}}

### Shared Components and Open Source

According to Stephen there are currently these different layers of components within organizations:

{{<figure url="/blog/assets/imgs/ngconf2019/ng-enterprise-componentlayers.png" size="full">}}

There are the UI level components that make up the design system of the company. And I totally agree with Stephen here. These emerge naturally. Even though you may not be building this intentionally, a design system might emerge to standardize the look & feel across your applications. Business Components on the other side are components encapsulating entire, common business functionality that can be re-used across apps as well.  
When developing these, don't forget about the [Angular CDK](https://material.angular.io/cdk/categories) which is a collection of design-system agnostic components that can serve you as the foundation.

It's key to **facilitate the collaboration** when building a shared component set. The best approach is to go Open Source (if possible). A good example is [VMWare's Clarity Design System](https://clarity.design/), completely build as OSS model.  
Also consider using a monorepo approach, which allows you to move fast, see the impact of changes. It also helps develop the tooling to validate incoming PRs and stuff.

### Hybrid Apps & Mixed Environments

In large organizations you have different teams which aren't necessarily all using Angular. Still you might want to have a common set of tools and organize your code in a monorepo environment. [Nrwl's NX](https://nx.dev) allows to do exactly that. You can develop Angular Apps, TypeScript libraries, even React apps and server-side Node within a single monorepo supported by NX's tooling, a custom set of extensions built on top of the Angular CLI.

{{<figure url="/blog/assets/imgs/ngconf2019/ng-enterprise-nx.png" size="full">}}

Another thing not to forget in this context are **Angular Elements**. It allows to create compile Angular components into standard "web components", more specifically Custom Elements. If you wanna learn more about that, check out [my article on introducing Angular Elements](/blog/2019/04/intro-to-angular-elements/).

{{<figure url="/blog/assets/imgs/ngconf2019/ng-enterprise-ngelements.png" size="full" caption="Angular Elements to share across teams and tech boundaries">}}

### Testing

Testing - although often underrated - is of extreme importance. Especially if you go the monorepo route and want to remain a high level of agility in your codebase. The Angular team officially supports Karma and Protractor and has some plans for improving them in the future.

{{<figure url="/blog/assets/imgs/ngconf2019/ng-enterprise-testing.png" size="full">}}

Personally I'm a big fan of [Cypress](https://www.cypress.io) and have already used it successfully in multiple Angular projects, especially for the more integration level tests. I still have to look into Jest which looks very promising as well and I heared good things.

{{<figure url="/blog/assets/imgs/ngconf2019/ng-enterprise-testing-othertools.png" size="full">}}

The message is: "it's fine to use them as well", even though they're not officially promoted by the team as other tools are. Feel free what best fits your needs.

Are you more into screenshot & visual testing? Then these might be good candidates:

{{<figure url="/blog/assets/imgs/ngconf2019/ng-enterprise-visualtesting.png" size="full" caption="Tools for visual testing">}}

### Progressive Web Applications (PWA)

Do you need one? Most probably. It helps build faster, more resilient user experiences and allows for a deeper engagement with the user (through push notifications, installing it on the home screen etc...). Angular tries to make this extremely easy. Just to give you an example. In order to add service worker support, all you have to do to get started is to invoke the following command from your Angular CLI:

```
$ ng add @angular/pwa --project *project-name*
```

And if you have still doubts whether service workers and PWAs are actually being used? Go to this website on your browser: `chrome://serviceworker-internals/`. It gives you a list of all the service workers installed on your machine. Yes, it's no more a niche technology.

### A/B Testing and Experiments

{{<figure url="/blog/assets/imgs/ngconf2019/ng-enterprise-featureflags.png" size="full">}}

If you wanna realize feature flags that don't have an impact on the bundle size, you need to split at the lazy level (Modules, Components) and accordingly load them in. See my article on lazy loading components for more details on that:

{{<article-link 
   url="/blog/2019/04/state-lazy-loading-components-angular/" 
   title="Lazy load Angular Components" 
   text="Or better..how to lazy load Angular Modules. Learn about the state of lazy loading and lazy loading on steroids with Angular Elements" 
   imageurl="" 
>}}

### Staying Up to Date

{{<figure url="/blog/assets/imgs/ngconf2019/ng-enterprise-keep-up-to-date.png" size="full">}}

One thing is to automatically upgrade via the Angular CLI commands (`ng update`) which work really well in the latest versions. Another problem however is how to keep everyone else in the organization motivated for updating. Some strategies are

- drive upgrades through shared components
- educate about semantic versioning
- pull out stories (like [the one from KLM](https://medium.com/airfrance-klm/how-we-upgraded-a-website-with-half-a-billion-annual-users-to-angular-7-in-less-then-a-day-71de33a1108e))

My personal note on the update story: try to keep up with it. As mentioned, `ng update` really helps with it. Staying up to date not only gives you the benefit of keeping up with the community, new libraries, performance improvements, security bugs etc. But also, it is much less costly than not upgrading and then upgrading over multiple versions which might get hard / impossible.

### Build Time

Improving the build time is crucial as it directly impacts developer productivity. As mentioned before, Ivy already comes with improvements not only in memory reduction but also better incremental build support. TypeScript also [recently announced support for better incremental builds](https://devblogs.microsoft.com/typescript/announcing-typescript-3-4-rc/), so you see the topic is :fire:.

Upgrading to Ivy will help already. In the long run Bazel will be the solution.

{{<figure url="/blog/assets/imgs/ngconf2019/ng-enterprise-bazel.png" size="full">}}

Bazel is build to scale and it's possible to opt-in with Ivy to use Bazel under the hood (read the details further up in the article).


### Share your problems & solutions

{{<figure url="/blog/assets/imgs/ngconf2019/ng-enterprise-share.png" size="full">}}

Absolutely!!! It's the main reason I'm [blogging](https://juristr.com/blog), [create courses on Egghead](https://egghead.io/instructors/juri-strumpflohner) and on [Youtube](https://www.youtube.com/user/kitodzt). Go out there and become an active community member.

Don't wanna set up your own blog or you simply don't have the time? Head over to [dev.to](https://dev.to), it's super simple and you're set up in minutes :smiley:.


## These are the Angular Tips You Are Looking For

_John Papa - [Youtube](https://youtu.be/2ZFgcTOcnUg)_

John Papa walks through the following sections:

{{<figure url="/blog/assets/imgs/ngconf2019/ng-papa-topics.png" size="full">}}

### RxJS - How to deal with unsubscribing

Check out my article on that:

{{<article-link 
   url="/blog/2018/10/videolesson-avoid-memory-leaks/" 
   title="Avoid memory leaks when subscribing to RxJS Observables in Angular Components" 
   text="" 
   imageurl="" 
>}}

In that article I mostly go into using what John calls the "takeUntil Strategy", basically using a "notification subject" that you fire in the `ngOnDestroy` of you component combined with the `takeUntil` operator (more in the linked article). The `takeUntil` can have some strange side effects if you don't place it as the last operator in your pipe (and there are exceptions to that as well).

John shows another way of doing this, using a `SubSink`. It's a [library developed by Ward Bell](https://www.npmjs.com/package/subsink) for easy unsubscribing.

```typescript
export class SomeComponent implements OnDestroy {
  private subs = new SubSink();

  ...

  this.subs.sink = observable$.subscribe(...); // easy syntax

  this.subs.add(observable$.subscribe(...)); // if you insist

  this.subs.add( // can add multiple subcriptions
    observable$.subscribe(...),
    anotherObservable$.subscribe(...)
  ); 

  ...

  // Unsubscribe when the component dies
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
```

### State Management

{{<figure url="/blog/assets/imgs/ngconf2019/ng-papa-state.png" size="full">}}

It is known that [NgRx](https://ngrx.io) comes with boilerplate. It has been discussed a lot, it's a known thing and it's also known that you might not even need NgRx, so choose wisely. John presents a project he and Ward Bell have been working on lately and which is now an official package of ngrx (starting with Ngrx v8): **[Ngrx Data](https://github.com/ngrx/platform/tree/master/modules/data)**.

Unlike other state management solutions, Ngrx Data does not replace Ngrx but rather extends it with the aim of dramatically reducing boilerplate for handling entity related CRUD operations. All you have to do is the following:

```typescript
@NgModule({
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    ...,dd
    NgrxDataModule.forRoot(entityConfig)
  ]
})
```

The `entityConfig` passed into the `NgrxDataModule` looks as follows:

```
const entityMetadata: EntityMetadataMap = {
  Hero: {},
  Villain: {},
  Customers: {},
  Products: {}
}
...
```

The remaining parts are **based on conventions**. These can of course also be overwritten:

```
const entityMetadata...

const pluralNames = { Hero: 'Heroes' };

export const entityConfig = {
  entityMetadata,
  pluralNames
}
```

## Tools For Fast Angular Applications

_Minko Gechev - [Youtube](https://youtu.be/5VlBaaXO6ok), [Slides](https://speakerdeck.com/mgechev/tools-for-fast-angular-applications)_

{{<figure url="/blog/assets/imgs/ngconf2019/minko-network-perf.png" size="full">}}

The idea is to generally ship less JavaScript (or just enough) and don't penalize the user with JavaScript code he'll never even execute (because those parts are hidden behind permission flags or whatever). Addy Osmani has published the [Cost of JavaScript](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4) where he shows how shipping the some amount of JavaScript costs much more than shipping the same amount of - say - images. This due to the parsing overhead.

### Strategies for reducing JavaScript load

The strategies for reducing the amount of JavaScript we ship is:

- Minification/dead code elimination
- Differential loading
- Code-splitting

Minification/dead code elimination is already in the current CLI. **Differential loading** (as described before) is landing in Angular v8.

{{<figure url="/blog/assets/imgs/ngconf2019/minko-differential-loading.png" size="full">}}

The CLI basically produces 2 bundles, one for modern evergreen browsers, and one for legacy browsers. In the HTML file then you'll have something like this:

```html
<html>
  <head></head>
  <body>
    <!-- modern browsers -->
    <script type="module" src="app-es2015.js"></script>

    <!-- old, legacy browsers -->
    <script nomodule src="app.es5.js"></script>
  </body>
</html>
```

The really nice thing here is that the browser on the client-side makes the decision which bundle to download. There's no magic required on the server side. So this **will work out of the box with every backend framework**.  
Differential loading can be configured by setting the `target` in the `tsconfig.json` to `es2015` and by setting the minimum supported browsers in the `browserlist` property.

Only ship what's really necessary with **lazy loading**.

{{<figure url="/blog/assets/imgs/ngconf2019/minko-lazy-loading.png" size="full">}}

There's usually a component level or route level code splitting. I've just written up a detailed article on that:

{{<article-link 
   url="/blog/2019/04/state-lazy-loading-components-angular/" 
   title="Lazy load Angular Components" 
   text="Or better..how to lazy load Angular Modules. Learn about the state of lazy loading and lazy loading on steroids with Angular Elements" 
   imageurl="" 
>}}

But when talking about lazy loading, one also needs to think about **prefetching strategies**.

{{<figure url="/blog/assets/imgs/ngconf2019/minko-prefetching.png" size="full">}}

In my [Egghead router course](https://egghead.io/courses/learn-angular-router-for-real-world-applications) I'm already showing how to [avoid delays for lazy modules by applying a preloading strategy](https://egghead.io/lessons/angular-avoid-delays-for-lazy-modules-by-applying-a-preloading-strategy-with-the-angular-router) which can be either the default `PreloadAllModules` or customized [by defining a custom preloading strategy](https://egghead.io/lessons/angular-define-a-custom-preloading-strategy-for-the-angular-router).  
Minko (as usual) brings this to a whole other level with libraries such as 

- [ngx-quicklink](https://github.com/mgechev/ngx-quicklink) which automatically prefetches links on the page
- or with [Guess.js](https://github.com/guess-js) which uses Google Analytics, applies machine learning to understand which links to prefetch

{{<figure url="/blog/assets/imgs/ngconf2019/minko-predictive-prefetching.png" size="full">}}

Also, not to forget about Angular CLI's [performance budgets](https://angular.io/guide/build#configure-size-budgets).

### Automated Deploy via CLI

Finally, some low hanging fruit. Turns out

- more than 27% do not apply content compression on static assets (SVG, images, JavaScript)
- more than 80% do not use CDNs to avoid latency

As Brad announced in his keynote, the Angular team is working on optimizing deployments by providing automated deployment mechanisms directly from the Angular CLI. This happens in close collaboration with the big cloud providers.

{{<figure url="/blog/assets/imgs/ngconf2019/minko-ng-deploy-clouds.png" size="full" caption="Collaboration with cloud providers for automated deployments">}}

See how that works [here in Minko's talk](https://youtu.be/5VlBaaXO6ok?t=991).

## Not Every App is a SPA

_Rob Wormald - [Youtube](https://www.youtube.com/watch?v=JX5GGu_7JKc)_

Rob targets the graph mentioned by Igor about the current field Angular apps are being adopted.

{{<figure url="/blog/assets/imgs/ngconf2019/rob-graph-angular-adoption.png" size="full">}}

Going forward the team's goal is to target the two missing edges in this graph.

### Small-medium Apps, Demos, Edu Apps

{{<figure url="/blog/assets/imgs/ngconf2019/rob-graph-small-apps.png" size="full">}}

To target this left side of the graph, where small to medium apps reside, the answer is definitely Angular Elements.

{{<figure url="/blog/assets/imgs/ngconf2019/rob-angular-elements.png" size="full">}}

If this sounds new to you, check out my related article.

{{<article-link 
   url="/blog/2019/04/intro-to-angular-elements/" 
   title="Introduction to Angular Elements" 
   text="Learn how to automatically convert your Angular Components to native Custom Elements" 
   imageurl="" 
>}}

Mixed environments are also a good example where Angular Elements fits in nicely:

- Lots of different frameworks
- Not everyone can start from greenfield
- Google has this problem too (Angular, AngularJS, Dart, GWT, Polymer,...)
- Mini-apps running on 3rd party sites
- NgUpgrade

In the context of Angular Elements, the registration process for bundling a single component as an Angular Element is currently (< Angular v7) still quite verbose:

```typescript
@NgModule({
  imports: [BrowserModule, CommonModule],
  declarations: [HelloWorld],
  entryComponents: [HelloWorld]
})
class HelloWorldModule {}
```

And then it needs to be registered as an Angular Element:

```typescript
platformBrowser()
  .bootstrapModule(HelloWorldModule)
  .then(({injector}) => {
    const HelloWorldElement = createCustomElement(HelloWorld, {injector});
    customElements.define('hello-world', HelloWorldElement);
  });
```

How is that going to change with Ivy?

{{<figure url="/blog/assets/imgs/ngconf2019/rob-elements-with-ivy.png" size="full">}}

The simplest way of rendering a component in Ivy is the following:

```typescript
import { Component, Input, Output, renderComponent } from '@angular/core';

@Component({
  selector: 'hello-world',
  template: `...`
})
class HelloWorld {
  @Input() name: string;
  @Output() nameChange = new EventEmitter();
  changeName = () => this.nameChange.emit(this.name);
}

renderComponent(HelloWorld);
```

So how can we make this an Angular Element in Ivy? Rob shows on stage how that will look like.

```typescript
import { renderComponent } from '@angular/core';
import { HelloWorld } from './hello-world.component';

// manually define the host rather than let Angular look for it
// then pass it as a 2nd argument to the renderComponent
const host = document.querySelector('hello-world');

renderComponent(HelloWorld, { host });

// create a custom element using the native browser API
class HelloWorldElement extends HTMLElement {}
```

This is the first step. Next, we can create a Custom Element using the native browser API and invoke the `renderComponent` from there.

```typescript
import { renderComponent } from '@angular/core';
import { HelloWorld } from './hello-world.component';

// create a custom element using the native browser API
class HelloWorldElement extends HTMLElement {
  component: HelloWorld;
  constructor()  {
    super();
    // associate "this" as the host element
    this.component = renderComponent(HelloWorld, { host: this })
  }
}
```

Note how we pass `this` (which is the Custom Element instance as the host to the render function). We can also add properties which we simply wrap.

```typescript
import { renderComponent, detectChanges } from '@angular/core';
import { HelloWorld } from './hello-world.component';

// create a custom element using the native browser API
class HelloWorldElement extends HTMLElement {
  component: HelloWorld;
  constructor()  {
    super();
    // associate "this" as the host element
    this.component = renderComponent(HelloWorld, { host: this })
  }

  set name(value) {
    this.component.name = value;
    detectChangs(this.component);
  }
  get name() {
    return this.component.name;
  }
}
```

`detectChanges` can just be imported from Angular. It's just a function :muscle: (no DI necessarily needed to inject the `ChangeDetectorRef` etc..)! 

To have attributes, we just continue using the native browser APIs.

```typescript
import { renderComponent, detectChanges } from '@angular/core';
import { HelloWorld } from './hello-world.component';

// create a custom element using the native browser API
class HelloWorldElement extends HTMLElement {
  static observedAttributes = ['name'];
  component: HelloWorld;
  constructor()  {
    super();
    // associate "this" as the host element
    this.component = renderComponent(HelloWorld, { host: this })
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    this.name = newValue;
  }

  set name(value) {...}
  get name() {...}
}
```

Now this just to show how easy it is to build it by yourself with Ivy. You don't have to do this every time. Most likely this will look like this with Ivy:

```typescript
import { withNgComponent } from '@angular/elements';
import { HelloWorld } from './hello-world.component';

// create a Custom Element that wraps the Angular Component
const HelloWorldElement = withNgComponent(HelloWorld);

// register it
customElements.define('hello-world', HelloWorldElement);
```

No platforms, no modules :tada: :tada: You can of course still use the Injector if you want:

```typescript
...
// create a Custom Element that wraps the Angular Component
const HelloWorldElement = withNgComponent(HelloWorld, {injector});
...
```

In many cases you already have an Angular Component that you want to turn into an Element. **But what if you don't want to have an Angular Component, but just an Angular Element?** :thinking: Basically you just want the benefit the Angular templating system gives you. The "problem" right now is that we have the `NgModule` which tells the compiler which dependencies are needed and helps it optimize the final outcome. Technically Ivy doesn't need a `NgModule`, but still, we need to have a way to tell the component what other directives/components live in its template. One **proposal** (<< this is an EARLY PROPOSAL the team wants feedback on) is to allow to register the dependencies directly in the `@Component` tag, very much like you already can with `providers` and what was already there in `Angular RC4` (yes I remember :sweat_smile:). Something like this:

```typescript
@Component({
  selector: 'hello-world',
  template: `...`,
  providers: [SomeService],
  deps: [SomeDirective, SomePipe]
})
class HelloWorld {}
```

This is definitely more verbose, but also more direct and "simpler" if you want. To achieve the final goal of just having an Ng Element (without an Angular Component) could look something like this (based on what we've discussed before):

```typescript
import { NgElement, withElement } from '@angular/elements';
...
@NgElement({
  selector: 'hello-world',
  template: `...`,
  providers: [SomeService],
  deps: [SomeDirective, SomePipe]
})
class HelloWorld extends withNgElement {}
```

This gives you **an Angular Element without an Angular Component**. Something that might make sense in some scenarios, like when building a design system.

### Scaling Up - or What is project "Angular Photon"?

To the other side of the chart: scaling up.

{{<figure url="/blog/assets/imgs/ngconf2019/rob-graph-angular-scaleup.png" size="full">}}

In this context (during the keynote - see further up), the name **Angular Photon" came up. Imporant:

{{<figure url="/blog/assets/imgs/ngconf2019/rob-photon.png" size="full">}}

It's a research project for experimenting and "deciding how to build the right tools for the next gen of Angular Developers". It's a project in collaboration with

- Google Shopping Express (build with Angular)
- Wiz

{{<figure url="/blog/assets/imgs/ngconf2019/rob-collaboration.png" size="full" caption="Google Shopping Express and Wiz collaborating with the Angular Team">}}

{{<figure url="/blog/assets/imgs/ngconf2019/rob-what-wanted.png" size="full">}}

Loading components as they are needed is a big part. As a sneak peek this is what it might look like

```typescript
import { withLazyNgComponent } from '@angular/elements';

// create a Custom Element that wraps the Angular Component
const HelloWorldElement = withLazyNgComponent(() => import('./hellow-world.component'));

// register it
customElements.define('hello-world', HelloWorldElement);
```

Note the `withLazyNgComponent` that fetches the necessary scripts only when really needed.


## CDK is the Coolest Thing You are Not Using (Yet)

_Jeremy Elbourn - [Youtube](https://youtu.be/4EXQKP-Sihw), [Slides](http://g.co/ng/conf19-components-slides)_

{{<figure url="/blog/assets/imgs/ngconf2019/cdk.png" size="full">}}

The CDK is the basis for [Angular Material](https://material.angular.io). It is a set of design agnostic components and functionality you can use to build your own design system on top of it.

{{<figure url="/blog/assets/imgs/ngconf2019/cdk-capabilities.png" size="full">}}

So far, the CDK as well as Angular Material lived under `angular/material2` on GitHub. That **name changed now to [angular/components](https://github.com/angular/components)**, which IMHO communicates much better that it is not just about Material Design.

{{<figure url="/blog/assets/imgs/ngconf2019/cdk-components-team.png" size="full" caption="New name of the former Angular Material team">}}

Jeremy showcases some of the CDK capabilities, in specific [Drag and Drop](https://material.angular.io/cdk/drag-drop/overview).

{{<figure url="/blog/assets/imgs/ngconf2019/cdk-new-material.png" size="full" caption="Open Source library produced by the Material Design team at Google">}}

Angular Material will include not only the CDK as basis going forward, but also strongly collaborate with the team developing the MDC web library.

{{<figure url="/blog/assets/imgs/ngconf2019/cdk-including-mdc-web.png" size="full">}}

This helps the Angular Material library to be much more aligned with the Material Design spec.

## Mastering the Subject: Communication options in RxJS

_Dan Wahlin - Youtube, [Slides](https://www.dropbox.com/s/sfqyjksou18b399/Mastering%20the%20Subject%20-%20Communication%20Options%20in%20RxJS.pdf?dl=0)_

When you need to communicate between different components that don't know each other, usually people tend to go straight into a full-blown state management library. But that's not always necessary: RxJS has some state management power as well. I actually wrote an article about that a while ago:

{{<article-link 
   url="/blog/2018/10/simple-state-management-with-scan/" 
   title="Simple State Management with RxJS’s scan operator" 
   text="Learn how you can build your own simple state management with just RxJS" 
   imageurl="" 
>}}

So given the following scenario of components nested within each other, how can the inner component communicate with some upper one?

{{<figure url="/blog/assets/imgs/ngconf2019/rxjscomm-communicate-with-upper-cmp.png" size="full">}}

Of course we can have a `@Output()` chain...which might soon go out of control. The alternative solution here are **RxJS Subjects**. There are 4 main `Subject` types in RxJS here.

{{<figure url="/blog/assets/imgs/ngconf2019/rxjscomm-subjects.png" size="full">}}

The `Subject` is the most simple one. A particular behavior here is that you only get the data after you subscribed. What happened before is not known.

The `BehaviorSubject` on the other side, keeps track of the previous values as well. So if a component B comes in later and subscribes, it will also get the last emitted piece of data and of course all future ones. I discussed some of this in my article (video included) on [RxJS first steps - Subject and ReplaySubject](/blog/2016/06/rxjs-1st-steps-subject/).

So what is the `ReplaySubject` :thinking:? Well the `ReplaySubject` is similar to the `BehaviorSubject` in that it replays the data that has been emitted also before a given component subscribes. While the `BehaviorSubject` only replays the last one, with `ReplaySubject` we can control how many of them we want to replay.

Finally, the `AsyncSubject` returns always the "freshest" value. You get the last value before the Subject completes.

### Communication Techniques: Event Bus

We can create something like an "Event Bus". You can picture that as a pipe of data at a commonly known place, where interested listeners can subscribe to.

```typescript
@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private subject$ = new Subject();

  emit(event: EmitEvent) {
    this.subject$.next(event);
  }

  on(event: Events, action: any): Subscription {
    return this.subject$.pipe(
      filter((e: EmitEvent) => e.name === event),
      map((e: EmitEvent) => e.value))
    ).subscribe(action)
  }

}
```

A component can now send data through that Event Bus as follows:

```typescript
export class CustomersListComponent {
  @Input() customers: Customer[];

  constructor(private eventbus: EventBusService) { }

  selectCustomer(cust: Customer) {
    this.eventbus.emit(new EmitEvent(Events.CustomerSelected, cust));
  }

}
```

Other components can register and listen to these events like:

```typescript
export class HeaderComponent implements OnInit, OnDestroy {
  customer: Customer;
  subsink = new SubSink();

  constructor(private eventBus: EventBusService) {}

  ngOnInit() {
    this.subsink.sink = this.eventBus.on(
      Events.CustomerSelected, 
      (cust => (this.customer = cust))
    );
  }

  ngOnDestroy() {
    this.subsink.unsubscribe();
  }
}
```

This technique is very loosely coupled, but if overused it can get messy as you have hundreds of events firing around and you have a hard time knowing where they come from.

### Communication Techniques: Observable Service

I personally use this pattern a lot. Here's an example:

```typescript
@Injectable({ 
  providedIn: 'root'
})
export class InventoryService {
  latestProduct: Product;

  // BehaviorSubject to not miss the last data if someone subscribes after
  // some data has "nexted" into this Subject
  private inventorySubject$ = new BehaviorSubject<Product>(this.latestProduct);

  // only expose the Observable, otherwise others could also emit new data
  // which is not what we want. Should only allow for listening
  inventoryChanged$ = this.inventorySubject$.asObservable();

  addToInventory(product: Product) {
    this.latestProduct = product;
    this.inventorySubject$.next(product);
  }
}
```

Subscribing from a component is super simple.

```typescript
export class InventoryComponent implements OnInit, OnDestroy {
  private subsink = new SubSink();
  @Input() products: Products[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.subsink.sink = 
      this.inventoryService.inventoryChanged$
        .subscribe(prod => this.products.push(prod));
  }

  ngOnDestroy() {
    this.subsink.unsubscribe();
  }
}
```

If you want a simple store, you can [read my article on how to implement that by yourself using the `scan` operator](/blog/2018/10/simple-state-management-with-scan/) or just head over to Dan's [ObservableStore library](https://github.com/DanWahlin/Observable-Store).

{{<figure url="/blog/assets/imgs/ngconf2019/rxjscomm-observable-store.png" size="full">}}

## Bazel Opt-in Preview is Here!

_Alex Eagle - [Youtube](https://www.youtube.com/watch?v=J1lnp-nU4wM)_

Bazel is something I'm most excited about :heart_eyes:!

{{<figure url="/blog/assets/imgs/ngconf2019/bazel-slow.png" size="full">}}

This diagram from Alex is super easy to clarify some confusion in people's mind. What's a build tool after all? No, it does not replace your Jenkins :wink:.

{{<figure url="/blog/assets/imgs/ngconf2019/bazel-build-tools.png" size="full">}}

Bazel simply orchestrates the different tools, so they don't have to be rewritten for Bazel as they have with some other tools like Webpack etc. Bazel simply invokes other tools like Rollup, the TypeScript compiler, a dev server,...

{{<figure url="/blog/assets/imgs/ngconf2019/bazel-difference-bazel.png" size="full">}}

Bazel is designed to

- be incremental
- allow full-stack build and test
- scales with the cloud easily
- extensible

Bazel is the part where Google does not consume something from the OSS world, but rather contributes something back. Bazel comes out of Google's internal Blaze tool that powers its huge monorepo.

So what's the current progress with Bazel?

{{<figure url="/blog/assets/imgs/ngconf2019/bazel-current-state.png" size="full">}}

With that, similar to Ivy (as mentioned before), Bazel is now available for opt-in preview starting with Angular v8.

{{<figure url="/blog/assets/imgs/ngconf2019/bazel-opt-in.png" size="full">}}

How does Bazel fit into the Angular CLI? It extends an Angular CLI Builder (a new feature I've mentioned further up in the article). Right now the CLI uses the `@angular-devkit/build-angular` package (go check your `angular.json` and you'll see :wink:). Bazel is simply another builder that can live side-by-side and can be activated by you to opt-in.

{{<figure url="/blog/assets/imgs/ngconf2019/bazel-builder.png" size="full">}}

That said, the priority #1 of course is to not break your app and provide stability. In a small app, opting in to Bazel won't bring any difference (no good, nor bad). You will only see improvements in the build/test speed starting from medium size apps.

Right now many of the current build tools are monolithic. Bazel on the other side follows the Unix philosophy, piping results from one tool into another.

{{<figure url="/blog/assets/imgs/ngconf2019/bazel-unix-philosophy.png" size="full">}}

**How can you try that today?** First, update to Angular 8. Then

```
// update to Angular 8
$ ng update --next @angular/cli @angular/core

// create a new app
$ ng new --collection=@angular/bazel

// existing app
$ ng add @angular/bazel
```

What to expect: the same behavior as before, same sources, similar outputs. To scale up...

{{<figure url="/blog/assets/imgs/ngconf2019/bazel-scaling-up.png" size="full">}}

Some results with 1000+ components:

{{<figure url="/blog/assets/imgs/ngconf2019/bazel-results.png" size="full">}}

This is already faster, but it only shards among the local available CPUs. This can be further scaled by **sharing build caches between you and the CI and even co-workers**. Meaning if your CI system (or one of your team mates) already built a given portion of the app, you won't have to do that again, but you'll just get the cache.

{{<figure url="/blog/assets/imgs/ngconf2019/bazel-share-cache.png" size="full">}}

With that, results get even better. This runs on the Remote Build Execution which is a "Bazel backend service" on the Google Cloud.

{{<figure url="/blog/assets/imgs/ngconf2019/bazel-results-cloud-share.png" size="full">}}

Here's the future timeline for Bazel. Focus is mainly on making some of the still manual steps fully automated.

{{<figure url="/blog/assets/imgs/ngconf2019/bazel-future-plan.png" size="full">}}

All the info on [bazel.angular.io](https://bazel.angular.io).


## Angular Elements Everywhere

Angular Elements have been around in a couple of talks at NGConf 2019.

{{<figure url="/blog/assets/imgs/ngconf2019/ng-elements.png" size="full">}}

- [Web Components wth Angular Elements: Beyond the Basics - Manfred Steyer](https://www.youtube.com/watch?v=E9i3YBFxSSE)
- [Angular Elements Make The Best React Components - Brad Mcalister & Ryan Chenkie](https://www.youtube.com/watch?v=tHclHHs7nmo)
- [Not Every App is a SPA - Rob Wormald](https://www.youtube.com/watch?v=JX5GGu_7JKc)
- [A Deep Look at Angular Elements - Manfred Steyer](https://youtu.be/_QU0mpyF7bQ)

If you wanna learn more, I have an introductory article and Egghead video on the topic:

{{<article-link 
   url="/blog/2019/04/intro-to-angular-elements/" 
   title="Introduction to Angular Elements" 
   text="Learn how to automatically convert your Angular Components to native Custom Elements" 
   imageurl="" 
>}}

## Before NgRx: Superpowers with RxJS + Facades

_Thomas Burleson - [Youtube](https://www.youtube.com/watch?v=h-F5uYM69a4), [Slides](http://bit.ly/2VgrxCX)_

I'm particularly interested in software architecture, in all fields, backend as well as frontend. And as the frontend grows and grows in terms of logic it includes, thinking about architecture is indispensable. Thomas talks about how to implement a **push-based** (rather than pull-based) approach with Angular and RxJS.

Traditionally there is a pull-based approach:

```typescript
const users$ = this.http.get<Users[]>(url);
```

This is a temporary stream that terminates once the data has arrived from the API. A different way of thinking would be to implement a pull-based service, such as:

```typescript
const users$ = this.state$.pipe(map(state => state.users));
```

This is a long-lived stream that might be updated over time. This is definitely a **reactive approach** of implementing your architecture. Furthermore, Thomas hides the implementation logic behind "Facades" which are a software development pattern for abstracting and hiding implementation details. For example:

```typescript
// synchronous
const pagination$ = userFacade.pagination$
const criteria$ = userFacade.updateCriteria(searchCriteria);

// async
const users$ = userFacade.users$;
const results$ = userFacade.search(criteria);
```

As you can see the Facade hides the implementation details. Also note, you cannot distinguish whether the stream is async or synchronous, which ultimately shouldn't even matter.


### Pull-based

In the talk, Thomas walks through a concrete example of implementing such pull-based approach.

{{<figure url="/blog/assets/imgs/ngconf2019/facades-pull-push.png" size="full">}}

So generally speaking, all of the state & logic should be kept out of the view as much as possible. That allows for better reusability and results in easier testing. So let's focus on the service part. Here's an example of a _pull-based_ service:

```typescript
@Injectable()
export class UserService {
  users: User[] = [];
  criteria: string = 'ngDominican';
  pagination: Pagination = {
    selectedSize: 5,
    currentPage: 0,
    pageSizes: [5, 10, 20, 50]
  };

  constructor(private http: HttpClient) {}

  findAllUsers(): Observable<User[]> {
    const url = buildUserUrl(this.criteria, this.pagination);
    const request$ = this.http.get<RandomUserResponse>(url)
      .pipe(
        map(response => response.results),
        tap(list => this.users = list)
      );

    return requests$
  }
}
```

Once the `findAllUsers()` is called, the stream is returned and terminated (because that's the nature of the streams returned from HTTP). Here's the Stackblitz for the example:

{{<stackblitz uid="edit/facade-traditional-no-rxjs-4jdfwq" >}}

### Push-based

A push-based approach would look more like this.

{{<figure url="/blog/assets/imgs/ngconf2019/facades-push-based.png" size="full">}}

What I find particularly intersting when I first heard about Thomas's approach of Facades and push-based a while back, is to have streams not only go out of your service (as you usally have), but also to go into the service (i.e. via method calls for instance).

{{<figure url="/blog/assets/imgs/ngconf2019/facades-stream-in-out.png" size="full">}}

This makes up a very clear API of the Facade:

```typescript
@Injectable()
export class UserFacade {
  criteria$: Observable<string>;
  pagination$: Observable<Pagination>;
  users$: Observable<User[]>;

  constructor(private http: HttpClient){}

  updateSearchCriteria(criteria: string){}
  updatePagination(selectedSize: number, currentPage: number = 0) {}
}
```

Furthermore, state is managed with a simple `BehaviorSubject`. You can look up my article on [Simple State Management with RxJS's scan operator](/blog/2018/10/simple-state-management-with-scan/).

```typescript
export interface UserState {
  users: User[];
  pagination: Pagination;
  criteria: string;
}

let _state: UserState = {
  users: [],
  criteria: 'ngDominican',
  pagination: {
    currentPage: 0,
    selectedSize: 5,
    pageSizes: [5, 10, 20, 50]
  }
}

@Injectable()
export class UserFacade {
  private store = new BehaviorSubject<UserState>(_state);
  private state$ = this.store.asObservable();
}
```

Moreover the `BehaviorSubject` makes sure the latest value is kept and emitted whenever someone new subscribes. At startup the default state should be emitted, which is why `_state` is passed when instantiating the `BehaviorSubject`.  
Since streams come into the service as well as go outwards, they can also be consumed and combined nternally to the UserFacade. That is, we can subscribe to the `criteria$` and `pagination$` and whenever either of the two changes, the backend can be invoked automatically and streamed back into the `findAllUsers$` stream. That's push-based at work :smiley:

{{<figure url="/blog/assets/imgs/ngconf2019/facades-stream-consuming.png" size="full">}}

How is this implemented? Something like this:

```typescript
@Injectable()
export class UserFacade {
  private store = new BehaviorSubject<UserState>(_state);
  private state$ = this.store.asObservable();

  users$ = this.state$.pipe(map(state => state.users), distinctUntilChanged());
  criteria$ = this.state$.pipe(map(state => state.criteria), distinctUntilChanged());
  pagination$ = this.state$.pipe(map(state => state.pagination), distinctUntilChanged());

  /**
   * Watch 2 streams to trigger user loads and state updates
   */
  constructor(private http: HttpClient) {
    combineLatest(this.criteria$, this.pagination$).pipe(
      switchMap(([criteria, pagination]) => {
        return this.findAllUsers(criteria, pagination);
      })
    ).subscribe(users => {
      this.updateState({ ..._state, users,  loading: false });
    });
  }

  // ------- Public Methods ------------------------

  updateSearchCriteria(criteria: string) {
    this.updateState({ ..._state, criteria, loading: true });
  }

  updatePagination(selectedSize: number, currentPage: number = 0) {
    const pagination = { ..._state.pagination, currentPage, selectedSize };
    this.updateState({ ..._state, pagination, loading: true });
  }
  ...
}
```

I've already implemented such an approach and the cool thing about it is that once you've set up the streams and connected them together, you click the button, which triggers an emit into - say - the `pagination$` stream and you will automatically get a call triggered to the server and your list be updated with fresh data :heart_eyes:.  
In a traditional pull-based approach, you would click the button, in the click handler, invoke a function on your service passing the new pagination value, get back a stream and re-bind it to your list. Moreover, think about what this opens up for you. If your server is able to handle websockets or server sent events, you can actively even push down new data as other users change them.

{{<stackblitz uid="edit/facades-with-rxjs-only-d82xvx" >}}

## Useful links

- [Collection of Slides by Sam Julien](https://github.com/samjulien/ngconf2019-slides)

---

_More coming soon...check [my Twitter account to get notified](https://twitter.com/juristr)_

