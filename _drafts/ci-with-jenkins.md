---
layout: post
title: "CI with JavaScriptMVC, QUnit on Jenkins"
description: ""
postimg: "/blog/assets/imgs/jenkins-logo.png"
show_img_in_detail: true
category: 
tags: [ "JavaScript" ]
---
Bla bla bla intro

## Configure JavaScriptMVC Build

I suppose you have already some QUnit tests written. Executing them on the browser is as simple as calling the QUnit HTML file which should result in something like this:

![qunit unit tests](/)

However, this is not quite suitable for being able to integrate it into a continuous integration build (CI build). In that case a command line output is more machine readable.

### Headless Browsers

What is a headless browser?? It is basically a web browser without any kind of graphical user interface, made for the specific purpose of providing the content of web pages to other programs.

And that's exactly what we need, right? We need the full power of a web browser s.t. we can execute our QUnit tests which might operate on DOM nodes, but at the same time the results of those operations should be provided to an automated program rather than a human being.

There are different kind of such headless browsers available:

- HtmlUnit
- Ghost
- Twill
- EnvJS
- PhantomJS
- ...
- [even more](https://gist.github.com/evandrix/3694955)

### Install PhantomJS

PhantomJS is among the more popular ones.

> PhantomJS is a headless WebKit scriptable with a JavaScript API. It has fast and native support for various web standards: DOM handling, CSS selector, JSON, Canvas, and SVG. <cite><a href="http://phantomjs.org/">PhantomJS website</a></cite>

As such JavaScriptMVC supports PhantomJS as well. However it is not included by default (as EnvJS for instance) but instead you'll have to download it separately.

> Before you can use PhantomJS, you have to install it. The other automation tools come prepackaged in JMVC, but Phantom is too large of a download. <cite><a href="http://javascriptmvc.com/docs.html#!funcunit.phantomjs">Offical Docs</a></cite>

Installing is pretty easy, just go to the [offical PhantomJS website](http://phantomjs.org/) and hit the download button. Extract it to a suitable location and don't forget to **add it to your path environment variable**.

### Executing QUnit using Funcunit on the Command Line

Now that you've installed PhantomJS, executing your QUnit tests on the command line should work with the following command:

    js funcunit\open\phantomjs myproject\tests\qunit.html -failOnError 1

Note, this needs to be executed from within your JavaScriptMVC root and obviously you need to substitute "myproject" etc with the correct name and path of your project. As a result you should see a list of executed tests as well as a summary at the end indicating how many tests have been executed and whether it was a SUCCESS or FAILURE.

> **Note:** The `failOnError` flag tells FuncUnit to exit the process with an error level different than 0. This is necessary to communicate it to the caller of the test execution (i.e. an CI server) which then normally fails the build.

![](/blog/assets/imgs/phantomjs_testresults.png)

### Check ERRORLEVEL

Normally when the tests fail you usually want to fail your build as well. This is normally achieved by exiting the process abnormally. On Windows you can check that by executing

    echo %ERRORLEVEL%

right after the execution of the tests. If the build fails the `%ERRORLEVEL%` should be different than `0`.

If **that's not the case** then you

- have either not executed the tests with the `-failOnError 1` flag or
- you have an old FuncUnit version containing a bug.



- https://github.com/bitovi/funcunit/blob/master/open/output/output.js#L158
- https://github.com/bitovi/funcunit/blob/master/open/output/output.js#L158

## Configure Jenkins

### Install XUnit

![](/blog/assets/imgs/jenkins_xunitplugin.png)

![](/blog/assets/imgs/jenkins_buildfailure.png)

![](/blog/assets/imgs/jenkins_gitlab_widget.png)


## Links

- http://www.readmore.ch/post/18940470535
- https://github.com/jquery/qunit-reporter-junit/blob/master/qunit-reporter-junit.js
