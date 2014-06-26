---
layout: articles-post
title: "Coding with Angular.js"
lead: "Documenting my learning experience with Angular.js"
show_img_in_detail: false
coverimage: false
tags: ["JavaScript"]
---

This article is built incrementally by processing, internalizing and documenting all the stuff I encounter while learning Angular.js. So keep an eye on it. I'll update it frequently.


## Warming up..

Right at the very beginning, here's a simple Angular example.

```html
<html>
<head>
  <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/ angular.js"></script>
</head>
<body ng-app ng-init="name = 'World'">
  <h1>Hello, {{name}}!</h1>
</body>
</html>
```

What you might immediately notice there is no definition of a template (like EJS, Mustache, ...) which gets filled in, but instead the HTML code is being annotated directly using **element attributes** and placeholders {%raw%}`{{name}}`{%endraw%}. This is a core concept in Angular that distinguishes it from other popular JavaScript frameworks where you usually have some templating engine which is used to dynamically generate HTML which is added to the DOM.

Specifically, in the example above we have

- `ng-app` - which is used to attach the Angular application. You can only have one of them. Normally it is attached to the `<body>` or even `<html>` tag of the page.
- `ng-init` - is a way to initialize a variable which is visible within the element's scope it has been declared on. In this example within `<body>`
- {%raw%}`{{name}}`{%endraw%} - is used for outputting some value, in this case of the just previously defined `name` variable. It's a one-way databinding mechanism basically.

## MVC in Angular

Angular has a very pragmatic approach to the MVC pattern and declares itself to follow the MVW (Model View Whatever) pattern.

### Scope

The scope is a fundamental concept in Angular. It is the **mechanism with which we can expose a domain model to the view**. The scope can have pure data in the form of objects but also dynamic behavior in the form of functions attached to it.

```javascript
var MyController = function($scope){
  $scope.age = 29;
  $scope.getName = function(){
    return "Juri Strumpflohner";
  };
}
```

Don't bother where the `$scope` comes from (for now). The corresponding HTML template might look like this:

```html
<p>
  Hi, my name is {%raw%}{{getName()}}{%endraw%} and I'm {%raw%}{{age}}{%endraw%} years old.
</p>
```

More details about scopes later.

### Controller

The controller's main responsibility is to initialize the scope with objects by providing the initial values and/or by adding view specific functions for implementing some dynamic behavior. Frankly, the controller does the same job as the `ng-init` from the above example. By specifying the initialization code in a JavaScript function we don't have to clutter the HTML code.

<p class="notice fact">
  The controller in Angular is a regular JavaScript function. There is no need to inherit from some base class.
</p>

### Models

Similar as the controller, models are regular JavaScript objects. To expose them, simply add them to the suitable scope object.

```javascript
$scope.person = {
  name: 'Juri',
  age: 29
};
```

<p class="notice tip">
  It is suggested to assign an entire object to the <code>$scope</code> rather than single, primitive JavaScript values (i.e. strings, number, booleans). This is due to how the binding mechanism works in Angular. More about it later.
</p>

### View

The view part in Angular is covered by the HTML itself, augmented with some application specific, custom HTML vocabolary. This allows us to build nearly a domain-specific language (DSL) for our application.

Once the browser has finished rendering the DOM, Angular parses it and processes any custom defined HTML tags and attributes and turns them into dynamic parts by executing the logic you programmed into your Angular application. Such custom elements are called **directives** (more later).

Angular itself is actually build on top of directives, which are usually prefixed with `ng-`. Here's an example:

```html
<div ng-controller="HelloWorldCtrl">
  <input type="text" ng-model="message" />
  <button ng-click="send(message)">Send</button>
</div>
```

### Databinding

Values can be databound to the view in the following ways.

- {%raw%}`{{...}}`{%endraw%}
- `ng-bind`
- `ng-model`
- `ng-bind="::foo"` - lazy, one-time binding (more [here](https://github.com/angular/angular.js/commit/cee429f0aaebf32ef1c9aedd8447a48f163dd0a4))

The data is always provided through the `$scope` object. By using {%raw%}`{{ ... }}`{%endraw%} a **one-way binding** between the scope and the HTML is established. This means that your DOM will be refreshed whenever the databound value changes, but the scope won't be refreshed in response to changes in the view. `ng-bind` is an alternative to the curly braces syntax.

```html
Hi {%raw%}{{name}}{%endraw%}.
Hi <span ng-bind="name" />.
```

In order to esablish a **two-way or bidirectional binding** (usually on input fields) you can use `ng-model`.

```javascript
$scope.person = {
  name: 'Juri'
};
```

```html
<input type="text" ng-model="person.name" />
```

In this way, when we type into the textbox, `person.name` will be updated automatically and all other corresponding bindings will get refreshed.

There is a rule with bidirectional bindings (`ng-model`) which I didn't quite get initially:

<p class="notice tip">
  When doing bidirectional binding make sure you don't bind directly to the scope properties. Otherwise it may lead to unexpected behavior in child scopes.
</p>

Or said differently, **"if you don't have a dot (.) in your `ng-bind` expression you're doing it wrong"**. The problem is demonstrated in [this jsfiddle](http://jsfiddle.net/r4RKW/1/).

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

Finally, `ng-bind="::name"` establishes a **one time, lazy binding**, meaning that the DOM won't get updated for subsequent changes of the data. More [about this here](https://github.com/angular/angular.js/commit/cee429f0aaebf32ef1c9aedd8447a48f163dd0a4).

---
---

## The scope

- scope in controller should be write only; collect data and place in scope
- scope in view should be readonly -> only read, don't write
- scope is **not the model**, it should refer to the model (you create) instead

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

**"Controller as" syntax**

Normally you have a controller defined like this:

```javascript
angular.module('myApp')
  .controller('MyCtrl', ['$scope', function($scope){
    $scope.name = 'Juri';
    $scope.sayHello = function(){
      alert('Hi');
    };
  }]);
```

You ask to get `$scope` injected which you use for giving the data to the view. `$scope` in this case could be seen as the "View Model".

Since version v1.1.5 Angular supports the "controller as" syntax that allows you to define the controller in a way to expose the scope implicitly:

```javascript
angular.module('myApp')
  .controller('MyCtrl', function(){
    this.name = 'Juri';
    this.sayHello = function(){
      alert('Hi');
    }
  });
```

There is no `$scope` involved here, rather the controller itself represents the scope. In the HTML template you then have to write it as follows:

```html
<div ng-controller="MyCtrl as greeter">
  Hi, I'm {%raw%}{{ greeter.name }}{%endraw%}.
  <button ng-click="greeter.sayHello()">
    Say hello
  </button>
</div>
```

There are a few downsides here (also [discussed over there](https://groups.google.com/forum/#!topic/angular/84selECbp1I)). I like the `$scope` as it clearly communicates in a "viewmodel" style which data/functions get exposed to the view. On the other side when you have nested controllers the HTML gets a lot more clear with the "as syntax":

```html
<div ng-controller="MyCtrl as greeter">
  Hi, I'm {%raw%}{{ greeter.name }}{%endraw%}.
  <button ng-click="greeter.sayHello()">
    Say hello
  </button>

  <div ng-controller="OtherCtrl as other">
    {%raw%}{{ room.foo }}{%endraw%}
  </div>

</div>
```

It is much clearer how the inheritance works and which variable/function is fetched/invoked on which controller. Another nice side effect is that it avoids the "dot problem".

This video explains it all: [https://www.youtube.com/watch?v=tTihyXaz4Bo](https://www.youtube.com/watch?v=tTihyXaz4Bo);

Personally I nearly prefer the "controller as" syntax because it leads to much cleaner code in the template.

### Services

- should not reference DOM (mostly)
  - exception: dialog box service which dynamically needs to inject a DOM node to show the box
- are singletons
- have logic independent of the view (executes operation X)
- whenever you have the question how to call the method of another controller, that logic should probably reside inside a service and be shared among them

### Directives

- DOM manipulation is done here

## Data flow scenarios

Let's examine an example data flow scenario in an Angular application. I take the example from [John Papa's ng-demos project on GitHub](https://github.com/johnpapa/ng-demos). Specifically we take a look at the [Avengers module](https://github.com/johnpapa/ng-demos/blob/master/modular/app/avengers).

What we have there is the `avengers.js` controller which has a function `activate()` that calls the `getMMA()` function. I'd like to take a look at that one. 

```javascript
(function () {
    'use strict';
    var controllerId = 'avengers';
    angular.module('app.avengers')
        .controller(controllerId,
            ['common', 'controllerActivator', 'dataservice', avengers]);

    function avengers(common, controllerActivator, dataservice) {

        var vm = this;
        ...
        activate();

        function activate() {
            var promises = [getAvengersCast(), getMAA()];
            controllerActivator.activate(promises, controllerId)
                .then(function () {
                    log('Activated Avengers View');
                });
        }

        function getMAA() {
            dataservice.getMAA()
                .then(function (data) {
                    vm.maa = data;
                    return vm.maa;
                });
        }
        ...
    }
})();
```

That function calls a service named `dataservice` which apparently returns a promise. Hence, the author invokes the `then(..)` function to get access to the returned data and binds it to the view.

```javascript
function getMAA() {
    dataservice.getMAA()
        .then(function (data) {
            vm.maa = data;
            return vm.maa;
        });
}
```

<p class="notice tip">
  <b>Note</b> that the controller uses the "controller as" syntax. At the beginning of the controller definition function the author wrote <code>var vm = this;</code>.
</p>

The [dataservice](https://github.com/johnpapa/ng-demos/blob/master/modular/app/core/dataservice.js) has a corresponding function `getMAA()` which uses `$http` for contacting the backend. Obviously `$http` returns a promise object.

```javascript
...
function getMAA() {
    return $http.get('/api/maa')
        .then(function(data, status, headers, config) {
            return data.data[0].data.results;
        }, function(error){
            console.log(error);
            return error;
        });
}
...
```

The key here is to use promises for simplifying the code rather than passing in callback functions.

## Exception handling

It is often comfortable to be able to handle exceptions in a central place for logging, showing a feedback to the user about what was going wrong etc. Angular has already a service called `$exceptionHandler` which can be [decorated](https://docs.angularjs.org/api/auto/object/$provide#decorator) to provide your own behavior. John Papa has a [nice example on his repo](https://github.com/johnpapa/ng-demos/blob/master/modular/app/blocks/exception/exceptionHandler.js).

```javascript
exceptionModule.config(['$provide', function ($provide) {
    $provide.decorator('$exceptionHandler',
        ['$delegate', 'exceptionConfig', 'logger',
            extendExceptionHandler]);
}]);

function extendExceptionHandler($delegate, exceptionConfig, logger){
  var appErrorPrefix = exceptionConfig.config.appErrorPrefix || '';
  return function (exception, cause) {
      $delegate(exception, cause);
      // your logic here
  };
}
```
`$delegate` is required for performing the decoration, `exceptionConfig` and `logger` is something the author does for adding a configurable prefix and for sending the info to a logger.

## $watch

- the `$watch` getter function must always be fast, have no side-effects & idempotent

## Modules

- usually one module for application
- one module per third-party reusable library
- incremental code loading
  - split modules by view

### Lifecycle



### 

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
