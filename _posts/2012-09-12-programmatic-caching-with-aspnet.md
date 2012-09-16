---
layout: post
title: "Break Apart Your Backbone.js Render Methods"
description: ""
tags: []
---
{% include JB/setup %}

Actually it's quite [strange](http://www.google.com) I never had the case so far to perform some manual caching on files...Anyway, today I had the chance to dive more into the browser caching mechanisms.

## Setup

I'm having a plain ASP.net web module which intercepts requests to `/scripts/myfile.js`. Why this? Well, the `myfile.js` is packaged as an embedded resource inside a DLL which also contains the web module. This approach was necessary to be able to also deliver scripts together with the DLL itself, which is kinda handy.

### The HTTP Caching Approaches
I'm not going into detail now, we have Wikipedia for that, but frankly there are two approaches of cache **invalidation**

- Server-side
- Browser

If the **server** has to decided when to invalidate a cache, it basically has to..

Here's some JavaScript code

	$.Controller("MyController", {

	},{
		init: function(){

		},

		someAction: function(){
			if(someValue){
				console.log("test");
			}
		}
	})

As already Einstein said...

> Test comment, 
asdasdf asdf asdf asdf asdf 

And here's some C# code

	public class Person
	{
		public string Name { get; set; }
	}
