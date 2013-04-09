---
layout: post
title: "MEF Part 3: Implementing Undo/Redo"
description: ""
category: bliki
tags: []
---

Intro...

This is the 2nd part in a series of MEF posts:

1. MEF Part 1: The Basics
1. MEF Part 2: Plugin Interactions
1. MEF Part 3: Plugin Interactions

## Ways of Implementing Undo/Redo

- Command Pattern
- Memento Pattern

### Generic Commands

    public class GenericCommand : ICommand
    {
        private Action execAction;
        private Action undoAction;

        public GenericCommand(Action execAction, Action undoAction)
        {
            this.execAction = execAction;
            this.undoAction = undoAction;
        }

        public void Execute()
        {
            execAction.Invoke();
        }

        public void Undo()
        {
            undoAction.Invoke();
        }

        public string Description
        {
            get { return "Generic Action"; }
        }
    }

Usage example

    private void buttonOk_Click(object sender, EventArgs e)
    {
        var text = textBoxValue.Text;

        if (!String.IsNullOrEmpty(text))
        {
            CommandHandler.Execute(
                new GenericCommand(
                    () =>
                    {
                        Values.Add(text);
                    },
                    () =>
                    {
                        Values.Remove(text);
                    }));
            textBoxValue.Text = "";
        }

        textBoxValue.Focus();
    }


## Considerations

- Limit stack size
- Undo multiple actions at once (return to a certain point in history)

## Open Generics Support

Open Generics mechanism is commonly supported among dependency injection containers and it is the ability to specify an "open generic"-dependencies which then gets resolved to a concrete dependency at runtime. Consider for instance the following definition of an interface for a repository:

    public interface IRepository<TItem> where TItem:new()
    {
        ...
    }

Of course the interface uses generics as I don't exactly know which kind of object it is going to operate upon. I then usually have a - again **generic** - implementation of such interface:

    public class Repository<TItem> : IRepository<TItem> where TItem : new()
    {
        ...
    }

In order to use such repository in MEF I'd like to import it, but this time as a **concrete** instance because I know which kind of repository I need. For instance

    public class MyOrderView
    {
        
        [Import]
        public IRepository<Order> OrderRepository { get; set; }

    }

As you can see, I specify an import of my generic `IRepository`, specifying this time however the concrete type of object my generic repository should operate upon. 

To make this work in MEF I can simply put the right export statement on the `Repository<TItem>` implementation:

    [Export(typeof(IRepository<>))]
    public class Repository<TItem> : IRepository<TItem> where TItem : new()
    { ... }

> **Note:** This works only starting from .Net 4.5 onwards. MEF does not have any support for open generics in the version that ships with .Net 4. See below on how to overcome this issue.

### Open Generics with MEF in .Net 4

As mentioned above, native support for open generics is only available starting from .Net 4.5. If for some reason your project can't upgrade (such stupid reasons exist from now and then), there is a workaround for this. On GitHub there is a project called **[MefContrib](https://github.com/MefContrib/MefContrib)** which allows you to hook in support, although it's not that comfortable.

**Step 1 is to get a reference to the MefContrib** project which can be fetched from NuGet. Simply type

    PM> Install-Package MefContrib

**Step 2 is to define a GenericContractRegistry** where you register all of the open generic types. For the example of our Repository type above this would look like

    [Export(typeof(IGenericContractRegistry))]
    public class GenericContractRegistry : GenericContractRegistryBase
    {
        protected override void Initialize()
        {
            Register(typeof(IRepository<>), typeof(Repository<>));
        }
    }

**Step 3 is to adjust your bootstrapper** accordingly. That means you need to adjust the creation of your MEF `CompositionContainer`. For example:

    var aggregateCatalog = new AggregateCatalog(new AssemblyCatalog(typeof(Program).Assembly));
    aggregateCatalog.Catalogs.Add(new TypeCatalog(typeof(GenericTypeRegistry)));

    var genericCatalog = new GenericCatalog(aggregateCatalog);

    var compositionContainer = new CompositionContainer(genericCatalog);

Note the registration of the GenericContractRegistry class from before and the `GenericCatalog` which takes the whole `AggregateCatalog` for then passing it to the `CompositionContainer`.

## Handling Context Switch
Consider the case where you have - say - two windows on your screen: win1 and win2. They are potentially part of different plugins, so they don't know each other. However, they both make use of the undo/redo functionality. What happens if a command in the history targets win1 and then there follow some commands of win2. If I now close win1 (assume that's possible). What should happen to that specific command in the history??

Let's have a look at how for instance Microsoft Excel handles this case. I'm opening a new Spreadsheet and in the first sheet I write some strings:

![](/blog/assets/imgs/mef-modular-arch/excelundo_1.png)

I switch to "Sheet2" and I add another couple of strings. If we now look at the undo stack we see all of the executed actions in it:

![](/blog/assets/imgs/mef-modular-arch/excelundo_2.png)

What's now interesting is what happens when I delete "Sheet1".

![](/blog/assets/imgs/mef-modular-arch/excelundo_3.png)

By again, looking at the stack, we see that the 1st executed action, namely the writing of "Hi there" in Sheet1 is no more present in the stack. It has been removed. That means our commands or actions need to somehow know their context or area within which they have been executed and moreover they need to be informed when that context is no more available.

## Recreatable UserControl Parts
When you create plugins that contribute to the UI you also want to be able to correctly handle their lifecycle, that is, to properly dispose them when the window is being closed or removed.

### ExportFactory

Having an import like

    [Import(typeof(ValueControl), RequiredCreationPolicy=CreationPolicy.NonShared)]
    public ExportFactory<ValueControl> View { get; set; }

..resulted in the following exception.

    The export 'WinFormsClientApplication.ValueModule.ValueControl (ContractName="WinFormsClientApplication.ValueModule.ValueControl")' is not assignable to type 'System.ComponentModel.Composition.ExportFactory`1[[WinFormsClientApplication.ValueModule.ValueControl, WinFormsClientApplication, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]'.

First of all, you need to make sure you registered the `ExportFactoryProvider`:

    mainCatalog = new AggregateCatalog(...);

    var exportFactoryProvider = new ExportFactoryProvider();
    container = new CompositionContainer(mainCatalog, exportFactoryProvider);
    exportFactoryProvider.SourceProvider = container;

Furthermore it seems like specifying the concrete type in the `[Import]` doesn't work and as such the above mentioned import declaration has to be changed to the following
    
    [Import]
    public ExportFactory<ValueControl> View { get; set; }

