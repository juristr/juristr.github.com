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

## Destructuring assignment

Destructuring assignment is the process of assigning the values of an iterable to variables.

### Array Destructuring

```javascript
let juri, thomas;
let myArray = ['Juri', 'Thomas'];

// destructuring
[juri, thomas] = myArray;
```

Executing this code, `juri` and `thomas` will get the according values from `myArray` assigned.

<a href="https://jsbin.com/ripifek/3/edit?js,console" class="btn btn-danger">Try it!</a>

By **combining the destructuring with the ... operator** you get even more interesting use cases (also commonly known from functional programming languages). Extracting the head or tail of a list gets extremely easy.

```javascript
let head, tail;
let names = ['Juri', 'Steffi', 'Thomas', 'Susi'];

[head, ...tail] = names;
// Output:
// head = ['Juri']
// tail = ['Steffi', 'Thomas', 'Susi'];
```

Try it: https://jsbin.com/megotu/3/edit?js,console.

Having this, and with a bit of recursion, a sum function could be defined like this:

```javascript
function sum(numbers){
  let head, tail;
  [head, ...tail] = numbers;

  if(numbers.length > 0){
    return head + sum(tail);
  } else {
    return 0;
  }
}
```

Try it: https://jsbin.com/roniyu/2/edit?js,console

There's more, you can **also ignore values when applying** the destructuring operator.

```javascript
let head, tailMinusOne;
let names = ['Juri', 'Steffi', 'Thomas', 'Susi'];

[head, , tailMinusOne] = names;
```

### Object destructuring

Similar as with arrays, destructuring works with objects as well. Even the syntax is similar:

```javascript
let name, age;
let person = {
  name: 'Juri',
  age: 30 //damn...I'm not yet accustomed to write a 3 in :/
};

({name, age} = person);
```

The only thing that might seems strange is the fact you have to wrap the expression with braces.

Try it: https://jsbin.com/sudofa/3/edit?js,console

Now, in the example above **the variable names have to match the ones from the object**. That might not always be the case. But ES6 has a solution.

```javascript
let x, y;
({name:x, age:y} = { name: 'Juri', age: 30 });
```

You can make it even shorter (not sure that's what you'd want):

```javascript
let {name: x, age: y} = { name: 'Juri', age: 30 };
```

### Default values

What if a given value is not present while destructuring? Apply a default!

```javascript
let a, b;
var numbers = [1];

[a,b=0] = numbers;

// Result: b doesn't have a corresponding value, so it'll be set to 0;
```

I'm even more excited about default values for function arguments:

```javascript
function myFunction(a = 0, b = 1, c = 2){
  //...
}
```

Currently you had to write it like

```javascript
function myFunction(a, b, c){
  a = a || 0;
  b = b || 1;
  c = c || 2;

  // ...
}
```

Another interesting use case is to use **default values together with object destructuring**.

```javascript
// ES5
function printPersonInfo(person){
  var name = (person && person.name) || '(not defined)';
  var age =  (person && person.name) || 18;

  console.log(name, age);
}
printPersonInfo({
  name: 'Juri',
  age: 30
  });
```

This checking is cumbersome, and gets even more cumbersome when having nested objects.

```javascript
// ES6
function printPersonInfo({name = "(not defined)", age = 18 } = {}) {
  console.log(name, age);
}

printPersonInfo({
  name: 'Juri',
  age: 30
});
//"
```

https://jsbin.com/nedumu/5/edit?js,console


### Links

- [MDN: Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

## Arrow functions

(to be written)

## Symbols

Symbols are a fundamental concept introduced in ES6 with the main purpose of using them as object property keys to prevent naming collisions. Read ahead and you'll understand why.

```javascript
let s = Symbol();
```

<p class="notice fact">
 The main purpose of Symbol is to serve as property keys for objects to prevent naming collisions.
</p>

What you need to know

```javascript
let a = Symbol('some key');
let b = Symbol('some key');

console.log(a === b); // prints false

// throws exception; cannot use "new" operator
let c = new Symbol();

// logs "symbol"
console.log(typeof(a));
```

So when are we going to use symbols? Apparently, they have mainly been introduced as keys for object properties and thus to avoid collisions.

```javascript
let x = Symbol();
let obj = {
  [x]: 'Juri'
}

console.log(obj[x]);
```

As you can see, I make use of the concept of **computed properties** mentioned before. To access the property value again, the square brackets `[]` have to be used. It would not work if you write it like `obj.x`.

Try it: https://jsbin.com/rinima/1/edit?js,console

Another nice feature is the `Symbol.for(..)` function. See yourself

```javascript
let x = Symbol.for('test');

// logs true
console.log(x === Symbol.for('test'));
```

What is this good for you may ask. Well, if you want to use Symbols as keys, you somehow have to make them globally available. `Symbol.for` does that for you as it keeps a registry of key/value pairs.

```javascript
let obj = {};

(function(){
  let s2 = Symbol.for('propName');
  console.log(s2 === Symbol.for('propName'));
  obj[s2] = 'Juri';
})();

// logs "Juri"
console.log(obj[Symbol.for("propName")]);
```

Try it: https://jsbin.com/qopupe/2/edit?js,console

What might be important to know as well is that you won't get symbols when using `Object.getOwnPropertyNames()` but instead you have to use `Object.getOwnPropertySymbols()` to retrieve an array of symbols defined on the given object.

<p class="notice tip">
  Symbols are commonly referred to as <code>@@&lt;symbolname&gt;</code>, i.e. <code>@@iterator</code> refers to <code>Symbol.iterator</code>.
</p>

## Iterating Protocol

An **iterator** is an object that implements the iterator protocol.

<div class="notice fact">
  <p>An object is an iterator when it implements a <code>next()</code> method returning an object with the following properties:</p>
  <ul>
    <li><code>done(boolean)</code> - has a value <code>true</code> when the iterator is past the end of the iterated sequence. Otherwise it has the value <code>false</code>.</li>
    <li>
      <code>value</code> - any JavaScript value that represents the value extracted from the iterated sequence. This value my be omitted when <code>done</code> is <code>true</code>.
    </li>
  </ul>
</div>

Let's create such an iterator object:

```javascript
let people = {
  list: ['Juri', 'Steffi', 'Thomas', 'Jack'],
  nextIdx: 0,
  next: function(){
    if(this.nextIdx < this.list.length){
      return {
        value: this.list[this.nextIdx++],
        done: false
      };
    }else{
      return { done: true };
    }
  }
}
```

Try it: https://jsbin.com/sigilu/1/edit?js,console

An **iterable object** needs to implement such an iterator object by exposing it through the **@@iterator** (`Symbol.iterator`) method. Applying this to our previous object:

```javascript
let people = {
  list: ['Juri', 'Steffi', 'Thomas', 'Jack'],
  nextIdx: 0,
  [Symbol.iterator]: function(){
    return {
      list: this.list,
      nextIdx: this.nextIdx,
      next: function(){
        if(this.nextIdx < this.list.length){
          return {
            value: this.list[this.nextIdx++],
            done: false
          };
        }else{
          return { done: true };
        }
      }
    };
  }
};
```

Try it: https://jsbin.com/doriwi/2/edit?js,console

What we can now do is to use the new `for...of` loop introduced in ES6:

```javascript
let people = {
  list: ['Juri', 'Steffi', 'Thomas', 'Jack'],
  nextIdx: 0,
  [Symbol.iterator]: function(){
    ...
  }
};

for(let val of people){
  console.log(val);
}
```

Try it: https://jsbin.com/vidugu/2/edit?js,console


