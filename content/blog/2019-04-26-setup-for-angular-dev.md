---
type: post
title: "Setup your Workstation for JavaScript Development"
lead: Learn about the required tools to get started with proper frontend dev
date: 2019-04-26T16:10:05+02:00
comments: true
url: /blog/2019/04/setup-for-angular-dev
image: /blog/assets/imgs/tooling-cover.jpg
categories:
  - Tooling
  - Angular
  - JavaScript
tags:
  - angular
  - tooling
  - git
  - javascript
---

{{<intro>}}
  You want to learn about modern web development with JavaScript? Maybe Angular? Well, then it's time to get you setup properly to get started. In this article we'll go through some of the tools.
{{</intro>}}
<!--more-->

{{< postad >}}

Do you prefer watch a video where I explain the tools you'll need to get started? Here you go:

{{< youtube kVXvwuFa-L4 >}}

## Git

Well...simply because you always need Git. Now to be honest, it's not strictly necessary for the development itself. You can totally create modern JavaScript apps without having Git installed, but it's good practice to use a version control system. If you're in a team, it's inevitable for coordinating multiple contributions to the codebase. But even if you're working on your own. I **always setup a Git repo** even if I just experiment around. It is just local and serves me to create "snapshots" as I'm moving along. Once I'm done, I clean up my Git commit history mess (yes you can do that with Git :wink:) and push it up to a public repo (or merge it into master if it's already shared with others).

Git is really powerful and thus needs a bit of practice. Over the years I've collected some experiences and a set of common git commands and best practices to move along safely. I've bundled all of them into an Egghead course which you can view here: [**Productive Git for Developers**](/blog/2019/04/productive-git-for-developers/)

But back to the installation. You can install Git from the [https://git-scm.com/](https://git-scm.com/) website.

## Node and NPM

The first JavaScript development tool we'll probably need is Node.js and NPM (that comes packaged with it).

> Node.js® is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices. <cite><a href="http://nodejs.org/">nodejs.org</a></cite>

Node.js is usually used to write server-side JavaScript, i.e. as an alternative (or complementary to) traditional languages such as PHP, .Net, Java etc. On the frontend side, it is mostly being used for the tooling, especially by using it's NPM (Node Package Manager). NPM is a package management system similar to Maven (in Java), NuGet (in .Net) or Composer (in PHP) to distribute and install versioned packages.

To **install Node.js (and NPM)** simply go to [https://nodejs.org/en/](https://nodejs.org/en/). Make sure that the `node` binary is linked in your `PATH` environment variable. To verify it is working properly, open a terminal window (Command Prompt or Git Bash on Windows) and type `node -v`

{{<figure url="/blog/assets/imgs/nodejs-version.png" >}}

Similarly, typing `npm -v` should give you the installed version of NPM.

### Multiple parallel node versions needed?

Sometimes you need multiple node verions in parallel. In that case, take a look at [nvm](https://github.com/nvm-sh/nvm). (Note, for Windows use [nvm-windows](https://github.com/coreybutler/nvm-windows)). The installation instructions are on the repo's readme (there's a `curl` that downloads a script that installs everything).

It will install a `nvm` binary which allows you to issue commands like

- `nvm list` - lists all installed versions of Node
- `nvm install <version>` like `nvm install v10.16.0` for installing that specific version of node
- `nvm alias default 10.16.0` to make that the default.

Anyway, you can always just execute `nvm help` to get a list of available commands.

## A Code Editor

Finally to be able to productively write some code, you need a text editor or IDE. There's a variety of editors available out there and it very much boils down to personal preferences which one you like. Personally I recommend using [Visual Studio Code](https://code.visualstudio.com/). It is lightweight, awesome JavaScript and TypeScript support, built-in Git UI and it is even built in JavaScript itself :wink:. Also, being developed in JavaScript it has support for all major platforms (Windows, Linux and MacOS).

{{<figure url="/blog/assets/imgs/vscode-image.png" >}}

Some alternatives:

- [Atom](https://atom.io)
- [Sublime Text (commercial)](https://www.sublimetext.com/)
- [WebStorm (commercial)](https://www.jetbrains.com/webstorm/)

You can obviously also use full blown IDEs such as Eclipse or Visual Studio.

## Framework specific tooling - Angular

For Angular there is a corresponding CLI (Command Line Interface). Its purpose is to improve the entire development experience by helping us to 

- generate/scaffold new code, 
- has a built-in development server, 
- contains instructions to automatically compile our app for production
- runs our tests
- scripts for automatically upgrading when new Angular versions are being released
- ...

The Angular ClI comes packaged as a NPM package. As a result, we can install it using

```
$ npm install -g @angular/cli
```

This command installs the CLI as a global NPM script which we can then simply invoke using the `ng` command in our terminal window.

{{<figure url="/blog/assets/imgs/angular-cli-version.png" >}}

> Alternatively, if you don't want to install the CLI globally, you can always use [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) that comes installed with NPM.
