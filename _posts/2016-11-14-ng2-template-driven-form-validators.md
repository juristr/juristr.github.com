---
layout: post_new
title: "Custom validators in template driven Angular 2 forms"
lead: "Learn what a validation factory function is and how to implement a validation directive to be added to your form controls"
postimg: "/blog/assets/imgs/customvalidator.png"
tags: [ "JavaScript", "Angular"]
reposts: [ "http://javascriptweekly.com/issues/311" ]
---

<div class="article-intro">
    Angular 2 has <a href="/blog/2016/08/ng2-forms-first-look/">two different kind of Forms API</a>, the reactive and template driven approach. In this article we will focus on the template driven approach and learn how to use it as well as how to build a custom validator with it.
</div>

{% include postads %}

[Todd Motto](https://twitter.com/toddmotto) recently published a similar article on ["Reactive FormGroup validation with AbstractControl in Angular 2"](https://toddmotto.com/reactive-formgroup-validation-angular-2), which you might definitely want to check out for the reactive kind of approach to this.

## A simple Angular 2 Form

Ok, before starting, let's take a look at our simple Angular 2, template driven form.

```html
<form #form="ngForm" (ngSubmit)="onSubmit(form.value)">
    <div>
        Firstname: 
        <input type="text" ngModel name="firstname" />
    </div>
    <div>
        <button>Submit</button>
        <button (click)="onReset($event, form)">reset</button>
    </div>
</form>
```

So far so good, binding works. For more details on how to setup your initial form binding, take a look at my article on that topic:

{% include article-link.html
    url="/blog/2016/08/ng2-forms-first-look/"
    title="Angular 2 Forms - a first look"
    text="Learn about the reactive as well as template driven approach to forms in Angular 2"
    imageurl="https://www.gravatar.com/avatar/64537dfe80f44978663e378d375c7138?s=150&d=identicon&r=PG"
%}

## Adding built-in validators

We can make use of the built-in [HTML5 validators in Angular 2](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation) just as we were able already in Angular 1. Behind the scenes, Angular recognizes these validators and integrates with them.

That said, as a first step we add the `novalidate` attribute onto our form. This disables the browser validation behavior and let's us do the displaying of valiation errors with Angular.

```html
<form novalidate #form="ngForm" (ngSubmit)="onSubmit(form.value)">
    ...
</form>
``` 

Next we can take a closer look at the input control and add a simple `required` attribute for making it a required input field.

```html
<div>
    Firstname: 
    <input type="text" ngModel name="firstname" required />
</div>
```

This makes our input a required field and when it's not compiled, the according `form.valid` property will be `false`. You may be wondering where the `form` comes from? It's the template variable I've defined and associated with `ngForm`. This is the way it's done in the Angular 2 template driven approach.

```html
<form novalidate #form="ngForm" (ngSubmit)="form.valid && onSubmit(form.value)">
    ...
</form>
```

Note that I'm adding `form.valid && onSubmit(...)` to our `(ngSubmit)` event. This way our form won't submit unless it is valid. Obviously we also need to display some kind of message. To do so, we first have to get a reference to our `NgModel` object that sits behind the `<input>`. This object is instantiated for us by Angular when we add the `ngModel` directive to our control. `NgModel` holds information about the input control such as validation errors.

```html
<div>
    Firstname: 
    <input type="text" ngModel name="firstname" required #firstname="ngModel" />
</div>
```

Now that we have this reference, we can use it to check for the different kind of validation errors. There are different approaches to visualizing validation errors. Check out the [Forms Validation cookbook on the Angular IO site]() for more details. For now we will simply hard code them in our template.

```html
<div>
    Firstname: 
    <input type="text" ngModel name="firstname" required #firstname="ngModel" />
    <div style="color:red" 
        *ngIf="firstname.errors && (firstname.dirty || firstname.touched || form.submitted)">
        
        <p *ngIf="firstname.errors.required">
            The name is required
        </p>
    </div>
</div>
```
So what we did here is to add another `<div>` which contains the validation messages. The `*ngIf` you see, is there to only visualize our validation errors when our `firstname` field (pointing to the `ngModel` instance) actually contains errors (`firstname.errors`). Moreover, we also only want to only show it when either our fields is _dirty_, _touched_ or when the form has been submitted.  
Within that div, we can then do some more fine-grained checks for the kind of error by accessing the `firstname.errors` property, in our case the `firstname.errors.required`.

## Building a custom validator

Ok, now that you've seen how to add the build-in validators, let's build the super useful "JuriNameValidator", a validator that only allows "Juri" to be entered in a textbox. Sounds reasonable, doesn't it?

So first we need to define and implement our so-called **validation factory**. Don't let be scared away, it's a simple function that builds and returns our validation function. We get an `AbstractControl` as parameter to our validation function that can be used to access the underlying field value, by using the according `value` property. If our validation check is valid, we return `null`, otherwise we return an object with a property `juriName` containing itself a property `valid` set to false.

```javascript
import { AbstractControl, ValidatorFn } from '@angular/forms';

// validation function
function validateJuriNameFactory() : ValidatorFn {
  return (c: AbstractControl) => {
    
    let isValid = c.value === 'Juri';

    if(isValid) {
        return null;
    } else {
        return {
            juriName: {
                valid: false
            }
        };
  }
}
```

Once we have our validation factory funtion, **we need to create a directive** which mainly serves to attach our validation function onto an existing HTML input control. An Angular 2 directive is mostly like a component with the main difference that it doesn't have a template.

```javascript
@Directive({
  selector: '[juriName][ngModel]'
})
export class JuriNameValidator implements Validator { ... }
```

We register it on HTML controls having the attribute `juriName` as well as `ngModel`. Next, we connect our validation factory function with our directive. Note how in the constructor we call our factory function (which resides in this very same file) and associate it to our local `validator` variable. Note that here we could pass parameters to our `valdiateJuriNameFactory` which get passed as `@Input` to our directive.

```javascript
function validateJuriNameFactory() : ValidatorFn { ... }

@Directive({...})
export class JuriNameValidator implements Validator {
  validator: ValidatorFn;
  
  constructor() {
    this.validator = validateJuriNameFactory();
  }
  
  validate(c: FormControl) {
    return this.validator(c);
  }
  
}
```

Great. But who calls the `validate(...)` function of our directive?? That's a last missing step we have to do:

```javascript
import { NG_VALIDATORS, Validator } from '@angular/forms';
...
@Directive({
  selector: '[juriName][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: JuriNameValidator, multi: true }
  ]
})
export class JuriNameValidator implements Validator { ... }
```

Finally we're now ready to add our validator to our form which is as simple as adding `juriName` to our input control as well as defining a proper error message.

```html
<div>
    Firstname: 
    <input type="text" 
        ngModel 
        name="firstname" 
        #firstname="ngModel" 
        required 
        juriName />
        
    <div style="color:red" *ngIf="firstname.errors && (firstname.dirty || firstname.touched || form.submitted)">
        <p *ngIf="firstname.errors.required">
            The name is required
        </p>
        <p *ngIf="firstname.errors.juriName">
            Only allowed name is "Juri" ;)
        </p>
    </div>
</div>
```

## Final Code

Here's the final code in a easy to use Plunk:

{% assign plunker_url = "https://embed.plnkr.co/jN8cL5mly1hMMVPlzCSw/" %}
{% include plunker.html %}

_Many thanks to [Sam Vloeberghs](https://twitter.com/samvloeberghs) for reviewing this article_
