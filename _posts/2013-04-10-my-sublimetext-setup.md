---
layout: post
title: "My Sublime Text Setup"
description: ""
postimg: "/blog/assets/imgs/sublimecode_background.png"
show_img_in_detail: true
category: "bliki"
tags: [tooling]
reposts: ["http://architects.dzone.com/articles/my-sublime-text-setup"]
---

I absolutely love this editor. A ridiculously fast editor which has everything you'd love to have from a simple notepad to an advanced, extensible IDE with auto-completion, highlighting to whatever you'd like to have. This post aims at mainly being a setup reference for myself.

Actually, I'm a bit late now, as a couple of days ago [Alex MacCaw posted published exactly a similar post](http://blog.alexmaccaw.com/sublime-text) to this one here. So go and check that out as well, it contains a bunch of valuable information.

## Sublime Configuration

I usually have the following customizations:

    {
        "font_size": 16,
        "tab_size": 4,
        "translate_tabs_to_spaces": true
    }

The large font for being able to focus better on a smaller context which I found quite useful. Moreover it's more relaxing for my eyes.

I usually leave the tab-size on "4" as that's what my other colleagues are accustomed to have in their IDEs. But note you might want to set it to "2", especially when using CoffeeScript as it is more handy there.

### Access from the Shell

In order to use sublime productively, one of the first steps is to make it accessible from your shell.

**On OSX**, the best way (as already Alex mentions in his post) is to create a symlink to your Sublime installation directory like

    ln -s "/Applications/Sublime Text 3.app/Contents/SharedSupport/bin/subl" /usr/bin/subl

But since I'm also working as a .Net developer and thus I'm having a **Windows machine** at work, I'd like to have the same functionality there as well. As such I created a special directory under `C:\bin\utils` which is linked in the `PATH` environment variable. Inside that directory I created a `subl.cmd` with the following content:

    @echo off
    "C:\Program Files\Sublime Text 3\sublime_text.exe" %1

## Installing Packages

Sublime wouldn't be that rich and useful without its packages (extensions basically). If you miss any kind of functionality, search for a package and I bet there is one already available.

### Package Control

Url: [http://wbond.net/sublime_packages/package_control](http://wbond.net/sublime_packages/package_control)

Package Control is simply a package manager for Sublime Text packages and extensions.

Package Control can be **installed** using Git. Navigate to the "Packages" folder (you can use your menu to find it `Preferences > Browse packages...`). Then execute the following commands

<pre class="nohighlight">
git clone https://github.com/wbond/sublime_package_control.git "Package Control"
cd "Package Control"
git checkout python3
</pre>

Restart Sublime and you're done.

**To use** Package Control simply press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> to open the Sublime Menu and write

- **Install** for installing a new package
- **Upgrade** for upgrading an existing package or
- **Remove** for removing an existing package.

## My Packages

Here's a list of packages I'm currently using with Sublime Text. I'll add/remove this list over time as I find new interesting and useful ones. The installation instructions as well as the packages I listed should work on both, Sublime Text 2 as well as Sublime Text 3 (which is currently in private beta). But since I'm using the latter, you might experience some trouble in using some of them with v2.

> **Note**, if there is no hint about the installation of a package, you can simply use Package Control for adding the extension to Sublime Text.

<table class="table table-striped">
  <thead>
    <th>Package Name</th>
    <th>Description</th>
  </thead>
  <tbody>
    <tr>
        <td><a href="https://github.com/sergeche/emmet-sublime">Emmet</a></td>
        <td>Adds Zen-coding capabilities to Sublime Text. See the <a href="https://github.com/sergeche/emmet-sublime#available-actions">docs</a> for a list of available commands and usage instructions.</td>
    </tr>
    <tr>
        <td><a href="https://bitbucket.org/CDuke/sublime-tfs/wiki/Home">Sublime TFS</a></td>
        <td>A must have package if you have TFS as your version control system. After installation you should see a "TFS" menu which illustrates the major commands.</td>
    </tr>
    <tr>
        <td><a href="https://github.com/titoBouzout/SideBarEnhancements">SideBar Enhancements</a></td>
        <td>Adds a bunch of useful functionalities to your Sublime's sidebar context menu like copy path, duplicate file, move, copy etc...</td>
    </tr>
    <tr>
        <td><a href="https://github.com/SublimeLinter/SublimeLinter">SublimeLinter</a></td>
        <td>Linting support for Sublime</td>
    </tr>
    <tr>
        <td><a href="https://github.com/spadgos/sublime-jsdocs">DocBlockr</a></td>
        <td>
            Augments Sublime for easy commenting of your JavaScript code. Adds comment blocks like:
            <pre>
/**
 * [testFunction description]
 * @param  {[type]} param1
 * @param  {[type]} param2
 * @return {[type]}
 */
testFunction : function(param1, param2) {
}
</pre>
        </td>
    </tr>
    <tr>
        <td><a href="https://github.com/alienhard/SublimeAllAutocomplete">AllAutocomplete</a></td>
        <td>This package extends Sublime's amazing autocomplete support over multiple files.</td>
    </tr>
    <tr>
        <td><a href="https://github.com/SublimeText/TrailingSpaces">TrailingSpaces</a></td>
        <td>Allows to configure Sublime to highlight or even automatically remove all trailing spaces. Take a look at the <a href="https://github.com/SublimeText/TrailingSpaces">docs</a> for instructions on how to configure it.<br/>
            My current setup adds the following to the user preferences:
            <pre>
{ "trailing_spaces_trim_on_save": true }</pre>
            and this to the package's preferences
            <pre>
{
    "trailing_spaces_include_current_line": false
}</pre>
        </td>
    </tr>
    <tr>
        <td><a href="https://github.com/dzhibas/SublimePrettyJson">SublimePrettyJson</a></td>
        <td>Prettifies a compressed JSON string in the editor.</td>
    </tr>
    <tr>
        <td><a href="https://github.com/ttscoff/MarkdownEditing">MarkdownEditing</a></td>
        <td>If you love markdown teh same way as I do, this plugin is definitely a must have.</td>
    </tr>
    <tr>
        <td><a href="https://github.com/revolunet/sublimetext-markdown-preview">MarkdownPreview</a></td>
        <td>Although I use this less often, it is quite useful for quickly previewing your created markdown document in a browser.</td>
    </tr>
  </tbody>
</table>

## Related Posts

Here are some posts I find (and I'll update over time) covering similar aspects around Sublime Text setup.

- [http://drewbarontini.com/setup/sublime-text](http://drewbarontini.com/setup/sublime-text)