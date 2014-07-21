---
layout: articles-post
title: "Lazy Angular Modules"
lead: "Modularization strategy for lazy Angular modules"
show_img_in_detail: false
coverimage: false
tags: ["JavaScript", "Angular.js"]
---

Startup time is crucial for a proper user experience and that's where many JavaScript SPA really fail. Even though you might (and definitely should) apply code minification and bundling mechanisms, you wouldn't want to load your entire application right upfront. It simply isn't useful nor required. Unfortunately, as of now Angular doesn't natively support any kind of lazy loading approach. Thus, many devs started to create custom implementations and workarounds to circumvent such lack. This article aims to explore those implementations as well as to combine them with another interesting and hotly-debated topic: proper modularization.

{% assign topics='Updates will include existing approaches from other devs as well as source code samples and a detailed explanation of the implementation details.' %}
{% include mycustoms/next-up %}

## Feature based cut

Not only Angular but other frameworks as well propose the typical MVC kind of structuring and organization of your code, having a

- `controller` folder
- `model` folder
- `view` folder
- ...

While this might seem to be a clean and well organized structure initially, you soon discover that it isn't quite as useful as it could be during development nor maintenance. When did you last open your project and say "let's add a controller"?? Instead, you normally implement or modify some feature.  
Having a MVC structure implies a continuous, tedious searching for the corresponding controller, the model and view that belong to the feature in these three separate folders. Thus, having  a "feature-based" organization and grouping of your code tends to be more useful and maintainable in the long run.

Unfortunately, many Angular examples, even official ones, promote the MVC based folder structure (as of now). Take the [angular-seed](https://github.com/angular/angular-seed/tree/master/app/js) project or the [official Yeoman generator][official_yeoman_generator].  
That seems to change, though. The latest official [Angular best practices guide on GitHub](https://github.com/angular/angular.js/wiki/Best-Practices) proposes to "group your code into related bundles" and references the [Angular-app](https://github.com/angular-app/angular-app/tree/master/client/src/app) demo which is the code example that accompanies the [Mastering Web Application Development with AngularJS][angular_book] book (must read!). 

What you read and hear across the community might not always be as consistent as you'd like to have it. Anyway, my approach clearly follows the feature-based cut as it has already proven to be fruitful when developing JavaScript SPAs with JavaScriptMVC/CanJS as well as on a desktop application developed with PRISM.net.

<figure>
  <img src="/blog/assets/imgs/lazy-angular/feature-based-org.png" />
  <figcaption>Feature based code organization by the angular-app sample.</figcaption>
</figure>

<figure>
  <img src="/blog/assets/imgs/lazy-angular/mvc-based-org.png" />
  <figcaption>MVC based structuring from the official Angular Yeoman generator</figcaption>
</figure>

## State of the Art of Lazy Loading in JavaScript

Currently [RequireJS][require_js] is definitely the state of the art in asynchronously (and lazy) loading of JavaScript files. It is based upon the [AMD (Asynchronous Module Definition)](http://requirejs.org/docs/whyamd.html) API.

The basic usage consists of defining an AMD module, say `myModule.js`

```javascript
define(['jquery', './logger.js'], function($, logger){
    // do something

    return {
        doSomething: function(){
            logger.log('Hi');
        }
    }
});

```

...which you can then "require" somewhere else.

```javascript
require(['./myModule.js'], function(myModule){
    // do something interesting with it 
});
```

The asynch and potentially even parallel loading of the necessary files is completely managed by RequireJS. Obviously you can also programmatically "require" some further resources inside your code dynamically:

```javascript
function someFunction(param){
    if(param > 40){
        require(['./myModule.js'], function(){
            // this callback will be invoked once the dependency has been loaded.
        });
    }
}
```

This turns out to be quite useful for our lazy Angular loading implementation.

## Lazy loading and dependency injection

But, Angular has already it's "dependency injection" mechanism. Why would I want to also use RequireJS? The two have different targets: **RequireJS loads your physical script files** into the browser while Angular's dependency injection mechanism loads a **logical, runtime artifact by its name**.

In order to have Angular's DI mechanism work properly, all of the JavaScript code has to be loaded and known by the framework. Angular analyzes the code for definitions of controllers, services, directives etc. and injects them at other points when requested. For instance, you define your service:

```javascript
// definition of a service on an existing Angular module
myModule.factory('consolelogger', function(){
    return function(msg){
        console.log(msg)
    }   
});
```

Then, somewhere else you specify your `consolelogger` as dependency.

```javascript
myModule.controller('MyController', ['consolelogger', function(consolelogger){
    consolelogger('hi there');
}]);
```

<p class="notice fact">
    In Angular's DI you don't have to specify the file location, but simply the name with which you defined your artifact!
</p>

Thus, Angular's DI is good for testing and better modularity while RequireJS (or alternatives like [$scriptjs](http://www.dustindiaz.com/scriptjs) and so on) is definitely the tool for lazy-on-demand loading. But attention, we cannot simply lazy-load some JavaScript files with RequireJS after our Angular app has started because the DI container simply wouldn't recognize those newly created artifacts. Instead, we need to manually tell Angular about those new files that arrived. More on that later.

{% comment %}
### Existing approaches

## Implementation

## Conclusion

{% endcomment %}

## References

- [Mastering Web Application Development with AngularJS][angular_book]
- [Official Yeoman Angular generator][official_yeoman_generator]
- [John Papa TechEd 2014: Building Rich Apps with AngularJS on ASP.net][johnpapa_videoteched] and [demo code repository][johnpapa_code]
- [RequireJS homepage][require_js]

[angular_book]: http://www.packtpub.com/angularjs-web-application-development/book
[official_yeoman_generator]: https://github.com/yeoman/generator-angular
[johnpapa_code]: https://github.com/johnpapa/ng-demos/tree/master/modular
[johnpapa_videoteched]: http://channel9.msdn.com/Events/TechEd/NorthAmerica/2014/DEV-B420
[require_js]: http://requirejs.org/