---
layout: post_new
title: "From ng-controller to components with Angular 1.5"
lead: "Driving your Angular frontend architecture to a new level"
postimg: "/blog/assets/imgs/meetup-intro-angular2/ng2-gettingstarted-image.png"
category: angular1
tags: [ "JavaScript", "Angular.js", "Angular"]
---

<div class="article-intro">
	The web has moved forward and so should you. Learn how to upgrade your Angular 1 app from a more MV* architecture to a cleaner, more component oriented approach. We will learn about how to refactor your code properly and about the new features introduced in Angular 1.5+ that will help you succeed along this path.
</div>

{% include postads %}

## The App

I've created a series of Plunks which you can use to play around with the code by yourself. So here's our initial app, a very simple one, just enough to showcase some concepts we're going to explore.

<iframe src="https://embed.plnkr.co/eXrUIYtHgWD5YkQovjLT/" width="100%" height="400px"> </iframe>

## Step 1: Remove/Avoid `$scope`

Ok, `$scope` was a central element in Angular since the beginning. It's the glue between your Angular controller and the HTML template. Unfortunately scope is going away in Angular 2. There won't be anything similar there. That's why the "controller as" syntax has been introduced a while back also in Angular 1. So let's do it. Here's what [John Papa proposes in his popular Angular 1 styleguide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md).

```javascript
// before
angular.module('plunker')
  .controller('HomeController', function($scope) {
    $scope.message = 'Hi from home';
  });

// after
angular.module('plunker')
  .controller('HomeController', function() {
    var vm = this;
    vm.message = 'Hi from home';
  });
```

The "controller as" syntax also extends to the HTML. In the router configuration of our angular app, we add the `controllerAs` property and set it to `vm`.

```javascript
// before
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        controller: 'HomeController'
      })
      ...

// after
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      })
      ...
```

And consequently we also have to update our HTML code:

```html
{%raw%}
<!-- Before -->
<h1>Home</h1>
<p>{{ this.message }}</p>

<!-- After -->
<h1>Home</h1>
<p>{{ vm.message }}</p>
{%endraw%}
```

Great, so here's our app after the change:

<iframe src="https://embed.plnkr.co/up8zYCLYp7Wiq6VuXUng/" width="100%" height="400px"> </iframe>

## Step 2: Convert your controller to a directive

How is our controller bound to the view? There are different possibilities, one is through the `ng-controller` tag in the HTML directly, like

```html
<div ng-controller="HomeController as vm">
  ...
</div>
```

In our app it's the router, however:

```javascript
$stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home/home.html',
      controller: 'HomeController',
      controllerAs: 'vm'
    })
    ...
```

Notice how we define a template and the corresponding controller. This is a very loose coupling. Theoretically we could use one controller for multiple HTML templates easily. That's considered bad practice, though. Also, this hinders reusability, because one has to know which template and which controller belong together in order to be able to reuse them in another situation.  
So let's change that and stick them together. How? By writing a directive and converting our controller into a directive controller. We have different options:

```javascript
{%raw%}
.directive('home', function() {
  return {
    restrict: 'E',
    scope: {},
    template: 'home/home.html',
    controller: HomeController,
    controllerAs: 'vm'
  }
});

function HomeController() {
  ...
}
{%endraw%}
```

> **Heads up:** We're using an isolated scope (`scope: {}`) for our "components", because we want them to be fully isolated.

Our routing gets simplified, in that it doesn't have to know the template location and/or the controller, but simply the HTML tag `<home>`.

```javascript
$stateProvider
    .state('home', {
      url: '/',
      template: '<home></home>'
    })
```

That was easy, right.

<iframe src="https://embed.plnkr.co/oHGrOwjKlPu2kM8ZdnJu/" width="100%" height="400px"> </iframe>

## Step 3: Go further. Use Components!

Angular 1.5+ is the best Angular ever so far. Since [v1.5 they introduced the new `component` syntax](https://docs.angularjs.org/guide/component) which makes creating components super easy. Check out Todd Motto's article on the topic:

{% include article-link.html
	url="https://toddmotto.com/exploring-the-angular-1-5-component-method/"
	title="Exploring the Angular 1.5 .component() method"
	text="Angular 1.5 introduced the .component() helper method, which is much simpler than the .directive() definition and advocates best practices and common default behaviours."
	imageurl="/blog/assets/imgs/linkpics/toddmotto.png"
%}

So what does that mean for our app? Let's see.

```javascript
{%raw%}
// before
.directive('home', function() {
  return {
    restrict: 'E',
    scope: {},
    template: 'home/home.html',
    controller: HomeController,
    controllerAs: 'vm'
  }
});

// after
.component('home', {
    restrict: 'E',
    scope: {},
    templateUrl: 'home/home.html',
    controller: HomeController,
    controllerAs: 'vm'
  });
{%endraw%}
```

We can also remove the `controllerAs` property. This is an optional one. Angular 1.5 components expose the controller to the view through the `$ctrl` property.

```javascript
{%raw%}
// after
.component('home', {
    restrict: 'E',
    scope: {},
    templateUrl: 'home/home.html',
    controller: HomeController
  });
{%endraw%}
```

...and then in the HTML

```html
{%raw%}
<h1>Home</h1>
<p>{{ $ctrl.message }}</p>
{%endraw%}
```

<iframe src="https://embed.plnkr.co/4SMP159HWG6Djv2NjuLh/" width="100%" height="400px"> </iframe>

## Was that everything?

Not at all, Angular 1.5 components have to offer a lot more. 

#### `bindToController` and `bindings`

When you create directives and pass data into them, you have to define a scope property, right?

```javascript
.directive('myDirective', {
   ...
   scope: {
      message: '='
   }
   ...
})
```

The problem is that at that point, within your directive controller, you'd have to access them through the `$scope` variable again, which we previously said should be avoided. Thus, the `bindToController` has been introduced which allows us to write the above like this:

```javascript
{%raw%}
.directive('myDirective', {
   ...
   scope: {},
   bindToController: {
      message: '='
   }
   ...
})
{%endraw%}
```

Much better, `message` will now be attached directly to our controller instance. Still, we have to create the **isolate scope** with `scope: {}` which isn't the most elegant way of doing it. It gets better :smiley:. The new component syntax simplifies this into a single `bindings` property, which also creates an isolate scope behind the scenes.

```javascript
.component('myDirective', {
   ...
   bindings: {
      message: '='
   }
   ...
})
```

You can even get **one way bindings**

```javascript
...
bindings: {
   message: '<'
}
...
```

{% include article-link.html
	url="https://toddmotto.com/one-way-data-binding-in-angular-1-5/"
	title="One-way data-binding in Angular 1.5"
	text="Angular is known for it’s powerful two-way data-binding, but with the new release of Angular 1.5, we’ve got one-way data binding (one-directional) binding capabilities inside our Components and Directives."
	imageurl="/blog/assets/imgs/linkpics/toddmotto.png"
%}

#### Lifecycle hooks

Most remarkably a new set of lifecycle hooks have been introduced. Remember the following pattern suggested by [John Papa's famous styleguide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)?

```javascript
.component('home', {
    ...
    controller: HomeController
  });

function HomeController() {
  var vm = this;
  vm.message = '';

  activate();

  /////////////////////////

  function activate() {
    vm.message = 'Hi from home';
  }
}
```

The `activate` method can be seen like the constructor, a place where to group your controller's initialization code. Well with the new component syntax, you can make use of the `$onInit` hook function.

```javascript
function HomeController() {
  ...
  vm.$onInit = activate;

  /////////////////////////

  function activate() {
    vm.message = 'Hi from home';
  }
}
```

There are other hooks, like `$onChange`, `$onDestroy` and so on. Rather than going into those details by myself, check out Todd Motto's awesome article on the matter:

{% include article-link.html
	url="https://toddmotto.com/angular-1-5-lifecycle-hooks"
	title="Comprehensive dive into Angular 1.5 lifecycle hooks"
	text="Lifecycle hooks are simply functions that get called at specific points of a component’s life in our Angular apps. They landed in Angular 1.5 and are to be used alongside the .component() method, and have slowly evolved over the last few versions to include some more powerful (and Angular 2 inspired) hooks..."
	imageurl="/blog/assets/imgs/linkpics/toddmotto.png"
%}

## Component architecture

What we've seen so far are the technical details about how you implement components. It's however important to also understand the concept behind a component oriented development approach.

The main concept is to define isolated and autonomous components, with a given responsibility and clearly defined contracts in terms of which data flows in and out. Generally speaking, **there are two main types of components** you usually create, and different people give name them differently:

- **smart components / stateful components** - These are components that coordinate a set of "dumb component". They connect with Angular services, fetch data or get invoked through routings.
- **dumb components / stateless components** - These are responsible for the immediate visual feedback. They define input bindings and callbacks and render the data they receive. Usually they're not necessarily coupled to the application and are highly reusable.

What you end with, is a so-called **component tree**, a set of nested components, starting from a top-level app component or root component.

<figure>
	<a href="/blog/assets/imgs/meetup-intro-angular2/component-tree.png" class="image--zoom">
		<img src="/blog/assets/imgs/meetup-intro-angular2/component-tree.png"/>
	</a>
	<figcaption>Component tree</figcaption>
</figure>

So a "dumb component" (in every sense) in our sample app could look as follows:

```javascript
angular.module('plunker')
  .component('message', {
    bindings: {
      from: '<',
      msg: '<'
    },
    controller: MessageController,
    template: [
      '<p><strong>A message from {{ $ctrl.from }}:</strong></p>',
      '<p>{{ $ctrl.msg }}</p>'
    ].join('')
  });
  
  function MessageController() {}
```

And be used within our "smart components" `<home>` and `<about>` (big words here :smiley:) like

```html
<message from="'Home'" msg="$ctrl.message"></message>
```

<iframe src="https://embed.plnkr.co/u9BaCzaM0xLqn6wIHqzw/" width="100%" height="400px"> </iframe>

{% include article-link.html
	url="https://github.com/toddmotto/angular-styleguide"
	title="Angular styleguide for teams"
	imageurl="/blog/assets/imgs/githublogo.svg"
%}

{% include article-link.html
	url="http://teropa.info/blog/2016/02/22/dumb-components-and-visual-feedback-in-angular-apps.html"
	title="Dumb Components and Visual Feedback in Angular Apps"
%}

## Interested what role components play in Angular 2?

Then check out my video course with PacktPub which focuses on "Learning Angular 2 directives".

{% include article-link.html
	url="/blog/2016/04/learning-angular2-directives-course/"
	title="Learning Angular 2 directives"
	text="Learn how to build efficient Angular 2 directives with this fast and interactive video course"
	imageurl="/blog/assets/imgs/learning-angular2-directives/cover.jpg"
%}

Also, for a quick, 20 minute intro to Angular 2 (especially for beginners), you may want to check out my other article:

{% include article-link.html
	url="/blog/2016/06/ng2-getting-started-for-beginners/"
	title="Angular 2 - A Getting Started Guide for Beginners"
	text="Since about half a year, I'm organizing a local Meetup group around Software Craftsmanship. I recently also published a video course on Learning Angular 2 directives and given Angular 2 finally released RC1, I decided to organize a Meetup session to introduce Angular 2 to our members."
	imageurl="/blog/assets/imgs/meetup-intro-angular2/slide-deck.png"
%}

## Conclusion

What we've seen in this article:

- How to refactor `$scope` to the `controllerAs` syntax
- How to convert an `ng-controller` stepwise towards directives and ultimately to components
- We learned about the new `.component` syntax introduced in Angular 1.5 and all the benefits we get from it
- How to convert a MV* pattern like approach into a more component oriented approach

Summarizing, try to migrate your Angular frontend architecture towards a more component oriented approach. Regardless whether you plan to upgrade to Angular 2 at some point or not, it'll help you anyway create much cleaner applications.

While this article didn't deep dive into this topic, but is rather intended to give you a first overview, [Tero Parviainen](https://twitter.com/teropa) has written an in-depth version some time ago: [Refactoring Angular apps to Component Style](http://teropa.info/blog/2015/10/18/refactoring-angular-apps-to-components.html)
