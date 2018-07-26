---
layout: post_new
title: "[object ErrorEvent] thrown by Karma in Angular Unit Tests"
lead: "Learn how to get out of this cryptic error message"
postimg: "/blog/assets/imgs/markus-spiske-666904-unsplash.jpg"
tags: [ "Angular" ]
---

<div class="article-intro">
	I’m pretty sure when you’ve already come across this exception: `[object ErrorEvent] thrown` when you execute your Karma tests in an Angular project. Not very helpful, right? Let’s take a look how to get more a more useful info and finally resolve it.
</div>

{% include postads %}

{% assign message = "Contents are based on Angular version >= 6.0.0" %} {%
include warn-notice.html %}

{% include toc.html %}


So I was executing my Angular unit tests and all of a sudden the following error message popped up. Here’s a screenshot of it:

![](https://d2mxuefqeaa7sj.cloudfront.net/s_CDA7EC56E6EEF97748FB76CE8CF4B3208394D402B9B39248A7980D76F9E14CA7_1532328706431_image.png)


I’m executing my tests using Headless Chrome, the same I’m using also on my CI server. Here’s the configuration of my `karma.conf.js`:

```javascript
// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-mocha-reporter')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    reporters: ['mocha', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: ['--headless', '--disable-gpu', '--no-sandbox', '--disable-extensions', '--remote-debugging-port=9222']
      }
    },
    singleRun: false
  });
};
```
    
So in order to get a better error message there are different possibilities.

## Option 1: Debug using the Chrome Devtools

Many times, debugging your test in the Chrome Devtools already helps you out. First of all, if you’re running on Headless Chrome, first switch to a real browser. You can use the `--browsers` CLI flag


    $ ng test --browsers=Chrome

As a result, you should see Chrome starting and opening the Karma running in a webpage.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_CDA7EC56E6EEF97748FB76CE8CF4B3208394D402B9B39248A7980D76F9E14CA7_1532329037425_image.png)


Click the “Debug” button and then in that new tab window, open the Chrome Devtools (or the corresponding one of your browser) just as you usually do. In the Devtools console you should now see the real error:


![](https://d2mxuefqeaa7sj.cloudfront.net/s_CDA7EC56E6EEF97748FB76CE8CF4B3208394D402B9B39248A7980D76F9E14CA7_1532329138883_image.png)


That error message is a lot more clear. In fact, within an RxJS Observable pipe function I had a null exception, which caused the `[object ErrorEvent] thrown` exception to pop up.

## Option 2: Disable source maps

If debugging doesn’t help, you might try this approach. There has been (and there’s still a regression) in the Angular CLI which in certain situations gives you a cryptic error message when the source maps are enabled (which is the default). So it might be worth disabling them to see whether the error message improves. We can do that by using one [of the many Angular CLI flags](https://github.com/angular/angular-cli/wiki/test).


    $ ng test --source-map=false


## Conclusion

Hope that helps you out of some tricky debugging session. Have another suggestion? Let me know and just drop me a line [on Twitter](https://twitter.com/juristr) or [on my AMA](https://github.com/juristr/ama).