---
layout: post
title: "The pitty with (learning|coaching) automated testing"
lead: ""
show_img_in_detail: false
coverimage: false
category:
tags: ["Automated testing"]
---

Testing has quite a steep learning curve. Many really don't realize it, but you need quite some time until you know how to properly write tests, keep them maintainable and to get a feeling when and which test(s) to apply. Here's my experience from coaching people to write automated tests and from observing them at applying it in practice.

Currently at work we apply different kind of tests:

- **Unit tests** on the server-side with MSTest, NUnit or jUnit as well as on the client-side with either QUnit or Jasmine.
- **Integration tests** mostly using the tools mentioned before, but also SoapUI for SOAP endpoint testing.
- **Performance tests** mostly against our JSON (REST) API endpoints, through some automated jMeter scripts.
- **UI tests** with Nightwatch.js.

Obviously not always all of these tests get applied.

## The Resistance

Teaching automated testing is hard. You can show all of the advantages and benefits that come from it...still...devs need to experience it by themselves, otherwise they won't get it. And that means you have to pair with people, show them how to test things directly while coding with them and possibly then also highlight the advantages. Teaching sessions only help in the beginning for explaining the tooling and that's it.

You'll get to hear things like

- "Ya, but that means I have to write quite a lot more code" (aka "sure...but I'm too lazy")
- "but hey...it already works, verified it"
- "I'm not sure whether we have enough budget"
- Project manager: "Hey, but wait wait...how much more does this cost me?? You know we have to deliver at X and we only have Y budget left"
- "Testing? This is simply bullshit! X said that as well, read it on his blog."

## Ohh...damn this was really useful!

- damn, lucky me I had these tests...otherwise I wouldn't have been able to refactor all this
- puh..that test picked out that nasty bug. Would have had a hard time of finding it probably without that test.
- that was fast..

## The overkill!

- test everything
- overlapping tests
- you write more tests than production code!?
- out of time/budget
- hey...but you told me to test everything, and I definitely see the benefit...so what's up?

## Roundup

- we're paid to deliver production code
- the company pays you to be "professional", i.e. to keep the level of quality as high as possible, not to hack in just that it works right now. That means you're damaging the company's property...

(...)
