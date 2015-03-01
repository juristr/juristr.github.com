---
layout: post
title: "Learning Angular: Resolve language settings before routes"
lead: "How to make sure your language is properly loaded before any UI is rendered."
show_img_in_detail: true
coverimage: false
category:
tags: ["JavaScript", "Angular.js", "angular-directives", "learning-ng"]
---



{% include ng-series.html %}

## Problem

In my application I set the user's language based on his personal preferences. Meaning I have a backend api `/api/v1/users/current` that returns the information about the current user:

```json
{
  "username": "juristr",
  ...
  "language": "de"
}
```

I use **[angular-translate](http://angular-translate.github.io/) for i18n** stuff in my Angular application. To set the language, simply use the `$translate.use(..)` function. This will automatically refresh any translations that are bound on the UI

```html
{{ "message" | translate }}
```

## Solution



<iframe src="http://embed.plnkr.co/pb8qO3J604QNri0Wf7uz/preview" width="100%" height="400px"> </iframe>
