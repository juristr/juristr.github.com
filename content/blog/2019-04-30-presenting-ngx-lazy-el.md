---
type: post
title: "Lazy Loading Components with Angular Elements"
lead: Learn to lazy load Angular Components with Angular Elements and ngx-lazy-el
date: 2019-04-30T20:42:58+02:00
comments: true
url: /blog/2019/05/lazy-loading-with-elements
# image: /blog/assets/imgs/rx-to-promise-journey/rxjourney-bg.jpg
# categories:
#   - Angular
# tags:
#   - rxjs
#   - angular
draft: true
---

{{<intro>}}
  
{{</intro>}}
<!--more-->

{{< postad >}}


## Installation and Setup

```
$ ng add @angular/elements
$ npm i @webcomponents/custom-elements
$ npm i @juristr/ngx-lazy-el
```

Add following to `polyfills.ts`:

```typescript
// ...
/***************************************************************************************************
 * APPLICATION IMPORTS
 */
import '@webcomponents/custom-elements/src/native-shim.js';
import '@webcomponents/custom-elements/custom-elements.min.js';
```

## Configure our Lazy Component

Create your lazy module, i.e. `GreeterModule`

```
$ ng g m greeter
$ ng g c greeter/greeter
```

Configure the lazy element

```typescript
import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GreeterComponent } from './greeter/greeter.component';

@NgModule({
  declarations: [GreeterComponent],
  imports: [CommonModule]
})
export class GreeterModule {
  customElementComponent: Type<any> = GreeterComponent;
}
```

Now - similar as you would configure lazy routes - we need to configure our lazy element in the `AppModule`:

```typescript
// app.module.ts
//...
import { NgxLazyElModule, fakeMatcher } from '@juristr/ngx-lazy-el';

const lazyConfig = [
  {
    selector: 'app-greeter',
    matcher: fakeMatcher,
    loadChildren: './greeter/greeter.module#GreeterModule'
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxLazyElModule.forRoot(lazyConfig)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

```

Should now see a separate lazy module being created:

{{<figure url="/blog/assets/imgs/lazy-element-dedicated-module.png" size="full" >}}

## Lazy Loading on steroids with ngx-lazy-el & Angular Elements

```html
<!--The content below is only a placeholder and can be replaced.-->
<h1>Lazy Elements</h1>
<button (click)="activateLazySection = true">Activate lazy section</button>
<hr />
<div *ngIf="activateLazySection" ngx-lazy-el>
  <app-greeter></app-greeter>
</div>

```

Need to register `CUSTOM_ELEMENTS_SCHEMA`:

```typescript
// app.module.ts
@NgModule({
  // ...
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
```

## Loading Multiple Components Lazily

## Passing parameters

### Simple Parameters

### Complex input params with Angular Elements


## Under the hood: Implementation Details


### Using a fake matcher

```
main.ts:14 Error: Invalid configuration of route '': routes must have either a path or a matcher specified
    at validateNode (router.js:610)
    at validateConfig (router.js:577)
    at Router.push.../../node_modules/@angular/router/fesm5/router.js.Router.resetConfig (router.js:4108)
    at new Router (router.js:3784)
    at setupRouter (router.js:5567)
    at _callFactory (core.js:21292)
    at _createProviderInstance (core.js:21238)
    at initNgModule (core.js:21168)
    at new NgModuleRef_ (core.js:21895)
    at createNgModuleRef (core.js:21884)
```


