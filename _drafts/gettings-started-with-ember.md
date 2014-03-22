---
layout: post
title: "An introduction to Ember.js"
show_img_in_detail: false
coverimage: false
tags: ["JavaScript"]
---

I've been developing rich JavaScript applications now for about 2 years. At that time I tried Backbone, Spine and finally opted for [JavaScriptMVC](http://javascriptmvc.com). Ember wasn't ready at that time, but now, given the huge community interest I'm taking a deeper look at it.

JavaScriptMVC was the right choice at that time. It is a full stack framework containing everything you need from code generators, documentation engine, build system, dependency injection, a templating engine to even a more advanced testing library based on QUnit. Being heavily based on jQuery it was the easiest way of getting classical ASP.net Webforms webdevs up to speed in developing JavaScript RIA apps.

At that time I heard about Ember at a conference session. But it wasn't really ready. Compared to JMVC it seemed complicated and missed fundamental features. Recently however Ember got a huge boost and lots of interest from the community. Seeing [big state of the art projects like Discourse](http://www.discourse.org/) join the Ember community is for sure favorable as well.

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
What I found is that Ember doesn't just provide routing as another concept like data binding, but instead everything is literally build around it. Routing is a first class member of the framework.

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

Since I set the `title` property in the controller, the view can use it

    <script type="text/x-handlebars">
      <h1>{{ title }}</h1>
      ...
    </script>

Btw, **note the route proposals** Ember made when I missed my route definition. There are some routes I didn't explicitly specify like "loading" and "error".  
Is the `loading` route invoked when the application/data is being loaded and can be used for showing some progress indicator?? And the `error` route for when you have unhandled exceptions?? Yes, [seems so](http://emberjs.com/guides/routing/loading-and-error-substates/). You can use the `loading` route or substate for when the retrieval of some model through the according promise takes too long. What's particularly interesting is that you can have specific loading routes for your models by either subclassing proper routes `App.FooLoadingRoute` or by defining a corresponding template `foo/loading`.

### Resources

Normally your application naturally designs around (data)"resources" of some kind upon which you perform different kind of actions. For my favorite links here, I might for instance have

- `/favlinks` to see a list of all of 'em
- `/favlinks/edit/{:id}` to create a new one if the id is not being passed, to edit otherwise
- `favlinks/details/{:id}` for viewing the detail of a single one
- ...

To make things a bit simpler, let me quickly refactor my favorite links template name from `favorite-links` -> `favlinks`. We can then proceed to group the routes as follows:

    App.Router.map(function(){
        this.route('about');
        this.resource('favlinks', { path: '/favlinks' }, function(){
          this.route('details', { path: '/details/:id' });
          this.route('edit', { path: '/edit/:id' });
        });
    });

**favlinks.index** view

    <script type="text/x-handlebars" data-template-name="favlinks/index">
      <h2>All my saved links</h2>
      <table class="table table-hover">
        ...
        {{#each links}}
          <tr>
            <td>{{title}}</td>
            <td>{{description}}</td>
            <td>{{#link-to 'favlinks.details' this class="btn btn-default"}}Details{{/link-to}}</td>
          </tr>
        {{/each}}
      </table>
    </script>

The according **favlinks.details** view then displays the data:

    <script type="text/x-handlebars" data-template-name="favlinks/details">
      <h2>{{ title }}</h2>
      <p>
        {{ description }}
      </p>
      {{#link-to 'favlinks.edit' this class="btn btn-primary" }}Edit{{/link-to}}
    </script>

..which in turn has a link to the **favlinks.edit** view

    <script type="text/x-handlebars" data-template-name="favlinks/edit">
      <h2>Editing {{ title }}</h2>
      <form role="form">
        <div class="form-group">
          <label>Title</label>
          {{input type="text" value=title class="form-control" placeholder="Enter title"}}
        </div>
        <div class="form-group">
          <label>Description</label>
          {{input type="text" value=description class="form-control" placeholder="Enter description"}}
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>
    </script>

The interesting part here is how we transition between the views, which is through the `link-to` helpers. In the table row I create such a helper, passing it the entire object `this` (which points to the current element in the `each` loop):

{% raw %}
    {{#link-to 'favlinks.details' this class="btn btn-default"}}Details{{/link-to}}
{% endraw %}

There's an interesting effect though I discovered:

<figure>
  <img src="/blog/assets/imgs/emberjs/view-data-transition.gif" />
  <figcaption>Effect when passing the entire object in the link-to</figcaption>
</figure>

Note how the detail correctly displays the object's data, but once we execute a refresh, the actual code for retrieving this object through our route is being executed...

    App.FavlinksDetailsRoute = Ember.Route.extend({
        model: function(params){
          return {
            id: params.id,
            title: 'Title ' + params.id,
            description: 'Description ' + params.id
          };
        }
    });

..which in this implementation returns a dummy object instead of the correct one, thus displaying "Title 1" instead of "StackOverflow".

Given this effect, I deduced that Ember seems to pass on directly the object of the list instead of invoking the route definition's `model` function for retrieving the data. If we perform a refresh it is obviously invoked then.

Instead, if I declared the `link-to` helper using `this.id` instead of passing the entire object,

{% raw %}
    {{#link-to 'favlinks.details' this.id class="btn btn-default"}}Details{{/link-to}}
{% endraw %}

then the `App.FavlinksDetailsRoute` would have been invoked each time, even when not performing a full reload.

## Open Questions

- How to fetch views dynamically?? Do I need to include all of them in the index.html from the very beginning??

## Links and Credits

- [This demo on JSFiddle](http://jsfiddle.net/juristr/S3R2B/13/)
- [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi?hl=en)
- http://www.asp.net/single-page-application/overview/templates/emberjs-template
- http://ember.codeschool.com/
