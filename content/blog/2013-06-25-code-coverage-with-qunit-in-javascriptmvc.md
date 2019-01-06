---
title: Code Coverage with QUnit in JavaScriptMVC
description: ''
show_img_in_detail: false
category: null
categories:
  - testing
  - JavaScript
date: 2013-06-25T00:00:00.000Z
comments: true
url: /blog/2013/06/code-coverage-with-qunit-in-javascriptmvc
type: post
image: /blog/assets/imgs/funcunit_coverage_overview.png
---

Beside giving you an immediate feedback, unit tests are extremely useful as a regression test suite. They basically build a safety net around your code, giving you the freedom to apply changes without breaking anything existing. The only question to remain is on how much you can actually trust them.

It is quite obvious that if your tests cover 20% of your code, you should also only trust them 20%. With such a percentage you definitely cannot have confidence that you didn't break anything if after your refactoring all of the tests still pass. 

Here is where code coverage analysis comes in handy. There a couple of tools out there, which get you the percentage of code that is being covered by your tests. [Eclemma](http://www.eclemma.org/) is one example that nicely integrates into Eclipse for Java. I've already written a post about that a couple of years ago about ["Can You Trust Your Tests"](http://localhost:4000/blog/2010/05/can-you-trust-your-tests/).

Similar tools do also exist for JavaScript, but it's a little more complicated as your code runs directly in a browser.

## Code Coverage Analysis with FuncUnit

With FuncUnit it turns out to be quite simple, though. FuncUnit is the automated testing "module" of JavaScriptMVC.

> FuncUnit is a free, open source, web application testing framework that focuses on making tests fun and enjoyable.<cite><a href="http://funcunit.com/">funcunit.com</a></cite>

It is based on QUnit, adding further functionalities such as functional (UI) testing (i.e. drag & drop) based on Selenium, just to mention one. Among these, FuncUnit is also capable to perform code coverage analysis, using [Cobertura](http://cobertura.sourceforge.net/).

## How does it work?

It is quite simple. Frankly, you just have to write a plain normal QUnit test case. Assume we just created a JavaScriptMVC widget called "user" which we want to unit test. Create a folder "tests" within the widget's folder with the following files in it:

- index.html
- tests.js
- user_test.js

**index.html**  
The `index.html` does the QUnit environment setup such as loading the according stylesheet, the tests script and setting up the HTML skeleton.

    <html>
    <head>
        <link rel="stylesheet" type="text/css" href="../../../funcunit/qunit/qunit.css" />
        <style>
            body { margin: 0px; padding: 0px; }
        </style>
        <script type='text/javascript' src='../../../steal/steal.js?siag/user/tests'></script>
    </head>
    <body>
        <h1 id="qunit-header">User Tests</h1>
        <h2 id="qunit-banner">
        </h2>
        <div id="qunit-testrunner-toolbar">
        </div>
        <h2 id="qunit-userAgent">
        </h2>
        <div id="test-content">
        </div>
        <ol id="qunit-tests">
        </ol>
        <div id="qunit-test-area">
        </div>
        <div id="qunit-fixture">
        </div>
    </body>
    </html>

**tests.js**  
The `tests.js` file uses steal (JavaScriptMVC's dependency management module) to load up FuncUnit and [SinonJS](http://sinonjs.org/) in this case which is a JavaScript mocking library. Furthermore it loads the `user_test.js` file which contains the actual unit tests for the `user.js` file.

    steal(
        'funcunit/qunit',
        'siag/testing/resources/sinon.js')
    .then(
        'siag/testing/resources/sinon.qunit.js',
        './user_test.js',
        function($){

            if(steal.isRhino){
                steal('funcunit/qunit/env');
            }
        });

**user_test.js**  
Finally, the `user_test.js` contains the actual QUnit test code. I'm not going into the details of that test as that would be subject of another blog post. What the file contains is to again, first load the actual file to be tested by using steal and then to write down the test cases, just as you normally would.

    steal(
        'siag/user',
    function () {

        module('User Tests');

        test('Should correctly load the user from /user/current', 1, function(){
            //...
        });

        ...
    });

Open `index.html` in your browser. You should see your tests running in the typical QUnit interface. But notice the small **coverage** checkbox in the QUnit title. This has been added by FuncUnit.

![](/blog/assets/imgs/funcunit_coverage_setting.png)

If you check it and re-run your tests, you should get a tabbed page, the first containing (just as normally) the QUnit tests and the second a nicely formatted report with the corresponding code coverages:

![](/blog/assets/imgs/funcunit_coverage_overview.png)

Even better, if you click on one of the files, you get its source code visualized and (just like Eclemma does) the covered and uncovered parts are highlighted corrispondingly.

![](/blog/assets/imgs/funcunit_coverage_detailed.png)

Awesome and extremely easy.
