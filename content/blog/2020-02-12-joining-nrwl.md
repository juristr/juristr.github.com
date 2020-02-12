---
type: post
title: "Joining Nrwl 🐳 🦄"
lead: 
date: 2020-02-12T10:20:14+01:00
comments: true
url: /blog/2020/02/joining-nrwl
image: /blog/assets/imgs/nrwl-standup.png
# categories:
#   - Angular
# tags:
#   - rxjs
#   - angular
draft: false
---

{{<intro>}}
  Alright, so yes, I joined Nrwl 😍!! The title should rather be: 5 weeks at Nrwl 🙂 as this week I’m starting my 6th one. Hugely delayed blog post, but hey time at Nrwl flies like mad! So here we go with the entire story.
{{</intro>}}
<!--more-->

{{< postad >}}

{{< toc >}}

## So what is Nrwl? 🤔

If you haven't heard of us already, Nrwl has been founded by ex-Googlers and Angular team members Jeff Cross and Victor Savkin. Our main focus is to help big enterprises speed up by helping them scale the development of high quality software across the entire organization. How? With monorepos and a ton of expertise around engineering, consulting and training 🙂. Our strengths is mostly on frontend development with JavaScript, Angular and React. We directly collaborate with our client's teams and guide them through difficult architecture decisions, help them implement and scale it in the long run via automation and tooling.

We also heavily contribute to open source! Our two most known products are Nx Console and Nx (and more is coming :heart_eyes:).

Wanna learn more? Go visit [our website at nrwl.io](https://nrwl.io)

### Nx

**Website:** [https://nx.dev/](https://nx.dev/)  
**GitHub:** [https://github.com/nrwl/nx](https://github.com/nrwl/nx) 

We at Nrwl believe in monorepos. Google, Facebook, Microsoft or Twitter are known for having huge repositories containing most of the company’s source code. Rather than having one git repository per project/application, there’s just one single repository containing all (or at least a logically grouped set) of the projects and applications. The reason is simple: allowing teams to move fast by avoiding additional overhead caused by version management and integration. In a monorepo, you share code by just linking libraries, there’s no need to release and publish them first. Just think about some API refactoring. If you distribute libraries over package managers, making substantial changes is getting really hard. It's still tough in a monorepo, but basically all of the code is in your IDE. So you can just refactor in a branch, launch tests and fix the broken code.

As you might guess now, this also comes with downsides. If used at scale within large enterprises, you definitely need a lot of automation and tooling that supports you in this process. Just a simple example: building the entire repo in your CI build is simply not possible as it would take too much time (and thus break the benefit of having short feedback cycles). 

Nx helps here! Nx understands your codebase and builds a dependency graph behind the scenes that allows it to only build your affected apps and libraries, thus dramatically reducing build times. Moreover v8.12 comes with an advanced distributed cache. But read more [about it on our blog](https://blog.nrwl.io/distributed-caching-in-nx-164edfbc68e0?source=collection_home---4------1-----------------------).

### Nx Console (formerly known as Angular Console)

**Website:** [https://nx.dev/nx-console](https://nx.dev/nx-console)   
**GitHub:** [https://github.com/nrwl/nx-console](https://github.com/nrwl/nx-console)

Nx Console is a Visual Studio Code extension for Angular and Nx. If you're not the CLI type of person, then this might be for you. Nx Console automatically finds available schematics in your workspace, thus allowing you to easily control and execute Angular CLI / Nx commands from a nice UI interface.

{{<figure url="/blog/assets/imgs/nx-console.png" size="full">}}

## How is it to work at Nrwl? Did you move to Toronto?

First of all: it's awesome, love it :heart_eyes:!! And no, I didn't move to Toronto, but I rather work **full-time remotely** from home :smiley:.

Nrwl is great. I get to work with different clients around the world and work on Open Source. And the best of all, with a **highly skilled and amazing team**! Everyone is really supportive, open to help out each other. It's been 5 weeks now and I already learned a ton!

It's the **first time for me to work remote full-time**. I did work from home from now and then and of course when I worked for my freelance job. But never full-time so far. Till now it's great. I love the fact I don't have to commute each day, and especially to be able to spend more time with my little baby boy :baby:. That's priceless.  
I also love the fact to go for a quick run over lunch, come back, have a shower & continue working.

{{<figure url="/blog/assets/imgs/run-workouts.jpg" size="full">}}

Communication with the team works like charm. We communicate through Slack and Zoom meetings. Meetings are super efficient and we even have a lot of fun :smiley:

{{<figure url="/blog/assets/imgs/nrwl-standup.png" size="full" caption="Weekly standup with the team (some are unfortunately missing)">}}

Here's the official blog post about [me and others joining Nrwl in 2020](https://blog.nrwl.io/2020-starts-with-an-even-stronger-team-at-nrwl-d1c7f946d659).

## We Are Now Taking On New Clients in Europe!

Nrwl expands into Europe. After [Jo Hanna Pearce](https://twitter.com/jdpearce), me and [Rares Matei](https://twitter.com/volkeron) joined in January to reinforce the European team (and there are more to come :wink:). With that **we're now ready to take on new European clients 🎉**. So if you're curious, let us know!


## What about your Freelance Training, Blogs, Videos and Egghead?

Everything will continue just as normal. Of course I won't be doing any freelance training any more on my own, but rather through Nrwl. I will continue to blog and publish videos on my [Youtube Channel](https://www.youtube.com/juristrumpflohner) & [Egghead](https://egghead.io/instructors/juri-strumpflohner).

Blogging and publishing content in general has been a big passion for me for over a decade now. And ultimately it is the reason I became a [Google Developers Expert](https://developers.google.com/community/experts/directory/profile/profile-juri_strumpflohner), why I started to speak at conferences and now to get the job at Nrwl.

Also, if you don't wanna miss anything, [subscribe to my Newsletter](/newsletter).

## Will you continue to speak at conferences and events?

I definitely will! I love to speak and engage with the community. Expect it to be rather slow this year. Not because of joining Nrwl, but rather because I try to reduce travelling and stay more at home with the :baby:.