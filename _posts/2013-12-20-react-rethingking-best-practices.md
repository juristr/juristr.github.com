---
layout: post
title: "JSConf.eu - React: Rethinking best practices"
description: ""
postimg: "/blog/assets/imgs/reactjs.png"
show_img_in_detail: true
coverimage: true
tags: ["JavaScript"]
---

Today I saw a tweet pointing to a JSConf talk by Pete Hunt from Facebook, talking about [ReactJS](http://reactjs.org), Facebook's JavaScript frontend framework. Here are my notes.

<iframe width="620" height="415" src="//www.youtube.com/embed/x7cQ3mrcKaY" frameborder="0" allowfullscreen="allowfullscreen"> </iframe>

---

I like the idea as it focuses on concepts which I consider extremely important: **modularity and simplicity** as both build the foundation of a more clean and maintainable application architecture.

When you create rich JavaScript apps, you should pay particular attention to its **maintainability**, which is where automated unit tests come into place which in turn requires you to create potentially small, atomic and loosely coupled components or widgets. That's why many JS frameworks try to address it (take [AuraJS](http://aurajs.com/about/), [MarionetteJS](http://marionettejs.com/),..). 

Personally I currently use JavaScriptMVC or CanJS which both have the idea of creating widget/components build-in and [promoted by their creators](/blog/2013/04/modularity-in-javascript-frameworks/).

Having said that, ReactJS looks interesting and I guess I'll give it a try, maybe code the [TodoMVC](http://todomvc.com/labs/architecture-examples/react/) example to get a feeling for it.

## My talk notes

- it's about _building components_
- render UI -> respond to events
- more like the **V** in MVC
- doesn't care about how data is fetched, processed etc..focuses on the real presentation logic

### Building components

- reusable components, "reduce coupling, increase cohesion"
- "Templates encourage a poor separation of concerns" (i.e. Angular)
- Problem: (view)model binds controller to template; if you need to change the view, you also need to update your controller (most probably)
- "Templates separate technologies, not concerns"
- "view partials" are evil (dependency and maintainability hell)
- "keep components small" -> easier to unit test, less complexity, less spaghetti code

### Fast

- Re-render entire app on every change
- easy 'cause you simply refresh (like server-side rendering approaches)
- based on virtual DOM and event system
  - create new virtual DOM
  - diff it with old one
  - batch update diffs
- can execute on Node
- same code, client & server; React can directly take and boot upon markup returned from the server.
 
### Key takeaways

- build components, not templates
- re-render, not mutate
- Virtual DOM

## Links

- [ReactJS Homepage](http://facebook.github.io/react/)
