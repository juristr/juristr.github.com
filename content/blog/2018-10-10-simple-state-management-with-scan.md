---
title: Simple State Management with RxJS’s scan operator
lead: Learn how you can build your own simple state management with just RxJS
date: 2018-10-10T00:00:00.000Z
comments: true
url: /blog/2018/10/simple-state-management-with-scan
type: post
image: /blog/assets/imgs/scan-operator-marble.png
categories:
  - RxJS
  - Angular
tags:
  - rxjs
  - angular
---

<div class="article-intro">
	State management is a big topic currently in frontend development. For a reason: frontend frameworks/libraries got extremely powerful in the recent years, which led to more and more complex applications which need to be tamed. In this article we’re going to learn how to leverage RxJS to create your own - very simple - “state management solution”.
</div>

{{< postad >}}

<figure class="image--medium">
    <img src="/blog/assets/imgs/scan-operator-marble.png">
    <figcaption>RxJS marble diagram for scan</figcaption>
</figure>

{{< toc >}}

## State Management Libraries

There are a lot of state management solutions available. It all started on the frontend with Facebook’s Flux pattern and really took off when [Dan Abramov](https://twitter.com/dan_abramov) gave his presentation about [time travel debugging](https://youtu.be/xsSnOQynTHs), presenting the world Redux.
The pattern evolved, others got inspired by it and today (when looking at Angular’s ecosystem) we have

- [ngrx](https://github.com/ngrx) (which essentially is Redux powered by RxJS)
- [ngxs](https://github.com/ngxs/store)
- [Akita](https://netbasal.com/introducing-akita-a-new-state-management-pattern-for-angular-applications-f2f0fab5a8)
- [mobx](https://github.com/mobxjs/mobx)
- …

…just to mention the most popular ones.

When first taking a closer look at Redux, it immediately reminded me of a pattern I’ve come across in the backend development world: [Command-Query-Responsibility-Segregation (CQRS)](https://martinfowler.com/bliki/CQRS.html). It helps you structure your application into a writing and reading (querying) part, allowing for optimizing each of them. Quite different to a (more traditional) domain model approach.

At a very high level, Redux/ngrx is CQRS ported to the frontend world. Both are extremely powerful and you can easily achieve workflows such as optimistic updates etc, which otherwise are more difficult to achieve. It also imposes a very opinionated structure onto your application architecture which has benefits, but also comes with a lot of cost with it. A lot of people underestimate that cost and jump (blindly) into the pattern because they’re attracted by its advantages.

This post is not going to be about the advantages/disadvantages of ngrx/ngxs/… or another “ngrx boilerplate rant post”, but rather shows you that pure RxJS can be pretty powerful as well.

## Roll your own “super simple” state management with RxJS’s `scan` operator

Before we get started:


> **Heads-up:** this illustrates a very naive/simplistic approach to manage some state within your application. It might be your app settings coming from different places or something else. Go through the example, understand it, adapt it and apply it to your needs.

**Create a source of value**

```javascript
stateSubject = new Subject();
```

We can use `stateSubject.next(someValue)` to push in new values.
To allow others to listen we expose it as an Observable:

```javascript
state$ = this.stateSubject.asObservable();
```

With the above however,

- each subscriber gets a new observable (cold)
- only gets values that are emitted after the subscriber joined (it won’t get old ones)

We can thus either use a `BehaviorSubject`

```javascript
initialState = {};
stateSubject = new BehaviorSubject<any>(this.initialState);
```

or we can use `shareReplay`.

```javascript
state$ = this.stateSubject.asObservable()
  .pipe(
    shareReplay(1)
  );
```

The `BehaviorSubject` requires some initial value that gets broadcasted. If we just use `Subject` we also might want to use `startWith(…)` operator to push out the initial state value to subscribers.

```javascript
state$ = this.stateSubject.asObservable()
    .pipe(
      startWith(this.initialState),
      shareReplay(1)
    );
```

**Accumulating values**
In our example so far, executing

```javascript
this.stateSubject.next({ name: 'Juri' });
this.stateSubject.next({ age: 33 });
```

..we would get each single value individually at our subscribers, first `{ name:` `'``Juri }``'` followed by `{ age: 33 }`. Usually however what we’d like to get is the aggregated state:

```javascript
// after the 1st .next({ name: 'Juri' })
{
    name: 'Juri'
}

// after the 2nd .next({ age: 33 })
{
    name: 'Juri',
    age: 33
}
```

As you can see we want to get the accumulated state as we continue to push values to our subject. In order to achieve that we can use the `scan` operator. If you pay close attention to the [learnrxjs.io](https://www.learnrxjs.io/operators/transformation/scan.html) website you may have seen this:


![](https://d2mxuefqeaa7sj.cloudfront.net/s_FF9224E68962C964E17D8454F3281E8C150035691ECB478CB02DE6ED86897192_1536785077902_image.png)


See the “You can create Redux-like state management with scan!” part? That’s exactly what we want, right 🙂.

So let’s use `scan` to complete our `state$` Observable:

```javascript
interface StateObject {
  [prop: string]: any;
}
...
state$ = this.stateSubject.asObservable().pipe(
  scan((acc: StateObject, newVal: StateObject) => {
    // create a new object
    return { ...acc, ...newVal };
  }, this.initialState),
  startWith(this.initialState),
  shareReplay(1)
);
```

## Running Stackblitz example

{{<stackblitz uid="edit/angular-state-mgmnt-scan" >}}
 

## Conclusion

Note, this is obviously a very naive implementation and it needs probably be tailored to your own situation. But on the other side, if you just need a very simple state management for some part of your application, this might totally suffice your requirements. I wouldn’t recommend using it to blow it up to a be like the application-wide store. In those situations I’d definitely recommend giving a look at some of the state management libraries I cited before.

_Thanks [Pisman Kwinten](https://twitter.com/KwintenP) for reviewing this article :)_

**Related articles**

- [NgRx + Facades: Better State Management](https://medium.com/@thomasburleson_11450/ngrx-facades-better-state-management-82a04b9a1e39)
- [The sandbox pattern](https://blog.strongbrew.io/A-scalable-angular-architecture-part2/)
- [Manage State in RxJS with StartWith and Scan](https://egghead.io/lessons/angular-manage-state-in-rxjs-with-startwith-and-scan)
- [Do we really need Redux or @ngrx/store](https://blog.strongbrew.io/do-we-really-need-redux/)
- [Angular Firebase: Redux from scratch](https://youtu.be/hG7v7quMMwM)
