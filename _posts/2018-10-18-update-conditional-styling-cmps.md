---
layout: articles-post
title: "Update: Learning Angular: Conditionally add styles to an element"
type: update-notice
target-url: /blog/2016/01/learning-ng2-dynamic-styles/#add-a-class-to-my-component-host
---

When you create a custom Angular component you may often have the necessity to not only style things (divs, ...) within your component template but also to add it to the "component host" itself. Say we have the following component

```html
<my-custom-component></my-custom-component>
```

In order to be able to properly style it, we want it to have a class attached to it. Of course we could just add a `class` attribute, but we want it to happen automatically. As we have already seen in the section before, we can leverage the `@HostBinding` decorator, but this time we don't need any kind of condition. Rather we can write it as:

```javascript
@Component({
   selector: 'my-custom-component',
   ...
})
export class MyCustomComponent {
    @HostBinding('class') hostClass = 'some-class';
}
```
