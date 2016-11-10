---
layout: post_new
title: "Safe Navigation Operator, RxJS and Async Pipe tinkering"
lead: "Learn how to use the async pipe to write elegant, RxJS powered async code"
postimg: "/blog/assets/imgs/videocover.png"
tags: [ "JavaScript", "Angular"]
---

<div class="article-intro">
    RxJS? Safe Navigation operator? Async pipes? Not sure what I'm talking about? In this article I'd like to explore some cool combination of Http, RxJS and Async Pipes. 
</div>

{% include postads %}

If you already played with Angular 2, I'm pretty sure you came across <a href="http://reactivex.io/rxjs/" target="window">RxJS</a>. It plays a big role in Angular 2, especially in Http, Forms, Async Pipes and Routing. 

{% include article-link.html
    url="/blog/2016/06/rxjs-1st-steps-subject/"
    title="RxJS first steps - Subject and ReplaySubject"
    text="Get started with reactive programming with this introductory video"
    imageurl="http://www.gravatar.com/avatar/64537dfe80f44978663e378d375c7138?s=150&d=identicon&r=PG"
%}

[Rob Wormald's (Angular Developer Evangelist @ Google)](https://twitter.com/robwormald) showed some impressive usage of RxJS with Angular 2 during his talk at NgEurope on ["Angular & RxJS"](https://www.youtube.com/watch?v=WWR9nxVx1ec). Some involved using the Safe Navigation Operator and how it can be replaced via async pipes.

## Our task

Let's assume we have the following data returned by some server API.

```json
{
  "name": "Juri Strumpflohner",
  "status": "Currently coding on a screencast",
  "website": {
    "url": "http://juristr.com",
    "name": "juristr.com"
  },
  "twitter": {
    "url": "https://twitter.com/juristr",
    "name": "@juristr"
  }
}
``` 
We **want to create a component that displays the details of this person** by using the data it gets passed. Something like this:

```javaScript
import {Component, NgModule, Input} from '@angular/core'

@Component({
  selector: 'person-detail',
  template: `
    <div>
      {% raw %}Name: {{ person.name }}<br/>
      Twitter: {{ person.twitter.name }}{%endraw%}
    </div>
  `,
})
export class PeopleComponent {
  @Input() person;
}
```

## Option 1: Pass in a person object

So our first option is to simply get the data in our parent component via the Angular 2 `http` service.

```javascript
this.http
      .get('person.json')
      .map(res => res.json())
      .subscribe(data => {
        this.person = data
      });
```

And then pass the `person` into our `<person-detail>` component.

```javascript
@Component({
  selector: 'my-app',
  template: `
    <div>
      <person-detail [person]="person"></person-detail>
    </div>
  `,
})
export class App {
  person;
  
  constructor(private http:Http) { }
  
  ngOnInit() {
    this.http
      .get('person.json')
      .map(res => res.json())
      .subscribe(data => {
        this.person = data
      });
  }
}
```

But wait. This **won't work**. Look at our `PersonDetailComponent` template:

```html
<div>
      {% raw %}Name: {{ person.name }}<br/>
      Twitter: {{ person.twitter.name }}{%endraw%}
</div>
```

We access `name` and `twitter.name` on `person`, however the latter won't be defined when our component is instantiated. After all, we first need to call the server to get the data. So this results in a runtime exception.

```
Error: Uncaught (in promise): Error: Error in ./PersonDetailComponent class PersonDetailComponent - inline template:1:9 caused by: Cannot read property 'name' of undefined
TypeError: Cannot read property 'name' of undefined
    at _View_PersonDetailComponent0.detectChangesInternal (VM3423 component.ngfactory.js:45)
    at _View_PersonDetailComponent0.AppView.detectChanges (core.umd.js:9305)
    at _View_PersonDetailComponent0.DebugAppView.detectChanges (core.umd.js:9410)
    at _View_App0.AppView.detectViewChildrenChanges (core.umd.js:9331)
    ...
```

### Safe Navigation Operator to the help

By using the Safe Navigation Operator (`?`) we can change our `PersonDetailComponent` template to this:

```html
<div>
      {% raw %}Name: {{ person?.name }}<br/>
      Twitter: {{ person?.twitter.name }}{%endraw%}
</div>
```

Simply speaking, this special operator allows us to bind data to our template that will be available later. When the data becomes available, values evaluated and rebound via change tracking.

### Try yourself

{% assign plunker_url = "https://embed.plnkr.co/YAxbIsJ7YUcxRXX2GSWb/" %}
{% include plunker.html %}

## Option 2: Using async pipes

First of all, **[Pipes](https://angular.io/docs/ts/latest/guide/pipes.html)** are what you may know as "filters" from Angular 1.x. Just as the original Unix pipes, they allow you to pass data through it and do something with it, such as transform the data for instance. Here's an example of how a pipe could look like that formats date values:

```html
{%raw%}{{ someDateValue | format: 'dd/MM/yyyy' }}{%endraw%}
```

There's a special, **built-in pipe**, called `async`. The async pipe accepts an RxJs `Observable` object and does the entire subscription and handling for us. So we can basically transform our original example to this:

```javascript
@Component(...)
export class App {
  person;
  
  constructor(private http:Http) { }
  
  ngOnInit() {
    this.person = this.http
      .get('person.json')
      .map(res => res.json());
  }
}
```

Note how there is no more `subscribe(...)` part but instead we directly assign the returned `Observable` to our `person` variable. But who does the subscription then?? It's the `async` pipe:

```html
@Component({
  selector: 'my-app',
  template: `
    <div>
      <person-detail [person]="person | async"></person-detail>
    </div>
  `,
})
export class App { ... }
```

### Safe Navigation Operator vs. default values

Now that we have our async pipe, we can switch to our detail component and have the choice to either continue to use the safe navigation operator, or rather set default values on our `@Input` property.

**Version 1:**  
Don't use the safe navigation operator, but rather do some default initialization of your `@Input` object.

```javascript
import {Component, NgModule, Input} from '@angular/core'

@Component({
  selector: 'person-detail',
  template: `
    <div>
      Name: {{ person.name }}<br/>
      Twitter: {{ person.twitter.name }}
    </div>
  `,
})
export class PersonDetailComponent {
  
  @Input() person;
  
  ngOnInit() {
    // set default init -> MUST BE IN ngOnInit
     this.person = { twitter: {} };
  }
}
```

Note, for some (to me) unknown reason, this has to be done in the `ngOnInit` lifecycle event, otherwise it won't work.

**Version 2:**  
Simply continue to use the safe navigation operator.

```javascript
import {Component, NgModule, Input} from '@angular/core'

@Component({
  selector: 'person-detail',
  template: `
    <div>
      Name: {{ person?.name }}<br/>
      Twitter: {{ person?.twitter.name }}
    </div>
  `,
})
export class PersonDetailComponent {
  
  @Input() person;
  
}
```

### Try yourself

{% assign plunker_url = "https://embed.plnkr.co/LqHTN07HSWPOv0nfMxnT/" %}
{% include plunker.html %}


## Option 3: Lists

Async pipes work even more nicely. Our detail component gets the data and doesn't have to neither use the safe navigation operator, nor default values. The reason is that our `*ngFor` serves as a guard until the data arrives.

```javascript
import {Component, NgModule, Input} from '@angular/core'

@Component({
  selector: 'my-people',
  template: `
    <div *ngFor="let person of people">
      {%raw%}{{ person.twitter.name }}{%endraw%}
    </div>
  `,
})
export class PeopleComponent {
  
  @Input() people;
  
  constructor() {
  
  }
}
```

{% assign plunker_url = "https://embed.plnkr.co/wquhUC340TAgxG6vZJsw/" %}
{% include plunker.html %}

## Conclusion

The `async` pipe is a really powerful operator.

- it deeply integrates with RxJS Observables and the Angular 2 change detection mechanism.
- it handles Observable subscriptions transparently for us (in an optimized way)
- it makes our async code look as if was synchronous

Don't forget to check out Rob's talk.

<iframe width="853" height="480" src="https://www.youtube.com/embed/WWR9nxVx1ec" frameborder="0" allowfullscreen="allowfullscreen"> </iframe>