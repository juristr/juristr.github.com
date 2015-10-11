---
layout: post
title: "Introduction to Reactive Programming"
lead: "Getting started with reactive programming"
show_img_in_detail: true
coverimage: false
category:
tags: []
---

Article: [The introduction to Reactive Programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)

## Why use it?

> Allows specify dynamic behaviour of a value completely at the time of declaration.

How's that meant? Well, if we define

```javascript
var a = 3;
var b = 10 * a;

// if we now change a
a = 4;
console.log(b);
```

What's the value of b? Well, 30, right? `b` has been calculated once and that's it. It **does not specify the dynamic behaviour of `b` over time** but rather the value is computed once and that's it. What we'd do is probably to create a function that calculates `b` and invoke that function every time we need b.

In reactive programming we have the possibility to specify the dynamic behaviour directly at declaration time.

```javascript
var streamA = Rx.Observable.of(3);
var streamB = streamA.map(a => 10 * a);

streamB.subscribe(b => console.log(b));
```

What's of major importance though, is that also the dynamic behaviour of `a` has to be defined completely, it **cannot be changed later**.

## What is it

- programming with event streams
- event stream: sequence of events over time, just like an async array

A very nice example of using functional programming style to process an array.

```javascript
var source = Rx.Observable.interval(400).take(9)
        .map(i => ['1', '3', 'foo', '6', 'bar', '10', '22'][i]);

var result = 
        source
          .map(x => parseInt(x))
          .filter(x => !isNaN(x))
          .reduce((x,y) => x + y);
      
result.subscribe(x => console.log(x));
```

Try it yourself: https://jsbin.com/rixuya/edit?js,console

---

Another interesting example of capturing double-click events on a DOM element:

```javascript
var button = document.querySelector('.button');
var label = document.querySelector('h4');

// create the event stream
var clickStream = Rx.Observable.fromEvent(button, 'click');

// create a dbl-click event stream
var dblClickStream = 
        clickStream
					// group all events within 250 ms
          .buffer(() => clickStream.throttle(250))
					// filter out the array length property -> 2 events means dbl click
          .map(arr => arr.length)
					// filter only those of length 2
          .filter(len => len === 2);

dblClickStream.subscribe(event => {
  label.textContent = 'double click occured';
});

dblClickStream
    .throttle(1000)
    .subscribe(() => {
      label.textContent = '-';
    });
```

https://jsbin.com/gofiho/edit?js,output

---

## How to use it in practice

Wrap a request/response inside an observable.

```javascript
var requestStream = Rx.Observable.just('https://api.github.com/users');

requestStream.subscribe(requestUrl => {
	var responseStream = Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));

	responseStream.subscribe(response => {
		console.log(response);
	});
});
```

> Observables can do everything a promise can do.


> Promises are a simplified version of an event stream. They can only have one value/event, success or error. On the other side observable can have multiple events and thus are more powerful.

The problem with the above example is the nesting of the observables which reminds very much the callback hell.

```javascript
var requestStream = Rx.Observable.just('https://api.github.com/users');

// metastream: observable of observable
var responseStream = requestStream
			.map(requestURL => Rx.Observable.fromPromise(jQuery.getJSON(requestUrl)));
```

Note, this is **mapping to an observable**, to something that happens later in time. This is called **meta-stream**.

To solve this `flatMap` can be called. It is a bit like the `.then(..)` function on promises.

```javascript
...
var responseStream = requestStream
				.flatMap(requestUrl => Rx.Observable.fromPromise(jQuery.getJSON(requestUrl)));

responseStream.subscribe(response => {
	console.log(response);
});
```

Try it: https://jsbin.com/lohewi/edit?js,console

## Rendering on the DOM

Rendering to the DOM can be done by exchanging the `console.log` statement with some rendering function.

```javascript
...
var someUserStream = responseStream.map(listUser -> listUser[0]); // gives 1st user

someUserStream.subscribe(user => {
	// manipulate the DOM
});
```

## New requests from refresh clicks

`.merge(..)` can be used to merge two streams, thus a subscribe will get events from both of them.

```
-----------a-----b----------->
s---------------------------->
					merge()
s----------a-----b----------->
```

## Initial values

```javascript
...
var someUserStream = responseStream
		.map(listUser -> listUser[0])
		.startWith(null);
...
```

This allows to specify the value to start with. Remember, we should specify the complete dynamic behaviour of a value at declaration time.

What `startWith` does is to emit the value right in the beginning:

```
-------u--------->
	startWith()
N------u--------->
```

## Sharing network requests

```javascript
var responseStream = requestStream
				.flatMap(requestUrl => {
					return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
				})
				.shareReplay(1);
```

In this way multiple subscribers will share the same inner subscription. The "replay" is because late subscribers, i.e. coming seconds later, won't do another request, but will get the events replayed.

