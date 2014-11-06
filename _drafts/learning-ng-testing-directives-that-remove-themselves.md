---
layout: post
title: "Learning Angular: Testing directives that remove themselves"
lead: ""
show_img_in_detail: true
coverimage: false
category:
tags: ["JavaScript", "Angular.js", "angular-directives", "learning-ng"]
---

Intro bla bla...

{% include ng-series.html %}

## Problem

Testing is important...

what I'd like to achieve is to test a directive that removes the element that it is attached to...

```javascript
function restrictDirective(user){
      return {
          restrict: 'A',
          compile: function(tElement, attributes){
              ...
              if(accessGranted === false){
                  tElement.remove();
              }
          }
      };
  }
```

I've seen people do...

```javascript
expect(element).toBeUndefined();
```

or

```javascript
expect(element.is(':visible')).toBeFalsy();
```

...

## Solution

- checking for visibility only works when you actually attached it to some DOM element. jasmine-jquery might be an option in that case
- Otherwise you need to wrap it in a parent div when you compile your directive. Then check for its presence or verify whether it has a class `ng-hide` in case...

- Chat on the IRC channel: http://echelog.com/logs/browse/angularjs/1415228400
- https://gist.github.com/juristr/8153001bed4f3462c8c7
- http://plnkr.co/edit/tzDqRKMd3eCqeljmMYMr?p=preview
- http://plnkr.co/edit/oNz6FmgIJb2XKayFmaGa?p=preview

## Links

- [SO: test that removes elements, but which is written in a wrong manner](http://stackoverflow.com/questions/18043412/displaying-different-content-within-a-single-view-based-on-the-users-role)
- [AngularJS Directive Attribute Binding Explanation](https://gist.github.com/CMCDragonkai/6282750)