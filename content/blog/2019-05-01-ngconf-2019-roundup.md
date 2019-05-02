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


Note, _I'll update this blog post as the conf is progressing with more stuff, so don't forget to check back_  
_Last update: 1st May 2019 9pm GMT+2 - check my [Twitter stream for more](https://twitter.com/juristr)_

> Note: images here are copyright of the respective presenters at ngconf 2019. These are simple screenhots from the online live stream


---

{{< toc >}}

## Keynote (day 1)

_Brad Green & Igor Minar_

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

This allows to save ~7-20% of the current bundle size.

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