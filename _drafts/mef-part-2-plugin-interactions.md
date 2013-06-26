---
layout: post
title: "MEF Part 2: Plugin Interactions"
description: ""
category: bliki
tags: []
---

Intro...

This is the 2nd part in a series of MEF posts:

1. MEF Part 1: The Basics
1. MEF Part 2: Plugin Interactions

The focus in this post is to go a little bit further than part 1, exploring potential ways of letting plugins contribute to an application menu which is a common case and second how these extension can then interact with views provided by other plugins which are currently loaded.

## Contributing to the menu
Contibuting to the application menu is a fundamental functionality a plugin-based architecture needs to provide.

Source: commit f397a6e6cb1364d68737a932dc6aebb5897b50af

## Interacting with Views Of Other Plugins
In order to establish a proper interaction with other views we need

- define an interface that represents the view and its data input and output; other dependencies can then program against this interface

## Open Generic Type support

- http://pwlodek.blogspot.it/2010/12/introduction-to-interceptingcatalog.html
- http://mefcontrib.codeplex.com/discussions/276561
- http://mefcontrib.codeplex.com/wikipage?title=Generic%20Catalog&referringTitle=Documentation%20%26%20Features





