---
layout: post
title: "First baby steps with Angular.js"
lead: "Some of my notes from a recent AngularJS webinar"
show_img_in_detail: true
coverimage: false
category:
tags: ["JavaScript", "learning-ng", "Angular.js"]
reposts: ["http://juristr.com/blog/2014/05/angular-baby-steps/"]
---

This article outlines some of my notes of a webinar about Angular.js I recently participated at. These are really just "baby steps" in that it covers the very basics that might help to get started. Since these are really my first steps with Angular, I might have misunderstood some of the stuff. So feel free to [help me improve this article](https://github.com/juristr/juristr.github.com/edit/master/{{ page.path }}) ;)

> **Info:** the source code of some of the examples described here can be found on [the GitHub repo](http://github.com/juristr/angularjs-webinar).

## The App

`ng-app` represents the angular application. `ng-app="myApp"` does normally have
a corresponding

```javascript
angular.module('myApp', []);
```

in some JavaScript file.

## Data Binding

`{%raw%}{{}}{%endraw%}` are placeholders in HTML that are being interpreted by Angular. Similar as in other
popular templating engines like [Mustache](http://mustache.github.io/). It only represents
a **unidirectional** binding though.

`ng-init="text=Hello World"` allows to introduce variables. After such a declaration you
can reference `text` and its value.

```html
<div ng-init="text='Hello World'">
  <p>Value: {%raw%}{{ text }}{%endraw%}</p>
</div>
```

If we want to achieve **bidirectional bindings** then we have to use `ng-model`.

```
<input ng-model="text"/>
```

## Controllers

As one would assume, **controllers** are responsible for a certain HTML area they are
bound to.

```html
<body ng-controller="MyController">
  <p>{%raw%}{{ welcomeMessage }}{%endraw%}</p>
</body
```

```javascript
angular.module('myApp')
  .controller('MyController', ['$scope', function($scope){
    $scope.welcomeMessage = 'Hi, welcome to the Angular tutorial';

    $scope.sayHello = function(name){
      alert('Hi ' + name);
    };
  }]);
```

## Filters

What is quite handy on the output is that there are lots of **filters** available that allow you to customize it, like reversing the output:

```
{%raw%}{{ welcomeMessage | reverse }}{%endraw%}
```

Pipes (`|`) are used to apply the filter to some value. You can also combine several
once (just like unix pipes). There are predefined ones on the official [docs for predefined ones](https://docs.angularjs.org/api/ng/filter)
and custom ones like our reverse filter above. Implementing it is quite simple:

```javascript
angular.module('myApp')

    // factory function
    .filter('reverse', function (){
        // directly return a function
        return function(text){
            text = '' + text;

            // execute reversing
            return text.split('').reverse().join('');
        }
    });
```

## Events and Services

Similarly as simply binding values you can also attach click handlers like

```html
<body ng-controller="MyController">
  <input type="text" ng-model="name" />
  <button ng-click="sayHello(name)">Say Hello</button>
</body>
```

Note how the databound variable `name` can be directly passed to the `sayHello(..)` function.

```javascript
angular.module('myApp')
  .controller('MyController', ['$scope', function($scope){
    $scope.welcomeMessage = 'Hi, welcome to the Angular tutorial';

    $scope.sayHello = function(name){
      alert('Hi ' + name);
    };
  }]);
```

In order to not fill up the controller with lots of logic, you should extract them in re-usable services.

```javascript
angular.module('myApp')
  .factory('MyGreetingService', function(){
    return {
      sayHello: function(name){
        alert('Hi ' + name);
      }
    };
  });
```

The above construct represents a factory method for creating the service which is uniquely identified
by `MyGreetingService`. Note that services are **singletons**.

On the controller you then _inject_ the service as follows:

```javascript
angular.module('myApp')
  .controller('MyController', ['$scope', 'MyGreetingService', function($scope, greetingService){
    ...

    $scope.sayHello = function(name){
      // invoke the service
      greetingService.sayHello(name);
    };
  }]);
```

Variables prefixed by `$` are those provided by Angular.

## Directives

Another powerful concept of Angular are **directives**. They aim at bringing [web components](http://www.w3.org/TR/components-intro/) to you, augmenting the HTML with custom elements.

```html
<hello-world></hello-world>
```
The `<hello-world>` is implemented as follows:

```javascript
angular.module('myApp')
    // the name of the directive defines the final HTML tag that
    // has to be used.
    .directive('helloWorld', function(){
        return {
            restrict: 'E', //E=Element, A=attribute, C=css class or combined EAC
            //template: '<p>Hello, world!</p>', //inline specification
            templateUrl: 'helloWorldPartial.html' //load from HTML file
        }
    });
```

The `restrict` property specifies the kind of element, whether it is a HTML element, an attribute or CSS class. You can also mix more of them.  
The rendered template can be either specified inline using the `template` property or in a separate file, using `templateUrl`. The latter one is the suggested way especially when you have more complex HTML code.

> **Note:** HTML isn't case sensitive and as such also custom HTML tags should not be written in camel case but rather be separated by a dash.

If you want to get a deep-dive into how directives work I absolutely suggest you [Misko Hevery's meetup video](http://youtu.be/WqmeI5fZcho).

## Structuring and Modules

An Angular module is defined like

```javascript
angular.module('myApp', []);
```

This example code shows the definition of the application in `myApp.js`. While there is no restriction on how an Angular application should be structured, a module/widget structure is suggested. Hence, rather than organizing your app in `controllers`, `models` and `views` folder...

<figure>
  <img src="/blog/assets/imgs/angular-bad-organization.png" />
  <figcaption>Bad organization. <a href="http://trochette.github.io/Angular-Design-Patterns-Best-Practices/#/socks_drawer">Source</a></figcaption>
</figure>

..structure it according to the functionalities or modules, like `calculator`, `contacts` etc., depending on the kind of application you're creating. 

<figure>
  <img src="/blog/assets/imgs/angular-suggested-organization.png" />
  <figcaption>Suggested organization. Source: <a href="http://trochette.github.io/Angular-Design-Patterns-Best-Practices/#/socks_drawer">Source</a></figcaption>
</figure>

I did already write about such [modularity in JavaScript MVC applications](/blog/2013/04/modularity-in-javascript-frameworks/).

In [my example code](https://github.com/juristr/angularjs-webinar) I have an app that contains a "calculator" module. The folder structure looks like

```
- <calculator>
  - calculatorController.js
  - calculatorService.js
  - index.js
```

The `index.js` defines the module:

```javascript
angular.module('calculator', []);
```

Each of the other files like the controller and service have to be defined within that module.

```javascript
angular.module('calculator')
    .controller('CalculatorController',...
```

Finally, `myApp` needs to load the module (in `myApp.js`):

```javascript
angular.module('myApp', [
  'calculator'
]);
```

What's kind'a odd is that although `CalculatorController` is defined within the `calculator` module, you don't have to prefix it in the HTML code:

```html
<div ng-controller="CalculatorController">...</div>
```

Wait, this might get tricky and lead to potential name clashes when including multiple modules. Yep, and it seems like currently this is the solution:

> As of today AngularJS doesn't handle namespace collisions for services so if you've got 2 different modules with the service named the same way and you include both modules in your app, only one service will be available.  
> For the moment the best option is to prefix service names with a custom prefix... <cite><a href="http://stackoverflow.com/a/14909537/50109">StackOverflow</a></cite>

## Where's jQuery?

Can I use it? Angular uses a lite version of jQuery. The suggested approach is to avoid using jQuery directly and go as far as you can by using directives, controllers and live binding. However, jQuery can obviously be included. If so, you need to include it **before the angular.js** script include.

```html
<head>
  <script type="text/javascript" src="jQuery.js"></script>
  <script type="text/javascript" src="angular.js"></script>
  ...
</head>
```

Angular will detect it and use the included jQuery version rather than its own lite version of it.

Generally speaking **the use of jQuery should dramatically decrease due to live binding and Angular directives**.

## There's a lot more...

This article really just covers what was covered in the webinar. There's a lot more that has to be taken a look at in order to create a fully featured single page application like routing, views, unit testing...

## Question to the speaker

Here are two questions I posed to the speaker.

**You mentioned about using Angular directives sparingly. Why?**

- Not use directives for everything, but just where it makes sense, i.e. when you create a list with a simple filter you might be better served
by simply using a controller.
- Not due to performance issues
- directives for having reusable HTML elements (web components)

**What would be the "model" of M-VC in Angular?**

There isn't a model like it may be known from other frameworks. The "model" of Angular is somehow
the combination of `$scope`, the data binding and the services if we wish..  
Angular uses more a MVVM variation of the classic MVC.

## Useful Links

- [https://angularjs.org/](https://angularjs.org/)
- [https://docs.angularjs.org/api/ng/service](https://docs.angularjs.org/api/ng/service)
- [https://docs.angularjs.org/tutorial](https://docs.angularjs.org/tutorial)
- [https://docs.angularjs.org/api](https://docs.angularjs.org/api)
- [https://docs.angularjs.org/guide](https://docs.angularjs.org/guide)
- [http://angularjs.de/](http://angularjs.de/)
- [StackOverflow obviously ;)](http://stackoverflow.com)
- [Angular Design Patterns best practices](http://trochette.github.io/Angular-Design-Patterns-Best-Practices/)
  - [GitHub repo](https://github.com/trochette/Angular-Design-Patterns-Best-Practices)
- [Angular.js in Patterns](https://github.com/mgechev/angularjs-in-patterns)

---

> **Info:** the source code of some of the examples described here can be found on [the GitHub repo](http://github.com/juristr/angularjs-webinar).
