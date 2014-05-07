---
layout: post
title: "See, always told you: testing is just a waste of time"
lead: "About the flamed debate around the death of TDD and why it isn't an excuse for not doing automated testing"
postimg: "/blog/assets/imgs/RIPTDD.png"
show_img_in_detail: true
coverimage: false
category:
tags: ["testing"]
---

Automated testing has become something people don't speak about any more. It matured to being a standard in software development, everyone is and should be practicing. No more talks at conferences, only a few blog posts and online articles from now and then. That radically changed recently, again becoming a hotly debated topic, at least after some of [@dhh's](https://twitter.com/dhh) quite provocative posts and his [RailsConf keynote](https://www.youtube.com/watch?v=9LfmrkyP81M).

<small><i>(Image source: http://www.industriallogic.com/blog/tdd-dead-sale/)</i></small>

I learned about automated testing, particularly unit testing, during my Bachelor studies at university. It was kind of awkward, initially, and we definitely wrote tests to fulfill the submission criteria of our lab projects. After years of practicing, more experience, a dozen of read articles, books, blog posts, I really started to love it. Especially after I felt the pain of _having to refactor_ the codebase without any kind of regression tests in place: you cannot move, you want, but you cannot! A total nightmare, just blindly changing the code, hoping for the best. Stop doing this.

Today **I mostly always write automated tests** because 

- I got used to it
- it makes me develop faster
- it gives me the freedom to improve later; making it possible to quickly code, even a sub-optimal implementation now, because I know I'll be able to change, refactor and optimize it laster more easily
- ...

Even when coding some quick experiments, I create some automated tests that proof my assumptions. Overkill? I don't think so. There are so many nice tools in place which execute your tests right after you save/compile your code. Would I be faster by writing and executing `console.log` statements after each change? Hardly...

> Whenever you are tempted to type something into a print statement or a debugger expression, write it as a test instead. <cite>Martin Fowler</cite>

I simply love the **fast feedback** I get by looking at the test run indicator while coding, without having to move my fingers from the keyboard to click through some UI for verifying that my code (still) works. Moreover, I build a regression suite: each additional tests I add gets executed after each modification to my code. I'm basically testing all of the scenarios (my and those potentially implemented by my collegues) from the beginning of my coding up to where I currently am, in milliseconds. Can you do the same with the debugger or `console.log`?? ;)

When I code JavaScript, **I write automated tests!** Of course, I don't even have a compiler there, everything happens/breaks at runtime. It's even more important than in statically typed, compiled languages. So, hell yes, I do create automated tests that are executed by Jenkins when I commit my feature to make sure I didn't break anything else.

## Do I do TDD?

Hmm..I follow a **test-first** approach, I'd say, and I try to have a cycle like

1. Implement the test
1. See it fail
1. Write code
1. See test pass
1. (...)

Admittedly it often slightly distorts to a "implement production code, gosh..this is going to be complicated..need a test, then comment production code out, write test, see it fail, then uncomment the code, see it still fail (?!), write some more production code, see it succeed" kind of workflow. But that's normal I guess.

What about Test Driven **Design**? You mean to let my architecture evolve blindly by the magic of TDD? Didn't succeed on that (I'd require a mentor here in case someone is interested ;)). I usually think about the architecture or a possible implementation of a feature already before I write the first line of code. This happens automatically. Do the tests influence/change/adapt that initially design during the implementation? Most often, yes. Furthermore, based on the gained experiences in writing lots of tests, my architecture evolved over the years to facilitate testing out of the box.

For me, the important thing to have is **automation** and **fast feedback** (which implies having automation in place). Then, I write all kind of tests, depending which on my needs. Automated JMeter tests that call my REST api after each deploy, integration tests going down starting from my frontend controller through the dependency injection framework, the business layer, data access till down to the DB. Unit tests on the other side for reusable components, for critical code, for situations where I wouldn't want to setup data in the DB to test a particular use case and where it's much easier and faster to simply provide some stubs.

## The debate: Most unit testing is a waste

The testing debate started with a quite provocative article entitled ["Why Most Unit Testing is Waste"](http://www.rbcs-us.com/documents/Why-Most-Unit-Testing-is-Waste.pdf). In a 19 pages article James O Coplien outlines some issues he encountered while writing **unit tests**.  
If you have the time, absolutely read it, but **read the entire article** and don't just draw (wrong) conclusions from the headline! Alternatively, [Rodolfo Grave created a nice summary](http://rodolfograve.blogspot.it/2014/03/are-unit-tests-waste.html) on his blog.

Coplien's résumé:

- Keep regression tests around for up to a year — but most of 
those will be system-level tests rather than unit tests. 
- Keep unit tests that test key algorithms for which there is a 
broad, formal, independent oracle of correctness, and for 
which there is ascribable business value.
- Except for the preceding case, if X has business value and you 
can test X with either a system test or a unit test, use a system test — context is everything.
- Design a test with more care than you design the code.
- Turn most unit tests into assertions.
- _Throw away tests that haven’t failed in a year._
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

A bit later, [David Heinemeier Hansson (@dhh)](http://david.heinemeierhansson.com/), creator of Ruby on Rails and founder & CTO of [Basecamp](https://basecamp.com/), entered the debate with his **TDD is dead** articles:

- [TDD is dead. Long live testing.](http://david.heinemeierhansson.com/2014/tdd-is-dead-long-live-testing.html)
- [Test-induced design damage](http://david.heinemeierhansson.com/2014/test-induced-design-damage.html)

..followed by lots of discussions on HackerNews [here](https://news.ycombinator.com/item?id=7633254) and [here](https://news.ycombinator.com/item?id=7666866) and various ones on Twitter between Martin Fowler, Heinemeier, [Uncle Bob Martin](https://twitter.com/dastels/status/461905467359232000) and Kent Beck.

<blockquote class="twitter-tweet" lang="en"><p>tdd is not &quot;alive&quot; or &quot;dead&quot;. it is subject to tradeoffs, including risk of api changes, skill of practitioner, and existing design.</p>&mdash; Kent Beck (@KentBeck) <a href="https://twitter.com/KentBeck/statuses/460829034532700161">April 28, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Numerous blog posts and articles emerged from these dicussions. Here are some I was able to capture

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

Make sure you understand what automated testing is about, what unit tests are, what TDD is all about etc. [Fowler's collection of articles](http://martinfowler.com/tags/testing.html) might be a good starting point.

## Thoughtworks event: "Is TDD dead?"

Martin Fowler announced yesterday that ThoughtWorks will be hosting a debate between himself, Kent Beck and David Heinemeier Hansson about whether TDD is dead. You should absolutely participate at this hangout or watch the recorded session afterwards.

<blockquote class="twitter-tweet" lang="en"><p>Watch myself, <a href="https://twitter.com/KentBeck">@KentBeck</a> and <a href="https://twitter.com/dhh">@dhh</a> discuss TDD in a hangout on Friday at 11am EST [corrected time]&#10;<a href="https://t.co/mV4gVYAh6D">https://t.co/mV4gVYAh6D</a> …</p>&mdash; Martin Fowler (@martinfowler) <a href="https://twitter.com/martinfowler/statuses/463778573589823488">May 6, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## Relevant links

All relevant links together (will be updated if new ones emerge):

- ["Why Most Unit Testing is Waste"](http://www.rbcs-us.com/documents/Why-Most-Unit-Testing-is-Waste.pdf) ([Summary](http://rodolfograve.blogspot.it/2014/03/are-unit-tests-waste.html))
- [TDD is dead. Long live testing.](http://david.heinemeierhansson.com/2014/tdd-is-dead-long-live-testing.html)
- [David Heinemeier Hansson's RailsConf keynote](https://www.youtube.com/watch?v=9LfmrkyP81M)
- [Test-induced design damage](http://david.heinemeierhansson.com/2014/test-induced-design-damage.html)
- [Uncle Bob: Professionalism and TDD (Reprise)](http://blog.8thlight.com/uncle-bob/2014/05/02/ProfessionalismAndTDD.html)
- [Uncle Bob: Test Induced Design Damage?](http://blog.8thlight.com/uncle-bob/2014/05/01/Design-Damage.html)
- [TDD, Straw Men, and Rhetoric](https://www.destroyallsoftware.com/blog/2014/tdd-straw-men-and-rhetoric)
- [Martin Fowler, attempting to better define "Unit test"](http://martinfowler.com/bliki/UnitTest.html)
- [ThoughtWorks Event: Is TDD dead?](https://plus.google.com/events/ci2g23mk0lh9too9bgbp3rbut0k)