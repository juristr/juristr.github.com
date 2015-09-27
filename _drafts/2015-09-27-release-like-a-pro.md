---
layout: post
title: "Release your libs like a pro!"
lead: "Fully automated semantic releases to npm and bower"
show_img_in_detail: true
coverimage: true
category:
tags: ["JavaScript"]
---

Automate, automate, automate. That's what is our job ultimately. We automate the tedious processes of our end-users. So why don't we do it for ourselves as well? This guide quickly illustrates how to setup fully automated releases to Bower and NPM. And they're even automatically semantic versioned.

> Bower, NPM, semantic versioning?? Sounds strange? Check out my article [Node, Grunt, Bower and Yeoman - A Modern web dev's Toolkit](/blog/2014/08/node-grunt-yeoman-bower/).

I [love to contribute to Open Source libraries on GitHub](/blog/2015/06/github-social-contribute-learn/) and so should you!. You learn a lot, it's coding as a hobby (not for being payed) and finally it's also rewarding, especially when you then see people use your stuff, discuss with them etc. Most of the projects that get shared on GitHub are utility libraries that are designed to be highly reusable across projects. As such (for being discovered and used), they should follow a series of good practices like

- have good documentation (gosh! :unamused: )
- have automated tests in place
- ...
- **released on package managers** to be easily discoverable
- **follow the semver specs**

The last points are the ones I'd like to address with this article as they're something I see devs often struggle with.

## Issue 1: Releasing on Bower and NPM

I'm going to talk about JavaScript as it is the prevalent language on GitHub. As such, the main repos to deploy to are currently [Bower](http://bower.io/) and [NPM](https://www.npmjs.com/). There are other package managers on the way like [JSPM](http://jspm.io/) but you can treat it as Bower as it works similarly directly off the GitHub repo.

Releasing to those package managers is important so that people can use your library the easiest possible way.

## Issue 2: Follow the semver spec

When you release a new version, it is important to communicate your changes. Did you add new features, just patched some bugs, are changes breaking? These are important things for a developer to know whether it is safe to upgrade. Package managers like Bower and NPM provide even mechanisms to perform automatic upgrades to the next "safe" version. Obviously this only works if you properly follow the [semver spec](http://semver.org/).

That's where people mostly fail. Should we increment the patch? The minor? Well, we did add some features, but hey...they aren't thaaat huge.. maybe we should only increase the patch.  
These are the kind of thoughts going on...even worse: increase the minor even if it's a breaking change. Lot of libs do that, even popular ones like the Angular v1.x!!

But it doesn't have to be like that. The semver spec is quite clear and should not leave any doubts. That's probably what [Stephan Bönnemann](https://twitter.com/boennemann) thought as well and started to automate the whole stuff. We'll shortly see how.

## Issue 3: Changelog

Finally, the change log. 99% of the time absent, 1% of the time hand written and very flaky. Well, heard about **"conventional commits"?? If I'm not wrong, the Angular first introduced them: [read here](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#).

tl;dr: It is a structured way of writing your commit messages that can then be easily parsed into an automated changelog.

## Automated releases, with changelog, following semver

- semantic-release
- publish-latest (for Bower & JSPM?)
- CONTRIBUTING.md
- Videos on egghead.io by Kent C. Dodds on creating a JS library
