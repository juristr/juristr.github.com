---
layout: post
title: "Why $.extend(someObj, anotherObj) might be dangerous!"
date: 2012-07-18
comments: true
tags: [  JavaScript, Web dev ]
reposts: ["http://www.dzone.com/articles/why-extendsomeobj-anotherobj"]
---

You often have the need to _merge_ two objects. A common use case is that of combining parameters for a `$.ajax` call. jQuery has a nice function for that, namely [jQuery.extend](http://api.jquery.com/jQuery.extend/). The function definition is something like `jQuery.extend(target, [object 1], [object 2])`. But attention, this might lead to dangerous side effects if not used properly!


Suppose you have an object, `obj1` defined like

```javascript
var obj1 = { 
    value: 1
};
```

And you need to execute a request to your backend server with some additional parameters, including the values of **obj1**. Your code might look like

<pre class="linenums">var sendToServer = function(params, successCb, errorCb){<br />   return $.ajax({<br />      url: "/api/someurl",<br />      type: "GET",<br />      dataType: "json",<br />      data: params,<br />      success: successCb,<br />      errorCb: errorCb<br />   });<br />}<br /><br />...<br />sendToServer(<br />   $.extend(obj1, { value: 2, someOtherParam: "hello" }),<br />   function(resultData) {<br />      console.log("The value of obj1: " + obj1.value);<br />   },<br />   function(e) {<br />      console.log("An error happened");<br />   });<br /></pre>

On <b>line 14</b> I'm basically giving the parameters to the <code>sendToServer(..)</code> function by combining those in <code>obj1</code>
with some new ones. This is possible since the $.extend(...) function directly returns the result of the combination of the passed objects.

Can you guess the output of <b>line 16</b>?
<br />
<pre>&gt; The value of obj1: 2<br /></pre>
<b>Surprised?</b>
&nbsp;Well, take a look at
<b>line 14</b>
again and then on the signature of
<code>jQuery.extend(target, [object 1], [object 2])</code>
. What happens there is a
<b>copy of the values</b>
provided in the new object, namely
<code>{ value: 2, someOtherParam: "hello" }</code>
onto
<code>obj1</code>
, hence
<b>overwriting obj1's property</b>
<code>value</code>
, setting it to 2.
<br />
The correct version of
<b>line 14</b>
would therefore probably be
<br />
<pre class="brush:javascript">$.extend({}, obj1, { value: 2, someOtherParam: "hello" })</pre>
In this version, the values of
<code>obj1</code>
and
<code>{ value: 2, someOtherParam: "hello" }</code>
are copied onto a new object
<code>{}</code>
, thus
<b>not modifying</b>
the existing instance of obj1.
<br />
<br />
Here's
<a href="http://jsbin.com/isewey/edit#javascript,live" target="_blank">
  a
  <span style="background-color: white;">&nbsp;live example that mimics the odd behavior.</span>
</a>
&nbsp;Attention to this!