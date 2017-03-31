---
layout: post_new
title: "Tuning Angular's Change Detection"
lead: "Videos and runnable code samples to play around with change detection"
postimg: "/blog/assets/imgs/change-detection-cover.png"
tags: [ "Angular"]
---

<div class="article-intro">
	I recently prepared some course material for a modern web development workshop, which besides the nice features around ES6 obviously also included Angular. Change detection was part of that workshop and so I did some playing with it. Here are some things that you should know.
</div>

{% include postads %}

{% assign message = "Contents are based on Angular version 2+." %}
{% include warn-notice.html %}

I'm totally aware that there are already quite some good articles out there which go very deep into Angular's change detection. Here are some I highly recommend to go through:

- [Angular Change Detection Explained by Pascal Precht](https://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html)
- [Essential Angular: Change Detection](https://blog.nrwl.io/essential-angular-change-detection-fe0e868dcc00#.8z7p6poyp)
- [How I optimized Minesweeper using Angular 2 and Immutable.js to make it insanely fast](http://www.jvandemo.com/how-i-optimized-minesweeper-using-angular-2-and-immutable-js-to-make-it-insanely-fast/)
- [Change detection: Seeing it in action by LucidChart](https://www.lucidchart.com/techblog/2017/01/18/angular-2-change-detection-seeing-it-in-action/)

Especially Pascal gives a very good deep dive into the inner workings and some optimization strategies I was giving a look in this post here.

{% include toc.html %}

## Change Detection in under 1 minute

Before starting, did you ever wonder what "change detection" is about and why we actually need it? [Tero Parviainen](https://twitter.com/teropa) had the same question and wrote an in depth article on the topic: [Change And Its Detection In JavaScript Frameworks](https://teropa.info/blog/2015/03/02/change-and-its-detection-in-javascript-frameworks.html)

**In a nutshell,** you usually have a model (i.e. a JavaScript object)...

```javascript
const aPerson = {
  name: 'Juri',
  age: 31
}
```
...and some UI part (usually HTML) which visualizes the data of your model:

```html
<p>Hi, my name is {%raw%}{{ aPerson.name }}{%endraw%} and I'm {%raw%}{{ aPerson.age }}{%endraw%} years old.</p>
```

**Change detection is the process of keeping both in sync.** Basically when someone changes the name `aPerson.name`, the HTML part should reflect that change.  
Such changes come in through _asynchronous things_ that might happen, such as

- Events (i.e. button clicks,..)
- XHR requests (i.e. calls to some API)
- timers (i.e. `setTimeout`, `setInterval`)

**Ok, so someone has to monitor all these asynchronous activities. But how?** Exactly! While AngularJS (v1.x) did something called "dirty checking", Angular (2+) monkey patches all these asynchronous parts using [zones.js](https://github.com/angular/zone.js/). Again, more details can be found in the articles I linked before.

(Ok that hopefully was a minute or so? :smiley:)

## Tuning Change Detection

While it is extremely fast, what's important to remember, is that **change detection has a cost**.

<blockquote class="emphasized">
	"Change Detection has a cost."
</blockquote>

Angular applies some very smart techniques to reduce this cost at a maximum. But still, whenever we can, we might want to help it a bit further. And we have lots of options to do so.

In order to understand these strategies however, we need to know one thing first: the **component tree**.  
As you might already know by now, every Angular application is structured as a tree of components. We have a top-level component, i.e. the `<app-root>`, which contains other components, which again contain other components and so on (you get the idea :smiley:). In the end what we get is a nice, **directed** graph without cycles: **a tree**.  
Within this tree structure, data flows "downwards" through properties, declared via `@Input` and then back up from the child components to the parent component via events, using `@Output`.

```
          <app-root>
        /            \
   <contact>      <favorites-list>
   /        \
<person>   <contact-details>
```

Whenever one of our asynchronous activities kicks in, say in the `<person>` component, change detection is triggered from the root `<app-root>` to the bottom. As a result, **change detection is triggered on all of our components**. Well, by now you might guess that in a big component tree, with lots of components, potentially also doing quite some heavy stuff, this might get an intense computation.

When we speak about optimizing the change detection, we really mean to cut off edges of our component tree, which the change detection process otherwise would have to traverse, thus it gets faster. Frankly, it's like saying, hey, wait, we only changed `<person>` and "I know" you don't need to also verify `<favorites-list>` etc.

So here are some strategies you can apply. 

### Immutable Objects

{% assign youtube_id = "8SImpeCg2ZU" %}
{% include youtube.html %}

{% assign plunker_url="https://embed.plnkr.co/G1QH0ZEML6bXm95bhC1J/" %}
{% include plunker.html %}

Before speaking about immutable objects, let's see what happens "normally". So we have an object, say..

```javascript
@Component({..})
export class App {
	data = { counter: 0 };
}
```

..and this `data` object is passed via an `@Input` property to our child component `my-counter`:

```html
<my-counter [data]="data"></my-counter>
```

Whenever we change the `counter` property of `data`, change detection kicks in for the whole application (in our simple case, just for `<my-app>` and `<my-counter>`, but you get the point :wink:).

With **immutable objects** we try to optimize that verification step in 

1. Angular doesn't have to perform a "deep" check of an object and all of it's sub objects, but
1. more importantly, by knowing the reference is different, and by knowing it can ignore any nested object of the `@Input` property, it **can avoid checking that entire subtree of components**.

This approach is called **OnPush Change Detection** and is activated on our `<my-counter>` component as follows;

```javascript
import {..., ChangeDetectionStrategy } from '@angular/core';

@Component({
  ...
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
  @Input() data;
}
```

After this change, simply modifying our `data.counter` property, i.e. with `data.counter++`, won't trigger any change detection. We rather need to create a new instance:

```javascript
this.data = { counter: this.data.counter + 1 };
```

### Observables

{% assign youtube_id = "sYo9rla8Cz8" %}
{% include youtube.html %}

{% assign plunker_url="https://embed.plnkr.co/TLi6Us5CDz6yGWV4k34Y/" %}
{% include plunker.html %}

If the immutable approach is not enough for you, we can even get better. Instead of passing in a data object, **we pass in an `Observable`.**

```javascript
@Component({
  ...
  template: `
    ...
    <my-counter [data]="data$"></my-counter>
  `
})
export class App {
  data$ = new BehaviorSubject({ counter: 0 });
  ...
}
```

In order to "broadcast" data on our `Observable` we have to use its `next(...)` function:

```javascript
this.data$.next({ counter: ++this._counter });
```

Within our `<my-counter>` component, we now have an `Observable<any>` as the input type...

```javascript
@Component({
  ...
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
  @Input() data: Observable<any>;
  ...
}
```

... and we obviously need to register ourselves on the `Observable` to get notified in the event when new data is coming down the pipe. This is done using `subscribe(...)`.

```javascript
export class CounterComponent {
  ...
  ngOnInit() {
    this.data.subscribe((value) => {
      // local variable bound to our template
      this._data = value;
    });
  }
}
```

These steps alone won't work however. Why? Well, we **never change the reference of our Observable** and since we still have `ChangeDetectionStrategy.OnPush`, Angular's won't execute change detection on this sub-tree. Thus we need **to manually mark the changes**.

```javascript
import {..., ChangeDetectorRef } from '@angular/core';

export class CounterComponent {
	constructor(private cd: ChangeDetectorRef) {}
  ...
  ngOnInit() {
    this.data.subscribe((value) => {
      this._data = value;
      // tell CD to verify this subtree
      this.cd.markForCheck();
    });
  }
}
```

As you can see, whenever we get a new value in our `subscribe(..)` we manually tell Angular to **mark this sub-tree for change detection**.

### Manually handling change Detection

{% assign youtube_id = "n0UUIx2ASt0" %}
{% include youtube.html %}

{% assign plunker_url="https://embed.plnkr.co/5OM0A53GlHyWWyam4TRA/" %}
{% include plunker.html %}

Well, if you're still not satisfied, there's one more option. You can even manually enable/disable change detection. This could turn out to be useful if you get lots and lots of data repeatedly from some backend and you want to perform change detection only every second or so.

In that case the `ChangeDetectorRef` has two interesting methods:

- `cd.detach()`
- `cd.reattach()`

Try it yourself in the runnable Plunker :smiley:.

## Conclusion

This is definitely part of the more advanced techniques when using Angular. But it is a powerful concept you should learn how to leverage to speed up your application even more.

I hope these runnable examples gave you some more insight (and starting point) into the power of change detection in Angular. Definitely also check out Pascal's article as well as [his talk on change detection at NGNL2016](https://www.youtube.com/watch?v=CUxD91DWkGM).
