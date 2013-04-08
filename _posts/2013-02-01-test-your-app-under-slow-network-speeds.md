---
layout: post
title: "Test Your App Under Slow Network Speeds"
description: ""
postimg: /blog/assets/imgs/netlinkconditioner.png
show_img_in_detail: true
category:
reposts: ["http://architects.dzone.com/articles/test-your-app-under-slow", "http://developer.yahoo.com/blogs/ydn/posts/2013/02/webp-table-partitioning-and-more/"]
tags: [Software testing, tooling]
---

I guess that I don't have to start talking about the importance of testing in the software development process. There are couple of different kind of tests which I'm not going to mention now, but generally speaking a good test should verify the correct implementation of the business requirements but also test the software on its boundaries and edge cases.

## From a User's Perception
Beside automated tests, often a good indicator might also be the personal perception when using the software. Sounds strange, but **how does it feel** to use the application. Is it fluid, responsive or rather laggy and inconvenient to use. These kind of indicators are often hard to objectively define but they count a lot and might contribute more to the overall user satisfaction than you might actually think.

Couple of days ago I got inspired by a Tweet between [Addy Osmani](https://twitter.com/addyosmani) and [Sindre Sorhus](https://twitter.com/sindresorhus):

<figure>
    <img src="/blog/assets/imgs/addy_sindre_tweetnetspeed.png" />
    <figcaption><a href="https://twitter.com/sindresorhus/status/291537387975229440">Tweet</a> between Addy and Sindre about speed throttling tools</figcaption>
</figure>

## Do you Test your Application under Different Network Speeds?? How often?
I can just remember to have done it once because it was an explicit non-functional requirement from our customer as there where people connecting through 56k modems(!!). Typically when developing mobile application this is an absolute must because mobile connections are highly vulnerable in terms of network connection failures or speed differences. As such, depending on your user's [internet service provider](http://www.clearinternetservice.org/) and/or the availability or absense of broadband mobile networks, he might get quite different experiences when using your application.

Modern web applications provide a lot of possibilities for bandwidth optimizations, especially also considering HTML5 additions like the different browser storage mechanisms. I'm not going into too much details here but rather I'd like to quickly show how you can test your application under potentially poor network conditions.

## How to Simulate Different Network Types

### On Windows
There are several tools available for windows. Probably the simplest approach is to use [Fiddler2](http://www.fiddler2.com/fiddler2/), a tool which you should have installed anyway as a web developer. Just download and start it. In the menu, there's an entry called "Rules", open it and navigate to "Performance". There you should see an item called **"Simulate Modem Speeds"**.

<figure>
    <img src="/blog/assets/imgs/fiddler2modemspeed.png" />
    <figcaption>Fiddler2</figcaption>
</figure>

This will simulate a modem like network speed which allows you to test and fine-tune your webapp under more extreme, inconvenient situations.  
Actually there's also a [Fiddler plugin](http://fiddlerdelayext.codeplex.com/) which lets you add a delay in ms to any kind of response. I did not test that one in depth, though.

### On OSX
OSX has a tool called **Network Link Conditioner** which allows you to do a similar job. To install it you need to first download XCode which is freely available in the App Store market. Once installed

1. Open XCode
1. Navigate the menu XCode > Open Developer Tool > More Developer Tools. This will open Apple's website
1. Download the "Hardware IO Tools for XCode"

<figure>
  <img src="/blog/assets/imgs/hardwareIoTools.png"/>
  <figcaption>Download the Hardware IO Tools</figcaption>
</figure>

Once downloaded, open the package and install the "Network Link Conditioner.prefPane" tool...

![](/blog/assets/imgs/hardwaretools.png)

...which will automatically be installed on your preference pane. Here you go

![](/blog/assets/imgs/netlinkconditioner.png)

Just select the desired speed option and activate it. The nice thing about this tool is that you have already a bunch of configurations at hand.

### Other tools
I have to admit that I did not perform an in-depth research about other possible tools. Here are just some other potentially interesting ones I encountered.

- [Charlesproxy](http://www.charlesproxy.com/)
- [RoboHydra](http://dev.opera.com/articles/view/robohydra-a-new-testing-tool-for-client-server-interactions/)
- [TCPMon](http://ws.apache.org/commons/tcpmon/)

Feel free to add yours in the comment section.
