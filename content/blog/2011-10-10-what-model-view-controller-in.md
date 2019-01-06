---
title: What? Model-View-Controller in JavaScript?
date: 2011-10-10T00:00:00.000Z
comments: true
categories:
  - JavaScript
url: /blog/2011/10/what-model-view-controller-in
type: post
---

<div class="article-intro">
At work I'm currently working on a new web architecture composed of a rich client written in JavaScript and an ASP.net MVC server-side backend exposing a REST-like JSON api. An important part of that work is to also train developers on that, quite new way of programming web-apps. 
</div>

<!--more-->

{{<postad>}}  

And actually, devs are quite surprised when I mention the term MVC and JavaScript in one sentence?</p>

<blockquote>"Ok...I understand the MVC concept now and the benefits are clear..but JavaScript?"</blockquote>

I fully understand their doubts or astonishment. That's the problem with JavaScript and web developers. For many years (and even now) JavaScript has been purely used as a scripting language, for quickly hacking in some dynamic behavior in your web application that was mainly rendered by some "fat" (IIS ASP.net / Apache JBoss) server. How did that look like??

```html
<html>
<head>
<script type=“text/javascript”>
function performAction(){
   var dropdown = document.getElementById(“myDropdown”);
   if(dropdown.selectedIndex === ...)
       document.getElementById(“theDiv”).style.display = “none”;
   ...
}
</script>
</head>
<body>
   …
   <input type=“button” value=“doAction” onClick=“performAction()”/>
</body>
</html>
```

[Try it out here](http://jsbin.com/oyazib/3/edit)

---

Something like this, right? I'm speaking out of experience. That's JavaScript used as a "scripting language", fully procedural, hooked in globally on the window object far away from any best practice or object oriented approach (nor to speak about testability).

Enough, let's talk about MVC.


## The "messy", structureless codebase

```javascript
function showOutput(){
  var name = “Juri”;
  var age = 26;
  
  var output = “Hi, my name is ” + name + “ and I’m ” + age + “ years old.“;
  $(“.output”).html(output);
}
```

[Try it out here](http://jsbin.com/oyazib/3/edit).

```html
<!DOCTYPE html>
<html>
<head>
<script class=“jsbin” src=“http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<meta charset=utf-8 />
<title>JS Bin</title>
</head>
<body>
  <div id=“view”>
    <strong>Output:</strong>
    <div class=“output”></div>
    <input id=“btnClickMe” type=“button” value=“Click me” onClick=“showOutput()”/>
  </div>
</body>
</html>
```
I guess this is what might seem most familiar to you. The "onClick" event is directly registered on the button (line 12) which invokes a global function "showOutput" which in turn processes the embedded output and sets it to a given div element.

## Converting the example to be more MVC-like

**Step 1:** Remove the event registering code from the HTML code.

In a first step we remove the event registering code from the above example s.t. the code looks as follows:

```javascript
function showOutput(){
  var name = “Juri”;
  var age = 26;
  
  var output = “Hi, my name is ” + name + “ and I’m ” + age + “ years old.“;
  $(“.output”).html(output);
}

$(document).ready(function(){
  $(“#btnClickMe”).click(showOutput);
});
```

and the HTML code doesn't have any knowledge about the JavaScript behind, now. [Try here](http://jsbin.com/oyazib/4/edit).

```html
<!DOCTYPE html>
<html>
<head>
<script class=“jsbin” src=“http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<meta charset=utf-8 />
<title>JS Bin</title>
</head>
<body>
  <div id=“view”>
    <strong>Output:</strong>
    <div class=“output”></div>
    <input id=“btnClickMe” type=“button” value=“Click me”/>
  </div>
</body>
</html>
```

**Step 2:** Extracting the model

So far the "model" wasn't really visible but rather represented by the two variables "name" and "age". Let's create a simple JavaScript object that encapsulates this data:

```javascript
var Person = function(firstname, age){
  this.firstname = firstname;
  this.age = age;
};

function showOutput(){
  var aPerson = new Person(“Juri”, 26);  
  
  var output = “Hi, my name is ” + aPerson.firstname + “ and I’m ” + aPerson.age + “ years old.“;
  $(“.output”).html(output);
}

$(document).ready(function(){
  $(“#btnClickMe”).click(showOutput);
});
```

 The HTML code remains unchanged. [See here](http://jsbin.com/oyazib/5/edit)


 **Step 3:** Moving the presentation logic where it belongs to
 
 The major thing that still disturbs in the above code is the presentation logic that is encoded in line 9. This is pure presentation logic. To solve this problem we use a templating engine. For simplicity reasons I've chosen <a href="http://api.jquery.com/jquery.tmpl/">jQuery tmpl</a>&nbsp;but there are numerous others like <a href="http://aefxx.com/jquery-plugins/jqote2/">jQote</a> and <a href="http://embeddedjs.com/">EJS templates</a>.<br />First, the view:
 
 ```html
 <script type=“text/x-jquery-tmpl” id=“personView”>
  Hi, my name is <i>${firstname}</i> and I’m <i>${age}</i> old.
</script>
 ```
 
 The strange <code>${...}</code> are the jQuery tmpl placeholders. The according JavaScript code now looks as follows:

 ```javascript
 var Person = function(firstname, age){
  this.firstname = firstname;
  this.age = age;
};

function showOutput(){
  var aPerson = new Person(“Juri”, 26);  
  
  var output = $(“#personView”).tmpl(aPerson);
  $(“.output”).html(output);
}

$(document).ready(function(){
  $(“#btnClickMe”).click(showOutput);
});
 ```

 [Heres a live demo](http://jsbin.com/oyazib/7/edit).
 
 Note the highlighted lines 9 and 10. There is no view-related code any more, but rather we invoke jQuery tmpl with the given view and pass in the data. The HTML code remains unchanged, except the jQuery tmpl view which is added at the end of the <code>&lt;head&gt;</code> section. Now that we have the model and the view extracted, where's the controller??
 
 **Step 4:** The controller, refining the big picture
 
 The controller is nothing else but the glue that keeps together the model and the view. It knows from where to the fetch the model and which view to use. In fact, it is already present in the JavaScript code that has been shown so far. Have a look at the big picture:
 
 **The Model:**
 
 ```javascript
var Person = function(firstname, age){
  this.firstname = firstname;
  this.age = age;
};
 ```
 
 **The View:**
 
 ```html
<!DOCTYPE html>
<html>
<head>
<script class=“jsbin” src=“http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script src=“http://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js"></script>
<meta charset=utf-8 />
<title>JS Bin</title>

<script type=“text/x-jquery-tmpl” id=“personView”>
  Hi, my name is <i>${firstname}</i> and I’m <i>${age}</i> old.
</script>
  
</head>
<body>
  <div id=“view”>
    <strong>Output:</strong>
    <div class=“output”></div>
    <input id=“btnClickMe” type=“button” value=“Click me”/>
  </div>
</body>
</html>
 ```
 
 **The Controller:**
 
 ```javascript
 $(document).ready(function(){
  $(“#btnClickMe”).click(function(){
    var aPerson = new Person(“Juri”, 26);  
  
    var output = $(“#personView”).tmpl(aPerson);
    $(“.output”).html(output); 
  });
});
 ```
 
## Conclusion

The example mentioned in this post is very basic and simple but still, I think it perfectly reflects what the MVC pattern is about and how a possible implementation in JavaScript could look like. Obviously this is a simple example with the purpose of understanding the concepts. In a real-world application you would probably rely on the numerous JavaScript MVC frameworks that are available.
 
**One step further?** 

I'd even go a step further and make the MVC model more clear by extracting the controller's logic into a reusable jQuery plugin. The controller is now encapsulated into a jQuery plugin which takes a view and a model to handle.

```javascript
//Controller
(function($){
  
  $.fn.personcontroller = function(model){ 

    //register events
    $(“input[type=button]“, this).click(function(){ 
      var output = $(“#personView”).tmpl(model);
      $(“.output”).html(output); 
    });
    
  };
  
})(jQuery);
```

Finally, there is the application entry code which hooks up the controller: 

```javascript
//Main of the “application”
$(document).ready(function(){
  var aPerson = new Person(“Juri”, 26);
  $(“#view”).personcontroller(aPerson);
});
```

I guess now the separation is perfectly visible. The controller registers itself on a view where it hooks on the click event and visualizes the model that has been passed.<br /><br />The live code can be found here: <a href="http://jsbin.com/oyazib/11/edit">http://jsbin.com/oyazib/latest/edit</a>
