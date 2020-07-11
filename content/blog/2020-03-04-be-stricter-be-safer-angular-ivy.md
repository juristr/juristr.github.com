---
type: post
title: "Be Stricter, Be Safer with Angular Ivy"
lead: >-
  Enable strictTemplates now!
date: 2020-02-29T21:45:09+01:00
comments: true
url: /blog/2020/03/be-stricter-be-safer-with-ivy
# image: /blog/assets/imgs/rx-to-promise-journey/rxjourney-bg.jpg
categories:
  - Angular
tags:
  - angular
draft: true
---

{{<intro>}}
  Scalability, good developer ergonomics & tooling have always been among the core design goals of Angular. In this article we're going to look into how Angular 9 (aka Ivy) improves on that front.
{{</intro>}}
<!--more-->

{{< postad >}}

When Angular initially introduced first class support for TypeScript, it caused a lot of discussions througout the community. I mean, you could always use plain JavaScript to write Angular code, but the dev experience was simply not on a par with what you'd get when using it with TypeScript. It split the community: those who loved it (mostly ppl already coming from some statically typed (backend) languages), and those who hated it because they felt to not have enough freedom.  
Now that's a few years back already. Fast forward to today most of the complaints have gone. TypeScript got a lot better and with its improved type inference you often don't even perceiving the difference to plain normal JavaScript any more. Also, a lot of React people jumped onto TypeScript as well & Vue 3 (the framework) has been rewritten entirely with it.

But Angular never stopped there. Already from the very early days, similar to TypeScript's Language Service, it had its own Angular Language service. The goal is to give autocomplete and type checking support even inside Angular HTML templates. 

Angular 9 introduces a couple of other options to provide better template checking: `strictTemplates`. Enable them in the root `tsconfig.json` file:

```json
"angularCompilerOptions": {
  "strictTemplates": true,
  "fullTemplateTypeCheck": true
}
```

Assume we have the following component:

```typescript
@Component({
  selector: "app-person-detail",
  ...
})
export class PersonDetailComponent {
  @Input() personName: string;
  @Input() age: number;
  @Input() size = 200;
}
```

If we pass in an object like...

```typescript
person = {
  name: 'Juri',
  age: 34
};
```

..into our component

```html
<app-person-detail
  [personName]="person.name"
  [age]="person.age"
></app-person-detail>
```

..then Angular 8 wouldn't have complained. With Angular 9 and `strictTemplates` enabled, we'll get a nicely formatted error message at build time.

{{<figure url="/blog/assets/imgs/ivy-templates-error.jpg" size="full">}}

While this might seem trivial, it can prevent a series of nasty bugs. Take for instance the `size` property on our component: 

```typescript
@Component({...})
export class PersonDetailComponent {
  ...
  @Input() size = 200;
}
```

TypeScript implicitly associates a `number` type to it. As a result, the following template will result in a compilation error:

```html
<app-person-detail
  [personName]="person.name"
  [age]="person.age"
  size="120"
></app-person-detail>
```

Why? Because `120` will be data-bound as string! Instead the correct binding would be

```html
<app-person-detail
  [personName]="person.name"
  [age]="person.age"
  [size]="120"
></app-person-detail>
```

## strictTemplates with strictNullChecks enabled

If you have `strictNullChecks` enabled in your `tsconfig.json` you may get a lot of errors after also enabling `strictTemplates`.

Take for instance the following example where we use the async pipe to pass in some value to our component property:

```html
<app-person-detail 
  [age]="(person$ | async)?.age">
  </app-person-detail>
```

Clearly the data-bound property `age` on the component will be undefined initially might have a value or it could be `undefined`. 

{{<figure url="/blog/assets/imgs/ivy-error-strict-null-checks.jpg" size="full">}}

To prevent that, set the `strictNullInputTypes` to `false`.


```json
"angularCompilerOptions": {
  "strictTemplates": true,
  "fullTemplateTypeCheck": true,
  "strictNullInputTypes": false
}
```


