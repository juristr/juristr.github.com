---
layout: post_new
title: "Ok.. let me explain: it's going to be Angular 4"
lead: "And from now on we will just call it Angular"
postimg: "/blog/assets/imgs/angular4announcement.png"
tags: [ "JavaScript", "Angular"]
---

<div class="article-intro">
    I just attended <a href="https://ng-be.org/" target="_blank">Belgium's first Angular conference (NG-BE)</a>. It was one of the best conferences I've been so far. But more on  that later. <a href="" target="_blank">Igor Minar (Angular lead dev)</a> was there as well and made a couple of interesting announcements regarding Angular's release schedule. Please read <strong>the entire post</strong>, there are a couple of important things.
</div>

{% include postads %}

Igor was extremely open and transparent about the announcement and even about the way of presenting it. He basically created the presentation openly the day before the conference:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I&#39;ll be conducting a major open source experiment at <a href="https://twitter.com/ngbeconf">@ngbeconf</a> tonight at 10pm downstairs in the main room. Come if you want to participate.</p>&mdash; Igor Minar (@IgorMinar) <a href="https://twitter.com/IgorMinar/status/806957556589596673">December 8, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

So here it is:

<figure class="image--wide">
    <img src="/blog/assets/imgs/angular4announcement.png" >
</figure>

**Why Angular 4??** Why even Angular 3?? What is going on?

## Angular uses SEMVER

Back in September when the [new Angular was finally released](/blog/2016/09/ng2-released/), the Angular team also announced they will switch to [Semantic Versioning (SEMVER)](http://semver.org/).

As the name already explains, Semantic Versioning is all a about **adding meaning to version numbers**. This allows us developer not only to reason about any upgrade we do, but we can even let tools such as NPM do it in a automatic and safe manner for us.  
A semantic version consists of **three numbers**:

<figure class="image--medium">
    <img src="/blog/assets/imgs/semver.png" alt="Semantic versioning explained">
</figure>

Whenever you fix a bug and release it, you increase the last number, if a new feature is added, you increase the second number and whenever you release a breaking change you increase the first number.

<blockquote class="emphasized">
"A <i>breaking change</i> happens whenever you as a developer and consumer of a library, have to <i>step in</i> and adjust your code after a version upgrade."
</blockquote>

So what does this mean for the Angular team? As with every evolving piece of software, breaking changes will occur at some point. Even a silly thing like to change the API for the better, such as adjusting the name of a method (just to make a stupid example), anything that will break an existing application when upgrading Angular, requires the team to bump the **major version number**. 

Just to be clear, as also [Igor said in his talk](https://youtu.be/aJIMoLgqU_o?t=15m3s). Right now, even just upgrading Angular's TypeScript dependency from v1.8 to v2.1 or v2.2 and compile Angular with it, would technically cause a breaking change. So they're taking SEMVER very, very seriously.

## Breaking changes don't have to be painful!

People that have been following the Angular community for a while, definitely know what I'm talking about. We went from Angular 1 to Angular 2, and it was a total breaking change, with new APIs, new patterns. That was obvious: ultimately Angular 2 was a complete rewrite. (Even though [there are migration options for you available](https://angular.io/docs/ts/latest/guide/upgrade.html))

Changing from Angular 2 to Angular 4, 5, ... won't be like changing from Angular 1 to Angular 2. **It won't be a complete rewrite**, it will simply be a change in some core libraries that demand for a major SEMVER version change. Also, there will be proper deprecation phases to allow developers to adjust their code.

_The team even once proposed the release of a tool to automatically upgrade projects to major releases, a tool which they use internally at Google. But there are no further notices for such tool as of now._

## It's just "Angular"

As you might have already guessed, the term "Angular 2" is also kind of deprecated once we get to Angular 4, 5 etc. That said, we should start naming it simply "Angular" without the version suffix.

<blockquote class="emphasized">
It's just #angular
</blockquote>

Also, we should start avoiding GitHub/NPM libraries prefixed with `ng2-` or `angular2-`.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/toddmotto">@toddmotto</a> <a href="https://twitter.com/manekinekko">@manekinekko</a> <a href="https://twitter.com/jdfwarrior">@jdfwarrior</a> <a href="https://twitter.com/schwarty">@schwarty</a> but please don&#39;t call projects ng2- or angular2-, etc.</p>&mdash; Igor Minar (@IgorMinar) <a href="https://twitter.com/IgorMinar/status/807564558986514432">December 10, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

### My proposal

Use "AngularJS" for Angular 1.x and "Angular" for Angular 2+. Also in blog articles, consider to add a header line which defines which Angular SEMVER version you're using:

> This articles uses Angular **v2.3.1**.

That helps avoid confusion for your readers, especially when you are writing about specific APIs.
_(I'll update [my existing articles](/blog/collections/angular-2/) here accordingly)_

## Why not Angular 3 then?

The core Angular libraries live in one single GitHub repository at [github.com/angular/angular](https://github.com/angular/angular). All of them are versioned the same way, but distributed as different NPM packages:

<figure class="image--medium">
    <a href="/blog/assets/imgs/angular2-versions.png" class="image--zoom">
        <img src="/blog/assets/imgs/angular2-versions.png">
    </a>
    <figcaption>Current misalignment of versions with Angular router</figcaption>
</figure>

**Due to this misalignment of the router package's version**, the team decided to go straight for Angular v4. In this way again, all the core packages are aligned which will be easier to maintain and help avoid confusion in the future.

## Tentantive Release schedule

The fact breaking changes will arrive, doesn't mean they will arrive every other week. The **Angular team tries to agree on a long-term schedule**, meaning they will try to schedule the breaking changes only every six months.

The next 3 months will be dedicated to finalizing Angular 4.

<figure class="image--medium">
    <a href="/blog/assets/imgs/angular4-tentativeschedule.png" class="image--zoom">
        <img src="/blog/assets/imgs/angular4-tentativeschedule.png">
    </a>
</figure>

After Angular 4, this will be the _tentative schedule_ for further releases:

<figure class="image--medium">
    <a href="/blog/assets/imgs/angular-releases.png" class="image--zoom">
        <img src="/blog/assets/imgs/angular-releases.png">
    </a>
</figure>

So you can see that **major versions will be released approximately every 6 months**.

## Video: See the announcement yourself

{% assign youtube_url = "https://www.youtube.com/embed/aJIMoLgqU_o" %}
{% include youtube.html %}

## Conclusion

There's one message I'd like to clearly give: **we need to stop worrying about version numbers**! Semver allows us to reason about them and gives us a tool for estimating the impact of a change and thus helps us decide whether to upgrade or not.

<blockquote class="emphasized">
Stop worrying about version numbers!
</blockquote>

Also, I'd like to thank Igor for being so open at presenting this data, especially since he knows what a sensitive kind of topic breaking changes are and have been in the past. This means a lot and the community should be really thankful for this.

### Still questions?

[Let me know](https://github.com/juristr/ama) :+1:.
