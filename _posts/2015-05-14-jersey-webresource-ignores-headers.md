---
layout: post
title: "Jersey WebResource - Header don't get appended"
lead: "WTF? Why does WebResource not send my headers??"
coverimage: false
category:
tags: ["java"]
---

Yesterday I ran into a strange problem when using the Jersey WebResource class for doing HTTP calls: it seemed as if the headers I set, simply got ignored when executing the HTTP call. Read ahead.

What I tried to achieve was to call a REST Api to get some data from on of our applications. For doing so, I used the [Jersey client](https://jersey.java.net/), and obviously I also had to forward the received authorization token in order to authenticate the user on the target application. Not knowing the Jersey Api in detail, what I did was the following (not exactly, but adapted for this post to illustrate the scenario):

```java
WebResource resource = Client.create(new DefaultClientConfig()).resource("http://myapp.org/api/v1/data");
resource.accept(MediaType.APPLICATION_JSON);
resource.type(MediaType.APPLICATION_JSON);
resource.header(HttpHeaders.AUTHORIZATION, "Negotiate " + token);

return resource.get(String.class);
```

However, the `Negotiate` token didn't get appended, at least that was what I noticed explicitly as I got a "401 Authorization denied" response. Logging the HTTP requests on my Apache further underlined my assumptions. 

As an attempt, I slightly rewrote the code to the following

```java
return Client
    .create(new DefaultClientConfig()).resource("http://myapp.org/api/v1/data")
    .accept(MediaType.APPLICATION_JSON)
    .type(MediaType.APPLICATION_JSON)
    .header(HttpHeaders.AUTHORIZATION, "Negotiate " + token)
    .get(String.class);
```

..and hey, it worked! WTF? What was going on here?

## The Builder pattern

What seems insane initially, gets much clearer when you take a look at how - for instance - `accept(...)` is implemented on the `com.sun.jersey.api.client.WebResource` class:

```java
...
@Override
public Builder accept(String... types) {
    return getRequestBuilder().accept(types);
}
...
```

You get a new `Builder` object each time! That's why it doesn't work. So instead of the wrong version above, you rather have to write it like this:

```java
WebResource resource = Client.create(new DefaultClientConfig()).resource("http://myapp.org/api/v1/data");
            
WebResource.Builder builder = resource.accept(MediaType.APPLICATION_JSON);
builder.type(MediaType.APPLICATION_JSON);
builder.header(HttpHeaders.AUTHORIZATION, "Negotiate " + token);

return builder.get(String.class);
```

Note, the first call `resource.accept()` returns the Builder object, and any subsequent calls to `type()` and `header()` work directly on that builder instance. 

You can even invert the sequence of calls, like, calling first `resource.type(..)` and then `accept` and so on. Why? Because both, `WebResource.Builder` as well as `WebResource` itself implement the same interface `RequestBuilder`, just that the `WebResource`'s implementation creates a new Builder object, while the `Builder`'s implementation really adds the passed information onto a metadata collection.

## Conclusion

The Builder pattern is a common approach to simplify the creation of object instances by hiding the implementation details, especially in Java. Normally you invoke a series of methods that add information to your object, to finally call the `build()` method which returns the desired instance. The WebResource class totally hides this. Now, not having coded in Java for quite a while, I'm not sure whether the way WebResource implemented the Builder pattern is a common one, but I find it highly distracting and might lead to nasty errors. At least, it cost me a couple of hours to figure out why my authentication scenario didn't work.
