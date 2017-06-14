---
layout: post_new
title: "Enhanced *ngIf and *ngFor in Angular version 4.0.0"
lead: "One of the main features added in Angular version 4 release are an enhanced *ngIf and *ngFor. Let's explore what they give us!"
postimg: "/blog/assets/imgs/ngIf-else-article.png"
tags: [ "Angular"]
---

<div class="article-intro">
	Ever wanted an "else" statement in <code>*ngIf</code>? It's finally here, together with some other nice improvements around dealing with Observables in templates. Let's explore them here.
</div>

{% include postads %}

{% assign message = "Contents are based on Angular version 4+." %}
{% include warn-notice.html %}

{% include toc.html %}

## If..Then..Else

The `ngIf` directive gets a nice improvement in Angular version 4.0.0. It’s been the target of many critiques even in AngularJS (v1.x) because of the lack of an “else” clause. In order to simulate if-then-else blocks in Angular templates, we had to use two `ngIf` directives with opposed boolean conditions.

```html
<div *ngIf=”isLoggedIn()”>
   Hi, {%raw%}{{ user.name }}{%endraw%}
</div>
<div *ngIf=”!isLoggedIn()”>
   You’re not logged in.
</div>
```

In Angular version 4 we now get an “else” instruction as part of the ngIf directive. We can thus transform the above template to the following:

```html
<div *ngIf="isLoggedIn(); else notLoggedIn">
    Hi, {%raw%}{{ user.name }}!{%endraw%}
</div>
<ng-template #notLoggedIn>
    You're not logged in.
</ng-template>
```

## Better Observables support in templates

RxJS and Observables are already heavily being used within Angular, even when it comes to rendering async data into a template. When we execute an HTTP call with Angular, we get an Observable in return.

```javascript
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'users-list',
  template: `
    <ul>
      <li *ngFor="let user of users">
        {%raw%}{{ user.username }}{%endraw%}
      </li>
    </ul>
  `
})
export class UsersListComponent {
  users;
  
  constructor(private http: Http) {  }

  ngOnInit() {
    this.http
        .get('/api/users')
        .map(res => res.json())
        .subscribe((data) => {
          this.users = data;
        });
  }
}
```

In this example, we use the Observable’s `subscribe` function to register a callback for when the data is retrieved from our backend API. Once we have the data, we assign it to a local variable of our component, `users`, which in turn is data-bound on the `ngFor` in our template. The async pipe which is already present in Angular version 2, allows to write this in a more elegant way:

```javascript
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'users-list',
  template: `
    <ul>
        <li *ngFor="let user of users$ | async">
            {%raw%}{{ user.username }}{%endraw%}
        </li>
    </ul>
  `
})
export class UsersListComponent {
  users$;

  constructor(private http: Http) {  }

  ngOnInit() {
    this.users$ = this.http
        .get('/api/users')
        .map(res => res.json());
  }
}
```

We can directly assign the returned Observable to our `users$` variable and bind it in our template. The Async Pipe (`.. users$ | async`) handles the subscription and unsubscription on the Observable for us, which makes it really convenient for directly binding asynchronous data in our templates. 

> Note, the “$” suffix in our variable name is simply a naming convention to communicate this variable holds an Observable.

{% include article-link.html
    url="/blog/2016/11/safe-nav-operator-and-async-pipe/"
    imageurl="/blog/assets/imgs/angular2logo.svg"
    title="Safe Navigation Operator, RxJS and Async Pipe tinkering"
    text="Learn how to use the async pipe to write elegant, RxJS powered async code"
%}

There’s one caveat though. **We cannot access the collection within our template.** Consider for instance if we wanted to enumerate the position of the rendered user entry in the collection with respect to the total number of entries. 

### Enumerate *ngFor loops using `as` and async pipes

While in version 2 we had to fallback to subscribing to the Observable in the component class, Angular version 4 now gives us a possibility to handle such scenario by assigning the async result from the Observable to a template variable: `.. of users$ | async as users`. A template variable is a variable declaration in our template, just like the `user` in our `ngFor` loop statement.

```javascript
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'users-list',
  template: `
      <ul>
        <li *ngFor="let user of users$ | async as users; index as i">
          {%raw%}{{ user.username }} ({{ i }} of {{ users.length }}){%endraw%}
        </li>
      </ul>
  `
})
export class UsersListComponent {
  users$;

  constructor(private http: Http) {  }

  ngOnInit() {
    this.users$ = this.http
        .get('/api/users')
        .map(res => res.json());
  }
}
```

### Leveraging the `as` keyword with *ngIf

Using the `as` keyword also works with `ngIf`. Within the `ngIf` expression we can again directly use the Observable and assign it to a template variable. Hence, once the asynchronous call resolves, we can render that data in our template.

```javascript
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'users-list',
  template: `
    <div *ngIf="user$ | async as user">
        Hi, {%raw%}{{ user.name }}!{%endraw%}
    </div>
  `
})
export class UserLoginComponent {
  user$;

  constructor(private http: Http) {  }

  ngOnInit() {
    this.user$ = this.http
        .get('/api/auth/currentuser')
        .map(res => res.json());
  }
}
```

## Conclusion

These two additions to the `ngIf` and `ngFor` directives makes working with Observables directly within the templates a lot easier and more convenient.

Try them out by yourself with this runnable Plunker.

{% assign plunker_url = "https://embed.plnkr.co/yzvKoDHujvZLMUaveYFZ/" %}
{% include plunker.html %}
