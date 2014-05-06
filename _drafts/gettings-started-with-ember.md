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

## Templating

Implicitly I've already come across the Handlebars templates (see sections before). But let's take a deeper look at them. The following two links are for sure useful:

- [Handlebarsjs official site](http://handlebarsjs.com/)
- [Try Handlebars in your browser](http://tryhandlebarsjs.com/)

Just to let everyone know upfront:

> [Mustache templates](http://mustache.github.io/) are compatible with Handlebars, so you can take a Mustache template, import it into Handlebars, and start taking advantage of the extra Handlebars features.

Databinding is done with curly braces {% raw %}`{{ .. }}`{% endraw %}. Here's a quick overview of some features:

{% raw %}
    <h1>Editing Person</h1>
    <label>Name:</label> {{ name }}
    <label>Marital status:</label> {{ name }} is {{#if isMarried }}married {{else}}not married {{/if}}.

    <p>{{name}} has {{#if children.length }}got {{children.length}} children:</p>
    <ul>
    {{#each children}}
      <li>{{name}}</li>
    {{/each}}
    </ul>
    {{else}}
    no children.</p>
    {{/if}}
{% endraw %}

and given the following JSON structure..

    { 
      "name" : "Juri",
      "age": 28,
      "isMarried": false,
      "children": [
         {
           "name": "Jim"
         },
         {
           "name": "Tess"
         }
      ]
    }

..renders this HTML structure:

    <h1>Editing Person</h1>
    <label>Name:</label> Juri
    <label>Marital status:</label> Juri is not married .

    <p>Juri has got 2 children:</p>
    <ul>
      <li>Jim</li>
      <li>Tess</li>
    </ul>

_(I don't have any children btw, this is just for the sake of this demo ;))_

The {% raw %}`{{#each .. }}`{% endraw %} expressions above is called a **block expressions** as it changes the context of the section in surrounds. Note that the context of the whole template above is the JSON structure representing a person, while within the `each` loop, the context is the child.

Similarly you can force a "context switch" by using `#with`:

{% raw %}
    <h1>{{ title }}</h1>
    ...
    {{#with author}}
      by {{firstname}}
    {{/with}}
{% endraw %}

Another interesting concept (which most serious templating engines support) is to register custom helpers. Like

    Handlebars.registerHelper('fullname', function(person){
      return person.firstname + ' ' + person.lastname;
    });

Inside your template simply invoke it

{% raw %}
    {{fullName person}}
{% endraw %}

Obviously everything is HTML encoded by default. If you want to prevent that, use three curly braces instead: {% raw %}`{{{ non_encoded_HTML }}}`.{% endraw %}

If you need to bind **DOM attributes**, there is a suitable helper as well:

{% raw %}
    <input type="checkbox" {{bind-attr disabled=isAdministrator}}>
{% endraw %}

If `isAdministrator` returns false, the disabled attribute is not added to the DOM element. This is quite handy, the only downside is with `data-*` attributes.

{% raw %}
    {{#link-to "photos" data-toggle="dropdown"}}Photos{{/link-to}}
{% endraw %}

By default they will not be added, hence the `data-toggle` from this example won't be rendered. You have to allow it explicitly:

    Ember.LinkView.reopen({
      attributeBindings: ['data-toggle']
    });

On the Ember page they also propose a generic version that allows all of them:

    Ember.View.reopen({
      init: function() {
        this._super();
        var self = this;

        // bind attributes beginning with 'data-'
        Em.keys(this).forEach(function(key) {
          if (key.substr(0, 5) === 'data-') {
            self.get('attributeBindings').pushObject(key);
          }
        });
      }
    });

Still, I didn't quite get why this is the default behavior.

### Actions

Before we've already seen the `#link-to` helper for generating route-links to other templates. Instead, if you'd like to fire an action back to your controller, you can specify it as follows:

{% raw %}
    <button type="submit" {{action 'save'}}>Save</button>
{% endraw %}

Back on your controller or route (I come back later to this) you specify the action

    Ember.MyEditController = Ember.ObjectController.extend({
      actions: {
        save: function(){
          console.log('action called');
        }
      }
    });

What's neat is that you can also pass data-bound objects directly on these actions:

{% raw %}
    <button type="submit" {{action 'save' person}}>Save</button>
{% endraw %}

In your action implementation:

    ...
    actions: {
      save: function(person){
        // save the person somewhere
      }
    }

These actions are **bubbled up** through a well defined chain.

<figure>
  <img src="/blog/assets/imgs/emberjs/action-bubbling.png" />
  <figcaption>Source: Offical Ember.js site</figcaption>
</figure>

### partials, view helper and render

You can also render another "partial view" within your current one. They have to be prefixed with `_` like

    <script type="text/x-handlebars" data-template-name="_mypartial">
      ...
    </script>

in order to be able to reference them in your main view as follows:

{% raw %}
    ...
    {{partial "mypartial"}}
{% endraw %}

You can also name it according to your resource grouping as discussed before. For instance in my example of the "favlinks" views I might want to have a partial named `favlinks/_linkentry`

{% raw %}
    <script type="text/x-handlebars" data-template-name="favlinks/_linkentry">
      <tr>
        <td>{{title}}</td>
        <td>{{description}}</td>
        <td>{{#link-to 'favlinks.details' this class="btn btn-default"}}Details{{/link-to}}</td>
      </tr>
    </script>
{% endraw %}

..which is then called as follows:

    {{#each links}}
      {{partial "favlinks/linkentry"}}
    {{/each}}

When you use the {% raw %}`{{view}}`{% endraw %} helper instead, you don't provide a template name but rather a "view class" (more about that later).

{% raw %}
    {{view App.AuthorView}}
{% endraw %}

The **render** helper can do even more advanced stuff like _(from the official docs)_

- retrieving the corresponding singleton instance of the controller if no model is provided
- when a model is provided it fetches the corresponding unique instance for it
- renders the template using that found controller
- sets the model of the corresponding controller


## Views

## Controllers

## Models and Data

Ember data handling is build upon the following concepts:

- Records
- Models
- Store
- Adapters
- Serializers
- Automatic caching


In Ember every route has an associated model. We have already seen that before when I implemented the `App.FavlinksDetailsRoute`'s model function. Ember's models don't really hold the data itself but rather implement the properties and behavior of how that data is presented to the user.  
Other than that, there are no big differences to other frameworks. You can defined attributes, computed attributes, defaults, relationships etc...An example from the official Ember docs:

    var attr = DS.attr;

    App.User = DS.Model.extend({
      username: attr('string'),
      email: attr('string'),
      verified: attr('boolean', {defaultValue: false}),
      createdAt: DS.attr('string', {
          defaultValue: function() { return new Date(); }
      }),
      person: DS.belongsTo('person')
    });

The data is contained in **records** which are instances of a model. They are identified by the _model type_ and a _global unique id_.

Records are being retrieved from a **store** which acts as a central repository, a cache of all available records. An instance of the store is created automatically and made available throughout the controllers and routes.

    this.store.find('person', 5);

For retrieving and storing data, Ember uses **adapters**. It is basically an abstraction layer for the store, hiding the concrete persisting/retrieving of the data, which - for instance -might be over WebSockets, localStorage or HTTP.

**Serializers** simply define how the raw JSON data is transformed into a proper record object. This may include normalization procedures such as converting to camel case but also for representing relationships among models.

**Caching** is done automatically. If a record is already loaded, then whenever you ask for it a second time the same instance will be returned, thus minimizing the round-trips to the server.

<figure>
  <img src="http://emberjs.com/images/guides/models/finding-unloaded-record-step1-diagram.png" />
  <figcaption>Overview diagram (from the <a href="http://emberjs.com/guides/models/">official docs</a>)</figcaption>
</figure>

### Defining your models

You can define models (as already shown quickly before) by defining the allowed set of attributes, their data types or computed properties. Here's an example from the docs:

    var attr = DS.attr;

    App.Person = DS.Model.extend({
      firstName: attr(),
      lastName: attr(),

      fullName: function() {
        return this.get('firstName') + ' ' + this.get('lastName');
      }.property('firstName', 'lastName')
    });

`fullName` would be a so-called **computed property**. This is done by calling `.property(...)` and passing the other properties that `fullName` depends on. This probably to allow live-binding, s.t. when either `firstname` or `lastName` changes, `fullName` needs to be updated as well. This stuff works on `Ember.Object` and is just inherited from `DS.Model`: [http://emberjs.com/guides/object-model/computed-properties/](http://emberjs.com/guides/object-model/computed-properties/).

Setting and/or getting attributes is done through the `get(..)` and `set(..)` functions.

    var aPerson = App.Person.create();
    aPerson.set('firstName', 'Juri');
    console.log('My name is ' + aPerson.get('firstName'));

## Client - Server Communication

- supports versioned endpoints


## Testing

There is an ongoing pull request: [https://github.com/emberjs/website/pull/1401](https://github.com/emberjs/website/pull/1401).

## Conclusion

### How does it compare to JavaScriptMVC (v3.2)

- less boilerplate code for hooking up controllers etc?

### Open Questions

- How to fetch views dynamically?? Do I need to include all of them in the index.html from the very beginning??

### Links and Credits

- [This demo on JSFiddle](http://jsfiddle.net/juristr/S3R2B/13/)
- [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi?hl=en)
- http://www.asp.net/single-page-application/overview/templates/emberjs-template
- http://ember.codeschool.com/
