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

Bla bla bla

{% include ng-series.html %}

## controller-as syntax

```html
<div ng-controller="PersonController as personCtrl">
    <div ng-repeat="person in personCtrl.people">
        {{ person.name }}
    </div>
    <button ng-click="personCtrl.add()">Add</button>
</div>
```

```javascript
angular
    .module('demo', [])
    .controller('PersonController', PersonController);

function PersonController(){
    var vm = this;
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

Rather than having controllers, create fairly autonomous components or better know as **directive** in Angular 1.x. Search for template dependent controllers and try to move them into separate directives.

Angular 2 won't have any autonomous controllers, but just together with a component (directive). An Angular 2 app is a tree of components, starting from a top-level component which is the app itself.

```html
<div ng-controller="PersonController as personCtrl">
    <people-list people="personCtrl.people">
        <!-- personListCrl scope here -->
        <div ng-repeat="person in personListCtrl.people">
            {{ person.name }}
        </div>
        <button ng-click="personListCtrl.add()">Add</button>
    </people-list>
</div>
```

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

- https://www.youtube.com/watch?v=KWz7IAm35UM

