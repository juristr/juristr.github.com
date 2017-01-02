---
layout: post
title: "Learning Angular: Playing with function references in isolated directive scope"
lead: ""
show_img_in_detail: true
coverimage: false
category:
tags: ["JavaScript", "Angular.js", "angular-directives", "learning-ng"]
---

Intro bla bla...

{% include ng-series.html %}

## Problem

I'd like my function referenced by the property `func` to be executed by the directive at some point, passing `data` to the function referenced by `func`.

```html
<my-directive data="Hi" func="vm.toConsole"></my-directive>
```

## Background

Angular directives have a `scope` property which allows to create an **isolated scope**, meaning my template defined within the directive won't be influenced by properties and objects defined by the parent within which my directive is being used. This makes sense in most of the cases. The scope property can be defined on the "directive configuration object" and can have 3 different kind of behaviors:

```javascript
return {
  ...
  scope: {
    prop1 : '@',
    prop2 : '=',
    prop3 : '&'
  }
}
```

`@` interpolates the passed variable, meaning if you'd pass an object you'd get a JSON string as a result. `=` passes a reference to the object, thus establishing a 2-way binding to it. Finally, `&` is used for passing in an expression.


---



```javascript
.directive('firstDirective', function() {
    return {
      restrict: 'E',
      template: '<div>First directive: {%raw%}{{ vm.msg }}{%endraw%}</div>',
      controller: function() {
        var vm = this;
        vm.msg = 'Hi';
      },
      controllerAs: 'vm'
    };
  })
  .directive('secondDirective', function() {
    return {
      restrict: 'E',
      template: '<div>Second diretive: {%raw%}{{ vm.msg }}{%endraw%}</div>',
      controller: function() {
        var vm = this;
        vm.msg = 'Hello World';
      },
      controllerAs: 'vm'
    };
  });
```

## Output

Clearly you would expect to get two different messages, "Hi" and "Hello World".

<iframe src="https://embed.plnkr.co/WVm8Wl/preview" width="100%" height="400px"> </iframe>

## Links

- [Creating Angular directives series](http://weblogs.asp.net/dwahlin/creating-custom-angularjs-directives-part-i-the-fundamentals)
- [AngularJS Directive Attribute Binding Explanation](https://gist.github.com/CMCDragonkai/6282750)