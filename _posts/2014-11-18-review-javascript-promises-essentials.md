---
layout: post
title: "JavaScript Promises Essentials"
postimg: "/blog/assets/imgs/javascript_promises_essentials_cover.png"
show_img_in_detail: true
coverimage: false
category: 
tags: ["JavaScript", "book review"]
---

JavaScript is asynchronous by definition which is what makes many server-side developers struggle initially. Many even try to avoid asynchronism as much as they can rather than to embrace it. Others end up in a callback mess. That's where promises come into play!

The following code is a typical piece of JavaScript code. Some async function is invoked, passing the implementation of a function callback as a hook point for processing the data once it is retrieved.

```javascript
// call getData which asynchronously loads the data from somewhere
getData(function(result){
    // do something meaningful with result
});
```

While this example looks nice and simple, it can quickly grow into a complete mess. Assume for instance you have to fetch some data from different backend APIs for then processing them. You could write the code like this:

```javascript
getPeople(function(peopleResult){
    getAddresses(function(addressResult){
        // use peopleResult and addressResult for further elaboration
    });
});
```

The issues with this code:

- `addresses` doesn't depend on `people` in our example: still, they're retrieved in sequence rather than in parallel.
- the nesting looks messy and is hard to read.

Promises can help here.

> A promise represents the eventual result of an asynchronous operation. <cite>Promises/A+ specification (https://promisesaplus.com/)</cite>

For instance take [jQuery's Promise API also known as Deferred](http://api.jquery.com/jquery.deferred/). The code shown before could be rewritten as:

```javascript
var people = getPeople();
var addresses = getAddresses();

$.when(people, addresses).done(function(peopleResult, addressesResult){
    // elaborate the data
});
```

It allows to nicely flatten the otherwise nested structure of calls. Besides synchronizing different async calls, the capability of chaining is another extremely powerful concept, allowing to convert this..

```javascript
$("#testInpt").click(function () {
    firstCallBack(function (param) {
       getValues(param, function (result) {
           alert(result);
        }); 
    });
});
```

into this...

```javascript
$("#testInpt").clickPromise()  // promise-returning function
   .then(firstCallBack)
   .then(getValues)
   .then(alert);
```

Note how the result of one call is passed as argument to the next one.

## The book

PacktPub just released **[JavaScript Promises Essentials](http://bit.ly/1tVPjOT)** where Rami Sarieddine takes a deeper look at the Promise API by addressing and using promises as defined in the specification of [Promise/A+](http://promisesaplus.com).

From the book: 

> If we list the properties that make promises easier to work with, they will be as follows:
>
- It is easier to read as with the usage of cleaner method signatures
- It allows us to attach more than one callback to a single promise
- It allows for values and errors to be passed along and bubble up to the caller function
- It allows for chaining of promises

The book covers quite everything a developer needs for adding Promises to his toolbox. Here's an excerpt of the table of contents, just to give you an idea.

1. JavaScript Promises - Why Should I Care?
1. The Promise API and Its Compatibility
1. Chaining of Promises
1. Error Handling
1. Promises in WinJS
1. Putting It All Together - Promises in Action

After introducing the general concept of a Promise and compatibility issues, it starts to treat the nitty gritty of Promises, showcasing concepts like chaining and exception handling. It also takes a look at how they are realized in WinJS, the Microsoft's JavaScript library for developing Windows 8 Metro applications.

**My favorite part:** when the author puts all of the concepts together at the end of the book and builds a Promise library from scratch. This really gives you the opportunity to look inside, to experience the design issues and inner workings.

## Conclusion

Promises should definitely be part of every developer's toolkit. If you feel you didn't yet grasp them, go and do some reading or even better, some walk through tutorials. 

[The book](http://bit.ly/1tVPjOT) definitely covers everything you need to know, not by explaining a specific Promise library but rather by giving you the general understanding of how a Promise is intended to work. From there it'll be quite easy to understand the various implementations in jQuery.Deferred, RSVP.js, Q.js or how they're all being called.

_(Btw, once you get how promises work, you can take a look at ES6 generators ;) )_

### Further links

- [PacktPub: JavaScript Promises Essentials](http://bit.ly/1tVPjOT)
- [HTML5Rocks - JavaScript Promises](http://www.html5rocks.com/en/tutorials/es6/promises/)


