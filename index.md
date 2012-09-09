---
layout: default
title: Hello World!
tagline: Supporting tagline
---
<div class="span12">
  <div class="row-fluid">
    <div class="span6 js-blognews">
      <h2>Latest from my blog</h2>
      <section>
        {% for post in site.posts %}
            <p class="feedentry">
              <span class="publishDate">{{ post.date }}</span>
              <a href="{{ post.url }}">{{ post.title }}</a>
            </p>
        {% endfor %}
      </section>
      <p><a class="btn" href="http://blog.js-development.com" target="_window">More »</a></p>
    </div>
    <div class="span6 js-tweets"></div>
  </div>
  <div class="row-fluid">
    <div class="span6 js-stackoverflow-top"></div>
    <div class="span6 js-stackoverflow-latest"></div>
  </div>
  <div class="row-fluid">
    <div class="span12 js-github-latest"></div>
  </div>  
</div>
<script>
$(function(){
  $(".publishDate").each(function(el){
    var $el = $(this);
    $el.html(moment($el.text()).fromNow());
  });
});
</script>