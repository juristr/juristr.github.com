---
layout: post_new
title: "From Angular 1 to Angular 2: An oversimplified example"
lead: ""
category: angular2
tags: [ "JavaScript", "Angular" ]
---

<div class="article-intro">
	
</div>

{% include postads %}

Let's take a look at a very simple Angular 1 app.

```html
<!DOCTYPE html>
<html ng-app="plunker">
  <head>
		...
  </head>

  <body ng-controller="MainCtrl">
    <input type="text" ng-model="greeting">
    <hr/>
    {%raw%}{{ greeting }}{%endraw%}, stranger!
  </body>

</html>
```

The corresponding code would look like:

```javascript
angular.module('plunker', [])
  .controller('MainCtrl', function($scope) {
    $scope.greeting = 'Hi';
  });
```

[Here's the Plunker.](https://plnkr.co/edit/vQaRCreXqFr1erKMFy1c?p=preview)

Let's now gradually move this to the Angular 2 syntax. Before jumping straight into Angular 2, you should consider refactoring your Angular 1 app.

As a first step **remove ng-controller** and wrap it into a component. With this step we should also get rid of `$scope`.

```javascript
angular.module('plunker', [])
  .directive('app', function() {
    return {
      restrict: 'EA',
      controller: function() {
        this.greeting = 'Hi';
      },
      controllerAs: '$ctrl'
    }
  });
```

The HTML changes as well:

```html
<body app>
  <input type="text" ng-model="$ctrl.greeting">
  <hr/>
  {%raw%}{{ $ctrl.greeting }}{%endraw%}, stranger!
</body>
```

[Here's the Plunker.](https://plnkr.co/edit/LmnahL2Qt2nvjPTK7wuz?p=preview)

```html
<body ng-app="plunker">
	<app></app>
</body>
```

```javascript
angular.module('plunker', []);
  .directive('app', function() {
    return {
      restrict: 'E',
      scope: {},
      controller: function() {
        this.greeting = 'Hi';
      },
      controllerAs: '$ctrl',
      template: [
        '<div>',
          '<input type="text" ng-model="$ctrl.greeting">',
          '<hr/>',
          '{%raw%}{{ $ctrl.greeting }}{%endraw%}, stranger!',
        '</div>'
      ].join(' ')
    }
  });
```

[Here's the Plunker.](https://plnkr.co/edit/0crmPP39KarOmshBSyIR?p=preview)

---

## Switching to Angular 2

```html
<body>
	<app></app>
</body>
```

```javascript
import {Component} from 'angular2/core'

@Component({
  selector: 'app',
  providers: [],
  template: `
    <div>
      <input type="text" [(ngModel)]="greeting">
      <hr/>
      {{ greeting }}, stranger!
    </div>
  `,
  directives: []
})
export class App {
  greeting: string = 'Hi';
  
  constructor() {
  }
}
```



