---
layout: post_new
title: "Angular from Development to Production"
lead: "..."
postimg: "/blog/assets/imgs/web-meets-mobile.png"
tags: [ "Angular", "mobile"]
---

<div class="article-intro">
	Some time ago I published an article on <a href="/blog/2016/11/configure-proxy-api-angular-cli/">how to configure a proxy on the Angular CLI integrated development</a> server. Apparently there is some confusion many people have, as I continue to get questions on how to use this proxy in production, how to use the CLI server there and in general, how to deploy an Angular app with an existing backend. So let's take a look at the whole deployment story with Angular.
</div>

{% include postads %}

{% assign message = "Contents are based on Angular version >=2" %}
{% include warn-notice.html %}

First thing right away: the integrated Angular CLI server is **NOT MEANT FOR PRODUCTION**. Sorry for the shouting :wink:, but this needs to be clear. In other words, `ng serve` is **just for development purposes**.

## Creating a new project

When you need to start a new Angular project, the best option you have is to use the [official Angular CLI](https://cli.angular.io). It is your companion throughout the whole development cycle, covering..

- generating a new project scaffold
- generating Angular modules, components, services, pipes,.. during development
- serving your application in development with an integrated development server with live browser synchronization
- building your application including AoT compilation
- creating test configurations for automated unit as well as end-to-end level tests

As a nice side effect of letting the CLI scaffold your application, you stay compliant with [the official Angular StyleGuide](https://angular.io/styleguide).

## Developing Angular apps

During development, we can simply open the the generated application folder with our favorite IDE (i.e. [VSCode](https://code.visualstudio.com/); hint: also try the [insider build](https://code.visualstudio.com/insiders)) and start coding. You can use the [CLI generators](https://github.com/angular/angular-cli/wiki/generate) to create new modules, components etc. 

To run our app we execute `ng serve` or `npm start` (which maps on the prior command). The CLI will spin up the integrated webpack development server, which serves the app at `localhost:4200`.

<figure>
    <img src="/blog/assets/imgs/ng-dev-to-prod/cliapp.png" />
    <figcaption>What you see at first, launching a new CLI generated app</figcaption>
</figure>

We can now iterate, generate new components, modules etc. There's no need to stop the webserver behind the scenes as it monitors the file system and recompiles new TypeScript files added to our project and also refreshes the browser.

> If you wonder where the compiled files are on disk...there are none. The integrated webpack development server compiles and serves the files in memory.

## What about the API?

Great, so far so good. But what about the API? Normally you don't just have your frontend part, but also a backend server which serves the data through some JSON Http API.

<figure>
    <img src="/blog/assets/imgs/ng-dev-to-prod/nodeapi.png" />
    <figcaption>Our JSON api answering with a list of people</figcaption>
</figure>

As you can see from the image, our application is served by the development server at `localhost:4200` while the API is served over `localhost:3000`. So whenever we want to call our API from within our Angular services we'd have to use the full path to our backend API:

```javascript
this.http
    .get('http://localhost:3000/api/v1/people')
    .map(res => res.json());
```

Similarly we'd have to adapt this based on the environment where our app currently runs. Also, whenever we call **another domain** we're making a **Cross Origin Request** also denoted as **CORS (Cross Origin Resource Sharing)**. As a consequence your backend API has to answer with the proper "CORS Headers" to have this work. This is for security reasons. 

<figure>
    <img src="/blog/assets/imgs/ng-dev-to-prod/dev-cors.png" />
    <figcaption>CORS scenario without a proxy</figcaption>
</figure>


While this is perfectly fine if you're consuming 3rd party APIs, normally you don't want to do this for your own app. Rather what you'd like to have is something like this:

```javascript
this.http
    .get('/api/v1/people')
    .map(res => res.json());
```

In order to make this work, both, our Angular app as well as our backend API have to be delivered from the exact same host. We could compile our app and serve it from our API server (running on `localhost:3000`), but we definitely don't want to relinquish  the commodity of the live browser refresh and auto-compilation which is provided by the integrated CLI server.

The solution **is to use a proxy**. The proxy takes a configuration which allows to map a given request to another URL, which is exactly what we need. We want to make a call to `/api/v1/people` from our Angular app, which would then finish at `localhost:4200` (from where our app is served), which in turn should translate it to a call to `http://localhost:3000/api/v1/people` where our backend server runs. 

<figure>
    <img src="/blog/assets/imgs/ng-dev-to-prod/dev-proxy.png" />
    <figcaption>Development proxy which pipes http request through to the local backend server with the API</figcaption>
</figure>

The [webpack dev server](https://webpack.js.org/configuration/dev-server/#devserver-proxy) allows to configure such a proxy and so does the Angular CLI. This video explains how to configure the proxy for your Angular CLI:

{% assign youtube_id = "OjmZPPKaj6A" %}
{% include youtube.html %}

## Deploying

**frontend**

- create production bundle using `ng build --prod` which does minification, bundling, code splitting as well as AOT compilation
- our `dist` folder now contains everything that needs to be deployed

**backend api server**

- depends mostly on what kind of backend we use
- NodeJS:
    - we can directly deploy our server (or eventually compile it if you wrote it in TypeScript)

Different options...

**Deploy your app INTO the backend server**

- easy setup, just one server
- `index.html` is usually loaded by default when the root of the server is hit
- consequently the local scripts will be loaded which will then fire requests to `/api` which would work just fine

**Use a proxy in production as well:**

- use Apache/nginx to deploy your static files which are directly served and forward calls to `/api/` to the API server
- this is really good for performance reasons, static files can be served quickly and the we can easily scale horizontally our backend nodes

<figure>
    <img src="/blog/assets/imgs/ng-dev-to-prod/production-proxy.png" />
    <figcaption>Frontend proxy delivering static files (Angular app), forwarding API requests to a set of machines serving the API</figcaption>
</figure>



---




{% include article-link.html
    url="https://egghead.io/courses/create-native-mobile-apps-with-nativescript-for-angular"
    title="Create Native Mobile Apps with NativeScript for Angular"
    text="In this course, we will learn how to work with NativeScript for Angular."
    imageurl="https://d2eip9sf3oo6c2.cloudfront.net/series/covers/000/000/084/full/EGH_AngularNativeScript_Final-cover.png?1481827806"
%}

