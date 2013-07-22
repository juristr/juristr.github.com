---
layout: post
title: "How to Add a Reading Time Indicator To Your Blog in Ten Minutes"
description: ""
postimg: "/blog/assets/imgs/typescript_beachcover_adj.jpg"
show_img_in_detail: true
category: 
tags: [JavaScript, Blogging]
---

Time is money, right, and given that nowadays we are continuously being flooded with an enormous amount of information, we need to be fast in consuming it and particularly good at filtering what's worth and what isn't. As such many popular blogging platforms (i.e. Medium for instance) have added a reading time indicator on top of each post. Today I had a couple of minutes of time and tried to add it to my blog here and was surprised how simple it is.

## How does it work?

Reading speed is measured in words per minute (short: wpm). An average person reads between 200 and 250 wpm. As such the formula for the reading time is nothing more than the number of words in your blog post divided by the reading speed of an average person.

                            total words
    reading time =  round(-----------------)
                            reading speed

On my blog here I use 200 wpm considering the distraction a person might suffer.

## Implementation

## Shortcomings

Obviously it is quite difficult to also consider source code reading which requires not only to read the words but certainly more mental analysis and understanding.