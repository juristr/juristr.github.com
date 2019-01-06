---
title: The Coaching Architect
description: ''
category: null
categories:
  - Software Design
tags:
  - Tech vids
  - coaching
date: 2013-02-12T01:00:00.000Z
comments: true
url: /blog/2013/02/the-coaching-architect
type: post
image: /blog/assets/imgs/thecoachingarchitect.png
---

In this talk, [Roy Osherove](https://twitter.com/RoyOsherove) speaks about how to become a better coach. A nice talk highlighting some of my personal principles I try to follow every day. Coaching others is a nice thing if you like it, but it also needs to be learned.

<p> </p>
<iframe width="750" height="500" src="http://www.youtube.com/embed/uvwW_CRmWmo" frameborder="0" allowfullscreen="true"> </iframe>

### TL;DR
Ok..., so [jump here](#conclusion) then.

## Talk Notes

Here are my notes I took during the talk.

### Problem

- for some people, the definition of an architect is to make things right, to make sure everything goes well; to do things in the best way possible
- lot of architects fail because they cannot get their message across
- architect is a type of leader (in the area of design, architecture,...)
- wishes (feeling they'll never come true): that team does practice TDD,...
- 

### You are the Bottleneck

- leader: one that is a bottleneck; a person to ask, to get answers
- being an architect makes you by definition a bottleneck
- problem: you never have time to learn new things, to create new stuff because you have become a bottleneck
- if you're asked to create a framework, don't do it if not absolutely needed. Instead, try to teach devs how to do it s.t. they get more independent. Otherwise you create another layer of ice between your mates
- Wrong: "I'm the only one that can do it/knows how to do it"

### Role of a leader

- make yourself unneeded (to remove yourself as bottleneck)
- create people around you with your knowledge, don't just be someone that provides guidance
- if you work with a team and after your work they didn't learn anything new, you failed, you missed the point of why you're there, what you get paid for
- grow the team that you have into the **team you want to have**
- creating a self-organizing team, doesn't mean you get fired 'cause you're no more needed:

> By growing others to not need you, you will always be wanted, appreciated and highly valuable.

### Leadership is tough

- "I want it to solve it yourself"; this doesn't mean you're not doing your job, on the contrary, you're teaching them how to solve it on their own, hence, you help them to grow and get better
- coach them to learn, otherwise they'll always come back to you and ask for that solution

### How to grow people - Learning

Observations have shown that there are periods of slow learning followed by periods of very quick learning. The reason for such **ravines before the fast growth** are because we first need to "unlearn" what we knew before in order to be able to acquire new knowledge and try something new. For example:

- when switching programming language: initially stupid, but then - knowing different programming languages - you know different kind of patterns, different viewpoints which make you more productive; teach you to think about a problem from various angles
- when starting with TDD. Initially you're awfully slow and you seem to not move ahead. But once you got it, your performance and quality of code will increase drammatically.

> To grow the team, we must first realize we can do this ourselves.

Mentoring others needs to be learned...in fact, it might be uncomfortable initially. But in the end, the process of mentoring is a learning process for both, the mentor and the coached person.

### Time

Common symptoms: Others will do the task much slower than myself

> The key is to make time.

There are different kind of modes

- **survival mode -** most teams are here; there is never time, to learn or practice new things; not to do TDD, not to write unit tests etc...this is a self-perpetuating mode: since you never have time to do TDD, you don't write unit tests and hence your code quality will drammatically reduce, introducing new bugs which again take time to fix etc...
- **learning mode -** having enough time to learn and practice new things and actually using that time properly. _That's the stage where you can be a coach._  
  Make time: increase tasks by at least 50% in order to create space to practice something new (i.e. Unit Testing).
- **self-organizing mode -** when doing enough learning, people will start solving their own problems and hence get "self-organizing".

### Triangle of Quality

Goal is to not only have two of them, but all three: features, time and quality.

Again, same rule, try to avoid being the bottleneck. You'll never be able to review all the code of your peers and as such, you have to teach them how to do it by themselves (shared code ownership).

How do we lose quality? Dilemma:

1. Write tests, or get it done? Answer: Let it fix quickly and get the thing done. Feeling = good
1. Another thing happening? Again, write tests or get done?? Last time? -> fix quickly -> so continue that way; Feeling = good; Result: year later: code sucks

But, "the project is going to take 3 weeks without unit tests and 4 weeks with unit tests..."  
There is **no** choice, this **is the way things are done**. It's the same as saying "the car costs $20,000 without wheels and $30,000 with them".  
**Stand up for the values you believe you're right.**

### Understand why behaviors don't work

> For each behavior, The world is perfectly designed for that behavior to happen (Influencer - the power to change anything)

There are different reasons why people may not follow certain behaviors.

1. Personal
  - Motivation
  - Ability
1. Social
  - Motivation
  - Ability
1. Environmental
  - Motivation
  - Ability

**Social motivation** are the people that draw you into a certain action. This is strongly related to group membership. As such, creating a support group might be helpful in convincing people to acquire certain behaviors (like doing TDD).

**Environmental ability** define the infrastructure around you, i.e. having an automated build server that executes the test you write in the process of performing TDD.  
**Environmental motivation** on the other hand is strongly related to rewards. For instance, people might get rewarded for being able to quickly ship a task. As such, others, writing unit tests and thus shipping a bit more slowly, might get the feeling that their work isn't  As such, doing a good job by writing automated tests for your code seem not to be appreciated.

### Common Language

The words we use when we promise something. Saying what you want to do, meaning it and to actually make it true.

**Bad**

- We need...
- I could...
- Why doesn't someone...

All of them give you a way out, a "permission" to not do it.

**Better**

- I will...by...

This creates a commitment of something real. Moreover if people have a problem saying it, you'll immediately know there might be problems (due to time constraints or whatever). So you can react on that. It helps to raise problems that might exist inside a team.

But attention, you can make people to **only commit to things that are under their own control**.

## Conclusion

**Don't be a bottleneck**, **coach** the people around you. When people come to you about a problem, challenge them in order to help them learn and grow: "What are you going to do about it?"

**Know how learning works** and how you can **allocate time** in order to create spaces for learning and for moving people out of "survival mode" into "learning mode".

Consider also potential problems that hinder the adopton of new practivces and their potential **personal, social or environmental barriers**.

Also employ **common language** which leads to more clear commitments.
