---
type: post
title: Configure Netlify CMS for my Hugo blog from my iPad in under an hour
date: 2020-07-11T19:01:34.406Z
lead: Ok...just a teaser, doesn’t have to be an iPad
url: /blog/2020/07/add-netlify-cms-to-hugo-blog
draft: false
categories:
  - blogging
tags:
  - blogging
  - netlify
comments: true
---
{{<intro>}}
  Why "from my iPad"? :sweat_smile: just a teaser, but actually all this started because I wanted to be able to write blog posts from my iPad. So here we go.
{{</intro>}}

<!--more-->

{{< postad >}}

So I recently tweeted this:

{{<tweet 1275898074787909634 >}}

And it's true. I've probably never blogged so few articles than in the last half year, which is sad for a couple of reasons: I love blogging & writing, I love content production, I love to engage with the community & ofc my page views dropped significantly :disappointed:

So..kids change your life, for the better :heart: and don't get me wrong, I'd never change that. But obviously there's just so much time, so things need to be re-prioritized and most importantly your time needs another optimization boost :rocket:. A much bigger strike was Covid though. I've not been positive (yet), nor have family members (:pray:), but we had to re-arrange how we organize our house-hold and childcare time. While before we brought our little beloved one to his grandparents, during lock-down that was simply not possible. So me and my wife split our time which resulted in less free time + late hours working.

## My current blogging setup

I love the [JAM stack](https://jamstack.org/) and used it even before it was a thing. Well...ok, to be fully honest it wasn’t really the full JAM stack. I moved my very first blog from Google’s Blogger to Jekyll + GitHub pages very soon. The flow of editing a markdown file, pushing it to a Git repo & the deployment + hosting will just be handled for you is something that I always loved and still do.

Over the years my site grew and using Jekyll became painful both, installation wise (when you get a new machine) but mostly in terms of build & refresh time. So I switched to [Hugo](https://gohugo.io/), a static site generate based on Go. The result: builds in ms :smiley:.

## Time to write

In the intro I was mentioning the issue of not enough free time & having to optimize it. So something that happened always again is to have some 15 - 30 minutes in between (playing with the kid, sitting besides the buggy while the :baby: sleeps) where I could have continued to write on that blog post, to review it or even publish it out. But then, you don’t have the Macbook around...bringing along an iPad is super easy though.

This, however, is where the Edit Markdown => Git commit & push falls short. Cloning repos on the iPad and editing markdown etc isn’t the easiest thing to do. Sure, there are a number of ways, but they are all non trivial or cumbersome. That’s when I played with the idea of adding a GUI on top of my blog. It wouldn’t be super hard:

- host some webapp with a basic markdown editor
- use either a fully featured VPS or use isomorphic git to do the git pushing etc..

But...time :sweat_smile:.

## Adding Netlify CMS

**Todos**

* how to use a field as a preview link

## Why?

* love Git => GitHub => static site variant
* Problem: git shell etc...locally on iPad doesn’t really work ...?
* hosting a server? for a blog? nahh
* best of both worlds: CMS => Git => static site (can still use the normal git push publishing flow if you want)

## Rolling your own solution

Use git bridge etc.. (see T-Mobile styleguide)

## Setup Netlify CMS

...

### Customizing the Preview Link

https://www.netlifycms.org/docs/deploy-preview-links/