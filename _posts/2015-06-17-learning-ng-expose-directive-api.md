---
layout: post
title: "Learning Angular: Expose an API on your directives"
lead: Using shared services and "API objects" to create a directive API
show_img_in_detail: true
coverimage: false
category:
tags: ["JavaScript", "Angular.js", "learning-ng"]
---

Ever wanted to not only create a nice, visually appealing directive or web component, but to also provide a more rich programmatic API with it? Read on to learn about two potential implementation approaches.

{% include ng-series.html %}

## Problem

Suppose you create a directive intended to be used as a "web component" by multiple projects. That means that your directive has to adapt its behavior/appearence based on its surrounding context. Normally this is done by "configuring" it through proper attributes it exposes

```html
<my-web-component data="vm.someData" callback-fn="vm.someFunction()">
</my-web-component>
```

However, for more sophisticated scenarios this might not be enough. Often it would be more convenient to have some kind of programmatic API.

## Solution 1: use shared services

One possibility is to **use Angular services**. Generally speaking, it is highly recommended to extract your "logic part" into a dedicated service. This increases the reusability and maintainability of your code.

So you create

```javascript
someModule.factory('personService', function(){
  // implement your service api
});
```

Inside your directive you delegate all the work to the `personService`. As you might see, the service now provides you with some "kind of programmatic API" which lets you manipulate how your directive works. That's a commonly used approach.

## Solution 2: export an API object

Another solution is to export an API object from your directive.

```javascript
app.directive('myWebComponent', function(){
  return {
    ...
    bindToController: {
      // the API object you can bind to from the outside
      api: '='
    },
    template: ...,
    controller: function(){
      var vm = this;
      ...

      // the API of my web component
      vm.api = {
        setPerson: function(newPerson){
          vm.person = newPerson;
        }
      };
    },
    ...
  };
});
```

> **Note**, I'm using the "new" `bindToController` option that has been introduced in v1.3 and optimized in v1.4. If you do not know about it yet, you should read this article: [Exploring Angular 1.3: Binding to Directive Controllers](http://blog.thoughtram.io/angularjs/2015/01/02/exploring-angular-1.3-bindToController.html)

As you can see, the directive defines a `api` property which is attached to a JavaScript object with functions on it. From the outside of the directive you can now **bind to that API object** and invoke operate using its functions.

```html
<div ng-controller="MainController as main">
  <my-web-component api="main.webComponentApi"></my-web-component>
  ...
  <button ng-click="main.changePerson()">Change person</button>
</div>
```

Inside your `MainController` you use `webComponentApi`:

```javascript
app.controller('MainController', function(){
  var vm = this;
  // this will be bound to the API object
  vm.webComponentApi = null;

  vm.changePerson = function(){
    // Invoke the api which at this point should be bound
    vm.webComponentApi.setPerson({
        name: 'Juri'
      });
  };
});
```

Here's a Plunkr that demonstrates an implementation of such an API object:

<iframe src="http://embed.plnkr.co/eEKxm73D0uwZsKuMP7t8/preview" width="100%" height="400px"> </iframe>

## Conclusion

To be honest, I tend to towards the shared services model as it seems to be a much cleaner approach. But there might be situations where you need the "api object" as well.

Do you have other alternatives?? Please let me know in the comments.