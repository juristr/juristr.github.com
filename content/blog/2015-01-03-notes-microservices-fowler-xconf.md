---
title: 'Notes: Microservices by Martin Fowler'
lead: My notes and thoughts on Martin Fowler's talk about Microservices at XConf
show_img_in_detail: true
coverimage: false
categories:
  - Software Design
tags:
  - software architecture
  - microservices
date: 2015-01-03T01:00:00.000Z
comments: true
url: /blog/2015/01/notes-microservices-fowler-xconf
type: post
image: /blog/assets/imgs/monolith-microservices.png
---

I just watched Martin Fowler's talk about Microservices at XConf. Here are some of my notes and related thoughts. The talk is heavily based upon [Martin Fowler and James Lewis' article about Microservices](http://martinfowler.com/articles/microservices.html), so you can find and read most of the information there.

<a href="http://www.thoughtworks.com/talks/software-development-21st-century-xconf-europe-2014" target="window"><img src="/blog/assets/imgs/xconf-microservices.png" /></a>
Video link: [http://www.thoughtworks.com/talks/software-development-21st-century-xconf-europe-2014](http://www.thoughtworks.com/talks/software-development-21st-century-xconf-europe-2014)

## Characteristics of Microservices

In his article, Fowler defines some characteristics that most of the already existing Microservices architectures implement. In his talk he discusses some of them:

**Componentization via Services -** What really is a component? The term often pops up as a "cooler" alternative to module or widget. But there's a vague definition: is it a class, an executable piece?  
From Fowler's perspective it is best to use some real world paradigm, like how a user refers to a "stereo system". They move it around, attach it somewhere else. Move, remove and attach different speakers.  
Basically a _component is something that is independently upgradeable and replaceable_.  
There are major ways about how components are being used or brought into a project: through libraries (jars, gems, node_modules,...) or through services. The difference is simply that services are not directly brought into your codebase, but rather be called through remote calls.

**Organized around business capabilities -** The organization of teams and people is a very important point. Many organization structure their teams around technology: _UI specialists_, _middleware team_, _DBAs_.  
Rather, with microservices, people should _be organized around the business capabilities_ within cross-functional teams: like the "shipping team", the "orders team",...

![](/blog/assets/imgs/team-structure-microservices.png)

According to Amazon these teams should be as big s.t. we're able to feed them with 2 (American) pizzas (a dozen of people). Fowler highlights that an important fact is that these teams have a _direct communication line_ to the end user or customer and get according feedback how the stuff they build is being used and how well or not it works.  
Microservices is much more about about team organization rather than software architecture. _Architecture and team organization is always heavily coupled together._

> organizations which design systems....are constrained to produce designs which are copies of the communication structures of these organizations <cite><a href="http://www.melconway.com/Home/Committees_Paper.html">Conway's law</a></cite>

**Smart endpoints and dumb pipes -** It is common practice to use smart network infrastructure like ESBs that contain logic about how to treat certain network messages and how to route them around.  
Microservices instead facilitate _dumb pipes_ and _smart endpoints/applications_. The problem is that smart pipes (i.e. ESBs) lead to issues with continuous delivery as they cannot be easily version controlled or integrated into a large pipeline. Moreover it creates dependencies with the application itself, meaning that when you decide to upgrade your endpoint/service, you often have to do some work on the ESB as well.

**Decentralized Data Management -** Normally, on a monolith system there's one huge database where all the data is being stored. Often there are even multiple monoliths connecting to the same DB.  
In a service oriented approach, each service gets its own database and the _data is not shared directly with others_. Sharing has to go through service that wraps the data. This leads to a lot of beneficial flexibility on the service's side as it can decide which technology to adopt, which DBMS system etc. In this way, different programming languages and database systems can be used among services. _It's decentralized decision making_.

**Infrastructure Automation -** Continuous delivery is a must have as well as automated mechanisms for machines provisioning, for deployment, testing etc.

**Design for failure -** You inevitably have to design for failure as the microservices will fail, even frequently. Netflix is renowned for carrying this to the extreme. They have a ["Chaos Monkey"](https://github.com/Netflix/SimianArmy) which runs over their production system during the day and randomly shuts down services. This gives them valuable feedback about how resistant their services are, how well they recover from outages and how the overall system is affected.  
Although many people tend to abstract and hide remote calls, _you cannot expect them to perform like normal calls_. Expect them to fail rather than to succeed. A notable library released by Netflix is [Hysterix](https://github.com/Netflix/Hystrix), a latency and fault tolerance library designed to isolate points of access to remote systems, services and 3rd party libraries.

Others characteristics that haven't been mentioned explicitly in the talk are these:

- Products not Projects
- Decentralized Governance
- Infrastructure Automation
- Evolutionary Design

You find them explained in [the microservice article](http://martinfowler.com/articles/microservices.html) on Fowler's website.

## Are Microservices really just SOA?

A question I've posed myself as well a couple of times. The point is - and Fowler mentions that as well - is how one defines SOA. If SOA is being seen as ESBs, smart centralized management,... In that case Microservices is very different.

Fowler defines it as a subset of SOA, one that refers to a particular style of implementing certain concepts.  
Having "micro" in its name, the question arises about how big a service should be? Actually there's a lot of variation, from 15 people -> 10 services to 4 people -> 200 services. It's not yet exactly clear.

## When to use a Monolith and when a Microservice?

Fowler immediately emphasizes that with every new concept people tend to overuse it. So be cautious about that.

**Monolith**

- simplicity: take into account that distributed services are a huge complexity booster
- consistency
- inter-module refactoring is much easier. Within a microservice architecture, if you fail to do a good service-cut it's much more difficult to move logic around.

**Microservices**

- Partial deployment
- Good degree of availability (if good failure management has been implemented)
- Preserve modularity: programming languages are bad in helping to preserve the modularity of systems as it is too easy to escape their structures (like packages and namespaces)
- Multiple platforms as such architecture gives more flexibility in the technology choices such as OS, programming language etc...

## You must be this tall...

...to use microservices. As already mentioned in [Fowler's article about the prerequisites](http://martinfowler.com/bliki/MicroservicePrerequisites.html) you should fulfill the following prerequisites:

- **Fast provisioning**: be able to setup new machines in hours not days in order to avoid delays.
- **Good monitoring**: to be quickly able to diagnose failures and trace them down to the place they occurred. If issues occur you should be able to quickly rollback to a previous version of the microservice.
- **Rapid Application deployment** through fully automated pipelines
- **Devops culture**

That said, Fowler says that when he's not sure he still prefers the Monolith structure and eventually evolve to a Microservices system later in the development cycle (although that might not be totally optimal).

## Conclusion

The talk somehow confirms my impressions so far...

- high degree of automation at various levels (infrastructure, testing, dev, deployment)
- trend to empower the team, its responsibility and flexibility in the decision making (compatible with what Agile already fosters)
- implementing best practices (fault tolerance, smart endpoints, monitoring, testing)
- know the trade-offs, don't overuse

As an architect and tech enthusiast this is the architecture of my dreams. But given the issues I regularly face when coaching teams, the difficulty at adopting good programming practices and rigid organizational structures...then adopting a Microservices architecture is **extremely difficult**.

Still, even if you're not ready yet, I think you should aim for such structure, without necessarily going it the whole way. Like, structuring your application or product by following practices from the Microservices architecture but deploying it as a monolith. I'm thinking about a modular architecture, good failure handling, logging and monitoring, automated deployment pipelines and a high degree of automated testing. From there, optimize incrementally.

**Related readings**

- [Uncle Bob: Microservices and Jars](http://blog.cleancoder.com/uncle-bob/2014/09/19/MicroServicesAndJars.html)
- [Microservices are not Jars](http://www.giorgiosironi.com/2014/09/microservices-are-not-jars.html)
