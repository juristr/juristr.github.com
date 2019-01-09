---
type: post
title: "Guarantee Event Order with RxJS"
lead: "use concatMap to guarantee ordering of events"
date: 2019-01-09T15:03:22+01:00
comments: true
image: /blog/assets/imgs/rxjs-order-guarantee.png
categories:
  - RxJS
  - Angular
tags:
  - RxJS
  - Angular
  - async
  - ordering
draft: true
---

<div class="article-intro">
  When you create dynamic UIs, you have to deal with async stuff a lot. Most often they are triggered by some user interaction. Things usually get tricky when you need to guarantee certain operations are executed in order. Since they are async we might not know which one returns first. Let's see how RxJS can help a lot here.
</div>

<!--more-->

{{<postad>}}

In order to illustrate **the problem** I created an example use case, simplified of course, but still it represents a potential real world use case. We basically have the following user interface:

<figure class="image--medium">
  <img src="/blog/assets/imgs/rxjs-order-guarantee.png" />
</figure>

When the user **checks** some option, an http request is made to retrieve some value and once the request returns, the response is added to a list visualized below. 

> For the sake of simplicity, in this fake example I simply use a `setTimeout(..)` to simulate the asyncronous request.

When the user again **deselects** the option, the corresponding value is removed from the list below (without any async request).

## The Problem

The async request made when checking an option might take a while before coming back of course. That said, what happens when the user double-clicks :confused:?

Well, try by yourself:

{{<stackblitz uid="edit/blog-guarantee-order-wrong">}}

As you can see, we might get an inconsistent state. When - for instance - quickly double-clicking on "Option 1" we get the option selected & then unselected again, but the async call coming later still adds the option to the list.

The issue is quite clear by looking at what happens in the checkbox selection event:

```typescript
...
if(data.checkboxEvent.checked) {
    // simulate async call
    setTimeout(() => {
      // add the record
      this.records.push(data.option)
    }, 1500)
} else {
    // remove the record given by the id (if present)
    this.records = [...this.records.filter(x => x.value !== id )];
}
```

The slower async call comes back later, thus it adds the record, regardless of whether we unchecked it again in the meantime.

## We need to guarantee ordering

We somehow need to guarantee ordering of the events. Thus, when double-clicking, we need to make sure that the logic for "unchecking" is executed only after a potential async call returns. Implementing this can be quite tricky. You could check whether the corresponding option is still checked when the async call returns and only in that case execute the logic. Alternatively, you could hold some flag, blocking other logic to be executed while an async call is running...  
Not really satisfying and hacky.., and again, this is just a small simple fake example.

Well, turns out that if you know RxJS, this is quite easily achievable: using the `concatMap` operator.

{{<emphasized>}}
  `concatMap` - Map values to inner observable, subscribe and emit in order.
{{</emphasized>}}

**The idea is to pipe the events** from the checking/unchecking into a RxJS subject and then process them one after the other.

```typescript
private selectionSubject = new Subject<SelectionEvent>();
...
this.selectionEvent
  .pipe(
    concatMap(data => {
      ...
    })
  ).subscribe(action => {
    ...
  })
```

Inside the `concatMap` we implement the logic of handling the actions. 

```typescript
...
.concatMap(data => {
  const id = data.option.value;

  if (data.checkboxEvent.checked) {
    /*
      do the async call and then return
      an action object like
      {
        type: 'ADD',
        data: ...
      }
    */
  } else {
    /*
      Nothing to call, just remove
      the corresponding record, thus return
      a "remove" action
      {
        type: 'REMOVE',
        data: id
      }
    */
  }
})
...
```

When we receive a checked event, then we execute the async call, otherwise we trigger an action for removing the item from the list. We need to always return an Observable for that. `concatMap` subscribes to that "inner Observable" and proceeds with the next only once the previous one "completes", thus **guaranteeing ordering of our events**.

> An Observable "completes" once it is done. It is similar to the `resolve(..)` of a `Promise`.

#### A short note on wrapping `setTimeout` as Observable

You remember we use `setTimeout` to simulate an async call. Well, we need to wrap it into an Observable. There are two ways of doing it.

**Using the `timer` observable** - we can simply use the existing `timer(..)` which the RxJS exposes for us:

```typescript
timer(1500)
  .pipe(
    map(_ => ({
      type: 'ADD',
      data: ...
    }))
  )
```

Alternatively, we **can create an Observable by ourselves** with `Observable.create(...)`:

```typescript
return Observable.create((observer) => {
  const timeout = setTimeout(() => {
    console.log('Returning data');
    observer.next({
      type: 'ADD',
      data: data.option
    });
    
    // complete the observable
    observer.complete();
  }, 1500);

  // cancel timeout on unsubscribe
  return () => clearTimeout(timeout);
});
```

### The entire `concatMap` example

Alright, now that we know how to wrap our `setTimeout` as an observable, let's continue with the implementation of the `concatMap` logic.

```typescript
concatMap(data => {
  const id = data.option.value;

  if (data.checkboxEvent.checked) {
    // simulate async call
    return Observable.create((observer) => {
      const timeout = setTimeout(() => {
        console.log('Returning data');
        observer.next({
          type: 'ADD',
          data: data.option
        });
        observer.complete();
      }, 1500);

      return () => clearTimeout(timeout);
    });
  } else {
    return of({
      type: 'REMOVE',
      data: id
    });
  }
})
```

In the `.subscribe(...)` of our `selectionObject` we then effectively parse the action and cause the side-effect on our result list:

```typescript
 this.selectionSubject
    .pipe(
      concatMap(data => {
        ...
      })
    ).subscribe((action: any) => {
      if (action.type === 'ADD') {
        this.records.push(action.data)
      } else {
        this.records = [...this.records.filter(x => x.value !== action.data)];
      }
    });
```

Awesome! Now, whenever the user clicks a checkbox, in the according event handler, we don't implement the logic, but rather we just need to pipe it into the `selectionSubject`.

```typescript
onCheckListChange(data: SelectionEvent) {
  this.selectionSubject.next(data);
}
```

Here's the according Stackblitz example to play around with. Check it out, double-clicking works perfectly now!

{{<stackblitz uid="edit/blog-guarantee-order-concatmap">}}

## Optimizing with `switchMap`

But can do even better. In the current `concatMap` example, when the user double-clicks, we effectively wait until the async call comes back and then remove it again. But why even execute the async logic. When the user double-clicks we can just abort the previous action and not even execute it, thus save time.

That's what `switchMap` does. In contrast to `concatMap`, it doesn't execute the actions (our Observable events) in sequence, but rather it cancels the previous Observable. Here's a Stackblitz example. Pay particular attention to the console log. In the `setTimeout(..)` a log is written (`console.log('Returning data');`). If you double-click, that log doesn't even appear, proving that the async action is not even executed.

{{<stackblitz uid="edit/blog-guarantee-order-switchmap">}}

## Conclusion

This article demonstrates some pratical use cases for `concatMap` as well as `switchMap`. RxJS is powerful, and we see in this example how to solve the "ordering" problem in a very elegant and maintainable way.

RxJS has its learning curve, though. I highly believe the best way to learn it is not by learning its operators, but rather by real-world use cases and how to solve them with RxJS. Stay tuned for further articles like this one.

_(@rxjs experts: nothing for you here, I'm sorry :wink:)_