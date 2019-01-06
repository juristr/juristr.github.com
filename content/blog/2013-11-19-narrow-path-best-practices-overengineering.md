---
title: The narrow path between best practices and over-engineering
show_img_in_detail: true
coverimage: true
category: null
categories:
  - Software Design
reposts:
  - 'http://java.dzone.com/articles/narrow-path-between-best'
date: 2013-11-19T01:00:00.000Z
comments: true
url: /blog/2013/11/narrow-path-best-practices-overengineering
type: post
image: /blog/assets/imgs/darth-vader.jpeg
---

A couple of days ago I read a post by Petri Kainulainen about [The Dark Side of Best Practices](http://www.petrikainulainen.net/software-development/processes/the-dark-side-of-best-practices/). He really hit what - IMHO - on the one side should be totally obvious and common sense, but sadly, too often is not the case at all..

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

I can already hear some people out there: well, but if we design everything to be reused from the very beginning, then we're much more flexible. Fair enough, but designing something to be reused out of the box means to have increased costs during production. But is that justifiable?? Is it fair to have the customer pay for something that may never actually happen? Methods like Agile, TDD approaches and Lean Software Development on the other side opt for implementing just enough.  
Obviously you do follow common sense in application design like separating business logic from data access or presentation code and you do separate and isolate dependencies to make it easier to exchange and test them etc..

## So what should we do then?

We should know best practices, their pros and cons and from case to case decide on whether to apply them and/or understand when when we (and the customer) is better served to take another road. There simply is no **one to rule them all** approach, it doesn't exist, in particular not in a that extremely moving and changing sector like the IT one is.

We need to keep innovating which is only possible when we allow ourselfs to **exit our usual scheme of taking decisions** by trying to look at our solution from a more distant, objective point of view. From now and then, challenge your usual approach; is there a better one? How do others solve similar situations, learn from them? **Innovation needs to emerge from the team**, from where production takes place and cannot be done in a separate, independent lab. There is too much risk of waste.

Finally, architects should be more of a leader, a lead dev, a "[coaching architect](/blog/2013/02/the-coaching-architect/)" supporting the team in such decision making, in the process of innovating and for keeping them productive and efficient. Moreover they should create connections and facilitate the knowledge sharing process among different projects and teams.

**References**

- [The dark side of best practices](http://www.petrikainulainen.net/software-development/processes/the-dark-side-of-best-practices/)
