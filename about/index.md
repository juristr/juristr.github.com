---
layout: about
title: Hi!
current: about
---

I'm Juri Strumpflohner, a <span id="age"></span> years old software developer. Currently I work in the role as a tech lead/architect for a local e-government company [here in beautiful South Tyrol (Italy)](https://www.youtube.com/watch?v=YVFzw9QJegk&fmt=22). I'm mainly doing full-stack development in C# and Java. Most of the time I'm on the frontend however, doing some heavy coding with JavaScript (Angular), which is also my main passion. I'm a [tech reviewer for PacktPub](https://www.packtpub.com/), [Author of a video course on Angular 2](/blog/2016/04/learning-angular2-directives-course/) and [Software Craftsmanship Meetup organizer](http://www.meetup.com/Software-Craftsmanship-SouthTyrol/). I'm also a [DZone MVB](https://dzone.com/users/999973/juristr.html).

![](/about/imgs/about-angular2.png)

<script>
(function() {
  // calculates my age
  var date1 = new Date("5/15/1985");
  var date2 = new Date();
  var timeDiff = Math.abs(date2.getTime() - date1.getTime());
  //var diffDays = Math.ceil(timeDiff / 1000 / 60 / 24 / 365);

  var diff = timeDiff / 1000;
  var seconds = Math.round(diff % 60);
  diff /= 60;
  var minutes = Math.round(diff % 60);
  diff /= 60;
  var hours = Math.round(diff % 24);
  diff /= 24;
  var days = Math.round(diff % 365);
  diff /= 365;
  var years = parseFloat(Math.round(diff * 100) / 100).toFixed(2);

  document.getElementById('age').innerHTML = years;
})();
</script>

## Contact
<a name="contact"></a>

Feel free to [ask me any question on my AMA repo](https://github.com/juristr/ama) or simply drop me a line at {% include email.html %}.

I'm also available on these social networks: {% include social_icons %}


## Current Interests
<a name="interests"></a>

I'm always learning and in search for new challenges. Here are some of my current fields of interest.

{% assign interests = "Angular 1.x,Angular 2,Progressive Web Applications,Node.js,Docker,Microservices,Distributed architectures" | split: "," %}
<div class="tags">
  {% for tag in interests %}
  <a href="javascript:;">{{ tag }}</a>
  {% endfor %}
</div>

## Public Speaking

- [**Testing with Angular**](https://www.youtube.com/watch?v=Uw_XomCJaGQ) (January 2017) - A talk for [Hamburg AngularJS Meetup](https://www.meetup.com/Hamburg-AngularJS-Meetup/) on recipes for testing with Angular (2+).
- [**AngularBeers: Interviewing Igor Minar and Adam Bradley**](https://www.youtube.com/watch?v=i2XloM6Q5wc) (December 2016) - I was given the opportunity to moderate the AMA session with Igor Minar and Adam Bradley for [AngularBeers](https://angularbeers.org/).
- [**Angular 2 Special**](https://www.meetup.com/Software-Craftsmanship-SouthTyrol/events/230807221/) (May 2016)- Introducing interested software developers to Angular 2. The event consisted of a short 20min introductory talk followed by a guided exercise where developers were given the opportunity to write their first Angular 2 apps. You couldn't attend? I later created an intro video out of the exercise which you can watch yourself: [Ready to create your first Angular app? Let's do it together. (Angular 2+) ](https://www.youtube.com/watch?v=fXHyqSIIF9Q)

## Partnership

I have a partnership with the following sites, wherefore posts might also get re-published there.

- [DZone](http://www.dzone.com/users/juristr)

Previously:

- Java Code Geeks
- .Net Code Geeks

## Free time

In my free time I'm a passionate martial arts practitioner. I've been practicing Yoseikan Budo for roughly over 17 years now. I'm the [owner of a 2nd Dan black belt](/blog/2012/10/2nd-dan-yoseikan-budo/) and I also regularly teach martial arts classes.

![](/about/imgs/katana.jpg)
