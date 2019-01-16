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

{{<warn-notice message="Contents are based on Angular version >=2" >}}

{{< toc >}}

## Egghead.io Course: Understand How to Style Angular Components

Check out [my Egghead.io course](https://egghead.io/courses/understand-how-to-style-angular-components) to get a full picture on styling Angular components. I hope you enjoy it :blush:

{{<egghead-course uid="courses/understand-how-to-style-angular-components" lesson_img="/blog/assets/imgs/egghead-artwork-styling-components.png" >}}


## Directly manipulating styles property

{{<egghead-lesson uid="lessons/style-html-elements-in-angular-using-the-style-property" >}}

A rather unconventional way would be to return the styling property as a string and then to directly set it on the desired element:

```typescript
@Component({
  selector: 'being-stylish',
  template: `
    <div 
      [style.background-color]="getBackgroundColor()"
      [style.color]="'red'" 
      (click)="showStyle = !showStyle">
      I'm stylish, kinda..
    </div>
  `
})
export class StylishComponent {
  showStyle = false;
  getBackgroundColor() {
    if (this.showStyle) {
      return 'yellow';
    } else {
      return '';
    }
  }
}
```

Note the `[style.background-color]` in the code above.

{{<stackblitz uid="edit/blog-styling-angular-components-background">}}
 

## Style Sanitization

{{<egghead-lesson uid="lessons/use-angular-style-sanitization-to-mark-dynamic-styles-as-trusted-values" >}}


Assume for instance we want to dynamically add a background image of a user's profile image, using the `[style.background-image]="..."` approach. Naively, we may try the following:

```typescript
@Component({
  selector: 'sanitized-component',
  template: `
    <div [style]="getGravatarUrl()">
    </div>
  `
})
export class SanitizedComponent {
  
  getGravatarUrl() {
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

```typescript
import { DomSanitizer  } from '@angular/platform-browser';

@Component({...})
export class SanitizedComponent {
  
  constructor(private sanitizer: DomSanitizer) {}

  getGravatarUrl() {
    // snip snip -> fetch the url from somewhere
    const profilePicUrl = 'some-remote-server-url.jpg';
    const style = `background-image: url(${profilePicUrl})`;

    // sanitize the style expression
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
  
}
```

The `DomSanitizer` has other methods as well: [refer to the official docs](https://angular.io/docs/ts/latest/api/platform-browser/index/DomSanitizer-class.html).

{{<stackblitz uid="edit/blog-styling-angular-components-sanitizing">}}

## The good old "ngClass"

{{<egghead-lesson uid="lessons/style-html-elements-in-angular-using-ngclass" >}}

Straight away, there's still the good old [NgClass](https://angular.io/docs/ts/latest/api/common/NgClass-directive.html) which might especially be known by Angular 1 developers. NgClass allows to pass in an object (key:value) where the key represents the class and the value a boolean condition which controls whether that specific class is applied to the element or not.  
That said, it is the preferred way of adding one or more classes to an element. 

It is made available under the `@angular/common` module which is imported already for you (under the `@angular/browser` module), so there's no need to do it manually. Then we can use it just as we did in Angular 1. Here's the full code example.

```typescript
//our root app component
import {Component} from '@angular/core';

@Component({
  selector: 'ngclass-component',
  template: `
    <div [ngClass]="{ bold: isBold, strike: isStrike, highlight: isHighlight }">
      Hi there!
    </div>

    <p>
      <label><input type="checkbox" [(ngModel)]="isStrike"> Strike</label>
      <label><input type="checkbox" [(ngModel)]="isBold"> Bold</label>
      <label><input type="checkbox" [(ngModel)]="isHighlight"> Highlight</label>
    </p>
  `,
  styles: [
    `
     .bold {
        font-weight: bold;
      }

      .highlight {
        background-color: yellow;
      }

      .strike {
        text-decoration: line-through;
      }
    `
  ]
})
export class NgClassComponent {
  isStrike = false;
  isBold = false;
  isHighlight = false;
}
```

{{<stackblitz uid="edit/blog-styling-angular-components-ngclass">}}
 

## Adding a single class

{{<egghead-lesson uid="lessons/conditionally-add-a-single-css-class-to-a-dom-element-in-angular" >}}

An alternative to the `ngClass` and especially in situations when only a single class needs to be applied is the following syntax.  
Similarly as we did with the background-color above, we can add a single class, using the following notation: `[class.nameOfClass]="someCondition"`.

```typescript
//our root app component
import {Component} from '@angular/core'

@Component({
  selector: 'cssclass-component',
  template: `
    <div [class.rounded-border]="isBorder">
      I have a rounded border.
    </div>

    <p>
      <label><input type="checkbox" [(ngModel)]="isBorder"> add border</label>
    </p>
  `,
  styles: [
    `
      .rounded-border {
        border: 1px solid black;
        border-radius: 3px;
        width: 200px;
        padding: 15px;
      }
    `
  ]
})
export class CssClassComponent {
  isBorder = true;
}
```

{{<stackblitz uid="edit/blog-styling-angular-components-single-class">}}
 

## Using `:host(..)` and `@HostBinding`

{{<egghead-lesson uid="lessons/use-angular-s-hostbinding-and-host-to-add-styling-to-the-component-itself" >}}

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

```typescript
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

```typescript
@Component({...})
export class StyledComponent {
    @Input() style;
}
```

What we're still missing is to programmatically set the CSS class on our host element based on the value of the `style` input property. We use the `@HostBinding` for this:

```typescript
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

{{<stackblitz uid="edit/blog-styling-angular-components-host-styling">}}

## Restricting styles with `host-context`

We can even restrict styles/classes being applied to our Angular component, based on our ancestor elements. Here for instance, we're restricting the adding of a border, based on whether there exists an ancestor element that has the class `.styled-component`:

```typescript
@Component({
  selector: 'hostcontext-styling',
  template: `
    <div>
      I'm a div that wants to be styled
    </div>
    ...
  `,
  styles: [
    `
      :host-context(.styled-component) {
        border: 1px solid gray;
        display:block;
      }

      ...

    `
  ]
})
export class HostContextStylingComponent {
}
```

{{<stackblitz uid="edit/blog-styling-angular-components-hostcontext">}}

## Add a class to my component host

When you create a custom Angular component you may often have the necessity to not only style things (divs, ...) within your component template but also to add it to the "component host" itself. Say we have the following component

```html
<my-custom-component></my-custom-component>
```

In order to be able to properly style it, we want it to have a class attached to it. Of course we could just add a `class` attribute, but we want it to happen automatically. As we have already seen in the section before, we can leverage the `@HostBinding` decorator, but this time we don't need any kind of condition. Rather we can write it as:

```typescript
@Component({
   selector: 'my-custom-component',
   ...
})
export class MyCustomComponent {
    @HostBinding('class') hostClass = 'some-class';
}
```

## Referencing the DOM element directly via ElementRef

{{<egghead-lesson uid="lessons/use-the-renderer2-to-add-styles-to-an-element-in-angular" >}}

The last possibility is by directly interacting with the underlying DOM element. For that purpose we create a directive `styled` which we add to our div.

```html
<div styled>
    I'm a div that wants to be styled
</div>
```

Our directive looks like this:

```typescript
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

```typescript
el.nativeElement.style.backgroundColor = 'yellow';
```

This way you can deliberately modify the properties of the native DOM element. So why would I want to use the `Renderer2`. Well, Angular isn't only build for the browser, but it can potentially also be rendered on the server or render native elements on a mobile device (via [NativeScript](https://www.nativescript.org/) for instance). Thus, the `Renderer2` provides an abstraction over the native elements.

{{<stackblitz uid="edit/blog-styling-angular-components-elementref">}}
 

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
