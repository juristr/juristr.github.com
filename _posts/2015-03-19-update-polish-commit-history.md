---
layout: articles-post
title: "Update: Don't forget to polish your git history"
type: update-notice
target-url: /blog/2013/04/git-explained/#Polishingyourfeaturebranchcommits
---

Branching is what makes git so awesome. Creating feature branches is like creating your own playground where you can try and mess around, without affecting others. On those branches I commit as often as possible in order to have local backup points to which I can eventually jump back.

However, once finished, don't forget to clean up your mess. This is something people most often don't do, namely to use `git rebase` to clean up your commit history to make it more sensible and understandable (for others and your future self). Here's a short demo on how to do it.