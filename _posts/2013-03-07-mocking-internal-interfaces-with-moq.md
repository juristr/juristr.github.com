---
layout: post
title: "Mocking Internal Interfaces with Moq"
description: ""
category:
tags: [Unit Testing]
reposts: ["http://dotnet.dzone.com/articles/mocking-internal-interfaces"]
---

When creating some Class Library you should pay attention to the visibility of its members and have a clear vision of what you'd like to expose to its users and what on the other side should be hidden. When writing unit tests against such assemblies however, you obviously want to test everything, from the internal members to the externally exposes parts.

Assume you have a class library named **Base** containing the following classes and interfaces

- `ICommandHandler` - which is a publicly exposed interface
- `CommandHandler` - basically its concrete implementation
- `IUndoRedoStack<T>` - an interface that is used only internally
- `UndoRedoStack<T>` - its concrete implementation

Note that I'm programming exclusively against interaces as that's a major requirement for being able to create the necessary isolation for testing each component on its own.

## Testing Classes with Internal Visibility

Lets take a closer look at the `CommandHandler` class

    class CommandHandler : ICommandHandler
    {
        //...
    }

When creating a test for the `CommandHandler` class you would proceed as follows

    [TestClass]
    public class CommandHandlerTest
    {
        
        private CommandHandler commandHandler;

        [TestInitialize]
        public void Setup()
        {
            commandHandler = new CommandHandler();
        }

        [TestCleanup]
        public void Teardown()
        {
            commandHandler = null;
        }


        [TestMethod]
        publiic void ShouldExecuteAGivenCommand()
        {
            //the test content
        }
    }

When you execute such test, it won't compile however. A best practice is to place the tests in a separate DLL (I usually name it like `Base.UnitTests` if the tested assembly is called `Base`) and as such, `CommandHandler` won't be visible as it has been defined to only have internal visibility. In [a previous blog post](http://juristr.com/blog/2013/01/aspnet-mvc-action-methods-testing-against-anonymous-return-types/) I already explained on how to overcome this issue, namely by specifying the `InternalsVisibleTo` attribute in the tested assembly. Check out that blog post for more details.

## Mocking Interfaces with Internal Visibility using Moq

Now, `CommandHandler` has a dependency on `IUndoRedoStack<T>`

    class CommandHandler : ICommandHandler
    {
        public CommandHandler(IUndoRedoStack<ICommand> undoRedoStack) 
        {
            //...
        }
    }

The `CommandHandler` has an `Execute(command)` method and suppose we'd like to test the fact that when calling it with a given `ICommand` object, that specific object gets added to the `undoRedoStack`. We would write

<pre class="linenums">
    [TestInitialize]
    public void Setup()
    {
        mockUndoRedo = new Mock&lt;IUndoRedoStack&lt;ICommand&lt;&lt;();
        handler = new CommandHandler(mockUndoRedo.Object);
    }

    [TestMethod]
    public void ShouldAddTheCommandToTheUndoStack()
    {
        //arrange
        var myCommand = new MyTestCommand();

        //act
        handler.Execute(myCommand);

        //assert
        mockUndoRedo.Verify(x =&lt; x.AddItem(myCommand), Times.Once(), "The command should have been added to the undo stack");
    }
</pre>

When executing the test, it fails with

> Message: Initialization method Base.UnitTests.Command.CommandHandlerTest thre exception.  
> Castle.DynamicProxy.Generators.GeneratorException:  
> Castle.DynamicProxy.Generators.GeneratorException: Type Base.Command.IUndoRedoStack[[Base.Command.ICommand, Base, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]] is not public. Can not create proxy for types that are not accessible.

The problem is the same, the [Moq library](https://www.nuget.org/packages/Moq) I use for stubbing here, has no visibility on the internal member types and as such we need to add another `InternalsVisibleTo` attribute specifically for Moq. The most intuitive thing to do would be

    [assembly: InternalsVisibleTo("Moq")]

but unfortunately that doesn't work. Instead you need to add

    [assembly:InternalsVisibleTo("DynamicProxyGenAssembly2")]

which is used internally by Moq to generate proxy classes. Note, as already described by this <a href="http://sonofpirate.blogspot.it/2009/09/my-first-foray-into-unit-testing-with.html" rel="nofollow">blog post</a> this only works if your assembly is not strongly-named, otherwise you have to include the assembly's PublicKey as well.

    [assembly: InternalsVisibleTo("DynamicProxyGenAssembly2, PublicKey=...")]