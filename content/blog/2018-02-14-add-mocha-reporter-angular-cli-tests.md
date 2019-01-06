---
title: Add Mocha reporter for Karma unit tests to your Angular CLI project
lead: Change the default progress reporter to a nicer looking Mocha reporter
categories:
  - Angular
  - testing
date: 2018-02-14T01:00:00.000Z
comments: true
url: /blog/2018/02/add-mocha-reporter-angular-cli-tests
type: post
image: /blog/assets/imgs/karma-progress-reporter.png
---

<div class="article-intro">
	Every Angular CLI generated project comes already with a test setup in place <a href="https://karma-runner.github.io/2.0/index.html">using Karma</a>. I think the default "progress" test result report is not as nice however. So let's pimp it by using the much nicer-looking Mocha reporter :wink:.
</div>

{{< postad >}}

{{< toc >}}

When you run the tests on a fresh Angular CLI setup using `npm test` (or `ng test`) you get a test run output similar to this:

<figure class="image--medium">
  <img src="/blog/assets/imgs/karma-progress-reporter.png">
  <figcaption>Karma output using the progress reporter</figcaption>
</figure>

This is ideal on the CI server or in those cases when you're not really interested in the names of each single test case. I often however like to see the names of my test suites as well as single test names in a nicer format. The Karma Mocha reporter can help here.

## Egghead.io Video Lesson

Lazy? Then check out my Egghead.io companion lesson on how to setup the Mocha reporter for your Karma tests" :smiley:

{% assign video_title = "Configure the Angular CLI to use the Karma Mocha test reporter" %}
{% assign video_url = "https://egghead.io/lessons/angular-configure-the-angular-cli-to-use-the-karma-mocha-test-reporter" %}
{% assign affiliate_client = "eggheadio" %}
{% assign affiliate_uid = "lessons/angular-configure-the-angular-cli-to-use-the-karma-mocha-test-reporter" %}
{% include video-banner.html %}

## Install and configure the Mocha Reporter

First install the Karma Mocha reporter via npm or yarn.

```
$ npm install karma-mocha-reporter --save-dev
```

Next, we need to adjust our `karma.conf.js` by adding the `karma-mocha-reporter` to the `plugins` section as configuring `mocha` as the reporter.

```javascript
module.exports = function (config) {
  config.set({
    ...
    plugins: [
      ...
      require('karma-mocha-reporter'),
      ...
    ],
    ...
    reporters: ['mocha', ...],
    ...
  });
};
```

## Final configuration and outcome

That was it, if you now execute your test, you'll get a much nicer rendering:

<figure class="image--medium">
  <img src="/blog/assets/imgs/karma-mocha-reporter.png">
  <figcaption>Tests executed with the Karma Mocha reporter</figcaption>
</figure>

