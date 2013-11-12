---
layout: post
title: "When Best Practices go into your way"
postimg: "/blog/assets/imgs/darth-vader.jpeg"
show_img_in_detail: true
coverimage: true
category: 
tags: ["Software Design", "Software Architecture", "Best Practices"]
---

Today I read a post by Petri Kainulainen about [The Dark Side of Best Practices](http://www.petrikainulainen.net/software-development/processes/the-dark-side-of-best-practices/). He really hit what - IMHO - on the one side should be totally obvious and common sense, but sadly, too often is not the case at all..

Don't get me wrong. **Best practices are a vital part of software development** and I am a big proponent of them. Every developer should have read books like the Design Patterns from the Gang of Four, Fowlers Refactoring or Patterns of Enterprise Architecture. I am a big believer in automated testing and TDD approach as they give you flexibility to change over time.  
But the key is that you **really have to understand** them. Just as Petri writes, there is a dark side as well, especially when they are being treated as a **silver bullet**.

> When best practices are treated as a final solution, questioning them is not allowed. \[...\]  
> This means that we lose the opportunity to learn and improve the current situation. \[...\]  
> This would be a valid strategy if we would live in a static world. \[...\] all know that new technologies are emerging in a rapid pace. Are we sure that we want to be left behind? <cite>From Petri Kainulainen's blog</cite>

What many software engineers often forget, is what we are here for after all: to **serve** the customer's need; to automate complex operations and to **facilitate, not complicate,** his life. Obviously we are the technicians and we therefore need to do our best to avoid technical deadlocks, cost explosions etc. But we are not here to create the architectures of our dreams or frameworks (unless that's our core business). Too often I have the feeling that we would be better served to invest our time in more intuitive, damn simple user interfaces rather than comples backend architectures.

> Sometimes best practices cause a situation where concepts like architecture, design patterns and reuse are valued above all else. 

Over-engineering is another common symptom...

> It is amazing how complicated software can be when it is designed by a team of architects.

As Petri writes, this is due to a lack in understanding between a reusable component and an application (and I can just quietly agree..)

> This situation is caused by the inability to understand the difference of a a reusable component (framework, library, or service) and an application.

As he writes: this difference is clear:

- When we are creating a reusable component, we have to design it to be reused.
- When we are creating an application, we have to concentrate on the requirements of that application.

> It makes no sense to over engineer a piece of code which might never be reused. And yet, this is what happens if we think that we should use the same design principles in every situation.

## So what should we do then?

I'm working as - what they call - architect, but I like to see myself more as a "[coaching architect](/blog/2013/02/the-coaching-architect/)" because that's what we (architects) should really be here for. From my point of view we are here to help devs solve tough technical problems or discuss architectural decisions, trying to help them avoid deadlock situations and we share knowledge among different projects as we jump around between different projects: _Hey..as far as I know that other guy had a similar problem in his project. Connect with him to find out whether his solution might suit your situation as well._  
An architect should be more of a lead dev..

So for the architects: don't create huge, bloated frameworks, trying to impose your architecture of dreams. Instead help your audience **understand** how to build and implement the architecture. This will help enourmously to keep the pace with technological innovation.  
For the devs: keep curious and try to **understand** what you're using and implementing.

**References**

- [The dark side of best practices](http://www.petrikainulainen.net/software-development/processes/the-dark-side-of-best-practices/)
