---
title: 'Angular: How do I register an event listener on document?'
lead: Learn how to attach an event listener on the document object
categories:
  - JavaScript
  - Angular
reposts:
  - 'https://dzone.com/articles/how-to-register-an-event-listener-on-a-document'
date: 2016-09-20T00:00:00.000Z
comments: true
url: /blog/2016/09/ng2-event-registration-document
type: post
image: /blog/assets/imgs/ng2-register-event-cardimg.png
---

<div class="article-intro">
	I recently got asked by an Angular community member on Twitter how one can register an event on the <code>document</code> object. While it is totally possible to directly access the <code>document</code> object and hook up some listener, it is not suggested. There are better ways in Angular, see yourself.
</div>

{{< postad >}}

{{<warn-notice message="$1" >}}
 

So, naively you could start and write something like this:

```javascript
@Component({..})
export class MyComponent {
  constructor() {
     document.addEventListener('keyup', function() {
        console.log('keys pressed');
     });
  }
}
```

This definitely works. However **it is considered bad practice to access elements outside the component directly** such as in this case the global `document` object.

So there are two possibilities.

## Using the component's host property

You can use the component's host property as follows:

```javascript
import {KeyboardEvent} from '@angular/core';

@Component({
  ...
  host: {
    '(document:keyup)': 'onKeyUp($event)'
  }
})
export class MyComponent {
  onKeyUp(ev:KeyboardEvent) {
    // do something meaningful with it
    console.log(`The user just pressed ${ev.key}!`);
  }
}
```

## Using the @HostListener decorator

Alternatively - personally my preferred way of doing it - is to use the `@HostListener` decorator:

```javascript
import {HostListener, KeyboardEvent} from '@angular/core';

@Component({...})
export class MyComponent {
	
  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev:KeyboardEvent) {
    // do something meaningful with it
    console.log(`The user just pressed ${ev.key}!`);
  }
}
```

## Try it yourself

Note, that **both of these methods work for the `window` object** as well :+1:.

Here's a Plunker to play around with: [https://plnkr.co/edit/n20EtGiB9trW0M5EkIfH?p=preview](https://plnkr.co/edit/n20EtGiB9trW0M5EkIfH?p=preview)

{{<plunker plunker_url="https://embed.plnkr.co/n20EtGiB9trW0M5EkIfH/">}}
 

Hope this was helpful :smiley:!
