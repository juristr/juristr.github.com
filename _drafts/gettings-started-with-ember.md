---
layout: post
title: "An introduction to Ember.js"
show_img_in_detail: false
coverimage: false
tags: ["JavaScript"]
---


## Basic concepts

As most SPA you start with an `index.html` which loads all of the required Ember JS files.

    <!DOCTYPE html>
    <html>
    <head>
      ...
      <script src='jquery.js'></script>
      <script src='handlebars.js'></script>
      <script src='ember.js'></script>
      <script src='ember-data.js'></script>
      <script src='app.js'></script>
    </head>
    <body>
      ...
    </body>
    </html>

Ember uses [HandleBars](http://handlebarsjs.com/) as its templating engine:

    <script type="text/x-handlebars-template">
      <p>
        Hi, welcome {{ name }}!
      </p>
    </script>

You need to have an **application template** which Ember loads by default and which represents your application layout.

<figure>
  <img src="/blog/assets/imgs/emberjs/ember-app-layout.png" />
  <figcaption>Potential application layout</figcaption>
</figure>

All of the dynamic content is placed into separate Handlebars templates which you simply define in your index.html. You just need to give them a proper name s.t. Ember can reference and load them accordingly:

    <script type="text/x-handlebars-template" data-template-name="about">
      <h1>About</h1>
      <p>
        Hi, I'm the about page.
      </p>
    </script>

Dynamic templates are loaded into a dedicated region/placeholder inside of the default application template (for instance see `div.container` in the image above) called **outlet**:

    <script type="text/x-handlebars-template" data-template-name="application">
      ...
      {{outlet}}
    </script>

Note that by default Ember loads the template called `index` into the {{outlet}}. Finally, we need to start our Ember app. This is done inside the `app.js`.

    var App = Ember.Application.create({
        LOG_TRANSITIONS: true
    });

The `LOG_TRANSITIONS` property is just for debugging purposes s.t. Ember prints the template transitions to the developer console log (of Chrome Devtools or Firebug).

## Routing

Routing is inevitable in a professional SPA as it enables bookmarking and proper browser history navigation. Don't even try to think about disabling the browser's back button ;) Like many other frameworks, Ember implements the so-called "hashbang" routing

  - `index.html#/about`
  - `index.html#/home`
  - ...

Everything after the `#` is only interpreted by the client-side and won't even be sent to the server. As such it is ideal for defining client-side routes.  
What I found is that Ember doesn't just provide routing as another concept like data binding but everything is literally build around it. Routing is a first class member of the framework.

In the section before I created a template named `about` which I'd like to display when the user navigates to `index.html#/about`. This is done by simply registering a route in Ember:

    App.Router.map(function(){
      this.route('about');
    });

In this way, Ember "connects" the `#/about` with a corresponding template named in the exact same way. If you'd like to have different route and template names you can explicitly specify the path:

    App.Router.map(function(){
        this.route('favorite-links', { path: '/favlinks' });
    });

This setting causes the rendering of the `favorite-links` Handlebars template when we navigate to `#/favlinks`.

> Note that we do not have to specify the default route like when going to `index.html`. Ember will automatically load the template named `index`.

### Linking to routes

In order to invoke the routes from our HTML we could simply add the corresponding href in your menu:

    <a href="#/">Home</a>
    <a href="#/about">About</a>

Ember considers this as bad practice and therefore proposes a link helper. As you can see, you can also easily add custom CSS classes.

{% raw %}
    {{#link-to 'index'}}Home{{/link-to}}
    {{#link-to 'about' class='my-custom-css-class'}}About{{/link-to}}
    {{#link-to 'favorite-links' class='my-custom-css-class'}}About{{/link-to}}
{% endraw %}

Also note that in the `link-to` construct we **do not reference the route** but instead the template that should be rendered. That's actually the whole point about not hardcoding the route as you might want to change it without having to update all of the links that point to it.  
The `link-to` helper is also so kind to add an `.active` class to the link when the hash in the url matches the currently visible template (+1 for this!).

Furthermore if you'd like to customize the rendered HTML tag you can use something like this:

{% raw %}
    {{#link-to 'index' tagName='li'}}Home{{/link-to}}
{% endraw %}

This will instruct Handlebars to render an `<li>` element instead of an `a`. And still, clicking works as before since Ember is smart enough to attach a click handler on the element for performing the hash change.

### Defining controllers

As it appears, when you invoke `#/about` and you didn't specify any controller for that template, Ember creates one for you on the fly. Let's explicitly create a controller for our favorite links template:

    App.FavlinksRoute = Ember.Route.extend({
        setupController: function(controller){
          controller.set('title', 'My favorite Links');
        }
    });

Oops..that doesn't seem to work..

![](/blog/assets/imgs/emberjs/route-error.png)

Given that I previously registered these routes..

    App.Router.map(function(){
       this.route('about');
       this.route('favorite-links', { path: '/favlinks' });
    });

..my intention was to create a corresponding `FavlinksRoute` for the `/favlinks` route. It's the same situation as with the `link-to` helper, you need to point to the Handlebars template name instead of the route. Given I have (a somewhat odd) dash (`-`) in the template name `favorite-links`, based on my experience with other frameworks, options might be..

- `App.Favorite_linksRoute`
- `App.['Favorite-linksRoute']` as - is not a valid JavaScript property name
- `App.FavoriteLinksRoute`

The latter seems to be the case for Ember.

    App.FavoriteLinksRoute = Ember.Route.extend({
        setupController: function(controller){
            controller.set('title', 'My favorite Links');
        }
    });

Since we set the `title` property in the controller, the view can use it

    <script type="text/x-handlebars">
      <h1>{{ title }}</h1>
      ...
    </script>

Btw, **note the route proposals** Ember made when I missed my route definition. There are some routes I didn't explicitly specify like

- loading
- error

Is the `loading` route invoked when the application/data is being loaded and can be used for showing some progress indicator?? And the `error` route for when you have unhandled exceptions?? Yes, [seems so](http://emberjs.com/guides/routing/loading-and-error-substates/). You can use the `loading` route or substate for when the retrieval of some model through the according promise takes too long. What's particularly interesting is that you can have specific loading routes for your models by either subclassing proper routes `App.FooLoadingRoute` or by defining a corresponding template `foo/loading`.

### Resources

Normally your application naturally designs around (data)"resources" of some kind upon which you perform different kind of actions. For my favorite links here, I might for instance have

- `/favlinks` to see a list of all of 'em
- `/favlinks/edit/{:id}` to create a new one if the id is not being passed, to edit otherwise
- `favlinks/{:id}` for viewing the detail of a single one
- ...

To make things a little simpler, let me quickly refactor my favorite links template name from `favorite-links` -> `favlinks`. We can then proceed to group the routes as follows:

    App.Router.map(function(){
      this.resource('favorite-links',)
    });

App.Router.map(function(){
    this.route('about');
    this.resource('favlinks', { path: '/favlinks/:id', function(){
        this.route('edit', { path: '/edit/:id' });
        this.route('view', { path: '/:id' });
    });
});


## Open Questions

- How to fetch views dynamically?? Do I need to include all of them in the index.html from the very beginning??

## Links and Credits

- [This demo on JSFiddle](http://jsfiddle.net/juristr/S3R2B/13/)
- [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi?hl=en)
- http://www.asp.net/single-page-application/overview/templates/emberjs-template
- http://ember.codeschool.com/
