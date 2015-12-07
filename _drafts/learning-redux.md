---
layout: post_new
title: "Learning Redux"
lead: "Notes from watching the Egghead.io lessions"
show_img_in_detail: true
coverimage: false
category: angular2
tags: []
---

## Principle 1: Immutable State Tree

The state in a Redux application is represented through a single JavaScript object, called the **State Tree**. This includes data as well as UI state.

## Principle 2: Every data enters through action

Single components triggering user actions but also network requests dispatch actions which are simple JavaScript objects.

```javascript
{
	type: 'ADD_TODO',
	id: 1,
	text: 'learn redux'
}
```

## Pure vs. impure functions

Pure functions

- don't have side effects (regardless how often they're called: idempotent)
- do not change objects passed to them through parameters

Redux functions **have to be pure**.

## ...

State mutations need to be described as pure functions, taking the previous state and action to be executed and return