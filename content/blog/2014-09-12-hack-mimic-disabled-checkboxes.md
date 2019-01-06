---
title: 'Hack: How to mimic a disabled checkbox'
lead: >-
  Use JavaScript to simulate a disabled checkbox which also gets sent back
  during the form submit
show_img_in_detail: true
coverimage: false
category: null
categories:
  - ASP.net
  - JavaScript
date: 2014-09-12T00:00:00.000Z
comments: true
url: /blog/2014/09/hack-mimic-disabled-checkboxes
type: post
---

The world is not always as we want it to be :). So from now and then you have to place a nice hack here and there. Years ago [I've already written about a similar issue](/blog/2008/09/revised-changed-values-of-readonly-and/) with input fields.

Today I got a flashback to my good old ASP.net WebForms days. A colleague of mine had an issue in that he applied various JavaScript "scripts" to bring some life into his WebForms page. One of those dynamic JS parts included some disabling/enabling of checkboxes based on the values set by the user. The issue: HTML forms won't include disabled fields into the POST body and as such, you cannot process them properly on the server-side.

Doing something like the following..

```javascript
<input type="checkbox" onclick="return false">
```

..won't work. Existing jQuery listeners still fire. What you have to do instead is:

**when disabling:**

- temporarily store all existing handlers registered on the element
- remove all of them once you have them safely stored somewhere
- register a click and keydown handler which catches the events and prevents them from being propagating upwards
- add some CSS style s.t. the element looks like being disabled

**when enabling:**

- remove your click/keydown handler which prevents any interaction with the element
- restore all events on the element which you saved before
- remove the "disabled" style

The full code is in this jsFiddle. Enjoy :)

<iframe width="100%" height="300" src="http://jsfiddle.net/juristr/uqq3o00k/10/embedded/" allowfullscreen="allowfullscreen" frameborder="0"> </iframe>

