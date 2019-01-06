---
title: 'Learning Angular: Testing $q promise resolves with Sinon and Jasmine'
lead: See how you can stub an async call and make it return a resolved promise
show_img_in_detail: true
coverimage: false
category: null
categories:
  - Angular.js
  - JavaScript
  - testing
date: 2015-06-30T00:00:00.000Z
comments: true
url: /blog/2015/06/learning-ng-testing-promises
type: post
---

{{< postad >}}

This article shows a brief example on how to properly mock and resolve a `$q` promise from within a Jasmine unit test.



## Problem

I have a service, let's call it `consumerService` which uses another service `personService` to make an asynchronous call. In the case of a successful response, it calls a method on a 3rd service, called `helloWorldService`. What I'd like to test is the fact that the `helloWorldService` gets called upon a successful call of the `personService`.

Roughly, the code looks like this:

```javascript
app.factory('consumerService', function(personService, helloWorldService){
  var service = {
    doSomething: doSomething
  };
  return service;
  
  function doSomething(){
    personService.get()
      .then(function(){
        // I want to test this one here
        helloWorldService.sayHello();
      })
  }
  
});
```

To test it, I need to stub the `personService.get()` function s.t. it positively resolves the promise it returns.

## Solution

For stubbing, we can use [Sinon.js](http://sinonjs.org/). The first param is the object on which to operate upon, then the name of the function to stub and as the 3rd param I pass in the function that gets called instead of the original one.

```javascript
sandbox.stub(personService, 'get', function(){
    return $q.when();
  });
```

Note, `return $q.when()` automatically creates and returns a resolved promise. [This article goes a bit deeper](http://www.codelord.net/2015/09/24/$q-dot-defer-youre-doing-it-wrong/) on promises, totally worth checking out.

Then we also stub the `helloWorldService.sayHello` function to be able to listen to the number of invocations.

```javascript
...
sandbox.stub(helloWorldService, 'sayHello');
```

Then invoke the SUT (subject under test):

```javascript
...
consumerService.doSomething();
```

Finally, the expectations:

```javascript
$scope.$apply();
expect(helloWorldService.sayHello.calledOnce).toBeTruthy();
```

What does that `$scope.$apply()` do there?? **That's the important piece** actually. If you don't call it, your promise won't get resolved. The Angular documentation emphasizes this: [https://docs.angularjs.org/api/ng/service/$q](https://docs.angularjs.org/api/ng/service/$q).

So, all wrapped up (highlighting the important pieces):

```javascript
var sandbox;
var $scope;
...

describe('using the person service', function() {

  beforeEach(inject(function($rootScope, _consumerService_, _personService_, _helloWorldService_) {
      sandbox = sinon.sandbox.create();
      $scope = $rootScope.$new();
      ...
    }));
    
    afterEach(function(){
      sandbox.restore();
    });

    ...
    
    it('should properly resolve the promise', inject(function($q) {
      sandbox.stub(personService, 'get', function(){
        return $q.when();
      });
      sandbox.stub(helloWorldService, 'sayHello');
      
      consumerService.doSomething();
      
      // THIS IS THE IMPORTANT CALL HERE
      $scope.$apply();
      
      expect(helloWorldService.sayHello.calledOnce).toBeTruthy();
    }));
});
```

You can try it live in the Plunkr below.

<iframe src="http://embed.plnkr.co/HRCc5BJ8IuuK5IEZnoKH/preview" width="100%" height="400px"> </iframe>
