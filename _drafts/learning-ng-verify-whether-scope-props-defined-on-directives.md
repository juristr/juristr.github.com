---
layout: post
title: "Learning Angular: How to I verify whether a scope property on my directive has been defined?"
lead: ""
show_img_in_detail: true
coverimage: false
category:
tags: ["JavaScript", "Angular.js", "angular-directives", "learning-ng"]
---

Intro bla bla...

{% include ng-series.html %}

## Problem

You have an arbitrary directive and you'd like to verify whether the properties you defined on your directive's `scope`, have actually been assigned by the developer or not. The usual approach is to check for null and undefined

```javasccript

```

Even when nothing is defined, apparently the function expression always gets the following function assigned:

```javascript
function (locals) {
  return parentGet(parentScope, locals);
}
```

You can verify this by yourself, by adding a `check` function to your directive's scope and then by invoking it with the obj/func you'd like to verify.

```javascript
link: function($scope){
  $scope.check = function(obj){
      console.log(obj.toString());
  };
}
```

The console will printout the function shown above.

## Background

Why?? What is the printed function?

## Solution

You add functions on your directive scope which verify the presence of the properties.

```javascript
// @ngInject
function mapscMenuItem(directiveRecursion){
    return {
        restrict: 'E',
        scope: {
            menuitem: '=',
            grantsfn: '&'
        },
        template: [
            '<li ng-show="noGrantsFn || noGrantsAssigned || grantsfn()(menuitem.grants)">',
                '<a href="{{ menuitem.url }}">',
                    '<i class="{{ menuitem.iconClass }}"></i>',
                    '<span class="nav-label">{{ menuitem.title }}</span>',
                    '<span class="fa arrow" ng-if="menuitem.menu.length > 0"></span>',
                '</a>',
                '<ul class="nav nav-second-level" ng-show="menuitem.menu.length > 0">',
                    '<mapsc-menu-item menuitem="submenu" ng-repeat="submenu in menuitem.menu" grantsfn="grantsfn">',
                    '</mapsc-menu-item>',
                '</ul>',
            '</li>'
            ].join(''),
        replace:true,
        compile: function(tElement){
            return directiveRecursion.compile(tElement, function($scope, iElement, attributes){
                $scope.noGrantsFn = typeof(attributes.grantsfn) === 'undefined';
                $scope.noGrantsAssigned = typeof($scope.grants) === 'undefined';

                $scope.check = function(obj){
                    console.log(obj.toString());
                };
            });
        }
    };
}
```

http://plnkr.co/edit/MJFqNv?p=preview

## Links

- http://stackoverflow.com/questions/19962965/how-do-i-check-whether-an-expression-attribute-has-been-provided-to-a-directive


