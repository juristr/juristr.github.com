---
layout: post_new
title: "Intercept HTTP Requests in Angular"
lead: "Learn about the new interceptors introduced in Angular 4.3.1"
postimg: "/blog/assets/imgs/egghead-intercept-http-requests.png"
tags: [ "Angular", "Video Lesson" ]
---

<div class="article-intro">
	Angular version 4.3.1 introduced one important new feature: the new HTTP client. Not only did it bring optimizations in how we can execute requests to backend APIs, but it made intercepting HTTP requests extremely easy.
</div>

{% include postads %}

{% assign message = "Contents are based on Angular version >= 4.3.1" %}
{% include warn-notice.html %}

In the following [Egghead.io video lesson](https://egghead.io/lessons/intercept-http-requests-in-angular) I implement an HTTP interceptor which intercepts the request, adding some headers, the response as well as potential HTTP errors.

{% assign lesson_url = "lessons/intercept-http-requests-in-angular" %}
{% assign lesson_img = "/blog/assets/imgs/egghead-intercept-http-requests.png" %}
{% include egghead.html %}

{% include toc.html %}

## The new HTTP client

### Installing and Registering

The new HTTP client resides in the `@angular/common` package under the `@angular/common/http`. You need to register the `HttpClientModule` and register the interceptor on the `HTTP_INTERCEPTORS`.

```javascript
// app.module.ts
...
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// your interceptor file
import { MyHttpLogInterceptor } from './http.interceptor';

@NgModule({
  imports: [ ..., HttpClientModule ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpLogInterceptor, multi: true }  
  ],
  ...
})
export class AppModule {}
```

An HTTP interceptor is **just an Angular service** implementing a specific interface, the `HttpInterceptor`.

```javascript
// http.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class MyHttpLogInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request);
  }
}
```

### Intercepting HTTP requests

To intercept the request **before it is sent to the server**, we need to clone the request object and accordingly add the information we want.

```javascript
@Injectable()
export class MyHttpLogInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    ...

    // add a custom header
    const customReq = request.clone({
      headers: request.headers.set('app-language', 'it')
    });

    // pass on the modified request object
    return next.handle(customReq);
  }
}
```

### Intercepting HTTP responses

To intercept the response coming back from the server, we can simply hook on the `do(..)` operator as the new HTTP module heavily relies on the Observable API.

```javascript
...
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class MyHttpLogInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    ...

    return next
      .handle(customReq)
      .do((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
          console.log('processing response', ev);
        }
      });
  }
}
```

### Intercepting HTTP request errors

Similarly, for catching response errors, the `catch` Observable operator can be used.

```javascript
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class MyHttpLogInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    ...

    return next
      .handle(customReq)
      .do((ev: HttpEvent<any>) => {
        ...
      })
      .catch(response => {
        if (response instanceof HttpErrorResponse) {
          console.log('Processing http error', response);
        }

        return Observable.throw(response);
      });
  }
}
```

## Runnable Plunker

That's it. **Check out the Egghead video lesson at the beginning of this article** or simply start playing straight away with this runnable Plunker. Just open it in another window and inspect the `console.log` statements on the your browser's devtools.

{% assign plunker_url = "https://embed.plnkr.co/SCKXenesBaaYnYJYhWyY/" %}
{% include plunker.html %}
