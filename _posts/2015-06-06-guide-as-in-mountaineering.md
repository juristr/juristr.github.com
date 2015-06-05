---
layout: post
title: "Guide as in Mountaineering"
lead: "About the architect's role and social skills"
show_img_in_detail: true
postimg: http://upload.wikimedia.org/wikipedia/commons/5/5c/Mont_Maudit_-_Mountaineers_on_the_Kuffner_Ridge.jpg
coverimage: false
category:
tags: []
---

Yes, I happen to deal with architecture, software design and technology. And yes, I'm entitled by the term "software architect". I don't like it that much, though. IMHO it is a widely misused role. Many think of the "ivory tower architects", sitting in their rooms and designing their architectures of dreams which they then command to the dev teams. That simply isn't gonna work.

## Bah...we don't need an architect

In his book "Software Architecture for Developers", Simon Brown says that in order to know whether you're doing software architecture the right way, you should be able to positively answer these questions:

- Does your software system have a well defined structure?
- Is everybody on the team implementing features in a consistent way?
- Is there a consistent level of quality across the codebase?
- Is there a shared vision for how the software will be built across the team?
- Does everybody on the team have the necessary amount of technical guidance?
- Is there an appropriate amount of technical leadership?

**Software architecture is important!** But, it doesn't or better shouldn't be something **one person decides for the others**. There simply needs to be one who cares about quality, consistency, someone who points out potential problems, brings critical aspects into discussion and reminds the team to respect the established guidelines.  
A software architect or tech lead (which IMHO better defines the role) has to **work with the team, be a respected and valuable member**. As such he needs to be highly communicative and have good social skills. I found those to be the hardest part and often even more important than the tech skills.

>A software architect has to work with the team, be a respected and valuable member of it.

Decision taken within the team will be supported by everyone. Top-down decisions are just being executed (if at all).

## Architectus Reloadus vs. Architectus Oryzus

Martin Fowler really hits my view of the architect's role. I just accidentally came across his article ["Who needs an architect"](http://martinfowler.com/ieeeSoftware/whoNeedsArchitect.pdf). Martin identifies two types of architects.  

There is the _architectus reloadus_ which makes all of the important decisions because he thinks the team doesn't have the necessary skills to do so. In his view, all of them need to be made upfront s.t. everyone else has a plan to follow.

<figure>
	<img src="/blog/assets/imgs/architect-matrix.jpg" />
	<figcaption>Architectus Reloadus. <i>Image source: cyberpunkreview.com</i></figcaption>
</figure>

Then there is the _architectus oryzus_, one that needs to be very aware what's currently going on in the project. He needs to foresee upcoming issues and address them before they become a serious problem.

> When I see an architect like this, the most noticeable part of the work is the intense collaboration. In the morning, the architect programs with a developer, trying to harvest some common locking code. In the afternoon, the architect participates in a requirements session, helping explain to the requirements people the technical consequences of some of their ideas in non-technical terms. <cite>Who needs an Architect by M. Fowler</cite>

This exactly reflects my kind of vision. I love to work in the team, to live the dynamics, the ups and downs. You have to experience the kind of problems that arise. This is extremely valuable feedback that needs to be collected, analyzed, improved and then brought back into the next project s.t. other teams can benefit from it. They key point is to be **a mentor**, to raise the team's level and ability to handle complex situations on their own. Cause the last thing you want is to become a bottleneck. Still, it's very hard not to fall into the role of the "architecturs oryzus" as it's often very tempting and the easier one of the two.

## Architects need to be master coders

As an architect or tech lead, **I do write code, lots of it, in a variety of technologies**. Last week I helped one of my team mates implement some tricky user stories in a .Net based web application, discuss with another one possibilities about how to best implement an application cross-cutting functionality on a Windows WPF app. Then I fixed some critical, unforeseen issues in one of our Java REST service applications that exposes a generic endpoint for sending push notifications to Android and iOS applications. **Software architects need to be master coders!**

> Guide, as in mountaineering. A guide is a more experienced and skillful team member who teaches other team members to better fend for themselves yet is always there for the really tricky stuff. <cite>Who needs an Architect by M. Fowler</cite>

## Conclusion

Don't be an ivory tower architect. That won't work. Good architects are tech and team leads that are respected. They serve the team, coach them. The're there to move away the difficult parts to make sure the team can focus on the established goals.

Some literature:

- [Software Architecture for Developers, by Simon Brown](https://leanpub.com/software-architecture-for-developers)
- [Martin Fowler - Who needs an Architect](http://martinfowler.com/ieeeSoftware/whoNeedsArchitect.pdf)
- [Your most important Skill: Empathy](http://chadfowler.com/blog/2014/01/19/empathy/)