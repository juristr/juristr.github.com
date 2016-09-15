---
layout: post_new
title: "Angular 2 released!!"
lead: "After two years of intense development it has now been officially released"
postimg: "/blog/assets/imgs/angular2-out.jpg"
tags: [ "JavaScript", "Angular"]
---

<div class="article-intro">
  It was at the ng-Europe, on the 22-23 September 2014 when the Angular team came with a huge surprise: "We're going to build Angular 2." No controllers, no scope, completely different from ground-up, totally written. Oh, and no migration path. The result: grumbling among the community. Now, quite exactly two years later, we obviously know better, and finally Angular 2 has been officially released. <i>(And yes, there is <a href="http://ngmigrate.telerik.com/" target="_blank">a migration path</a> :wink:)</i>
</div>

{% include postads %}

<video width="100%" height="100%" autoplay="autoplay" loop="loop">
  <source src="/blog/assets/imgs/ng2outanimation.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>

## Major announcements

Angular 2 is going to have **breaking changes only every 6 months** from now on. So the next one would be around February with Angular 3. Yes exactly, they're also **finally switching to [semantic versioning](http://semver.org/)** which is a huge win in my opinion. That way you can easily recognize whether a release is breaking or not.  
For easier upgrading, they will start releasing an open source tool they've already been using internally, which aims at helping you **to to semi-automatically upgrade your application, even in case of breaking changes**.  
Obviously the team will continue to do regular releases of non-breaking changes.

In the **next couple of months, they're heavily working on**
- animations
- help push web workers out of experimental status
- many improvements to mobile, especially for PWA (Progressive Web App) support
- improved support for more universal languages like Java and Go

A **release of a fully functional suite of material design components** is very close as well!

## Q&A

Here are the interesting questions/answers from the Q&A session. **Important,** the questions and answers are paraphrased by myself based on the live announcement (see video at the end).

#### Would you expect the runtime compiler during app development or is the goal always to use the AoT compiler?

**[@robwormald](https://twitter.com/robwormald) -** We'd like it to get to a point where we can use AoT all the time as the default. We're gonna plug it into webpack very soon, so it should definitely be doable there.

#### What's the best place for developers learning Angular 2 to ask questions and get help from the community?

**[@IgorMinar](https://twitter.com/IgorMinar) -** Asking questions on StackOverflow is great as the team can upvote good questions/answers and help out. Also on the official docs there's a FAQ section and finally also on [Gitter](https://gitter.im/angular/angular).


#### What's the vision of the development experience with AoT?

**[@robwormald](https://twitter.com/robwormald) -** Smaller and faster.


#### Will the core team dedicate more resources to the Angular CLI

Yes, the team is definitely committed to invest more on the CLI and improve it. One of the things that has been done currently is to finally finish the webpack migration which is now available.


#### Which tools or repo should I use for new projects?

**[@robwormald](https://twitter.com/robwormald) -** Obviously the [Angular CLI](https://cli.angular.io/), [Minko's Angular 2 seed project](https://github.com/mgechev/angular2-seed), [Patrick's angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter) and the [Angular quickstart](https://github.com/angular/quickstart).

#### Do you guys have plans to make the CLI more configurable?

There are a lot of requests for that currently and the team is working on it and wanna support in the future. The current direction is to build an add-on system.  
Some other current ideas are around to build a kind of an "eject button" which allows you to get out of the CLI at some point if you need way more flexibility.

#### You're going with semantic versioning. How will you support compatibility between the different pieces within the project.

**[@IgorMinar](https://twitter.com/IgorMinar) -**  That's all semver is all about, it helps manage those dependencies.

**[@robwormald](https://twitter.com/robwormald) -** You will most likely see the core libraries move in sync and others around it a bit behind.

**[@IgorMinar](https://twitter.com/IgorMinar) -** A comment about the breaking changes. The team will make the breaks as smooth as possible, by deprecating APIs and therefore to give enough time to migrate.

#### To moduleId or not to moduleId

**[@robwormald](https://twitter.com/robwormald) -** Strangely one of the most difficult problems we've had. There's a very good solution for webpack and we'd like to have the tooling to handle this for you. There are plans for how to do it more smarter for SystemJS. You do It's not on any deprecation path, so you it would be totally fine to use it.

#### How long will Angular 1 will be supported?

**[@bradlygreen](https://twitter.com/bradlygreen) -** As mentioned often, we will continue to support Angular 1 as long as the majority of people uses it.  Currently:

- 1.3 million people use Angular 1.
- 480k already use Angular 2.

But anyway, it's not that it gets deleted from the web, even after the team continues to actively support it.

#### How close are we to open sourcing the tool that auto upgrades Angular 2 projects across versions

to open source tool that automatically upgrades angular

**[@Jakeherringbone Alex Eagle](https://twitter.com/Jakeherringbone) -** We're doing it incrementally and we're making some progress. Contributions have been made to tslint so that the type checker and language type checker can be used to make changes in the Typescript code. We also started to work with Minko to use the Angular language service to make the templates type aware s.t. changes can be applied to the template code. The hope is to have it available by the time Angular 3 comes along with breaking changes.

## Full Interview

Here's the recording of the live announcement.

<iframe width="853" height="480" src="https://www.youtube.com/embed/xTIWBXkpvDc" frameborder="0" allowfullscreen="allowfullscreen"> </iframe>

## Where to start from here

[Follow me on Twitter](https://twitter.com/juristr) or [subscribe on this blog here](http://feeds.feedburner.com/juristrumpflohner) to stay up to date about interesting stuff around Angular 2 and web development. If you have questions, feel free [to AMA (ask me anything)](http://github.com/juristr/ama).

Here are some starter links.

{% include article-link.html
    url="/blog/2016/06/ng2-getting-started-for-beginners/"
    title="Angular 2 - A Getting Started Guide for Beginners"
    text="A gentle introduction to what Angular 2 is all about, targeted especially to beginners."
    imageurl="/blog/assets/imgs/linkpics/angular2logo.svg"
%}

{% include article-link.html
    url="/blog/collections/angular-2/"
    title="Collection of Angular 2 articles"
    text="A collection of Angular 2 related articles on my blog here"
    imageurl="/blog/assets/imgs/linkpics/angular2logo.svg"
%}

{% include article-link.html
    url="https://angular.io"
    title="Official Angular 2 site"
    text="Check out the docs and guides on the official Angular 2 site"
    imageurl="/blog/assets/imgs/linkpics/angular2logo.svg"
%}

{% include article-link.html
    url="http://victorsavkin.com/"
    title="Victor Savkin's blog"
    text="Victor Savkin is a core member of the Angular team and has a bunch of super interesting, in depth articles on his blog"
    imageurl="/blog/assets/imgs/linkpics/victorsavkin.jpg"
%}

{% include article-link.html
    url="http://thoughtram.io/blog"
    title="Thoughtram"
    text="Awesome training articles by Pascal Precht, Christoph Burgdorf and Thomas Burleson"
    imageurl="/blog/assets/imgs/linkpics/thoughtramlogo.png"
%}
