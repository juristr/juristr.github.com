---
layout: post_new
title: "Angular 2 Principles and Design Guidelines"
lead: "Notepad and reminder for some best practices"
show_img_in_detail: true
coverimage: false
category:
tags: [ "Angular", "Angular.js" ]
---

<p class="article-intro">
    Here are some principles and design guidelines I've been collecting.
</p>

{% include postads %}


## Data enters through component attributes

When you have a component definition like this

```html
<my-component></my-component>
```

..then it is either displaying some static content, or something is wrong with it. Usually in such situation, behind the scenes there's some shared service that provides the data.

It's much better to have...

```html
<my-component people="remotePeople"></my-component>
```

...
