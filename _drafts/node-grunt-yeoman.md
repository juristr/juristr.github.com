---
layout: articles-post
title: "Node, Grunt and Yeoman - A Modern web dev's Toolkit"
lead: "Documenting my learning experience with Angular.js"
show_img_in_detail: false
coverimage: false
tags: ["JavaScript"]
---


## Node and NPM

Node.js brings JavaScript to the server and the desktop. While initially JavaScript was mainly used as a browser based language, with Node you can now also create your server-side backend or even a [desktop application](http://strongloop.com/strongblog/creating-desktop-applications-with-node-webkit/) with [node-webkit](https://github.com/rogerwang/node-webkit) (for the crazy ones among you).

> Node.js® is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices. <cite><a href="http://nodejs.org/">nodejs.org</a></cite>

![](/blog/assets/imgs/node-grunt-yeoman/nodejs.png)

A simple webserver

```javascript
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
```

To run the server:

```javascript
$ node start
Server running at http://172.0.0.1:1337/
```

One of the great things about node is its enourmous community which creates and publishes so-called **node modules** on the [NPM directory](https://www.npmjs.org/) (currently ~90.000 modules and ~390.000 downloads last month).

![](/blog/assets/imgs/node-grunt-yeoman/npm.png)

Besides creating server applications with Node, it has also become the **VM** for JavaScript development tools like minifiers, code linters etc. Both, Grunt and Yeoman (described in this article) are based upon Node's infrastructure.

More on [nodejs.org](http://nodejs.org/) and [npmjs.org](http://www.npmjs.org).

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

Grunt is: **automation**. 

![](/blog/assets/imgs/node-grunt-yeoman/grunt-logo.jpeg)

There's a great book [Getting Started with Grunt - The JavaScript Task Runner](http://www.packtpub.com/web-development/getting-started-grunt-javascript-task-runner) published by PacktPub.

http://gruntjs.com/getting-started




