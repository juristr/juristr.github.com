---
layout: link
type: link
title: "Why You Should Avoid a Canonical Data Model"
link: https://www.innoq.com/en/blog/thoughts-on-a-canonical-data-model/
category:
tags: ["architecture"]
---

Stefan Tilkov writes about why canonical data models can be a bad thing. Totally agree as I've come across this by myself as well.

Instead of trying to define one model for the entire application/service landscape, it would rather be a lot more productive to focus and define the data responsibility. 

In the sense that rather than defining a canonical data model that describes a person with it's addresses, credit card number and whatever you need to have for a person, you should rather focus on defining a service that is responsible for handling the information related to a given person. That given service has an API that allows to retrieve/update/whatever the data related to a given person. Other services can query that service and know they'll get the up-to-date information. That doesn't mean other services won't have data about a person (for convenience reasons), but they have to make sure it stays up-to-date with the one service holds the "truth".

Personally, I never saw the **one thing to rule them all** work in practice so far...
