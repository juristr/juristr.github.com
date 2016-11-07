---
layout: post_new
title: "Configure a proxy for your API calls with Angular CLI"
lead: "Learn how to configure the Angular CLI to proxy API calls to your backend"
postimg: "/blog/assets/imgs/webpack_proxy_config.png"
tags: [ "JavaScript", "Angular"]
---

<div class="article-intro">
    In this video we will learn and demonstrate how to configure the Angular CLI to proxy your API calls to your backend server.
</div>

{% include postads %}

During development, you often end up in the situation where you have your backend API server running at one address (i.e. `localhost:3000`) while your frontend development server runs on another (i.e. `localhost:4200`). However, in your Angular 2 services that query the backend API, you don't obviously want to hard-code the developement server's host, but instead write your calls as follows:

```javascript
this.http.get('/api/v1/people')
    .map(res => res.json());
```

Clearly, this won't probably work out of the box, because the Angular CLI development server doesn't answer at `/api/v1/people` with an API. This is why you need to have some kind of **proxy** that intercepts such calls and proxies them to your correct backend server API. Let's learn how to setup such proxy with the Angular CLI.

<iframe width="853" height="480" src="https://www.youtube.com/embed/OjmZPPKaj6A" frameborder="0" allowfullscreen="allowfullscreen"> </iframe>

---

You didn't yet have the chance to create an Angular 2 application, but you're eager to learn it? Watch my introductory video which learns you how to build your first Angular 2 application using the Angular CLI in under one hour. 

{% include article-link.html
    url="/blog/2016/10/lets-create-ur-first-ng2-app/"
    title="Let's create your first Angular 2 app"
    text="It's time to get started. In this video I will help you create your first Angular 2 app"
    imageurl="http://www.gravatar.com/avatar/64537dfe80f44978663e378d375c7138?s=150&d=identicon&r=PG"
%}