---
type: post
title: Partial Commits in WebStorm
date: 2020-07-14T21:29:00+02:00
lead: How to enable partial commits with WebStorm
url: /blog/2020/07/partial-commits-webstorm
draft: false
categories:
  - tooling
tags:
  - tooling
  - webstorm
comments: true
---
{{<intro>}}
  I think partial commits should be avoided as they might lead to inconsistent commits if you don't test them properly. But sometimes they're handy too. In this article I'm quickly showing how partial commits can be done in Webstorm.
{{</intro>}}

<!--more-->

{{< postad >}}

When interacting with Git, the command line is my goto place. I have a couple of aliases set up and installed [git-extras](https://github.com/tj/git-extras). That makes it a pretty powerful workflow. 

Btw, I have [an Egghead course that teaches the minimum set of Git commands a dev should know to be productive](https://egghead.io/courses/productive-git-for-developers).

## Why partial commits?

Generally, I think they should be avoided. Sometimes though, if you have lots of changes, even covering different responsibilities, it might be worthwile 
to split them up. That's when partial commits come in handy. They allow you to only add certain lines of a file into the commit, rather than the entire file.

## How to use partial commits in Webstorm

Webstorm has a commit dialog which is handy for inspecting the changes.

And that latter one is exactly what I'd like to show you in this article.

If you open up the WebStorm visual commit dialog you can ...dd

{{<figure url="/blog/assets/img/webstorm-git-no-partialcommit.png" size="full">}}

