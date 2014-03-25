---
layout: post
title: "QCon London 2014 - Embracing Change - Building Adaptable Software with Events"
lead: "What I got from this year's QCon"
postimg: "/blog/assets/imgs/london-eye-big-ben-bg.jpg"
show_img_in_detail: true
coverimage: true
category:
tags: []
---

Intro ...

On Tuesday, Russell Miles ([@russmiles](https://twitter.com/russmiles)) talked about building [#antifragilesoftware](https://twitter.com/search?q=%23antifragilesoftware&src=typd). According to Russ it's not that people are creating bad software because they are not intelligent enough to build good one, it's because **they do not know what they have to think about at certain points during development**, what parts of the software are most critical and when they have to be particularly cautious. 

What usually struggles people most during development are..

- people & skills
- to deliver value
- reinventing the wheels (no reuse)
- maintainable code
- overengineering
- bored with business problem and instead want fun, trying something new (-> reinventing the wheels ;) )
- integration with other software
- ...

These points can basically can be distilled into

- building the right software (or not)
- building the right software right

> **The elephant in the standup:** [...] in an agile project, ...usually in sprint 10 the product owner enters the room with an apparently "small" change that'll screw up your entire code base. <cite>Russ Miles</cite>

The problem is that all the decisions that have been taken in previous sprint planning and/or stand-ups are the enemy of future modifications and thus allocate to the "elephant".

![](/blog/assets/imgs/elephant-standup.png)

Thus, you need to embrace changes, you need to find strategies for building a system that is able to react and adapt and which is _antifragile_ to such problems that usually come along.

> Simplicity is a balancing effect. You can run into oversimplification as well, which you get when your "simple" code doesn't deliver any value to the customer.

When talking about simplicity, Russ points out that you should be able to read and understand the codebase by scanning the class hierarchy and by reading/executing the tests as they show the intention of the software developer: **you cannot have simple code without tests**.

If you're about to build a robust system, the first thing you're looking for is what kind of coupling you have in your software:

- interface/contract sharing
- inheritance
- method names and return types
- method parameters and ordering
- programming language
- exceptions that are being thrown and caught
- annotations (which are currently quite popular in modern programming languages)
- ...

> The key is to understand the pace with with the different parts of the software need to evolve.

As such it is important to gain a view on the architectural design that helps to group things together that are intended to change together and usually have similar responsibilities. On the other side we **need to decouple those areas that change at a different rate**.

But watch out, **nothing can increase complexity faster than by decoupling it (by means of events) if you do not know what you're doing**. Therefore, don't jump straight in, (other than most people belief) there is no one-size-fits-all solution. Don't apply the "decoupling hammer"!  
Instead, start with the lowest possible decoupling like using simple programming interfaces (in the sense of a C#/Java programming construct). Then evolve the decoupling when needed. Possible levels could be:

- Programming interface
- Events
- Message Bus
- Microservices
- ...

## How does this impact my architecture?

From an architectural point of view you basically start with (what Russ called) a "pizza-box architecture" _(forgive the colors, but I'm currently trying out Evernote's hand drawing feature and Skitch)_:

<figure>
  <img src="/blog/assets/imgs/pizzabox-architecture.png" />
  <figcaption>The classical three-layer diagram</figcaption>
</figure>

Each area is nicely separated and decoupled through interfaces, probably with some dependency injection mechanism which automagically wires the implementation and the interfaces together. (That usually makes testing easier as well.)

> The audience of your code is both, the machine and the human. <cite>Russ Miles</cite>

In order to be able to switch the next level of decoupling you first have to identify the problematic spots of our pizza-box architecture. Assuming you already separate the layers through interfaces, then normally the **transversal parts of the classical three layer architecture are the most problematic ones**, as for instance the domain objects. Domain objects touching every area blur the boundaries between layers, which is usually bad. Often they have more annotations than actual code and are tightly connected to the used ORM mapper or framework being used.

<figure>
  <img src="/blog/assets/imgs/pizzabox-architecture-coupling.png" />
  <figcaption>Entities create a strong coupling</figcaption>
</figure>

What happens if you change the database table?? You need to change the entities which impacts on your data access layer (probably), your business layer and even your frontend layer where you (most probably) directly use the domain objects for the UI logic. I experienced these problems by myself when we switched to creating rich client JavaScript apps with a REST layer at the backend. Our initial "naive" to expose the [the Entity Framework entities directly to the JavaScript client](/blog/2012/10/lessions-learned-dont-expose-ef-entities-to-the-client-directly/) isn't so ideal in the end. So we ended up with some DTOs on the REST interface side which decouples it from changes on the DB and domain entities.

<figure>
  <img src="/blog/assets/imgs/pizzabox-architecture-dtos.png" />
  <figcaption>Slight decoupling of the REST entities with DTOs</figcaption>
</figure>

When you go further, Russell suggested to change the visual approach of drawing the architecture diagram from boxes to a circle, where the real **BL** is in the **core** of the circle. All of the components that interact with the core are **integrations with the outside world** which are drawn in a second outer circle. So our diagram from before might look like this:

<figure>
  <img src="/blog/assets/imgs/pie-architecture.png" />
  <figcaption>Further decoupling</figcaption>
</figure>

Even the DB is seen as an integration point because it _happens to be_ the interface where we (currently) store and read the application data (a challenging view for many of us which might see the DB in the center of an application). Tomorrow it might not be a local DB but some remote service, who knows.., the scope is to remain flexible and open to changes. Remember, the elephant!

<div class="interview">
<p>
  <span class="label label-default">Q:</span> But where are the entities now??
</p>
<p>
  <span class="label label-primary">A:</span> They're are being replicated among the different areas.
</p>
<p>
<span class="label label-default">Q:</span> You do what?? Duplication is evil! You should know about the DRY principle, don't you?
</p>
<p>
<span class="label label-primary">A:</span> High coupling is evil as well...what's worse?? Depends mostly on your situation..
</p>
<p>
<span class="label label-default">Q:</span> So you're saying I should duplicate the code among the areas rather than sharing it?
</p>
<p>
<span class="label label-primary">A:</span> If you need to decouple areas from each other, then yes! Duplication among areas is fine whereas it is definitely evil when being done within areas!
</p>
</div>

For integrating the different areas we have to have some mechanism that allows our data to flow across them.

- **Adapters** - ..and mappers that convert between the entities of the different areas.
- **strings** - ..which are probably the loosest coupling we can create, right? A string can contain anything from a simple value, a CSV series to a fully structured object graph serialized in JSON (for instance). You might want to pass your data as strings between the areas rather than strongly typed objects.
- **Event Bus** - maybe..(for instance: http://stackoverflow.com/questions/368265/a-simple-event-bus-for-net)

Unfortunately Russ didn't enter the decoupling with events argument too much. Thus I acquired his book about ["Antifragile Software"](https://leanpub.com/antifragilesoftware) - which is currently in alpha state - but already contains sections targeting the topic. So I'm looking forward to it being delivered..

## Conclusion

This kind of architectural proposal is (btw) nothing new at all, they're called hexagonal architectures and you find plenty explanations on the web:

- [http://alistair.cockburn.us/Hexagonal+architecture]()
- [http://blog.8thlight.com/uncle-bob/2012/08/13/the-clean-architecture.html]()

<blockquote class="twitter-tweet" lang="en"><p>seems like <a href="https://twitter.com/russmiles">@russmiles</a> goes in the direction of an &quot;onion arch&quot; I was trying to get around a couple of month ago <a href="https://t.co/O1GlUrQn0q">https://t.co/O1GlUrQn0q</a></p>&mdash; Juri Strumpflohner (@juristr) <a href="https://twitter.com/juristr/statuses/440801487065579520">March 4, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Again, to emphasize, **you only go as far with the decoupling as you need**. Don't use the "decoupling hammer" on all of your projects, just know your options and apply them when you need to.
