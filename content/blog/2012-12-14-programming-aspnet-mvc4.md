---
title: 'Programming ASP.net MVC4 by J. Chadwick, T. Snyder and H. Panda'
description: ''
category: null
categories:
  - book review
  - ASP.net MVC
  - CSharp
  - ".Net"
date: 2012-12-14T01:00:00.000Z
comments: true
url: /blog/2012/12/programming-aspnet-mvc4
type: post
image: /blog/assets/imgs/coverprogrammingaspnet.gif
---


This is one of the recent books I got from O'Reilly. It is probably the most comprehensive and detailed one I've encountered so far regarding ASP.net MVC development. More than 400 pages, from the very basics of the MVC pattern, client-side JavaScript and Mobile web development, application architecture to successfully deploying an ASP.net MVC application in production.

<figure class="image--medium">
    <a href="http://oreillynet.com/pub/reviewproduct/874" rel="nofollow"><img src="/blog/assets/imgs/coverprogrammingaspnet.gif" /></a>
    <figcaption>Book cover; click to see other reviews</figcaption>
</figure>

## For Beginners and Experts
First of all, the book is very nicely structured and can be suggested to both, total ASP.net MVC beginners as well as to ASP.net MVC experts. Obviously, the latter will skip the initial chapters. Those mainly deal with the very fundamentals like

- MVC design pattern
- setup of an MVC application
- core concepts like routing and authentication
- how the model, view and controller are implemented in ASP.net MVC4 (including details about RAZR engine...)

Also the chapter "ASP.net MVC for Web Forms Developers" aims at providing an upgrade-path for Web Forms developers by explaining the differences, advantages and disadvantages.

> [...] for all of their commonality and similarities, the architecture and goals that drive the ASP.NET MVC and Web Forms Frameworks are fundamentally very different.

For the experts, on the other side, there are topics about

- parallel, asynchronous and real-time data operations
- caching
- continuous quality control
- ...

## A Little Insight
Here a little insight in some of the topics mentioned in the book.

### Web Application Architecture
The book also dedicates an entire chapter to "web application architecture" treating topics and suggesting best practices related to the logical and physical design of the application.

<figure class="image--medium">
    <img src="/blog/assets/imgs/webapp_logicalarchitecture.png" />
    <figcaption>A high-level architectural view of a potential web application's logical structure from the book</figcaption>
</figure>

The chapter also mentions more commonly known best practices like

- **IoC (Inversion of Control) -** by describing the core concepts and differences to the Factory or Service locator pattern. Moreover the most common IoC libs are listed and it is highlighted how they nicely integrate into the MVC platform by using the MVC [DependencyResolver class][1]
- **SOLID -** class design principle
- **DRY principle**

<table width="100%">
  <tr>
    <td><img src="/blog/assets/imgs/dependency_direct.png"/></td>
    <td><img src="/blog/assets/imgs/dependency_factory.png"/></td>
    <td><img src="/blog/assets/imgs/dependency_ioc.png"/></td>
  </tr>
</table>

All of the concepts are nicely underlined with proper examples.

### JavaScript and Client-Side Templating Techniques
For the sake of completeness, the book also enters into the (now more and more popular) client-side JavaScript development techniques. As such it treats topics like

- client-side validation with jQuery Validation
- client-side template engines (using the very popular Mustache engine)
- responding to ajax requests (with JSON)
- custom JSON model binder
- JSONP and how to add support for ASP.net MVC controllers
- CORS

It also mentions a [lessons learned](http://juristr.com/blog/2012/10/lessions-learned-dont-expose-ef-entities-to-the-client-directly/) which I experienced by myself:

> The other major drawback to working with complex objects is that they may be heavy or challenging to work with via JavaScript. A good practice to help avoid these challenges is to create a special, lightweight version of the entity called a data transfer object (DTO) that is more easily converted into JSON.

### Quality Control
The quality control part goes into the details for constructing a proper **logging system** by describing on how to catch exceptions in an MVC environment, how to signal the user what happened up to building up a health monitoring system. It then enters into the topic of **automated testing**, mentioning the kind of automated tests (Unit, Integration, Acceptance Tests), and their corresponding characteristics. Nice examples are also provided on how to test an ASP.net MVC model/controller and how you can keep your tests clean by factoring out duplicated code.
The chapter concludes by describing on how to setup a fully functional **automated build environment** with TFS.

## Conclusion and Résumé
There's a lot more in the book than I could write here. It also talks about the new **Web Api**, about **security topics**, **caching** as well as **advanced data access** patterns. I really couldn't imagine anything that has been left out right now.  
That said, I guess by reading this post you should now have quite a good knowledge about whether this book is for you as well as how deep your knowledge is by reading through some of the buzz-words I mentioned. Personally I can really just suggest it to every .Net web developer as it treats all of the currently actual topics in a very detailed, clear and understandable manner.

(Also do not miss the appendix on "Best Practices"!)

[![](http://cdn.oreilly.com/bloggers/blogger-review-badge-200.png)](http://oreilly.com/bloggers/?cmp=ex-orm-blgr-juri-strumpflohner)

[1]: http://msdn.microsoft.com/en-us/library/system.web.mvc.dependencyresolver\(v=vs.98\).aspx
