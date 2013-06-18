---
layout: post
title: "Unit Testing Tip: Create Descriptive Tests"
description: ""
show_img_in_detail: false
category: 
tags: [ Unit Testing ]
reposts: ["http://architects.dzone.com/articles/unit-testing-tip-create"]
---

Your unit tests should be as descriptive as possible. The feedback they give you should be so clear you don't even need to fire up the debugger and step one by one through the code to inspect your local variables. Why? Because that takes time and we're lazy, right?

In order to do so you need to create descriptive tests. There are different approaches to realize that. Here are two of them.

## Add Assert Messages

Assert messages can usually be specified as an additional parameter in your test assert and they appear as the failure message when that specific test case fails.

In jUnit for instance you'd specify your assert message like

    assertEquals("The firstname of the two people should match if the clone was successful", "Fritz", person1.getFirstname());

In MSTest on the other hand, the assert message has to be added as the last parameter.

    Assert.AreEqual("Fritz", person1.Firstname, "The firstname of the two people should match if the clone was successful");

**Caution**, don't "over-engineer". I treat these comments similarly as with other code comments: just add them if they add meaningful information. Otherwise they're waste and hence treat them as such.

## Prefer Explicit Asserts

What I mean with _explicit asserts_ is to use the correct asserts for the kind of operation you're performing. For instance, if you need to perform an equality check as in the assert mentioned before, don't use a boolean assert statement. (Here an example of a dummy QUnit test case)

    test('Should correctly clone two people', 1, function(){
        //...

        ok(person1.firstname === 'Fritz', 'I expect both names to match if the clone operation succeeded');
    });

...and the corresponding result in the output window:

<figure>
    <img src="/blog/assets/imgs/qunit_undescriptive_testresult.png" />
    <figcaption>This outcome isn't really descriptive...</figcaption>
</figure>

The outcome doesn't tell us much, right? What you can say is that the person's firstname didn't match what you expected and as such that that clone operation probably didn't succeed. But why?? What was its actual value then?

Use the `equals` instead:

    test('Should correctly clone two people', 1, function(){
        //...

        equal(person1.firstname, 'Fritz', 'I expect both names to match if the clone operation succeeded');
    });

...and again, the outcome:

<figure>
    <img src="/blog/assets/imgs/qunit_descriptive_testresult.png" />
    <figcaption>Oh, look there, a descriptive outcome.</figcaption>
</figure>

Now this test case's outcome is much more descriptive. It doesn't only tell you that the operation failed, but also exactly shows you the expected as well as actual value. This might give you an immediate a hint where the problem could be.
