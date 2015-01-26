---
layout: post
title: "Learning Angular: Watch out when declaring directive attributes"
lead: "The devil is in the detail...or in the attribute's casing"
show_img_in_detail: true
coverimage: false
category:
tags: ["JavaScript", "Angular.js", "learning-ng"]
---

Intro bla bla...

{% include ng-series.html %}

I have two directives, `<my-menu-item>` and `<another-dir>` define as follows:

```javascript
angular.module('plunkr', [])
    .directive('myMenuItem', function(){
      return {
        restrict: 'E',
        scope: {
          obj: '=menuItem'
        },
        template: '<div>{{ obj.title }}</div>'
      };
    })
    .directive('anotherDir', function(){
      return {
        restrict: 'E',
        scope: {
          obj: '=data'
        },
        template: '<div>{{ obj.title }}</div>'
      }
    });
```

Consider that I use them in my demo application like this:

```html
<!DOCTYPE html>
<html ng-app="plunkr">
  <head>
    <script data-require="angular.js@*" data-semver="1.3.0" src="//code.angularjs.org/1.3.0/angular.js"></script>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body ng-init="test={ title: 'hi there' }">

    <b>First dir:</b>
    <my-menu-item menuItem="test"></my-menu-item>
    
    <b>Another dir:</b>
    <another-dir data="test"></another-dir>
    
    <script>
      ...
    </script>
  </body>
</html>
```

Note, the `ng-init` is here for the purpose of this demo to quickly initialize an object that I can pass to my directives. This is the outcome:

![](/blog/assets/imgs/learning-ng/dir-wrong-outcome.png)

Not really what one would expect. Seems like directive `<my-menu-item>` doesn't perform well. But what's wrong here??

Both directives create an isolated scope, by defining the `scope` property.

```javascript
return {
    ...
    scope: {
        obj: '=menuItem'
    }
}
```

and

```javascript
return {
    ...
    scope: {
        obj: '=data'
    }
}
```

Internally both represent the object as `obj` while externally the first one uses `menuItem` as the attribute while the second `data`. Normally when you arrive at this level there must be some really silly mistake. Actually it's **the camel casing on the attribute specification**: `=menuItem`. Renaming it to `=menuitem` fixes the issue and renders the expected result.

![](/blog/assets/imgs/learning-ng/dir-correct-outcome.png)

So the correct code should be

```javascript
angular.module('plunkr', [])
    .directive('myMenuItem', function(){
      return {
        restrict: 'E',
        scope: {
          obj: '=menuitem'
        },
        template: '<div>{%raw%}{{ obj.title }}{%endraw%}</div>'
      };
    })
    .directive('anotherDir', function(){
      return {
        restrict: 'E',
        scope: {
          obj: '=data'
        },
        template: '<div>{{ obj.title }}</div>'
      }
    });
```

Here's the **Plunkr** url to try it out by yourself: [http://plnkr.co/edit/UgN6gP?p=preview](http://plnkr.co/edit/UgN6gP?p=preview).

