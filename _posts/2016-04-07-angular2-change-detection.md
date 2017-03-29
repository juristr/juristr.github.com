---
layout: post_new
title: "Fine grained change detection with Angular"
lead: "Ever heard about DoCheck or OnChanges in Angular components? Then read along.."
category: angular2
tags: [ "JavaScript", "Angular" ]
---

<div class="article-intro">
	Today, while working on my Angular screencast series (announcement coming soon), I discovered a strange behavior when dealing with Angular change detection. Here's what I found.
</div>

{% include postads %}

{% assign message = "Contents are based on Angular version 2+." %}
{% include warn-notice.html %}

{% include toc.html %}

Before starting, Angular has implemented an awesome and very refined mechanism for detecting changes. As always, Thoughtram has an interesting article on their blog ["Angular Change Detection Explained"](http://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html) which goes deep into this topic and is definitely worth reading.

## The Setup

We basically have two components, an app (as usual) and a child component `<child>` (I know...how brilliant :wink:). The parent component simply passes along a data object `Person`:

```javascript
@Component({
	selector: 'app',
	template: `
		<child [person]="person"></child>
	`
})
class App {
	person: string;

	constructor() {
		this.person = 'Juri';
	}
}
```

So far so good. As you can see, in the `App` component's constructor we initialize `person` to a string containing it's name. In the child component we get that name as input and simply visualize it.

```javascript
{%raw%}
@Component({
	selector: 'child',
	template: `
		<h2>Child component</h2>
		{{ person }}
	`
})
class ChildComponent {
	@Input() person: string;
}
{%endraw%}
```

## OnChanges: detect whenever @Input changes

**Our goal is to teach our `<child>` component to understand whenever it's `@Input()` property `person` changes**. Angular has an event for that: [OnChanges](https://angular.io/docs/ts/latest/api/core/OnChanges-interface.html).

In practice, this would look as follows:

```javascript
{%raw%}
import { OnChanges } from '@angular/core';

@Component({
	selector: 'child',
	template: `
		<h2>Child component</h2>
		{{ person }}
	`
})
class ChildComponent implements OnChanges {
	@Input() person: string;

	ngOnChanges(changes: {[ propName: string]: SimpleChange}) {
		console.log('Change detected:', changes[person].currentValue);
	}

}
{%endraw%}
```

`ngOnChanges(..)` gets an object that contains every `@Input` property of our component as key and a [SimpleChange](https://angular.io/docs/ts/latest/api/core/SimpleChange-class.html) object as according value.

Here's a Plunker that demoes how this works. Open your dev console to see according logs being printed out.

<iframe src="https://embed.plnkr.co/Uw9eFcBqfoOWyaEoVwsQ/" width="100%" height="400px"> </iframe>

### So what's the matter?

So far so good. Everything works as expected. The "issues" start when we change our `person` property from a native datatype into a JavaScript object.

```javascript
@Component({
	selector: 'app',
	...
})
class App {
	person: any;

	constructor() {
		this.person = {
			name: 'Juri'
		};
	}

	// invoked by button click
	changePerson() {
		this.person.name = 'Thomas';
	}
}
```

Note that, in our `changePerson()` function, we now **directly mutate the property** of our `person` object which we pass on to our child component. All of a sudden, while the data binding still works, `ngOnChanges` **is not being invoked any more**. Check out the source here on this Plunker:

<iframe src="https://embed.plnkr.co/NNdeurjvzKWTEDpbTCoF/" width="100%" height="400px"> </iframe>

Instead, **if we make our `person` object immutable**, it works just fine:

```javascript
@Component({...})
class App {
	...

	// invoked by button click
	changePerson() {
		this.person = {
			name: 'Thomas'
		};
	}
}
```

Try it out by yourself on the previous Plunker example! In fact, if we [look up on the docs](https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html), even if a bit buried, we can find an according explanation:

> Angular only calls the hook when the value of the input property changes. The value of the hero property is the reference to the hero object. Angular doesn't care that the hero's own name property changed. The hero object reference didn't change so, from Angular's perspective, there is no change to report!

## But what if I always want to get notified?

So, cool, using immutable data structures definitely has some performance benefits on Angular anyways. By using immutable data structures and [fine tuning Angular component's change detection strategy](https://angular.io/docs/ts/latest/api/core/ChangeDetectionStrategy-enum.html), it can get insanely fast! Check out Jurgen Van de Moere's article on [How I optimized Minesweeper using Angular and Immutable.js to make it insanely fast](http://www.jvandemo.com/how-i-optimized-minesweeper-using-angular-2-and-immutable-js-to-make-it-insanely-fast/).

Ok nice, but I don't care about immutable datastructures right now, how can I get to know about changes in my objects? [**DoCheck**](https://angular.io/docs/ts/latest/api/core/DoCheck-interface.html) can be of help here. Let's have a look.

What we can do is to implement the `DoCheck` lifecycle hook on our child component.

```javascript
{%raw%}
import { DoCheck } from '@angular/core';

@Component({...})
class ChildComponent implements DoCheck {
	@Input() person: any;
	...
	ngDoCheck() {
		// called whenever Angular runs change detection
	}
}
{%endraw%}
```

> **ngDoCheck()** is invoked whenever change detection is run

That allows us to implement some logic there, like remembering the old values and comparing them against new ones. There's a smarter way, though, by using the [KeyValueDiffers](https://angular.io/docs/ts/latest/api/core/KeyValueDiffers-class.html) class.

```javascript
{%raw%}
import { DoCheck, KeyValueDiffers } from '@angular/core';

@Component({...})
class ChildComponent implements DoCheck {
	@Input() person: any;
	differ: any;

	constructor(private differs: KeyValueDiffers) {
		this.differ = differs.find({}).create(null);
	}
	...
	ngDoCheck() {
		var changes = this.differ.diff(this.person);

		if(changes) {
			console.log('changes detected');
			changes.forEachChangedItem(r => console.log('changed ', r.currentValue));
			changes.forEachAddedItem(r => console.log('added ' + r.currentValue));
			changes.forEachRemovedItem(r => console.log('removed ' + r.currentValue));
		} else {
			console.log('nothing changed');
		}
	}
}
{%endraw%}
```

Slick, isn't it :smiley:? Here's a Plunker to play around with it:

<iframe src="https://embed.plnkr.co/hCKn9V1L8rzDPYzGc5HW/" width="100%" height="400px"> </iframe>

Note, if you get a list as `@Input`, you can use [IterableDiffers](https://angular.io/docs/ts/latest/api/core/IterableDiffers-class.html) rather than KeyValueDiffers.

## Conclusion

Nice, so we learned..

- that `ngOnChanges` won't be triggered when we mutate a (non-immutable) JavaScript object. Instead it triggers only when **we reference-change the data-bound input property**.
- Also, we've seen that we can use `ngDoCheck` for such scenarios, that allows us to do a very fine-grained check of which property on our object changed.