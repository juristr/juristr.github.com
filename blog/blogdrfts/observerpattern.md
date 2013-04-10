---
layout: post
title: "Observer Pattern in JavaScriptMVC"
description: ""
postimg: "/blog/assets/imgs/XXXX.png"
show_img_in_detail: false
postheadline: "Srchr - a crowdsourced exercise"
category: 
tags: [JavaScript]
---


## Prerequisites

For this article you should

- have some experience with JavaScript MVC frameworks (preferrably JavaScriptMVC). If not, take a look at [TodoMVC](http://todomvc.com).
- Understand basic design patterns for decoupling like Pub/Sub and Observer.
- have some minimal knowledge about CanJS.

## Srchr - The Application

<figure>
  <img src="/blog/assets/imgs/srchr_app.png" />
  <figcaption>Screenshot of the Srchr application in action</figcaption>
</figure>

The official repository for the Srchr application developed by Bitovi using JavaScriptMVC can be found on GitHub under the following url: [https://github.com/bitovi/srchr](https://github.com/bitovi/srchr)

## Modules

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

## Interactions

There are the following main interactions among the modules:

1. Search -> Results + History
1. History -> Search + Results

## Resources

