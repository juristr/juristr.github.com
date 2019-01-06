---
title: 'Learning Angular: Conditionally add styles to an element'
lead: Learn how to conditionally add styles to a DOM element in Angular
lastupdated: '2017-03-30'
category: angular2
categories:
  - JavaScript
  - Angular
ads: false
date: 2016-01-25T01:00:00.000Z
comments: true
url: /blog/2016/01/learning-ng2-dynamic-styles
type: post
image: /blog/assets/imgs/conditional-add-styles.png
---

<div class="article-intro">
	Here we're going through a couple of ways to conditionally apply some styles to a DOM element in Angular.
</div>

{{< postad >}}

{{<warn-notice message="$1" >}}
 

{{< toc >}}

## Egghead.io Course: Understand How to Style Angular Components

Check out [my Egghead.io course](https://egghead.io/courses/understand-how-to-style-angular-components) to get a full picture on styling Angular components. I hope you enjoy it :blush:

{% assign lesson_url = "courses/understand-how-to-style-angular-components" %}
{% assign lesson_img = "/blog/assets/imgs/egghead-artwork-styling-components.png" %}
{% assign image_class="image--small" %}
{% include egghead.html %}

## Directly manipulating styles property

{% assign video_title = "Style HTML elements in Angular using the style property" %}
{% assign video_url = "https://egghead.io/lessons/style-html-elements-in-angular-using-the-style-property" %}
{% assign affiliate_client = "eggheadio" %}
{% assign affiliate_uid = "lessons/style-html-elements-in-angular-using-the-style-property" %}
{% include video-banner.html %}

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

{{<plunker plunker_url="https://embed.plnkr.co/Zt051PhE8Kd03ksiF4K9/">}}
 

## Style Sanitization

{% assign video_title = "Use Angular style sanitization to mark dynamic styles as trusted values" %}
{% assign video_url = "https://egghead.io/lessons/use-angular-style-sanitization-to-mark-dynamic-styles-as-trusted-values" %}
{% assign affiliate_client = "eggheadio" %}
{% assign affiliate_uid = "lessons/use-angular-style-sanitization-to-mark-dynamic-styles-as-trusted-values" %}
{% include video-banner.html %}

Assume for instance we want to dynamically add a background image of a user's profile image, using the `[style.background-image]="..."` approach. Naively, we may try the following:

```javascript
@Component({
  selector: 'my-app',
  template: `
    <div [style]="getStyle()">
    </div>
  `
})
export class App {
  
  getStyle() {
    // snip snip -> fetch the url from somewhere
    const profilePicUrl = 'some-remote-server-url.jpg';
    const style = `background-image: url(${profilePicUrl})`;
    return style;
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

  getStyle() {
    // snip snip -> fetch the url from somewhere
    const profilePicUrl = 'some-remote-server-url.jpg';
    const style = `background-image: url(${profilePicUrl})`;

    // sanitize the style expression
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
  
}
```

The `DomSanitizer` has other methods as well: [refer to the official docs](https://angular.io/docs/ts/latest/api/platform-browser/index/DomSanitizer-class.html).

## The good old "ngClass"

{% assign video_title = "Style HTML elements in Angular using ngClass" %}
{% assign video_url = "https://egghead.io/lessons/style-html-elements-in-angular-using-ngclass" %}
{% assign affiliate_client = "eggheadio" %}
{% assign affiliate_uid = "lessons/style-html-elements-in-angular-using-ngclass" %}
{% include video-banner.html %}

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

{{<plunker plunker_url="https://embed.plnkr.co/yCalvA1OsC6w2VZUAHm6/">}}
 

## Adding a single class

{% assign video_title = "Conditionally add a single CSS class to a DOM element in Angular" %}
{% assign video_url = "https://egghead.io/lessons/conditionally-add-a-single-css-class-to-a-dom-element-in-angular" %}
{% assign affiliate_client = "eggheadio" %}
{% assign affiliate_uid = "lessons/conditionally-add-a-single-css-class-to-a-dom-element-in-angular" %}
{% include video-banner.html %}

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

{{<plunker plunker_url="https://embed.plnkr.co/WmrldzDHCib5ixsdL8R0/">}}
 

## Using `:host(..)` and `@HostBinding`

{% assign video_title = "Use Angular’s @HostBinding and :host(...) to add styling to the component itself" %}
{% assign video_url = "https://egghead.io/lessons/use-angular-s-hostbinding-and-host-to-add-styling-to-the-component-itself" %}
{% assign affiliate_client = "eggheadio" %}
{% assign affiliate_uid = "lessons/use-angular-s-hostbinding-and-host-to-add-styling-to-the-component-itself" %}
{% include video-banner.html %}

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

{{<plunker plunker_url="https://embed.plnkr.co/LfjCS6DMSi8d44O4Uhkj/">}}
 

## Add a class to my component host

When you create a custom Angular component you may often have the necessity to not only style things (divs, ...) within your component template but also to add it to the "component host" itself. Say we have the following component

```html
<my-custom-component></my-custom-component>
```

In order to be able to properly style it, we want it to have a class attached to it. Of course we could just add a `class` attribute, but we want it to happen automatically. As we have already seen in the section before, we can leverage the `@HostBinding` decorator, but this time we don't need any kind of condition. Rather we can write it as:

```javascript
@Component({
   selector: 'my-custom-component',
   ...
})
export class MyCustomComponent {
    @HostBinding('class') hostClass = 'some-class';
}
```

## Referencing the DOM element directly via ElementRef

{% assign video_title = "Use the Renderer2 to add styles to an element in Angular" %}
{% assign video_url = "https://egghead.io/lessons/use-the-renderer2-to-add-styles-to-an-element-in-angular" %}
{% assign affiliate_client = "eggheadio" %}
{% assign affiliate_uid = "lessons/use-the-renderer2-to-add-styles-to-an-element-in-angular" %}
{% include video-banner.html %}

The last possibility is by directly interacting with the underlying DOM element. For that purpose we create a directive `styled` which we add to our div.

```html
<div styled>
    I'm a div that wants to be styled
</div>
```

Our directive looks like this:

```javascript
import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[styled]',
})
export class StyledDirective {
  constructor(public el: ElementRef, public renderer: Renderer2) {
    // el.nativeElement.style.backgroundColor = 'yellow';
    renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
  }
}
```

The important part here is the `ElementRef` and the `Renderer2` which I import in the constructor.

The `ElementRef` allows us to gain access to the `nativeElement` API via

```javascript
el.nativeElement.style.backgroundColor = 'yellow';
```

This way you can deliberately modify the properties of the native DOM element. So why would I want to use the `Renderer2`. Well, Angular isn't only build for the browser, but it can potentially also be rendered on the server or render native elements on a mobile device (via [NativeScript](https://www.nativescript.org/) for instance). Thus, the `Renderer2` provides an abstraction over the native elements.

Check out this Plunk for the full code.

{{<plunker plunker_url="https://embed.plnkr.co/TqteblvISNtHObNbQAel/">}}
 

## More...

There's more about styling such as style encapsulation, `ngStyle`, .... Learn about it with [my **10 lessons Egghead.io course** about "Understand How to Style Angular Components"](https://egghead.io/courses/understand-how-to-style-angular-components).

## Conclusion

So in this article you learned about 5 possibilities to style your DOM elements from within Angular. You got to see

- directly binding with `[style.background-color]`
- adding a class `[class.my-class]`
- using NgClass `[ngClass]`
- leveraging `:host(..)` and `@HostBinding`
- by directly accessing the native DOM element using the `Renderer2`

You even quickly saw how to create a Directive and how to embed styles within a Component :smiley:.
