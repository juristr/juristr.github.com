---
layout: articles-post
title: "Getting Started with the Next Generation JavaScript"
lead: "..."
show_img_in_detail: false
coverimage: false
tags: ["JavaScript", "ES6"]
---

This is another article about learning ES6. It's my journey of learning it as well as my personal notepad for new stuff I discover along the way. Feel free to suggest new articles or contribute to this article. It's open source and on GitHub :smirk:.

## Tooling

Probably the easiest way to try ES6 now, without having to setup your local workstation is to try it on [jsbin.com](http://jsbin.com).

<figure>
  <img src="/blog/assets/imgs/es6-tutorial/jsbin_es6babel.png">
  <figcaption>Set ES6/Babel on jsbin.com</figcaption>
</figure>

## Block scoping with `let`

The current version of JavaScript, ES5, defines scoping of variables quite different than many of the other popular languages which are currently out there. This might cause some trouble for novice programmers, but not only. ES5 has **function scope** rather than **block scope** as you'd expect.

```javascript
function someFunc(){
  console.log('entering in someFunc');
  if(true){
    var x = 'Hi there';
  }

  console.log(x);
}
```

This is totally legitimate JavaScript code and prints the following to the console:

```
"entering in someFunc"
"Hi there"
```

As you can see, `x` is visible also outside the if block. While the example above is quite clear, this can lead to quite strange and hard to read code. What's the output of the code?

```javascript
var foo = 1;
function bar() {
    if (!foo) {
        var foo = 10;
    }
    console.log(foo);
}
bar();
```

It prints: `10`.

By using `let`, **ES6 allows you to block scope** your variable, just as expected. Let's adapt the above sample, exchanging `var` with `let`:

```javascript
function someFunc(){
  console.log('entering in someFunc');
  if(true){
    let x = 'Hi there';
  }

  console.log(x);
}
someFunc();
```

This time, we getn an error. Obviously (would the Java programmer say).

```javascript
"entering in someFunc"
"error"
"ReferenceError: x is not defined
    at someFunc (fitusuzuhi.js:9:40)
    at fitusuzuhi.js:11:1
    at https://static.jsbin.com/js/prod/runner-3.29.17.min.js:1:13603
    at https://static.jsbin.com/js/prod/runner-3.29.17.min.js:1:10524"
```

<a href="https://jsbin.com/kurayu/1/edit?js,console" class="btn btn-danger">Try it!</a>

## Redefining variables in your code? Not with ES6, bad boy!

Currently you were able to do something like

```javascript
var name = 'Juri';
var name = 'Thomas';

console.log(name);
```

Obviously, "re-using" variables is not something you'd want to do. There are better strategies for saving memory :wink:. Usually this happens by accident but can result in really nasty bugs. Luckily **ES6 will throw an error when you redefine the same variable within the same block**. You have to use `let`, however.

```javascript
let name = 'Juri';
let name = 'Thomas';

console.log(name);
```

The result:

<figure>
	<img src="/blog/assets/imgs/es6-tutorial/jsbin-let-redeclarationerror.png">
	<figcaption>Error when re-defining let variables</figcaption>
</figure>

Instead, **redefining the variable within a subscope works**, and results in overriding the previously defined variable:

```javascript
(function(){
  let name = 'Juri';
  console.log(name);

  function innerFunc(){
    let name = 'Thomas';
    console.log(name);
  }
  innerFunc();
  
})();
```

The output is:

```
"Juri"
"Thomas"
```

<a href="https://jsbin.com/dakiqu/1/edit?js,console" class="btn btn-danger">Try it!</a>

## True constants with `const`

Constants in ES5 were nothing more than simple namping conventions. For instance by prefixing a variable with `const`: `var CONST_PI = 3.141`. Nothing hindered you however to change the value at runtime.

In ES6 finally there's a `const` keyword that does what you'd expect.

```javascript
const pi = 3.141;
pi = 12;
```

It throws an exception at runtime if you try to write on the variable.

<figure>
  <img src="/blog/assets/imgs/es6-tutorial/const-error.png">
  <figcaption>Error when trying to set <code>const</code> fields</figcaption>
</figure>

Watch out however, you can also assign objects to const variables. What is being assigned is the object reference, though. Hence, you cannot assign another object, but you can definitely change the object's properties.

```javascript
const myObjConst = {
  name: 'juri'
};

// totally working as you don't
// change the obj reference
myObjConst.name = 'Thomas';

// this will break
myObjConst = { name: 'Thomas' };
```

<a href="https://jsbin.com/xanede/2/edit?js,console" class="btn btn-danger">Try it!</a>

The **scope of const variables is block scope**, which totally makes sense.

## `...` operator: spread and rest

### spread

Do you remember about `Function.prototype.apply` and `Function.prototype.call`. Not sure how many times I googled for the "apply vs. call" article as I couldn't remember which of the two accepts the array and which one the param series.

`apply` was commonly used to forward an unknown number of function arguments to another function.

```javascript
var wrapper = function(){
  return anotherFunction.apply(null, arguments);
}
```

There are different reasons why one would do this which I wouldn't want to detail right now. What's imporant here is that the above code is everything else than readable. One immediately things "what does this apply do?" and "where does 'arguments' come from?". Overall, it's hard to understand by a non-JavaScript experienced developer.

The spread operator allows to write this in a much more elegant way:

```javascript
var wrapper = function(...args){
  return anotherFunction(...args);
}
```

Now it's clear that we're invoking function `anotherFunction` and that we pass along a variable number of arguments that has been passed in by someone else.

Spread is not only useful for function calls, but also when **manipulating arrays**. Here's a simple scenario: do you know how to concat two arrays in JavaScript?? Like, having one array and pushing the elements of another one?

```javascript
// ES5 code
var names = [
  'Juri',
  'Steffi',
  'Thomas'
];

var anotherSetOfNames = ['Tom', 'Jack'];
names.push.apply(names, anotherSetOfNames);

// you get
// [ 'Juri',  'Steffi',  'Thomas', 'Tom', 'Jack' ];
```

The ES6 code:

```javascript
let names = [
  'Juri',
  'Steffi',
  'Thomas'
];

//adding values
let anotherSetOfNames = ['Tom', 'Jack'];
names.push(...anotherSetOfNames);
```

So much more readable, isn't it?

<a href="https://jsbin.com/hagoku/6/edit?js,console" class="btn btn-danger">Try it!</a>

You could even do this:

```javascript
let a1 = [1, 4, 5, 2, 3];
let a2 = [1, 2, ...a1, 3, 44, 2]
```

### rest

No, it has nothing to do with REST (Representational State Transfer). The rest parameter is the last one in a sequence of function arguments that captures the "rest of the args".

```javascript
function myFunction(a, b, ...args){
  //...
}
```

I'm not even going to detail how to do this in ES5 (let's forget about the past :wink:). It had to do with "slicing" from the `arguments` value the number of args passed to the current function.

