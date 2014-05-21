---
layout: post
title: "Coding with Angular.js"
show_img_in_detail: false
coverimage: false
tags: ["JavaScript"]
---

This article is built incrementally by processing, internalizing and documenting all the stuff I encounter while learning Angular.js. So keep an eye on it.


## The `track by` clause

Normally when you want to iterate over some data you simply use a `ng-repeat` like

```html
<div ng-repeat="task in tasks">
    ...
</div>
```

That's fine. Angular has to keep track though which object is bound on which DOM node. For his reason it automatically injects a `$$hashKey` into your object.

<figure>
    <img src="/blog/assets/imgs/learning_angular/trackby_hashkey.png" />
    <figcaption>hashKey that is injected into the object</figcaption>
</figure>

Whenever you change an object property the DOM node the object is associated to will get destroyed and recreated.

To avoid this, in Angular 1.2, they introduced the `track by` expression which allows you to tell Angular how to associate JavaScript objects with DOM nodes. This also prevents the DOM nodes from being recreated ([Ben Nadel has a nice blog post](http://www.bennadel.com/blog/2556-using-track-by-with-ngrepeat-in-angularjs-1-2.htm) about this kind of behavior).

> For example: item in items track by item.id is a typical pattern when the items come from the database. In this case the object identity does not matter. Two objects are considered equivalent as long as their id property is same. <cite><a href="https://docs.angularjs.org/api/ng/directive/ngRepeat">Angular docs</a></cite>

As such, given that your object has a unique key, you can rewrite the above `ng-repeat` expression like this:

```html
<div ng-repeat="task in tasks track by task.id">
    ...
</div>
```

## Useful links

- [Official Angular Blog](http://blog.angularjs.org/)
