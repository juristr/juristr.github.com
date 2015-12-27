---
layout: post_new
title: "Learning Redux"
lead: "Notes from watching the Egghead.io lessions"
show_img_in_detail: true
coverimage: false
category: angular2
tags: []
---

Nice intro to Redux by Redux creator [Dan Abramov](https://twitter.com/dan_abramov).

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

## Principle 3: State mutations are described by pure functions

This so-called **reducer** is a pure function that

- Takes previous state of the app
- the action being dispatched and 
- returns the next state of the app.

Example of a counter.

```javascript
function counter(state, action) {
	if(typeof state === 'undefined') {
		return 0;
	}

	if(action.type === 'INCREMENT') {
		return state + 1;
	} else if(action.type === 'DECREMENT') {
		return state - 1;
  } else {
		// for unknown actions return the current state
		return state;
  }
}
```

Dan nicely refactors it using ES6 flavor:

```javascript
const counter = (state = 0, action) => {
	switch(state) {
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			// for unknown actions return current state, don't fail
			return state;
	}
}
```

## The store

The store is responsible for

- binds together 3 principles of Redux
- holds current app state object
- dispatches actions
- a store needs to get a reducer to know how to dispatch actions

```javascript
var store = Redux.createStore(counter);

// get the state
var currentState = store.getState();
```

```javascript
store.subscribe(() => {
	// will be called every time an action will be dispatched
});
```

To dispatch the action

```javascript
document.addEventListener('click', () => {
	store.dispatch({ type: 'INCREMENT' });
});
```

## Links

Here are some further links

- [Egghead Redux Course Notes on GitHub](https://github.com/tayiorbeii/egghead.io_redux_course_notes)
- [Immutable.js practical guide](http://www.triplet.fi/blog/immutable-js-practical-guide/)

