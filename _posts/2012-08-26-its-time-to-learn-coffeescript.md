---
layout: post
title: "It's time to learn CoffeeScript"
description: ""
category: bliki
tags: [JavaScript, CoffeeScript, WebDev]
reposts: ["http://css.dzone.com/articles/its-time-learn-coffeescript"]
comments: true
---
{% include JB/setup %}

Seing and reading all the stuff about CoffeeScript, I thought it might be useful to get into that "language" as well in order to get a better understanding. There is a lot of material already online on http://coffeescript.org but still, I learn a lot better and faster if I write my own notes and examples.

Therefore, this tutorial here is basically the result of taking notes and writing down examples of the Fluent Conference 2012 Talk about "A Sip of CoffeeScript" by Gregg Pollack. Unfortunately I wasn't there myself, but O'Reilly was so kind to grant me full access to the conference video collection.

## Setup
You can either install CoffeeScript on your machine directly or just try the examples directly on the [coffeescript.org](http://coffeescript.org) website (choosing the "Try CoffeeScript" tab, which is more than enough for this tutorial).

### Installation

 - Install node + npm
 - Install the CoffeeScript compiler: `$ npm install -g coffee-script`

### Usage

`$ coffee -c test.coffee`  
Produces test.js

`$ coffee -cw test.coffee`  
Every time `test.coffee` updates it will automatically re-compile it.

The same works for entire directories.

`$ coffee -c src -o js`  
Compiles all CoffeeScript files in `src` to the `js` folder.

`$ coffee -cw src -o js`  
..continuous compilation on every change of a file in src.


## Variables and Functions

### Named functions

**JS**

    var coffee = function coffee(){
      return confirm("Ready for CoffeeScript?");
    };

**CS**

    coffee = ->
      confirm "Ready for CoffeeScript?"

CoffeeScript (CS) is intended instead of using the curly brackets. Indentation is normally either _2 spaces_ or _1 tab_.

`->` converts to `function()`

What also important is that in CS, functions _always have a return value_ which automatically is the last line in the function.

### Returning a string
If one would like to the return the answer (in the above function) as `string`, then in **JS** this would look like

    var coffee = function(){
      var result = confirm("Ready for CoffeeScript?");
      return "Your answer is " + result + "!";
    }

in **CS** instead

    coffee = ->
      result = confirm "Ready for CoffeeScript?"
      "Your answer is " + result + "!"

A variant is to write the string concatenation as follows

    "Your answer is #{result}!"

> **Note**
> 
> - No variable declaration needed
> - parenthesis are optional; `confirm("Ready...")` is equal to `confirm "Ready..."

### Calling functions

**Decl**

    coffee = ->

**Invocation**

    coffee()

---

**Decl**

    coffee = (message) ->

**Invocation**

    coffee("Yes")
  
    //alternatively
    coffee "Yes"

---

**Decl**

    coffee = (message, other) ->

**Invocation**

    coffee("Yes", 2)
    coffee "Yes", 2

### Optional params

Similar to C# where you can define optional parameters as

    public void SomeMethod(string x = "hello, world") { ... }

you can write in **CS**

    coffee = (message = "Ready for CoffeeScript") ->
      answer = confirm message
      "Your answer is #{answer}"

> **Note:** no return statement is written explicitly, the _last line_ will be returned automatically.

## jQuery with CoffeeScript

The following jQuery JavaScript sample

    jQuery(function($){

      function changeTab(e){
        e.preventDefault();
        $("#tab li a.active").removeClass("active");
        $(this).addClass("active");
      }

      $("#tab ul li a").click(changeTab);
    });

Would translate to

    $ ->
      changeTab = (e) ->
      e.preventDefault()
      $("#tab li a.active").removeClass "active"
      $(@).addClass "active"

      $("#tab ul li a").click changeTab

> **Note**
>
> - `jQuery(function($))` can be translated to `$ ->` or `jQuery ($) ->`
> - `@ = this` (shortcut)

Declaring a function inline like

    $("#tab ul li a").click(function(e){
      ...
    });

translates to

    $("#tab ul li a").click (e) ->
      ...

An interesting example (from an understanding point of view) is the jQuery[hover](http://api.jquery.com/hover/) function as it takes two functions as input. In CS this gets written as

    $(".drink li").hover(
      -> 
        $(@).find(".span").show()
      ->
      $(@).find(".span").hide()

or alternatively by first separately declaring the functions.

    a = -> $(@).find("span").show();
    b = -> $(@).find("span").hide();

    $(".drink li").hover a, b

### Bind Example

**JS**

    $("#tabs ul li a").bind({
      click: changeTab,
      mouseenter: showNumberOfFlights,
      mouseleave: hideNumberOfFlights
    });

**CS**

    $("#tabs ul li a").bind
      click: changeTab
      mouseenter: showNumberOfFlights
      mouseleave: hideNumberOfFlights

## Conditionals and Operators

### If statements

In **JS**

    if(age < 18)
      alert("Under 18");

**CS**

    if age < 18
      alert "Under 18"

    //or
    alert "Under 18" if age < 18

### Operators
<table class="table table-striped">
  <thead>
    <th>CoffeeScript</th>
    <th>JavaScript</th>
  </thead>
  <tbody>
    <tr>
      <td>== or is</td>
      <td>===</td>
    </tr>
    <tr>
      <td>!= or isnt</td>
      <td>!==</td>
    </tr>
    <tr>
      <td>not</td>
      <td>!</td>
    </tr>
    <tr>
      <td>and</td>
      <td>&amp;&amp;</td>
    </tr>
    <tr>
      <td>or</td>
      <td>||</td>
    </tr>
    <tr>
      <td>true yes on</td>
      <td>true</td>
    </tr>
    <tr>
      <td>false no off</td>
      <td>false</td>
    </tr>
  </tbody>
</table>
  
This allows for statements like

    if paid() and coffee() is on then pour()

    addCaffeine() if not Decaf()
    addCaffeine() unless Decaf()

###Chained comparisons
...can also be written very nicely.

    if(2 < newLevel && newLevel < 5){ ... }

in CF

    if 2 < newLevel < 5
      alert "In range"

### Switch

    message = switch cupsOfCoffee
      when 0 then "Asleep"
      when 1 then "Eyes Open"
      when 2 then "Buzzed"
      when 3 then "Dangerous"

### Existential Operators
A common operation in JavaScript is to check on whether something is _defined and not null_. In CoffeeScript there exists an operator for this, namely

    if someVariable?
      alert "It is defined"

Another nice semplicifation is to initialize some default value if it hasn't been set yet.

    if not cupsOfCoffee?
      cupsOfCoffee = 0

    //or
    cupsOfCoffee = 0 if not cupsOfCoffee?

    //or
    cupsOfCoffee = 0 unless cupsOfCoffee?

    //or most simply
    cupsOfCoffee ?= 0

Similarly, a function should only be called on an object if that object actually exists/is defined:

    if coffeePot?
      coffeePot.brew()

    coffeePot?.brew()

In addition, this can be used also in combination with function invocation, i.e. to call a given function on an object only if it actually exists:

    vehicle.startEngine?().shiftGear?()

which is extremely more expressive than the JavaScript alternative

    var _base;

    if (typeof vehicle.startEngine === "function") {
      if (typeof (_base = vehicle.startEngine()).shiftGear === "function") {
        _base.shiftGear();
      }
    }

## Arrays

Arrays can be defined like

    locations = ["New York", "Los Angeles", "Washington"]

or by using a _newline_ char instead of a comma:

    locations = [
      "New York"
      "Los Angeles"
      "Washington"
    ]

### Looping over...
...the elements is as easy as

    locations.forEach(location, index) ->
      alert "Location #{location}"

which is nothing else than using the standard JavaScript `forEach`

    locations.forEach(function(location, index){
      alert "Location " + location;
    });

Alternatively

    for location in locations
      alert "Location #{location}"

which should not be confounded with the JavaScript `for in` loop for iterating over Object literals and which **should not** be used for array iterations. Instead the above CoffeeScript `for ... in` loop will be translated into this

    for (var i = 0, len = locations.length; i < len; i++) {
      alert locations[i];
    }

Finally, an even more compact version is this one

    alert "Location #{location}" for location in locations


### Ranges
Ranges can be defined like

    range = [1..4]

where the JavaScript equivalent would look like

    var range = [1,2,3,4];

Instead, writing

    range = [1...4] //3 dots
    
results in

    var range = [1,2,3];

This works also with variables

    start = 1
    end = 10

    range = [start..end]

Given an array `range = [1..10]`, here are some common **operations**

    range[4..6]

pulls out all the elements starting from index 4 up to index 6: `[5,6,7]`.  
The JavaScript equivalent:

    var range = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    range.slice(4, 7);

Also 

    range[4..range.length]

works: `[5, 6, 7, 8, 9, 10]`

### List comprehensions

Having

    locations = ["Bolzano", "Merano", "Bressanone"]

which are cities in the province of Bolzano (BZ) of Italy. Now if we'd like to append a ", (BZ)" to each of these entries, in CoffeeScript this could be done as follows:

    locations = ("#{location}, (BZ)" for location in locations)

Interestingly, parenthesis are important here!

This can even be combined with filters, 

    locations = ("#{location}, (BZ)" for location in locations when location isnt "Merano")

which would output: `["Bolzano, (BZ)", "Bressanone, (BZ)"]`  
Here, the power of CoffeeScript's functional-like syntax becomes visible.

### Splats
These are a convenient way for passing a variable number of arguments into a function.

Example

    searchLocation = (brand, cities...) ->
      "Looking for #{brand} in #{cities.join(,)}"

which can then be called like `searchLocation "Starbucks", "Orlando", "New York"`.

Alternatively also an entire array can be sent to the function

    params = ["Starbucks", "Orlando", "New York", "Washington"]
    searchLocation(params...)

The `...` are needed as otherwise the assumption would be to send in **one array parameter** instead of a list of arguments. In fact, CoffeeScript translates this

    searchLocation(params...)

into

    searchLocation.apply(null, params);

whereas it translates

    searchLocation(params)

into

    searchLocation(params);

## Objects
Objects can be defined in the following ways

    coffee = { name: "Meindl", strength: 2}

and since curly braces are optional, this is equivalent

    coffee = name: "Meindl", strength: 2

and commas could be replaced by newline chars

    coffee = 
      name: "Meindl"
      strength: 2

As you already imagined, adding anonymous functions works quite similar

    coffee =
      name: "Meindl"
      strength: 2
      brew: -> alert "Brewing #{@name}"

> Indentation is particularly important here! Normally 2 spaces are used. **Wrong indentation leads to wrong translation into JavaScript!**

Object declarations can also be nested arbitrarily like

    coffee =
      french:
        strength: 1
        inStock: 20
      italian:
        strength: 2
        inStock: 12
      decaf:
        strength: 0
        inStock:8

The according JavaScript translation is quite obvious:

    var coffee = {
      french: {
        strength: 1,
        inStock: 20
      },
      italian: {
        strength: 2,
        inStock: 12
      },
      decaf: {
        strength: 0,
        inStock: 8
      }
    };

### Object iteration
In CoffeeScript `of` can be used for object iteration.

    "#{coffee} has #{attrs.inStock}" for coffee, attrs of coffee

The equivalent JavaScript looks like

    var attrs, coffee;

    for (coffee in coffee) {
        attrs = coffee[coffee];
        "" + coffee + " has " + attrs.inStock;
    }

All of this can obviously be combined with filters (as already seen in some of the previous sections) and printed out nicely. For instance

    toPrint = for coffee, attrs of coffees when attrs.inStock > 0
      "#{coffee} has #{attrs.inStock}"
    toPrint.join ", "

## Examples
Some examples and their translation into CoffeeScript

### showFlights function
Take the following JavaScript function...

    function showFlights(activeDiv){
      $("#tabs div").hide();

      if(fetchingFlights){
        fetchingFlights.abort();
      }

      fetchingFlights = $.ajax("/flights", {
        data: { date: activeDiv },
        cache: false,
        error: function(result){
          if(result.statusText != "abort"){
            $("#tabs #error").show();
          }
        }
      });
    }

...and translate it line by line.

---

These lines

    function showFlights(activeDiv) {
      $("#tabs div").hide();

can be translated as

    showFlights = (activeDiv) ->
      $("#tabs div").hide()

The if condition

    if(fetchingFlights){
      fetchingFlights.abort();
    }

can be translated as

    if fetchingFlights
      fetchingFlights.abort()

> or alternatively `fetchingFlights.abort() if fetchingFlights`

The next step is to translate the ajax call.

    fetchingFlights = $.ajax("/flights", {
      ...
    });

will translate into CoffeeScript as

    fetchingFlights = $.ajax "/flights" 
      data: 
        date: activeDiv
      cache: false
      error: (result) ->
        $("#tabs #error").show() if result.statusText isnt "abort"

> **Note**
> 
> - No comma is needed after `"/flights"` as the newline substitutes it
> - The 2nd param of the `$.ajax` call is an object, so indentation can be used
> - `data` is an object inside an object, so indentation applies here as well. Alternatively one could have written this as `data: date: activeDiv`

### List Comprehensions
Again, the JavaScript code

    var filteredFlights = [];

    $.each(currentFlights, function(index, flight){
      if(stops === "2+" || flights.routing == 0) {
        filteredFlights.push(flight);
      }
    });

So, the array declaration can be defined as follows

    filteredFlights = []

then we need to loop over all `currentFlights` which can be done using the jQuery each function exactly like in the example

    $.each currentFlights, (index, flight) ->

and then adding the conditions

    if stops is "2+" or flight.routing is 0

s.t. all put together we would end up with

    filteredFlights = []

    $.each currentFlights, (index, flight) ->
      if stops is "2+" or flight.routing is 0
        filteredFlights.push flight

This is the most simple direct translation from JavaScript. However, this doesn't leverage the full power of CoffeeScript.

To do so, the above CoffeeScript can be further refactored. The jQuery each can be substituted with a plain CoffeeScript loop

    for flight in currentFlights

to this we can directly append a filter

    stops is "2+" or flights.routing is 0

and then return a flight:

    flight for flight in flights when stops is "2+" or flight.routing is 0

Finally, put together

    filteredFlights = (flight for flight in flights when stops is "2+" or flight.routing is 0)

That's it. Really nice and readable.

## Object Orientation

Take the following CS object

    coffee = 
      name: "French"
      strength: 2
      brew: -> alert "brewing #{name}"
      pour: (amount) ->
        if amount is 1
          "Poured a single cup"
        else
          "Poured #{amount} cups"

This can be turned into a **class** as follows.

First the class definition which is written

    class Coffee

then we can add a constructor

    constructor: (name, strength=1) ->
      @name = name
      @strength = strength

Remember, the `@` is like an alias for `this`, so `@name = name` does nothing else than setting the passed constructor parameter onto the class instance member. There is a nice _shortcut_ for this, namely to write the constructor like

    constructor: (@name, @strength = 1) ->

The instance functions can be taken over just normally s.t. the full class definition then is the following:

    class Coffee

      constructor: (@name, @strength = 1) ->

      brew: -> alert "brewing #{name}"
      
      pour: (amaount) ->
        if amount is 1
          "Poured a single cup"
        else
          "Poured #{amount} cups"

This class definition can now be used just as expected

    french = new Coffee("French", 2)
    french.brew()

You might wonder how CoffeeScript translates this to JavaScript? Here's the result:

    var Coffee;

    Coffee = (function() {

      function Coffee(name, strength) {
        this.name = name;
        this.strength = strength != null ? strength : 1;
      }

      Coffee.prototype.brew = function() {
        return alert("brewing " + name);
      };

      Coffee.prototype.pour = function(amaount) {
        if (amount === 1) {
          return "Poured a single cup";
        } else {
          return "Poured " + amount + " cups";
        }
      };

      return Coffee;

    })();

It creates a nice clean object using the module pattern.

### Inheritance

Inheritance is done by using the `extends` keyword:

    class MaxgoodHouse extends Coffee

What could be done is to change the constructor s.t.

    constructor: (@name, @strength=1) ->
      @brand = "Maxgood House"

Calling

    maxgood = new MaxgoodHouse("maxgood")
    maxgood.brew()

would work, as it would call the inherited function from `Coffee`. Obviously one could also overwrite an existing function

    brew: -> alert "brewing #{@brand} #{@name}"

Similarly, it is possible to call the original function from the inherited class like

    pour: (amount) ->
      "#{super(amount)}, but it sucks"

> `super(amount)` basically calls the parent's class `pour(..)` function


### The "Fat Arrow"

When having the following class

    class Coffee

      constructor: (@name, @strength = 1, @inventory) ->

      pourClick ->
        $("pour-#{name}").click (event) ->
          if @inventory isnt 0
            @inventory = -1
            alert "Poured a cup of #{@name}"

This would give an **error**!! Why? Think of how the according JavaScript might look like

    $("someSelector").click(function(){
      if(this.inventory !== 0){
        this.inventory = -1;
        ...
      }
    });

You see the problem. `this` inside the click wrapped function doesn't point anymore to the object instance but to the clicked DOM element. In JavaScript this can be either solved using something like `var self = this` 

    var self = this;
    $("someSelector").click(function(){
      if(self.inventory !== 0){
        ...
      }
    });

or by using the `jQuery.proxy` function

    $("someSelector").click($.proxy(function(){
      if(this.inventory !== 0){ ... }
    }), this);

Depends on your preference.

With CoffeeScript this behavior can be fixed using the so-called **fat arrow**

    $("pour-#{@name}").click (event) =>
     if @inventory isnt 0
            @inventory = -1
            alert "Poured a cup of #{@name}"

Wondering how CoffeeScript translates it? Here it is:

    var _this = this;

    $("pour-" + this.name).click(function(event) {
      if (_this.inventory !== 0) {
        _this.inventory = -1;
        return alert("Poured a cup of " + _this.name);
      }
    });

It uses the _self_ mechanism.

### Using a Class for Encapsulation

Consider this sample

    var selectFlights = {

      var fetchingFlights: null,

      init: function(){
        var self = this;

        $("#tabs ul li a").bind({
          click: this.changeTab
        });

        $("#tabs #error a").click(function(ev){
          ev.preventDefault();
          self.showFlights($("#tabs li a.active").attr("href"));
        });
      },

      showFlights: function(activeDiv) { ... }
      changeTab: function(event) { ... }

    };

Refactoring this to CoffeeScript could be done as follows.

    class SelectFlights

      constructor: (@fetchingFlights=null) ->
        $("#tabs ul li a").bind
          click: @changeTab

        $("#tabs #error a").click (ev) =>
          ev.preventDefault
          @showFlights $("#tabs li a.active").attr("href")

        showFlights: (activeDiv) ->

        changeTab: (event) =>

> **Note**, `changeTab` needs the fat arrow as it runs under the context of the click event handler registered in the constructor.

## Resources
Here are some further resources I found on the web:

- [Coffeescript Cookbook](http://coffeescriptcookbook.com/)
