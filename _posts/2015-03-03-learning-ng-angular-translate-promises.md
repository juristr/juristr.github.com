---
layout: post
title: "Learning Angular: Set your language culture before any UI is displayed"
lead: "Learn about angular-tranlsate's promises and how to make sure your language locales are loaded before any UI element"
show_img_in_detail: true
coverimage: false
category:
tags: ["JavaScript", "Angular.js", "angular-translate", "learning-ng"]
---

In this article I briefly outline an issue I had, namely to make sure that my language's locale files are loaded by angular-translate before any UI is shown. First, this prevents from any unwanted flickering and second it helps to avoid wrong displaying of localized data. But see for yourself.

{% include ng-series.html %}

## Problem

In my application I set the user's language based on his personal preferences. Meaning I have a backend api `/api/v1/users/current` that returns the information about the current user:

```json
{
  "username": "juristr",
  ...
  "language": "de"
}
```

As most angular devs, I use **[angular-translate](http://angular-translate.github.io/) for i18n** stuff. So besides some details about how I use angular-translate's partial loading capabilities to get all the different localization files, I use `$translate.use(..)` to set the language based on the user's preferences. Changing the language will automatically refresh any translations that are bound on the UI

```html
{%raw%}{{ "message" | translate }}{%endraw%}
```

So far so good. But there's an issue: I have to make sure the language is set before the UI is being rendered to make sure the data is displayed in the correct locale. But wait, didn't you just say the UI will be refreshed when the language changes? So at least you see some flickering..  
Well, not exactly. My data structure looks like this:

```javascript
{
  name: {
    de: 'Deutscher',
    en: 'English value',
    it: 'valore in italiano'
  },
  ...
}
```

In the HTML code I bind it like

```html
{%raw%}{{ vm.data.name[vm.currentLanguage] }}{%endraw%}
```

..and the controller obviously binds the `vm.currentLanguage` to `$translate.use()` and `vm.data` to the sample data structure shown above.

Now this doesn't refresh any more.

## Solution

First of all I had to make sure the user as well as the language are set before anything else. Since a user could enter the application through some client-side route like `/index.html#people/edit`, the **[route's resolve function](https://github.com/angular-ui/ui-router/wiki)** offered itself as a good candidate.

Furthermore, `$translate.use()` **returns a promise!** The result

```javascript
$stateProvider
  .state('home', {
     url: '/',
     ...
     resolve: {
       ensureUserAndLanguage: function($log, $q, $translate, user){
         var deferred = $q.defer();
         user.getCurrent()
           .then(function(result){
             $log.debug('Route resolve. Setting lang to ' + result.language);

             // HERE'S THE IMPORTANT PART!!
             $translate.use(result.language)
               .then(function(){
                  $log.debug('$translate.use. Lang is: ' + $translate.use());

                  deferred.resolve();
               });

           });

         return deferred.promise;
       }
     }
  });
```

And it works! Here's a Plunker file with the code. Note that you have to open the edit view to see it work properly.

<iframe src="http://embed.plnkr.co/pb8qO3J604QNri0Wf7uz/preview" width="100%" height="400px"> </iframe>
[Link](http://plnkr.co/edit/pb8qO3J604QNri0Wf7uz?p=info)

**Attention:** In my real application, I dynamically attach the above shown resolve function to my routes. Obviously you need to cache calls like `user.getCurrent()` s.t. they don't call the backend each time a client-side route changes. Furthermore while simply resolving with nothing, it would be more meaningful to resolve with an object that contains the user object and current language s.t. they are at disposal for an eventual controller, like

```javascript
resolve: {
    metaInfo: function(...) {
      var deferred = $q.defer();
      ...
      user.getCurrent()
        .then(function(result){
          ...
          $translate.use(result.language)
            .then(function(currentLanguage){
                deferred.resolve({
                  user: result,
                  language: currentLanguage
                });
            });
        });
      ...
    }
}
```

An eventual "route controller" can then take an object `metaInfo` containing the user and current language.
