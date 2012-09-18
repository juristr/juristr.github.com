---
layout: default
title: tutorials
---
# Tutorials
Tutorials are intended to be more detailled than plain normal blog posts. Moreover they have a version history as the usually change over time as new stuff is being added/removed.

<ul class="post-list">
{% for post in site.categories.tutorial %}
  <li>
        <h1 class="post-title"><a href="{{post.url}}">{{ post.title }}</a></h1>
        <time class="post-date">{{ post.date | date: "%B %d, %Y" }}</time>
  </li>
{% endfor %}
</ul>