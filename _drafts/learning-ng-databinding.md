---
layout: post
title: "Learning Angular: Gosh, my two-way binding doesn't seem to work properly!"
lead: ""
show_img_in_detail: true
coverimage: false
category:
tags: ["JavaScript", "Angular.js"]
---

The scenario: You have a sidebar with the application menu which you wrap into a separate directive. Furthermore there is a button somewhere else on the page which - when clicked - should toggle the sidebar (hide/show it).

There are different possibilities:

1. Directly set the state of the sidebar by keeping a reference to it from the button
1. Have a publisher/subscriber mechanism where the sidebar registers to an event, say "sidebar.toggle" and based on that hides/shows itself
1. Establish a 2-way data binding with a common object that is known by the sidebar as well as by the button.

**Option 1** is good for simple situations (like the menu of my blog here), but I don't like it in a more large-scale app. You quickly run into situations where you have to interact with the menu from multiple parts of your application. Keeping "hard references" quickly complicates the codebase and makes it more fragile. **Option 2** solves this by decoupling through events. This works nicely and is a cleaner solution. In Angular you have a **3rd option**, namely to use a _service_ as the common object that holds the state. Being a singleton it is an ideal candidate  to hook on a 2-way-binding like:

- sidebar directive binds to `isVisible` property defined on the service
- button toggles on the `isVisible` property

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
      template: '<div ng-show="{{ vm.isVisible }}">Hi there!</div>',
      controller: function(service) {
        var vm = this;
        // directly bound
        vm.isVisible = service.obj.isVisible;
      },
      controllerAs: 'vm'
    };
});
```

Finally, a controller sets the property based on some user interaction.

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

<iframe src="http://embed.plnkr.co/Hz0Ooz/preview" widt="100%" height="400px"> </iframe>

As you can see it doesn't really work as expected. What's going on here? Even though there's a lot of "magic" involved in how Angular realizes 2-way binding you have to give it a chance to listen

<iframe src="http://embed.plnkr.co/ptMHJ0/preview" width="100%" height="400px"> </iframe>

That said, we need some common place where to store that state s.t. all the interested areas can "watch/bind" on it. In Angular, most commonly this is a **service** somewhere.


That given, for the purpose of this post I have

- `MyCtrl` - which sets the state based on some interaction of the user
- `myDirective` - which is another place updating the same state

- `container` - another directive



Plunkr: http://plnkr.co/edit/LfW6uEYX2xHdMUGUr5Av?p=preview
