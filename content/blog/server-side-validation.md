---
type: post
title: "Display Server Side Validation Errors with Angular"
lead: >-
  Binding server validation errors to your Angular form
date: 2019-02-07T20:30:31+01:00
comments: true
url: /blog/2019/02/display-server-side-validation-errors-with-angular
image: /blog/assets/imgs/server-side-validation-errors.png
categories:
  - Angular
  - Egghead
tags:
  - angular
  - forms
  - validation
  - egghead
draft: false
---

{{<intro>}}
  Input Validation is a big topic when it comes to forms. And even more in those large, enterprisey apps, where validation can become really crazy. Now, Angular forms of course provide different mechanisms for handling validation out of the box. However, in this article I won't go into those details, I will rather show you a possible strategy for visualizing server side validation errors.
{{</intro>}}

Before starting straight away, we can basically have these types of validation:

- **client-side -** they prevent you even from submitting the form itself. The simplest for sure being the required validator, or others like checking the max length etc.
- **client-side async -** typical use case: checking for the availability of the username. By using an async validator, we can call a function on the server via an API to verify whether the user provided value (in this case the username) has not already been taken. Aside from the difference that we call a server API, the behavior is quite similar. Unless the validator is satisfied, we won't be able to submit our form.

Sometimes however, we **have to submit the form** to be able to perform more cross-cutting validation logic. We might need to take the data combine it with other data (from the DB) we only have available on the server side, before ultimately then returning either a success status or fail due to "validation errors". Such validation errors can then be targeted to a single field (i.e. the username field) or even the entire entity (or user model).

## TL;DR

Might want to watch the according [Egghead.io lesson](https://egghead.io/lessons/egghead-display-a-server-side-validation-error-response-onto-an-angular-form) then :wink:...

{{<egghead-lesson uid="lessons/egghead-display-a-server-side-validation-error-response-onto-an-angular-form">}}

## HTTP and Status Codes

In modern APIs, whenever we send data to the server and it gets processed successfully, an `HTTP 200` response is being sent back to confirm the success. We might even get the data back in the response body, containing additional fields that might have been calculated on the server side. A classic example: the primary key property (usually) `id` might have been populated on the server side.

Similarly, when something goes terribly wrong, we get an `HTTP 500`. That's usually a server error, where the user cannot really do something about it, in terms of modifying the submitted data. It's usually due to a server outage, configuration or even programming issue.

Aside from a `HTTP 500` we might also have a different error scenario, one that **depends on the submitted data**. Let's take the "username" example. I know we could easily solve this via an async validator, but let's assume for now we have to submit the form first and it will be evaluated on the server side. Now if the username is already taken, the server has to communicate that somehow to the client s.t. that one in turn can communicate it to the user and ask him/her to change it.  

One might now be tempted to return a `HTTP 200` and within the response body provide some information that illustrates the issue. I've seen people do something like

```json
// DON'T
// positive response (HTTP 200)
{
  status: 'OK',
  data: {
    ...
  }
}
```

```json
// DON'T
// negative response (still HTTP 200)
{
  status: 'ERROR',
  errors: {
    ...
  }
}
```

You can see how the `status` field in the response is being used to determine whether the request was successful or not. Such an approach is discouraged however. While the structuring of the data in the response body is totally fine (and up to you, even placing the `status` property), don't use status fields for determining whether the request is a success or failure. Rather **make use the HTTP status code instead**!

## Communicate validation errors via HTTP

What status code should we use for validation errors? Is it a 500 (server error)? 400 (bad request)? `500` is more like a server side issue, so that's probably "wrong". Let's check `400 - Bad Request`:

> The 400 (Bad Request) status code indicates that the server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing). <cite><a href="https://tools.ietf.org/html/rfc7231#section-6.5.1" target="_blank">https://tools.ietf.org/html/rfc7231#section-6.5.1</a></cite>

That looks better. However "malformed request syntax" and "invalid request message framing" doesn't quite match it.

I'm usually using `422 - Unprocessable Entity` instead. The definition says the following:

> The 422 (Unprocessable Entity) status code means the server understands the content type of the request entity (hence a 415 (Unsupported Media Type) status code is inappropriate), and the syntax of the request entity is correct (thus a 400 (Bad Request) status code is inappropriate) but was unable to process the contained instructions.  For example, this error condition may occur if an XML request body contains well-formed (i.e., syntactically correct), but semantically erroneous, XML instructions. <cite><a href="https://tools.ietf.org/html/rfc4918#section-11.2" target="_blank">https://tools.ietf.org/html/rfc4918#section-11.2</a></cite>

I think it best matches our needs. Having defined the status code, we need to determine how to best transport the information back to the client? Well, here it really depends on the type of information you have. If we're able to directly associate the error to a form input property, the response could look as follows:

```json
// HTTP 422 body
{
  errors: {
    "username": "The username is already taken"
  }
}
```

_(Note, this is just an example. The choice of using an object rather than an array here is just mine, you can totally define this response by yourself)_

## Visualizing server side validation errors

We now know the HTTP status and the transport format. What's left is how to map this onto the client-form, which isn't too difficult after all. The strategy is the following:

- check whether the HTTP status is 422
- for each entry in the `errors` object, try to match a form field and invalidate it

Let's implement it. Consider our form to be as simple as the following:

```html
<form ...>
  <mat-form-field>
    <input matInput placeholder="Username" formControlName="username" required>
    <mat-error *ngIf="form.get('username').errors?.required">Username is required</mat-error>
  </mat-form-field>
</form>
```

As you can see there is a required validator and the according `<mat-error>` (I'm using [Angular Material](https://material.angular.io/) here) that's responsible for visualizing the error. The `required` fires immediately, and won't let us submit the form unless it is valid. 


### Validation error placeholder for server validation errors

In order to be able to visualize the server-side error messages, we also need a placeholder for visualizing the error message:

```html
<form ...>
  <mat-form-field>
    <input matInput placeholder="Username" formControlName="username" required>
    <mat-error *ngIf="form.get('username').errors?.required">Username is required</mat-error>
    <!-- server-side validation errors -->
    <mat-error *ngIf="form.get('username').errors?.serverError">
      {{ form.get('username').errors?.serverError }}
    </mat-error>
  </mat-form-field>
</form>
```

As you can see, whenever the `username` field has errors of type `serverError`, this new validation error message gets shown and visualizes the text inside the `...errors.serverError` property.

### Parsing the error and activating the validation message

The part that's missing is to parse the error. Assume we have a `personService` that sends the form value back to the server via some HTTP API. In the `subscribe`, we implement the error callback and check for an `HttpErrorResponse` as well as our `422` status code. 

```typescript
this.personService.save(value)
  .pipe(
    ...
  )
  .subscribe(x => {
    console.log('Successfully saved person', x);
  }, err => {
    if (err instanceof HttpErrorResponse) {
      const errorMessages = new Array<{ propName: string; errors: string }>();

      if (err.status === 422) {
        // TODO: extract errors here and match onto the form
      }
    }
  })
```

In such case, we can now parse the error messages based on the response structure we defined earlier. Whenever we get a matching form field, we activate the `serverError` validation message using the `setErrors(..)` function of the `FormControl`:

```typescript
...
if(err.status === 422) {
  Object.keys(validationErrors).forEach(prop => {
    const formControl = this.form.get(prop);
    if (formControl) {
      // activate the error message
      formControl.setErrors({
        serverError: validationErrors[prop]
      });
    }
  });
}
```

## What about unmatched errors?

For simplicity reasons, I didn't implement any fallback mechanism here, but you definitely should! There might be situations where you cannot find any matching form field, simply because the property is not shown, the field might be hidden to the user etc. For such scenarios, it is considered good practice to visualize an error notification to the user with all those error messages.

In general it is a good usability practice to show _all_ of the error messages in some type of alert/notification, in addition to trying to match them onto the form directly.

## Running Stackblitz Example

Finally, here's a running Stackblitz example, made with :heart: for you to play around with :wink:. Note, since I don't have an HTTP server on Stackblitz, I simulate the HTTP calls/responses with some RxJS and delays :sweat_smile:

{{<stackblitz uid="/edit/blog-server-side-validation-display">}}


## Conclusion and Considerations

Here are some final considerations. First of all, this approach definitely requires some "coupling" between the client form and the server response model as the properties obviously have to match. This is something that might not always be the case, whether it's due to the usage of DTOs (Data Transfer Objects) that get remapped onto client-side entities or for whatever reason. In such cases, applying such strategy gets more difficult, as also the error message would have to be re-mapped accordingly. It is possible but requires some more manual work.

Furthermore, since the server returns the error messages, they have to be localized in the user language. That requires that the language on the client and server side is synced. It's not necessary to keep a session (which I'd avoid if possible), but you could simply send the user language along as a HTTP header (for instance).  
Alternatively, just return some "error code" that gets interpreted and mapped to some localized message on the client. Whatever fits you best :smiley:

**Have a better solution?** This is definitely not a golden hammer! I'd love to hear about it!