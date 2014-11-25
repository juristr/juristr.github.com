---
layout: post
title: "Learning Angular: Securing UI routes"
lead: ""
show_img_in_detail: true
coverimage: false
category:
tags: ["JavaScript", "Angular.js", "angular-security"]
---

Intro bla bla...

{% include ng-series.html %}

## Problem

Securing the UI routes -> prevent a user can navigate to a route.

### Through resolve function

Either do it through the resolve function like...

```javascript
function($q, $timeout, user){
 var deferred = $q.defer();

 $timeout(function(){
   var grantsArray = grants.split(',');
   var canAccess = user.canAccess(grantsArray);
   if(!canAccess){
     deferred.reject();
   }else{
     deferred.resolve();
   }
 },10);

 return deferred.promise;
};
```

### Using the $stateChangeStart event

```javascript
.run(function($log, $rootScope, $state, $location, $urlRouter, user){
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        var requiredGrants = toState.grants;
        if(requiredGrants){
        if(user.canAccess(requiredGrants.split(',')) === false){
          event.preventDefault();
          $log.debug('core/module.js: Unauthorized to switch to route ' + toState.url);
          $state.go('unauthorized');
        }
        }

                  $log.debug('Route (' + $location.$$url + ') changed from ' + fromState.url + ' to ' + toState.url);

                });
              });)
```