---
type: post
title: "Challenging the Testing Pyramid"
lead: >-
  Automated e2e testing with Cypress
date: 2019-07-16T12:00:00+02:00
comments: true
url: /blog/2019/07/testing-cypress-intro
image: /blog/assets/imgs/testing-pyramide.png
categories:
  - Testing
  - Newsletter
tags:
  - testing
  - JavaScript
---

{{<intro>}}
  Writing automated tests has become like a standard practice in software development and (should be) an integral part of a healthy software development process. Testing (in particular automated testing) can come with different flavors and at different levels. In this article I'd like to provide a quick overview of automated UI or end-2-end testing with Cypress.
{{</intro>}}
<!--more-->

{{< postad >}}

_(from my newsletter. Go [subscribe here](/newsletter))_


As important as testing is, it is also a question of **cost vs. benefit**. We don't want to blindly test everything, but the most critical parts and create tests that give us most benefit (which we can also call **ROI - Return on Investment**). First of all, let's talk about manual vs. automated testing. I often think about it this way:

- Manual testing is spending money (and you need to do that over and over again)
- Automated testing is investing money which over time comes with a ROI (i.e. hopefully a less buggy app :wink:)

**Manually testing isn't investing. It's spending money** to get a one-time feedback, that's it. Automated tests give us continuous feedback over time. And that Return on Investment (ROI) of your tests is exactly what we want to strive for.

But even with automated tests, we have different ones. At a high level, I like to classify them between unit level and integration level tests. And this is also often when you see the mythical testing pyramid:


{{<figure url="/blog/assets/imgs/testing-pyramide.png" size="small">}}

The testing pyramid told us **which tests to write based on the speed of execution and the cost of writing them**. And while integration level tests were told to be slow & costly, they give us the most value. If you think about it, they are much nearer to what our end-user would do, while unit level tests are more of a developer tool, verifying how the independent pieces work in isolation.

**The recent changes** in the available tooling in the web development space **started to challenge this view** a bit. In fact, [Kent C. Dodds started to provide an alternative way](https://twitter.com/kentcdodds/status/960723172591992832) of the testing pyramid, what he calls "the testing trophy".

{{<figure url="/blog/assets/imgs/testing-trophy.jpeg" size="small">}}

## Testing with Cypress

If we focus more on the UI (and e2e) testing area, there are a couple of tools around. Most of them are based on the Selenium driver. I've been using them in combination with Java, .Net and more successfully with wrappers like [NightwatchJS](https://nightwatchjs.org) and [Protractor](https://www.protractortest.org/#/). Selenium is great, it provides an abstraction layer around the browser APIs that allows you to write selenium tests in a variety of different programming languages. However, that very same abstraction makes it often also **cumbersome and verbose to use, and hard to debug.**

[Cypress](https://www.cypress.io/) is a relatively new tool on the marktetand that is definitely worth giving a look. Not only does it feel extremely refreshing to use it, with a simple API, but it also has a couple of cool [killer features](https://docs.cypress.io/guides/overview/why-cypress.html#Features), such as **[time travel](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Time-travel)**, improved **[debugging](https://docs.cypress.io/guides/guides/debugging.html#Using-debugger)**, **real-time reloads** and **automatic waiting**.

{{<figure url="/blog/assets/imgs/cypress-capabilities.png" size="medium">}}

With Cypress you write integration level tests via browser automation. Frankly, it clicks the buttons you tell it to click and verifies whether the resulting state matches our expectations. In that point it is very similar to Selenium. And still, it's quite different. When talking about automated UI testing I usually get a stomachache. I've been using lots of those automation tools and mostly they resulted in flaky tests and tons of false negatives..to the point where you just throw them away or disable them. Cypress seems to have learned from that and does an awesome job on dealing with the async nature of the web, providing top-notch debugging capabilities and perfect integration with your webapp. One of the core differences is that **Cypress runs "inside" your browser**, just alongside your web app.

{{<figure url="/blog/assets/imgs/cypress-inbrowser.png" size="medium">}}

As a result it has access to the DOM as well as all ongoing XHR requests, giving us even the possibility to stub them out. This opens up a lot of possibilities for an improved testing experience. But before I go into too much details, take a look at my 15min lightning talk I gave about a year ago.

{{< vimeo 305089747 >}}

Also, don't forget to **take a look [at the Cypress docs](https://docs.cypress.io/guides/overview/why-cypress.html)**. The team has invested a ton of time to make them great and approachable. 

