---
layout: post_new
title: "Ok.. let me explain: it's going to be Angular 4"
lead: "And from now on we will just call it Angular"
postimg: "/blog/assets/imgs/angular4announcement.png"
tags: [ "JavaScript", "Angular"]
---

<div class="article-intro">
    At the 8th and 9th of December 2016 was <a href="https://ng-be.org/" target="_blank">NG-BE, Belgium’s first Angular conference</a>. <a href="https://twitter.com/IgorMinar" target="_blank">Igor Minar (Angular lead dev)</a> attended as the keynote speaker with some interesting announcements regarding Angular’s release schedule. Please read the <strong>entire post</strong>, there are a couple of important things.
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

Back in September when the [new Angular was finally released](/blog/2016/09/ng2-released/), the Angular team also [announced](http://angularjs.blogspot.com/2016/10/versioning-and-releasing-angular.html) they will switch to [Semantic Versioning (SEMVER)](http://semver.org/).

As the name already explains, Semantic Versioning is all about **adding meaning to version numbers**. This allows developers to not only reason about any upgrade we do, but we can even let tools such as NPM do it in a automatic and safe manner for us.  
A semantic version consists of **three numbers**:

<figure class="image--medium">
    <img src="/blog/assets/imgs/semver.png" alt="Semantic versioning explained">
</figure>

Whenever you fix a bug and release it, you increase the last number, if a new feature is added, you increase the second number and whenever you release a breaking change you increase the first number.

<blockquote class="emphasized">
"A <i>breaking change</i> happens whenever you as a developer and consumer of a library, have to <i>step in</i> and adjust your code after a version upgrade."
</blockquote>

So what does this mean for the Angular team? As with every evolving piece of software, breaking changes will occur at some point. For example, giving a compiler error for existing application bugs that went unnoticed with the previous compiler version, anything, that will break an existing application when upgrading Angular, requires the team to bump the **major version number**.


Just to be clear, as also [Igor mentioned in his talk](https://youtu.be/aJIMoLgqU_o?t=15m3s). Right now, even just upgrading Angular's TypeScript dependency from v1.8 to v2.1 or v2.2 and compile Angular with it, would technically cause a breaking change. So they're taking SEMVER very, very seriously.

## Breaking changes don't have to be painful!

People that have been following the Angular community for a while, definitely know what I'm talking about. We went from Angular 1 to Angular 2, and it was a total breaking change, with new APIs, new patterns. That was obvious: ultimately Angular 2 was a complete rewrite. (Even though [there are upgrade options for you available](https://angular.io/docs/ts/latest/guide/upgrade.html))

Changing from version 2 to version 4, 5, ... won't be like changing from Angular 1. **It won't be a complete rewrite**, it will simply be a change in some core libraries that demand a major SEMVER version change. Also, there will be proper [deprecation phases](http://angularjs.blogspot.com/2016/10/versioning-and-releasing-angular.html#Deprecation_policy_31) to allow developers to adjust their code.

Internally at Google, the Angular team uses a tool for handling automatic upgrades, even of breaking changes. This is still something that has to be planned in more detail, but the team is working hard on making this tool generally available, most probably in 2017 in time for Angular 5.

## It's just "Angular"

As you might have already guessed, the term "Angular 2" is also kind of deprecated once we get to version 4, 5 etc. That said, we should start naming it simply "Angular" without the version suffix.

<blockquote class="emphasized">
It's just #angular
</blockquote>

Also, we should start avoiding GitHub/NPM libraries prefixed with `ng2-` or `angular2-`.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/toddmotto">@toddmotto</a> <a href="https://twitter.com/manekinekko">@manekinekko</a> <a href="https://twitter.com/jdfwarrior">@jdfwarrior</a> <a href="https://twitter.com/schwarty">@schwarty</a> but please don&#39;t call projects ng2- or angular2-, etc.</p>&mdash; Igor Minar (@IgorMinar) <a href="https://twitter.com/IgorMinar/status/807564558986514432">December 10, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

### Naming guidelines

The main suggestion is to use “Angular 1” and “Angular” (for v2+). This removes any kind of ambiguity and is probably a better approach of using “AngularJS” (for v1) which might still lead to confusion especially for Angular newcomers. All the docs - even for Angular 1 - will be aligned to this in the coming weeks.

Here are some guidelines related to the naming:

- Use “Angular” by default (“I’m an Angular developer”, “This is an Angular meetup”, “The Angular ecosystem is growing quickly”)
- “Angular 1”, “Angular 2”, “Angular 4” when talking about a specific release train (e.g. when talking about a newly introduced feature - “This is an introduction to feature X, introduced in Angular 4”, “We are upgrading from Angular 1 to Angular 2”, “I’m proposing this change for Angular 5”)
- Use full semver version when reporting a bug (“This issue is present as of Angular 2.3.1”)

Also in blog articles, whenever you are targeting a very specific version of Angular, consider adding a header line which states that:

> This articles uses Angular **v2.3.1**.

That helps avoid confusion for your readers, especially when you are writing about specific APIs.
_(I'll update [my existing articles](/blog/collections/angular-2/) here accordingly)_

## Why not version 3 then?

The core Angular libraries live in one single GitHub repository at [github.com/angular/angular](https://github.com/angular/angular). All of them are versioned the same way, but distributed as different NPM packages:

<figure class="image--medium">
    <a href="/blog/assets/imgs/angular2-versions.png" class="image--zoom">
        <img src="/blog/assets/imgs/angular2-versions.png">
    </a>
    <figcaption>Current misalignment of versions with Angular router</figcaption>
</figure>

**Due to this misalignment of the router package's version**, the team decided to go straight for Angular v4. In this way again, all the core packages are aligned which will be easier to maintain and help avoid confusion in the future.

Also it is important to understand how Angular is being used and integrated inside Google (Igor [speaks about this here in his keynote](https://youtu.be/aJIMoLgqU_o?t=9m10s)). All Google applications use Angular version equal to the current GitHub’s master branch of the Angular repository. Whenever a new commit lands in master, it will be integrated into Google’s single, giant mono-repo, where also other products such as Maps, Adsense etc. live. As a consequence all of the projects using Angular internally at Google will run their extensive test suites against this new version. This makes the team very confident to cut a new release, since it will contain the exact combination of versions of Angular packages that have been already battle tested inside Google. Thus, having aligned versions totally makes sense and makes it easier to maintain them over time, which in turn helps the team be more productive in releasing new features.

## Tentative Release schedule

The fact that breaking changes will arrive, doesn't mean they will arrive every other week. The Angular team committed to [time based releases that occur in three cycles](http://angularjs.blogspot.com/2016/10/versioning-and-releasing-angular.html#Timebased_release_cycles_18):

- patch releases every week,
- 3 monthly minor release after each major release and
- a major release with easy-to-migrate-over breaking changes every 6 months.

The next 3 months will be dedicated to finalizing Angular 4.0.0.

<figure class="image--medium">
    <a href="/blog/assets/imgs/angular4-tentativeschedule.png" class="image--zoom">
        <img src="/blog/assets/imgs/angular4-tentativeschedule.png">
    </a>
</figure>

After Angular 4.0.0, this will be the _tentative schedule_ for further releases:

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

There are two main important messages here:

1. don’t worry about version numbers
1. we do need to evolve Angular in order to avoid another Angular 1 to Angular 2 change, but we should do it **together as a community in a transparent, predictable and incremental way**.

Also, I'd like to thank Igor for being so open at presenting this data, especially since he knows what a sensitive topic breaking changes are and have been in the past. This means a lot and I hope that the community will realize why all these changes are good for everyone involved.

_Thanks to Igor, Brad and the whole Angular team for reviewing this blog post. This once more shows how much their care about community work. :smiley:_

### Still questions?

[Let me know](https://github.com/juristr/ama) :+1:.
