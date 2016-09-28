---
layout: post_new
title: "Angular 2 Forms - a first look"
lead: "A first quick look at the new Forms API in Angular 2"
postimg: "/blog/assets/imgs/forms.png"
tags: [ "JavaScript", "Angular"]
---

<div class="article-intro">
  Angular 2 gets a brand new Forms API. It's fresh out of the compiler and since there's not much documentation around yet, <a href="https://twitter.com/angular_zone">@angular_zone</a> powered by <a href="https://twitter.com/gerardsans">Gerard Sans</a> and <a href="https://twitter.com/manekinekko">Wassim Chegham</a> organized a Google Hangout with <a href="https://twitter.com/karaforthewin">Kara Erickson</a>, core contributor to the Forms Api. Here I'm basically summarizing the main points and created a runnable Plunker for you to play with.
</div>

{% include postads %}

<iframe width="750" height="500" src="https://www.youtube.com/embed/E92KS_YCSf8" frameborder="0" allowfullscreen="allowfullscreen"> </iframe>

---

Watch  Kara's talk at AngularConnect 2016 for an exhaustive Forms intro

- [Slides](https://docs.google.com/presentation/d/1rufZvQabEwpinabiMRq1rAa5nWR3ZpsTvw4snePAsjM/preview?slide=id.p)
- Video _(coming soon)_

---

## Two different approaches to Forms

There are basically two different approaches to Angular 2 forms:

- **Template driven**, Angular 1 style forms
- **Reactive, or model-driven** forms

Both of them are **feature equivalent**, so you're fine to go either way. It's however not suggested to mix them. Also, both share the same underlying concepts:

**View**

```html
<input type="text" />
```

**Model**, which has properties for validation like

- value
- valid/invalid
- pristine/dirty
- touched/untouched
- errors

It's important to note that this **is not the domain model** you bind through `ngModel` or similar. It's a dedicated form model holding the validation and form control state properties.

So, the _view part_ is what is called **value accessor** because we may have different kind of views with different ways of getting hold of their respective value:

```html
<input type="text" />
<input type="radio" />
<select></select>
```

The value accessor knows how to interact with the underlying DOM element to get and set the according value. All of them implement the `ControlValueAccessor` interface. 

The _model part_ is an instance of `FormControl`.

> Every form control has one view (`ControlValueAccessor`) and a model instance (`FormControl`).

So to summarize:

- **Template driven** 
  - Elements like `ngModel`, `ngModelGroup`, `ngForm`
  - implicitly created
  - asynchronous, lots of stuff going on behind the scenes for wiring up the `FormControl` instance etc.
- **Reactive (model-driven)** 
  - Elements like `formControlName`, `formGroupName`, `formArrayName`, `formControl`, `formGroup`
  - explicitly/programmatically created
  - synchronous and more predictive as they're created programmatically and there's not template rendering in the middle

Let's take a look.

## Enabling the Form Api

To enable the Forms API you need to import the according `FormsModule` from `@angular/forms` and reference it within the module where you plan to use it.

```
import { FormsModule }   from '@angular/forms';
...

@NgModule({
  imports: [ ..., FormsModule ],
  declarations: [ ... ],
  bootstrap: [ ... ]
})
export class AppModule {}
```

To learn more about `NgModule` check out [the guide on the official Angular 2 site](https://angular.io/docs/ts/latest/guide/ngmodule.html).

{% include article-link.html
    url="https://angular.io/docs/ts/latest/guide/ngmodule.html"
    title="Angular Modules (NgModule)"
    text="Learn how to bundle Angular modules using the NgModule API"
%}

Now we should be good to go. **Here's a runnable Plunker** which you can use to test out the various concepts as we quickly go over them.

<iframe src="https://embed.plnkr.co/7451oI7vgmZnCBuDMESt/" width="100%" height="400px"> </iframe>

#### Prior to Angular 2 RC5

Prior to RC5 when Angular modules have been introduced, you had to explicitly disable the "old" Forms API which was already present in Angular 2. To disable it, call the `disableDeprecatedForms()` function and then enable the brand new Forms API using the `provideForms()` and by passing it along to the Angular 2 bootstrap function:

```javascript
// main entry point
import {bootstrap} from '@angular/platform-browser-dynamic';
import {disableDeprecatedForms, provideForms} from '@angular/forms';

import {App} from './app';

bootstrap(App, [
  disableDeprecatedForms(),
  provideForms()
  ])
  .catch(err => console.error(err));
```

But I highly recommend to upgrade to the latest Angular 2 release if possible.

## Template driven approach

So assume we're having this plain simple HTML form:

```html
<form>
  <div>
    Firstname: <input type="text" name="firstname" />
  </div>
  <div>
    Surname: <input type="text" name="surname" />
  </div>
  <div>
    Age: <input type="text" name="Age" />
  </div>
</form>
```

To hook it to Angular 2's Forms API, you first need to declare a `#form` like

```html
<form #form="ngForm">
  ...
</form>
```

### Simple bindings

As a next step we need to add the `ngModel` attribute to our form controls:

```html
<input type="text" ngModel name="firstname" />
```

This way we use the _template driven approach_, meaning by adding the `ngModel` attribute, behind the scenes the `FormControl` instance is created for use which we need for getting access to the underlying DOM element value. To see this two-way binding works, let's print out the state of our form value:

```html
<pre>{%raw%}{{ form.value | json }}{%endraw%}</pre>
```

By typing into the text fields you can now see how we established a proper binding. Check it out yourself [in the linked Plunker](https://plnkr.co/edit/7451oI7vgmZnCBuDMESt?p=preview).

### Grouping form controls

Often it is necessary to group a number of form controls together, like the concept of an address, having properties such as street, city, state and zipcode. All of these are represented as separate form controls, but can be bound together as a form group.  

So what's the effect of that? Well, these form groups get all of the same properties as the individual form controls have (like value, validity, touched/untouched etc), but they are derived by the value of their children. Like if one child is invalid, the whole group gets invalid.  
Moreover, the fields of a `FormGroup` get serialized into a dedicated object (we'll explore soon how that looks like). A variant of that is the  `FormArray`. The key difference is that its data gets serialized as an array. This might be especially useful when you don't know how many controls will be present within the group, like dynamic forms.

Ok so far? Good, consider the concept of an address. We can simply add more fields to our form as follows:

```html
<form #form="ngForm">
  <div>
    Firstname: <input type="text" ngModel name="firstname" />
  </div>
  <div>
    Surname: <input type="text" ngModel name="surname" />
  </div>
  <div>
    Age: <input type="text" ngModel name="age" />
  </div>
  <fieldset>
    <legend>Address</legend>
    <div>
      Street: <input type="text" ngModel name="street" />
    </div>
    <div>
      ZipCode: <input type="text" ngModel name="zipCode" />
    </div>
  </fieldset>
</form>
```

This would get serialized like

```javascript
{
  "firstname": "",
  "surname": "",
  "age": "",
  "street": "",
  "zipCode": ""
}
```

But given that the address is already logically grouped on our UI, we want it to be serialized into a separate object `address`. As we just learned, this is as simple as adding a `ngModelGroup`: 

```html
<form #form="ngForm">
  ...
  <fieldset ngModelGroup="address">
    <legend>Address</legend>
    <div>
      Street: <input type="text" ngModel name="street" />
    </div>
    <div>
      ZipCode: <input type="text" ngModel name="zipCode" />
    </div>
  </fieldset>
</form>
```

The resulting serialized object in turn now looks like this:

```javascript
{
  "firstname": "",
  "surname": "",
  "age": "",
  "address": {
    "street": "",
    "zipCode": ""
  }
}
```

## Reactive approach

We've seen the template-based approach. Let's take a look at the **reactive or model-based** way of writing Forms. Again, here's a Plunker to play with:

<iframe src="https://embed.plnkr.co/IYnmaA22xt59YRqE1Lk9/" width="100%" height="400px"> </iframe>

To **activate the reactive approach** you have to import the `ReactiveFormsModule` from `@angular/forms` rather than the `FormsModule` which we imported before:

```javascript
import { ReactiveFormsModule } from '@angular/forms';

...

@NgModule({
  imports: [ ..., ReactiveFormsModule ],
  declarations: [ ... ],
  bootstrap: [ ... ]
})
export class AppModule {}

```

Then, given the reactive approach is model-based, we start from the JavaScript code of our component

```javascript
...
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  ...
})
export class App {
  form = new FormGroup({
    firstname: new FormControl(),
    surname: new FormControl(),
    age: new FormControl(),
    address: new FormGroup({
      street: new FormControl(),
      zipCode: new FormControl()
    })
  });
}
```

Note how we construct our controls and groups programmatically using the `FormControl` and `FormGroup` classes. Next we need to hook this `form` to our template:

```html
@Component({
  template: `
    <div>
      <h2>Forms Api demo</h2>
      <form [formGroup]="form">
        ...
      </form>
    </div>
  `
})
export class App { ... }
```

We do this by using the `[formGroup]` binding.

And finally, we need to map the group and form controls using `formControlName` and `formGroupName`.

```html
<form [formGroup]="form">
  <div>
    Firstname: <input type="text" formControlName="firstname" />
  </div>
  <div>
    Surname: <input type="text" formControlName="surname" />
  </div>
  <div>
    Age: <input type="text" formControlName="age" />
  </div>
  <fieldset formGroupName="address">
    <legend>Address</legend>
    <div>
      Street: <input type="text" formControlName="street" />
    </div>
    <div>
      ZipCode: <input type="text" formControlName="zipCode" />
    </div>
  </fieldset>
</form>
```


## Wrapping up

Great, so I hope I was able to give you a first overview of what the Forms API looks like in Angular 2. Obviously there's much more to explore!

{% include article-link.html
    url="http://blog.thoughtram.io/angular/2016/07/27/custom-form-controls-in-angular-2.html"
    title="Custom Form Controls in Angular 2"
    text="Learn how to create custom form controls with Pascal Precht from Thoughtram"
%}

