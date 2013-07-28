---
layout: post
title: "TypeScript: Application scale JavaScript"
description: ""
postimg: "/blog/assets/imgs/typescript_beachcover_adj.jpg"
show_img_in_detail: true
category: 
tags: [JavaScript, WebDev]
reposts: ["http://architects.dzone.com/articles/typescript-application-scale"]
---

I took this cover pic from my holiday (I just returned) at Menorca (Spain) from [Cala Talaier](https://www.google.com/maps?ll=39.926536,3.902724&spn=0.001351,0.002575&t=h&dg=opt&z=19). Awesome place, but sorry for the way too much blue-saturation of the pic. I accidentally didn't configure my Nexus 4's camera properly and only recognized it later at the hotel. That said, this post isn't about my holidays, but about Hejlsberg's talk about TypeScript at this year's Build conference. Having some time while being at this beach I listened to the talk on my tablet and put down some notes.

The post really isn't intended to reflect all the details of the talk, but rather some key points that sound interesting to me. TypeScript is now already around for about 9 months or so and I like the concept behind of being something to improve the tooling around JavaScript but not really re-inventing a new language that compiles to it.
Anyway, if you want grab all the details of the talk, just head over to [listen to the it in its full length]( http://channel9.msdn.com/Events/Build/2013/3-314).  

<iframe style="height:540px;width:100%" src="http://channel9.msdn.com/Events/Build/2013/3-314/player" frameBorder="0" scrolling="no"> </iframe>

## The Basics

The main job of TypeScript is to add type annotations with the aim to improve the tooling around JavaScript (like refactoring support and so on). This means you will get some sort of "compilation errors" as well as sophisticated autocompletion support in Visual Studio. But since the autocompletion support tools have been written in TypeScript themselves, you are able to try them out directly on the [TypeScript playground](http://www.typescriptlang.org/Playground/) and potentially any other IDE. So it isn't just specific to VS which is a major plus!  
(Fat minus: the playground is not responsive and doesn't work on my tablet...)

A basic type annotation looks like the following

    a: string

where `a` is the JavaScript variable or function param and `string` its corresponding type. As such, using this expression in a function would result in this code:

    function(a: string) { ... }

## Interfaces

Interfaces are exactly what you would first think about. They allow you to **define the minimum set of properties or functions** of an object. That means you can define something like

    interface Person {
        name: string;
        age: number;
    }

As a result, a JavaScript person object **must** have at least a `name` and `age` property matching the defined types, but it **may have more**.

    var a:Person = {
        name: 'Juri',
        age: 28
        married: false
    }

Note that `married` has not been defined in the interface, but it is still valid to declare it ad-hoc when creating the JavaScript object. Another possibility is to declare **optional members** which are added by using the `?` symbol like

    interface Person {
        name: string;
        age: number;
        married?: boolean;
    }

## TypeScript Definition Files

One of the nice things are that you can add TypeScript to any existing JavaScript code or library by creating corresponding TypeScript definition files. These can be spread over **multiple files** which make it easier to capture the modular and dynamic nature of JavaScript libraries. As such, for example, the TypeScript definitions for the jQuery core are defined in `jquery.d.ts` while any other jQuery plugin/extension might provide its own definitions in a separate file like `myplugin.d.ts`.  
You can even spread the definition of a single TypeScript `Interface`among multiple files. This is essential if you think about how jQuery plugins (but not only) dynamically extend the core jQuery (`$`) object.

## Generics

JavaScript is a dynamic language, which has its advantages and disadvantages. One of the advantages of a dynamic language is that you can easily generalize a function to be used by different kind of objects and in different contexts, as long as they match the required functions/properties used within the "generic" function. The probem is that once you add type information, you're back in the "statically typed" world where you need "generics" in order to 
be able to again generalize it for multiple different kind of "types".

Luckily TypeScript supports Generics as well.

    function sort<T>(a:T[]) : T[] {

    }

The return type (in this case an array of "type" T) is normally inferred automatically, but can also be declared 
explicitly (as in the example). When using generics it might often be necessary to specify a "supertype" the 
generic type has to derive from in order to limit the generic usage only to a meaningful subset of types. This 
is done as follows:

    function sort<T extends Entity>(a:T[]) {

    }

## Lamdas

Normally, when you're within the context of some object (in an MVC architecture this would typically correspond to a controller function) then, in order to access the original object from within a jQuery callback you have to "adjust" `this`. This is often done like this: 

    var someObject = {

        getName: function(){
            return "Juri";
        },
        
        registerHandlers: function(){
            var self = this;
            $(".js-say-hello").click(function(){
                alert("Hi, my name is " + self.getName() + "!");
            });
        }
    };

Alternatives are to use the jQuery proxy function, but it still remains quite cumbersome to write.

TypeScript allows for declaring lamdas simlar to those used in C#. Their purpose follows the ES6 proposal to "fix" `this` in callback functions.

    registerHandlers: function(){
        $(".js-say-hello").click(() => {
            alert("Hi, my name is " + this.getName() + "!");
        });
    }

Behind the scenes, TypeScript translates the above into

    registerHandlers: function () {
        var _this = this;
        $(".js-say-hello").click(function () {
            alert("Hi, my name is " + _this.getName() + "!");
        });
    }

Nothing fancy, just what you would otherwise type manually. The nice thing (as Hejlsberg mentions) is that once ES6 can be safely used, TypeScript could just remove this transformation and your code would continue to work.

## Conclusion

As mentioned, I find the concept behind TypeScript quite interesting. One of the main problems I often encounter is on the one side the missing knowledge about the tools people have at hand when developing JavaScript applications. Chrome, for instance, provides lots of advanced developer tools under which also two-way synch between your file system and the browser (using the Tincr extension for instance) and rich debugging and profiling mechanisms. Sublime Text on the other side is another example of a great JavaScript editor. Unfortunately (especially .Net) devs, accustomed to Visual Studio, are rarely willing to leave the IDE and to use an external editor, just for the purpose of having some more sophisticated coding support.  
On the other side there is the refactoring support I really miss in JavaScript. Sublime does a great job in helping you to perform contextual search&replace, but it isn't as reliable as a proper refactoring functionality.

That's where I see the potential of TypeScript (especially also for the enterprise environment I work in). With a bit of free time I might see on whether I can adapt it for [CanJS](http://canjs.us) (JavaScriptMVC) which is the framework we use for our SPA development.

## References

- [GitHub: DefinitelyTyped TypeScript definition files]( https://github.com/DefinitelyTyped/DefinitelyTyped)