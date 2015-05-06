---
layout: post
title: "Learning Angular: Unit Testing $watch expressions"
lead: "There's a difference in writing unit tests for controllers using the $scope syntax vs. those using the 'controller as' syntax."
show_img_in_detail: true
coverimage: false
category:
tags: ["JavaScript", "learning-ng", "Angular.js", "testing"]
reposts: ["http://dotnet.dzone.com/articles/learning-angular-unit-testing", "http://www.webcodegeeks.com/javascript/angular-js/learning-angular-unit-testing-watch-expressions/"]
---

Today I wanted to write a unit test for a watch expression on my controller. What seemed quite obvious initially, turned out to be quite nasty. Anyway, thx to a nice community member on the Angular IRC, I was able to quickly resolve the issue. So, here's the story.

{% include ng-series.html %}

## Background

The new Angular best practices suggest to use the - what they call - "controller as" syntax. So, instead of writing the controller like

```javascript
module.controller('MainCtrl', function($scope){
    $scope.someScopeVariable = 'Hello, world!';
});
```

..you should instead write it like this.

```javascript
module.controller('MainCtrl', function(){
    var vm = this; // this is a best practice approach
    vm.someScopeVariable = 'Hello, world!';
});
```

On the HTML side, you normally include the controller using a similar syntax.

```html
<div ng-controller="MainCtrl as vm">
    {%raw%}{{ vm.someScopeVariable }}{%endraw%}
</div>
```

## Problem

Now consider we have some watch expression defined in the controller, which we'd like to test.

```javascript
app.controller('MainCtrl', function($scope) {
  var vm = this;
  var previousSelection = null;
  
  vm.currentSelection = null;
  
  $scope.$watch('vm.currentSelection', function(newVal, oldVal){
    // we'd like to test THIS LINE HERE
    previousSelection = oldVal;
  });
  
  vm.changeSelection = function(shouldRevert){
    if(shouldRevert){
      vm.currentSelection = previousSelection;
    }
  };
});
```

Note that I'm injecting `$scope` which might make it appear like I'm using the $scope controller syntax. In reality it's for being able to register the `$watch`.  
Also, the above is a simple demo, which, slightly modified, can be useful for reverting a user selection on a dropdown for instance, using `ng-change`.

Anyway, if we want to the the above, we could write the following test scenario.

```javascript
describe('Testing $watch expressions', function() {
  var $scope = null;
  var ctrl = null;

  //you need to indicate your module in a test
  beforeEach(module('plunker'));

  describe('using the controller as syntax', function() {

    beforeEach(inject(function($rootScope, $controller) {
      $scope = $rootScope.$new();

      ctrl = $controller('MainCtrl', {
        $scope: $scope
      });

    }));

    it('test using $digest', function() {
      // make an initial selection
      ctrl.currentSelection = 'Hi';
      $scope.$digest();

      // make another one
      ctrl.currentSelection = 'New';
      $scope.$digest();

      // simulate a ng-change which should revert to the previous value
      ctrl.changeSelection(true);

      expect(ctrl.currentSelection).toEqual('Hi');
    });

  });

});
```

Note that I'm using `$scope.$digest()` after setting the `currentSelection` on the controller. This is needed to trigger a "digest cycle" which invokes the `$watch` expression I've defined. Unfortunately it **doesn't work!**. The watch expression gets invoked, but `newVal` and `oldVal` are both undefined.

Instead, if I reverted my controller to the "old" $scope syntax..

```javascript
app.controller('MainCtrl', function($scope) {
  var previousSelection = null;
  
  $scope.currentSelection = null;
  
  $scope.$watch('currentSelection', function(newVal, oldVal){
    previousSelection = oldVal;
  });
  
  $scope.changeSelection = function(shouldRevert){
    if(shouldRevert){
      $scope.currentSelection = previousSelection;
    }
  };
});
```

...and adjusted my tests accordingly:

```javascript
 it('test using $digest', function() {
    // make an initial selection
    $scope.currentSelection = 'Hi';
    $scope.$digest();

    // make another one
    $scope.currentSelection = 'New';
    $scope.$digest();

    // simulate a ng-change which should revert to the previous value
    $scope.changeSelection(true);

    expect($scope.currentSelection).toEqual('Hi');
});
```

..then the $watch expression got called with the correct value and the tests passed as expected.

Alternatively, I could leave the "controller As" syntax of before, and instead of calling `$scope.$digest()` in my tests, call `$scope.$apply('...')`:

```javascript
it('test using $scope.$apply(...)', function() {
    // make an initial selection
    $scope.$apply('vm.currentSelection="Hi"');

    // make another one
    $scope.$apply('vm.currentSelection="New"');

    // simulate a ng-change which should revert to the previous value
    ctrl.changeSelection(true);

    expect(ctrl.currentSelection).toEqual('Hi');
});
```

That worked as well. **What's wrong here??**

I posted on the [IRC channel](http://echelog.com/logs/browse/angularjs/1416870000)..

<pre class="nohighlight">
[14:32:52] <juristr> Interesting, when unit testing $watch expressions it makes a difference whether you used the "controller as" syntax or not. http://plnkr.co/edit/MVOgfmXVG1MzUg6nfM6W?p=preview
[14:34:01] <sacho> of course - watch expressions watch on the scope.
[14:36:46] <juristr> sacho: yep, but by executing $scope.$digest() in the tests I'd expect that the $watch expression is executed...which, btw it is, but not with the correct values
[14:37:17] <juristr> sacho: Instead, it seems that in that case you have to do something like $scope.$apply('someScopeVar = "some new value"');
[14:37:26] <juristr> then it fires as well, but with the passed new value
[14:37:35] <juristr> that's kinda odd..
[14:38:09] <juristr> while, when using the $scope syntax, I can simply call $scope.$digest() and everything works as expected...
[14:38:13] <sacho> huh?
...
[14:46:08] <sacho> juristr, well, you're not placing the controller on the scope, anywhere.
[14:46:26] <sacho> so you're not using controllerAs.
</pre>

**Oh..!** The problem is in the `beforeEach`. While I was assuming the following lines attach the controller to the `$scope`

```javascript
beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();

    ctrl = $controller('MainCtrl', {
        $scope: $scope
    });
}));
```

..which they do...but the controller/scope is not attached on the `vm` property, which the `$watch` expression expects...

Thus, changing to...

```javascript
beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();

    ctrl = $controller('MainCtrl', {
        $scope: $scope
    });

    // THIS was missing
    $scope.vm = ctrl;
}));
```

..makes everything work as expected, even when using `$scope.$digest()`.

You can play around with it by yourself in this Plunkr.

<iframe src="http://embed.plnkr.co/MVOgfmXVG1MzUg6nfM6W/preview" width="100%" height="400px"> </iframe>

## Conclusion

This is actually quite tricky and easy to mistake, especially when you look at test examples which are running upon code that uses the somewhat older "scope syntax". I'm not yet sure I wrapped my head around this issue yet...if I have a better explanation I'll update the post...

To summarize:

- use `$scope.$apply('theScopeVariable = "new value"')`
- pay attention to the initialization of the controller in your unit test. If you're using the controller as syntax, make sure you set it accordingly (see example before).
