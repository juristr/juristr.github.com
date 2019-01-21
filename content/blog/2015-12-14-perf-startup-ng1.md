---
title: Improve your Angular 1.x startup time
lead: A neat and simple trick to give your app some boost
show_img_in_detail: true
coverimage: false
category: null
categories:
  - Angular.js
  - JavaScript
date: 2015-12-14T01:00:00.000Z
comments: true
url: /blog/2015/12/perf-startup-ng1
type: post
image: /blog/assets/imgs/ng1-improve-startup.png
---

{{< postad >}}

This neat and simple trick originally appeared about a year ago [on this blog post](http://ng-perf.com/2014/10/24/simple-trick-to-speed-up-your-angularjs-app-load-time/), so it's not something I came up with by myself.

> "Angular’s watcher functions for ng-bind and text nodes ({{expression}}) put binding information inside the respective DOM elements using jQuery .data method. This is unfortunately a very expensive operation that impacts both load times and time taken to delete nodes. Fortunately this information is not used in actual binding and is mostly for debugging purposes."

**Note, this can be used starting from Angular 1.3+ onwards.**

I first discovered it in [Swimlane's](http://swimlane.com/) Angular 1 [SystemJS seed project](https://github.com/Swimlane/angular-systemjs-seed). The trick basically consists in **disabling the debug information** on the `$logProvider` as well as `$compileProvider` through dedicated function calls. That could look like this:

```javascript
angular
  .module('myApp', [])
  .config(function($logProvider, $compileProvider) {
    
    if (window.prod) {
      $logProvider.debugEnabled(false);
      $compileProvider.debugInfoEnabled(false);
    }

  });
```

Now you may ask yourself, where does `window.prod` come from? Well that's basically something you have to set during your production build. Frankly, it could be as simple as

```html
<!doctype html>
<html>
  ...
  <script>
    window.prod = true;
  </script>
</html>
```

Obviously you may want to automate this through your build configuration, like to inject it right in the beginning of your main application script.

In a RequireJS Grunt task that might look like...

```javascript
  ...
  requirejs: {
    dist: {
      options: {
        ...
        wrap: {
          start: '(function() { window.prod = true; })();'
        }
      }
    }
 }
```

..or as the guys from Swimlane did [in their Gulp configuration](https://github.com/Swimlane/angular-systemjs-seed/blob/master/build/tasks/release.js#L11)

```javascript
 ...
 return gulp.src('dist/app/app.js')
    .pipe(insert.prepend("window.prod = true;\n"))
    .pipe(insert.prepend(cacheBust))
    .pipe(gulp.dest('dist/app'));
...
```


It is a nice and easy to add performance booster that can be added without any major effort :smiley:.
