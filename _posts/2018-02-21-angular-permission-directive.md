---
layout: post_new
title: "Extend the *ngIf Syntax to Create a Custom Permission Directive"
lead: "Learn how to create a custom structural directive in Angular that checks against user permissions"
postimg: "/blog/assets/imgs/angular-permission-directive-bg.png"
tags: [ "Angular" ]
---

<div class="article-intro">
	So our use case is to create a directive, which shows/hides elements on the page based on our currently authenticated user's permissions. In this article we will go over a very simple use case, but which could easily be extended and used in a real production application. By creating such directive we'll also take a deeper look at the syntax that Angular's <code>ngIf</code> and <code>ngFor</code> directives use.
</div>

{% include postads %}

{% assign message = "Contents are based on Angular version >= 2.0.0" %} {%
include warn-notice.html %}

{% include toc.html %}

## Our User object

Consider our user object looks similar to the following:

```javascript
const aUser = {
    username: 'juristr',
    permissions: [
        'permission1',
        'permission2',
        'permission3'
    ]
}
```

As you can see, our permissions is a simple array of strings which will most probably come from our backend API when we fetch the current authenticated user. In our toy example here, I'm having a `user.service.ts` which deals with our application user. It allows us to set a new user and to subscribe to changes on our authenticated application user.

```javascript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<any>({});
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  constructor() { }

  setUser(user) {
    console.log('new user', user);
    this.currentUserSubject.next(user);
  }

}
```

## Basically, we need an `*ngIf`, right?

Great, so we're ready. We can now create a directive that takes the permissions of the currently authenticated user and shows/hides them appropriately. In practice, **a custom `*ngIf`** directive.

`*ngIf` has a `*` in front, which is a special syntax within Angular, denoting a so-called **structural directive**. These directives, such as `*ngIf` or `*ngFor` directly manipulate the DOM. So how are they constructed? Let's take a look at the Angular source: [https://github.com/angular/angular/blob/master/packages/common/src/directives/ng_if.ts](https://github.com/angular/angular/blob/master/packages/common/src/directives/ng_if.ts).

The current version has a lot of properties as it [also supports the "else" case etc](). But if we just want to build a very naive version of it, it'll look as follows:

```javascript
import { Directive, Input, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[myIf]'
})
export class MyIfDirective {

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
  }

  @Input()
  set myIf(val) {
    if(val) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
```

In our template we could then simply use it as follows:

```html
<div *myIf="isVisible">
    Hi there!
</div>
```

Note, if you don't place the `*` in front, you won't be able to inject the `TemplateRef<any>` or `ViewContainerRef` into your directive.

<iframe src="https://stackblitz.com/edit/angular-my-ng-if?ctl=1&embed=1&file=app/my-if.directive.ts" width="100%" height="400px"> </iframe>

## Implement the permission logic

Now it should be pretty straightforward. We now know how to show/hide an element. All we have to do is to grab a reference to our `UserService`, get the current authenticated user and perform the permission check logic.

Our directive could look like this:

```html
<div *hasPermission="['can_write', 'can_read']">
    Only users with "can_write AND "can_read" permissions can see this.
</div>
```

You see we pass in the permissions one requires to see the element to our `*hasPermission` directive. Note the `@Input() hasPermission` which is where we get the array of permissions from the outside. We then subscribe to the `userService.currentUser` observable and whenever we get another permission passed in or a new user comes around we call `updateView()` which checks the permissions and then acts accordingly.

```javascript
import { ... } from '@angular/core';
import { UserService } from './user.service';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective implements OnInit {
  private currentUser;
  private permissions = [];

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.updateView();
    });
  }

  @Input()
  set hasPermission(val) {
    this.permissions = val;
    this.updateView();
  }

  private updateView() {
    if (this.checkPermission()) {
        this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  private checkPermission() {
    let hasPermission = false;

    if (this.currentUser && this.currentUser.permissions) {
      for (const checkPermission of this.permissions) {
        const permissionFound = this.currentUser.permissions.find(x => x.toUpperCase() === checkPermission.toUpperCase());
        ...
      }
    }

    return hasPermission;
  }
}
```

## Allow to perform logical OR comparisons

From the example before you can see that currently the user has to have ALL permissions defined on our `hasPermission` directive. What if we wanted to perform a logical `OR`? That would allow to define an element where the user only needs to have one of the permissions.

In order to pass in the operator, you'd add another `@Input()` right? If you try something like this, you will not succeed, though.

```html
<div *hasPermission="['can_write', 'can_read']" operation="'OR'">
    ...
</div>
```
That's because you **cannot have other directives** together with **structural directives** on the same element (that is, our `*`-prefixed ones). The reason is that the `*` is actually just a shortcut for writing it like

```html
<ng-template [hasPermission]="['can_write', 'can_read']" operation="'OR'">
    <div>
        ...
    </div>
</ng-template>
```

And in this way the `operation` input would be processed correctly. Ever seen the `*ngIf/else` definition? How is it working there, `else` is actually just another input right?

```html
<div *ngIf="isLoggedIn(); else notLoggedIn">
    ...
</div>
<ng-template #notLoggedIn>
    ...
</ng-template>
```

Turns out we can use the same syntax in our own directive:

```html
<div *hasPermission="['can_write', 'can_read']; operation 'OR'">
    Only users with "can_write AND "can_read" permissions can see this.
</div>
```

The only important thing is that our `@Input` internally in our `hasPermission` directive is prefixed with the name of our directive, like:

```javascript
@Directive({...})
export class HasPermissionDirective {
    ...
    @Input()
    set hasPermissionOperation(op) {
        console.log('operator', op);
    }
    ...
}
```

That's it. So now that we know how to get our boolean operator inside our directive, we just need to adjust our permission checking algorithm to take that into account.

> **Note,** in the `updateView()` function I added a flag `isHidden` that helps us keep track of whether we've already added the template into the DOM. We don't want to add it multiple times in case when the permissions update and evaluate to true.

## Conclusion and final example

Here's the full running example of a potential permission directive. Note, this is just an example, nothing to copy & paste into your production code. But you can definitely take it as a starting point.

<iframe src="https://stackblitz.com/edit/angular-permission-directive?ctl=1&embed=1&file=app/app.component.html" width="100%" height="400px"> </iframe>

> But hey, we're running this in the browser. How can this be secure?

You're right, it's happening in the browser, at our user's computer, in JavaScript. That's why it's important to note that we're not strictly talking about security here but rather this is **presentation logic and UX**. We want to hide elements the user wouldn't be able to do anything with anyway. In case a user would be able to "break" into such hidden element, any calls to the server made by those components should obviously not return anything. Because further security checks about whether the user has the permission to read/see the data is **done on the server side**.



