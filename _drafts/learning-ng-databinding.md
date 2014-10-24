---
layout: post
title: "Learning Angular: Databinding amusements"
lead: ""
show_img_in_detail: true
coverimage: false
category:
tags: ["JavaScript", "Angular.js"]
---

Consider you have two areas on your application which you'd like to change based upon some state change. That said, we need some common place where to store that state s.t. all the interested areas can "watch/bind" on it. In Angular, most commonly this is a **service** somewhere.


That given, for the purpose of this post I have

- `MyCtrl` - which sets the state based on some interaction of the user
- `myDirective` - which is another place updating the same state

- `container` - another directive



Plunkr: http://plnkr.co/edit/LfW6uEYX2xHdMUGUr5Av?p=preview
