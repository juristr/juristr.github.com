---
layout: post
title: "Learning Angular: Playing with function references in isolated directive scope"
lead: ""
show_img_in_detail: true
coverimage: false
category:
tags: ["JavaScript", "Angular.js", "angular-directives"]
---

Intro bla bla...

{% include ng-series.html %}

## Problem

You have an arbitrary directive and you'd like to verify whether the properties you defined on your directive's `scope`, have actually been assigned by the developer or not.

Even when nothing is defined, apparently the function expression always gets the following function assigned:

```javascript
function (locals) {
  return parentGet(parentScope, locals);
}
```

You can verify this by yourself, by adding a `check` function to your directive's scope and then by invoking it withe obj/func you'd like to verify.

```javascript
link: function($scope){
  $scope.check = function(obj){
      console.log(obj.toString());
  };
}
```

## Links

- http://stackoverflow.com/questions/19962965/how-do-i-check-whether-an-expression-attribute-has-been-provided-to-a-directive


