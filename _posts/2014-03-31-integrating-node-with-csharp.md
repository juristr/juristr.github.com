---
layout: post
title: "Integrating Node.js with a C# dll"
show_img_in_detail: false
coverimage: false
tags: [".Net", "Node.js", "JavaScript"]
reposts: ["http://java.dzone.com/articles/integrating-nodejs-c-dll", "http://www.webcodegeeks.com/javascript/node-js/integrating-node-js-with-a-c-dll/"]
---

Recently I had to integrate a Node.js based server application with a C# DLL. Our software (a web-app) offers the possibility to execute payments over a POS terminal. This latter one is controllable through a dedicated DLL which exposes interfaces like `ExecutePayment(operation, amount)` and so on. As I mentioned, there is the Node.js server that somehow exposes the functionality of the POS (and some more) as a REST api. (The choice for using Node.js had specific reasons which I wouldn't want to outline right now).

When you start with such an undertaking, then there are different possibilities. One is to use **Edge.js** which allows you to embed, reference and invoke .Net CLR objects from within your Node.js based applications. Something like this:

    var hello = require('edge').func({
        assemblyFile: 'My.Edge.Samples.dll',
        typeName: 'Samples.FooBar.MyType',
        methodName: 'MyMethod' // Func<object,Task<object>>
    }});

    hello('Node.js', function (error, result) { ... });

Edge is a very interesting project and has a lot of potential. In fact, I just tried it quickly with a simple DLL and it worked right away. However, when using it from my Node app within [node-webkit](https://github.com/rogerwang/node-webkit) it didn't work. I'm not yet sure whether it was related to node-webkit or the POS DLL itself (because it might be COM exposed etc..). However, if you need simple integrations this might work well for you.

## Process invocation

A second option that came to my mind is to design the DLL as a self-contained process and to invoke it using Node.js's [process api](http://nodejs.org/api/process.html). Turns out this is quite simple. Just prepare your C# application to read it's invocation arguments s.t. you can do something like..

    IntegrationConsole.exe ExecutePayment 1 100

..to "ExecutePayment" with operation number 1 and an amount of 1€. The C# console application needs to communicate it's return values to the STDOUT (you may use JSON for creating a more structured information exchange protocol format).  
Once you have this, you can simply execute the process from Node.js and read the according STDOUT:

    var process = require('child_process');
    ...
    process.exec(execCmd,
        function (error, stdout, stderr) {
            var result = stdout;
    
            ...

            writeToResponse(stdout);
        });

`execCmd` is holds the instructions required to launch the EXE with the required invocation arguments.

In this approach you execute the process, it does its job, returns the response and terminates. If for some reason however, you need to keep the process running for having a longer, kind of more interactive communication between the two components, you can communicate through the STDIN/STDOUT of the process.  
Your C# console application starts and listens on the STDIN..

    static void Main(string[] args)
    {
        ...
        string line;
        do
        {
            line = Console.ReadLine();
            try
            {
                // do something meaningful with the input
                // write to STDOUT to respond to the caller
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        } while (line != null);
    }

On the Node.js side you do not `exec` your process, but instead you `spawn` a child process.

    var spawn = require('child_process').spawn;
    ...
    var posProc = spawn('IntegrationConsole.exe', ['ExecutePayment', 1, 100]);

For getting the responses, you simply register on the STDOUT of the process..

    posProc.stdout.once('data', function (data) {
            // write it back on the response object
            writeToResponse(data);
        });

..and you may also want to listen for when the process dies to eventually perform some cleanup.

    posProc.on('exit', function (code) {
            ...
        });

Writing to the STDIN of the process is simple as well:

    posProc.stdin.setEncoding = 'utf-8';
    posProc.stdin.write('...');

In this way you have a more interactive, "stateful communication", where you send a command to the EXE which responds (STDOUT) and based on the response you again react and send some other command (STDIN).

## Embedding this in the Request/Response pattern

To expose everything as a REST api (on Node), you need to pay some attention on the registration of the event handlers on STDOUT. Suppose you do something like

    app.post('/someEndpoint', function(req, res){
        posProc = spawn('IntegrationConsole.exe', ['ExecutePayment', 1, 100]);
        ...
        posProc.stdout.on('data', function(data){
            // return the result of this execution
            // on the response
        });
    }),

    app.post('/someOtherEndpoint', function(req, res){
        ...
        posProc.stdout.on('data', function(data){
            // return the result of this execution
            // on the response
        });

        // write to the stdin of the before created child process
        posProc.stdin.setEncoding = 'utf-8';
        posProc.stdin.write('...');
    });

I excluded proper edge case handling like what happens if your process died before etc.. but the key point here is that **you cannot register your events** by using `on(..)`, as otherwise you'll end up having multiple `data` event handlers on the `stdout`. So you can either register and de-register the event by using the `removeListener('event name', callback)` syntax or use the more handy `once` registration  mechanism (as I did already in my samples at the beginning of the article):

    posProc.stdout.once('data', function (data) {
                // write it back on the response object
                writeToResponse(data);
            });

