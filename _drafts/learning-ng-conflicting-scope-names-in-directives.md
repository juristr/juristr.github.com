---
layout: post
title: "Learning Angular: Conflicting scope variable names with directive controllers"
lead: ""
show_img_in_detail: true
coverimage: false
category:
tags: ["JavaScript", "Angular.js"]
---

Intro bla bla...

{% include ng-series.html %}

## Problem:

```html
<first-directive></first-directive>
<second-directive></second-directive>
```

```javascript
.directive('firstDirective', function() {
    return {
      restrict: 'E',
      template: '<div>First directive: {%raw%}{{ vm.msg }}{%endraw%}</div>',
      controller: function() {
        var vm = this;
        vm.msg = 'Hi';
      },
      controllerAs: 'vm'
    };
  })
  .directive('secondDirective', function() {
    return {
      restrict: 'E',
      template: '<div>Second diretive: {%raw%}{{ vm.msg }}{%endraw%}</div>',
      controller: function() {
        var vm = this;
        vm.msg = 'Hello World';
      },
      controllerAs: 'vm'
    };
  });
```

## Output

Clearly you would expect to get two different messages, "Hi" and "Hello World".

<iframe src="http://embed.plnkr.co/ODtRkv/preview" width="100%" height="400px"> </iframe>