---
layout: post_new
title: "Create and Publish Angular Libs like a PRO"
lead: "Learn about the Angular Package Format and FESM"
postimg: "/blog/assets/imgs/dyn-cmp-html/leaflet-marker.png"
tags: [ "Angular" ]
---

<div class="article-intro">
	- lots of libs
    - good for ecosystem
    - reuse (within enterprises,...)
    - healthy
</div>

{% include postads %}

{% assign message = "Contents are based on Angular version >= 2.0.0" %} {%
include warn-notice.html %}

{% include toc.html %}

## Current Situation & Tools

* need to support multiple tools (Webpack, SystemJS,..UMD)

## Project setup

* TypeScript
* VSCode
* npm / yarn
* rollup
* ...

## Compilation steps

* Angular Package format describes it: https://goo.gl/4wRtRG

{% include article-link.html url="/blog/2017/07/ng2-dynamic-tab-component/"
title="Angular Package Format (v5)" text="Guidelines and best practices for
packaging Angular libraries" %}

### Step 1: Compile to ESM2015

### Step 2: Compile to FESM2015

### Step 3: Compile to ESM5

### Step 4: Compile to FESM5

### Step 5: Compile to UMD

## Primary and Secondary Entry Points

* Why is the need for this (testing libraries -> Angular material)
* Don't create sink modules

## You don't have to do it by hand

* yeoman
* ng-packagr

## Automating Semantic Versioning and Distribution

* semantic release

{% include article-link.html url="/blog/2017/07/ng2-dynamic-tab-component/"
title="Create a dynamic tab component with Angular" text="Learn about advanced
topics such as dynamic components, ComponentFactoryResolver, ViewContainerRef,
ngTemplateOutlet and much more..."
imageurl="/blog/assets/imgs/ng-dynamic-tabs/multi-tab-editing.png" %}

## Considerations

*

---

{% include article-link.html url="/blog/2017/07/ng2-dynamic-tab-component/"
title="Create a dynamic tab component with Angular" text="Learn about advanced
topics such as dynamic components, ComponentFactoryResolver, ViewContainerRef,
ngTemplateOutlet and much more..."
imageurl="/blog/assets/imgs/ng-dynamic-tabs/multi-tab-editing.png" %}
