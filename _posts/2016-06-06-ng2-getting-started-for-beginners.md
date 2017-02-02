---
layout: post_new
title: "Angular 2 - A Getting Started Guide for Beginners"
lead: "A gentle introduction to a local Meetup group"
postimg: "/blog/assets/imgs/meetup-intro-angular2/ng2-gettingstarted-image.png"
category: angular2
reposts: ["https://medium.com/@Mybridge/top-10-angular-2-articles-for-the-past-month-v-june-37bb96b667a3#.tjs9etrwb", "https://dzone.com/articles/angular-2-a-getting-started-guide-for-beginners"]
tags: [ "JavaScript", "Angular.js", "Angular" ]
---

<div class="article-intro">
	Since about half a year, I'm organizing a <a href="http://www.meetup.com/Software-Craftsmanship-SouthTyrol/">local Meetup group around Software Craftsmanship</a>. I recently also published <a href="/blog/2016/04/learning-angular2-directives-course/">a video course on "Learning Angular 2 directives"</a> and given Angular 2 finally released RC1, I decided to organize a Meetup session to introduce Angular 2 to our members. <i>Hint: check out the screencast at the end :wink:</i>
</div>

<br />

<figure class="image--wide">
	<a href="https://docs.google.com/presentation/d/1sgIjSzDVrc2VDpQr6OGZ7rPGMnSV_TSvLFDVvGi3yB0/edit?usp=sharing">
		<img src="/blog/assets/imgs/meetup-intro-angular2/slide-deck.png" />
	</a>
	<figcaption>Click to get access to the slides</figcaption>
</figure>

{% include postads %}

> Wohooo! **This article earned some fame** and was chosen at **rank #1** out of ~1500 Angular 2 articles published in May-June 2016. [Read the whole story](https://medium.com/@Mybridge/top-10-angular-2-articles-for-the-past-month-v-june-37bb96b667a3#.tjs9etrwb) :blush:

## Intro

This article is for those of you that are new to Angular 2 or even to web development in general. Here, I'm going to give you a good overview what Angular 2 is all about, highlighting some of the main concepts behind. The idea is to give you a good starting point from where to go and do further research.

> **TL;DR -** Check out the [video screencast at the end](#screencast) of this article :wink:

If you did already some coding examples in Angular 2, then I'm probably going to bore you :smiley:. But maybe you want to dive deeper with my [Learning Angular components video course](/blog/2017/01/video-course-learning-ng-cmps/) I recently published :wink:.

{% include article-link.html
	url="/blog/2016/04/learning-angular2-directives-course/"
	title="Learning Angular 2 directives"
	text="Learn how to build efficient Angular 2 directives with this fast and interactive video course"
	imageurl="/blog/assets/imgs/learning-angular2-directives/cover.jpg"
%}

## Big Picture

Here's a simple classification of today's web application architectures.

### Server-side rendered

In server-side rendered applications, most of the application's logic resides on the server, and remains there. The user basically enters the URL, the request gets send to the server, which then produces the final HTML containing the requested data and sends that back to the browser which simply renders it out. When the user interacts with the page, that request gets again sent to the server, which in turn generates a new HTML page and serves it back to the browser.

<figure>
	<a href="/blog/assets/imgs/meetup-intro-angular2/server-side-rendering.png" class="image--zoom">
		<img src="/blog/assets/imgs/meetup-intro-angular2/server-side-rendering.png"/>
	</a>
</figure>

This is how the web has been designed, a perfectly valid model and what many pages still use today.

### Client-side rendered

Modern web pages often require to work more like applications do on the desktop, though. People demand for a much better user experience, more interactivity, fast transitions between "pages" and even offline capabilities. That's where the so-called SPAs (Single Page Applications) come into play.

When the user enters the URL, the web server responds with an HTML page, but also with a set of resources (JavaScript files and images) that make up our client-side application. The browser receives that, loads the JavaScript application and "boots it". Now it's the job of that application to dynamically generate the user interface (HTML) based on the data, right from within the browser. After that happens, every new user action doesn't reload the entire web site again, but rather the data for that specific user interaction is send to the server (usually by using the JSON format) and the server in turn responds with the just the amount of data requested by the JavaScript client, again using JSON (normally). The JavaScript application gets the data, parses it and dynamically generates HTML code which is shown to the user.

<figure>
	<a href="/blog/assets/imgs/meetup-intro-angular2/client-side-rendering.png" class="image--zoom">
		<img src="/blog/assets/imgs/meetup-intro-angular2/client-side-rendering.png" />
	</a>
</figure>

As you can see, the amount of data that is being exchanged is very optimized. However, a big downside of such type of applications is that the startup time is usually much longer. You might already have figured why: well, because the browser doesn't get the HTML code to show, but rather a bunch of JavaScript files that need to be interpreted, and executed, and which in turn then generates the final HTML to be shown to the user.

### Server-side pre-rendering, isomorphic JavaScript or universal JavaScript

Just some names that are currently being used for the third type of web application I'd like to show you. As you might guess, it aims at taking the best of the server-side rendered web apps and SPAs.

In a nutshell, what it does is the following. When the user enters the URL, the server loads the JavaScript application on the server side, boots it up and then delivers the already (by the JavaScript app) pre-rendered HTML plus the JavaScript app itself back to the client. There, the browser interprets the JS app and runs it, which has then to be intelligent enough to resume where the server has left off.

The advantage is obvious: you get fast startup times, but still the benefit of a SPA as mentioned before.

## Why Angular 2? What's different?

Ok, let's get to the meat. Why should you be interested in Angular 2? Here are a couple of things I picked up mainly from [Brad Green's](https://twitter.com/bradlygreen) and other core member's talks from a couple of the latest conferences.

### Angular 2 is a platform!

<figure>
	<a href="/blog/assets/imgs/meetup-intro-angular2/angular2-platform.jpeg" class="image--zoom" >
		<img src="/blog/assets/imgs/meetup-intro-angular2/angular2-platform.jpeg"/>
	</a>
	<figcaption>Angular 2 is a platform!</figcaption>
</figure>

At [his keynote at NgConf 2016](https://www.youtube.com/watch?v=gdlpE9vPQFs), Brad Green named **Angular 2 a platform** rather than a library or framework. The main reason is that it is split up into modular pieces, build upon each other, some of which can even be used outside the Angular ecosystem.

There are some building blocks, like the dependency injection, decorator support, [zone.js](https://github.com/angular/zone.js/) (which btw. can be used completely independently from Angular and is [currently under discussion at stage 0 at TC39](https://github.com/tc39/proposals/blob/master/stage-0-proposals.md) for being included into the ECMA standard), a compilation service, change detection and a rendering engine (which is platform independent). On top of that, there are other libraries such as [Angular Material](https://github.com/angular/material2) (an UI library with material design support), [mobile](https://mobile.angular.io/) and [Universal](https://universal.angular.io/) etc.

There are even modules such as i18n, the router and animation that can be used from within Angular 1.x as well.

### Extremely fast!

Angular 2 is designed to be extremely fast. Well, every new JS library would probably claim that, but there are some differences in the approach Angular 2 is taking.

First of all, ~~they're currently hardly working on a so-called "template compiler" or "offline compiler"~~ the so-called [Ahead-of-time (AoT) compilation](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html). Many JavaScript frontend frameworks basically render the templates dynamically into the browser's DOM at runtime, which requires a templating engine of some kind. Angular 2 templates and it's components are made in a way that Angular 2 is able "to reason about your app's templates" and thus to generate an [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) and consequently to translate all of your templates into pure JavaScript code **at compile time**. This is huge IMHO :+1:.

<figure>
	<a href="/blog/assets/imgs/meetup-intro-angular2/templatecompiler.png" class="image--zoom" >
		<img src="/blog/assets/imgs/meetup-intro-angular2/templatecompiler.png"/>
	</a>
	<figcaption>Template compiler aka offline compiler</figcaption>
</figure>

As a result, your deployed app doesn't require any templating engine to run, but it rather contains highly optimized JavaScript code for directly manipulating the DOM. That's super fast and moreover the resulting Angular 2 library gets a lot smaller, as you don't need its templating engine any more when you deploy in production.

And that leads us to the next part.

### Small!

The library gets really, really small.

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/John_Papa">@John_Papa</a> <a href="https://twitter.com/arhoads76">@arhoads76</a> <a href="https://twitter.com/DanWahlin">@DanWahlin</a> I believe current numbers are something like 49K via Rollup and 25K via jscompiler.</p>&mdash; Brad Green (@bradlygreen) <a href="https://twitter.com/bradlygreen/status/737700486673891328">May 31, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

By being able to strip out useless parts with the template/offline compiler, lots of stuff can already be dropped when deploying in production. Furthermore, the goal is to use a bundler that supports tree shaking and thus reduce the size of the final compiled JS files even more by eliminating everything that is not actively being used within your application. Frankly, if you don't use the routing module of angular, it simply won't get included in your final app.

<figure>
	<a href="/blog/assets/imgs/meetup-intro-angular2/angular2size.png" class="image--zoom">
		<img src="/blog/assets/imgs/meetup-intro-angular2/angular2size.png" class="image--medium"/>
	</a>
	<figcaption>Angular 2 will be veeeeery small!</figcaption>
</figure>

> **Tree shaking** is basically "dead code elimination". By analyzing which JavaScript modules are used and which aren't, compilers that support such approach can eliminate the unused parts and thus produce a much more optimized and smaller bundle. Obviously a proper module system such as ES2015 modules has to be used for this to work.

### Lazy loading, built-in

Finally! Lazy loading has been a hot topic already for Angular 1.x and many other frameworks. When you build a serious application, it might get quite big pretty quick. That said, you cannot force your users to download megabytes over megabytes just to get your app boot up, especially on flaky Internet connections or mobiles. That's why lazy loading needs to be implemented. The idea is to load only those parts the users most heavily use and load other parts on demand when needed. This was particularly hard in Angular 1. [ocLazyLoad](https://oclazyload.readme.io/) being one possibility to achieve this.

Now with Angular 2 this is finally built-in right from the beginning, through the framework's router and so-called "lazy routes".

<figure>
	<a href="/blog/assets/imgs/meetup-intro-angular2/lazyloading.png" class="image--zoom">
		<img src="/blog/assets/imgs/meetup-intro-angular2/lazyloading.png" class="image--medium"/>
	</a>
	<figcaption>Lazy loading via routes</figcaption>
</figure>

At the moment of writing this article, the router has been rewritten and thus [there are no docs at the moment](https://angular.io/docs/ts/latest/guide/router.html). It should be available shortly. Till then, you may want to give this video a go, where Misko Hevery explains it.

<iframe width="853" height="480" src="https://www.youtube.com/embed/d8yAdeshpcw?list=PLOETEcp3DkCq788xapkP_OU-78jhTf68j" frameborder="0" allowfullscreen="allowfullscreen"> </iframe>

### Angular Universal

This is Angular 2's answer to isomorphic JavaScript or server side pre-rendering. Again, it's all about performance, to get the app to the user as quickly as possible.

<figure>
	<a href="/blog/assets/imgs/meetup-intro-angular2/angular-universal.png" class="image--zoom">
		<img src="/blog/assets/imgs/meetup-intro-angular2/angular-universal.png"/>
	</a>
	<figcaption>Server side pre-rendering with angular-universal</figcaption>
</figure>

[angular-universal](https://universal.angular.io/) is a library that lives under the Angular 2 GitHub repository with the goal of making server-side rendering as easy and straightforward as possible. Since Angular 2 is made to be platform agnostic, it can be executed in non-browser environments without too much issues.

So, when loading a universal Angular 2 app, from a high-level perspective, what happens is the following:

1. Your user opens your universal Angular app, also maybe invoking a client-side route like `http://myuniversal-app.io/people/detail/1`
2. Some angular-universal compatible server gets the request, _knows_ it is a client-side route and thus boots the Angular 2 root component (usually `app.component.ts`) on the server side and executes it.
3. The server then delivers the already rendered application state of that invoked client route inside the `index.html` back to the browser
4. The browser renders the HTML, thus the user will see the person with id 1 rendered immediately (as it is already present in the HTML)
5. Meanwhile the Angular 2 app again boots,but this time on the client-side (the browser) in the background (in a hidden div basically). A library, `preboot.js`, records all user events like clicks, input changes etc. until Angular 2 is fully loaded.
6. When the Angular 2 app is ready, it will have the same rendered state as the server has delivered previously. `preboot` then _replays_ all of the user events against that client-side rendered app.
7. Finally, the client-side rendered app gets activated and the server-rendered HTML is being dropped

That was really from a birds-eye perspective but you get the idea. To know more details, a good place to start is the [quickstart guide](https://universal.angular.io/quickstart/). Also the [universal-starter repository](https://github.com/angular/universal-starter) has some good examples to play around with.

Currently the angular-universal supported server frameworks are Node and ASP.net. But there's currently support for Java, Go and PHP in the works.

### Unified Development

Something I'm particularly excited about is the approach of having a unified development model.

<figure>
	<a href="/blog/assets/imgs/meetup-intro-angular2/unified-development.png" class="image--zoom">
		<img src="/blog/assets/imgs/meetup-intro-angular2/unified-development.png"/>
	</a>
	<figcaption>Support for Web, Desktop and Mobile</figcaption>
</figure>

#### Angular :heart: Mobile

<figure>
	<a href="/blog/assets/imgs/meetup-intro-angular2/angular-loves-mobile.png" class="image--zoom">
		<img src="/blog/assets/imgs/meetup-intro-angular2/angular-loves-mobile.png"/>
	</a>
</figure>

You can choose among **4 different possibilities** for developing mobile applications with Angular 2.

**[Angular Mobile Toolkit](https://mobile.angular.io) -** focuses mostly on a new architectural approach to creating web applications: Progressive Web Apps (PWA). These are normal web applications, that facilitate modern web technologies like service workers for offline caching and a special (non-standard right now) manifest file that instructs Chrome to provide "installation like capabilities" for the app, s.t. it can be added onto your homescreen. Google I/O 2016 was all about PWA development. Just [check out some of the talks on Youtube](https://www.youtube.com/results?search_query=google+Io+2016+progressive+web+app). Also, [JavaScriptAir's latest talk on it might be relevant](https://javascriptair.com/episodes/2016-05-25/).

**[Ionic 2](http://ionic.io/2) -** is a hybrid mobile application framework. That simply means you build a web application and package it in a native installable package for iOS and Android that can be installed through the corresponding app stores. The app itself is served through a WebView component, which means you're running a web application in the end. Access to underlying APIs is achieved [through Apache Cordova](https://cordova.apache.org/). Ionic specializes in providing you the tools for setup and building the native app packages. Moreover it gives you a highly tuned UI framework and mobile routing support. They recently also announced futures support for PWAs, so it'll be quite interesting to see it evolve.

**[NativeScript](https://www.nativescript.org/) -** is a framework developed by Telerik. Different to Ionic, it "compiles" to a native application. Actually your JavaScript code is being executed through a special JavaScript VM (like Chrome's V8) which builds the bridge to the underlying native platform. But anyway, take a look [at this video with John Papa, Burke Holland and TJ VanToll showing off some NativeScript capabilities](https://www.youtube.com/watch?v=efk_oeI58hc).

**[React Native](https://facebook.github.io/react-native/) -** There's the possibility to even use React-Native with Angular 2. Unfortunately I've not done anything with it yet, so you may want to browse the web for it if you're particularly interested in this one :wink:.

The trick is just to get the right one for your needs :wink:

#### Installed Desktop

When talking about "installed desktop" we don't mean like running an Angular 2 app on a desktop browser, but rather to run it inside an installable application. This is powered by [Electron](http://electron.atom.io) and [Windows Universal (UWP)](https://developer.microsoft.com/en-US/windows/develop/build-apps-shared-code). Watch [what Brad Green had to say about it at NGConf 2016 :video_camera:](https://youtu.be/gdlpE9vPQFs?t=21m).

<figure>
	<a href="/blog/assets/imgs/meetup-intro-angular2/installeddesktop.png" class="image--zoom">
		<img src="/blog/assets/imgs/meetup-intro-angular2/installeddesktop.png"/>
	</a>
</figure>

A very important point here that's easy to miss: by running Angular 2 directly from within a Web Worker, not only you get an enormous performance boost as it runs in a separate thread, but you also get access to the underlying platform, Databases etc..

{% include article-link.html
	url="http://www.html5rocks.com/en/tutorials/workers/basics/"
	title="The basics of web workers"
	text="The Web Workers specification defines an API for spawning background scripts in your web application. Web Workers allow you to do things like fire up long-running scripts to handle computationally intensive tasks, but without blocking the UI or other scripts to handle user interactions."
%}

Not convinced? Well, most probably you're already using an Electron app, like [VSCode](https://code.visualstudio.com/), or [Slack](https://slack.com/) or some of these:

<figure>
	<a href="/blog/assets/imgs/meetup-intro-angular2/electronapps.gif" class="image--zoom">
		<img src="/blog/assets/imgs/meetup-intro-angular2/electronapps.gif"/>
	</a>
</figure>

## The 7 Key Concepts behind Angular 2

At NGConf 2016, John Papa [had a slide in his talk](https://youtu.be/WAPQF_GA7Qg?t=1m25s) describing the **seven main key concepts** behind Angular 2. These really nail it.

<figure>
	<a href="/blog/assets/imgs/meetup-intro-angular2/seven-concepts-ng2.png" class="image--zoom">
		<img src="/blog/assets/imgs/meetup-intro-angular2/seven-concepts-ng2.png"/>
	</a>
	<figcaption>7 key concepts by John Papa</figcaption>
</figure>

### Modules and the ES2015 story

Ok, at this point I should probably stop and we should take a broader look at what modules are all about.

Initially in web development, you most likely did something like this:

```html
<html>
<head>...</head>

<body>

	<script src="./vendor/jquery.min.js"></script>
	<script src="./vendor/super-awesome-datepicker.min.js"></script>
	<script src="./myapp.js"></script>
</body>
</html>

```

You simply include the required JavaScript files **in the correct order**. Within your `myapp.js` you might have..

```javascript
function initDatePicker(someDateValue) {
	$('#myBirthDateInput').superAwesomeDatePicker({
		value: moment(someDateValue)
	});
}
```

A couple of things to note here. We rely on **global state** and libraries to be loaded. Like `$` for jQuery and `moment` and `superAwesomeDatePicker`. These libraries need to be present at the moment this function is executed. Meaning you have to load all of the scripts in the right order, based on their respective dependencies. This is simply not feasible for large scale applications with hundreds of different JavaScript files. That's why **module systems** have been created, like the AMD standard implemented by - for example - RequireJS:

```javascript
define(['jquery', 'moment'], function($, moment) {
	function initDatePicker(someDateValue) {
		$('#myBirthDateInput').superAwesomeDatePicker({
			value: moment(someDateValue);
		});
	}

	return initDatePicker;
});
```

Note, we now have imports, like a dependency called `jquery` and `moment` get defined somewhere and imported as `$` and `moment` inside this specific file. In turn, also functionality within this file gets exported with `return initDatePicker` s.t. it can be imported by other files in the exact same way. And so on.

This worked, but wasn't always ideal. Or better, there have been different other patterns around, and they weren't always that nicely compatible and interchangeable. With ES6 or ES2015, the TC39 (the committee deciding over the next ECMAScript features to be implemented by browsers) finally specified _a standard syntax for defining JavaScript modules_.

```javascript
import * as $ from 'jquery';
import * as moment from 'moment/moment';

function initDatePicker(someDateValue) {
	$('#myBirthDateInput').superAwesomeDatePicker({
		value: moment(someDateValue)
	});
}

export initDatePicker;
```

A much more clear and expressive syntax.

Another notable feature that many developers coming from languages like Java or C# may like, are classes and inheritance:

```javascript
class MyApp {
	_someDateValue;

	constructor(someDateValue) {
		this._someDateValue = someDateValue;
	}

	get someDateValue() {
		return this._someDateValue;
	}

	set someDateValue(value) {
		this._someDatevalue = value;
	}

	static someStaticFunction() { ... }
}
```

Finally, another construct we need to learn about to understand Angular 2 apps are **decorators**.

```
@DebugLog({
	...
})
export class MyApp { ... }
```

These simply provide metadata to the underlying framework, in this case Angular, about the class. There is currently a proposal for decorator support in ECMAScript. Also, other than many might think, in JavaScript, decorators are not annotations.

<blockquote>
Annotations and decorators are two competing and incompatible ways to compile the @ symbols that we often see attached to Angular components. Annotations create an "annotations" array. Decorators are functions that receive the decorated object and can make any changes to it they like.<br /><br />
Traceur gives us annotations. TypeScript gives us decorators. Angular 2 supports both.
 <cite><a href="http://nicholasjohnson.com/blog/annotations-vs-decorators/">nicholasjohnsom.com</a></cite>
</blockquote>

Also, check out the [article on Thoughtram on this topic](http://blog.thoughtram.io/angular/2015/05/03/the-difference-between-annotations-and-decorators.html).

**So, can I use all of this in the browser right now?** No, unfortunately not. What you need is a compiler or transpiler. Currently [Babel](https://babeljs.io/) and [TypeScript](https://www.typescriptlang.org/) are the most popular ones.

<figure>
	<a href="/blog/assets/imgs/meetup-intro-angular2/transpiling.png" class="image--zoom">
		<img src="/blog/assets/imgs/meetup-intro-angular2/transpiling.png"/>
	</a>
</figure>

The Angular team decided to go with TypeScript and has written its entire codebase with it. TypeScript has been created by Microsoft already in 2010 and then went first public in 2012. It really kicked off only recently, though, with Angular 2. The main difference to other transpilers is that it adds optional type support to JavaScript. First of all, this allows to discover and prevent nasty errors at compile time and second it opens up numerous possibilities for better tooling support.

<figure>
	<a href="/blog/assets/imgs/meetup-intro-angular2/typescriptdemo.gif" class="image--zoom">
		<img src="/blog/assets/imgs/meetup-intro-angular2/typescriptdemo.gif"/>
	</a>
</figure>

**Ok ok wait wait, so how is this relevant for Angular 2?** Angular 2 is written entirely in TypeScript and while it's not impossible to write Angular 2 applications in ES5, it is highly recommended to write them in ES6 or TypeScript to get the best out of it. This way you can start using all of the above mentioned features on modules, classes, decorators and much more we didn't even cover.

**Long story short**, you should get accustomed to the new features of ES2015. Browse the web or [check out my article](/blog/2015/08/jump-start-es2015/) which gives you a quick intro and links to many other useful resources.

{% include article-link.html
	url="/blog/2015/08/jump-start-es2015/"
	title="ES2015 - Jump Start"
	text="ES6: Get introduced to the next generation JavaScript"
%}

### <(web)-components>

Component based architectures is the new paradigm for frontend development. This is not something particular to Angular but is something that's shared among other libraries like React, Ember or Polymer as well. The idea is to build **autonomous pieces** with clearly defined responsibilities and which might even be reusable across multiple applications.

**So what are web components about?** Roughly speaking, it's about defining custom HTML tags and their corresponding behavior. Like..

```html
<google-map pointer="46.471089,11.332816"></google-map>
```

It's a powerful way to express semantics, isn't it? By simply looking at this HTML tag, we know that it'll render a google map most probably and set a pointer at the given coordinates. Neat! Currently this isn't something the browser understands natively, although there's a [draft spec document on the w3c website](https://www.w3.org/standards/techs/components#w3c_all) on the web component standard and what concepts it should embrace.

You may also want to check out [Polymer](https://www.polymer-project.org/1.0/) and [webcomponents.org](http://webcomponents.org/)

{% include article-link.html
	title="Learning Angular 2 directives: All about Components"
	url="https://player.oreilly.com/videos/9781785884702"
	text="Free sample from my video course where I explain different ways of creating components"
	imageurl="https://cdnapisec.kaltura.com/p/1681692/thumbnail/entry_id/0_3ef0ihhz/height/500/vid_sec/3/quality/100/thumb.jpg"
%}

**Angular 2 fully embraces this component based development** style. In fact, already since the beginning of Angular 1.x, allowing the user to define custom HTML elements with behavior was one of the core philosophies of the framework. A simple component in Angular 2 looks like this:

```javascript
@Component({
	selector: 'hello-world',
	template: `<p>Hello, world!</p>`
})
class HelloWorldComponent {

}
```

In the corresponding HTML you would write this to instantiate it.

```
<hello-world></hello-world>
```

As you can see, decorators are being used to add meta information about the tag of the component, about the template that should be rendered and much more (which aren't being used in this basic example here).

<blockquote class="emphasized">"Components are 1st class citizens in Angular 2"</blockquote>

Now with **components being a 1st class citizen in Angular 2**, there's the **concept of the so-called component-tree**. Every Angular 2 application consists of such a component tree, having a top-level "application component" or root component and from there, lots of child and sibling components.

For example:

<figure>
	<a href="/blog/assets/imgs/meetup-intro-angular2/component-tree.png" class="image--zoom">
		<img src="/blog/assets/imgs/meetup-intro-angular2/component-tree.png"/>
	</a>
</figure>

And this could then be mapped to HTML code like as follows.

<figure>
	<a href="/blog/assets/imgs/meetup-intro-angular2/component-tree-mapping.png" class="image--zoom">
		<img src="/blog/assets/imgs/meetup-intro-angular2/component-tree-mapping.png"/>
	</a>
	<figcaption>Illustration of a component tree and how it's mapped to HTML</figcaption>
</figure>

The component tree is of major importance in Angular 2 and you will always again come across it. For example, this is how you compose your application, and the arcs from one component to the other are the way data is assumed to flow through your application as well as what Angular uses for performing change detection.

{% include article-link.html
	url="http://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html"
	title="Change Detection Explained"
	text="Excellent article by Pascal Precht on how change detection works in Angular 2"
%}

> "Change detection" is the mechanism by which Angular determines which components need to be refreshed as a result of changes in the data of the application.

### Templates and Data Binding

Obviously, when we write something like `<hello-world></hello-world>`, we also need to define somewhere what Angular should render in place. That's where _templates_ and _data binding_ come into play. As we've seen before, we define the template directly in the `@Component({})` annotation by either using the `template` or `templateUrl` property, depending on whether we want to define it inline or load it from some url.

```javascript
@Component({
	...
	template: `
	<p>Hello, world!</p>
	`
})
class HelloWorldComponent {}
```

We also need some data binding mechanism to get data into this template and out of it again. Let's look at an example:

```javascript
{% raw %}
@Component({
	selector: 'hello-world',
	template: `
	<p>Hello, {{ who }}</p>
	`
})
class HelloWorldComponent {
	who: string = 'Juri'
}
{% endraw %}
```

As you can see, the variable `who` inside the component's class gets bound to into the template. Whenever you change the value of `who`, the template will automatically reflect that change.

### Services and Dependency Injection

Besides components, Angular always had the concept of Services and Dependency Injection. So does Angular 2. While the component is meant to deal with the UI and related stuff, the **service is the place where you put your "business logic"** s.t. it can be shared and consumed by multiple components. A service is nothing else than a simple ES6 class:

```javascript
@Injectable()
export class PersonService {
	fetchAllPeople() { ... }
}
```

From within some component we can then use this service

```javascript

import { PersonService } from './services/person.service';

@Component({
	...
	providers: [ PersonService ]
})
class PersonComponent {
	people;
	constructor(private personService: PersonService) {
		// DI in all it's beauty, just provide TS type annotation and Angular will handle the rest
		// like adding the reference of personService to the class
		// no need for "this.personService = personService;"
	}

	ngOnInit() {
		this.people = this.personService.fetchAllPeople();
	}
}
```

Nice, we get a reference to `PersonService` from within our component. But wait, who instantiates the class? You guessed it, Angular's **dependency injection**. For this to work you need two things

- add the `@Injectable` annotation
- register `PersonService` as a provider either on the app, the top level component or from the part of the component tree (downwards) where you want to have the service injectable

{% include article-link.html
	url="http://blog.thoughtram.io/angular/2015/05/18/dependency-injection-in-angular-2.html"
	title="Dependency Injection in Angular 2"
	text="Awesome introduction to how dependency injection works in Angular 2 by Pascal Precht on the Thoughtram blog."
%}

<a name="rxjs"></a>

### Reactive Programming with RxJs 5 and Http

<figure class="image--left">
    <img src="https://raw.githubusercontent.com/Reactive-Extensions/RxJS/master/examples/dragndrop/logo.png">
    <figcaption>RxJS 5</figcaption>
</figure>

Angular 2 heavily uses a paradigm called "Reactive Programming", in particular this is implemented through the [RxJS 5](https://github.com/ReactiveX/rxjs) library. Like the Angular 2 http service won't return promises, but instead RxJS Observables.

This pattern is not new at all, and gained a lot of popularity recently in modern frontend development. I'm not going into the details here now, as it would be an entire article on its own. Just know that Angular 2 will heavily rely on it and that's why you should probably go and learn more about it.

Here are some good articles to get started :smiley:

{% include article-link.html
	url="https://gist.github.com/staltz/868e7e9bc2a7b8c1f754"
	title="The introduction to Reactive Programming you've been missing"
	text="André Staltz introduces the very basics of what reactive programming is all about."
%}

{% include article-link.html
	url="https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35"
	title="RxJS 5 Operators By Example"
	text="A complete list of RxJS 5 operators with easy to understand explanations and runnable examples."
%}

{% include article-link.html
	url="https://medium.com/google-developer-experts/angular-introduction-to-reactive-extensions-rxjs-a86a7430a61f#.bknbea8ny"
	title="Angular - Introduction to Reactive Extensions (RxJS)"
	text="How to use observable sequences in AngularJS, an introduction by Gerard Sans."
%}

{% include article-link.html
	url="https://coryrylan.com/blog/intro-to-rxjs-observables-and-angular-2"
	title="Intro to RxJS Observables and Angular 2"
	text="Screencast from Cory Rylan where he demoes RxJS with Angular 2."
%}

We will also briefly touch it in the screencast at the end of the article.

## Lot's of stuff, let's get started with some code

In recent years, getting started quickly with frontend development got notably more difficult. Just creating some `index.html` with a couple of `<script>` tags is by far no more enough. What you need is some transpiler and a build tool that transpiles the code and serves it up, not to mention then optimizations like minification, inclusion of HTML templates, CSS compilation etc..

<figure>
	<a href="/blog/assets/imgs/meetup-intro-angular2/tooling-landscape.png" class="image--zoom">
		<img src="/blog/assets/imgs/meetup-intro-angular2/tooling-landscape.png"/>
	</a>
	<figcaption>Just some of the tools being used in modern JavaScript development (not mentioning frontend frameworks here, just tools ;) )</figcaption>
</figure>

Some build tools/module bundlers you should definitely take a closer look at is **SystemJS and Webpack**. These are currently at the base of most Angular 2 projects. To make this easier, the [Angular CLI project](https://cli.angular.io) has been created. Mike Brocchi, core contributor of the CLI project [demoed it at NGConf 2016](https://www.youtube.com/watch?v=wHZe6gGI5RY).

<figure>
	<a href="https://cli.angular.io" class="image--zoom">
		<img src="/blog/assets/imgs/meetup-intro-angular2/angular-cli.png"/>
	</a>
</figure>

The CLI allows to do things like

```
$ ng new my-super-awesome-project
$ ng g component my-new-component
$ ng g route hero
```

Moreover it generates these components by [following the official styleguide](https://angular.io/docs/ts/latest/guide/style-guide.html) and has even linting built-in.

Angular CLI is still under heavy development and has still some way to go till it's fully usable. But it's awesome for quickly getting started, and I'm quite sure it'll get better and be a huge help especially for newcomers to get started with Angular 2 without having to know all the tooling in depth (recently [Webstorm integrated Angular CLI support](http://blog.jetbrains.com/webstorm/2016/06/webstorm-2016-2-eap-162-646/)). However, I also strongly recommend to learn these tools as you go along. The CLI will bring you quickly to a good point, but it's indispensable to know your tooling to get further ahead.

Other popular starters you definitely also want to take a look at are these. They are community based, have lots of best practices bundled and have been around for quite a while now.

{% include article-link.html
	url="https://github.com/AngularClass/angular2-webpack-starter"
	title="github/angular2-webpack-starter"
	text="An Angular 2 Starter kit featuring Angular 2 (Router, Http, Forms, Services, Tests, E2E, Dev/Prod), Material Design, Karma, Protractor, Jasmine, Istanbul, TypeScript, TsLint, Codelyzer, Hot Module Replacement, Typings, and Webpack by @AngularClass"
	imageurl="/blog/assets/imgs/githublogo.svg"
%}

{% include article-link.html
	url="https://github.com/mgechev/angular2-seed"
	title="github/angular2-seed"
	text="Modular seed project for Angular 2 apps with fast, statically typed build"
	imageurl="/blog/assets/imgs/githublogo.svg"
%}

## Okay..we're now all set up I guess. Time to code!
<a name="screencast"></a>

Are you ready? Great, so let's create our first Angular 2 application, step by step :+1:.

<iframe width="853" height="480" src="https://www.youtube.com/embed/fXHyqSIIF9Q" frameborder="0" allowfullscreen="allowfullscreen"> </iframe>

## Conclusion

Congrats, you've come to the end :wink:. So by now you probably realize there's lots of new stuff for you to learn. But the nice thing is that maybe it isn't even only Angular 2 related. Like switching to ES2015 (ES6) and/or TypeScript, or adopting the reactive programming style with RxJS, or learn new toolings like Webpack and SystemJS...these are all things you can totally reuse, even though you dont' plan to continue with Angular 2 in the end. Fortunately, the things you have to exclusively learn for Angular 2 got a lot smaller compared to Angular 1.x!

So this was basically just the beginning. From here you can start go more in depth. Follow the links I provided to get started. Also, feel [free to drop me a line on Twitter](https://twitter.com/juristr). In general, try to connect with the Angular 2 community (over Twitter, GitHub, Slack,...), there are lots and lots of awesome people willing to help you with their enourmous expertise. :smiley:

_Thanks to [Martin Hochel](https://twitter.com/martin_hotell) for reviewing this article :+1:_
