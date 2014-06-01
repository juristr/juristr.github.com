---
layout: post
title: "MEF Part 1: The Basics"
description: ""
category: article
tags: []
---

The Managed Extensibility Framework (MEF) is a composition layer for .NET that allows for creating modular applications. This article is going to cover the very basics of developing a application that can be dynamically extended with plugins by using MEF.

From the [MEF homepage](http://mef.codeplex.com/):

> The Managed Extensibility Framework (MEF) is a composition layer for .NET that improves the flexibility, maintainability and testability of large applications. MEF can be used for third-party plugin extensibility, or it can bring the benefits of a loosely-coupled plugin-like architecture to regular applications. <cite><a href="http://mef.codeplex.com">http://mef.codeplex.com</a></cite>

## What is MEF?
That's probably the first question you're posing to yourself, at least I did. Or how does it compare with MAF (Managed AddIn Framework)? Is it a IoC (Inversion of Control Container)?
These are typical questions I had. Here's a a summary which I extracted from various resources I listed below, trying to clarify these kind of issues.

**What is MEF?**  
MEF is a technology for facilitating the creation of modular applications that can be arbitrarily extended. To enable this, MEF has a build-in discovery process for finding extensions. It is a "plugin-architecture" but goes a little bit further. It is a compositional engine. In traditional plugin systems there tends to be a model where there is a host and extensions which are loaded (typically) through a configuration file. In MEF (due to its compositional nature), extensions can be discovered dynamically and furthermore (what's important), they'll get their dependencies injected by MEF. That allows to even extend an extension itself and it is where the concept of dependency injection comes in.

**Is MEF an IoC Container then?**  
Kind of, I'd say. MEF was designed to solve a specific set of problems, namely to getting apps to be extensible. Glenn Block (former PM on MEF) explained it this way:

> [...] So again, taking it to a higher leel, it's about you use MEF to really manage a set of unknown things, you use IoC Containers to manage a set of known things. <cite><a href="http://www.hanselminutes.com/148/mef-managed-extensibility-framework-with-glenn-block" rel="nofollow">http://www.hanselminutes.com/148/mef-managed-extensibility-framework-with-glenn-block</a></cite>

The point here is that in a typical IoC Container you have some registrations, like

    builder.RegisterType<TaskController>().As<ITaskController>();

and then you request that dependency on some other place in your system. So you **know very well** what your `ITaskController` will be and where its concrete instance will be.  
MEF can do this equally, with the difference however, that you potentially **don't know where the concrete instance lives** as it might be added dynamically to your system through an extension.

**What's the difference between MEF and MAF?**  
MAF (Managed AddIn Framework) is more about focusing on isolation, security and versioning. It appears to be more difficult to use but has advantages of using different app domains to protect your client and to handle versioning between client and host.
MEF on the other side is more around the concept of composition and simplicity. Another thing that might be quite important from a concept point of view is that MEF (to the contrary of MAF) doesn't clearly distinguish between host and plugin or extension. A host may pull in extension but even extensions themselves can import other extensions.

**Where can I use MEF?**  
IMHO, one of the advantages of MEF is that it is (since .NET 4) already part of the .NET framework under the System.ComponentModel.Composition.dll. Being integrated at a very low level, your can use it in whatever application you like, even when developing a framework. As such it is not coupled to a specific technology (like ASP or WPF etc..).

### Introductory Resources
Here are some resources that might help getting started with MEF:

- [MEF MSDN Documentation](http://msdn.microsoft.com/en-us/library/dd460648.aspx)
- [StackOverflow: Choosing Between MEF and MAF](http://stackoverflow.com/questions/835182/choosing-between-mef-and-maf-system-addin)
- [Blog Post: MEF and other extensibility options in .Net; Includes videos at the end](http://emcpadden.wordpress.com/2008/12/07/managed-extensibility-framework-and-others/)
- [Blog Post: MAF and MEF](http://kentb.blogspot.it/2009/02/maf-and-mef.html)
- [Hanselminutes: Managed Extensibility Framework with Glenn Block](http://www.hanselminutes.com/148/mef-managed-extensibility-framework-with-glenn-block)

## MEF Basics

### Export and Import

MEF is based on the concept of exports and imports. Speaking in the language of other available dependency injection containers an "export" would correspond to the definition of a dependency while an "import" corresponds to a request of a dependency.

So to define an export, we can write it as follows:

    [Export(typeof(IAction))]
    public class SaveAction : IAction
    {

        public string Name { get; set; }

    }

...and to request such dependency in any other component we use the `[Import]` attribute like

    public class SomeOtherClass
    {

        [Import]
        public IAction MyAction { get; set; }

    }

What is important to know is that for **importing a list of dependencies** the `ImportMany` attribute has to be used like

    [ImportMany]
    public IEnumerable<IAction> Actions { get; set; }

>  An ordinary ImportAttribute attribute is filled by one and only one ExportAttribute. If more than one is available, the composition engine produces an error. <cite>From the official MSDN docs</cite>

### Catalogs

[Catalogs](http://mef.codeplex.com/wikipage?title=Using%20Catalogs) allow for the dynamic discovery of parts which are basically compontents registered with a `[Export]` tag. There are different kind of catalogs with diverse capabilities:

- AssemblyCatalog - _for discovering exports in a given assembly_
- DirectoryCatalog - _for scanning assemblies in a given directory for exposed exports_
- (many more...)
- AggregateCatalog - _for combining multiple different catalogs_

## Loading Plugins - A basic sample app

Lets create a very dummy example of a WinForms app which loads some visual plugin parts. So the first step is to create the main WinForms app, called "ClientApplication" with a main window: "App.cs"

![](/blog/assets/imgs/mef-modular-arch/appwindowbasic.png)

Nothing exciting so far.

### Defining the plugin

The goal is to create some visual parts which can be added to the application dynamically to our main WinForms window. So we need some kind of base class or interface which describes how a typical "plugin" might look like. Here's the proposal:

    public interface IPluginPart
    {
        UserControl Part { get; }
    }

So inside our main window (`App.cs`) we can have a collection of `IPluginPart` instances over which we can iterate and add each of it to the UI. So far the idea:

    public partial class App : Form
    {
        public IEnumerable<IPluginPart> Plugins { get; }
    }

> **Note**, when creating a proper, modular plugin architecture, each of the developed plugins should be able to live independently and as such should not have any references to the main application it contributes.

Taking that into account, we cannot add the `IPluginPart.cs` interface into our previously created "ClientApplication" project as we wouldn't want a reference from our potential plugins. Instead, we create another DLL (i.e. Visual Studio project) named "Base", that holds the contracts or other commonly shared stuff and we immediately move our `IPluginPart.cs` there. The ClientApplication project then obviously needs to reference the Base library.

### The first PluginPart
Instead of just having external plugins, we might also have "internal" ones, basically our ClientApplication might also expose some UI parts which it registers in the same way as potential external plugins might contribute their UI components.

So the next step is to create a folder inside that same project "ClientApplication" where our views reside. Lets call it "Views" and lets immediately add a new `UserControl` class and name it "TextView". I add a simple label with a predefined text on it, just that we're able to identify it later.

![](/blog/assets/imgs/mef-modular-arch/textview.png)

We also need to identify the `TextView.cs` as a plugin part and thus implement the `IPluginPart` interface.

    public partial class TextView : UserControl, IPluginPart
    {
        public TextView()
        {
            InitializeComponent();
        }

        public UserControl View
        {
            get
            {
                return this;
            }
        }
    }

### The ExportPlugin

As a next step we add a potential external plugin, called **ExportPlugin**. Plugins are normally in the form of a DLL, hence we create a new Visual Studio Project with the name of the plugin. Again, the same structure: create a folder named "Views" and add another UserControl in it. Again, that UserControl should have a simple label with some text to identify the export plugin view later on.  
In the end your VS plugin project should look more or less as follows:

![](/blog/assets/imgs/mef-modular-arch/vs_exportpluginproject.png)

We implement the view here in the exact same fashion as in the above shown TextView.

### Wiring it together

Finally, we now need to wire everything together. For this to happen we need

- Define the MEF exports on the plugin parts
- Specify the MEF imports on the ClientApplication's `App.cs`
- Define two catalogs, one which directly scans the ClientApplication itself for potential extension points and a second one which scans a plugin directory for external plugins.

First, lets **define the exports**. We need to reference the MEF capabilities which is directly included in .Net 4.

<figure>
    <img src="/blog/assets/imgs/mef-modular-arch/mef_reference.png"/>
    <figcaption>Reference the MEF assembly in both, the ClientApplication project and the ExportPlugin</figcaption>
</figure>

Now we add the export both, on the `TextView.cs` fo the ClientApplication and the `ExportView.cs` of the ExportPlugin.

    [Export(typeof(IPluginPart))]
    public partial class ExportView : UserControl, IPluginPart
    {
        ...
    }

By specifying the type in the `[Export]` statement, we tell MEF to export our class as that specific type and not as the type `ExportView` (as that would otherwise be the default behavior).

Similarly, we need to **specify the import** on the collection of plugin parts inside `App.cs`:

    public partial class App : Form
    {

        [ImportMany]
        public IEnumerable<IPluginPart> PluginParts { get; set; }

    }

Now what's missing is **the definition of the catalogs** and the code for adding the plugin parts on the UI. First of all we need a catalog which scans the ClientApplication project itself for eventual extensions like our `TextView`. This can be achieved with a simple AssemblyCatalog like

    new AssemblyCatalog(GetType().Assembly);

Moreover we need a functionality for scanning for other, external plugins, for which purpose we use the `DirectoryCatalog`:

    var pluginsDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Plugins");
    if (!Directory.Exists(pluginsDirectory))
        Directory.CreateDirectory(pluginsDirectory);

    directoryCatalog = new DirectoryCatalog(pluginsDirectory);

That's it. As a final step, an `AggregateCatalog` is used for aggregating both of the catalogs and to give all of them to a `CompositionContainer` which is responsible for resolving the defined exports and imports.

In the end it looks as follows:

    ...
    public App()
    {
        InitializeComponent();
        InitializePlugins();
    }

    private void InitializePlugins()
    {
        mainCatalog = new AggregateCatalog(new AssemblyCatalog(GetType().Assembly));

        container = new CompositionContainer(mainCatalog);

        //load external plugins
        var pluginsDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Plugins");

        if (!Directory.Exists(pluginsDirectory))
            Directory.CreateDirectory(pluginsDirectory);

        directoryCatalog = new DirectoryCatalog(pluginsDirectory);
        mainCatalog.Catalogs.Add(directoryCatalog);

        container.ComposeParts(this);
    }
    ...

So, the final question is, **when do we add the UI's to our App.cs form??** Here's were the `IPartImportsSatisfiedNotification` interface comes into play. Basically we need to implement it on our `App.cs` class. Once the loading of the modules is finished, the interface's `OnImportsSatisfied()` method gets called and hence we can start to add the loaded UI parts there.

    public partial class App : Form, IPartImportsSatisfiedNotification
    {
        ...
        [ImportMany]
        public IEnumerable<IPluginPart> PluginParts { get; set; }

        ...

        public void OnImportsSatisfied()
        {
            this.layout.Controls.Clear();

            foreach (var pluginPart in PluginParts)
            {
                layout.Controls.Add(pluginPart.View);
            }
        }
    }

We can then iterate over the PluginParts collection (which should be populated at that point) and do our work. This should be the end result:

![](/blog/assets/imgs/mef-modular-arch/appwindow_pluginsloaded.png)

**Important:** don't forget to copy the ExportPlugin.dll to the App's plugin folder, otherwise it won't show up as there is no reference to it from the main application.

### Discovering at runtime
As a last nice-to have is the possility to dynamically load plugins at run-time. For that to happen, we need to set the `AllowRecomposition` property on our import

    [ImportMany(AllowRecomposition=true)]
    public IEnumerable<IPluginPart> PluginParts { get; set; }

Furthermore we need to refresh the catalog for re-initiating a scan. For this dummy application we can do that in a new thread in an endless loop (not suggested in a real world).

    Task.Factory.StartNew(() =>
    {
        while (true)
        {
            directoryCatalog.Refresh();
        }
    });

Since we're firing this off in a separate thread, we also need to handle that in our `OnImportsSatisfied()` callback, otherwise we'll get an exception at runtime:

    private delegate void OnImportsSatisfiedDelegate();

    public void OnImportsSatisfied()
    {
        if (InvokeRequired)
        {
            BeginInvoke(new OnImportsSatisfiedDelegate(OnImportsSatisfied), null);
        }
        else
        {
            this.layout.Controls.Clear();

            foreach (var pluginPart in PluginParts)
            {
                layout.Controls.Add(pluginPart.View);
            }
        }
    }

A very dummy implementation but it works. You can now try to remove the ExportPlugin.dll from the plugin directory, launch the application and then copy the dll again into the plugin directory. As a result you'll see the plugin view appear dynamically.

## Conclusion
In this post we've seen how to create a basic example of a Windows Forms application which gets dynamically extended through a plugin-like mechanism by using the .Net MEF framework. We have seen the basics, covering the imports and exports mechanism and the different kind of catalogs. However, note that these are really just the very basics, there's much more to discover in this area.

