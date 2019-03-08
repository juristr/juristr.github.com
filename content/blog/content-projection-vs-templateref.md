---
type: post
title: "Content Projection vs Templateref"
lead: >-
  Write some cool lead here
date: 2019-01-06T16:01:21+01:00
comments: true
# url: /blog/2018/10/journey-promises-to-rxjs
# image: /blog/assets/imgs/rx-to-promise-journey/rxjourney-bg.jpg
categories:
  - Angular
# tags:
#   - rxjs
#   - angular
draft: true
---

<div class="article-intro">
  The main distinction to make here is between <strong>"content projection" and having "dynamic templates and/or components"</strong>. In both scenarios you want other users of your component to allow "extending" it from "outside", basically you're able to pass in other components into the host component. Alright, but when do I need "content projection" vs. "ngTemplateOutlet"?
</div>

{{< postad >}}

{{< warn-notice message = "Contents are based on Angular version >= 6.0.0" >}}

{{<toc>}}

A lot of people get confused about the various options we have in Angular, such as [@dodgymigrant](https://twitter.com/dodgymigrant). Let's shed some light on it.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">What I don&#39;t understand is why there are CDK Portals, ngTemplateOutlet, ngComponentOutlet, and ngContent, all to do very similar things. And then for ngTemplateOutlet you&#39;ve got ContentChildren and QueryList. It&#39;s too much.</p>&mdash; Migrant (@dodgymigrant) <a href="https://twitter.com/dodgymigrant/status/1030842617196621826?ref_src=twsrc%5Etfw">August 18, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Content projection

Probably the simplest example of content project is the implementation of a collapsible panel.

```typescript
@Component({
  selector: 'collapsible-panel',
  template: `
  <div class="panel">
    <div class="panel-heading" (click)="visible = !visible">
      <h3 class="panel-title">Panel title</h3>
    </div>
    <div class="panel-body" *ngIf="visible">
      <ng-content></ng-content>
    </div>
  </div>
  `
})
export class CollapsiblePanelComponent {
  visible: false;
}
```

As you can see, the `ng-content` here defines the placeholder where other components can be "injected" from the outside of the collapsible panel. For instance:

```html
<collapsible-panel>
	Hi there!
</collapsible-panel>
```

But of course you cannot just pass in text (such as `Hi there!`) in this example. You can also place entire components which will then be rendered inside the collapsible panel component, which ends up being a wrapper around them, providing the expand/collapse functionality.

Here's a more advanced example, also using multi-slot content projection.

{{<stackblitz uid="edit/angular-contentprojection-collapsiblepanel">}}

{{<article-link url="/blog/2016/01/ng2-multi-content-projection/" title="Multi Content Projection aka Multiple Transclusion">}}

{{<article-link url="/blog/2016/02/learning-ng2-creating-tab-component/" title="Learning Angular: Creating a tabs component">}}


## Dynamic Components with ngTemplateOutlet

Now there's also [ngTemplateOutlet](https://angular.io/api/common/NgTemplateOutlet) and [ngComponentOutlet](https://angular.io/api/common/NgComponentOutlet). Could we achieve the same? Sure!

We could create the same "collapsible panel" component, but rather than using content projection, use an `<ng-template>`, grab a reference to it and pass it as `@Input` to our Collapsible Panel component which could then render it using an `ngTemplateOutlet` directive.

So the implementation of our Collapsible Panel component would change as follows:

```typescript
@Component({
  selector: 'collapsible-panel',
  template: `
  <div class="panel">
    <div class="panel-heading" (click)="visible = !visible">
      <h3 class="panel-title">
        <ng-container *ngIf="headerTemplate"
        [ngTemplateOutlet]="headerTemplate">
      </ng-container>
      </h3>
    </div>
    <div class="panel-body" *ngIf="visible">
      <ng-container *ngIf="contentTemplate"
        [ngTemplateOutlet]="contentTemplate">
      </ng-container>
    </div>
  </div>
  `
})
export class CollapsiblePanelComponent {
  visible: false;

  @Input() headerTemplate: TemplateRef<any>;
  @Input() contentTemplate: TemplateRef<any>;
}
```

And in order to use it, we use `<ng-template>`:


```html
<collapsible-panel [headerTemplate]="headerTemplate" [contentTemplate]="contentTemplate">
</collapsible-panel>

<ng-template #headerTemplate>
  <span class="title">Click me!</span>
</ng-template>

<ng-template #contentTemplate>
  Hi there!
</ng-template>
```

And here's a runnable Stackblitz.

{{<stackblitz uid="edit/angular-ngtemplateoutlet-collapsiblepanel">}}

As you can see, the API is not that nice and elegant compared to the content projection approach. That's simply because the collapsible panel fits better with it. `ng-template` and `ngTemplateOutlet` are more suited for scenarios where you need to take a template and visualize it in dynamic ways.

{{<article-link url="/blog/2017/07/ng2-dynamic-tab-component/" title="Create a dynamic tab component with Angular">}}


## Portals

