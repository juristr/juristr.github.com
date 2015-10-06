---
layout: post
title: "Release your libs like a pro!"
lead: "Fully automated semantic releases to npm and bower"
show_img_in_detail: true
coverimage: true
category:
tags: ["JavaScript"]
---

Automate, automate, automate. That's what ultimately is our job, right? We automate the tedious processes of our end-users. So why don't we do it for ourselves as well? This guide quickly illustrates how to setup fully automated releases to Bower and NPM. And they're even automatically semantic versioned.

> Bower, NPM, semantic versioning?? Sounds strange? Check out my article [Node, Grunt, Bower and Yeoman - A Modern web dev's Toolkit](/blog/2014/08/node-grunt-yeoman-bower/).

I [love to contribute to Open Source libraries on GitHub](/blog/2015/06/github-social-contribute-learn/) and so should you!. You learn a lot, it's coding as a hobby (not for being payed) and finally it's also rewarding, especially when you then see people use your stuff, discuss with them etc. Most of the projects that get shared on GitHub are utility libraries that are designed to be highly reusable across projects. As such (for being discovered and used), they should follow a series of good practices like

- have good documentation (gosh! :unamused: )
- CONTRIBUTING.md
- have automated tests in place
- ...
- **have automated builds in place**
- **released on package managers** to be easily discoverable
- **follow the semver specs**
- **have a changelog**

The last points are the ones I'd like to address with this article as they're something I see devs often struggle with.

### Issue 1: Have automated builds

You certainly already have your build scripts in place. Like Grunt, Gulp, Webpack or whatever of the currently fancy build tools you're using. When you have that (and you definitely should), then you're only steps away from a full blown automated build. Such a continuous integration server is extremely valuable as it builds your code, maybe lints it, executes your tests, frankly, it helps you keep your code working. This becomes even more important when other devs start to contribute to your library (which is the goal after all).

As we will see, it's super easy to setup such a CI server and it's even totally free.

## Issue 2: Releasing on package repositories

I'm mainly talking about JavaScript here as it is currently the prevalent lagnuage on GitHub, but it can be easily generalized to other langauges as well. When you develop a library and you share it on GitHub, you want it to be used by others. Thus, installing your lib has to be as easy and straightforward as possible. This can be achieved by deploying your lib dist files to so-called package managers. Currently the most used ones are [NPM](https://www.npmjs.com/) and [Bower](http://bower.io/). There are other package managers on the way like [JSPM](http://jspm.io/) as well. Deployment is done similarly as with Bower, though.

## Issue 3: Follow the semver spec

When you release a new version, it is important to communicate your changes. Did you add new features, just patched some bugs, are changes breaking? These are important things for a developer in order to know whether it is safe to upgrade. Package managers like Bower and NPM provide even mechanisms to perform automatic upgrades to the next "safe" version. Obviously this only works if you properly follow the [semver spec](http://semver.org/).

Sadly, that's where most libs fail. Should we increment the patch? The minor? Well, we did add some features, but hey...they aren't thaaat huge.. maybe we should just increase the patch.  
These are the kind of thoughts going on...even worse: increase the minor even if it's a breaking change. Even popular libraries like Angular v1.x do that!!

But it doesn't have to be like that. The semver spec is quite clear and should not leave any doubts: machines can do it for us! That's probably what [Stephan Bönnemann](https://twitter.com/boennemann) thought as well and started to automate the whole stuff. We'll shortly see how.

## Issue 4: Changelog

Finally, the change log. 99% of the time absent, 1% of the time hand written and very flaky. Well, heard about **"conventional commits"?? If I'm not wrong, the Angular team first introduced them: [read here](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#).

tl;dr: It is a structured way of writing your commit messages that can then be easily parsed into an automated changelog.

- **chore(<target>): <message> -** for housekeeping stuff
- **fix(<target>): <message> -** when fixing a bug
- **feat(<target>: <message> -** when adding a new feature
- ...

Examples:

```
feat(core): add undo/redo functionality

It is now possible to undo/redo changes applied to the model. Simply invoke...
```

or a breaking change

```
feat(..): bla bla

bla bla

BREAKING CHANGE:
This is a breaking change. Before you did... now you have to ....
```

## Love it! Show me how to get it for my lib!

Ok, nice you're interested. Let's get started.

### Get your build scripts ready

- best is to directly hook them on in your package.json
- use npm

### Setup Travis

[Travis](https://travis-ci.org/) is THE continuous integration server for GitHub based projects. You should find everything you need in the official docs, for JavaScript it's this here: [http://docs.travis-ci.com/user/languages/javascript-with-nodejs/](http://docs.travis-ci.com/user/languages/javascript-with-nodejs/).

### semantic-release to the help

- semantic-release
- publish-latest (for Bower & JSPM?)
- link to Kent C. Dodds article on medium which he'll publish shortly

### Add a CONTRIBUTING.md

- CONTRIBUTING.md
- Videos on egghead.io by Kent C. Dodds on creating a JS library
