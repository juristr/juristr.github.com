---
layout: post
title: "Learning Angular: What is the scope of your directive??"
lead: "Watch out: Directive controllers do not necessarily behave like normal controllers"
show_img_in_detail: true
coverimage: false
category:
tags: ["JavaScript", "Angular.js", "learning-ng", "angular-directives"]
reposts: ["http://www.webcodegeeks.com/javascript/angular-js/learning-angular-what-is-the-scope-of-your-directive/"]
---

This might create quite some debugging headaches, especially in a larger application. Things don't bind properly, have different data on the scope than you'd expect etc.. When you define your directives, you have to be really careful about their scope.

{% include ng-series.html %}

## The issue

Take the following two directives defined in your HTML as follows:

```html
<first-directive></first-directive>
<second-directive></second-directive>
```

Here's how they look internally.

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
      template: '<div>Second directive: {%raw%}{{ vm.msg }}{%endraw%}</div>',
      controller: function() {
        var vm = this;
        vm.msg = 'Hello World';
      },
      controllerAs: 'vm'
    };
  });
```

Nothing strange, right? Each of them defines a directive controller which sets a variable `msg`. **What do you think is the expected output?**

<iframe src="http://embed.plnkr.co/ODtRkv/preview" width="100%" height="400px"> </iframe>

Hmm..not really, right? Clearly you would expect to get two different messages, "Hi" and "Hello World". If you open the inspector (of your Chrome Devtools) you might understand why:

<figure>
  <img src="/blog/assets/imgs/learning_angular/directives-nonisolated-scopes.png" />
  <figcaption>There's just one scope (ng-scope) defined</figcaption>
</figure>

As you can see, there's only one scope defined. Take a look at the `<html>` tag at the very top: Angular nicely marks the scope with the `ng-scope` class. You can also visualize it with [Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk?hl=en), the Angular.js Chrome Devtools extension.
 
<figure>
  <img src="/blog/assets/imgs/learning_angular/batarang-scopes-directives.png" />
  <figcaption>Scopes being highlighted by Batarang</figcaption>
</figure>

To do so, simply activate the according "Show scope" option.

<figure>
  <img src="/blog/assets/imgs/learning_angular/batarang-showscopes.png" />
  <figcaption>Activate the "Show scope" property on Batarang</figcaption>
</figure>

So the **issue is quite clear**, the directives don't create a separate, isolated scope and thus, the `vm` variable of the directive controller on `<second-directive>` overwrites the `vm` variable of the directive controller on `<first-directive>`. Thus, two times "Hello World".

> **Directive controllers** don't create a separate scope out of the box!

Interestingly, while a normal controller creates a scope, the directive controller doesn't do so. It totally makes sense, but you might easily fall into this trap.

## The solution

Directives **can be forced to create an isolated scope**. This is done by using the `scope` property, in the simplest case by **setting it to true**.

```javascript
.directive('secondDirective', function() {
  return {
    ...
    scope: true,
    ...
  };
});
```

And voilá..

<iframe src="http://embed.plnkr.co/jo3zeF/preview" width="100%" height="400px"> </iframe>

Also the HTML reflects the change, now having three different scopes.

<figure>
  <img src="/blog/assets/imgs/learning_angular/directives-isolated-scopes.png" />
  <figcaption>Directives are now isolated, having their own scope</figcaption>
</figure>

## Background

Some more background around scopes in directives.

The `scope` variable can either have `true` or `false` (default) as we've just seen, or you pass an object explicitly specifying which properties should be passed from outside into the directive (basically for configuring it).

```javascript
angular.directive('myDirective', function(){
  return {
    ...
    scope: {
      obj1: '=',
      obj2: '@',
      obj3: '&'
    }
    ...
  };
});
```

`=` stands for data binding, it passes a reference to an object inside your directive. It keeps the expression in the attribute in sync with the isolated scope, thus allows for 2-way bindings.

```html
<my-directive obj1="vm.someObject"></my-directive>
```

`@` stands for interpolation. It is used with `{%raw%}{{}}{%endraw%}` and will always return a string. 

```html
<my-directive ob1="{%raw%}{{ vm.msg }}{%endraw%}"></my-directive>
```

`&` stands for expression. Within the directive it will be made available as a function, that, when called, executes the passed expression. Use it like

```html
<my directive callback="vm.showAlert('Hi')"></my-directive>
```

..with your directive configuration object being defined for instance like this:

```javascript
return {
	...
	scope: {
		callback: '&'
	},
	template: '<button ng-click="callback()">Click</button>'
	...
}
```

You can also have different names for the scope properties that are used internally or passed externally:

```javascript
scope: {
	obj1: '=object1',
	obj2: '&object2',
	obj3: '@object3'
}
```

You would use `obj1` in your directive template, while the user of your directive would use `object1` on the HTML.

## Conclusion

While this example is obviously a simplified version where it's quite easy to track to the problem, believe me, I invested some good time in understanding why suddenly my sidebar suddenly didn't display any data. Only after I realized that the it's directive scope contained the data of the `<header>` directive's scope I started to get suspicious.

The learning from this is that you should pay attention to the scope of your directive. Whether you should isolate it or rather rely on the parents scope. An "attribute directive", augmenting an existing element like a button or input box with additional features might not necessarily need to be isolated. Instead, you might expect an isolated scope when using more closed, complete widgets. Just think about it.

