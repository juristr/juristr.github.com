---
title: "About Me"
url: "/about"
---

Hey :wave:, I'm Juri Strumpflohner, a <span id="age"></span> years old software developer. Currently I work as a JavaScript Architect and Engineering Manager at [Nrwl](https://nrwl.io) where I work on Open Source projects such as [Nx](https://nx.dev) and [NxCloud](https://nx.app) and help clients succeed with their projects.

I'm a [Google Developer Expert in Web Technologies](https://developers.google.com/experts/people/juri-strumpflohner), an [Egghead Instructor](https://egghead.io/instructors/juri-strumpflohner), international speaker and happen to organize the [Software Craftsmanship Meetup](http://www.meetup.com/Software-Craftsmanship-SouthTyrol/).

<figure class="image--full">
  <a href="/about/imgs/speaking.jpg" class="image--zoom">
    <img src="/about/imgs/speaking.jpg" />
  </a>
</figure>

## Contact
<a name="contact"></a>

Feel free to [ask me any question on my AMA repo](https://github.com/juristr/ama) or <a href="mailto:&#105;&#110;&#102;&#111;&#064;&#106;&#117;&#114;&#105;&#115;&#116;&#114;&#046;&#099;&#111;&#109;" target="_blank">send me an email</a>

You can find me also on 

- [Twitter](https://twitter.com/juristr)
- [GitHub](https://github.com/juristr)
- [LinkedIn](https://linkedin.com/in/juristr/)
- [StackOverflow](http://stackoverflow.com/users/50109/juri)


## Current Interests
<a name="interests"></a>

I have a variety of interests in the field of computer science. Right now I'm mostly focusing on the frontend web development, experimenting with the latest technology like web components, custom elements, progressive web apps and using frameworks like Angular.

Another passion of mine have always been software architectures, which is why I closely also follow the world of Microservices, distributed architectures, containerization etc.

## More?

Go to the [main page](/) for more details on my articles, consulting, speaking and [Egghead](https://egghead.io) :smiley:.

## Aside from software dev?

I'm trying to spend as much quality time as possible with my family. Moreover I'm passionate about sports, especially calistenics and martial arts. I've been practicing Yoseikan Budo for roughly over 19 years now. I'm the owner of a 3rd Dan black belt and I also regularly teach martial arts classes.

![](/about/imgs/katana.jpg)

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
  var years = parseFloat(Math.round(diff * 100) / 100).toFixed(0);

  document.getElementById('age').innerHTML = years;
})();
</script>
