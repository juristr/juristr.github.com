---
layout: post_new
title: "Binding Data in Angular"
lead: "Learn how to properly bind data to input fields"
postimg: "/blog/assets/imgs/ngIf-else-article.png"
tags: [ "Angular"]
---

<div class="article-intro">
	...
</div>

{% include postads %}

{% assign message = "Contents are based on Angular version >=2" %}
{% include warn-notice.html %}

{% include toc.html %}

## ngModel

```html
  <input
    [ngModel]="person.name"
    (ngModelChange)="onPersonNameUpdated($event)">
```

---

{% assign plunker_url = "https://embed.plnkr.co/yzvKoDHujvZLMUaveYFZ/" %}
{% include plunker.html %}
