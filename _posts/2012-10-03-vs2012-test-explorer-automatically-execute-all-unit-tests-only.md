---
layout: post
title: "VS2012 Test Explorer: Automatically Execute All Unit Tests Only"
description: ""
category: 
postimg: /blog/assets/imgs/vs2012_testview.png
tags: []
---
{% include JB/setup %}

In Visual Studio 2012 the team invested a lot in order to improve the testing experience. Sooner or later also the MS guys found the extreme value into having an automated test suite. One of the additions I particularly like is the ability to automatically execute the tests after each build. Actually I even implemented a working prototype for this in VS2010, but never had the time to finilize and publish it. The problem however with the VS2012 Test Explorer is on how to instruct it to only execute the unit tests within your solution and not the coded UI or integration tests.

My usual solution setup looks like the following:

- Solution
  - ProjectA
  - ProjectA.UnitTests
  - ProjectA.IntegrationTests
  - ProjectB
  - ...

## In VS2010 ...
... I usually opened the Test View and added a grouping for the projects which then already gave me a nice view about the Unittest and Integrationtest projects and moreover I then added a filter by the project name.

![](/blog/assets/imgs/vs2010_testview.png)

An alternative would be to use the `[TestCategory]` attributes and to filter against those.

## In VS2012 ...
... there is no such filter any more. Instead the newly created Test Explorer provides you with an "intelligent" filter textbox where you can set filters like `FilePath: ""`, `Result: ""`. The key there is to use the filter "FullName" and set it to "UnitTests". 

![](/blog/assets/imgs/vs2012_testview.png)

FullName searches the fully qualified name of your test case, that is, if your namespace reflects the name of your Assembly (which it should) then according to the example above, a test within the `ProjectA.UnitTests` would have a namespace like `ProjectA.UnitTests.Utils.SomeUtilTest` and hence be hit by the filter. 

Just as a side-note: apparently the filter is not as intelligent to support regular expressions which is really bad...

