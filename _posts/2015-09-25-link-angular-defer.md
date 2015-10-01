---
layout: link
type: link
title: "$q.defer: You're doing it wrong"
link: http://www.codelord.net/2015/09/24/$q-dot-defer-youre-doing-it-wrong/
category:
tags: ["Angular"]
---

Nice article on Angular deferreds, promises and things you may do wrong.

- use `$q.when(['detail', 'simple'])` for simple defereds
- use promise chaining whenever possible, like `return $http....`
- `$timeout` already returns a promise, so `return $timeout`
- use custom made deferreds when wrapping traditional callback APIs (like many of jQuerys)
- use `return $q(function(resolve, reject){ ... })` directly (Angular 1.3+ only)
