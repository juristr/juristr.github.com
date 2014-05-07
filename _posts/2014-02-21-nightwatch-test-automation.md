---
layout: post
title: "Automate your UI testing with Nightwatch"
lead: "Automated UI testing awesomeness based on Node and Selenium"
postimg: "/blog/assets/imgs/logo-nightwatch.png"
show_img_in_detail: true
coverimage: true
category: 
tags: ["testing", "JavaScript", "Node"]
---

Although I feel like I'm repeating myself, automate **everything**. We're here to automate the processes and work of our clients. Why don't we do the same for our own stuff as well? This article quickly outlines how you can use Nightwatch.js for automating your UI testing.

Too often I see developers and tech people manually doing repetitive, annoying tasks. Testing is one such thing. When you deploy, do you verify it's actually running?? I hope you do and still it is a tedious task. You have to open the browser, login to the site, click around and see whether you got the expected results. Boring! Let some "robot" do it for us!

A couple of month ago I automated our REST Api testing by hooking together a reusable jMeter script which can be run against an API definition, directly from our Jenkins build server after a deploy in some environment (a blog post about that is on the way). It is absolutely awesome when get a mail from Jenkins in your inbox with nice little graphs telling you how your last deploy affected overall performance.  
Yesterday I then saw a tweet on my timeline mentioning Selenium, Node and a project called [Nightwatch](http://nightwatchjs.org/). That caught my attention and I quickly jumped in to give it a try.

About 15 minutes later this was the result. A fully automated front-end test that (as of now), logs into our portal and verifies whether the different webapps respond as expected.

<figure>
  <img src="/blog/assets/imgs/nightwatchtests.gif" />
  <figcaption>Example of automating UI testing of our Citizen portal</figcaption>
</figure>

The result is quite impressive.

## The Setup

Follow the installation instructions on the [official Nightwatch page](http://nightwatchjs.org/guide#installation) about installing

- Node and npm
- Nightwatch
- Selenium server

Once you have everything, you can start creating your test specs. The setup you see in the animation above has been launched from the following:

    var egovLogin = require('../utils/egovlogin.js');

    module.exports = {
      "Egov Login Page Loads" : function (browser) {
        browser
          .url("https://myendpoint.it/Login.aspx")
          .waitForElementVisible('body', 5000)
          .assert.elementPresent('input[name="ctl00$plhContentMain$btnLogin"]')
          .end();
      },

      "Admin page loads": function(browser){
        egovLogin(browser, 'https://myendpoint.it/to-test/index.html')
          .waitForElementVisible('.basic-form', 5000)
          .assert.containsText('#header', 'iam perf tests jmeter')
          .assert.elementPresent('.js-sidebarmenu-title')
          .url('https://account.egov.bz.it/auth/logout.aspx')
          .end();
      },

      "IAM Management App": function(browser){
        egovLogin(browser, 'https://myendpoint.it/another-app/index.html')
          .waitForElementVisible('#main', 5000)
          .assert.containsText('#header', 'iam perf tests jmeter')
          .url('https://myendpoint.it/another-app/index.html#account/filter')
          .waitForElementVisible('input[name=username]', 1000)
          .setValue('input[name=id]', '141684')
          .submitForm('form#accountFilter')
          .pause(1000)
          .assert.elementPresent('table.list')
          .assert.containsText("table.list", "EGOV-PERF-TEST")
          .url('https://myendpoint.it/logout.aspx')
          .end();
      }
    };

You basically define your tests within a Node module:

    module.exports = {
        "My test case": function(browser){
            // control the browser
        }
    }

Nightwatch then invokes that test methods, passing you a "browser" object which you can then control by invoking some Nightwatch [commands](http://nightwatchjs.org/api#commands) or [assertions](http://nightwatchjs.org/api#assertions). That's pretty much it.  
The `egovLogin(...)` you see in my tests is simply our login process I factored out into a separate Node module, as it is always the same for all of our services. The logic is nothing more than filling in the username and password and submitting the form to the backend.

    module.exports = function(browser, url){
        return browser
            .url(url)
            .waitForElementVisible('body', 1000)
            .setValue('input[name="ctl00$plhContentMain$txbUserName"]', 'myusername')
            .setValue('input[name="ctl00$plhContentMain$txbPassword"]', 'mypwd')
            .click('input[name="ctl00$plhContentMain$btnLogin"]');
    };

Under the hood, the [Nightwatch test runner](http://nightwatchjs.org/guide#test-runner) communicates with the Selenium server over the [Selenium WebDriver Wire protocol](https://code.google.com/p/selenium/wiki/JsonWireProtocol).

<figure>
  <img src="/blog/assets/imgs/nightwatch-components.png" />
  <figcaption>Diagram illustrating how everything works behind the scenes: Source: Nightwatch.js documentation</figcaption>
</figure>

The Nightwatch test runner can be controlled through command line arguments, however I strongly suggest to use the `settings.json` ([see docs](http://nightwatchjs.org/guide#settings-file)) file where you specify the behavior of the runner, the input and output directories and the Selenium component.

**On Windows** it is suggested to create a `nightwatch.js` at the root of your project which requires the binary from the `node_modules`.

    require('nightwatch/bin/runner.js');

In this way you can invoke the runner as follows:

    $ node nightwatch.js

## Prepared everything? Good, now let it be served by our butler

Ultimately the best setup is worthless if it isn't run continuously and **automatically**. So let's teach Jenkins how to do it.

First of all you need to have the same installation setup on the server where Jenkins is running:

- Node.js and npm
- Firefox installed (as it will be used by the Selenium Server by default)
- (Nightwatch, selenium standalone server etc...will be delivered by our setup)

For convenience reasons you should place your Nightwatch setup into a Git repository and then connect it with Jenkins. See [how I did it with GitLab](/blog/2014/01/git-flow-jenkins-gitlab/).  
Running nightwatch is done by simply invoking it from a batch command.

<figure>
  <img src="/blog/assets/imgs/jenkins-nightwatch-config.png" />
  <figcaption>Running Nightwatch on Jenkins</figcaption>
</figure>

The runner will produce a nice JUnit compatible XML file which can be taken by Jenkins for presenting the results and eventual failures to us.

<figure>
  <img src="/blog/assets/imgs/jenkins-nightwatch-integration.png" />
  <figcaption>Jenkins running our Nightwatch tests</figcaption>
</figure>

## Conclusion

Automated UI tests can be very helpful but don't overestimate them. They're usually on the top of the automated testing pyramid and thus you should **write a few significative ones**.

<figure>
  <img src="/blog/assets/imgs/testingpyramid.png" />
  <figcaption>Test automation pyramid by Martin Fowler</figcaption>
</figure>

This is because they tend to break more easily. I used Selenium already by recording tests through the Firefox Selenium Plugin. While you're much faster in creating tests, they tend to be more error-prone and break more easily.  
I therefore prefer to **manually write** them (which you can do in a variety of languages), mainly because it is more effort and thus the developer will most probably come up with a smarter logic for having a more stable test that lasts as long as possible (and not have 'em break with every little UI change). You should also pay attention to keep your assert statements generic rather than asserting specific text elements which might quickly change with the next release.  
Finally, **write your tests after** implementing a feature, when you consider the UI to remain quite stable.

So, after all, you might question yourself why to use Nightwatch instead of using C# or Java, writing NUnit or JUnit tests for controlling the Selenium driver (which is totally possible). Simply **because of Node**, because

- I love it ;)
- Nightwatch is [Open Source](https://github.com/beatfactor/nightwatch) (go and help out if you want to add a nice feature/fix a bug)
- it is damn simple to setup (without requiring a large infrastructure/frameworks to be installed)
- it is command line friendly
- it seamlessly runs on every major OS

That's it!  
Btw, Scott Hanselman posted a similar post yesterday about using [BrowserStack and Selenium](http://www.hanselman.com/blog/DistributedAutomatedBrowserTestingWithSeleniumAndBrowserStack.aspx) which you might be interested in.
