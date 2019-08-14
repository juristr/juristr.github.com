---
type: post
title: "It’s time to say thank you to the Angular CLI Team!"
lead: "Sometimes it's necessary to hold on and simply say thank you"
date: 2019-08-13T11:37:24+02:00
comments: true
url: /blog/2019/08/thank-you-angular-cli-team
image: /blog/assets/imgs/cli-thanks-background.jpg
categories:
  - Angular
tags:
  - angular
  - tooling
  - javascript
draft: false
---

{{<intro>}}
  Nowadays, you can **create**, and **run a new Angular project** in minutes (!! 🔥). It really just depends how fast your internet is to download all the `node_modules`. This wasn’t always the case in the Angular community but many forgot about it! 
{{</intro>}}
<!--more-->

{{< postad >}}

Back in the days (and now I definitely start feeling old), we talked about **JavaScript fatigue**. I seem to hear that much less recently. Most of that fatigue was **centered around tooling**. When going to setup a new JS based project, you were searching around for good starters, for hours. Once you got one, you started customizing it to your needs. I remember to navigate through endless [GruntJS](https://gruntjs.com) scripts, later [GulpJS](https://gulpjs.com) then [Webpack](https://webpack.js.org). 

Setting up a project to just get started took hours if not days. Configuring JS code compilation, CSS compilation (maybe Sass), hook in the test runner with Karma etc…and with that it wasn’t done. Most likely you continued to tweak the config over time as the project progresses. And most likely only you or one of your team mates knew what was going on, and all others were scared to touch the config.

When I first heard the Angular team talking about a CLI, I was like 🎉🎉🎉. I knew it was going to make life so much easier. The problem is, once you have it, you forget about how difficult it was before…and newcomers don’t even know how much is going on behind the scenes. 

I think it is time to sometimes stop and simply say: **thank you!**

{{<toc>}}

## Thank you for letting me generate a new project in minutes ⚡️

You really just [need to have the basic JavaScript tooling](/blog/2019/04/setup-for-angular-dev/) installed on your machine and type

```
$ npx @angular/cli new my-first-app
```

What you’ll get is a fully configured Angular app, following the latest best practices!! It is also automatically configured and setup to build, run, test and deploy your app.

## Thank you for the development server 👨‍💻👩‍💻

*Docs: https://angular.io/cli/serve*

You just run

```
$ npm start
```

which will internally call

```
$ ng serve
```

…and your project will be served on `http://localhost:4200` (by default, and this is customizable as well). Your TS code will be compiled on the fly (incrementally!), It will also **automatically compile Sass** code etc and the CLI monitors your file system, recompiles and **re-serves automatically on each change**.

Also, need to use `https` on localhost? Just use the `--ssl` flag and you’re good to go. Behind the scenes, local temporary certificates are being generated and all set up for you.

Your backend is running on localhost as well, on a different port? You probably want to **use a proxy** then when running your Angular development server. No problem:

{{<article-link 
   url="/blog/2016/11/configure-proxy-api-angular-cli/" 
   title="Configure a proxy for your API calls with Angular CLI" 
   text="" 
   imageurl="" 
>}}

{{<youtube OjmZPPKaj6A >}}

## Thank you for helping me scaffold new code 👷‍♀️👷‍♂️

*Docs: https://angular.io/cli/generate*

When you need to create new components, services, directives, modules,…whatever, there’s a [generate command](https://angular.io/cli/generate) for that. Just..

```
$ ng g c people/people-list
```

...and you'll get a new `PeopleListComponent` generated and registered on the `NgModule` for you. Or write..

```
$ ng g m people --route --m app.module.ts
```

..and you’ll get a new Angular module, hooked up with lazy loading wrt. the `app.module.ts`

## Thank you for making it so easy to run tests ✅

*Docs: https://angular.io/cli/test*

Whenever you generate a new app, tests are automatically preconfigured as well. Jasmine spec files will be generated for your components, services etc. and you just need to run

```
$ npm test
```

which internally invokes `ng test` to spin up [Karma](https://karma-runner.github.io/latest/index.html) that’ll execute all of your test files and report it back to the terminal. Hooking this up with some build CI system is really easy. _(Note, you by default the CLI adds Karma & Jasmine tests. But you can also use Jest if you want. Just quickly google for it)_

## Thank you for making lazy loading a breeze 😴

Generate a new lazy loaded module, or write a path using the `import` statement, like

```javascript
const routes = [
  {
      path: 'people',
      loadChildren: () => import('./people/people.module').then(m => m.PeopleModule)
  }
];
```

..and the CLI will automatically recognize you’re trying to lazy load the `PeopleModule`. As a result it is going to bundle all its code into a separate JS file which can then be fetched lazily over at runtime. Just check out [my article on lazy loading in Angular](/blog/2019/04/state-lazy-loading-components-angular/).

{{<article-link 
   url="/blog/2019/04/state-lazy-loading-components-angular/" 
   title="Lazy load Angular Components" 
   text="" 
   imageurl="" 
>}}

**Lazy load a route with the Angular router**
{{<egghead-lesson uid="lessons/angular-lazy-load-a-route-with-the-angular-router" >}}

## Thank you for making building so easy 🏗

*Doc: https://angular.io/cli/build*

Each project comes with a so-called “builder” preconfigured. That said, you just need to invoke

```
$ ng build --prod
```

and the CLI will automatically build your project, ready to be deployed. That includes

- Angular specific compilation (AoT, ...)
- minification of your JS code
- (compilation of your Sass code if you chose to use Sass)
- minification of your CSS
- ...


## Thank you for automated upgrading 🚀

*Docs: https://angular.io/cli/update*

Can you imagine an evergreen framework? Like the same concept as with Chrome, where you don’t have to worry about upgrades, you’ll just get them automatically behind the scenes. We’re not fully there yet, but that’s the ultimate philosophy behind the `ng update` command.

Change is inevitable, so you better embrace it. The Angular team decided to have a very well defined schedule, of ~6 month breaking (but easily upgradeable) releases, features in between and patches as well. And that “easily upgradable” is the key. The Angular CLI has a `ng update` command that allows to apply automated code migration commands to upgrade your codebase to the new version, automatically fixing potential breaking changes in the API. Neat isn’t it. It’s like the upgrade scripts you may write for your database.

Check out [https://update.angular.io](https://update.angular.io/) or my [recent blog post about it](/blog/2019/06/angular-v8/).

## Thank you for making me aware of performance issues 🚀

_Docs: https://angular.io/guide/build#configure-size-budgets_

By configuring size budgets the CLI will let you know when you're over the specified treshold. Just go to your project's `angular.json` and specify the corresponding budgets you'd like to measure, for instance

```
{
  ...
  "projects": {
    "ngperf": {
      "projectType": "application",
      ...
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          ...
          "configurations": {
            "production": {
              ...
              "budgets": [
                {
                  "type": "bundle",
                  "name": "main",
                  "maximumWarning": "350kb",
                  "maximumError": "500kb"
                }
              ]
            }
          }
        },
        ...
      }
    }
  }
}
```

{{<figure url="/blog/assets/imgs/performance-budgets.png" size="full">}}

## Thank you for allowing me to add PWA support with the blink of an eye 👀

_Docs: https://angular.io/guide/service-worker-getting-started_

You may not even aim for a fully featured PWA (Progressive Web App), with push notifications and being installable and what not. But one feature is for sure pure gold: **adding a service worker for client-side caching of resources**. Now, the service worker API isn't super difficult, but it has its pitfalls and things you need to be aware of. Instead of going to use the native SW APIs you could also take a more high-level tool like [workbox](https://developers.google.com/web/tools/workbox/). I've used that in combination with Angular projects and it works like charm.

But even easier is to use the Angular built-in PWA support, by installing

```
$ ng add @angular/pwa --project *project-name*
```

With that, your project will be setup with a service worker and you can control its features via the `ngsw-config.json` as [described here](https://angular.io/guide/service-worker-config). The cool thing about this is that Angular will take care of the proper configuration of the SW based on your config. That helps you avoid certain traps. And if you should still fall into one, there are even [fail-safe mechanisms built-in](https://angular.io/guide/service-worker-devops#fail-safe).  

## Thank you for making it extensible 🔝

_Docs: https://angular.io/guide/cli-builder_

But what if you need more customization? Behind the scenes, the Angular CLI uses Webpack to run the build and serve the project. That configuration is abstracted and hidden away. That’s the whole point of having the CLI and taking away complexity. For a while there was an “eject command” which would reveal the configuration. But from that point on you were on your own.

With the latest changes in v8, the so-called architect API has stabilized and opened up via what is called [**CLI Builders**](https://angular.io/guide/cli-builder). That allows you to customize the linting, building and testing process and hook in your custom steps. Another way is to use [ngx-build-plus](https://github.com/manfredsteyer/ngx-build-plus) to hook into the compilation process.

{{<article-link 
   url="https://blog.angular.io/introducing-cli-builders-d012d4489f1b" 
   title="Introducing CLI Builders" 
   text="" 
   imageurl="" 
>}}

## Thank you for making deploying so easy 🚀

Deployment is already easy as we’ve heard before. By just running `ng build`, our codebase is compiled, compressed and copied to a `dist` folder, which we can then deploy on our destination server. A new API that’s about to land, will even automate the deployment to various cloud providers (like Firebase, Azure,…) in a single command. And of course you can provide and write your own deploy commands as well.


## Thank you for automatically optimizing my build for the browsers

With the latest update to v8 of the Angular CLI, the **differential loading** feature landed. What it does is basically create two different bundles of the Angular app during the production compilation process. The script tags that get embedded as follows:

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

This is a change that optimizes my app without me changing literally anything. All that's needed is just upgrading to v8.

{{<article-link 
   url="/blog/2019/05/Angular-8-and-the-Future-NGConf-2019-Roundup/#differential-loading" 
   title="Angular 8 and the Future - NGConf 2019 Roundup" 
   text="" 
   imageurl="" 
>}}

## Thank you for what’s coming next!! 🔥

There's a lot still coming. For instance [Bazel](https://bazel.angular.io) is around the corner. Shortly, it’s Google’s internal build orchestration system called Blaze, open sourced now as [Bazel](https://bazel.build). It is made for huge codebases and scaling in mind and not tight to any specific technology. Google builds its entire monorepo with it, containing JS code, Java, C++, Go,… The Angular CLI team is currently working on integrating Bazel with the Angular CLI and thus making it available to all of us. How that will probably look like? The goal is to have a simple “switch” which allows you to toggle on Bazel and you instantly get all its benefits, without the burden of having to learn and configure it.

{{<youtube J1lnp-nU4wM >}}

## Thank you for...

...all the things I don't even know are being handled behind the scenes for me. Suggestion: be curious and take the time to go have a look at your `angular.json` file from now and then and experiment with the various options. Or go to the [CLI docs](https://angular.io/cli) and check out new commands and flags which may make your life so much easier. There's much more to explore than you would think of.

## That said...

...**thank you Angular CLI team :heart:**, for doing the heavy lifting and letting Angular devs focus on building business relevant functionality.

