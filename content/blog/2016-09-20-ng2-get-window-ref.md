---
title: 'Angular: How do I get a reference to the window object?'
lead: Learn how to inject the window object into your Angular components
categories:
  - JavaScript
  - Angular
reposts:
  - >-
    https://dzone.com/articles/angular-2-how-do-i-get-a-reference-to-the-window-o
date: 2016-09-20T00:00:00.000Z
comments: true
url: /blog/2016/09/ng2-get-window-ref
type: post
image: /blog/assets/imgs/ng2-window-obj-cardimage.png
---

<div class="article-intro">
	Remember the <code>$window</code> object in Angular 1? Turned out to be quite useful from now and then. But what about Angular? <code>$window</code> doesn't exist there. What's the alternative? How can I inject the <code>Window</code> object into my Angular components?
</div>

{{< postad >}}

{% assign message = "Contents are based on Angular version >=2" %}
{% include warn-notice.html %}

Referencing global browser objects like `document` or `window` directly from within your code is possible, but not encouraged and considered bad practice. 

{{< toc >}}

---

You want to register only events on `window` or `document`? Then  you may want to read this also:

{{<article-link
  url="/blog/2016/09/ng2-event-registration-document/"
  title="Angular: How do I register an event listener on document?"
  text="Learn about @HostListener and host binding properties to register event listeners on the document object"
>}}

---

Especially Angular isn't only designed to run within your browser, but also on mobiles, the server or web workers where objects like `window` may not be available.  
Therefore the suggested approach is to **wrap such objects and inject them through the dependency injection mechanism**. This way it is possible to change the concrete runtime instance of a given object based on the environment the Angular application is running. **The result we wanna achieve** is the following:

```javascript
...
import { WindowRef } from './WindowRef';

@Component({...})
class MyComponent {

    constructor(private winRef: WindowRef) {
        // getting the native window obj
        console.log('Native window obj', winRef.nativeWindow);
    }

}

```

So let's see.

## Wrapping `window`

A very straightforward and easy way to wrap `window` is by creating an Angular service. That's as easy as creating an ES6 class and decorating it with `@Injectable`.

```javascript
import { Injectable } from '@angular/core';

function _window() : any {
   // return the global native browser window object
   return window;
}

@Injectable()
export class WindowRef {
   get nativeWindow() : any {
      return _window();
   }
}
```


## Register `WindowRef` as provider

Great, so far we've wrapped our `window` object. We aren't ready yet, however. We first need to register our injectable service. This is done by registering it on the `NgModule`'s `providers` array or directly on the component, based on the scope of our provider. Check out [the official docs on providers for more details](https://angular.io/docs/ts/latest/guide/dependency-injection.html).

```javascript
import { WindowRef } from './WindowRef';

...

@NgModule({
    ...
    providers: [ WindowRef ]
})
export class AppModule{}
```

## Try it yourself

Great, we're ready. You can now inject the `WindowRef` into your Angular components and get access to the native `window` object.

Here's a Plunker to play around with: [https://plnkr.co/edit/9qmBCVrmBZj3mPQjM0Zc?p=preview](https://plnkr.co/edit/9qmBCVrmBZj3mPQjM0Zc?p=preview)

{{<plunker plunker_url="https://embed.plnkr.co/9qmBCVrmBZj3mPQjM0Zc/">}}
 

You want to register only events on `window` or `document`? Then  you may want to read this also:

{{<article-link
  url="/blog/2016/09/ng2-event-registration-document/"
  title="Angular: How do I register an event listener on document?"
  text="Learn about @HostListener and host binding properties to register event listeners on the document object"
>}}
