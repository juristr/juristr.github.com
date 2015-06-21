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
