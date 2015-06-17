---
layout: post
title: "Introducing the learning-ng series"
lead: "A series of short and concise articles presenting my findings as I master the Angular learning curve."
postimg: "/blog/assets/imgs/learning-ng/angular-image-bg.png"
show_img_in_detail: true
coverimage: true
category:
tags: ["JavaScript", "Angular.js"]
---

With this post I'd like to introduce to you the - what I'd like to call - **learning-ng series**; a number of short and concise posts that describe issues and solutions on my journey of climbing up the Angular.js learning curve. I'll update this post to linking all of the articles that are about to come. So come back later.

After years of using JavaScriptMVC, about half a year ago we (at work) decided to adopt Angular for one of our next projects. Since then, I'm crawling books, blogs, news feeds, forums, IRC chats etc. As part of my job I want/have to understand how things work s.t. I can then coach/share/discuss that knowledge with my work mates.

So, another Angular tutorial? No, there's already lots and lots of material around. This is (hopefully) going to be different. Despite having quite some experience in building large JavaScript SPAs, I'm still a newbie in the Angular world. That might get interesting as you often see things differently than an expert. So I'm going to **share some of my findings, the issues I face and solutions I come up with**.

Hopefully that might turn out to be useful for some of you and maybe I'm lucky enough to even get some feedback from some more expert developers than me.

To keep track of new articles either [subscribe to my RSS feed](http://feeds.feedburner.com/juristrumpflohner) or simply [follow me on Twitter](https://twitter.com/juristr).

Enjoy!

## Articles in the series

{% for tag in site.tags reversed %}
{% if tag[0] == "learning-ng" %}
<ul>
{% assign pages_list = tag[1] %}
{% include pages_list %}
</ul>
{% endif %}
{% endfor %}
