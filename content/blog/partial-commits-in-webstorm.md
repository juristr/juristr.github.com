---
type: post
title: Partial Commits in WebStorm
date: 2020-07-14T21:29:00+02:00
lead: How to enable partial commits with WebStorm
url: /blog/2020/07/partial-commits-webstorm
draft: false
image: /blog/assets/img/partial-commits-webstorm-banner.png
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

## Enable partial commits in Webstorm

Webstorm has a commit dialog which is handy for inspecting the changes. If you open up the dialog you see something like this:

{{<figure url="/blog/assets/img/webstorm-git-no-partialcommit.png" size="full">}}

The dialog shows you the differences, but there's no way to just include some of the lines. To configure that you have to enable the "Highlight modified lines in gutter" option.

{{<figure url="/blog/assets/img/webstorm-git-no-partialcommit-settingsaction.png" size="full">}}

This should open the Webstorm preferences dialog. Make sure you have the setting enabled there:

{{<figure url="/blog/assets/img/webstorm-git-no-partialcommit-enable.png" size="full">}}

Once that's done, re-open the commit dialog. You should now be able to click the gutter and add single lines.

{{<figure url="/blog/assets/img/webstorm-git-no-partialcommit-result.png" size="full">}}
