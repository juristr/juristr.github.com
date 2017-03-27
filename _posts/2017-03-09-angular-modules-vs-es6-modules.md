---
layout: post_new
title: "Angular Modules vs ES6 Modules"
lead: "Angular Modules are DIFFERENT from ES6 Modules, here's why"
postimg: "/blog/assets/imgs/angular-modules/postbg.png"
tags: [ "Angular"]
---

<div class="article-intro">
	I often see people being confused when it comes to understanding Angular Modules vs. ES6 Modules. This happens especially for newcomers which enter the JavaScript and front-end development ecosystem and immediately get confronted with both of them. Here’s a short article that hopefully sheds some light on the matter.
</div>

{% include postads %}

{% assign message = "Contents are based on Angular version 2+." %}
{% include warn-notice.html %}

To start straight away: **Angular Modules are different from ES6 Modules!**

![](/blog/assets/imgs/angular-modules/ngmodules-diff-es6mod.png)

{% include toc.html %}

## JavaScript Modules Primer

I don’t like to repeat the same content, so if you want to get a exhaustive introduction of what JavaScript modules are about, I highly recommend reading the article on “[A 10 minute primer to JavaScript modules, module formats, module loaders and module bundlers](http://www.jvandemo.com/a-10-minute-primer-to-javascript-modules-module-formats-module-loaders-and-module-bundlers/)” by my friend [Jurgen Van de Moere](https://twitter.com/jvandemo).

**In short we need JavaScript modules…**

- …to avoid leaking code to the global namespace and thus to avoid naming collisions
- …to encapsulate code; to hide implementation details and control what gets exposed to the “outside”
- …to structure our applications (we cannot use a single files)
- …to manage dependencies
- …to reuse code

Prior to ES2015 (ES6) there was no module system in the standard of the ECMAScript language. What we had (and still have) instead, are different implementation patterns for “simulating” a module system: there are the simple IIFEs (Immediately Invoked Function Expression), UMD (Universal Module Definition), AMD (Asynchronous Module Definition) and CommonJS. 
ES6 finally introduced a standard way of defining modules. This example illustrates a simple ES6 module, *importing* a dependency `math-utils` , specifically the `sqrt` function of that `math-utils` library. It then defines a couple of math operations and exports the `addition`  and `multiplication` :

```javascript
import { sqrt } from 'math-utils';

const addition = (val1, val2) => val1 + val2;
const subtraction = (val1, val2) => val1 - val2;
const multiplication = (val1, val2) => val1 * val2;
const calculateSquareRoot = (val) => sqrt(val);

export { addition, multiplication }
```

In short, **an ES6 module is represented by a single file, having different imports and exports.**

## What are Angular Modules?

Angular modules represent a core concept and play a fundamental role in structuring Angular applications.

An Angular Module groups together a set of Angular artifacts, namely components, directives, pipes and services that are part of that very same module. That said, it represents a logical grouping into what can be called a **feature area** of our application (i.e. contacts module, admin module,…). Moreover, an Angular Module also defines dependencies to other modules, that is, what other modules it needs to import and in turn which components, directives or pipes get exported.

```javascript
@NgModule({
    imports: [ BrowserModule, HttpModule, FormsModule ],
    declarations: [ PersonComponent, ContactComponent, ContactListComponent ],
    providers: [ PersonService, ContactService ],
    exports: [ ContactListComponent, ContactComponent ]
})
export class ContactModule {}
```

In this example, we see imports such as the `FormsModule` whose exports can now be used within our `ContactModule` . Moreover, the module declares what components it uses in the `declarations`  property and the services in the according `providers` property.  As you can see from the `exports` property, we only export certain components which are then available to other consumers of our `ContactModule` .


> **Angular modules are a logical grouping of multiple** **symbols (components, services,…)**

Also, reusing components, services,… is done at the module level. **We don’t directly import a single component** from another module such as the `people.component`  in the following example.

![](/blog/assets/imgs/angular-modules/wrong-import.png)


Rather, we have another module, say the `PeopleModule` , which already imports its own `PersonComponent` , declares it and also **exports it** s.t. it can then be used by other modules. Consequently, in our `ContactsModule` we simply import the `PersonModule` and can then use the exported `PersonComponent` within the components of our `ContactsModule` .

![](/blog/assets/imgs/angular-modules/explain-import-module.png)

Using a component from another imported Angular module (i.e. the `PersonComponent` from our `PersonModule`) is as simple as using it in the template of one of the components that is part of the importing module. In our example the `ContactsModule`:

```javascript
@Component({
    selector: 'contact-detail',
    template: `
        ...
        <person [data]="somePerson"></person>
    `
})
export class ContactDetailComponent { ... }
```

The following shows an example of a modular application with a “shared” and “contacts” module. Internally, the Contacts Module contains other artifacts such as person components.

![](/blog/assets/imgs/angular-modules/module-structure-example.png)


As such, Angular Modules can be seen as the **“unit of reusability”** within our application. As we have seen, they define their members, what gets imported and what gets exported. It is also best practice to encapsulate the module specific application routes within the module itself. Hence, ideally, when we want to get rid of a feature of our application, say the contacts feature, we could simply delete the according Angular Module, with a minimum impact on the other areas of the application.

<blockquote class="emphasized">
    "Angular Modules are the unit of reusability"
</blockquote>

We usually tend to structure our application into feature modules (contacts module, orders module, admin module) and “transversal” modules containing shared components and services that are used by other feature modules throughout our application.

**Could I simply have one single application module and don’t care?**  
Technically you can, but it’s definitely not recommended as this most probably results in a poor application structure, is bad for the modularity of your application and you also regret to some very powerful features such as lazy loading which is done at the Angular module level. All in all, **don’t do it**, it completely messes up your application architecture :smiley:. 

To summarize, **Angular modules are a means to logically group a set of symbols (components, services,…). An Angular module usually comprises an entire folder.**

*Want to learn more about NgModule? Check out the* [*FAQ page on the official Angular documentation*](https://angular.io/docs/ts/latest/cookbook/ngmodule-faq.html)*.*

## Conclusion

To conclude:

- ES6 modules represent a single file
- The ES6 module syntax is a standardized construct of the ECMAScript language specification

On the other side:

- Angular Modules are an Angular specific construct. 
- Angular Modules logically group different Angular artefacts such as components, pipes, directives,…
- Angular Modules in the form of the `@NgModule`  decorator provide metadata to the Angular compiler which in turn can better “reason about our application” structure and thus introduce optimizations
- Important features such as lazy loading are done at the Angular Module level

---

_Thanks a lot to [Wassim Chegham (@manekinekko)](https://twitter.com/manekinekko) for reviewing this article!_
