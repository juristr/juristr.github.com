---
layout: post
title: "Coding with Angular.js"
lead: "Documenting my learning experience with Angular.js"
show_img_in_detail: false
coverimage: false
tags: ["JavaScript"]
---

This article is built incrementally by processing, internalizing and documenting all the stuff I encounter while learning Angular.js. So keep an eye on it.

## Databinding

- {%raw%}`{{}}`{%endraw%}
- `ng-model`
- `ng-bind="::foo"` - lazy, one-time binding (more [here](https://github.com/angular/angular.js/commit/cee429f0aaebf32ef1c9aedd8447a48f163dd0a4))

## ng-cloak

- when loading app you may see lots of unprocessed tags
- `ng-cloak` solves this...but not too nicely
- `ng-bind` is better.

When Angular loads up, you may see lots of unprocessed {% raw %}`{{}}` {%endraw%} expressions. This is because the browser started to render the HTML before Angular was able to process and properly replace all of the expressions.

One solution is to use `ng-cloak`

```html
<body ng-cloak>
    ...
</body>
```

The only issue is that in this case now, you won't see any contents. until the whole Angular application has been loaded. It is therefore **suggested** to use `ng-bind` expressions as follows:

```html
<body>
    <span class="badge" ng-bind="projects.length || '?'">?</span> Neat things build...
</body>
```

`ng-bind` is equivalent to placing the curly braces but obviously attributes won't be rendered by the browser. As such, the worst thing that happens is that for a small fraction of time, the user sees a "?" before it is being replaced by the real content.

> **Note,** that this approach has **only to be used on the `index.html`** site and not on all of your modules since they will obviously be loaded only once the entire app is ready.

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

## Components

The idea of Angular is to extend existing HTML tags for adding new dynamic behavior, just like building your own DSL.

The are different **choices for building an Angular component**:

- `<my-component>`
- `<div my-component>`
- `<div class="my-component">`
- `<!-- directive:my-component -->`

On **IE it is suggested to prefix** the component

- `<my-component>` rather than `<component>` or
- `<my:component>`

Using it as an attribute `<div my-component>` always works. To fix things up for IE8 and smaller, you can either use a namespace

```html
<html xmlns:ng="http://angularjs.org">
```

or manually create the required elements like

```html
<head>
    <!--[if lte IE 8]>
        <script>
            document.createElement('ng-include');
            document.createElement('ng-pluralize');
            ...
        </script>
    <![endif]-->
</head>
```

More can be found under [https://docs.angularjs.org/guide/ie](https://docs.angularjs.org/guide/ie).

## Separate presentation and business logic

### Controllers

- should not reference DOM
- should have view behavior like what happens when the user does X

### Services

- should not reference DOM (mostly)
  - exception: dialog box service which dynamically needs to inject a DOM node to show the box
- are singletons
- have logic independent of the view (executes operation X)
- whenever you have the question how to call the method of another controller, that logic should probably reside inside a service and be shared among them

### Directives

- DOM manipulation is done here

## Scope

- scope in controller should be write only; collect data and place in scope
- scope in view should be readonly -> only read, don't write
- scope is **not the model**, it should refer to the model (you create) instead


## Bidirectional bindings

There is a rule with bidirectional bindings (`ng-model`) which I didn't quite get initially:

> When doing bidirectional binding make sure you don't bind directly to the scope properties. Otherwise it may lead to unexpected behavior in child scopes.

Or said differently, "if you don't have a dot (.) in your `ng-bind` expression you're doing it wrong". The problem is demonstrated in [this jsfiddle](http://jsfiddle.net/r4RKW/1/).

```html
<div ng:app>
    <form name="myForm" ng-controller="Ctrl">
        Inputs inside switch:
        <span data-ng-switch="show">
            <input data-ng-switch-when="true" type="text" data-ng-model="theField" />
        </span>
        <br/>
        Inputs outside of switch:
        <input type="text" data-ng-model="theField" />
        <br/>
        Values: {{theField}}
 </form>
</div>
```

While both input fields as well as the output one bind to `theField`, once you type on the field that lives inside the `ng-switch` clause, they get out of sync.

<figure>
  <img src="/blog/assets/imgs/learning_angular/angular-bidirectionalbinding-issue.gif" />
</figure>

The reason is that `ng-switch` creates a client-scope that inherits (through prototypal inheritance) from the parent scope. By typing into the textfield you write to `theField` (due to the `ng-bind`) which overwrites the property and thus changes the object instance wherefore the instances of the client and parent scope diverge. Obviously by having something like `myObj.theField` such an issue would have been avoided as the bound object is `myObj` which won't get overwritten. Miško explains it [here](http://www.youtube.com/watch?v=ZhfUv0spHCY&feature=share&t=31m).

## $watch

- the `$watch` getter function must always be fast, have no side-effects & idempotent

## Modules

- usually one module for application
- one module per third-party reusable library
- incremental code loading
  - split modules by view

## Minification and Compilation

- views use reflection to access model; if a minifier executes and renames names, then properties won't match up with the template. Thus, **you have to rename property renaming**.

Another problem is due to how dependency injection works in Angular.

```javascript
var MyController = function($scope, greeter){
    ...
}
``` 

`$scope` as well as `greeter` are used by Angular for finding the according dependencies. The problem is that a typical JavaScript compiler will rename these parameters during compilation. To circumvent this issue you can use the following syntax instead:

```javascript
var MyController = someModule.controller('MyController', ['$scope', 'greeter', function($greeter, greeter) {
	...
}]);
```

### Deployment

- minify and concatenate
- don't cache index.html for changing version number of cached libraries
- cache by version
  - views
  - code
  - images
  - css

## To look at

### Template cache

Apparently there is a template caching service

- http://www.youtube.com/watch?v=ZhfUv0spHCY&feature=share&t=42m
- https://docs.angularjs.org/api/ng/service/$templateCache

### ng-include

- `innerHTML` doesn't work as Angular won't get notified about DOM changes
- inserting HTML dynamically
- calls compilation service

### Performance

- how many bindings on page
- how expensive are getter functions (-> `$watch` fast)
- `ng-view` breaks it while `ng-show` and/or `ng-hide` don't.

### Event bus

- using $scope as event bus (through `emit` and `broadcast`); disadantage is directional
- $rootScope -> broadcast event to everybody
- use databinding in most cases; inject services


## Testing in Angular

- Types of tests
  - Unit tests
  - End-to-end, scenario tests ([Protractor](https://github.com/angular/protractor))

### Karma

- generate config file: `karma init`
  - grunt plugin for karma, so there is no need for config file
- `karma start`
  - starts a real browser that listens
  - watches source file of project
  - automatically executes tests on save
- karma is agnostic of testing frameworks; there are adapters
- `describe`: define a test suite
- to fasten the execution of tests we can scope them
  - `ddescribe`: prefix with a `d` to scope test to this module
  - `iit`: to execute just that test
- use `debugger;` statements to stop and debug in the Karma live execution
- Other features
  - code coverage


### Links

- [GTAC 2013: Karma - Test Runner for JavaScript](https://www.youtube.com/watch?v=YG5DEzaQBIc)
- [Protractor](https://github.com/angular/protractor)


## Useful links

- [Official Angular Blog](http://blog.angularjs.org/)
- [CodeAcademy tutorial](http://www.codecademy.com/courses/javascript-advanced-en-2hJ3J/0/1)

### Videos

- [Angular Best Practices](https://www.youtube.com/watch?v=ZhfUv0spHCY)
