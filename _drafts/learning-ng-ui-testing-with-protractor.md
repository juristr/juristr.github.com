---
layout: articles-post
title: "Learning Angular: Protractor Recipes"
subtitle: "..."
headline: "asdfasdfasdf"
description: "asdfasdfasdfasdf"
show_img_in_detail: true
tags: ["JavaScript", "Angular.js", "learning-ng", "testing"]
---

Intro here...

{% include ng-series.html %}

## Setup

The official site on [angular.github.io/protractor](https://angular.github.io/protractor/#/protractor-setup) has some good setup guides. Follow those.

My configuration

```javascript
// config.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    'specs/test.js'
    // 'specs/demo.js'
  ],

  // http://stackoverflow.com/a/25646982/50109
  onPrepare: function(){
    browser.manage().window().setSize(1600, 1200);
    browser.manage().timeouts().pageLoadTimeout(40000);
    browser.manage().timeouts().implicitlyWait(25000);

    // browser.ignoreSynchronization = true;

    // add jasmine spec reporter
    var JasmineSpecReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new JasmineSpecReporter({displayStacktrace: true}));
  },

  jasmineNodeOpts: {
    showColors: true
  }
};
```

## Prerequisites

Before going ahead with the recipes, you should make yourself familiar with some of the fundamental concepts of Protractor (and Selenium Webdriver in general), like

- browser
- Locators
- ...

## Recipes

### Verify whether a directive/element is present

**SUT**

```html
<maps-map></maps-map>
```

**Test**

```javascript
it('should have the map', function(){
  expect(browser.isElementPresent(by.css('maps-map'))).toBeTruthy();
});
```

### Verify whether a repeater contains a data-bound item with name...

**SUT**

```html
<a ng-repeat="context in contexts">
    {{ context.name }}
</a>
```

**Test**

```javascript
it('should have the context Cadastre', function(){
  var data = element.all(by.repeater('context in contexts').column('context.name'));
  data.getText().then(function(text){
    expect(text).toContain('Cadastre');
  });
});
```

Note that `.getText()` returns a promise. Protractor `expect` handles that for you s.t. you can shorten the above to

```javascript
it('should have the context Cadastre', function(){
  var data = element.all(by.repeater('context in contexts').column('context.name'));
  expect(data.getText()).toContain('Cadastre');
});
```

## Common errors

### Element is not clickable at point (x,y)

When you get something like this as an error:

```
UnknownError: unknown error: Element is not clickable at point (722, 34). Other element would receive the click: ...
```

..then it's most often caused by some fading animation which didn't yet finish and thus, your click wasn't properly executed on the element on which you wanted it to happen. The typical example is a modal popup which - when closed - fades away. Your click finishes on the `model-backdrop` instead of the button on your page.

There's an issue on GitHub that explains it: [Element is not clickable at point(x,y) when other non-Angular elements overlaps](https://github.com/angular/protractor/issues/1555). The **solution** is to use `protractor.ExpectedConditions.elementToBeClickable` function.

Take this example. When the page loads, the popup is opened automatically. What I want to test is the functionality that permits the user to open it manually. Thus, I'd like to automate the closing and reopening of the modal window:

![](/blog/assets/imgs/protractor/elementnotclickable.gif)

The test looks like the following

```javascript
describe('Context selection', function(){

  beforeEach(function(){
    // dismiss the modal dialog
    element(by.css('.modal')).click();
  });

  it('should properly activate the context selection dialog', function() {
    var button = element(by.css('[ng-click="vm.showContextSelection()"]'));

    var isClickable = protractor.ExpectedConditions.elementToBeClickable(button);
    browser.wait(isClickable, 5000);
    button.click();

    // check whether the modal opened again
    expect(browser.isElementPresent(by.css('.modal-content'))).toBeTruthy();
  });
});
```


## Useful links and resources

-  [Screenshot reporter](https://github.com/swissmanu/protractor-screenshot-reporter) - can be configured to take screenshots for failing tests