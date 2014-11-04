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

With this post I'd like to introduce to you the - what I'd like to call - **learning-ng series**, a number of short and concise posts that describe issues and solutions on my journey of learning Angular.js. I'll update this post, by linking all of the articles that are about to come.

I got in touch with Angular a couple of years ago, but it remained at the level of playing around in a JSFiddle. About half a year ago now we decided to adopt it for one of our projects. Since then, I'm crawling books, blogs, news feeds, forums, IRC chats etc. As part of my job I want/have to understand how things work s.t. I can then coach/share/discuss that knowledge with my work mates.

There's already an enormous amount of Angular resources around on the web. Hence, this isn't going to be another Angular tutorial. Instead, I'd like to **document my learning experience, issues I face and applied solutions in a series of posts**. Hopefully that might turn out to be useful for some of you and maybe I'm lucky enough to even get some feedback from some more expert developers than me.

Enjoy!

## Articles in the series

{% for tag in site.tags %}
{% if tag[0] == "learning-ng" %}
<ul>
{% assign pages_list = tag[1] %}
{% include pages_list %}
</ul>
{% endif %}
{% endfor %}

