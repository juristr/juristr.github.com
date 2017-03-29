---
layout: post_new
title: "Learning Angular 2: Conditionally add styles to an element"
lead: "Learn how to conditionally add styles to a DOM element in Angular 2"
lastupdated: '2016-06-14'
postimg: "/blog/assets/imgs/conditional-add-styles.png"
category: angular2
tags: [ "JavaScript", "Angular" ]
---

<div class="article-intro">
	Here we're going through a couple of ways to conditionally apply some styles to a DOM element in Angular 2.
</div>

{% include postads %}

{% assign message = "Contents are based on Angular version 2+." %}
{% include warn-notice.html %}

{% include toc.html %}

## Directly manipulating styles property

A rather unconventional way would be to return the styling property as a string and then to directly set it on the desired element:

```javascript
//our root app component
import {Component} from '@angular/core'

@Component({
  selector: 'my-app',
  template: `
    <div>
      <div [style.background-color]="getStyle()">
        I am a div that wants to be styled
      </div>
      <button (click)="showStyle = !showStyle;">Toggle style</button>
    </div>
  `
})
export class App {
  showStyle: false;
  
  constructor() {
  }
  
  getStyle() {
    if(this.showStyle) {
      return "yellow";
    } else {
      return "";
    }
  }
}
```

Note the `[style.background-color]` in the code above.

{% assign plunker_url = "https://embed.plnkr.co/Zt051PhE8Kd03ksiF4K9/" %}
{% include plunker.html %}

## Style Sanitization

Assume for instance we want to dynamically add a background image of a user's profile image, using the `[style.background-image]="..."` approach. Naively, we may try the following:

```javascript
@Component({
  selector: 'my-app',
  template: `
    <div [style.background-image]="getProfilePicStyle()">
    </div>
  `
})
export class App {
  
  getProfilePicStyle() {
    // snip snip -> fetch the url from somewhere
    const profilePicUrl = 'some-remote-server-url.jpg';
    return `url(${profilePicUrl}`;
  }
  
}
```

However, what we get is an error message from Angular saying:

> WARNING: sanitizing unsafe style value url...

This is a security warning, alerting us for a potential [XSS security vulnerability](https://angular.io/docs/ts/latest/guide/security.html#xss). **If you know that the URL is safe**, you can go around this and mark the style as safe.

```javascript
import { DomSanitizer  } from '@angular/platform-browser';

@Component({...})
export class App {
  
  constructor(private sanitizer: DomSanitizer) {}

  getProfilePicStyle() {
    // snip snip -> fetch the url from somewhere
    const profilePicUrl = 'some-remote-server-url.jpg';

    // sanitize the style expression
    return this.sanitizer.bypassSecurityTrustStyle(`url(${profilePicUrl}`);
  }
  
}
```

The `DomSanitizer` has other methods as well: [refer to the official docs](https://angular.io/docs/ts/latest/api/platform-browser/index/DomSanitizer-class.html).

## The good old "ngClass"

Straight away, there's still the good old [NgClass](https://angular.io/docs/ts/latest/api/common/NgClass-directive.html) which might especially be known by Angular 1 developers. NgClass allows to pass in an object (key:value) where the key represents the class and the value a boolean condition which controls whether that specific class is applied to the element or not.  
That said, it is the preferred way of adding one or more classes to an element. 

It is made available under the `@angular/common` module which is imported already for you (under the `@angular/browser` module), so there's no need to do it manually. Then we can use it just as we did in Angular 1. Here's the full code example.

```javascript
//our root app component
import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
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
})
export class App {
  isClassVisible: false;
  
  constructor() {
  }
  
}
```

{% assign plunker_url = "https://embed.plnkr.co/yCalvA1OsC6w2VZUAHm6/" %}
{% include plunker.html %}

## Adding a single class

An alternative to the `ngClass` and especially in situations when only a single class needs to be applied is the following syntax.  
Similarly as we did with the background-color above, we can add a single class, using the following notation: `[class.nameOfClass]="someCondition"`.

```javascript
//our root app component
import {Component} from '@angular/core'

@Component({
  selector: 'my-app',
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
})
export class App {
  isClassVisible: false;
  
  constructor() {
  }
  
}
```

{% assign plunker_url = "https://embed.plnkr.co/WmrldzDHCib5ixsdL8R0/" %}
{% include plunker.html %}

## Using `:host(..)` and `@HostBinding`

Consider you have a component `<styled>` which you'd like have different CSS classes applied based on some setting, like `.yellow-style` in case when you specify `<styled style="yellow">` and `.red-style` when you pass in `red`: `<styled style="red">`.

What's important to note here is that, different to what we did so far, we don't want the CSS class to be applied on some element that's internal to our component, but onto the component itself. Example:

```html
<styled style="red" _nghost-c0="" ng-reflect-style="red" class="red-style">
    <div _ngcontent-c0="">
      I'm a div that wants to be styled
    </div>
</styled>
```

Still, for reusability purposes, our styles should be supplied with the component itself, so again we use the `styles` property of our `StyledComponent`:

```javascript
@Component({
  selector: 'styled',
  template: `
    <div>
      I'm a div that wants to be styled
    </div>
  `,
  styles: [
    `
      :host(.yellow-style) {
        background-color: yellow;
        border: 1px solid black;
        display:block;
      }
      
      :host(.red-style) {
        background-color: red;
        border: 1px solid black;
        color: white;
        display:block;
      }
    `
  ]
})
export class StyledComponent { }
```
As you can see, we use the special `:host(...)` selector to target the styles on the element that hosts the component. [More info on the official docs about this](https://angular.io/docs/ts/latest/guide/component-styles.html#!#special-selectors). In this way `.yellow-style` as well as `.red-style` will be visible at the host component level while they'd be otherwise encapsulated and only applicable to elements within our `StyledComponent`.

Next, we define an `@Input()` property which allows us pass in the style configuration.

```javascript
@Component({...})
export class StyledComponent {
    @Input() style;
}
```

What we're still missing is to programmatically set the CSS class on our host element based on the value of the `style` input property. We use the `@HostBinding` for this:

```javascript
import { Component, Input, HostBinding } from '@angular/core';

@Component({ ... })
export class StyledComponent {
  @Input() style;
  
  @HostBinding('class.yellow-style') yellowStyle:boolean = false;
  @HostBinding('class.red-style') redStyle:boolean = false;
  
  ngOnChanges(changes) {
    let newStyle = changes.style.currentValue;
    
    if(newStyle === 'yellow') {
      this.yellowStyle = true;
      this.redStyle = false;
    } else if(newStyle === 'red') {
      this.yellowStyle = false;
      this.redStyle = true;
    } else {
      // nothing here.. (fallback?)
    }
  }
}
```

In the `ngOnChanges` we the `style` input property changes, we properly adjust our style flags. (Note this is by far not the most intelligent code, but it's simple enough so you get the idea :wink:).

Here's an example to play around with.

{% assign plunker_url = "https://embed.plnkr.co/LfjCS6DMSi8d44O4Uhkj/" %}
{% include plunker.html %}

## Referencing the DOM element directly via ElementRef

The last possibility is by directly interacting with the underlying DOM element. For that purpose we create a directive `styled` which we add to our div.

```html
<div styled>
    I'm a div that wants to be styled
</div>
```

Our directive looks like this:

```javascript
import {Directive, ElementRef, Renderer} from '@angular/core';

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

{% assign plunker_url = "https://embed.plnkr.co/TqteblvISNtHObNbQAel/" %}
{% include plunker.html %}


## Conclusion

So in this article you learned about three possibilities to style your DOM elements from within Angular 2. You got to see

- directly binding with `[style.background-color]`
- adding a class `[class.my-class]`
- using NgClass `[ngClass]`
- by directly accessing the native DOM element

You even quickly saw how to create a Directive and how to embed styles within a Component :smiley:.

---

## Further reading

Angular 2 components are not just like plain Angular 1 directives with a different syntax. There's much more. They give you true encapsulation at the CSS as well as JavaScript level, just like web components do. Components have an `encapsulation` property which expects either

- `ViewEncapsulation.None`
- `ViewEncapsulation.Emulated` (default),
- `ViewEncapsulation.Native`

By default it emulates, but if you set it to `ViewEncapsulation.Native` you'll get **native shadow DOM** support. Check out [@toddmotto's](https://twitter.com/toddmotto) article on **[Emulated or Native Shadow DOM in Angular 2 with ViewEncapsulation](https://toddmotto.com/emulated-native-shadow-dom-angular-2-view-encapsulation)** for an in depth guide on this :thumbsup:.
