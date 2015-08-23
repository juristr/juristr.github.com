---
layout: link
type: link
title: "@angularpodcast - Immutability with Angular with Minko Gechev"
link: https://devchat.tv/adventures-in-angular/054-aia-immutability-with-angular-with-minko-gechev
category:
tags: ["podcast", "Angular"]
---

Immutability is something that is a hot topic recently. Although is has been used previously Facebook with React made it popular again
(at least that's my perception). While Angular 2 will have support for immutability, [Minko Gechev is brought it to 
Angular 1.x](http://blog.mgechev.com/2015/03/02/immutability-in-angularjs-immutablejs/)
as well.

- "Functional user interfaces": UI components getting an input (data) and giving an output (rendered UI). Should not have side-effects -> pure function
- check for updating view easier, we just have to compare object references
- Large lists? Isn't it slower to recreate entire list rather than the single new entry??
  - [ImmutableJS](https://facebook.github.io/immutable-js/) (for instance)
  - [Persistent data structures](http://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-854j-advanced-algorithms-fall-2005/lecture-notes/persistent.pdf): optimized way of doing it; not copying entire list, but some smarter techniques

