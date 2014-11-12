---
layout: post
title: "Learning Angular: Invoking function expression from directive"
lead: ""
show_img_in_detail: true
coverimage: false
category:
tags: ["JavaScript", "Angular.js", "learning-ng"]
---

Intro bla bla...

{% include ng-series.html %}

## Issue

You pass a function reference to a directive (or bound to the scope) which you'd like to execute from within your directive.

This Plunkr should give a first hint.

- http://plnkr.co/edit/jY10enUVm31BwvLkDIAO?p=preview

I've also seen solutions where people invoked the function directly on the scope...

```javascript
...
link: function($scope, iElement, attributes){
  $scope.theFunc(); // to execute
}
```
