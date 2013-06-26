---
layout: post
title: "Setting up a WPF Application With PRISM"
description: ""
category: ""
tags: [".Net", "WPF"]
---

This post mainly functions as a documentation for myself on how to setup a WPF client to use PRISM which emerged from Microsoft's Patterns and Practices team and is the successor of the Composite UI Application Block.

> Prism provides guidance designed to help you more easily design and build rich, flexible, and easy-to-maintain Windows Presentation Foundation (WPF) desktop applications. [...]. Using design patterns that embody important architectural design principles, such as separation of concerns and loose coupling, Prism helps you to design and build applications using loosely coupled components that can evolve independently but that can be easily and seamlessly integrated into the overall application.<cite><a href="http://compositewpf.codeplex.com/">Official PRISM site</a></cite>

I've experimented with PRISM already a couple of years ago when it was still in beta. Recently, I now again have a real-world requirement of building a WPF client with a modular plugin-based architecture which is where PRISM suites quite well.

## Step 1: Create a new WPF Client

Just create a new plain WPF project using the Visual Studio build-in project template. You'll get an `App.xaml` and `MainWindow.xaml`.

## Step 2: Install the PRISM Dependencies Over NuGet

NuGet is awesome. Just fetch the latest PRISM dependencies and add them to your project.

![](/blog/assets/imgs/prism_dependencies.png)

I added the Prism.MEFExtensions as well as I'm planning to rely on [MEF](http://msdn.microsoft.com/en-us/library/dd460648.aspx) for the extensibility part of the application.

## Step 3: Create an Application Bootstrapper

The name is quite self-explanatory, the "Bootstrapper" loads the application and does the necessary setup prior to launching the UI. Lets create a file named `ApplicationBootstrapper.cs`

    class ApplicationBootstrapper : MefBootstrapper
    {
        protected override DependencyObject CreateShell()
        {
            //initialize the Shell here
        }
    }

Notice that we inherit from `MefBootstrapper` and notice the main method `CreateShell()` we need to implement. This is were the actual application, that is **the shell**, gets assembled.

## Step 4: Hook up the Dependencies using MEF

As a next step **lets rename** `MainWindow.xaml` to `Shell.xaml`. The name shell is a better name for what the main window will be in the end, a container (shell) for the different modules and plugins.

We now need to modify the `CreateShell()` method to create the shell and add another `InitializeShell()` method for visualizing it once it has been created and initialized.

    protected override DependencyObject CreateShell()
    {
        return this.Container.GetExportedValue<Shell>();
    }

You might encounter the problem that `GetExportedValue<T>()` does not exist. This is because it is provided as an extension method by MEF which we still need to add as a reference to our project. Simply add `System.ComponentModel.Composition` to bring it in.

<figure>
    <img src="/blog/assets/imgs/prism_compositiondependency.png" />
    <figcaption>Importing the dependency to MEF which is part of the .Net framework since v4</figcaption>
</figure>

To make the `Shell` visible to MEF we need to do two things. First, we have to **export** it which is done by adding the `[Export]` attribute.

    [Export]
    public partial class Shell : Window
    {
        public Shell()
        {
            InitializeComponent();
        }
    }

Second, we have to configure the `Catalog` which can be seen as a registry with all the dependencies and instructions on how to resolve them to a concrete component. This second step is done directly in the `ApplicationBootstrapper` by adding an `AssemblyCatalog`.

    protected override void ConfigureAggregateCatalog()
    {
        base.ConfigureAggregateCatalog();

        this.AggregateCatalog.Catalogs.Add(new AssemblyCatalog(GetType().Assembly));
    }

> **Note**, I'm not going into the details of how MEF works. This would be subject of a separate post (if not series of posts).

Once this is done, we can override the `InitializeShell()` and associate our current instance of the shell (which is made available through the `MefBootstrapper`'s `Shell` property) to the application's main window.

    protected override void InitializeShell()
    {
        base.InitializeShell();

        Application.Current.MainWindow = (Shell)this.Shell;
        Application.Current.MainWindow.Show();
    }

## Step 5: Run the App

That's it. You should now be able to run the app.

![](/blog/assets/imgs/prism_apprunning.png)

A nice, little white window. Fascinating.. :)

## Useful Resources

The code examples provided on the [official PRISM project site](http://compositewpf.codeplex.com/) on Codeplex proved to be quite useful as they offers in-depth illustrations of the different kind of use cases for PRISM.

