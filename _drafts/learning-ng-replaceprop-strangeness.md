---
layout: post
title: "Learning Angular: ng-if and replace:true strangeness"
lead: "..."
show_img_in_detail: true
coverimage: false
category:
tags: ["JavaScript", "Angular.js", "learning-ng"]
---

Intro bla bla...

{% include ng-series.html %}

## Problem

When you have a directive like

```javascript
.directive('simpleDirective', function(){
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      template: [
        '<li ng-show="data.visible">',
          '{{ data.text }}',
        '</li>'
      ].join(''),
      replace: true
    };
})
```

If you use `ng-if` combined with `replace:true` then the `data.text` won't get displayed....find the reason for this!

## Links

- http://plnkr.co/edit/cUuIUp9c1gxHhhdNfJXp?p=preview
- http://plnkr.co/edit/RnfNTW?p=preview





