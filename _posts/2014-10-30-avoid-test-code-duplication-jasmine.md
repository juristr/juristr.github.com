---
layout: post
title: "Avoid test code duplication in Jasmine tests"
lead: "Treat your test code like your production code"
show_img_in_detail: true
coverimage: false
category:
tags: ["JavaScript", "testing", "Angular.js"]
reposts: ["http://www.webcodegeeks.com/javascript/avoid-test-code-duplication-in-jasmine-tests/"]
---

Test code has to be treated like production code. Obviously we cannot charge the customer for it, it's something that helps us developers to make sure we keep our codebase healthy, which ultimately is the responsibility we have towards our customers. Thus we need to apply the same best practices principles as we do for our production code, where, code duplication is evil.

Let's quickly take a look at some Angular code and the corresponding Jasmine test. I have the following Angular Provider which holds some functionality for handling the application menu.

```javascript
function menuProvider(){

    // expose the provider contract
    this.addMenuEntry = addMenuEntry;
    ...

    // expose the service contract
    this.$get = function(){
        var service = {
            addMenuEntry: addMenuEntry
            ...
        }
        return service;
    };

    ///////////

    function addMenuEntry(newEntry){
        ...
    }
}
```

It's not really important, but to understand the context, in Angular you have "Providers" and "Services". The main difference is their availability during the application lifecycle (i.e. the config vs run phase). So basically if you want to have them available during both phases, you'd do something similar as I did above, namely to expose the exact same contract (or part of it) as a provider and as a service.

Obviously, I'd like to test the availability and correct functioning of this exposed contract on both, the provider and the service class. **This leads to duplicated tests**. Let's see this on the example of this excerpt from a Jasmine test.

```javascript
describe("The Menu's", function(){

    describe('provider interface', function(){
        var provider;

        beforeEach(function(){
            provider = /* Angular code to inject the provider */;
        });

        it('should allow to add new menu entries', function(){
            provider.addMenuEntry({
                title: 'Menu title',
                url: 'www.google.com'
            });

            /* assertion code here */
        });

    });

    describe('service interface', function(){
        var service;

        beforeEach(function(){
            service = /* Angular code to inject the service */
        });

        it('should allow to add new menu entries', function(){
            service.addMenuEntry({
                title: 'Menu title',
                url: 'www.google.com'
            });

            /* assertion code here */
        });

    });
});
```

## Refactoring duplications

Guess you clearly see the duplication. On the Pivotallabs site there's a blog post "[DRYing up Jasmine Specs with Shared Behavior](http://pivotallabs.com/drying-up-jasmine-specs-with-shared-behavior/)" which describes the possibility to factor out your `describe` statement into a separate function:

```javascript
function sharedTests(someParams){
    describe(function(){
        ...
    });
}
```

You can then use that function simply by invoking it within your test code:

```javascript
describe('My functionality', function(){
    ...
    sharedTests(...);
})
```

This works like charm, with **one exception**. Usually factoring out is useful to be able to parameterize the `describe`, in my case to use the same tests, the first time passing in a `provider` instance and then the `service` one. Like..

```javascript
describe("The Menu's", function(){

    describe('provider interface', function(){
        var provider;

        beforeEach(function(){
            provider = /* Angular code to inject the provider */;
        });

        // this is the line of interest!
        executeSharedTests(provider);
    });

    describe('service interface', function(){
        var service;

        beforeEach(function(){
            service = /* Angular code to inject the service */
        });

        // this is the line of interest!
        executeSharedTests(service);
    });

    function executeSharedTests(instance){
        ...
    }
});
```

**This doesn't work**, for the simple reason that the `beforeEach` is executed after the `executeSharedTests(...)` is being invoked, thus passing in `undefined`.

To **solve this problem** you can pass in a constructor function which creates the object lazily when the test is effectively executed.

```javascript
describe("The Menu's", function(){
    
    describe('service interface', function(){

        function createInstance(){
            return /* Angular code to inject the service */
        }

        executedSharedTests(createInstance);
    });

    executedSharedTests(createInstanceFn){
        describe('when adding a new menu entry', function(){
            var subjectUnderTest;

            beforeEach(function(){
                //create an instance by invoking the constructor function
                subjectUnderTest = createInstanceFn();
            });

            it('should allow to add new menu entries', function(){
                ...
            });
        });
    }
});
```

## Conclusion

So, the whole refactored code now looks like this:

```javascript
describe("The Menu's", function(){

    describe('provider interface', function(){
        function createInstance(){
            return /* Angular code to inject the provider */
        }

        executeSharedTests(createInstance);
    });

    describe('service interface', function(){
        function createInstance(){
            return /* Angular code to inject the service */
        }

        executeSharedTests(createInstance);
    });

    executedSharedTests(createInstanceFn){
        describe('when adding a new menu entry', function(){
            var subjectUnderTest;

            beforeEach(function(){
                //create an instance by invoking the constructor function
                subjectUnderTest = createInstanceFn();
            });

            it('should allow to add new menu entries', function(){
                subjectUnderTest.addMenuEntry({
                    title: 'Menu title',
                    url: 'www.google.com'
                });

                /* assertion code here */
            });
        });
    }
});
```

## Related articles

- [Jasmine - An Introduction](/blog/2012/08/jasmine---an-introduction/)
