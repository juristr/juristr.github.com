---
layout: articles-post
title: "Learning Angular: Preparing for Angular 2"
subtitle: "get ready!"
lead: "Collection of best practices to be ready for Angular 2"
show_img_in_detail: true
coverimage: false
category:
tags: ["JavaScript", "Angular.js", "learning-ng"]
---

I'm sure you heard about Angular 2 and that it will be **totally** different :open_mouth: . Jokes apart, if you took a closer look you already know that, yes, it will be new, things will be different (as it's mostly the case with new stuff), but many concepts will still be there. Well, as Angular 2 starts getting more and more concrete, articles, videos and podcasts get published that contains lots of useful information on how to get prepared for it or an eventual migration scenario. This article is meant to be a collection for myself on all of these tips and considered best practices.

**Totally feel free** to submit new practices in my comments. That'd be awesome! You can also directly submit a PR as [this blog is Open Source](https://github.com/juristr/juristr.github.com). Simply click the "Contribute" link above.

{% include ng-series.html %}

## controller-as syntax

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

using Rx.js

```javascript
angular.module('demo', [])
    .service('peopleService', peopleService);

function peopleService(){
    this.people = [];
    this.peopleSubject = new Rx.ReplaySubject();

    this.add = function(){
        this.people.push( { name: 'Name ' + this.people.length + 1 });
        // broadcast change
        this.peopleSubject.onNext(this.people);
    }
}
```

At this point, on the `PeopleController` one can subscribe to the changes

```javascript
function PeopleController(peopleService){
    ...
    peopleService.peopleSubject.subscribe(function(people){
        this.people = people;
    }).bind(this);
}
```

In the `people-list` directive, that same people service can be used to broadcast new changes

```javascript
function peopleListDirective(){
    return {
        ...
        controller: function($scope, $attrs, peopleService){
            this.peopleList = $scope.eval($attrs.people);

            this.add = function(){
                boxService.add();
            };
        }
    }
}
```

Plunkr: http://plnkr.co/edit/bLTZhfhL4eaYYjsLG9oZ?p=preview

## Links

- Presentation by David East on preparing for Angular 2
  - Video: [https://www.youtube.com/watch?v=KWz7IAm35UM](https://www.youtube.com/watch?v=KWz7IAm35UM)
  - Source Code: [https://github.com/davideast/angularu-a2-migration](https://github.com/davideast/angularu-a2-migration)