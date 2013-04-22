---
layout: post
title: "Observer Pattern in JavaScriptMVC"
description: ""
postimg: "/blog/assets/imgs/XXXX.png"
show_img_in_detail: false
postheadline: "Srchr -  a crowdsourced exercise"
category: 
tags: [JavaScript]
---

A couple of days ago I wrote an article about [modularity in JavaScript MVC frameworks](blog/2013/04/modularity-in-javascript-frameworks/) which got then republished on various sites. The article had two videos from Justin (founder of Bitovi and JavaScriptMVC) where he talks about how modularization works in JavaScriptMVC specifically. While he focuses on the process, this article aims at focusing at the underlying code.

Although I have been working for quite some time now with JavaScriptMVC, developing enterprise applications, I didn't yet switch to CanJS. Thus, in this article I'll take the chance some of it as well. Still, I'm not going to discuss CanJS's language concepts but rather I'll just focus on the parts that are interesting from an architectural point of view.

## Srchr - The Application

<figure>
  <img src="/blog/assets/imgs/srchr_app.png" />
  <figcaption>Screenshot of the Srchr application in action</figcaption>
</figure>

The official repository for the Srchr application developed by Bitovi using JavaScriptMVC can be found on GitHub under the following url: [https://github.com/bitovi/srchr](https://github.com/bitovi/srchr)

### Modules

The key of this application is to demonstrate how to modularize the application by making use of the specific JavaScript framework's capabilities which is JavaScriptMVC in this case. Srchr is divided into the following modules (as I call them).

**Search**

![](/blog/assets/imgs/srchr_module_search.png)

The search module is responsible handling user searches. As such it has the options for the activating the different source providers as well as the textbox and button for submitting a new search query.

**Results**

![](/blog/assets/imgs/srchr_module_results.png)

The results module contains a list of search results. On top of the view there is a tab-page which allows to switch between the different search providers that have been used for executing the query.

**History**

![](/blog/assets/imgs/srchr_module_history.png)

The history module holds a list of previously conducted searches. This allows the user to re-active a previous search by clicking an item from the history view.

### Interactions

Obviously the modules have to interact or better "react" when some action happens. There are the following main interactions among the modules:

1. **Search -> Results + History - ** basically when the user submits a search, the results window displays the according results per search provider and the history adds the execute search.
1. **History -> Search + Results - ** when the user clicks on a history entry, the corresponding search should be loaded, that is, the search module displays the search params while the search results module lists the corresponding results.

## Pub/Sub and Observer

In his article about ["Patterns for large-scale JavaScript Application Architecture"](http://addyosmani.com/largescalejavascript/) [Addy Osmani](http://twitter.com/addyosmani) points mainly towards an event-based system for creating a more loosely-coupled and thus more flexible and extensible architecture. In a traditional **pub/sub system** you have that modules publish events to which other modules can subscribe and react correspondingly. Addy goes even further, introducing the concept of a **mediator** (see Fig 1).

A mediator is a centralized controller that coordinates the communication among the different modules.

<figure>
  <img src="http://addyosmani.com/largescalejavascript/assets/img/chart4a.jpg" />
  <figcaption>Fig 1: Mediator pattern (from Patterns for large-scale JavaScript Application Architecture)</figcaption>
</figure>

> Consider modules as publishers and the mediator as both a publisher and subscriber. <cite>Addy Osmani</cite>

As can be seen, there is no direct relationship or communication among the modules themselves.

**[Justin](https://twitter.com/justinbmeyer)** explains to take a different approach on the other side in his video where he demonstrates Srchr. He chooses the **observer pattern** instead. 

> The observer pattern is different than pub/sub because it maintains state. We almost always favor the observer pattern over pub/sub in our applications. <cite>Justin Meyer (Founder of Bitovi and JavaScriptMVC)</cite>

The Observer pattern

## Resources

