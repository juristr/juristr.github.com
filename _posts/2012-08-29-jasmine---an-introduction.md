---
layout: post
title: "Jasmine - An Introduction"
description: ""
category: bliki
tags: []
comments: true
---
{% include JB/setup %}

This page is the result of taking notes from the session about Jasmine by [Davis W. Frank](http://twitter.com/dwfrank) at this years Fluent Conference in San Francisco. Unfortunately I wasn't there, but O'Reilly was so kind to give me access to the [amazing video compilation of the sessions](http://blog.js-development.com/2012/08/fluent-conference-javascript-beyond_29.html).

## Intro
All the code samples of the talk are available [in this Gist here](https://gist.github.com/2669482). I've written them down here as well, so you might simply proceed to get through them.

## Why to test?
Personally, I think this question shouldn't be made any more nowadays, but still, that's what Davis W. Frank mentioned in his talk:

- fix "broken windows"
- extract common behavior (without fear of breaking something)
- swap dependencies
- refactor as you need

> Fear not! I am using Jasmine to refactor JavaScript safely  
> (by an unknown Twitter user)

## Setup Jasmine and Useful links
Here are some useful links to get started:

- Jasmine GitHub repo: [pivotal.github.com/jasmine](http://pivotal.github.com/jasmine)
- [tryjasmine.com](http://tryjasmine.com/)
- [Jasmine User Group](https://groups.google.com/forum/?fromgroups#!forum/jasmine-js)

## A first Jasmine Test: BallSpec.js
A first example of a Jasmine test:  

    describe("Ball", function () {
        var ball;

        before(function() {
            ball = new Ball();
        });

        it("should start deflated", function() {
            expect(ball.isFull()).toEqual(false);
        });
    });

The according `Ball.js´ looks like this

    function Ball() {
      var self = this;

      var full = false;

      self.inflate = function() {
        full = true;
      };

      self.isFull = function() {
        return full;
      };

      return self;
    }

## Matchers
Jasmine has the following "matchers":

- `toBe()`
- `toBeTruthy()`
- `toBeDefined()`
- `toMatch()`
- `toContain()`
- `toBeCloseTo()`
- `toThrow()`
- ...

A detailled description can be found on the [GitHub repo wiki](https://github.com/pivotal/jasmine/wiki/Matchers).

## Spies
..it also has **Spies** which is how they do test doubles in Jasmine, basically thy include mocks, stubs, fakes or doubles.

Here's an example of spying on something

    describe("Game", function() {
        var game, ball;

        beforeEach(function(){
            ball = new Ball();
            spyOn(ball, "inflate").andCallThrough();
            game = new Game();
        });

    });

The describes can even be nested (infinitely), so for instance

    describe("Game", function(){
        ...
        describe("with a not-full ball", function(){
            beforeEach(function(){
                game.prepare(ball);
            });

            it("should inflate before play", function(){
                expect(ball.inflate).toHaveBeenCalled();
            });
        });
    });

`expect(ball.inflate).toHaveBeenCalled();` here verifies that the inflate function has actually been called. This is possible because before we added a spy on the `inflate` function, remember:

    spyOn(ball, "inflate").andCallThrough();

The `Game.js` itself looks like

    function Game() {
        this.prepare = function(ball){
            if(ball.isFull()){
                return;
            }

            ball.inflate();
        }
    }

## The Mock Clock
This mechanism is used to test calls to `setTimeout()` or `setInterval()`. Jasmine basically overwrites these functions and makes them synchronous s.t. they don't tick until (in the test) one explicitly gives them the command to do so. 

For example:

    describe("Manually ticking the Jasmine Mock Clock", function() {
      var timerCallback;

      beforeEach(function() {
        timerCallback = jasmine.createSpy('timerCallback');
        jasmine.Clock.useMock();
      });

      it("causes a timeout to be called synchronously", function() {
        setTimeout(function() {
          timerCallback();
        }, 100);

        expect(timerCallback).not.toHaveBeenCalled();
        jasmine.Clock.tick(101);
        expect(timerCallback).toHaveBeenCalled();
      });
    });

Note the creation of the timer "mock" in the `beforeEach` and then the explicit command `jasmine.Clock.tick(101)` to tell the timers to tick.

> **Note** also the line `expect(timerCallback).not.toHaveBeenCalled()`. Inside a chaining every expectation can be _negated_ by adding the `.not.` in the chain.

## Jasmine Ajax
This is not part of the Jasmine core but is available on [GitHub](https://github.com/pivotal/jasmine-ajax). It does a similar thing as the "Mock Clock" does with timers, just that it applies to ajax calls. It stubs the default `xhr` object to avoid making real ajax calls as that's not what we want when running automated (unit) tests.

For example:

    describe("When using the Jasmine Ajax Mock", function() {
      var onSuccess, onComplete, onFailure, request;

      beforeEach(function() {
        onSuccess = jasmine.createSpy('onSuccess');
        onComplete = jasmine.createSpy('onComplete');
        onFailure = jasmine.createSpy('onFailure');
        
        jasmine.Ajax.useMock();

        jQuery.ajax({
          url:      "example.com/someApi",
          success:  onSuccess,
          complete: onComplete,
          error:    onFailure
        });
        request = mostRecentAjaxRequest();
      });

      it("prevents the call from leaving your system", function() {
        expect(request.url).toEqual("http://example.com/someApi");    
      });

    });
    
It is also possible to assert on a (here) successful response..

    describe("When using the Jasmine Ajax Mock", function() {
      var onSuccess, onComplete, onFailure, request;
      
      ...

      describe("with a successful response", function() {
        beforeEach(function() {
          var successResponse = {
            status: 200,
            responseText: "w00t!"
          };      
          request.response(successResponse);
        });

        it("should call the success callback", function() {
          expect(onSuccess).toHaveBeenCalledWith("w00t!");
        });

        it("should call the complete callback", function() {
          expect(onComplete).toHaveBeenCalled();
        });
      });

    });

..or a failed response

    describe("When using the Jasmine Ajax Mock", function() {
      var onSuccess, onComplete, onFailure, request;
      
      ...

      describe("with a successful response", function() {
        beforeEach(function() {
          var failureResponse = {
            status: 500,
            responseText: "Doh!"
          };      
          request.response(failureResponse);
        });

        it("should call the failure callback", function() {
          expect(onFailure).toHaveBeenCalledWith("Doh!");
        });

        it("should call the complete callback", function() {
          expect(onComplete).toHaveBeenCalled();
        });
      })  

    });

It is important to understand that the ajax call is mocked out at the very last possible moment, therefore the response here that is is "stubbed" looks nearly like the one a server would send back down to the client.

    var failureResponse = {
        status: 500,
        responseText: "Doh!"
    }; 

## Async
For ajax and the timeout functions the mocks should be used. Asyncs may be useful for dealing with nodejs for instance.

## Q&A

### Recommendations to test multiple browsers
Selenium web drivers might be an option, basically to run the tests and then to extract the results from the DOM.

### How do you organize your files?
Dependent on project. Normally the tests folder tree structure should reflect the one of the source files. This is usually comfortable for easily finding the according source file and vice versa.