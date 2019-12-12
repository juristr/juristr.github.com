---
type: post
title: "Talk: Enterprise Grade Angular Reactive Forms"
lead: Learn about how using ngx-formly can drammatically improve your Angular reactive forms
date: 2019-12-07T08:48:08+01:00
comments: true
url: /blog/2019/12/ng-be-2019-formly-talks
image: /blog/assets/imgs/ngbe2019-bg.jpg
categories:
  - Angular
tags:
  - angular
  - reactive forms
  - formly
draft: false
---

{{<intro>}}
  This year I again had the pleasure to come back to [ng-be](https://ng-be.org/) as a speaker. Since I see a lot of people struggle with creating proper forms, especially large forms, I gave a talk about how to optimize your Angular Reactive Forms with the help of [ngx-formly](https://formly.dev/).
{{</intro>}}
<!--more-->

{{< postad >}}

## Little back story: NG-BE is my most favorite conf

I came to NG-BE in 2016, at their very first edition. At that time as an attendee. Apart from AngularConnect, it was one of the first Angular only conferences at that point. And the whole experience was just amazing. I never felt that welcome at any other place. Although I didn't knew anyone, I immediately felt like home, cozy conference, welcoming people and a superb from the organizational point of view. Remember, that was their 1st time organizing it.  

Some highlights (you can read them on [my post I wrote back then](/blog/2016/12/angular-community-ngbe-conf/)): I met Todd Motto in person, and even hang out with hem and Igor Minar at the lounge after the conference. I mean, amazing, right 🤩.

So at that time I decided: you have to **come back the year after and give a talk, give something back to the community**. The point was, I had never given a talk before at a conference. I was kind of into "speaking", spoke at some local meetups before, but never ever at a conference so far. And believe me, thinking about doing that was scary. But still, I went for it, prepared a talk and Jurgen from the NG-BE organizers invited me as a speaker. And there I was, giving **my first ever talk at a conference** at NG-BE:

{{<youtube K4YMmwxGKjY>}}

From there it really started to take off. I really enjoyed my experience and so I spoke at ngVikings just a couple of months later and have given a couple of talks at various conferences and meetups so far. **Why am I telling you this?** Because you can do it as well! Even if you are scared, like speak at some meetup, gather feedback, improve and then definitely participate at a conference CFP to get on stage. I'm a strong believer that we all have something to share and the more different perspectives we can get on stage, the richer the experience will be for everyone :smiley:.

## What makes NG-BE stand out

Here are some thoughts which I think makes NG-BE stand out

- **Organization is superb -** Honestly I don't know how they do it, but the organizing team does a super awesome job. Especially as a speaker, you'll get an email, with all the details planned out for you, who's gonna pick you up, when they will pick you up and bring back, how the conf is structured, when you have to check up for audio and stuff...they just line out everything so clearly, that you can just go there, you don't have to think about anything but your talk :heart_eyes:.
- **Everyone is at one place -** All the people stay in one place. So what does that mean? Well the venue is basically in the atrium of a hotel. Therefore, everyone is at that hotel, all the attendees, all the speakers. On many other conferences, people go to the venue, stay there for the duration of the talk and then will fan out in groups to go have dinner or whatever. NG-BE is different: since everyone stays in that same hotel, people stick around and very nice discussions com up from that. Also, speakers don't really have a dedicated room. Of course they can go back to their own hotel room if they want, but other than that, you just mix up with attendees. And that's the best thing of all!
- **Community work at its best -** They invest a lot into the community. This year there was even a free training for students to learn Angular, and NG-BE even tried to compensate for the travelling of the students to be able to join the conf 🤯.
- **Welcoming and cozy -** The organizers & team are just the most welcoming and coziest people I met. 

Big kudos to the entire team 👏

## NG-BE 2019: Enterprise Grade Angular Reactive Forms

As mentioned, this year I had the opportunity to be invited back to NG-BE and give a talk about Angular Reactive Forms. In short, I talked about [ngx-formly](https://formly.dev), which is a library for creating (what you could call) configuration based forms. You basically don't touch the HTML a lot, but rather you declaratively define the form like

```
formlyFieldConfig = [
  {
    key: 'firstname',
    type: 'input',
    templateOptions: {
      label: 'Firstname'
    }
  },
  ...
]
```

...and Formly will turn it into HTML and render it properly. Sounds crazy at first, but it has a lot of advantages in terms of maintainability, reusing of form configurations and guaranteeing consistency across your frontend forms. Moreover Formly is really flexible, has superb support for Observables and you can easily define custom form types and much more.

{{<youtube xNiCHsSAsXo >}}

Here are my slides an repository:

- [Slides](http://bit.ly/ngbe2019-formly-slides)
- [GitHub Repository](http://bit.ly/ngbe2019-formly-repo)

Expect some more content to land on this blog about Formly in the next weeks :smiley:.
