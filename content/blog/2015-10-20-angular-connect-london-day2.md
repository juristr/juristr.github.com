---
title: Angular Connect London - Day 2
lead: Directly from Europe's biggest Angular Developer Conference
show_img_in_detail: true
coverimage: true
category: null
categories:
  - Angular
  - JavaScript
date: 2015-10-20T00:00:00.000Z
comments: true
url: /blog/2015/10/angular-connect-london-day2
type: post
image: /blog/assets/imgs/ngconnect/ngconnect_bg.png
---

I'm lucky enough to be able to attend [AngularConnect](http://angularconnect.com/) here in London. This article is my notebook from the sessions I attended on day 2. You might also want to check out my [refined notes from day 1](/blog/2015/10/angular-connect-london/).

## Building native Angular apps with NativeScript

Speaker: [@sebawita](https://twitter.com/@sebawita)

<iframe width="560" height="315" src="https://www.youtube.com/embed/4SbiiyRSIwo" frameborder="0" allowfullscreen="allowfullscreen"> </iframe>

Angular 2 is platform agnostic. That what makes it possible to "compile" it to other tech such as **native mobile applications**.

![](/blog/assets/imgs/ngconnect/nativescript.png)

**NativeScript:** use JavaScript to build a native UI. It is not Cordova, PhoneGap..no browser, no DOM. It's also not Xamarin. There's no cross-compilation, the JavaScript runs and transforms at runtime. There are also no wrappers, but there's direct access to the native API. Not cool enough? You can use npm packages! And it's open source.

Everything runs on the JavaScript Virtual Machine. There's a type conversion service which translates JavaScript -> Android Java.

NativeScript modules can be "required" which then translate to the specific platform the code is running on. So it's like an abstraction layer s.t. you don't have to write iOS/Android specific JavaScript code.

Important, **Web UI != Mobile UI**: Mobile applications have different navigation scenarios, different requirements from the UI perspective than a web application.  
Also, there are no `<div>` as there is no DOM/browser. The UI is made of custom components like

```html
<StackPanel>
    <Label...>
    <Button></Button>
</StackPanel>
```

Although the elements are very HTML alike. A huge feature, **LiveSync** between the editor and Android emulator that executes the native components.

## These are not the models you are looking for

Speaker: [@mgonto](https://twitter.com/@mgonto)

<iframe width="560" height="315" src="https://www.youtube.com/embed/LLvRMVQ_JcE" frameborder="0" allowfullscreen="allowfullscreen"> </iframe>

Not about RxJS and/or Immutability, but on mutability.

What's currently done by many that are developing Angular applications:

```javascript
function SomeController($scope) {
    $scope.person = {
        firstname: 'Juri',
        lastname: 'Strumpflohner'
    };
    
    $scope.changeName = function(newName) {
        // some validation
        if(isValid){
            $scope.person.firstname = newName;
            ...
        }
        ...
    };
}
```

The model is directly bound to the scope as plain JavaScript object. Furthermore note the `changeName` function that acts upon the model. **Problem:** the code sits within the controller and is therefore hardly reusable by other parts of the application. Instead, it's the models' responsibility to "change its name".

ES6 offers classes for that. For instance:

```javascript
export class User {
    name: string;
    email: string;
    rating: number;
    
    constructor(userInfo: UserConfig) {
        this.userInfo = userInfo;
    }
    
    calculateRating() {
        ...
    }
    
    public static getUsersByName(name) {
        ...
    }
}
```

### Takeouts

- models should embrace data and behavior
- models should do validation
- models are responsible for saving themselves (like doing http calls)

> **Note**, these are concepts I'm already trying to embrace with the [angular-model-factory library](http://swimlane.github.io/angular-model-factory/).

## Code Happy with TypeScript

Speakers: [@martin_probst](https://twitter.com/@martin_probst), [@jakeherringbone](https://twitter.com/@jakeherringbone)

<iframe width="560" height="315" src="https://www.youtube.com/embed/yy4c0hzNXKw" frameborder="0" allowfullscreen="allowfullscreen"> </iframe>

TypeScript is..

- easy to setup
- benefit from the get go
- incremental (optional typing)
- Flexible (ES5 is ok as well)
- Scaleable

Angular team uses TypeScript for..

- renaming
- code navigation
- type checks
- linting
- build toolchain -> incremental build which will be incorporated in the angular-cli tool

TypeScript can be directly installed from npm and then used from the command line.

```
$ tsc --init --target es5 --experimantalDecorators --emitDecoratorMetadata
```

This creates a `tsconfig.json` which is used by TypeScript to know how the structure of the project is about.

Some gimmicks you get

- source maps
- Type Checking
- Formatting (".clang-format")
- ...

Oh...create a "build/src/app" containing the build files..

## Modularity and packaging for Angular 2

Speakers: [pkozlowski_os](https://twitter.com/pkozlowski_os)  
Slides: [http://g.co/ng/ac-packaging](http://g.co/ng/ac-packaging)

In order to write ES6 code we need to "transpile" it to ES5 compatible code.

Module loader has been removed from the ES2015 spec. It's now a work in progress: [http://whatwg.github.io/loader/](http://whatwg.github.io/loader/)

**Webpack**

```html
<script src="reflect-metadata/Reflect.js"></script>
<script src="zone.js/dist/zone.js"></script>
...
<script src="bundle.js"></script>
```

### What should I use today?
SystemJS loader + Angular2 bundles because it's most used (Plunkers, in the docs,...).
But mostly choose the tool you're most comfortable with.

### Require vs. WebPack vs. JSPM
Advantages and disadvantages.

### Some details
CommonJS output is much more concise than the CommonJS output. That's because SystemJS tries to be "correct" with the ES2015 semantics. It also knows how to properly deal with circular dependencies.
CommonJS has less noise, but all kind of rich tooling around like WebPack and Browserify. 
Bundling in SystemJS is as easy as concatenating files as it handles everything already internally by keeping a register of modules.

**"System" insanity warning -** lots of stuff packed into this term, from the original spec format, to the bundler, loading etc...

The (near) future will be different maybe and that might change how we think about bundling. HTTP/2, what bundler will be used in Angular 2 (CLI), ...

### Starter Kits for TypeScript

- Official
  - Plunker: [http://plnkr.co/edit/L1zthYrLbD7gkyhPeAew?p=preview](http://plnkr.co/edit/L1zthYrLbD7gkyhPeAew?p=preview)
  - NPM + SystemJS: [https://github.com/johnpapa/angular2-tour-of-heroes](https://github.com/johnpapa/angular2-tour-of-heroes)
- Minimal
  - Gulp + SystemJS: [https://github.com/pkozlowski-opensource/ng2-play](https://github.com/pkozlowski-opensource/ng2-play)
  - WebPack: [https://github.com/pkozlowski-opensource/ng2-webpack-play](https://github.com/pkozlowski-opensource/ng2-webpack-play)
- Community driven:
  - Gulp: [https://github.com/mgechev/angular2-seed](https://github.com/mgechev/angular2-seed)
  - WebPack: [https://github.com/angular-class/angular2-webpack-starter](https://github.com/angular-class/angular2-webpack-starter)

### Takeouts
- love ES6 modules
- current situation is messy
- Angular team is not yet ready to commit to a "loading ecosystem"
but they want to support "your" workflow

## Creating realtime apps with Angular 2 and Meteor

Speaker: [@UriGoldshtein](https://twitter.com/@UriGoldshtein)

The kind of connected client architecture is still missing. People decouple it through request/response patterns and REST.

- A connected client gets live updates from the server in real-time.
- There are no spinners. The "facebook likes" happen immediately.
- Want that kind of live updating experience on all devices (forget about spinners!)

Meteor is based on

- connected client architecture
- JavaScript everywhere
- Complete, Open, Platform

### Connected client architecture

Push live. On the usual architectures this would require a lot of work. Meteor builds this in with **Livequery**. It's like a $watch on the database.  
Then the **synched client data cache** takes care to propagate the changes from the Livequery to the application. This is done through publish/subscribe patterns. Communication happens through WebSockets. We should not care about network latency, just synch immediately.

### JavaScript everywhere

Meteor takes care of the server, mobile, web clients. This is done by combining isomorphic JavaScript and optimistic UI (like button scenario).  
When you click the Like button, changes update in the local cache and happen immediately, by executing the "addOne()" method. Through the synching approach, the same "addOne()" method is executed on the server as well. It'll update the data and then later update the local cache again.

### Complete, open, platform

Meteor is the infrastructure team you never had! it is the platform for JavaScript like the JVM is for Java or the CLR for .Net.

- [http://angular-meteor.com/](http://angular-meteor.com/)
- [http://blog.ionic.io/ionic-and-meteor/](http://blog.ionic.io/ionic-and-meteor/)

### Angular 2 Meteor package

deeply integrate into the change detection process of Angular 2. When Meteor gets the change, it notifies the Angular 2 change detection mechanism.  
Tutorial for having a full-stack Meteor+Angular tutorial, moving from Angular v1 to Angular v2 on [http://angular-meteor.com/](http://angular-meteor.com/).

### Takeouts

- Backend revolution is happening (like Angular did to jQuery, Meteor is to DB)
- What Rails did for REST, Meteor is doing for client connected architecture
- Being a full stack developer is much easier

## Using Web Workers for more responsive apps

Speaker: [@jteplitz](https://twitter.com/@jteplitz)  
Slides: [https://goo.gl/m6GNNu](https://goo.gl/m6GNNu)  
Starter pack: [https://github.com/jteplitz602/ng2_web_worker_starter_pack](https://github.com/jteplitz602/ng2_web_worker_starter_pack)

60FPS is what you strive for to keep things smooth. Means you have 16ms to do your stuff, but the browser needs about 8ms do update the DOM.  
Modern web applications require stuff like sound/image processing, running prediction algorithms etc...that's stuff that easily takes more than 8ms.

A WebWorker is a separate execution context, running in a totally different process. Those processes don't touch the DOM. Integration tests will be a lot faster.  
Don't just push heavy stuff to the server. May work for a webapp, but not for client apps. You pay for server CPU after all, not for the client ones! "It costs more to transmit a byte than to compute it". Moreover transmitting means more energy cost, thus reduced battery live (radio transmitters consume a lot of battery).

### Challenges

Challenges

- no DOM access
- no shared memory with UI
- serialization
- concurrency issues

Therefore the strategy is to..

- run everything in a WebWorker
- Let Angular care about updating the UI then

### What are compatible components

- no DOM Access
- full access to angular APIs
- can inject a renderer if really necessary
- ...

Communication between WebWorkers and UI happens through a Message Bus. MessageBroker helps dealing with that.

## Better concepts, less code in Angular 2

Speaker: [@victorsavkin](https://twitter.com/@victorsavkin), [@tbosch1009](https://twitter.com/@tbosch1009)

<iframe width="560" height="315" src="https://www.youtube.com/embed/4YmnbGoh49U" frameborder="0" allowfullscreen="allowfullscreen"> </iframe>

ng-content selects elements

Like when you have

```javascript
@Component({
    template: `
       <tabs>
           <tabs-title />
           <tabs-content>..</tabs-content>
           ...
       </tabs>`
})
```

You can select tabs with ng-content (it's a bit like transclusion)

```html
<div class="navbar">
    <ng-content select="tab-title" />
</div>
```

The parent component can get hold of child components through the 

```javascript
class Tabs {
    @ContentChildren(TabsTitle);
    tabsTitleCmps: QueryList
    
    ...
}
```

annotation. Note the QueryList object. Also, the difference between ContentChild and ViewChild?? Didn't get that...

**ContentChild**

*   AfterContentInit
*   AfterContentChecked

**View Children**

*   AfterViewInit
*   AfterViewChecked

Docs have more info: [](https://angular.io/docs/js/latest/api/core/ContentChild-var.html)https://angular.io/docs/js/latest/api/core/ContentChild-var.html

Angular 2 provides a concept called **TemplateRef**.

```javascript
@Component({
    selector: 'conf-talks',
    template: `
        <ul>
            <template ng-for [ng-for-of]="talks" 
                            ng-for-template="itemTmpl" />
            </template>
        </ul>
    `
})
class ConfTalks {
    @ContentChild(TemplateRef) itemTmpl;
}
```

### Takeoffs

*   NgContent
*   ContentChildren and ViewChildren annotations
*   TemplateRef
*   Well-defined Lifecycle

## ngDarwinAward

(cool talk about some things you shouldn't do. Just check out the vid)

## D3 in Angular

Speaker: [@timruffles](https://twitter.com/timruffles)

**d3** is something like jQuery + data. Hence its API is very jquery-ish.

Callbacks allow to change the appearance of elements based on the data.

```javascript
d3.selectAll('.bars')
    .style('background', function(){
        ...
    });
```

Basically sync DOM with data. There are 3 contexts

*   update
*   enter
*   exit

**Angular comes into play**: `d3.angularize()`.

Invert the hierarchy. Use d3 to keep control and angular for the "easy" stuff.

---

## Building apps with Firebase and Angular 2

Features

*   real-time database (every DB is accessible by URL)
*   user authentication
*   static hosting

**Working with Angular 2**

Angular 2 is nearly directly integrating with Firebase

*   Zones - removes the need for digests
*   Observables - data can be directly streamed into them
*   Pipes

It gets as neat as:

*   <li *ng-for="#key of firebaseUrl | firebaseevent: 'child_added'">
*       ...
*   </li>

No code in the controller needed.

## Reactive Streams - RxJS in Depth

by Ben Lesh (from Netflix)

Project lead of RxJS Next: [](https://github.com/ReactiveX/RxJS)http[s://github.com/ReactiveX/RxJS](http://github.com/React)

**RxJS 5**

Community driven by Google, Netflix,...

Rewritten from ground-up with goals for

*   performance
*   improved debugging
*   ES7 observable spec alignment
*   better debugging support

Will be beta the next months or so...Mainly work on tests and docs. Api isn't going to change that much.

**Observables**

*   streams
*   subscribe/unsubscribe
*   ...

The only thing Promises make sense for is Ajax. But there's a problem. They are hardly cancellable which is often an issue when people quickly switch through different views where each is going to start some Ajax calls for loading data.

Observables can be cancelled: simply unsubscribe!

Creating an Observable is nearly identical as creating a Promise object. The moment subscribe is called, the Observable body is executed, not before (they're lazy).

Huge plus. Observables can simply be retried calling

*   myObservable.retry(3);

With promises that's doable but a bit more tricky.

**Operators**

"operations" that return Observables themselves. Observables work a bit differently when you pipe through different operators. Basically values are passed one by one rather then the entire data as the map function on an array would work like.

When the operations like filter/map are used (the traditional ones) they create intermediary data structures in memory which will need to be garbage collected. Observables instead process all of the values directly through the entire chain, one by one (don't use it for small arrays though, tends to be slower).

There are buffering strategies like buffer, throttle, debounce, sample.

**hot vs. cold observables**

By default "cold": when you subscribe, it sets up one producer for one consumer (for each consumer.

Calling .share() on it, there's one producer for all consumers.

**Multiplexed WebSocket**

Basically sending multiple messages over the same stream, so there's filtering going on.

**Bad**

*   "Zalgo" - functions that sometimes exec synch/asynch
*   Unbounded buffers (i.e. the zip operator)
*   Too many operators to remember

## Google Angular Team Panel

*

[](https://www.youtube.com/watch?v=Ar_bnvaz3nI&feature=youtu.be&t=8h24m36s)https://www.youtube.com/watch?v=Ar_bnvaz3nI&feature=youtu.be&t=8h24m36s

**What feature not present would you love to borrow and add to Angular?**

Being released.

**Widget libraries? Material, UI-Bootstrap?**

Angular material in early experimental phase. They're working with the UI-Bootstrap team for ng2 as well as with Telerik.

**ng-touch in Angular 2?**

doing some research currently.

**transclusion is now projection?**

Yep, it was to align with web standards spec. It's called "content projection" there.

**When will be the component router be available for ng1?**

Not yet ready. Going along with ng2. Within a week you should be able to use it in ng1 as well. Will be stable along with ng2's status.

**Why template strings rather than a pre-processor?**

...

**Will ng2 form controls be backported to ng1?**

Not yet convinced whether it's benefitial for ng1...still being discussed.

**Where is community help most needed?**

There's a GitHub label specific for that. (comunity-help)

**Internationalisation?**

Good progress by the end of the year.

**Release?**

p1 labeled bugs are those that need to be done before beta.

**Should I start using Angular 2 now?**

If you start going into production after Q1 next year...then it might be plausible. Core works quite well, but docs are still lacking and obviously there are bugs.

**Event Streams vs. traditional data approaches?**

Depends on the team...

**What is the plan for tidying up the need to list the components that exist in the template?**

It's to avoid bugs and errors. But they admit it's a bit bugging them as well.  The hope to solve it with tooling, like angular-cli.

## Useful Links and stuff..

*   Egghead Angular 2 fundamentals: [](https://egghead.io/series/angular-2-fundamentals)https://egghead.io/series/angular-2-fundamentals?af=fj2vsx
*   Building the Best Components: [](https://docs.google.com/presentation/d/10g3N69pRJezgpwCqttdDO7htYEAJRgKcLJ7wBpNPDyU/preview?slide=id.p)https://docs.google.com/presentation/d/10g3N69pRJezgpwCqttdDO7htYEAJRgKcLJ7wBpNPDyU/preview?slide=id.p
*   Slides for MMaterial DDesign session: [](http://g.co/ng/ac-material)[http://](https://t.co/5kxW8nirEJ)g.co/ng/ac-material 
*   [](https://github.com/rangle/batarangle)https://github.com/rangle/batarangle
*   Summary: [](http://www.michaelbromley.co.uk/blog/483/angularconnect-summary-and-analysis)http://www.michaelbromley.co.uk/blog/483/angularconnect-summary-and-analysis
