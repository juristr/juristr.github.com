---
layout: post
title: "Learning Angular: Gosh, my two-way binding doesn't seem to work properly!"
lead: "MOAR dots... Watch out when binding your data. Do you pass it an object reference or a value?"
show_img_in_detail: true
coverimage: false
category:
tags: ["JavaScript", "Angular.js", "learning-ng", "angular-databinding"]
---

Angular data-binding seems magic, but obviously isn't. You have to give it a chance to do its work. As such, watch out and think about the difference "copy by value" and "copy by reference".

{% include ng-series.html %}

## The issue

I have a sidebar with the application menu, which is wrapped into its own directive. Furthermore there is a button somewhere else on the application which - when clicked - should toggle the sidebar (hide/show it).

There are different implementation possibilities:

1. Directly set the state of the sidebar by keeping a reference to it from the button
1. Have a publisher/subscriber mechanism where the sidebar registers to an event, say "sidebar.toggle" and based on that hides/shows itself
1. Establish a 2-way data binding with a common object that is known by the sidebar as well as by the button.

**Option 1** is good for simple situations (like the menu of my blog here), but I don't really like it in a more large-scale app. It quickly gets messy as you soon run into the situation where interaction with the menu is needed from multiple parts of the application. Keeping lots of "hard references" quickly complicates the codebase and makes it more fragile. **Option 2** solves this by decoupling through events. This works nicely and is a cleaner solution. 

There's a **3rd option**, namely to use some shared object which in Angular can be nicely represented by a _service_. Being a singleton it is an ideal candidate to hook on a 2-way-binding like:

- sidebar directive binds to `isVisible` property defined on the service
- button switches on the `isVisible` property on the `service`

That's exactly what I did. The service is quite simple in that it exposes an object containing the current state.

```javascript
.factory('service', function() {
    var service = {
      obj: {
        isVisible: true
      }
    };
    return service;
})
```

A corresponding directive reacts based on that state information:

```javascript
.directive('container', function() {
    return {
      restrict: 'E',
      template: '<div ng-show="{%raw%}{{ vm.isVisible }}{%endraw%}">Hi there!</div>',
      controller: function(service) {
        var vm = this;
        // directly bound
        vm.isVisible = service.obj.isVisible;
      },
      controllerAs: 'vm'
    };
});
```

Finally, a controller sets the property based on some user interaction (i.e. the click on the button).

```javascript
.controller('MyCtrl', function(service) {
    var vm = this;
    // directly bound
    vm.isVisible = service.obj.isVisible;

    vm.toggle = function() {
      service.obj.isVisble = !service.obj.isVisble;
    };
})
```

The result:

<iframe src="http://embed.plnkr.co/Hz0Ooz/preview" width="100%" height="400px"> </iframe>

As you can see it doesn't really work as expected. What's going on here? Even though there's a lot of "magic" involved in how Angular realizes 2-way data binding, you have to give it a minimum chance keep track of what happens.

If you take a look at my code above, you can see that **I directly bind the boolean property of the service to my `$scope`**:

```javascript
.controller('MyCtrl', function(service) {
  ...
  vm.isVisible = service.obj.isVisible;
  ...
}
```

## Solution

The problem here is that the `isVisible` property on the `$scope` obviously won't get updated as there is no connection to the one defined on the `service` object. Since booleans are a values types, simply the value is copied over. Hence, **they don't reference the same OBJECT**. 

Thus, what I have to do instead, is to **bind an object instance** onto the `$scope`.

```javascript
.controller('MyCtrl', function(service, $scope) {
  ...

  vm.data = service.obj;

})
```

..and then obviously also update the binding in the HTML:

```html
<div class="widget" ng-controller="MyCtrl as vm">
  <h3>MyCtrl</h3>
  ...
  {%raw%}{{ vm.data.isVisible }}{%endraw%}
  ...
</div>
```

In this way, `$scope` and `service` point to the same object instance and hence the digest loop can watch the object to update the HTML accordingly:

<iframe src="http://embed.plnkr.co/ptMHJ0/preview" width="100%" height="400px"> </iframe>

Apparently this seems to be a common issue with Angular newbies as I encountered other devs on the IRC chat having similar problems. Response from the experts: **"MOAR dots.."** :)

<pre class="nohighlight">
...
[10:25:37] &lt;denny009&gt; hello all. I've a directive that inside do scope.$new() and it works well (create a json tree). The problem now is that I want communicate with the parent. The first time the communication works well but the second when the scope change I lost it
...
[10:28:21] &lt;Grokling&gt; denny009: MOAR dots..
...
[10:28:44] &lt;denny009&gt; Grokling: sorry?
[10:30:20] &lt;denny009&gt; Grokling: what mean "MOAR dots"
...
[10:31:14] &lt;Grokling&gt; denny009: Javascript passes objects by reverence, and primitives by value. You have a primitive 'jsonData' there, so you're copying the value, and it has no reference to any new value you might replace it with.
...
[10:35:02] &lt;Grokling&gt; denny009: You should always have a dot in your bindings (hence: MOAR dots). sendrequest(thing.request) would be an example.
```
</pre>

Have a nice weekend!