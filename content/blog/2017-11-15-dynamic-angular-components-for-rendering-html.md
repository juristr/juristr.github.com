---
title: Use Dynamic Components to render HTML for 3rd party libraries
lead: Leverage dynamic components to render HTML for a Leaflet popup message
categories:
  - Angular
date: 2017-11-15T01:00:00.000Z
comments: true
url: /blog/2017/11/dynamic-angular-components-for-rendering-html
type: post
image: /blog/assets/imgs/dyn-cmp-html/leaflet-marker.png
---

<div class="article-intro">
	Dynamic components in Angular are very powerful and help you solve the trickiest problems. In this example we're going to learn how we can leverage dynamic Angular components to render the HTML of a popup controlled by a Leaflet map. We'll go step by step and also learn about the things you need to watch for when instantiating components dynamically.
</div>

{{< postad >}}

{{<warn-notice message="Contents are based on Angular version >= 4.0.0" >}}
 

{{< toc >}}

## The Use Case

Yesterday I got a question from a former workshop attendee about how to solve a given issue in Angular. He uses a [Leaflet](http://leafletjs.com/) map in his component where he wants to display a series of markers, which, when clicked on them, open a popup window displaying some HTML.

<figure class="image--medium">
  <img src="/blog/assets/imgs/dyn-cmp-html/leaflet-marker.png" />
  <figcaption>Render marker popup HTML with Angular components</figcaption>
</figure>

Given the popup HTML could get arbitrarily complex, he clearly wanted to have an Angular component be responsible for rendering it and update the HTML accordingly whenever the data changes. Just as you would normally expect when dealing with Angular components.

Now it's important to know that the placing of the markers as well as the displaying of the HTML inside is delegated to the Leaflet API. This looks approximately like this:

```javascript
import { marker } from 'leaflet';

const marker = marker(latLngPosition);
const popupContent = `Hi, some <strong>HTML</strong> here`;

marker.bindPopup(popupContent).openPopup();

marker.addTo(map);
```

I'm not a Leaflet expert so there might be different approaches for achieving it, but you should get the idea. As you can see, the `popupContent` is some HTML string, which is **what should come from our Angular component**.  
The point is that since Leaflet handles the whole rendering of the HTML, it's not something Angular "knows" about and thus we cannot simply add a component into the HTML string and it'll work out of the box.

## Solution approaches

Now of course there are different approaches how to solve this. First you could simply take care of the HTML rendering in your JavaScript code, via some "intelligent" template strings. Whenever the data changes, you could get notified via some Observable subscribes and make sure you re-create the HTML and update the according marker on the map.

In this article however, our **purpose is to learn about dynamic components** and how we can delegate the whole HTML rendering and data binding to Angular. So let's see.

## Step 1: Create our dynamic component

First let's create the component which is responsible for rendering the data displayed inside the popup message. It's actually quite a simple component that gets it's data via an `@Input()`.

```javascript
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'html-marker',
  template: `
    <h3>{%raw%}{{ data.name }}%{%endraw%}</h3>
    <p>
      {%raw%}{{ data.description }}{%endraw%}
    </p>
  `
})
export class HTMLMarkerComponent {
  @Input() data;
}
```

## Step 2: Register the dynamic component

Dynamic components need to be registered in the `entryComponents` property of `NgModule`.

```javascript
import { NgModule } from '@angular/core';
...
import { HTMLMarkerComponent } from './html-marker.component';

@NgModule({
  ...
  entryComponents: [HTMLMarkerComponent],
  ...
})
export class AppModule { }
```

## Step 3: Dynamically instantiate our HTMLMarkerComponent

Once we have registered our component, we can start and instantiate it. If you want to learn more about dynamic components you should definitely also take a look at this article:

{{<article-link
    url="/blog/2017/07/ng2-dynamic-tab-component/"
    title="Create a dynamic tab component with Angular"
    text="Learn about advanced topics such as dynamic components, ComponentFactoryResolver, ViewContainerRef, ngTemplateOutlet and much more..."
    imageurl="/blog/assets/imgs/ng-dynamic-tabs/multi-tab-editing.png"
>}}

In our simple example, `AppComponent (app.component.ts)` is responsible for handling the interaction with Leaflet. The interesting part is the `addMarker()` function which is hooked to a button click event. Inside there I simulate the fetching of the data from some `DataService` which in a real world example would expose an observable of data to be displayed, fetched over HTTP.

For each entry to be displayed as a marker, I instantiate a new `HTMLMarkerComponent` by using the `ComponentFactoryResolver`.

```javascript
import { ComponentFactoryResolver, Injector } from '@angular/core';

import { HTMLMarkerComponent } from './html-marker.component.ts';

@Component({...})
export class AppComponent {

  constructor(private dataService: DataService, private resolver: CompnentFactoryResolver, private injector: Injector) {}

  addMarker() {
    for(const entry of this.dataService.getMarkers()) {
      const factory = this.resolver.resolveComponentFactory(HTMLMarkerComponent);
      const component = factory.create(this.injector);
      ...
    }
  }
}
```

As you can see, we use the `ComponentFactoryResolver` to create a factory instance which is capable of producing instances of `HTMLMarkerComponent`. Note that at the point when we **instantiate our component we need to pass in an Injector instance** which we get injected in the constructor of our `AppComponent`. This is important to give the dynamic component the possibility to inject its dependencies as well.

Then we need to pass in the data which the component has to render. In order for the component template to render properly, we need to **manually trigger change detection** on our component after we've given it the data.

```javascript
addMarker() {
  for(const entry of this.dataService.getMarkers()) {
    const factory = this.resolver.resolveComponentFactory(HTMLMarkerComponent);
    const component = factory.create(this.injector);
    
    component.instance.data = entry;
    component.changeDetectorRef.detectChanges();
  }
}
```

What we're still missing is to **create the actual marker**. We use the Leaflet API for that.

```javascript
addMarker() {
  for(const entry of this.dataService.getMarkers()) {
    ...
    component.instance.data = entry;
    component.changeDetectorRef.detectChanges();

    // create a new Leaflet marker at the given position
    const m = marker(entry.position);

    // associate the component element to the HTML part of the Popup
    const popupContent = component.location.nativeElement;

    // hook up the popup and add the marker to the map
    m.bindPopup(popupContent).openPopup();
    m.addTo(this.map);
  }
}
```

**Note** how we pass in the required HTML to the Leaflet popup using `component.location.nativeElement`.

Finally I'm adding a meta object to a local array to keep track of the markers and dynamic components we created. We'll need this in the next steps.

```javascript
addMarker() {
  for(const entry of this.dataService.getMarkers()) {
    ...
    const m = marker(entry.position);
    ...
    this.markers.push({
      name: entry.name,
      markerInstance: m,
      componentInstance: component
    });
  }
}
```

## Step 4: Hook up Change Detection

What happens if our data changes behind the scenes? Well, our component is **dynamically instantiated and outside of the control of Angular templates** but instead inside the part controlled and rendered by Leaflet. That's why we need to hook up change detection by ourselves. But no worries, it's pretty straightforward (at least a naive implementation of it).

All we need to do is to implement the `ngDoCheck()` lifecycle hook of our `AppComponent`. This lifecycle hook gets called whenever Angular dirty checks our component, so when change detection is performed.

So basically we iterate over the array of metadata objects we've saved previously (to track our markers and dynamic components) and invoke the change detection for each of our dynamic components.

```javascript
import { DoCheck, ComponentRef } from '@angular/core';
import { Marker } from 'leaflet';
import { HTMLMarkerComponent } from './html-marker.component';

interface MarkerMetaData {
  name: String;
  markerInstance: Marker;
  componentInstance: ComponentRef<HTMLMarkerComponent>
}

@Component({...})
export class AppComponent implements DoCheck {
  markers: MarkerMetaData[] = [];
  ...
  ngDoCheck() {
    this.markers.forEach(entry => {
      entry.componentInstance.changeDetectorRef.detectChanges();
    })
  }

}
```

You can see that happen if you click the "Mutate data" button in the example. 

**Note:** For performance reasons you should obviously be as cautious as possible when it comes to tricker a change detection cycle. In this simple example I just hooked up on the `ngDoCheck()` but you could alternatively also trigger it whenever new values come along from the `DataService`, or at least just trigger the CD cycle for those dynamic components which may be target of an update.

## Step 5: Make sure to clean up

Finally, a very important part whenever you create components dynamically by yourself is to **make sure you clean up everything** once the party is over. In the example I added a "remove" link button for each generated marker which invokes the `removeMarker(marker)` function inside our `AppComponent`.

There we clean up our meta data array, remove the marker from the map and most importantly invoke the `destroy()` function of our dynamic component.

```javascript
removeMarker(marker) {
  // remove it from the array meta objects
  const idx = this.markers.indexOf(marker);
  this.markers.splice(idx, 1);

  // remove the marker from the map
  marker.markerInstance.removeFrom(this.map);

  // destroy the component to avoid memory leaks
  marker.componentInstance.destroy();
}
```

Note, although I didn't implement it in this example, make sure to **implement the ngOnDestroy()** lifecycle hook of the `AppComponent` to perform a cleanup of all dynamic components there as well.

## Final Running Example

Here's the final running example to play around with. Have fun :smiley:

<iframe src="https://stackblitz.com/edit/angular-dyn-cmp-3rd-party?ctl=1&embed=1&file=app/app.component.ts" width="100%" height="400px"> </iframe>

## Conclusion & Considerations

Consider this is a very simple example to showcase how you can integrate a dynamic component with some external library such as Leaflet in this case.

Whenever you create dynamic components you should pay attention to

- **Performance:** what if we have hundreds of hundreds of markers on our map? You could find some other strategies, like only creating the component on the fly when the popup opens. Would perfectly work in our simple example, but not in others. What about change detection? Do we really need to run it on all of our dynamic components? Or can we limit it on the marker's content that changed?
- **Destroying & cleanup:** pay a lot of attention to this. Whenever you instantiate components dynamically yourself, you need to make sure you clean up everything in the end. Otherwise you could end up with some nasty memory leaks
- **Choose the right approach:** initially I mentioned that you could perfectly render the HTML by yourself inside your JavaScript code (with some lightweight templating engine if needed) without having to delegate it to Angular components. Also consider such approaches as well.

If this was useful, also check out my other article on dynamic components:

{{<article-link
    url="/blog/2017/07/ng2-dynamic-tab-component/"
    title="Create a dynamic tab component with Angular"
    text="Learn about advanced topics such as dynamic components, ComponentFactoryResolver, ViewContainerRef, ngTemplateOutlet and much more..."
    imageurl="/blog/assets/imgs/ng-dynamic-tabs/multi-tab-editing.png"
>}}
