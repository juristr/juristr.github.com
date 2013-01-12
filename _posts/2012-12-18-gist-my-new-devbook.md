---
layout: post
title: "Gist: My New Devbook"
description: ""
category: 
tags: [Projects]
reposts: ["http://java.dzone.com/articles/gist-my-new-devbook"]
---
{% include JB/setup %}

I always had the idea of having some kind of organized store, some kind of very simple knowledge base where I could memorize interesting stuff around software development which I encounter i my day-to-day business. A wiki wasn't suitable as it should be centered mainly around code, but still you should have the possiblity to add your text-based notes or a collection of links.

## Code Notebook aka Devbook was born
When I started with my studies at the university about 7 years ago, we learned Java from ground up. And to be honest it was the first real programming language I learned, with all its concepts around object oriented programming and so on. Even though I had already created my personal utilities with VB and VBA at that time...That was when I started **Code Notebook**, a project to incorporate my need to store my code snippets and at the same time a very nice project for being able to directly apply the learned stuff.

<figure>
    <img src="/blog/assets/imgs/codenotebookjava.png">
    <figcaption>1st version of Devbook, my 1st Java Swing client</figcaption>
</figure>

It was a Java Swing desktop client which at that time was based on a MS Access DB. The latter turned out to be one of the biggest limitations, but hey...it worked for me at that time, and we haven't been introduced to "real" DBs at that time. But it had already some cool features like

- real time search
- starring
- labelling of items for easy organization of codes
- generation of a set of static HTML pages out of "public" snippets which could then be easily put on a webserver for sharing with others
- ...

### Eclipse RCP Clients
Then there came the time for [Eclipse and its RCP platform](/blog/tags/index.html#RCP) and [everything related to it](/blog/tags/#jFace). That port of Code Notebook to Eclipse was purely experimental and all-in-all a playground for me to experiment with the RCP platform. From an architectural point of view an amazing construct with its plugin architecture and decoupled messaging system. From a programming perspective...puh...a steep learning curve!

### The Fascination for Rich Web Clients
Code Notebook worked just great and I used it a whole lot. But then came the time when I got fascinated for the web and the possibility to create rich client (GMail-like) web applications. I started to play around with GWT and it was when [Devbook](http://www.mydevbook.com/), the evolution of Code Notebook for the web, was born.

<figure>
    <a href="/blog/assets/imgs/devbook_list.png"><img src="/blog/assets/imgs/devbook_list.png" width="50%"></a>
    <a href="/blog/assets/imgs/devbook_detail.png"><img src="/blog/assets/imgs/devbook_detail.png" width="50%"></a>
    <figcaption>Devbook - a web based rich client powered by GWT and App Engine</figcaption>
</figure>

The client was written in GWT and hosted on Google App Engine. That was also the time when [my series of posts](/blog/tags/#GWT) about it emerged on my blog, [some of which turned out to be a real success](/blog/2010/03/gwt-button-with-image-and-text/) (based on the number of visitors).

Unfortunately Devbook mainly remained an experimental project. I heavily used it for my personal needs, but due to time constraints (at university/work) I never really opened it up, but it remained in - what you could call - private beta.

## GitHub Gists
[GitHub Gists](https://gist.github.com) have existed already for a while and I also used them occasionally. But so far it never seemed quite complete in what it offered. A couple of days ago, GitHub [announced a new release of Gist, a complete rewrite](https://github.com/blog/1276-welcome-to-a-new-gist).

![](https://f.cloud.github.com/assets/2/4907/259773c0-432e-11e2-869a-1da894bf0bd0.png)

At it looks awesome in my opinion. It really incorporates now many things I've always wanted and which in part I already implemented in the Devbook GWT client: it is centered around code (having a fully functional git repo under each gist), it has social features (sharing with others through commenting) and it is also flexible enough to not only place code, but also simply textual information (in the form of markdown gists).  
But read it yourself on [their blog post](https://github.com/blog/1276-welcome-to-a-new-gist).

## Looking Back
That said, I guess **Devbook** is now really obsolete. So far I never found a valuable alternative that really met my needs, but now I guess I've found it. We'll see. **So was it a waste of time, given that it never really went online?** Absolutely not. Looking back it was an awesome learning experience:

**Code Notebook**  
- Java programming
- experimenting with MVC like code architectures on top of Java Swing
- customization of standard library Swing lists (see the snippet list)

**Code Notebook RCP**
- Eclipse RCP platform
- plugin architectures and decoupling possibilities

**Devbook GWT**
- Google Web Toolkit and the Google App Engine cloud platform
- Spring Web framework
- Hibernate (together with GAEs data store)
- generally, developing rich ajax clients

So, enjoy Gist and keep sharing code!