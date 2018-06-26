---
layout: post_new
title: "In-depth: How do CDK Portals work?"
lead: "Learn how to implement your own CDK portal for dynamically placing content in Angular apps"
postimg: "/blog/assets/imgs/portal.jpeg"
tags: [ "Angular" ]
---

<div class="article-intro">
	<a href="/blog/2018/05/dynamic-UI-with-cdk-portals/">In the last article</a> we were exploring how to <a href="https://material.angular.io/cdk/portal/overview">leverage the Angular Material CDK portals</a> for placing some piece of template from a component to some other location within our app. CDK portals make this a no-brainer. Wondering how they work? In this article we dive deeper to uncover how its internals work and how we could simply implement it by ourselves.<br />
</div>

<figure class="image--full">
    <a href="/blog/assets/imgs/portal.jpeg" class="image--zoom">
        <img src="/blog/assets/imgs/portal.jpeg">
    </a>
    <figcaption>Source: https://unsplash.com/photos/0a5VbkqqFFE</figcaption>
</figure>

{% include postads %}

{% assign message = "Contents are based on Angular version >= 5.0.0" %} {%
include warn-notice.html %}

{% include toc.html %}

## Quick recap on CDK Portals

As shown in the previous article, we need two parts to render a template into a DOM element: the portal host and portal. In this article we’re going to look into what the portal host and portal actually do and how we can emulate their implementation.

```javascript
// Create a portalHost from a DOM element
this.portalHost = new DomPortalHost(
  document.querySelector('#page-actions-container'),
  ...
);

// create a template portal that takes the reference to
// our ng-template
this.portal = new TemplatePortal(
  this.pageActionsTmplRef,
  this.viewContainerRef
);

// Attach portal to host
this.portalHost.attach(this.portal);
```

So the `#page-actions-container` that we’re passing to our `DomPortalHost` is the DOM element on our page to which we want to render our content. The next step is to grab the actual content, basically an `<ng-template #pageActions>`  which we can get a reference to using Angular’s `@ViewChild('pageActions')` and store it in the `pageActionsTmplRef` variable.
Once we have that, we can define our TemplatePortal, passing it our reference to the template as well as a reference to the viewContainer, which we simply inject using Angular’s DI.
Finally, we need to attach our “portal” to our “portal host” to render the content on the page.

## Creating our own TemplatePortal

Let’s start with the `TemplatePortal`. First of all we need to define the view, which in Angular we do in the component’s template:

```javascript
@Component({
    ...
    template: `
      <ng-template #pageActions>
        <button type="button" ...>
          <mat-icon>add</mat-icon>
        </button>
      </ng-template>
    `
})
export class PageActionsComponent {...}
```

`<ng-template>` won’t be rendered by Angular but serves rather as a means to define a view that we can reference. As you can see I applied a so-called “page variable” which can be accessed from within our `PageActionsComponent` using the `ViewChild`:

```javascript
@Component({...})
export class PageActionsComponent implements AfterViewInit {
    @ViewChild('pageActions') portalActionsTmplRef;
    
    ngAfterViewInit() {
      // access the portalActionsTmplRef here
    }
}
```

The `ViewChild` will be accessible in the [ngAfterViewInit lifecycle hook](https://angular.io/guide/lifecycle-hooks#afterview). Having a reference to our ng-template, we now need to create a so-called [EmbeddedViewRef](https://angular.io/api/core/EmbeddedViewRef). An `EmbeddedViewRef` is a grouping of DOM elements which we can then be passed along to the container (our portal host) where they should ultimately be rendered. To create it, we need to use the `createEmbeddedView(..)` function of the [ViewContainerRef](https://angular.io/api/core/ViewContainerRef). The latter can just be injected using Angular’s DI:

```javascript
@Component({...})
export class PageActionsComponent implements AfterViewInit {
    @ViewChild('pageActions') portalActionsTmplRef;
    
    constructor(private viewContainerRef: ViewContainerRef) {}
    
    ngAfterViewInit() {
      const viewRef = viewContainer.createEmbeddedView(this.portalActionsTmplRef);
      viewRef.detectChanges();
    }
}
```

We directly pass it our reference to the `ng-template` into the `createEmbeddedView(..)` function. Moreover we execute change detection on our in-memory view. 


> Note that the `createEmbeddedView(..)`  takes an optional 2nd parameter, a context object which can be used to pass data to our view being rendered. 

The `viewRef` variable now contains an in-memory rendered view, allowing us to pass it along to a “Portal host” which is responsible for placing it onto the DOM.

## Creating our own PortalHost

The portal host is nothing too complicated either, but rather just a wrapper around a DOM element serving us as the placeholder where to render our content. As such, it needs to manage

- the location where to render the view, in the form of a DOM `Element`.
- the template to render, in the form of a `TemplateRef`

Implementing our own `PortalHost` is relatively easy. To **grab an instance of a DOM element**, we can use the native DOM API:

```javascript
const outletElement = document.querySelector('#page-actions-container');
```

This gives us the DOM element which we can then use to append our view.

We will **get the view to be rendered** from our implementation of the `TemplatePortal` we’ve seen before, in the form of an `EmbeddedViewRef`.  The `EmbeddedViewRef` consists of one or more “nodes”. Take for instance the following view:

```html
<ng-template>
  <span>Hi</span>
  <button>Click me</button>
</ng-template>
```

In this case our view consists of a `<span>` element as well as a `<button>`, all of which have to be attached to the target DOM element (in our case `outletElement`).

Luckily the `EmbeddedViewRef`, has a property `rootNodes` which is an array of all the DOM elements it embraces. Thus, we can iterate over that array, and leverage the `appendChild(…)` function on our `outletElement` to insert the various nodes into the DOM:

```javascript
// viewRef is the variable containing our instance of
// the EmbeddedViewRef
viewRef.rootNodes.forEach(rootNode => outletElement.appendChild(rootNode));
```

## How is Angular able to run Change Detection on the embedded view?

If you payed attention, then you've seen that we're creating the `EmbeddedViewRef` using an instance of the `ViewContainerRef` that we get via Angular's dependency injection from the `PageActionsComponent`. That view container is actually part of the `PageActionsComponent` and as a result, also our embedded view. 

It just happens, that in our case the nodes of the `EmbeddedViewRef` are rendered somewhere else on the page, namely inside our `outletElement`. Still, whenever Angular runs CD on our `PageActionsComponent`, it will execute it as well on our embedded view ref.

{% include article-link.html
    url="https://blog.angularindepth.com/working-with-dom-in-angular-unexpected-consequences-and-optimization-techniques-682ac09f6866"
    title="Working with DOM in Angular: unexpected consequences and optimization techniques"
    text="Deep dive into working with DOM in Angular and learn about the difference between embedded views and host views"
    imageurl="https://cdn-images-1.medium.com/max/1600/1*vinkw-iFnRaDmoh69S530A.png"
%}

## Putting all together and attach it to the DOM

We have now all the pieces together, the functionality of the `TemplatePortal` as well as the `PortalHost`. If we put all of them together in our `ngAfterViewInit(..)` it could look as simple as this:

```javascript
ngAfterViewInit(): void {
  // render the View
  const viewRef = this.viewContainerRef.createEmbeddedView(this.portalActionsTmplRef);
  viewRef.detectChanges();

  // grab the DOM element
  const outletElement = document.querySelector('#page-actions-container');
  
  // attach the view to the DOM element that matches our selector
  viewRef.rootNodes.forEach(rootNode => outletElement.appendChild(rootNode));
  ...
}
```

## Cleaning up

Clearly, we should also take care of removing again the elements from the DOM, whenever the parent component gets destroyed. To remove an attached view, the `remove(index)` function of the `ViewContainer` an be used.

```javascript
ngOnDestroy() {
  // get the index of where our view resides inside the
  // ViewContainer
  const index = this.viewContainer.indexOf(this.viewRef);
  if (index !== -1) {
    this.viewContainer.remove(index);
  }
}
```

## Demo

Wrapping up, I changed the adapted [the implementation from the previous article using CDKPortals](/blog/2018/05/dynamic-UI-with-cdk-portals/) to rather use our own implementation of portals. You can find the entire source code on Stackblitz.

_Hint: open the `src/app/shared/page-actions/page-actions.component.ts` file._

{% assign uid = "github/juristr/demo-cdk-portal-mobile-pageactions/tree/self-made-portals" %}
{% include stackblitz.html %}

### Related Articles

{% include article-link.html
    url="/blog/2017/11/dynamic-angular-components-for-rendering-html/"
    title="Use Dynamic Components to render HTML for 3rd party libraries"
    text="Leverage dynamic components to render HTML for a Leaflet popup message"
%}

{% include article-link.html
    url="/blog/2017/07/ng2-dynamic-tab-component/"
    title="Create a dynamic tab component with Angular"
    text="Learn about advanced topics such as dynamic components, ComponentFactoryResolver, ViewContainerRef, ngTemplateOutlet and much more..."
%}



