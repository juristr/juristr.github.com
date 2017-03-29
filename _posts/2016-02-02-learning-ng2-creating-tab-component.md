---
layout: post_new
title: "Learning Angular: Creating a tabs component"
lead: "A follow up on thoughtram's excellent article on creating a tabs components with Angular"
category: angular2
postimg: "/blog/assets/imgs/ng2-tabs.png"
tags: [ "JavaScript", "Angular" ]
---

<div class="article-intro">
	This is a follow-up article of <a href="http://blog.thoughtram.io/angular/2015/04/09/developing-a-tabs-component-in-angular-2.html" target="blank">thoughtram's excellent article on developing a tabs component with Angular</a>, where we're going to explore an alternative way of creating a tab component by learning about <code>@ContentChildren</code> and <code>AfterContentInit</code>.
</div>

{% include postads %}

{% assign message = "Contents are based on Angular version 2+." %}
{% include warn-notice.html %}

{% include toc.html %}

That said, definitely read [thoughtram's article on how to develop a tabs component in Angular](http://blog.thoughtram.io/angular/2015/04/09/developing-a-tabs-component-in-angular-2.html) first. Then come back and continue here :smiley:.

Ok, to recap, the API of the tabs component looks as follows:

```html
<tabs>
  <tab tabTitle="Tab 1">Tab 1 Content</tab>
  <tab tabTitle="Tab 2">Tab 2 Content</tab>
</tabs>
```

Whenever a user clicks on the tab header, the `<tabs>` component takes care of setting that specific tab to be visible and to hide all others. That's why we need to establish a communication between the parent `<tabs>` and its children `<tab>`.

For establishing a communication between the two components, the thoughtram article uses Angular's powerful **dependency injection** which allows us to simply ask for an instance of a parent component. In the `<tab>` child component it simply asked for its parent `<tabs>` and registered itself on that parent component, using the `addTab` function:

```javascript
class Tab {
  constructor(tabs: Tabs) {
    tabs.addTab(this)
  }
}
```

This is one way of doing it. In fact, as Pascal says:

> Angular is so awesome that there is not just one way how to do things!
> 
We can take a totally different approach how to implement our simple tabs ( which isn’t so easily possible in Angular 1 ), leveraging special Angular @ContentChildren property decorator with QueryList type and AfterContentInit life cycle interface. Those are more advanced concepts, which we will cover in future articles.

## The alternative approach

This article is just about continuing thoughtram's example, but without using the dependency injection approach. So basically, rather than getting a reference to our parent component `Tabs` in the child component `Tab` (`child => parent`), we're doing it the other way round: we'll get a reference to all of the `Tab` child components from the parent `Tabs` (`parent => child`).

If you open the Tabs component, you can see that the child `<tab>` components are projected into it's template via the [content projection](http://juristr.com/blog/2016/01/ng2-multi-content-projection) mechanism using `<ng-content>`.

```javascript
...
@Component({
  selector: 'tabs',
  template:`
    <ul class="nav nav-tabs">
      <li *ngFor="#tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a href="#">{{tab.title}}</a>
      </li>
    </ul>
    <ng-content></ng-content>
  `
})
export class Tabs {
    ...
}
```

What we want, is to get a reference to all of the `<tab>` children that get projected into that section, so that we can act on their corresponding API (i.e. hiding/showing them).

## `@ContentChildren` and `QueryList`

We can do exactly this using the `@ContentChildren` decorator. You have to pass the decorator the type you want to get a reference to. In our example it would look like `@ContentChildren(Tab)`. As a result we will get a list of instances in the form of a `QueryList<Tab>`.

> [Minko Gechev](https://twitter.com/mgechev) posted an awesome article explaining the [**difference between @ContentChildren and @ViewChildren** on his blog](http://blog.mgechev.com/2016/01/23/angular2-viewchildren-contentchildren-difference-viewproviders/). So I'm not going to replicate that here, simply check that article! :smiley:

A `QueryList<T>` is simply "an unmodifiable list of items that Angular keeps up to date when the state of the application changes" (see [docs](https://angular.io/docs/ts/latest/api/core/QueryList-class.html)).

Hence, as a first step, we're going to import the new constructs in our Tabs component.

```javascript
import { ContentChildren, QueryList } from '@angular/core';
```

Then, inside our class we can use it like

```javascript
import { Tab } from './tab';
...
export class Tabs {
  @ContentChildren(Tab) tabs: QueryList<Tab>;
}
```

## `ngAfterContentInit` lifecycle hook

To access the list of `Tab` instances, we need to wait for them to be projected into our `Tabs` component. There's a dedicated component lifecycle hook for that: `ngAfterContentInit`. This hook is called after the component content is initialized (more [on the official docs](https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html)).

```javascript
import { AfterContentInit } from '@angular/core';

@Component({
  selector: 'tabs',
  ...
})
export class Tabs implements AfterContentInit {
  
  @ContentChildren(Tab) tabs: QueryList<Tab>;
  
  // contentChildren are set
  ngAfterContentInit() {
    ...
  }

  ...
}
```

Also note the `AfterContentInit` interface we're importing. This is really just for better type checking with TypeScript. It doesn't have any other effect, as TypeScript interfaces do not alter the transpiled JavaScript code, they disappear once you transpile.

Within the `ngAfterContentInit` function we can now fetch all of our tabs and activate the first one if none is already set to be the active one.

```javascript
// contentChildren are set
ngAfterContentInit() {
  // get all active tabs
  let activeTabs = this.tabs.filter((tab)=>tab.active);
  
  // if there is no active tab set, activate the first
  if(activeTabs.length === 0) {
    this.selectTab(this.tabs.first);
  }
}
```

Similarly, whenever someone clicks on a tab header, we call the `selectTab(tab: Tab)` function which gets all of the tabs and deactivates all of them to finally set the clicked tab to active and thus visible.

```javascript
selectTab(tab: Tab){
  // deactivate all tabs
  this.tabs.toArray().forEach(tab => tab.active = false);
  
  // activate the tab the user has clicked on.
  tab.active = true;
}
```

## The final solution

That's it :+1:. You did it! Here's the full code to play with:

{% assign plunker_url = "https://embed.plnkr.co/afhLA8wHw9LRnzwwTT3M/" %}
{% include plunker.html %}
