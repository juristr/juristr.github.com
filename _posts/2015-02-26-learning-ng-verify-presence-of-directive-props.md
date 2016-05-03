---
layout: post_new
title: "Learning Angular: Verifying whether a function has been passed to my directive's isolated scope"
lead: "How can I verify whether a function property defined on my directive's isolated scope has been specified or not?"
show_img_in_detail: true
lastupdated: '2016-05-03'
coverimage: false
category:
tags: ["JavaScript", "Angular.js", "angular-directives", "learning-ng"]
reposts: ["http://www.webcodegeeks.com/javascript/angular-js/learning-angular-verifying-whether-function-passed-directives-isolated-scope/"]
---

<div class="article-intro">
    When you create isolated directives, you usually use the <code>scope</code> property to define your directive's external API. Some of the APIs properties might be mandatory while others are optional and based on that state, your directive might react differently. Sounds easy, but I stumbled upon a difference when you pass in functions vs. data objects. See yourself.
</div>

{% include postads %}

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

## Solution 1 - Ugly

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
            ].join(''),
          link: function($scope, iElem, iAttr){
            // use the iAttr to check whether the property is defined
            $scope.isFn = angular.isUndefined(iAttr.clickFn) === false;
          }
        };
      });
```

<iframe src="http://embed.plnkr.co/MJFqNv/preview" width="100%" height="400px"> </iframe>

## Solution 2

Define your function to be optional: `&?`. This way the function will only be defined if it actually has been passed in the HTML.

```javascript
angular.module('someModule', [])
    .directive('myDirective', function() {
        return {
          restrict: 'E',
          scope: {
            clickFn: '&?'
          },
          template: [
            '<div ng-show="isFn" style="border: 1px solid; padding:5px">',
                '<a href="#" ng-click="clickFn()">Click me</a>',
            '</div>'
            ].join(''),
          controller: function($scope){
            
            if ($scope.clickFn) {
              // safely invoke clickFn()
            } else {
              // clickFn is not defined -> fallback
            }

          }
        };
      });
```


## Background

Each function that is passed into the isolated scope of a directive is wrapped like this:

<figure>
  <img src="/blog/assets/imgs/learning-ng/directive-scope-fn-isolateBindingContext.png" />
</figure>

Here's the source of `parentGet`

<figure>
  <img src="/blog/assets/imgs/learning-ng/directive-scope-fn-parentGet.png" />
</figure>

From a bird's perspective, it seems that it is responsible for safely invoking the passed function with the local scope of the directive. But as said, I didn't go into the details.
