---
layout: post
title: "TypeScript: Application scale JavaScript"
description: ""
postimg: "/blog/assets/imgs/typescript_beachcover.png"
show_img_in_detail: true
category: 
tags: [JavaScript, WebDev]
---

TypeScript is now already around for about 9 months or so I guess. When it was first announced, I had my doubts about its usefulness. Why another CoffeeScript, I thought only until I gave a deeper look at how it worked and that it actuall isn't a JavaScript replacement, but rather a superset of it, something that you can add, trying to raze out the bad parts of JavaScript. Being in holidays, I had the time to listen to Hejlsberg's talk about TypeScript on this year's Build confererence. Here are some of my notes.

Before starting, I was on the beach, typing out those comments on my tablet, so they're rather short and concise, more of a collection of notes from the talk. If you want grab all the details, just head over to [listen to the recorded talk in its full length]( http://channel9.msdn.com/Events/Build/2013/3-314).  
(Yep, I took the cover pic. Sorry for the blue-like color, but I wrongly configured my N4's camera and only recognized it afterwards in the hotel room. But I can assure you that the beach was awesome)

<iframe style="height:540px;width:960px" src="http://channel9.msdn.com/Events/Build/2013/3-314/player?w=960&h=540" frameBorder="0" scrolling="no"> </iframe>

## The Basics

The main job of TypeScript is to add type annotations with the aim to improve the tooling around JavaScript (like refactoring support and so on). This means you will get some sort of "compilation errors" as well as sophisticated autocompletion support in Visual Studio. But since the tools autocompletion support tools have been written in TypeScript themselves, you are able to try them out directly on the [TypeScript playground]( http://www.typescriptlang.org/Playground/). Fat minus: the playground is not responsive and doesn't work on my tablet...

A basic type annotation looks like the following

    a: string

where ˋ aˋ  is the JavaScript variable or function param and ˋstringˋ its corresponding type. As such, using this expression in a function would result in this code:

    function(a: string) { ... }

## Interfaces

Interfaces are exactly what you would first think about. They allow you to **define the minimum set of properties or functions** of an object. That means you can define something like

    interface Person {
        name: string;
        age: number;
    }

As a result, a JavaScript person object **must** have at least a ˋ nameˋ and ˋageˋ  property matching the defined types, but it **may have more**.

    var a:Person = {
        name: 'Juri',
        age: 28
        married: false
    }

Note that ˋmarriedˋ has not been defined in the interface, but it is still valid to declare it ad-hoc when creating the JavaScript object. Another possibility is to declare **optional members** which are added by using the ˋ?ˋ symbol like

    interface Person {
        name: string;
        age: number;
        married?: boolean;
    }

## TypeScript Definition Files

One of the nice things are that you can add TypeScript to any existing JavaScript code or library by creating corresponding TypeScript definition files. These can be spread over **multiple files** which make it easier to capture the modular and dynamic nature of JavaScript libraries. As such, for example, the TypeScript definitions for the jQuery core are defined in ˋ jquery.d.tsˋ  while any other jQuery plugin/extension might provide its own definitions in a separate file like ˋmyplugin.d.tsˋ .  
You can even spread the definition of a single TypeScript ˋInterfaceˋ  among multiple files. This is essential if you think about how jQuery plugins (but not only) dynamically extend the core jQuery (ˋ$ˋ) object.

## Generics

JavaScript is a dynamic language which has its advantages and disadvantages. One of the advantages of a dynamic language is that you can easily generalize a function to be used by many different kind of objects as long as they match the required functions/properties used within the "generic" function. The probem is that once you add type information, you're back in the "statically typed" world where you need "generics" in order to generalize it for multiple different kind of types.

Luckily TypeScript supports Generics as well.

    function sort<T>(a[]: T) : T[] {

    }

The return type (in this case an array of "type" T) is normally inferred automatically, but can also be declared explicitly (as in the example). When using generics it might often be necessary to specify a "supertype" the generic type has to derive from in order to limit the generic usage only to a meaningful subset of types. This is done as follows:

    function sort<T extends Entity>(a[]: T) {

    }

## Lamdas

TypeScript allows for declaring lamdas simlar to those used in C#. Their purpose follows the ES6 proposal to "fix" `this` in callback functions.

    $('.mybutton').click((e,ev) => {
         // this is adjusted inside here
    }

Behind the scenes, TypeScript translates the above into

    var _this = this;
    $('.mybutton').click(function(e,ev) {
         // _this has to be used here
    }

The nice and interesting thing here is that once ES6 can be safely used, the above transformation done by TypeScript could be simply adjusted to the native ES6 one.

## Conclusion

As mentioned, I find the concept behind TypeScript quite interesting. One of the main problems I often encounter is on the one side the missing knowledge about the tools people have to develop JavaScript applications. Chrome, for instance, provides lots of advanced developer tools under which also two-way synch between your file system and the browser (using the Tincr extension for instance). Sublime Text on the other side is another example of a great JavaScript editor. But especially .Net devs, accustomed to Visual Studio, are rarely willing to leave the IDE and to use an external editor, just for the purpose of having some more sophisticated coding support. And then there is the refactoring support I really miss. Sublime does a great job in helping you to perform contextual search&replace, but it isn't as reliable as a proper refactoring functionality.

That's where I see the potential of TypeScript (especially also in the enterprise environment I work). With a bit of free time I might see on whether I can adapt it for [CanJS](http://canjs.us) (JavaScriptMVC) which is the framework we use for our SPA development.


## References

- [GitHub: DefinitelyTyped TypeScript definition files]( https://github.com/DefinitelyTyped/DefinitelyTyped)