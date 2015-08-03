---
layout: post
title: "Learning Angular: Access directive scope variables from directive controllers and vice versa"
lead: "Learn how to use directive scope variables and access them from your directive controller"
show_img_in_detail: true
coverimage: false
category:
tags: ["JavaScript", "Angular.js", "learning-ng"]
reposts: ["http://java.dzone.com/articles/learning-angular-access", "http://www.webcodegeeks.com/javascript/angular-js/learning-angular-access-directive-scope-variables-from-directive-controllers-and-vice-versa/"]
---

Angular directives can have a separate, isolated scope, which is even the suggested approach most of the time. And they can have directive controllers. But...how do I access the directive's scope variables from the directive controller and vice-versa?? It's quite simple, read on and see it yourself.

{% include ng-series.html %}

I'm having an **isolated directive** which has some scope properties defined on it. Here's a dummy example:

```javascript
app.directive('myDirective', function(){
  return {
    restrict: 'E',
    scope: {
      directivevariable: '='
    },
    template: 'Hi, {%raw%}{{ directivevariable }}{%endraw%}'
    ...
  }
});
```

As can be seen, we can directly refer to the scope variables from the directive's template. 

But what about if I have a **directive controller** and within that controller I'd like to use the variable defined on the directive scope to invoke some service and finally display the result from that service call onto the directive's template?? **Do I have access to the directive's scope variables from within a directive controller?**

Yes. You do, like this:

```javascript
app.directive('myDirective', function(){
  return {
    restrict: 'E',
    scope: {
      directivevariable: '='
    },
    template: 'Hi, {%raw%}{{ directivevariable }}{%endraw%}',
    controller: function($scope, externalService){
        // accessing the directive's scope variable
        externalService.doSomethingUseful($scope.directivevariable);
    },
    controllerAs: 'vm'
  }
});
```

As you can see, I use the `$scope` to get access to the directive variable. Similarly, I can access a controller's scope variables through the proper "controller as" variable name, in my example `vm`:

```javascript
app.directive('myDirective', function(){
  return {
    restrict: 'E',
    scope: {
      directivevariable: '='
    },
    template: 'Hi, {%raw%}{{ directivevariable }}{%endraw%}. And I am from the controller: {%raw%}{{ vm.controllerVariable}}{%endraw%}.',
    controller: function($scope, externalService){
        var vm = this;
        // accessing the directive's scope variable
        externalService.doSomethingUseful($scope.directivevariable);

        vm.controllerVariable = 'hi from the controller';
    },
    controllerAs: 'vm'
  }
});
```

Here's a Plunker example that illustrates some scenarios:

<iframe src="http://embed.plnkr.co/cfUpHc/preview" width="100%" height="400px"> </iframe>

## Update: bindToController in Angular 1.4

Angular v1.4.x introduced the `bindToController` option which allows to have variables passed to a directive to be bound directly to the corresponding directive controller instance. As such, we can get rid of `$scope`, which is the [suggested practice for moving on towards Angular 2.0](/blog/2015/07/learning-ng-prepare-ng2/).

The example from before can be rewritten to:

```javascript
app.directive('myDirective', function(){
  return {
    restrict: 'E',
    template: [
        '<b>From directive scope:</b> {%raw%}{{ directivevariable }}{% endraw %}<br/>',
        '<b>From directive controller:</b> {%raw%}{{ vm.controllerVariable }}{% endraw %}<br/>',
        '<b>Adapted by directive controller:</b> {%raw%}{{ vm.controllerAdapted }}{% endraw %}'
      ].join(''),
    scope: {
    },
    bindToController: {
      directivevariable: '='
    },
    controller: function(){
      var vm = this;
      vm.controllerVariable = 'Hi, I am from the controller';
      vm.controllerAdapted = vm.directivevariable + '(ctrl adapted)';
    },
    controllerAs: 'vm'
  }
});

```

Here's the updated Plunker:

<iframe src="http://embed.plnkr.co/44RMWO/preview" width="100%" height="400px"> </iframe>

---

**Note:** When I have more complex inline templates I use [Todd Motto's suggestion](http://toddmotto.com/) to use an array:

```javascript
app.directive('myDirective', function(){
  return {
    ...
    template: [
        '<div>',
            '<p>This is a p block within the div</p>',
        '</div>'
        ].join(''),
    ...
  }
});
```

This allows to nicely format the HTML template when having it hard-coded within the JavaScript code. Nevertheless, if it gets more complex, use the `templateUrl` property and an external HTML file.
