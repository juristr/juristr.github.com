---
layout: post
title: "Angular Connect London - Day 1"
lead: "Directly from Europe's biggest Angular Developer Conference"
postimg: "/blog/assets/imgs/ngconnect/ngconnect_bg.png"
show_img_in_detail: true
coverimage: true
category: 
tags: ["Angular", "JavaScript"]
---

I'm lucky enough to be able to attend [AngularConnect](http://angularconnect.com/) here at London. This article is going to be my notebook while attending the conference. I'm [taking notes live during day 2](/blog/2015/10/angular-connect-london-day2/)!

Here are my **notes from day 1** of the conference.

![](/blog/assets/imgs/ngconnect/ngconnect-banner.jpg)

## Keynote

Slides: [https://goo.gl/JJICdl](https://goo.gl/JJICdl)

[Brad Green](https://twitter.com/bradlygreen), Engineering director @ Google and overall project manager of Angular (since it's beginnings in 2009) opens the show, outlining some some stats. Most interestingly about Google's products currently using Angular v1 which are products like Chromecast, Google Analytics, the Youtube Video Manager etc. Many people have been criticizing Angular for not even being used by Google itself. Therefore such announcements are kinda important for the community as it demonstrates Google's commitment and faith into Angular.

What's not quite as surprising are the Angular v1 vs v2 usage stats:

![](/blog/assets/imgs/ngconnect/ng1-vs-ng2-usagestats.png)

7% taking a look at Angular 2 is probably more surprising. These stats are being taken from the [Angular v1](https://angularjs.org/) and [Angular 2](https://angular.io/) visitor stats.

### Angular 2..

..is all about speed and a better framework that leverages the latest available technology. It's about
- load/startup speed by using angular universal to pre-render views on the server
- speeding up the compile phase by about 3x
- hugely improving change detection with support for RxJS and Immutables
- improving re-rendering speed through view caching, virtual scroll etc.

![](/blog/assets/imgs/ngconnect/ng2-speedoverview.png)

What impressed me both (apart from all the speed improvements in compilation and view rendering) is the fact that server-side rendering got so easy with angular universal. Using it, you can dramatically increase the speed of your application startup as the 1st view is already rendered on the server and directly served to the client.

### Collaboration with Meteor.js

Other awesome news include tight collaboration with the [Meteor](https://www.meteor.com/) team to provide even better support and integration with Angular 2 (as they already have by now).

The shown performance stats are huge!

![](/blog/assets/imgs/ngconnect/ng2-meteor-speed.png)

### Templates

Brad quickly outlined some changes in the templates:

```html
<!-- properties --> 
<input [value]="firstname">

<!-- events -->
<button (click)="buy($event)">Buy it</button>
```

These changes make the API much more clear and Angular 2 can get rid of custom directives like `ng-href`, `ng-click`, `ng-mousemove` etc. You can simply use the native properties/events, using the proper `()` or `[]` notation.

More on the [Angular 2 cheatsheet](https://angular.io/docs/ts/latest/guide/cheatsheet.html).

### Components

When today you (should) have a directive with a corresponding directive controller, tomorrow with Angular 2 you'll have (or call it) a component. Everything is a component, your app simply a big "component tree" starting with a top-level component and then have lots of sub-components nested within it.

![](/blog/assets/imgs/ngconnect/ng2component.png)

And yes, while you can write it in ES5, it feels like you're hurting yourself. **TypeScript is the way to go**, or at least ES6.

```javascript
// ES5 version
function DisplayComponent() {
    this.myName = 'Alice';
}
DisplayComponent.annotations = [
    new angular.ComponentAnnotation({
        selector: 'display'
    }),
    new angular.ViewAnnotation({
        template: '<p>My name: {%raw%}{{ myName }}{%endraw%}</p>'
    })
];
```

The ES6 (ES2015) version:

```javascript
@Component({
    selector: 'display',
    template: '<p>My name: {%raw%}{{ myName }}{%endraw%}</p>'
})
class DisplayComponent {
    myName: string;

    constructor() {
        this.myName = 'Alice';
    }
}
```

**Data flow will be unidirectional**, going from the parent down to the children. This makes it
- faster
- easier to debug (as the data always flows down the component tree)
- works better with libraries like RxJS, Flux,...

### Languages

Ultimately, Angular is designed to give you as much freedom as possible. That said, it supports
- ES5 - runs in the Browser (ultimately)
- ES6 (ES2015)
- TypeScript (Angular 2 is written in TS)
- Dart - No JS

Even though you have all the options, as mentioned, I think **TypeScript is the way to go**. It will give you the better developer experience after all. Quite some speakers mentioned that as well, especially for reasons of Typing (and thus compile-time checking), tooling in general and finally refactoring support.

### Tools

For newbies in the field, all of this technology you have to know about might get quite overwhelming. Like NPM, Grunt/Gulp/Webpack, SystemJS, then Angular itself,... That's why the Angular team also heavily invests into better tooling. They've worked together with the Ember-CLI team to build **[angular-cli](https://github.com/angular/angular-cli)**. It's still in alpha but quite promising.

After installing..

```
$ npm install -g angular-cli
```

..you can scaffold a new app

```
$ ng new greetings-ac
```

and use

```
$ ng serve

```

to have it served through a local dev server. It also allows to generate new components using

```
$ ng generate component brad-is-cool
```

Also, a **new version of Batarang**: [Batarangle](http://go.rangle.io/batarangle)

### Cross platform

There also seems to be a huge interest in getting mobile apps with Angular. Besides the (really promising) hybrid approach that Ionic is taking, there's also a collaboration going on with Telerik and the React Native team in an effort called **NativeScript** (more in tomorrows sessions).

![](/blog/assets/imgs/ngconnect/mobile-native.png)

Flexibility in the Angular 2's new templating engine opens up a whole set of new possibilities:

![](/blog/assets/imgs/ngconnect/ng-templating.png)

### Path to Angular 2

![](/blog/assets/imgs/ngconnect/ngUpgrade.png)

Start taking a look at [ngUpgrade](https://github.com/angular/ngUpgrade), a repository describing strategies and ideas to aid upgrading to Angular 2.

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Remember when <a href="https://twitter.com/mhevery">@mhevery</a> said at <a href="https://twitter.com/angularu">@angularu</a> that upgrading to Angular 2 will be boring? Well.. Lemme tell you sth. He didn&#39;t lie.</p>&mdash; Pascal Precht ʕ•̫͡•ʔ (@PascalPrecht) <a href="https://twitter.com/PascalPrecht/status/653822835312431104">October 13, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

[Upgrade playground](https://github.com/angular/angular/tree/master/modules/playground/src/upgrade).

### Developer Relations

This thing is huge. The Angular team is collaborating with big players like Microsoft, Visual Studio Code, the ASP.net team which are committed to it, Facebook & the React.js team, Ember...yes, you can even build Office 365 add-ons with Angular.

### Supported browsers

IE 9+ (yep, you read right), iOS, Android 4.1+ and all other evergreen browsers.

### Release date?

What we've been all waiting for. Unfortunately we only got a

> We're not yet beta, but really close.

What's definitely promising is that internal Google products like Google Fiber, Google AdWords are starting to migrate.

## Building cross platform apps with Ionic 2

Ionic is exciting technology. I was trying hybrid apps about a couple of years ago, but it didn't work out well. The main issue was performance, in animations and stuff. Meanwhile mobile browsers got a lot better, and Ionic nicely fits in with a great library.

**Big announcement:** [Ionic 2 is now public alpha](http://ionic.io/2).

![](/blog/assets/imgs/ngconnect/ionic2logo.png)

Ionic 2 is built on top of Angular 2 and mainly focuses on the following pillars.

### Simplicity

You can easily define components like

```html
<button danger></button>
<io-checkbox></io-checkbox>
```

The CSS is made s.t. it can be easily overwritten. Moreover it's like plain JavaScript with some custom annotations.

```javascript
@Page({
    templateUrl: '...'
})
export class Profile {
    ...
}
```

### Platform continuity

Theres now **one exact codebase for iOS and Android**. The same HTML and JS is automatically enhanced for the target platform. Even the icon set automatically adapts itself. Just specify them like

```html
<icon mail></icon>
<icon home></icon>
...
```

### UI Navigation

UI navigation got a lot better. This is crucial for mobile apps which may have special needs rather than the URL tight kind of back navigation behavior. 
Example: You don't always want to have the back-button functionality, i.e. when choosing a page from the side menu (difficult with URL route navigation)

Ionic 2 features a **push/pop** kind of navigation experience.

```javascript
pushSettings() {
    this.nav.push(...);
}

goBack() {
    this.nav.pop();
}
```

### Theming and Customization

SASS is already build-in with dedicated themes and tools to adjust them. Ionic comes with a set of 9 colors which can be freely adapted to build a custom theme experience.

Moreover it uses the new [Web Animations API](https://w3c.github.io/web-animations/) which gives the developer a lot better control other than CSS animations do. There's already native support for Chrome/Android and there are great polyfills for iOS. The demoed animations were really sleek!

### Conclusion

This looks really promising and is definitely something I'm going to experiment with. Native apps have their place, but they are costly, you need a dedicated team/developers for both, iOS and Android (and Windows) and that's why we're all looking towards hybrid apps that leverage web technologies.


