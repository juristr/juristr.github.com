---
layout: post
title: "QCon London 2014 - Roundup"
lead: "What I got from this year's QCon"
postimg: "/blog/assets/imgs/sherlockholmes.jpg"
show_img_in_detail: true
coverimage: true
category:
tags: []
---

[Once again](/blog/2012/04/qcon-london-my-personal-recap/) I had the pleasure (thx to [my employer](http://www.siag.it)) to be part of this years [QCon in London](http://qconlondon.com/london-2014). This post serves as a way to summarize my impressions, the take aways and as an "aid to my memory" :).

First of all, I love London! It was actually the third time I was there for about a week and it's always again awesome. And obviously I love QCon, because there are so many high-quality speakers, because of it's international culture, the presence of big and small companies, because of it's "neutrality" and diversity in the presented architectures and technologies. Rarely there are companies or sales people trying to sell you **their architecture, their products** because **they** can help you solve all of your problems. No, there are people like you and me (well, slightly more popular ;)) that tell you their story, how they approached a certain problem, or they simply [talk about their life so far and what they think the future will bring to us](http://www.tbray.org/ongoing/) :)  
At this year's conference I test-drove [Slack](https://slack.com/) by live-streaming my notes from the conference to my colleagues (at home in Italy) in a dedicated a #qcon2014 channel. 

![](/blog/assets/imgs/slack-qcon-notes.png)

Some did take the offer and followed actively, others simply ignored it (which is fine as well). So in this post I'm trying to make some sense out of my chat-monologue..

## Problem Solving and Decision Making in Software Development

On Monday I participated in Linda Rising's talk about the people-aspect in the software development process. The day was split into two parts, in the morning we talked about the problem solving and decision making process about which [I already posted here](/blog/2014/03/decision-making-and-problem-solving/).  
In the afternoon, Linda talked about _Fearless Change: Patterns for Introducing New Ideas_. Introducing new ideas into a corporation is not always quite easy, especially if you're a larger organization (like we currently are ~150 people). 

What I already experienced by myself multiple times during my professional career so far, is that - instead of what you would assume - too often **decisions aren't taken out of a rational process**, where people sit together, thinking about a given problem to deduce a solution to the best of their knowledge. No, it literally boils down to whether "you offered the coffee the day before" or with whom a given person usually goes out for lunch and hence is more confident with. 

Sounds horrible, doesn't it? But that was exactly the message Linda tried to bring to her audience. And if you think about your organization, about certain decisions that have been taken: totally impossible they have been taken as a consequence of a rational process. As such, Linda provided a toolkit, patterns or a framework for introducing new ideas by means of such non-rational techniques like:

<table class="table table-bordered table-striped">
  <tr>
     <th>Pattern</th>
     <th>Description</th>
  </tr>
  <tr>
    <td>Evangelist</td>
    <td>To begin to introduce the new idea into your organization, do everything you can to share your passion for it.</td>
  </tr>
  <tr>
    <td>Brown bag</td>
    <td>Use the time when people normally eat lunch to provide a convenient and relaxed setting for hearing about the new idea.</td>
  </tr>
  <tr>
     <td>...</td>
     <td>...</td>
  </tr>
</table>

These are just some of a series of [fearless change patterns](http://fearlesschangepatterns.com/).

## Embracing Change: Building Adaptable Software with Events

On Tuesday, Russell Miles ([@russmiles](https://twitter.com/russmiles)) talked about building [#antifragilesoftware](https://twitter.com/search?q=%23antifragilesoftware&src=typd). According to Russ it's not that people are creating bad software because they are not intelligent enough to build good one, it's because **they do not know what they have to think about at certain points during development**, where they have to be cautions and what are potentially critical points. What usually struggles people most during development are..

- people & skills
- to deliver value
- reinventing the wheels (no reuse)
- maintainable code
- overengineering
- bored with business problem and instead want fun, trying something new (-> reinventing the wheels ;) )
- integration with other software
- ...

It basically can be distilled into

- building the right software (or not)
- building the right software right

> **The elephant in the standup:** [...] in an agile project, ...usually in sprint 10 the product owner enters the room with an apparently "small" change that'll screw up your entire code base. <cite>Russ Miles</cite>

The problem is that all the decisions that have been taken in previous sprint planning and/or stand-ups are the enemy of future modifications and thus allocate to the "elephant".

![](/blog/assets/imgs/elephant-standup.png)

Thus, you need to embrace changes, you need to find strategies for building a system that is able to react and adapt and which is _antifragile_ to such problems that usually come along.

> Simplicity is a balancing effect. You can run into oversimplification as well, which you get when your "simple" code doesn't deliver any value to the customer.

When talking about simplicity, Russ points out that you should be able to read and understand the codebase by scanning the class hierarchy and by reading/executing the tests as they show the intention of the software developer: **you cannot have simple code without tests**.

If you're about to build a robust system, the first thing you're looking for is coupling of different nature:

- interface/contract sharing
- inheritance
- method names and return types
- method parameters and ordering
- programming language
- exceptions that are being thrown and caught
- annotations (which are currently quite popular in modern programming languages)
- ...

The key is to understand the pace with with the different parts of the software need to evolve. As such it is important to gain a view on the architectural design that helps to group things together that are intended to change together and usually have similar responsibilities. On the other side we need to decouple such areas from each other if the rate of change differs.

But watch out, **nothing can increase complexity faster than by decoupling it (by means of events) if you do not know what you're doing**. Therefore don't use events as a starting point but instead, start with the lowest possible decoupling if two areas evolve at the same speed, like a simple "interface" (in the sense of a C#/Java programming construct). Then evolve the decoupling when needed. Possible levels could be:

- Programming interface
- Events
- Message Bus
- Microservices
- ...


