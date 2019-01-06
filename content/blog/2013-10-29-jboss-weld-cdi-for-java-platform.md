---
title: JBoss Weld CDI for Java Platform
show_img_in_detail: true
coverimage: true
category: null
categories:
  - Java
  - book review
reposts:
  - 'http://java.dzone.com/articles/jboss-weld-cdi-java-platform'
date: 2013-10-29T01:00:00.000Z
comments: true
url: /blog/2013/10/jboss-weld-cdi-for-java-platform
type: post
image: /blog/assets/imgs/jboss-weld-book-cover.png
---

CDI stands for Context and Dependency Injection and is the standardization of the process of dependency injection for Java EE. This article presents some of my comments and observations when reading "JBoss Weld CDI for Java Platform" which covers everything you need to successfully implement the new standard in your Java EE application.

Recently - due to my current job - I mainly deal with the .Net technology stack and JavaScript frontend development. Several years have elapsed when I last hacked on a Java EE setup. At that time it was when I first got in touch with concepts like IoC and aspect-oriented programming style with interceptors using the Spring framework. As such it was particularly interesting to go through a Java book again.

The book setup is very clear and well structured. I like how it slowly introduces you to the concept of beans and then quite quickly dives into the topic, first giving you a rough overview of the entire platform before then each chapter gets straight down to the nitty gritty of the different concepts. Lots of detailed code samples contribute to further clarifications.

![](/blog/assets/imgs/cdiweldbook.jpg)

Chapter 2, which is dedicated to the IoC mechanism and its implementation in Weld CDI, presents some interesting concepts such as _Client proxies_ which allow that even though an application-scoped bean `ApplicationBean` exists only once per applicaton you still get a different instance on each request for its request-scoped dependency `bean`.

    @RequestScoped
    public class RequestBean {
        ... 
    }
   
    @ApplicationScoped
    public class ApplicationBean {
        @Inject
        RequestBean bean;   
    }

While I didn't (yet) setup Weld by myself on my workstation, chapter 3 should be of a help as it describes the correct setup using a variety of containers like JBoss, Glassfish or Apache Tomcat.  
The subsequent chapters target each of the core concepts in a more detailed way like

- Contexts and scopes,
- Producers,
- Interceptors and decorators,
- Events or on
- how to extend CDI with portable extensions.

Finally the last two chapters illustrate the mentioned concepts in the creation of a sample application that features a modern AngularJS based JavaScript frontend with a REST backend.

## Conclusion

To conclude, the book is definitely worth reading if you plan to implement the CDI specification in one of your next JEE projects. It is contains enough details to easily get started, it is clearly written with proper practical code examples and the author has chosen the right pace and amount of information that is presented throughout the chapters.

Unfortunately - due to time constraints - I wasn't yet able to create some setup using Weld by myself. I hope to find some spot to do so as you learn most when you try it out by yourself.  
But apart from this specific book, I always again enjoy to leave my "comfort zone" to learn about new technologies and compare them with what I have already seen in other areas (like .Net, NodeJS) and so should you! Keep yourself open-minded for new stuff!  
Interestingly, for instance, I found lots of similarities between some concepts in Weld CDI and .Net's Managed Extensibility Framework (MEF) and PRISM.

### Links

- [JBoss Weld CDI for Java Platform, Packt Publishing](http://bit.ly/187WCnL)


