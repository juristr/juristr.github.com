---
type: post
title: Partial Commits in WebStorm
date: 2020-07-14T15:23 +02:00
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
  I think partial commits should be avoided as they might lead to inconsistent commits if you don't test them properly. But sometimes they're handy too. In this quick article I'm quickly showing how partial commits can be done with article Let's see how to enable them in WebStorm in particular. 
{{</intro>}}

<!--more-->

{{< postad >}}

I mostly use the command line when dealing with Git. It's simpler, you can easily replay previous commands..after all just more powerful and quicker. Btw, I have [an Egghead course that teaches the minimum set of Git commands a dev should know to be productive](https://egghead.io/courses/productive-git-for-developers).

Anyhow, sometimes an UI can be helpful

- when quickly looking through what changed and selectively add files to the commit
- when doing **partial commits**

And that latter one is exactly what I'd like to show you in this article.

If you open up the WebStorm visual commit dialog you can ...dd

{{<figure url="/blog/assets/img/webstorm-git-no-partialcommit.png" size="full">}}

