---
layout: post
title: "Learning Angular: How to I verify whether a scope property on my directive has been defined?"
lead: ""
show_img_in_detail: true
coverimage: false
category:
tags: ["JavaScript", "Angular.js", "angular-directives", "learning-ng"]
---

When you create isolated directives, you usually use the `scope` property to define your directive's external API. Some of the APIs properties might be mandatory while others are optional and based on that state, your directive might react differently. Sounds easy, but I stumbled upon a difference when you pass in functions vs. data objects. See yourself.

{% include ng-series.html %}

## Problem

So I have some properties defined on my isolated directives using the `scope` property:

```javascript
...
scope: {
    data: '=',
    clickFn: '&'
}
```

Not all of these properties may be required, so there can be the necessity for checking whether the user provided the directive's property and hence react differently. With plain data properties, such as like `data: '='` in the example before, it is quite easy. Simply use the `ng-show` (or `ng-hide`) directive in your template:

```javascript
...
scope: {
    data: '='
},
template: '<div ng-show="data">Some content</div>',
...
```

The div won't be shown if data is not defined. Why? Well, if data is not provided in the directive, then the `$scope.data` is `undefined` within your directive's scope, thus evaluating to false and hence hiding the div.

Strangely, this is not the case when passing functions into a directive's scope using the `&` notation. In that case, regardless of whether you provide a function on your directive or not, `$scope.clickFn` will always contain this:

```javascript
function (locals) {
  return parentGet(parentScope, locals);
}
```

You can verify this by yourself. Simply implement the directive's link function, debug it and inspect the `$scope` property.

## Solution

The solution here is to inspect the `iAttr` parameter of your directive's link function rather than the `$scope` object. Inspect it and then assign a variable to the scope which you can then use in your template. Something like this:

```javascript
angular.module('someModule', [])
    .directive('myDirective', function() {
        return {
          restrict: 'E',
          scope: {
            clickFn: '&'
          },
          template: [
            '<div ng-show="isFn" style="border: 1px solid; padding:5px">',
                '<a href="#" ng-click="clickFn()">Click me</a>',
            '</div>'
            ].join('',
          link: function($scope, iElem, iAttr){
            // use the iAttr to check whether the property is defined
            $scope.isFn = angular.isUndefined(iAttr.clickFn) === false;
          }
        };
      });
```

<iframe src="http://embed.plnkr.co/MJFqNv/preview" width="100%" height="400px"> </iframe>

## Background

Why?? What is the printed function?
