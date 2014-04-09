---
layout: post
title: "QCon London 2014 - Embracing Change - Building Adaptable Software with Events"
lead: "My takeaways from the building adaptable software with events training"
postimg: "/blog/assets/imgs/london-eye-big-ben-bg.jpg"
show_img_in_detail: true
coverimage: false
category:
tags: ["Software Architecture"]
---

Building adaptable software is what we continuously aim at achieving during our day to day work. However, at the same time, it's probably the hardest part in software development. Everybody of us already had that moment when your customer/project manager proposes you that new "easy" feature, that makes your hackles get up because you know it's gonna be a nightmare to implement add it. Simply because your previous (apparently reasonable and well-thought) decisions hinder you. At this year's [QCon london](http://qconlondon.com/london-2014/presentations/show_presentation.jsp?oid=5900), [@russmiles](https://twitter.com/russmiles) aimed to address this problem. This post summarizes what I got from his tutorial.

In his training session "Embracing Change: Building Adaptable Software with Events", Russell Miles ([@russmiles](https://twitter.com/russmiles)) talked about building [#antifragilesoftware](https://twitter.com/search?q=%23antifragilesoftware&src=typd). According to him, it's not that people are creating bad software because they are not intelligent enough to build good one, it's because **they do not know what they have to think about at certain points during the development**, about what parts of the software are most critical and when they have to be particularly cautious. They simply don't have the right questions at hand.

What usually struggles people most when developing a piece of software are..

- people & skills
- to deliver value
- reinventing the wheels (no reuse)
- maintainable code
- overengineering
- bored with business problem and instead want fun, trying something new (-> reinventing the wheels ;) )
- integration with other software
- where to place which application logic
- ...

These points can basically can be distilled into

- building the right software (or not)
- building the right software right

> **The elephant in the standup:** [...] in an agile project, ...usually in sprint 10 the product owner enters the room with an apparently "small" change that'll screw up your entire code base. <cite>Russ Miles</cite>

The problem is that all the decisions that have been taken in previous sprint plannings and/or stand-ups, are the enemy of future modifications and thus allocate to the so-called "elephant".

<<figure>
  <img src="/blog/assets/imgs/elephant-standup.png" />
  <figcaption>Russ presenting the "elephant" during his talk</figcaption>
</figure>

Thus, you need to embrace changes, you need to find strategies for building a system that is able to react and adapt, which is _antifragile_ to such problems that usually come along.

> Simplicity is a balancing effect. You can run into oversimplification as well, which you get when your "simple" code doesn't deliver any value to the customer.

Simplicity in the code base is when you can read and understand it by scanning through the class hierarchy and by reading/executing its tests, so Russ, "**you cannot have simple code without tests**".

## Coupling is your enemy

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

In order to understand the pace of evolution, it is important to gain a view on the architectural design, that helps to group things together that are intended to change together and usually have similar responsibilities. On the other side we **need to decouple those areas that change at a different rate**.

But watch out, **nothing can increase complexity faster than by decoupling it, if you do not know what you're doing**. Therefore, don't jump straight in! Other than many people belief, there is no one-size-fits-all solution. Don't apply the "decoupling hammer"!  
Instead, start with the lowest possible decoupling like using simple programming interfaces (in the sense of a C#/Java programming construct). Then evolve the decoupling when needed. Possible levels could be:

- Programming interface
- Events
- Message Bus
- Microservices

## How does this impact my architecture?

From an architectural point of view you basically start with (what Russ called) a "pizza-box architecture" _(forgive the colors, but I'm currently trying out Evernote's hand drawing feature and Skitch)_:

<figure>
  <img src="/blog/assets/imgs/pizzabox-architecture.png" />
  <figcaption>The classical three-layer diagram</figcaption>
</figure>

Each area is nicely separated and decoupled through interfaces, probably with some dependency injection mechanism which automagically wires the implementation and the interfaces together. This kind of organization imposes a nice structure and makes testing quite easy. It doesn't help against the elephant yet, though.

> The audience of your code is both, the machine and the human. <cite>Russ Miles</cite>

In order to be able to switch the next level of decoupling, you first have to identify the problematic spots of our pizza-box architecture. Where is the coupling? What happens if one area needs to change, which ones will I be forced to adapt?  
Assuming you already separate the layers through interfaces, then normally the **transversal parts of the classical three layer architecture are the most problematic ones**. For instance the domain objects or domain entities. They are touching every area and thus blur the boundaries between the layers, which might be bad when you want to decouple things. Also watch out for annotations, typically from your ORM. They cause coupling as well!

<figure>
  <img src="/blog/assets/imgs/pizzabox-architecture-coupling.png" />
  <figcaption>Entities create a strong coupling</figcaption>
</figure>

Take for instance what happens if you change the database table?? You need to change the entities, which impacts on your data access layer (probably), your business layer and even your frontend layer where you (most probably) directly use the domain objects for the UI logic. I experienced these problems by myself when we switched to creating rich client JavaScript apps with a REST layer at the backend. Our initial "naive" approach to expose the [the Entity Framework entities directly to the JavaScript client](/blog/2012/10/lessions-learned-dont-expose-ef-entities-to-the-client-directly/) isn't so ideal in the end. So we ended up with some DTOs on the REST interface side which decouples it from changes on the domain entities.

<figure>
  <img src="/blog/assets/imgs/pizzabox-architecture-dtos.png" />
  <figcaption>Slight decoupling of the REST entities with DTOs</figcaption>
</figure>

Going forward, we started to build what Russ calls the **"Life preserver"**. In a first step this means reorganizing our pizza-box diagram into a circle, a cellular structure basically where the core, our busines logic, resides in the middle. All of the components that interact with this core are **integrations with the outside world**, which are drawn in a second outer circle. As such, our diagram from before might look like this:

<figure>
  <img src="/blog/assets/imgs/pie-architecture.png" />
  <figcaption>Further decoupling</figcaption>
</figure>

Note that even the DB is seen as an integration point because it _happens to be_ the kind of interface where we (currently) store and read the application data. This is a particularly challenging point of view for many developers and architects as they often place the DB in the center of the software. But if you think it further it sounds natural. Tomorrow, it might not be any more a local DB but some remote service where (part of) the data goes to, who knows... The scope is to remain flexible and open to changes. Remember, the elephant!?

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
    <span class="label label-primary">A:</span> Sure, but as we've seen, high coupling is evil as well...what's worse??
  </p>
  <p>
    <span class="label label-default">Q:</span> So you're saying I should duplicate the code among the areas rather than sharing it?
  </p>
  <p>
    <span class="label label-primary">A:</span> If you need to decouple areas from each other, then yes! Duplication among areas is fine whereas it is definitely evil when being done within areas!
  </p>
</div>

For integrating the different areas we have to have some mechanism that allows our data to flow across them. Possibilities are:

- **Adapters** - ..and mappers that convert between the entities of the different areas.
- **strings** - as a data exchange format rather than fully typed objects. They are probably the loosest coupling we can create, right? A string can contain anything from a simple value, a CSV series to a fully structured object graph serialized in JSON (for instance). You might want to pass your data as strings between the areas rather than strongly typed objects.
- **Event Bus** - maybe..(for instance: http://stackoverflow.com/questions/368265/a-simple-event-bus-for-net)

Unfortunately there wasn't enough time to further elaborate on these things during the training session at QCon. He is working on a Leanpub book though (currently in alpha) which aims at outlining these concepts in more detail: ["Antifragile Software"](https://leanpub.com/antifragilesoftware).

## Conclusion

This kind of architectural outlining isn't totally new. They're called hexagonal architectures and you find plenty explanations on the web:

- [http://alistair.cockburn.us/Hexagonal+architecture](http://alistair.cockburn.us/Hexagonal+architecture)
- [http://blog.8thlight.com/uncle-bob/2012/08/13/the-clean-architecture.html](http://blog.8thlight.com/uncle-bob/2012/08/13/the-clean-architecture.html)

As my tweet mentions,..

<blockquote class="twitter-tweet" lang="en"><p>seems like <a href="https://twitter.com/russmiles">@russmiles</a> goes in the direction of an &quot;onion arch&quot; I was trying to get around a couple of month ago <a href="https://t.co/O1GlUrQn0q">https://t.co/O1GlUrQn0q</a></p>&mdash; Juri Strumpflohner (@juristr) <a href="https://twitter.com/juristr/statuses/440801487065579520">March 4, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

..I started to think about them a while back, but didn't go much ahead due to other stuff that came into my way. My thoughts, trials and reference information so far are [on GitHub](https://github.com/juristr/codehacks/tree/master/architecture/CleanArchitecture). However note that especially the code part there is no more up-to-date and should not be taken as a reference. My idea would be to try to implement these aspects in a sample application once I have a bit of time available.

If you're interested, Uncle Bob Martin enters quite into the details about hexagonal architectures [in his blog post](http://blog.8thlight.com/uncle-bob/2012/08/13/the-clean-architecture.html). There's also a [Youtube talk available](https://www.youtube.com/watch?v=WpkDN78P884) where he outlines his ideas.

So my takeaways:

- only go as far with the decoupling as you really need
- decoupling means increased complexity but higher maintainability; find the right balance for you
- don't decouple all the time, there is no one-size-fits-all solution but you need to know the concepts and apply them at the correct level, at the right moment, when the situation requires it.
- the hexagonal architectures or "life preserver" approach facilitates an architectural view and thinking which is more focused on aspects of change and speed of evolution of your software

I'll keep an eye on this, so there's more to come...