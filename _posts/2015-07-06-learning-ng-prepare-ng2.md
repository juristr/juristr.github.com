---
layout: articles-post
title: "Preparing for Angular 2"
subtitle: "get ready!"
lead: "Collection of best practices to be ready for Angular 2"
show_img_in_detail: true
coverimage: false
category:
tags: ["JavaScript", "Angular.js", "learning-ng"]
---

I'm sure you heard about Angular 2 and that it will be **totally** different. Forget everything you know and start from scratch :open_mouth: . Jokes apart, if you have taken a closer look you already know that, yes, it will be new, things will be different (as it's mostly the case with new stuff), but many concepts will still be there. Well, as Angular 2 starts getting more and more concrete, articles, videos and podcasts get published that contains lots of useful information on how to get prepared an eventual migration scenario. I use this article to collect such best practices for myself and and obviously to share them with you!

**Totally feel free** to submit new practices in my comments. That'd be awesome! You can also directly submit a PR as [this blog is Open Source](https://github.com/juristr/juristr.github.com). Simply click the "Contribute" link above. 

<p class="notice fact"
    <strong>Keep an eye on this post</strong> here as I will update it from now and then as I stumble upon new things. Following is easy, simply <a href="http://feeds.feedburner.com/juristrumpflohner">subscribe to the RSS</a> feed or <a href="https://twitter.com/juristr">follow me on Twitter</a>.
</p>

## Get rid of $scope: controller-as syntax

Definitely switch over to the [controller-as syntax](https://github.com/johnpapa/angular-styleguide#controllers) and get rid of `$scope` in your controller files as well as in the templates.

```html
<div ng-controller="PersonController as personCtrl">
    <div ng-repeat="person in personCtrl.people">
        {% raw %}{{ person.name }}{% endraw %}
    </div>
    <button ng-click="personCtrl.add()">Add</button>
</div>
```

```javascript
angular
    .module('demo', [])
    .controller('PersonController', PersonController);

function PersonController(){
    this.people = [
        {
            name: 'Juri'
        },
        {
            name: 'Steffi'
        }
    ];
};
```

First of all, Angular 2 won't have any concept of `$scope` and then - especially in the HTML - using the controller-as syntax avoids a lot of headache when it comes to nested controllers.

### Links

- [Angular StyleGuide](https://github.com/johnpapa/angular-styleguide#controllers)
- [Exploring Angular 1.3: Binding to Directive Controllers](http://blog.thoughtram.io/angularjs/2015/01/02/exploring-angular-1.3-bindToController.html)

## Use directive controllers where possible

When you create new Angular directives you actually have different possibilities where to define your logic:

```javascript
angular
    .module('demo', [])
    .directive('personDisplay', PersonDisplayDirective);

function PersonDisplayDirective(){
    return {
        compile: function(element, attrs){
            // implement logic
        },
        link: function($scope, iElement, iAttrs){
            // implement logic
        },
        controller: function(){
            // implement logic
        }
    }
}
```

When should we use which?? That's a common question among Angular devs. You can find some suggestions on the Angular docs and in various online communities, but it's not always that clear. 

**Angular 2 removes all of these**, you'll have a component (directive) and a controller class associated to it. As an obvious result, **people suggest to use "directive controllers" wherever possible**.

```javascript
angular
    .module('demo', [])
    .directive('personDisplay', PersonDisplayDirective);

function PersonDisplayDirective(){
    return {
        controller: function(){
            // implement logic
        },
        controllerAs: 'vm'
    }
}
```

I asked on Twitter:

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">True to say we should avoid the compile/link fns and use directive controllers with bindToController etc. ? <a href="https://twitter.com/hashtag/angular?src=hash">#angular</a> //cc <a href="https://twitter.com/PascalPrecht">@PascalPrecht</a></p>&mdash; Juri Strumpflohner (@juristr) <a href="https://twitter.com/juristr/status/616859925193576450">July 3, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Pascal Precht - Angular expert @ [Thoughtram](http://thoughtram.io) - answered:

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/juristr">@juristr</a> In addition, it&#39;s much more aligned with the philosophy behind Angular 2 components. I recommend using controllers where possible</p>&mdash; Pascal Precht ʕ•̫͡•ʔ (@PascalPrecht) <a href="https://twitter.com/PascalPrecht/status/616877259895504896">July 3, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

From his perspective:

- No you shouldn't avoid them per se. The point is, as long as you do stuff that hasn't to be in compile/pre/postlink, put it in ctrl
- In other words, in most of the cases you actually don't need to deal with compile/link. Controller gives you everything you need
- Except for cases like ngModelController, which registers itself at ngFormController during preLink
- However, when controller is enough, use that. You don't have to deal with rather complicated compile/link things.
- In addition, it's much more aligned with the philosophy behind Angular 2 components. I recommend using controllers where possible
- Also easier to test!

Note that one issue when you use directive controllers is often on how to reference the directive scope properties from within the controller - since we should possibly avoid `$scope`. Since Angular v1.3 there is the boolean `bindToController` property and recently in v1.4 they've even improved it s.t. you can write things like

```javascript
return {
  restrict: '...',
  bindToController: {
    val1: '=',
    val2: '@'
    ...
  },
  controller: function($log){
    // access them with
    $log.debug(this.val1);
  }
}
```

There's a nice article on Thoughtram about that. Follow the link below.

### Links

- [Exploring Angular 1.3: Binding to Directive Controllers](http://blog.thoughtram.io/angularjs/2015/01/02/exploring-angular-1.3-bindToController.html)

## Prefer Components over Controllers

Angular 2 follows the current trend of web components. Thus, it won't have autonomous controllers any more, but just in conjunction with so-called **components**. An Angular 2 app is a tree of nested components, with a top-level component being the app.

So rather than having controllers, start to create such widgets or components that are autonomous. In Angular 1.x we know them as **directives**. Search for template dependent controllers and try to move them into separate directives. For example, refactoring the previous example we could get something like this:

```html
<div ng-controller="PersonController as personCtrl">
    <!-- PersonController scope --> 

    <people-list people="personCtrl.people">
        <!-- PersonListController scope here -->

        <div ng-repeat="person in personListCtrl.people">
            {% raw %}{{ person.name }}{% endraw %}
        </div>

        <button ng-click="personListCtrl.add()">Add</button>
    </people-list>
</div>
```

Note that `PersonController` passes in the data required by our list component. Thus it remains fairly re-usable. All it does is creating the UI functionality.

```javascript
angular
    .module('demo', [])
    ...
    .directive('peopleList', peopleListDirective);

function peopleListDirective(){
    return {
        controllerAs: 'personListCtrl',
        controller: function($scope, $attrs){
            this.peopleList = $scope.eval($attrs.people);

            this.add = function(){
                // implementation
            }.bind(this);
        }
    }
}
```

## Use Observables instead of $watch

David East [recently spoke at Angular U](https://www.youtube.com/watch?v=KWz7IAm35UM) on how to prepare for upgrading to NG 2. What's particularly interesting is his usage of [Rx.js](https://github.com/Reactive-Extensions/RxJS) to avoid `$watch`.

```javascript
angular.module('demo', [])
    .service('peopleService', PeopleService);

function PeopleService() {
  var peopleSubject = new Rx.ReplaySubject();

  var service = {
    subscribe: function(subscription) {
      peopleSubject.subscribe(subscription);
    },
    add: function(people) {
      people.push({
        name: 'Name ' + (people.length + 1)
      });

      // broadcast
      peopleSubject.onNext(people);
    }
  };
  return service;
}
```

At this point, on the `PeopleController` one can subscribe to the changes

```javascript
function PersonController(peopleService) {
  var vm = this;
  vm.people = [];

  peopleService.subscribe(function(people) {
    vm.people = people;
  });
}
```

In the `people-list` directive, that same people service can be used to broadcast new changes

```javascript
function peopleListDirective() {
  return {
    controllerAs: 'peopleListCtrl',
    controller: function($scope, $attrs, peopleService) {
      this.people = $scope.$eval($attrs.people);

      this.add = function() {
        peopleService.add(this.people);
      }.bind(this);
    }
  }
}
```

<iframe src="http://embed.plnkr.co/bLTZhfhL4eaYYjsLG9oZ/preview" width="100%" height="400px"> </iframe>

### Links

- Presentation by David East on preparing for Angular 2
  - Video: [https://www.youtube.com/watch?v=KWz7IAm35UM](https://www.youtube.com/watch?v=KWz7IAm35UM)
  - Source Code: [https://github.com/davideast/angularu-a2-migration](https://github.com/davideast/angularu-a2-migration)
- [Reactive Extensions - Rx.js](https://github.com/Reactive-Extensions/RxJS)