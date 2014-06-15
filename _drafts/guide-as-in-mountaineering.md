---
layout: post
title: "Guide as in Mountaineering"
lead: "About the architect's role and social skills"
show_img_in_detail: true
coverimage: false
category:
tags: []
---

Yes, I happen to deal with architecture, software design and technology. And yes, they define it under the role of the "software architect". I don't like the term, though. It has something arrogant, something snootily, as being better than others. Probably because many so-called software architects behave just like that, sitting in their "ivory tower" to define unreal, ineffective architectures.

Nevertheless, software architecture is important. Simon Brown says that you should be able to positively answer these questions.

- Does your software system have a well defined structure?
- Is everybody on the team implementing features in a consistent way?
- Is there a consistent level of quality across the codebase?
- Is there a shared vision for how the software will be built across the team?
- Does everybody on the team have the necessary amount of technical guidance?
- Is there an appropriate amount of technical leadership?

Software architecture shouldn't be something **one person decides on all the others**. However, there needs to be one person that takes care about it, one who points out potential problems, brings critical aspects into discussion and reminds the team to respect the established guidelines.  
A software architect has to work with the team, be a respected and valuable member of it. As such he needs to be highly communicative and have good social skills. I found those to be the hardest part. Decisions taken together will be supported and enforced by the team, other kind of decisions are just being executed.

## Architectus Reloadus vs. Architectus Oryzus

Martin Fowler really hits my view of the architect's role. I just accidentally came across his article ["Who needs an architect"](http://martinfowler.com/ieeeSoftware/whoNeedsArchitect.pdf). Martin identifies two types of architects.  

There is the _architectus reloadus_ which makes all of the important decisions because he things the team doesn't have the required skills to do so.	They need to be made upfront s.t. everyone else has a plan to follow.

<figure>
	<img src="/blog/assets/imgs/architect-matrix.jpg" />
	<figcaption>Architectus Reloadus. <i>Image source: cyberpunkreview.com</i></figcaption>
</figure>

Then there is the _architectus oryzus_, one that needs to be very aware what's currently going on in the project. He needs to foresee upcoming issues and address them before they become a serious problem.

> When I see an architect like this, the most noticeable part of the work is the intense collaboration. In the morning, the architect programs with a developer, trying to harvest some common locking code. In the afternoon, the architect participates in a requirements session, helping explain to the requirements people the technical consequences of some of their ideas in non-technical terms. <cite>Who needs an Architect by M. Fowler</cite>

This exactly reflects my kind of vision. I love to work in the team, to live the dynamics, the ups and downs. You have to experience the kind of problems that arise. This is extremely valuable feedback that needs to be collected, analyzed, improved and then brought back in s.t. other teams can benefit from it. They key point is to be **a mentor**, to raise the team's level and ability to handle complex situations on their own, thus avoiding to be an architectural bottleneck.

And yes, as an architect, **I do write code, lots of it, in a variety of technologies**. Last week I helped one of my team mates implement some tricky user stories in a .Net based web application, discuss with another one possibilities about how to best implement an application cross-cutting functionality on a Windows WPF app. Then I fixed some critical, unforeseen issues in one of our Java REST service applications that exposes a generic endpoint for sending push notifications to Android and iOS applications; the developer is currently on holiday and the service needs to go online next.  
**Software architects need to be master coders!**

> Guide, as in mountaineering. A guide is a more experienced and skillful team member who teaches other team members to better fend for themselves yet is always there for the really tricky stuff. <cite>Who needs an Architect by M. Fowler</cite>

## Links

- [Martin Fowler - Who needs an Architect](http://martinfowler.com/ieeeSoftware/whoNeedsArchitect.pdf)
- [Your most important Skill: Empathy](http://chadfowler.com/blog/2014/01/19/empathy/)