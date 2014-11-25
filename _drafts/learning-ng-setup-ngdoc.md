---
layout: post
title: "Learning Angular: Setup ngdoc"
lead: ""
show_img_in_detail: true
coverimage: false
category:
tags: ["JavaScript", "Angular.js", "angular-directives"]
---

Intro bla bla...

{% include ng-series.html %}

If you have a larger code base you'll definitely want to document your source code properly. There are different approaches for doing this in JavaScript. Lots of people following the [Literate Programming](http://en.wikipedia.org/wiki/Literate_programming) style use tools like [Groc])(https://github.com/nevir/groc) for documenting your code. Examples are the documentation of [Jasmine](http://jasmine.github.io/edge/introduction.html) or the one of [Groc itself](http://nevir.github.io/groc/). With Groc you simply annotate your code in a way that you can read through the comments.

```javascript
/**
# The User class

This class is used to represent the information associated to a user

*/
(function(){

    // The contructor takes a name and age.
    var User = function(name, age){
        this.name = name;
        this.age = age;
    };
    
    ...

    User.prototype.hasGrants = function(requiredGrants){
        // If the required grants is defined
        if(requiredGrants){
            // then check the local grants array for matching grants.
            for(var i=0; i<this.grants; i++){
                ...
            }
        }

        // or simply return false if we didn't find a matching grant
        return false;
    };
});

```

The other approach is to use a JavaDoc style, namely [JSDoc](http://usejsdoc.org/).

```javascript
(function(){

    /**
    * Creates a new User.
    * @class
    */
    var User = function(name, age){
        this.name = name;
        this.age = age;
    };
    
    ...

    /** @function hasGrants 
        Checks whether the given user has the required grants

        @param {Array} requiredGrants the grants to check against
        @returns {Boolean} true if the user has the grants, false otherwise
    */
    User.prototype.hasGrants = function(requiredGrants){
        if(requiredGrants){
            for(var i=0; i<this.grants; i++){
                ...
            }
        }

        return false;
    };
});
```

Angular uses a feature augmented JSDoc variant for generating [its documentation](https://docs.angularjs.org/api) and it can be used by any Angular project. A good example is the one for sure Pascal Precht's [angular-translate](https://github.com/angular-translate/angular-translate).

<figure>
    <img src="/blog/assets/imgs/learning_angular/ngdoc-angular-translate.png" />
    <figcaption>Documentation generated with ngdoc for angular-translate</figcaption>
</figure>

## Setup in Angular with Grunt

<pre>
$ npm install --save-dev grunt-ngdocs
</pre>

```javascript
ngdocs: {
  options: {
    dest: 'docs/ngdocs',
    // scripts: ['../app.min.js'],
    html5Mode: false,
    startPage: '/source',
    title: 'Mapsconsole Documentation',
    // image: "path/to/my/image.png",
    // imageLink: "http://my-domain.com",
    // titleLink: "/api",
    bestMatch: true,
    // analytics: {
    //       account: 'UA-08150815-0',
    //       domainName: 'my-domain.com'
    // },
    // discussions: {
    //       shortName: 'my',
    //       url: 'http://my-domain.com',
    //       dev: false
    // }
  },
  source: {
    src: ['<%= yeoman.app %>/scripts/**/*.js'],
    title: 'Source Documentation'
  }
}
```

Suggested to create a proper task to clean the directory:

```javascript
grunt.registerTask('docs', [
'clean:ngdocs',
'ngdocs'
]);
```


## Links

- https://www.npmjs.org/package/grunt-ngdocs
- https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation
- https://github.com/idanush/ngdocs/wiki/API-Docs-Syntax
- https://github.com/angular/angular.js/blob/master/src/ngSanitize/sanitize.js
- https://github.com/angular-translate/angular-translate/blob/master/src/directive/translate.js
- http://angular-translate.github.io/docs/#/api