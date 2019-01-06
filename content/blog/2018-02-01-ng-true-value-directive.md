---
title: Create a ng-true-value & ng-false-value directive for Angular
lead: >-
  Remember the ng-true-value that existed in AngularJS (v1.x)? Let's create one
  for Angular and learn how to hook into Angular's form API
categories:
  - Angular
date: 2018-02-01T01:00:00.000Z
comments: true
url: /blog/2018/02/ng-true-value-directive
type: post
image: /blog/assets/imgs/true-false-directive-bg.png
---

<div class="article-intro">
	If you come from AngularJS (v1.x) I'm pretty sure you remember the `ng-true-value` and `ng-false-value` directive you could hook onto the checkbox elements in your forms. In Angular (2+) there's no such built-in directive. But that doesn't prevent us from creating one and at the same time learn how to build a custom value accessor for Angular forms :smiley:.
</div>

{{< postad >}}

{{<warn-notice message="Contents are based on Angular version >= 2.0.0" >}} {%
include warn-notice.html %}

{{< toc >}}

## Egghead.io Video Lesson

Lazy? Then check out my Egghead.io companion lesson on how to "Create a custom form control using Angular's ControlValueAccessor"

{% assign video_title = "Create a custom form control using Angular's ControlValueAccessor" %}
{% assign video_url = "https://egghead.io/lessons/egghead-create-a-custom-form-control-using-angular-s-controlvalueaccessor" %}
{% assign affiliate_client = "eggheadio" %}
{% assign affiliate_uid = "lessons/egghead-create-a-custom-form-control-using-angular-s-controlvalueaccessor" %}
{% include video-banner.html %}

## Why?

When you bind your data model to a checkbox onto your form, many times you don't have a pure true/false boolean value, but rather values like "yes/no", "active/inactive" and whatever other form you like. Why? Because that's how your data model looks like. Of course we could cast it to booleans when we fetch the data from the backend or straight before binding it to the form.

In AngularJS (v1.x) you can use the `ng-true-value` and `ng-false-value` to map boolean values onto a checkbox:

```html
<input type="checkbox" name="lovingAngular" ng-model="formData.lovingAngular"
               ng-true-value="'YES'" ng-false-value="'NO'">
```

{{<plunker plunker_url="https://embed.plnkr.co/LckwNBeRL2A0Ao9TS2oc/">}}
 

## Angular Forms Primer

Angular (2+) has two different kind of form flavors:

- Template driven forms (very similar to AngularJS forms)
- Reactive or model driven forms

While the 1st one is much easier to get started with probably, especially if you're coming from AngularJS, the latter is the preferred one [and much more powerful](/blog/2017/10/demystify-dynamic-angular-forms/). Here are some articles:

{{<article-link
    url="/blog/2016/08/ng2-forms-first-look/"
    title="Angular Forms - a first look"
    text="A first quick look at the new Forms API in Angular"
    imageurl="https://www.gravatar.com/avatar/64537dfe80f44978663e378d375c7138?s=150&d=identicon&r=PG"
>}}

## Creating Custom Form Controls

To get started, you need to implement the `ControlValueAccessor` interface. See the [official docs for more info](https://angular.io/api/forms/ControlValueAccessor).

```javascript
interface ControlValueAccessor { 
  // called when the model changes which
  // need to be written to the view
  writeValue(obj: any): void;

  // change callbacks that will be called by the Form API
  // to propagate changes from the view to the model.
  registerOnChange(fn: any): void;

  // to propagate changes from the view to the model
  // onBlur
  registerOnTouched(fn: any): void;

  // called to set the disabled/enabled state
  setDisabledState(isDisabled: boolean)?: void;
}
```

By implementing this interface we can hook a totally customized form control into the Angular form API and it will just work.

## Create the `trueFalseValue` Directive

In our case we don't want to build a totally new component, but we rather want to build a directive that augments a checkbox input type. The API we're aiming for is the following:

```html
<input type="checkbox" trueFalseValue trueValue="yes" falseValue="nope"> loving Angular?
```

The first step is obviously to build the base directive:

```javascript
@Directive({
  selector: 'input[type=checkbox][trueFalseValue]'
})
export class TrueFalseValueDirective { 
  @Input() trueValue = true;
  @Input() falseValue = false;
}
```

This directive matches all checkbox input types, having the `trueFalseValue` attribute, our directive. We could potentially target all `input[type=checkbox]` directly, I just wanted to explicitly "activate" our directive. Furthermore it takes two input properties `trueValue` and `falseValue` with the boolean defaults.

## Implement the `model -> view`

Next we implement the `ControlValueAccessor` interface, importing it from `@angular/forms`. In the `writeValue(...)` function we handle the values coming from the Angular Forms API which we then need to bind onto our checkbox.

The instance of our checkbox can be retrieved via the `ElementRef`. Then, based on the `trueValue` and `falseValue` that has been set, we need to update the underlying checkbox DOM element. We use the `Renderer2` (from `@angular/core`) for setting that value.

> **Note**, we could directly access the native element using the DOM api over the `this.elementRef.nativeElement`. However, this won't be safe when our code is run in other environments, such as in a Web Worker or the server-side.

```javascript
@Directive({ ... })
export class TrueFalseValueDirective implements ControlValueAccessor {
  @Input() trueValue = true;
  @Input() falseValue = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ...

  writeValue(obj: any): void {
    if (obj === this.trueValue) {
      this.renderer.setProperty(this.elementRef.nativeElement, 'checked', true);
    } else {
      this.renderer.setProperty(this.elementRef.nativeElement, 'checked', false);
    }
  }
  ...
}
```

## Implement the `view -> model`

What's missing is the path from our `view -> model` which is handled via the `registerOnChange(...)` callback.

```javascript
@Directive({ ... })
export class TrueFalseValueDirective implements ControlValueAccessor {
  @Input() trueValue = true;
  @Input() falseValue = false;
  private propagateChange = (_: any) => {};

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  writeValue(obj: any): void { ... }

  ...

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  ...
}
```

We save the passed in callback `fn` onto our `propagateChange` member variable of our class. Then we register on the checkbox change event via the `HostListener` (from `@angular/core`):

```javascript
@Directive({ ... })
export class TrueFalseValueDirective implements ControlValueAccessor {
  @Input() trueValue = true;
  @Input() falseValue = false;
  private propagateChange = (_: any) => {};

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  writeValue(obj: any): void { ... }

  @HostListener('change', ['$event'])
  onHostChange(ev) {
    this.propagateChange(ev.target.checked ? this.trueValue : this.falseValue);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  ...
}
```

## Register the custom `ControlValueAccessor`

As a last step, we need to **register our ControlValueAccessor**.

```javascript
...
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl
} from '@angular/forms';

@Directive({
  selector: 'input[type=checkbox][trueFalseValue]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TrueFalseValueDirective),
      multi: true
    }
  ]
})
export class TrueFalseValueDirective implements ControlValueAccessor { }
```

## Final, running example

Here's the **full running example**:

<iframe src="https://stackblitz.com/edit/angular-ng-true-false?embed=1&ctl=1&file=app/true-false-value.directive.ts&embed=1" width="100%" height="400px"> </iframe>

