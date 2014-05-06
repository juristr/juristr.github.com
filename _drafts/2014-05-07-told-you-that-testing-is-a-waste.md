---
layout: post
title: "See, always told you: testing is just a waste of time"
lead: "About the flamed debate around the death of TDD and why it has nothing to do with testing itself"
postimg: "/blog/assets/imgs/RIPTDD.png"
show_img_in_detail: true
coverimage: false
category:
tags: ["Software testing", "Unit Testing"]
---

Unit testing and TDD became something people didn't speak about any more. It felt like a standard in software development everyone is and should be practicing. No more talks at conferences, only a few blog posts and online articles from now and then. That radically changed recently, becoming a hotly debated topic, at least after some of [@dhh's](https://twitter.com/dhh) quite provocative posts and his [RailsConf keynote](https://www.youtube.com/watch?v=9LfmrkyP81M).

<small><i>(Picture source: http://www.industriallogic.com/blog/tdd-dead-sale/)</i></small>

I learned about automated testing, particularly unit testing, during my Bachelor studies at university. It seemed strange initially and we wrote tests to fulfill the submission criteria of our lab projects. After years of practicing, more experience, a dozen of read articles, books, blog posts, I really started to  love it. Especially after I felt the pain of _having to refactor_ the codebase without any kind of regression tests in place: a nightmare, just blindly changing the code, hoping for the best.

Today **I mostly always write automated tests** because 

- I got used to it
- it makes me develop faster
- it allows me to change afterwards, making it possible to quickly code even a sub-optimal implementation now, because I know I'll be able to change, refactor and optimize it laster more easily
- ...

Even when coding some quick experiments, I often create some automated tests that proof my assumptions. Overkill? I don't think so. There are so many nice tools in place which execute your tests right after you save/compile your code. Would I be faster executing the console application after each change, verifying `console.log` statements? Hardly...  
I simply love the **fast feedback** I get by looking at the test run indicator while coding, without having to move my fingers from the keyboard to click through some UI for verifying that my code (still) works.

When I code JavaScript, **I write automated tests!** Of course, I don't even have a compiler there, everything happens/breaks at runtime. It's even more important than in statically typed, compiled languages. So, hell yes, I do create automated tests that are executed by Jenkins when I commit my feature to make sure I didn't break anything else.

## Do I do TDD?

Hmm..I follow a **test-first** approach, I'd say. I do follow the TDD cycle of

1. Implement the test
1. See it fail
1. Write code
1. See test pass
1. (...)

Admittedly often it slightly distorts to a "implement production code, then comment, write test, see it fail, then uncomment, see it still fail (?!), write more production code, see it succeed" kind of workflow. But that's normal I guess.

What about Test Driven **Design**? You mean to let your architecture evolve blindly by the magic of TDD? Of course not! I think about the architecture or a possible implementation of a feature already before I write the first line of code. It happens automatically. Do the tests influence/change/adapt that initially design during the implementation? Most often, yes. Based on those experiences in writing tests, my architecture evolved over the years to implicitly facilitate testing.

For me, the important thing to have is **automation** and **fast feedback** (which implies having the automation). I have all type of tests, depending which kind of needs I have. Automated JMeter tests that call my REST api after each deploy, integration tests going down through my frontend controller through the dependency injection framework, the business layer, data access till down to the DB. Unit tests on the other side for reusable components, for critical code, for situations where I wouldn't want to setup data in the DB to test a particular use case. It's much easier and faster to simply provide some stubs.

## The debate: Most unit testing is a waste

The testing debate started with a quite provocative article entitled ["Why Most Unit Testing is Waste"](http://www.rbcs-us.com/documents/Why-Most-Unit-Testing-is-Waste.pdf).

In a 19 pages article James O Coplien outlines some issues he encountered while writing **unit tests**. If you have the time, absolutely read it, but the entire article rather than just the headline! Alternatively, [Rodolfo Grave created a nice summary](http://rodolfograve.blogspot.it/2014/03/are-unit-tests-waste.html) on his blog.

His résumé:

- Keep regression tests around for up to a year — but most of 
those will be system-level tests rather than unit tests. 
- Keep unit tests that test key algorithms for which there is a 
broad, formal, independent oracle of correctness, and for 
which there is ascribable business value.
- Except for the preceding case, if X has business value and you 
can test X with either a system test or a unit test, use a system test — context is everything.
- Design a test with more care than you design the code.
- Turn most unit tests into assertions.
- Throw away tests that haven’t failed in a year.
- Testing can’t replace good development: a high test failure 
rate suggests you should shorten development intervals, 
perhaps radically, and make sure your architecture and design 
regimens have teeth
- If you find that individual functions being tested are trivial, 
double-check the way you incentivize developers’ 
performance. Rewarding coverage or other meaningless 
metrics can lead to rapid architecture decay.
- Be humble about what tests can achieve. Tests don’t improve 
quality: developers do.

As already Rodolfo comments, other than the "throw tests away", I fully agree. IMHO, this article is written by a person who mastered writing automated tests.

[David Heinemeier Hansson (@dhh)](http://david.heinemeierhansson.com/), creator of Ruby on Rails and founder & CTO of [Basecamp](https://basecamp.com/), then entered the debate by writing

- [TDD is dead. Long live testing.](http://david.heinemeierhansson.com/2014/tdd-is-dead-long-live-testing.html)
- [Test-induced design damage](http://david.heinemeierhansson.com/2014/test-induced-design-damage.html)

with lots of discussions on HackerNews [here](https://news.ycombinator.com/item?id=7633254) and [here](https://news.ycombinator.com/item?id=7666866) and various ones on Twitter between Martin Fowler, Heinemeier, [Uncle Bob Martin](https://twitter.com/dastels/status/461905467359232000) and Kent Beck.

<blockquote class="twitter-tweet" lang="en"><p>tdd is not &quot;alive&quot; or &quot;dead&quot;. it is subject to tradeoffs, including risk of api changes, skill of practitioner, and existing design.</p>&mdash; Kent Beck (@KentBeck) <a href="https://twitter.com/KentBeck/statuses/460829034532700161">April 28, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Numerous blog posts and articles followed. Here are some I was able to capture

- [Uncle Bob: Professionalism and TDD (Reprise)](http://blog.8thlight.com/uncle-bob/2014/05/02/ProfessionalismAndTDD.html)
- [Uncle Bob: Test Induced Design Damage?](http://blog.8thlight.com/uncle-bob/2014/05/01/Design-Damage.html)
- [TDD, Straw Men, and Rhetoric](https://www.destroyallsoftware.com/blog/2014/tdd-straw-men-and-rhetoric)
- [Martin Fowler, attempting to better define "Unit test"](http://martinfowler.com/bliki/UnitTest.html)

Someone even started a [#WhyITDD hashtag on Twitter](https://twitter.com/search?q=%23whyitdd).

> To conclude: It seems to me that using good design principles that make your tests run faster is a noble goal. It also seems to me that decoupling from frameworks such as Rails, as your applications grow, is a wise action. I believe these things to be evidence that professionals, like Jim Weirich, are at work. <cite><a href="http://blog.8thlight.com/uncle-bob/2014/05/01/Design-Damage.html" target="blank">Uncle Bob</a></cite>

## See, always told you...

If you ever tried to convince/coach people in writing automated tests, then you know how damn hard it is. Personally I think it's nearly impossible. You can only give an initial hint on some techniques and then each dev needs to practice and experience it by himself. It's something that has quite a steep learning curve.

The main problem (I'm quite sick to hear about...) is that devs take those articles mentioned previously as a proof they were correct in **not writing any tests** in the past and future. This is total non-sense! If you read beyond the headline, none of them questions the creation of automated tests but rather

- the TDD approach
- unit tests vs. integration tests vs acceptance tests etc... 

## Thoughtworks Hangout: Is TDD dead?

Martin Fowler just announced that ThoughtWorks will be hosting a debate with himself, Kent Beck and David Heinemeier Hansson about whether TDD is dead. You should absolutely participate at this hangout or watch the recorded session afterwards.

<blockquote class="twitter-tweet" lang="en"><p>Watch myself, <a href="https://twitter.com/KentBeck">@KentBeck</a> and <a href="https://twitter.com/dhh">@dhh</a> discuss TDD in a hangout on Friday at 11am EST [corrected time]&#10;<a href="https://t.co/mV4gVYAh6D">https://t.co/mV4gVYAh6D</a> …</p>&mdash; Martin Fowler (@martinfowler) <a href="https://twitter.com/martinfowler/statuses/463778573589823488">May 6, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>