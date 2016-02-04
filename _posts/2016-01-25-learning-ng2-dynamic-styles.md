---
layout: post_new
title: "Learning Angular 2: Conditionally add styles to an element"
lead: "Learn how to conditionally add styles to a DOM element in Angular 2"
category: angular2
tags: [ "JavaScript", "Angular" ]
---

<div class="article-intro">
	Here we're going through a couple of ways to conditionally apply some styles to a DOM element in Angular 2.
</div>

{% include postads %}

## Directly manipulating styles property

A rather unconventional way would be to return the styling property as a string and then to directly set it on the desired element:

```javascript
//our root app component
import {Component} from 'angular2/core'

@Component({
  selector: 'my-app',
  providers: [],
  template: `
    <div>
      <div [style.background-color]="getStyle()">
        I am a div that wants to be styled
      </div>
      <button (click)="showStyle = !showStyle;">Toggle style</button>
    </div>
  `,
  directives: []
})
export class App {
  showStyle: false;
  
  constructor() {
  }
  
  getStyle() {
    if(this.showStyle){
      return "yellow";
    } else {
      return "";
    }
  }
}
```

Note the `[style.background-color]` in the code above.

<iframe src="https://embed.plnkr.co/Zt051PhE8Kd03ksiF4K9/" width="100%" height="400px"> </iframe>

## Adding a class

Similarly as we did with the background-color above, we can add a class, using the following notation: `[class.nameOfClass]="someCondition"`.

```javascript
//our root app component
import {Component} from 'angular2/core'

@Component({
  selector: 'my-app',
  providers: [],
  template: `
    <div>
      <div [class.my-class]="isClassVisible">
        I am a div that wants to be styled
      </div>
      <button (click)="isClassVisible = !isClassVisible;">Toggle style</button>
    </div>
  `,
  styles: [
  `
  .my-class {
    background-color: yellow;
  }
  `
  ]
  directives: []
})
export class App {
  isClassVisible: false;
  
  constructor() {
  }
  
}
```

<iframe src="https://embed.plnkr.co/WmrldzDHCib5ixsdL8R0/" width="100%" height="400px"> </iframe>

## The good old "ngClass"

Theres another way of adding a class. Especially Angular 1 developers may immediately recognize this. The good [old NgClass](https://angular.io/docs/ts/latest/api/common/NgClass-directive.html).

It is made available under the `angular2/common` module which we need to import:

```javascript
...
import {NgClass} from 'angular2/common';
...
```

..and obviously reference it in the `directives` property of our component.

```javascript
@Component({
  selector: 'my-app',
  providers: [],
  ...
  directives: [NgClass]
})
```

Then we can use it just as we did in Angular 1. Here's the full code example.

```javascript
//our root app component
import {Component} from 'angular2/core';
import {NgClass} from 'angular2/common';

@Component({
  selector: 'my-app',
  providers: [],
  template: `
    <div>
      <div [ngClass]="{'my-class': isClassVisible }">
        I am a div that wants to be styled
      </div>
      <button (click)="isClassVisible = !isClassVisible;">Toggle style</button>
    </div>
  `,
  styles: [
  `
  .my-class {
    background-color: yellow;
  }
  `
  ]
  directives: [NgClass]
})
export class App {
  isClassVisible: false;
  
  constructor() {
  }
  
}
```

<iframe src="https://embed.plnkr.co/yCalvA1OsC6w2VZUAHm6/" width="100%" height="400px"> </iframe>

## Referencing the DOM element directly via ElementRef

The last possibility is by directly interacting with the underlying DOM element. For that purpose we create a directive `styled` which we add to our div.

```html
<div styled>
    I'm a div that wants to be styled
</div>
```

Our directive looks like this:

```javascript
import {Directive, ElementRef, Renderer} from 'angular2/core';

@Directive({
  selector: '[styled]',
})
export class StyledDirective {
  constructor(public el: ElementRef, public renderer: Renderer) {
    // el.nativeElement.style.backgroundColor = 'yellow';
    renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
  }
}
```

The important part here is the `ElementRef` and the `Renderer` which I import in the constructor.

The `ElementRef` allows us to gain access to the `nativeElement` API via

```javascript
el.nativeElement.style.backgroundColor = 'yellow';
```

This way you can deliberately modify the properties of the native DOM element. So why would I want to use the `Renderer`. Well, Angular 2 isn't only build for the browser, but it can potentially also be rendered on the server or render native elements on a mobile device (via [NativeScript](https://www.nativescript.org/) for instance). Thus, the `Renderer` provides an abstraction over the native elements.

Check out this Plunk for the full code.

<iframe src="https://embed.plnkr.co/TqteblvISNtHObNbQAel/" width="100%" height="400px"> </iframe>

## Conclusion

So in this article you learned about three possibilities to style your DOM elements from within Angular 2. You got to see

- directly binding with `[style.background-color]`
- adding a class `[class.my-class]`
- using NgClass `[ngClass]`
- by directly accessing the native DOM element

You even quickly saw how to create a Directive and how to embed styles within a Component :smiley:.


