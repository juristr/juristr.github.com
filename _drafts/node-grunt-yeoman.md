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

### Installing node packages

Installing a node package is as simple as executing

```
$ npm install grunt
```

Node packages are installed into a folder called `node_modules`.

![Demo: installation of a node  module](/blog/assets/imgs/node-grunt-yeoman/node-module-install-demo.gif)

The best practices approach though is to create a `package.json` file. Since the suggested approach is to not commit the content of your `node_modules` folder to your VCS, but rather to automatically reinstall them during the build process, you need a place to keep track about the installed package and its according version: `package.json`.

To create a new one, execute `npm init` inside a clean folder. This will guide you through the creation of a new file.

![](/blog/assets/imgs/node-grunt-yeoman/package-json.png)



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

Grunt is **automation**. It is a task-based command line build tool for JavaScript projects. The official headline: "The JavaScript Task Runner".

![](/blog/assets/imgs/node-grunt-yeoman/grunt-logo.jpeg)

To get started, simply follow the [online guide on the official site](http://gruntjs.com/getting-started). There's also a great book [Getting Started with Grunt - The JavaScript Task Runner](http://www.packtpub.com/web-development/getting-started-grunt-javascript-task-runner) published by PacktPub which is ideal for beginners.


### Installation

Grunt runs on top of Node.js platform and is distributed through the npm repository. It comes as two different tools

- `grunt-cli` which is the **Grunt Command-line interface**
- `grunt` module

The reason for having two components is to make sure we can run different grunt versions side-by-side (i.e. legacy versions in older projects). Hence, `grunt-cli` is installed globally while `grunt` is installed on a per-project basis.

```
$ npm install -g grunt-cli
```

Then enter the project where you wish to use Grunt and execute

```
$ npm install grunt
```

### Grunt modules

Grunt modules are distributed through Node's NPM directory. Normally, Grunt specific modules are prefixed with `grunt-` and official grunt plugins are prefixed `grunt-contrib`. Example: `grunt-contrib-uglify`.

Hence, Grunt modules are node modules and thus you install them just as you normally would

```
$ npm install --save-dev grunt-contrib-uglify
```

### Gruntfile.js

The `Gruntfile.js` is the place where you configure the Grunt tasks for your project.






