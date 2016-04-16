---
layout: post_new
title: "Debugging Angular 2 Applications from the Console"
lead: "Learn how to access useful information from your Angular 2 components right from your browser's console"
postimg: "/blog/assets/imgs/ng2-console-debugging/debugging-ng2-apps.png"
category: angular2
tags: [ "JavaScript", "Angular" ]
reposts: ["https://dzone.com/articles/learning-angular-2-creating-a-tabs-component"]
---

<div class="article-intro">
    There have been some quite useful articles for <a href="http://blog.ionic.io/angularjs-console/" target="_blank">how to debug Angular 1.x applications from the browser's console</a>. But how can we achieve the same in Angular 2? Is there even a way? Let's see.
</div>

{% include postads %}

I always found it quite neat how to debug my Angular 1.x applications directly from my browser's console. Take Chrome's devtools for instance. You can open the Elements tab and click on your Angular 2 component. The nice thing about the Chrome devtools is that it'll keep a reference to the selected DOM node in the variable `$0` which you can then directly access from the console.

<figure>
    <a href="/blog/assets/imgs/ng2-console-debugging/devtools-elements-tab.gif" class="image--zoom">
        <img src="/blog/assets/imgs/ng2-console-debugging/devtools-elements-tab.gif" />
    </a>
</figure>

From there in Angular 1.x you can simply write..

```
> angular.element($0).scope()
```

..to access the `$scope` of that directive and interact with that object accordingly. Similarly you can get hold of the dependency injector for fetching services etc. But more on that [in this article on the official Ionic blog](http://blog.ionic.io/angularjs-console/).

## Enabling/Disabling Debugging

> **Note**, if you're using Angular 2 beta.02 or lower, you have to explicitly activate debugging by importing the `ELEMENT_PROBE_PROVIDERS` from `angular2/platform/browser` and pass it as provider to your `bootstrap` function.

By default debugging is enabled in Angular 2 applications. In fact when you run your app you might see a log in your console saying something like:

_"Angular 2 is running in the development mode. Call enableProdMode() to enable the production mode."_

Hence, whenever you deploy your application in a production environment you should **disable debugging information** and switch into **production mode**. You can do it like this:

```
...
import { enableProdMode } from 'angular2/core';

// enable production mode and thus disable debugging information
enableProdMode();

bootstrap(HelloAngular2, [])
    .catch(err => console.error(err));
```

> Note, the same **[holds for your Angular 1.x apps](/blog/2015/12/perf-startup-ng1/)**.

## Inspect the Component state

The interesting part is to inspect the current state of our rendered component. We can do this by again selecting our component in the elements tab and then executing the following in the console.

```
> ng.probe($0)
```

Expand the result object in the devtools and navigate through it. There are are a couple of interesting things being exposed to you. Most interestingly, we can get a **reference to the instance of our component class** using..

```
> ng.probe($0).componentInstance
```

Once we have that instance, we can interact with it, like changing the name property in the case of our simple hello world component example.

<figure>
    <a href="/blog/assets/imgs/ng2-console-debugging/debug-componentinstance.gif" class="image--zoom">
        <img src="/blog/assets/imgs/ng2-console-debugging/debug-componentinstance.gif" />
    </a>
</figure>

Strange enough, the UI won't reflect our changes. Well remember `$digest()` :wink:. Angular 2 has a similar, but more advanced mechanism. Anyway, without going into the details, we need to **invoke that change detector**.

I dug through the [Angular source](https://github.com/angular/angular) and this was the best way I could come up with to activate the change detection mechanism:

```
> ng.probe($0).injector._depProvider.componentView.changeDetector.detectChanges()
```

Not sure if you noticed, but we invoked the change detector on our selected Angular 2 component (`$0`) and not globally. This is because **change detection is hierarchical**, hence, **every Angular 2 component get its own change detector**. [Victor Savkin](https://twitter.com/victorsavkin) has written an [awesome post on this](http://victorsavkin.com/post/110170125256/change-detection-in-angular-2).

Here's the result of executing the change detector:

<figure>
    <a href="/blog/assets/imgs/ng2-console-debugging/debug-detectchanges.gif" class="image--zoom">
        <img src="/blog/assets/imgs/ng2-console-debugging/debug-detectchanges.gif" />
    </a>
</figure>

## Batarangle

If you're not the console type of guy, you may appreciate the visual debugging tool [Batarangle from Rangle.io](https://github.com/rangle/batarangle) :smiley:.

## Conclusion

That's it. I'll try to keep this article updated and even extend it with further debugging possibilities as Angular 2 evolves towards its final release. Also, if you have any suggestions/improvements, as always, comment!

Btw, you can use my [Angular 2 playground setup](https://github.com/juristr/angular2-playground) to test out these features.

---

**Related articles**

- [Change detection in Angular 2](http://victorsavkin.com/post/110170125256/change-detection-in-angular-2)
- [Change and its detection in JavaScript frameworks](http://teropa.info/blog/2015/03/02/change-and-its-detection-in-javascript-frameworks.html)
- [Angular 2 Change Detection Explained](http://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html)
