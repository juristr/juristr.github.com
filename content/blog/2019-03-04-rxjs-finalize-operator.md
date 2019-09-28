---
type: post
title: "RxJS finalize operator to execute logic on Observable termination"
lead: >-
  An RxJS operator for executing logic when the Observable terminates
date: 2019-03-04T10:00:00+01:00
comments: true
url: /blog/2019/04/rxjs-finalize-operator
image: /blog/assets/imgs/rxjs-finalize.jpg
categories:
  - RxJS
  - Angular
  - Egghead
tags:
  - rxjs
  - angular
  - beginner
---

{{<intro>}}
  In this article we're going to have a look at the RxJS `finalize` operator. To have a practical use case, let's take a look at disabling/enabling a form submit button during an HTTP request.
{{</intro>}}
<!--more-->

{{< postad >}}

**Translations of this article:** [Chinese](https://awesome.angular.live/articles/6eaf3c79__juristr_RxJS_finalize_operator_to_execute_logic_on_Observable_termination)

## TL;DR: Here's the corresponding Egghead lesson

{{<egghead-lesson uid="lessons/angular-execute-code-when-the-rxjs-observable-terminates-with-the-finalize-operator" >}}

## Disabling/enabling a button during an Angular HTTP request

Let's take a look at an RxJS `Observable` subscription:

```typescript
this.someService.fetchDataFromApi()
  .subscribe(
    result => {
      // success
    },
    err => {
      // some error happened
    }
  )
```

Assume this call is triggered by a button click on our form. Many people still double-click on those buttons and we definitely want to prevent 2 calls being sent to our backend API. There are different ways to avoid that of course, but for the purpose of this example, let's go the route of disabling the button once it has been clicked, and re-enable it when the http call terminates.

```typescript
this.isLoading = true;
this.someService.fetchDataFromApi()
  .subscribe(
    result => {
      // success
      this.isLoading = false;
    },
    err => {
      // some error happened
      this.isLoading = false;
    }
  )
```

Whenever `isLoading` is set, we disable our button on the form. Now as in the example before, the `isLoading = false` instruction is duplicated, because we want to re-enable the button in both, success and error cases.

### Option 1: Using the `tap` operator?

One option could be the `tap` operator. For instance:

```typescript
this.isLoading = true;
this.someService.fetchDataFromApi()
  .pipe(
    tap(_ => {
      this.isLoading = false;
    })
  )
  .subscribe(
    result => {
      // success
    },
    err => {
      // some error happened
    }
  )
```

Using `tap` like this however, will only execute in case of a success and not when the observale throws an exception & terminates (such as in a failed Http call in Angular).

The operator however takes a config object that allows us to hook onto the `next`, `error` and `complete` event state of an Observable, very much like we can do in the `subscribe`.

```typescript
this.someService.fetchDataFromApi()
  .pipe(
    tap({
      next: (x) => {
        console.log('tap success', x);
        this.isLoading = false;
      },
      error: (err) => {
        console.log('tap error', err);
        this.isLoading = false;
      },
      complete: () => console.log('tap complete')
    }),
  )
  .subscribe(x => {
    console.log('Got result', x);
  }, (err) => {
    console.error('Got error', err);
  })
```

Here's an example of using `tap` like that:

{{<stackblitz uid="edit/rxjs-finalize-operator-aabtcm" >}}


### Option 2: Using the `finalize` operator!

Another option is to use the `finalize` operator. It's like in the `try-catch-finally` programming construct which is present in most C based programming languages. Hence, we can modify our example from before to the following:

```typescript
this.isLoading = true;
this.someService.fetchDataFromApi()
  .pipe(
    finalize(() => {
      this.isLoading = false;
    })
  )
  .subscribe(
    result => {
      // success
    },
    err => {
      // some error happened
    }
  )
```

How does `finalize` work? It basically adds a callback to the teardown of the Observable, via `subscription.add(fn)`. This guarantees it will be called on `error`, `complete`, and `unsubscription`.

{{<stackblitz uid="edit/rxjs-finalize-operator">}}

## Conclusion

Note, the `finalize` operator is executed whenever **our Observable terminates**. This is important! For Angular HTTP this works perfectly, because the `Observable` returned by the Angular HTTP service "completes" once the request is done. That might not be the case if you have a custom Observable.

Check out [my corresponding video explaining the finalize operator](https://egghead.io/lessons/angular-execute-code-when-the-rxjs-observable-terminates-with-the-finalize-operator?af=fj2vsx) or play directly with this Stackblitz code sample.

Happy coding!

_Thx [Ben Lesh](https://mobile.twitter.com/BenLesh) for suggesting updates on the article_
