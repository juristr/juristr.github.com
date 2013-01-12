---
layout: post
title: "Why Automated Tests Boost Your Development Speed"
date: 2011-04-06
comments: true
tags: [  Unit Testing, Best Practices, Software testing ]
reposts: ["http://www.javacodegeeks.com/2011/04/automated-tests-boost-development-speed.html"]
---

Many critics against writing automated tests directly address the additional time that is needed for coding them, which alternatively could have been invested in writing new functionality. Writing tests definitely needs time, and especially developers that are new to unit testing will need to invest more. While the methodology (test-first or test-last) plays a major role in the efficiency of the invested time and resulting quality of the tests, in this post I'd like to highlight some of the immediately visible improvements that automated testing strategies introduce with regards to development speed.

<figure>
  <img src="/blog/assets/imgs/need-for-speed-nitro.jpg" />
  <figcaption>Boost your development speed</figcaption>
</figure>

## Functionality Verification

While developing you continuously roughly verify whether your implemented code works as expected. Considering a web application environment, this means to start the app in the browser and to check whether everything works. This is connected to a lot of <b>effort</b>, you need to open the browser, click through the UI to arrive to the point where your implemented functionality will take effect and then verify the according output. If it doesn't yet work, the cycle needs to be repeated. **This takes time!**

**Instead, using a test-driven approach** you would

- write a small test, instantiating your object, invoking - say - the method on it you wrote and asserting the according result.
- check whether the bar/dot whatever your xUnit framework is, is green or red
- if it's red, change your implementation, re-run the written test etc...

Note how much time you save here: no opening (and waiting for) the browser, no clicking on dummy buttons.

> Whenever you are tempted to type something in a print statement or a debugger expression, write it as a test.  
> (_Martin Fowler_)


## Regression Testing
What many don't immediately see is the huge amount of time you save with each new test in terms of building a regression test suite. With each new test you write, this test suite gets bigger and bigger, and more of your app's functionality gets covered. By then re-running all of the written tests, each time you implement something, you re-verify all of your existing logic, executing hundreds of different scenarios, **within seconds**. Imagine what this would mean **without an automated test approach**? I doubt you're that fast clicking through the UI ;).

## Less Bugs?
This really depends on the quality of your tests and on the overall test coverage. There are a lot of papers analyzing this kind of relationship. From my experience I can say that it has definitely a positive effect. What I've seen is that the kind of bugs change. You'll experience less source code defects (i.e. missing null reference checks). What usually remains are small bugs that are **quickly fixed** and those that arose due to a misunderstanding between the customer and developer.

## The Downside...
As with every thing, there are also downsides. Usually a rule of thumb is the "less code you write, the less you have to maintain". Tests help you in the maintenance phase of your product, while fixing bugs or extending with new functionalities in that they provide you with a safety net that ensures you didn't break anything existing. But on the other side, writing tests means **writing additional code that needs, to be maintained** as well!
Therefore, **writing good, maintainable tests needs to be learned** and that learning curve shouldn't be underestimated.

So, give unit-testing a try and don't give up immediately. The initial learning phase will be quite tough, but once you got it, you cannot live without 'em any more ;).