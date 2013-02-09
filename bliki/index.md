---
layout: page
title: Bliki
current: bliki
---
# Bliki
The intention of this section here is to represent a [Bliki](http://www.martinfowler.com/bliki/WhatIsaBliki.html), basically articles which are not pure blog posts, but are more detailled and moreover which may change/get updated over time.

<ul class="post-list">
{% for post in site.categories.bliki %}
  <li>
        <h1 class="post-title"><a href="{{post.url}}">{{ post.title }}</a></h1>
        <time class="post-date">{{ post.date | date: "%B %d, %Y" }}</time>
  </li>
{% endfor %}
</ul>