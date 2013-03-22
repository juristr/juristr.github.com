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

http://pwlodek.blogspot.it/2010/12/introduction-to-interceptingcatalog.html

    [Export(typeof(IGenericContractRegistry))]
    public class GenericContractRegistry : GenericContractRegistryBase
    {
        protected override void Initialize()
        {
            Register(typeof(IUndoRedoStack<>), typeof(UndoRedoStack<>));
            Register(typeof(IPublicUndoRedoStack<>), typeof(UndoRedoStack<>));
        }
    }

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

