---
type: post
title: Access Angular Material's MatSelect Options Panel Container
date: 2020-09-12T10:47:22+02:00
lead: Get programmatic access to the MatSelect Options Panel
url: /blog/2020/06/access-material-select-options
draft: false
categories:
  - angular
tags:
  - angular
  - angular material
comments: true
---

{{<intro>}}
  In this article we're going to explore how you can programmatically access the Angular Material Select panel, without doing strange global DOM queries :smiley:. Let's dive in!
{{</intro>}}
<!--more-->

{{< postad >}}

{{<toc>}}

---

## TL;DR

In your directive, inject the reference to `MatSelect`, subscribe to the `openedChange` Observable and if it is open, access the `panel` property on the `MatSelect`.

{{<youtube lZYYoSWcPeE >}}

---

If you’re in search for some high quality component library, [Angular Material](https://material.angular.io) might be a good point where to start. As a side-note, if you're not searching for a Material Design, there are lots of other interesting options:

- [the CDK package](https://material.angular.io/cdk/categories) within the Angular Material package which is design agnostic
- [Bootstrap](https://getbootstrap.com/) based
  - [ng-bootstrap](https://ng-bootstrap.github.io)
  - [ngx-bootstrap](https://valor-software.com/ngx-bootstrap)
- [VMWare Clarity Design System](https://clarity.design/)
- [Nebular](https://akveo.github.io/nebular/)
- [Prime Faces](https://www.primefaces.org/primeng/)
- _(...and [a lot more](https://angular.io/resources)...)_


But to **come back to our topic**. Angular Material puts some major effort around creating accessible components. Sometimes you might want to add some custom logic, like custom attributes. Take for instance the `MatSelect` ([here are the corresponding docs](https://material.angular.io/components/select/overview))

<div style="display:flex">
  {{<figure url="/blog/assets/imgs/mat-select.png" size="small">}}
  {{<figure url="/blog/assets/imgs/mat-select-expanded.png" size="small">}}
</div>

The Angular template for this looks as follows:

```html
<mat-select [(ngModel)]="selectedValue" name="food">
  <mat-option *ngFor="let food of foods" [value]="food.value">
    {{food.viewValue}}
  </mat-option>
</mat-select>
```

A client of mine had the requirement to **access the rendered options** and add custom attributes to those `<options>` to **enhance support for screenreaders**. So the first idea is to place some directive - say `myDirective` (plz use a proper name :wink:) - onto the `<mat-select>` and then use some DOM selectors to get hold of the options.

## The Material Options Panel is not a child of the MatSelect

It might look easy, right? In your directive `myDirective` you can get the `ElementRef` injected and simply access the `<mat-options>`. The `ElementRef` would be the one of the `<mat-select>` which would allow to select it’s child option items. Something like

```tsx
@Directive({})
export class MyDirective implements OnInit {

   constructor(private elementRef: ElementRef) {}

   ngOnInit() {
      this.elementRef.nativeElement.querySelector(...)
   }
}
```

That won’t work! The `<mat-options>` - although it might seem from how you write the `<mat-select>` - are not child objects of the `<mat-select>` in the DOM.

When you open the select, Material renders them in a dedicated,z-index and absolute positioned panel at the `document.body` level. Why is that? It’s to make sure it stays over all other elements and to not expand or shift any other element within the body.

{{<figure url="/blog/assets/imgs/mat-select-option-overlay.png" size="full">}}

## You're doing it wrong

The next immediate step would be to change `this.elementRef.nativeElement.querySelector(...)` to `document.body.querySelector(...)`, right? Do not! We only keep that as a very last resort. You want to keep your `querySelector` as focused as possible, for performance reasons but also not to run into other elements rendered on the page.

## Reference the Options panel via the `panel` property

The biggest advantage of using open source libraries is that we can take a look at the source and see how Material creates the hosting overlay and whether it keeps **and in particular exposes** its reference to the outside. And indeed, if we [have a quick look at the API docs](https://material.angular.io/components/select/api), there's a property `panel` which is an `ElementRef` to the container of the `<options>`.

{{<figure url="/blog/assets/imgs/mat-select-api-panel.png" size="full">}}

On that panel property, we can perform our `panel.nativeElement.querySelect(...)` to have a nicely scoped DOM query that only runs on the container with our option list.

## Accessing the Host component with Dependency Injection

We add our directive to the `<mat-select>` as follows

```html
<mat-select myDirective>
  ...
</mat-select>
```

We only need a way to get access to the `MatSelect` instance from within our directive, s.t. we can grab the `panel` reference and perform our query. The by far easiest way (and surprisingly many devs don't know about this) is to use Angular's dependency injection. By requiring the instance in the constructor, Angular will take care to inject the host/parent component.

```typescript
@Directive({
  selector: '[myDirective]'
})
export class MyDirective implements OnInit {

  /**
   *  MatSelect instance injected into the directive
   */
  constructor(private select:MatSelect) { }

}
```

Now the only thing left is to actually use the `panel` property. We need to subscribe to the `openedChange` Observable since the options are only rendered and visible on the page if the `<mat-select>` is active.

```typescript
@Directive({
  selector: '[myDirective]'
})
export class MyDirective implements OnInit {

  constructor(private select:MatSelect) { }

  ngOnInit() {
    this.select.openedChange.subscribe(isOpen => {
      if(isOpen) {
        console.log('open', this.select.panel);
      }
    })
  }
}
```

## Full example

Here's a Stackblitz example to play around with

{{<stackblitz uid="edit/blog-angular-mat-select-panel-options">}}
