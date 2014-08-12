---
layout: articles-post
title: "Node, Grunt and Yeoman - A Modern dev's toolkit"
lead: "Documenting my learning experience with Angular.js"
show_img_in_detail: false
coverimage: false
tags: ["JavaScript"]
---


![](/blog/assets/imgs/node-grunt-yeoman/grunt-logo.jpeg)

## Node and NPM


![](/blog/assets/imgs/node-grunt-yeoman/nodejs.png)

## Yeoman

Yeoman has become the standard scaffolding toolkit for creating modern JavaScript applications.

![](/blog/assets/imgs/node-grunt-yeoman/yeoman-logo.png)

Yeoman is build around **generators** which are either developed by the Yeoman team ([official generators](http://yeoman.io/generators/official.html)) or by the [open source community](http://yeoman.io/generators/community.html). Yeoman itself basically just provides the infrastructure for building and running those generators.

> Yeoman helps you kickstart new projects, prescribing best practices and tools to help you stay productive. <cite>From the <a href="http://yeoman.io/">official site</a></cite>

What's nice about such approach is

- that you can quickly get up to speed. Creating a project setup with proper tools and dev support can cost you lots of time and requires expert knowledge.
- that you don't necessarly have to know all the best practices tools that are currently available on the market. Yeoman assembles them for you to get started. Then once you get more expert you can adjust them to your project needs
- that you learn lots and lots of new tools.

Yeoman is distributed as a node module. Simply install it globally

```
$ npm install -g yo
```

Then find your generator (i.e. [for angular](https://github.com/yeoman/generator-angular)), install it...

```
$ npm install -g generator-angular
```

and then execute it within your project directory to create a new app.

```
$ yo angular [app-name]
```

This will create the initial scaffold from which you can then start building your app. But Yeoman goes futher, based on the generator you use, you may also generate single components, like Angular controllers, directives etc. while you develop.

```
$ yo angular:controller user
```

That's all regarding Yeoman's usage. More advanced topics are about creating your own custom generator. Simply [study the docs](http://yeoman.io/authoring/), they're quite detailed.

## Grunt





