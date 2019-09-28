---
type: post
title: "Introduction to Angular Elements"
lead: >-
  Learn how to automatically convert your Angular Components to native Custom Elements
date: 2019-04-28T12:00:09+02:00
comments: true
url: /blog/2019/04/intro-to-angular-elements
image: /blog/assets/imgs/egghead-artwork-angular-elements.png
categories:
  - Angular
  - Egghead
tags:
  - angular
  - egghead
  - videos
---

{{<intro>}}
  You didn't yet get into Angular Elements? Then it's time to give it a go! In this article we're going to see what Angular Elements actually are, why they are useful and how to create our first Angular Element out of a plain component.
{{</intro>}}
<!--more-->

{{< postad >}}

{{< toc >}}

## Egghead course: Getting Started with Angular Elements

**Heads up!** I've created a 40min course on [Egghead.io](https://egghead.io/courses/getting-started-with-angular-elements?af=fj2vsx) that introduces you to Angular Elements, step by step. 

Here's the intro video for the course:

{{<egghead-lesson uid="lessons/angular-course-intro-to-angular-elements" >}}

The course walks you through..

- [Transform an Angular Component into a native Custom Element](https://egghead.io/lessons/angular-transform-an-angular-component-into-a-native-custom-element?af=fj2vsx)
- [Compile an Angular Component as standalone Custom Element](https://egghead.io/lessons/angular-compile-an-angular-component-as-standalone-custom-elements?af=fj2vsx)
- [Use ngx-build-plus to compile Angular Elements](https://egghead.io/lessons/angular-use-ngx-build-plus-to-compile-angular-elements?af=fj2vsx)
- [Communicate with Angular Elements using Inputs and Events](https://egghead.io/lessons/angular-communicate-with-angular-elements-using-inputs-and-events?af=fj2vsx)
- [Use an Angular component inside a React App with Angular Elements](https://egghead.io/lessons/react-use-an-angular-component-inside-a-react-app-with-angular-elements?af=fj2vsx)
- [Pass data from a React component to an Angular component with Angular Elements](https://egghead.io/lessons/react-pass-data-from-a-react-component-to-an-angular-component-with-angular-elements?af=fj2vsx)
- [Create multiple root components in Angular with Angular Elements](https://egghead.io/lessons/angular-create-multiple-root-components-in-angular-with-angular-elements?af=fj2vsx)
- [Use Angular components in AngularJS applications with Angular Elements](https://egghead.io/lessons/angular-use-angular-components-in-angularjs-applications-with-angular-elements?af=fj2vsx)

**View the entire course [here](https://egghead.io/courses/getting-started-with-angular-elements?af=fj2vsx)**.

## What are Angular Elements?

Angular Elements is the new kid on the block in the Angular ecosystem. Elements allows you to automatically convert (or wrap) every Angular Component as "Custom Element". Custom Elements are one of the specs under the umbrella term of **Web Components**. That opens up a loooot of new possibilities for Angular like

- **dynamically instantiating components -** but not with a ComponentFactoryWhatever but in the form of having it in a HTML string sent from the server for instance, a typically use case for _CMS systems_. It also allows us to instantiate a component using the browser native `document.createElement('...')` API.
- **compiling Angular components as custom elements** to be consumed "outside" of an Angular app. Assume you build some cool widgets you wanna reuse within your organization. But not everyone uses Angular, or even has a SPA. In such situation you can still compile your Angular component (as Angular Element) into a single JS file and use it wherever you need it
- **upgrading your AngularJS app -** there are [different strategies available](https://github.com/angular/ngMigration-Forum/wiki/Migration-Paths-Overview). Angular Elements are a new option to upgrade a legacy AngularJS app simply by embedding Angular Elements for certain pages/components.

## Why?

Why we need Angular Elements? There are plenty of reasons and use cases:

- Implementing more dynamic Angular Applications (i.e. CMS systems)
- Embed Angular Components in non-Angular Apps (i.e. sharing between teams at big organizations)
- Enhancing existing HTML pages (not everything is & should be created as single page app)
- Upgrading from AngularJS to Angular (i.e. by embedding Angular Elements in AngularJS apps)
- Micro Frontends
- ...

## Creating your first Angular Element

Ready? Let's jump straight in and create our first element.

First of all we need to install the new Angular Elements package (which usually doesn't come installed by default). Instead of installing and configuring it manually, we can use the Angular CLI's `ng add` command:

```
$ ng add @angular/elements
```

Next, we create a sample component - we call it `GreeterComponent` - that will be used as an Angular Element:

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  // selector: 'do-greet',
  template: `
    <div>
      Hi there!
    </div>
  `,
  styles: []
})
export class GreeterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
```

Note I do comment the `selector`. The reason is that with Angular Elements, we define the selector at the moment of registring the Angular Element. The `selector` in the component would be obsolete and only misleading for other developers. Therefore, I'm commenting it, hence communicating to my peers that this component will probably be registered in a different way.

Now that we have our component, we need to register it as a Custom Element by using the `@angular/elements` package we've installed previously. The registration takes place in the corresponding `NgModule`:

```typescript
import { NgModule, Injector } from '@angular/core';
...
import { GreeterComponent } from './greeter.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  ...
  declarations: [..., GreeterComponent],
  entryComponents: [GreeterComponent],
  ...
})
export class AppModule {
  constructor(injector: Injector) {
    const el = createCustomElement(GreeterComponent, { injector: injector });
    customElements.define('do-greet', el);
  }
}
```

Now that the element is registered, we can even dynamically insert it into our component using the native browser DOM API. Something like:

```typescript
const containerEl = document.getElementById('some-container');
containerEl.innerHTML = '<do-greet></do-greet>';
```

Note, this wouldn't work with a plain Angular Component. For dynamically instantiating those [we need to do some more work](/blog/2017/07/ng2-dynamic-tab-component/).

I made this Egghead lesson free for you, so you can watch the process by yourself:
{{<egghead-lesson uid="lessons/angular-transform-an-angular-component-into-a-native-custom-element" >}}

Here's also a running Stackblitz for you.

{{<stackblitz uid="github/juristr/egghead-intro-angular-elements/tree/01-custom-element-in-angular">}}

## Browser support and Polyfills?

Well...support is on the way, but we're not there yet: https://caniuse.com/#feat=custom-elementsv1. Some browsers need polyfills.

If you run your Angular Elements app after installing the `@angular/elements` package, you might get such an error message:

```
TypeError: Failed to construct 'HTMLElement': Please use the 'new' operator, this DOM object constructor cannot be called as a function.
```

There are a couple of things we need to install to get it running in all browsers. 

```
$ npm i @webcomponents/webcomponentsjs
```

Then open your `polyfills.ts` and at the very end of the file, add the following lines:

```typescript
// if you are compiling to ES5 (check tsconfig.json) then you need this
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';

// for browser not supporting custom elements
import '@webcomponents/custom-elements/custom-elements.min.js';
```

Also note, if you're targeting **IE11**, make sure to un-comment other imports in the `polyfills.ts` as well (such as `core-js` etc.)

## Conclusion

That should be it. If you wanna learn more [make sure to checkout my course](https://egghead.io/courses/getting-started-with-angular-elements) :pray: or hit me [on Twitter](https://twitter.com/juristr). 

I'm pretty sure Angular Elements are going to play a major role in the coming years, especially also after the new renderer Ivy lands (as it will come with smaller bundles). And it's not only about compiling Angular Components to be exported as standalone Custom Elements, but also for just having them dynamically load in your existing Angular app or for CMS based systems, where the server already returns pre-made HTML code, containing component tags which your Angular app needs to boot and interpret.