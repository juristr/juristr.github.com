---
layout: post_new
title: "Demystifying dynamic Forms in Angular"
lead: "Learn how easy it is to create dynamic, reactive forms with Angular"
postimg: "/blog/assets/imgs/dynamic-form-angular.png"
tags: [ "Angular", "Video Lesson" ]
---

<div class="article-intro">
	Heared about reactive Angular forms? Maybe even about dynamic forms? Never tried because you think it’s too complicated to setup and an overkill for your common use cases? Let me try to help you learn about how easy it is to setup dynamic forms with Angular.
</div>

{% include postads %}

{% assign message = "Contents are based on Angular version >= 2.0.0" %}
{% include warn-notice.html %}

{% include toc.html %}

So a couple of months back I saw this tweet.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Did you create/ use dynamic forms in <a href="https://twitter.com/hashtag/angular?src=hash&amp;ref_src=twsrc%5Etfw">#angular</a> <a href="https://twitter.com/hashtag/angularjs?src=hash&amp;ref_src=twsrc%5Etfw">#angularjs</a> (By that I mean form templates generated from javascript objects). Did you like it?</p>&mdash; little chaosmonster (@chaos_monster) <a href="https://twitter.com/chaos_monster/status/889774322910363648?ref_src=twsrc%5Etfw">July 25, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Quite mixed results. Those who tried actually liked it, but there seem to be a lot of people who were either dissatisfied or didn't try yet. The goal of this article is to help those get started easily.

## Egghead.io - Video Course

If you're too lazy to read and would rather like to walk through all this stuff step by step with me, then definitely check out my **Egghead course on "Create Dynamic Forms with Angular"**.

<a href="https://egghead.io/courses/create-dynamic-forms-in-angular" class="egghead-lesson" data-lessonuid="courses/create-dynamic-forms-in-angular">
  <img src="/blog/assets/imgs/egghead-dynamic-forms-banner.png" style="width:100%" />
</a>

## Template driven and reactive forms

Angular has two different types of forms you can choose from, **template driven** and **reactive** forms (also called model driven) . There are a lot of articles out there already (including a [very rough intro I've written](https://juristr.com/blog/2016/08/ng2-forms-first-look/) last year) about the difference between the two.

At a very high level, very generalized we could say that...

* **template driven forms -** you start and do most of the work in the Angular template by adding bindings with custom directives; Angular creates the according form control objects behind the scenes
* **reactive forms -** you start in your component class, by creating your form programmatically before then binding the resulting object to the template; you're in charge/control of every single step; you have observable streams on changes of the form elements etc..

## Why even create Dynamic Forms

Dynamic forms can be a very powerful instrument. Imagine you have a varying object model, where the user itself can decide how many fields there are or add additional ones. Think of questionaire interfaces such as [Google Forms](https://www.google.com/forms/about/) where you wouldn't know about how many fields and which kind of fields the user of the form is about to define. There are a lot of interesting and valid use cases.

But now let's get to the meat. In this example we'll follow the **reactive forms** approach.

## Our API

In order to be able to create a dynamic form, we need to have a proper way of describing the structure of our form as well as of our data we want to get out of it in the end.

> This is just one way it could look like which I've created purposefully just for this tutorial. There are potentially many ways of how such API could look like and it may largely depend on the type of use case and application.

This API could be directly exposed by some backend or defined within our application. That's up to you. In this example here I simply created an object that represents it.

```javascript
// person.ts
export const person = {
  name: {
    label: 'Name',
    value: 'Juri',
    type: 'text',
    validation: {
      required: true
    }
  },
  age: {
    label: 'Age',
    value: 32,
    type: 'text'
  },
  gender: {
    label: 'Gender',
    value: 'M',
    type: 'radio',
    options: [{ label: 'Male', value: 'M' }, { label: 'Female', value: 'F' }]
  },
  city: {
    label: 'City',
    value: '39010',
    type: 'select',
    options: [
      { label: '(choose one)', value: '' },
      { label: 'Bolzano', value: '39100' },
      { label: 'Meltina', value: '39010' },
      { label: 'Appiano', value: '39057' }
    ],
    validation: {
      required: true
    }
  }
};
```

Here I model a `Person` object where I mix the structure of the form with the actual data. Take a look at the `name` property for instance

```javascript
...
name: {
  value: 'Juri',
  label: 'Name',
  type: 'text',
  validation: {
    required: true
  }
},
...
```

Lets take a closer look:

* the `name` itself represents the property of our `Person` model. That's the property I expect the form to fill with the value the user inputs;
* the actual `value` of the property `name` which gets databound to the form input field. This could be the data which is already present in our model/store/DB, or simply a default value;
* then there is a `label` which is simply the one that gets rendered as the input field `<label>`;
* the `type` which indicates which HTML input field should be rendered (text, radio, select,...);
* and finally a set of validators to be applied to our form input field.

## Reactive Forms Refresher

To start we should first take a closer look at how we would bind our simple example of the `Person`'s `name` property using Angular's reactive form approach. So in our component class we create a new `FormGroup` with a `FormControl` for our `name` property.

```javascript
@Component({...})
export class PersonEditComponent {
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl()
    })
  }
}
```

> Not this is the extended form as we will need it later. For a shorter variant, inject the `FormBuilder` :+1:

Then, our component template needs to bind the the `FormGroup` we just created (`form` member variable) using the `[formGroup]` directive and then the `formControlName` directive for associating our `name` `FormControl` to the correct HTML input field.

```javascript
@Component({
  selector: 'person-edit',
  template: `
    ...
    <form [formGroup]="form">
      <div>
        Name: <input type="text" formControlName="name" />
      </div>
    </form>
    ...
  `
})
export class PersonEditComponent {
  form;
  ...
}
```

Here's a running example:

<iframe src="https://stackblitz.com/edit/angular-reactiveforms-basics-pmh1ce?embed=1&file=app/person-edit.component.ts&hideExplorer=1" width="100%" height="400px"> </iframe>

## Rendering the form dynamically

Great, that was easy. Now let's make it dynamic. :smiley:! To do so, we create a new Angular component called `dynamic-form.component.ts` which is responsible for rendering a dynamic form based on the `@Input` he gets.

```javascript
@Component({...})
export class DynamicFormComponent implements OnInit {
  @Input() dataObject;
}
```

Pay attention to the **dataObject**. It is where we pass in our `person` object representing our dynamic form structure.

```
import { person } from './person';

@Component({
  selector: 'my-app',
  template: `
    <dynamic-form [dataObject]="person"></dynamic-form>
  `
})
export class AppComponent {
  person;

  constructor() {
    this.person = person;
  }
}
```

We will need it a couple of times in the following sections to build our form.

### Remap our API to be suitable for iterating

As a first step we want to **remap our object coming from our dynamic form API**, which is..

```
export const person = {
  name: {
    label: 'Name',
    value: 'Juri',
    type: 'text',
    validation: {
      required: true
    }
  }
  ...
}
```

..into something like this:

```javascript
[
  {
    key: "name",
    label: "Name",
    value: "Juri"
    type: "text",
    validation: {required: true},
  },
  ...
]
```

This new structure is more suitable for iterating over it and to setup the proper form. We use `Object.keys(..)` to iterate over all of the properties coming from the `@Input` and store the result in a member variable `objectProps` of our component (which we'll access later from within our template).

```
@Component({...})
export class DynamicFormComponent implements OnInit {
  @Input() dataObject;
  objectProps;

  constructor() {
  }

  ngOnInit() {
    // remap the API to be suitable for iterating over it
    this.objectProps =
      Object.keys(this.dataObject)
        .map(prop => {
          return Object.assign({}, { key: prop} , this.dataObject[prop]);
        });
  }
  ...
}
```

### Dynamically render `FormGroup` and `FormControls`

Next we dynamically create the `FormGroup` and `FormControls` necessary for creating the binding on our HTML form.

```
@Component({...})
export class DynamicFormComponent implements OnInit {
  @Input() dataObject;
  form: FormGroup;
  objectProps;

  constructor() {
  }

  ngOnInit() {
    // remap the API to be suitable for iterating over it
    this.objectProps = ...

    // setup the form
    const formGroup = {};
    for(let prop of Object.keys(this.dataObject)) {
      formGroup[prop] = new FormControl(this.dataObject[prop].value || '', this.mapValidators(this.dataObject[prop].validation));
    }

    this.form = new FormGroup(formGroup);
  }

  mapValidators(validators) {...}
  ...
}
```

Note, we iterate over our `dataObject` which again comes from our component `@Input`. For each property we create a new `FormControl`, passing in the property value `this.dataObject[prop].value` (or an empty string) and we map it to the `formGroup` using the property name as key `formGroup[prop]`. `formGroup` here is just a plain normal JavaScript object which we then assign to our `form` member variable of our component:

```
this.form = new FormGroup(formGroup);
```

### Create Form Validators

You might have seen that when creating the `FormControl` I also invoked a `this.mapValidators(...)` function passing in the validators specified in the `validation` property of our `dataObject` coming from the `@Input`. That function is actually quite simple. All it does is to take the defined validation and map it to a proper form validator instance:

```
private mapValidators(validators) {
  const formValidators = [];

  if(validators) {
    for(const validation of Object.keys(validators)) {
      if(validation === 'required') {
        formValidators.push(Validators.required);
      } else if(validation === 'min') {
        formValidators.push(Validators.min(validators[validation]));
      }
    }
  }

  return formValidators;
}
```

### Render the HTML

We're all set now. We have our `form: FormGroup` object as well as the array of properties to map stored in the `objectProps` member. We can now use those two in our template to construct the actual HTML form.

First we create the HTML form and bind the `FormGroup` we created.

```html
<form novalidate (ngSubmit)="onSubmit(form.value)" [formGroup]="form">
  <p>
    <button type="submit">Save</button>
  </p>
</form>
```

Next we **iterate over the `objectProps`** to make sure we **create an according form input field for all our object's properties**. Here for instance we should already see the labels with the specified value being rendered.

```html
<form novalidate (ngSubmit)="onSubmit(form.value)" [formGroup]="form">
  <div *ngFor="let prop of objectProps">
    <label [attr.for]="prop">{{prop.label}}</label>

  </div>
  <p>
    <button type="submit">Save</button>
  </p>
</form>
```

Next we obviously have to **create the form fields**. Let's do that for our simple `name` property which needs a `<input type="text">` field.

```html
<form novalidate (ngSubmit)="onSubmit(form.value)" [formGroup]="form">
  <div *ngFor="let prop of objectProps">
    <label [attr.for]="prop">{{prop.label}}</label>

    <div [ngSwitch]="prop.type">

      <input *ngSwitchCase="'text'"
        [formControlName]="prop.key"
        [id]="prop.key" [type]="prop.type">

    </div>
  </div>
  ...
</form>
```

Note how we use an `ngSwitch` statement on the `type` property which defines which kind of input field we need. We then specify a `ngSwitchCase="'text'"` to define the case for text inputs. By doing so we also bind the `formControlName` accordingly as well as the `type` and `id` property of the HTML input field.

```html
<input *ngSwitchCase="'text'"
    [formControlName]="prop.key"
    [id]="prop.key" [type]="prop.type">
```

That's it. Finally, let's also **render our validators**. For now we account just for `required` validators, but it should be an easy task for you to extend that further.

```html
<div [ngSwitch]="prop.type">
  <input *ngSwitchCase="'text'"
    [formControlName]="prop.key"
    [id]="prop.key" [type]="prop.type">
</div>

<div class="error" *ngIf="form.get(prop.key).invalid && (form.get(prop.key).dirty || form.get(prop.key).touched)">
  <div *ngIf="form.get(prop.key).errors.required">
    {{ prop.label }} is required.
  </div>
</div>
```

### Ready to see it in action?

Let's see how simple `name` property binding looks like.

<iframe src="https://stackblitz.com/edit/angular-dynamicforms-blogarticle-simple?embed=1&file=app/dynamic-form.component.ts&hideExplorer=1" width="100%" height="400px"> </iframe>

## Mapping further input fields

Mapping further input fields means adding further `ngSwitchCase` statements and to establish the binding with the reactive form.

### Dropdown fields (`<select>`)

Here's the binding for dropdown fields. Here we clearly need a value for all available options to be rendered. If you payed attention previously, our API did account for that. Take the `city` property:

```javascript
...
city: {
  label: 'City',
  value: '39010',
  type: 'select',
  options: [
    { label: "(choose one)", value: ''},
    { label: "Bolzano", value: '39100'},
    { label: "Meltina", value: '39010'},
    { label: "Appiano", value: '39057'}
  ],
  ...
}
...
```

In our HTML we will need the `options` property for rendering the various possibilitis for the user to choose from.

```html
<div *ngSwitchCase="'select'">
  <select [formControlName]="prop.key">
    <option *ngFor="let option of prop.options" [value]="option.value">
      {{ option.label }}
    </option>
  </select>
</div>
```

### Radio button lists

Radio button lists are very similar to our previous dropdown input field. Take a look:

```html
<div *ngSwitchCase="'radio'">
  <label *ngFor="let option of prop.options">
    <input
      type="radio"
      [name]="prop.key"
      [formControlName]="prop.key"
      [value]="option.value"> {{option.label}}
  </label>
</div>
```

## Final, Running Example

Great! You did it! Here's our running example using the amazing [StackBlitz editor](https://stackblitz.com/). _Hint: you can modify the structure and see the form dynamically reflect the change :wink:_

<iframe src="https://stackblitz.com/edit/angular-dynamicforms-blogarticle?embed=1&file=app/person.ts&hideFileExplorer=1" width="100%" height="400px"> </iframe>

## Conclusion

As you have seen, creating a simple dynamic form using the reactive approach in Angular is extremely easy. Of course in a real world scenario things might get more complex due to the complexity of your forms or your application requirements. You can definitely code the dynamic form yourself as we have learned in this article. Otherwise there's [ng-formly](https://github.com/formly-js/ng-formly) which can help you automate a big part.
