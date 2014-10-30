---
layout: post
title: Static code analysis for free
lead: Plato gives you static code analysis for free. Now it’s your turn to use the data to your advantage
show_img_in_detail: true
coverimage: false
category:
reposts: ["http://architects.dzone.com/articles/static-code-analysis-free"]
tags: ["JavaScript"]
---

Although [JavaScript might be the world’s most misunderstood language](http://www.crockford.com/javascript/javascript.html), it is now among the most popular and most used ones. Thus you should also treat it as such. Meaning, to properly structure your frontend, apply code linters, automated testing… The available tools make that even easier than you might think.

> You can’t control what you can’t measure <cite>Tom DeMarco</cite>

A quote that remained me from my university studies. But it’s damn hard, isn’t it? You need to collect data, process and prepare it, in the best case visualize it in some way s.t. you can then analyze and draw conclusions from it.

Fortunately JavaScript has a huge community behind which [releases new tooling](/blog/2014/08/node-grunt-yeoman-bower/) on a daily basis.  
[Plato](https://github.com/es-analysis/plato) gives you static JavaScript analysis and reporting for free. It is as simple as **installing it from npm**

```
$ npm install plato
```

and then executing it on your codebase.

```
$ node_modules/.bin/plato -r -d plato-report -t "My report title" -x .json ./src
```

As a result you’ll get an amazing report with dozens of different visualizations of your data, generated directly into your specified output folder `plato-report`. Below is an example screenshot from the [official Plato website](https://github.com/es-analysis/plato) of the result of running it on the jQuery codebase.

![](/blog/assets/imgs/plato-jquery.png)

## Conclusion

Give it a try and see whether it makes sense for you. The job of a good developer is not only to implement the feature the customer requested, but to implement it in the best of his knowledge. As part of my daily job I have to care about the design of the application, about the "beauty of the codebase" as I like it to define.

Plato makes it extremely easy to generate a report, so the **real challenge is to interpret the results**, identify potential weaknesses and sanitize them accordingly. 

So what I did is to create a Jenkins job which generates and publishes the reports on a webserver where all of our devs have access to. Takes you a couple of minutes but it's extremely useful.
