---
layout: post
title: "Sublime Text Setup"
description: ""
category: bliki
tags:
---

> **Note**, if there is no hint about the installation of a plugin, you can simply use Package Control for adding the extension to Sublime Text.

## Package Control

Url: [http://wbond.net/sublime_packages/package_control](http://wbond.net/sublime_packages/package_control)

Package Control is simply a package manager for Sublime Text plugins and extensions.

### Installation

Package Control can be installed using Git. Navigate to the "Packages" folder (you can use your menu to find it `Preferences > Browse packages...`). Then execute the following commands

    git clone https://github.com/wbond/sublime_package_control.git "Package Control"
    cd "Package Control"
    git checkout python3

Restart Sublime and you're done.

### Usage

Simply press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> to open the Sublime Menu and write

- **Install** for installing a new package
- **Upgrade** for upgrading an existing package or
- **Remove** for removing an existing package.

## Emmet (Ex-ZenCoding)

Url: [https://github.com/sergeche/emmet-sublime](https://github.com/sergeche/emmet-sublime)

Emmet adds zen-coding capabilities to Sublime Text.

### Usage

Please refer to [https://github.com/sergeche/emmet-sublime#available-actions](https://github.com/sergeche/emmet-sublime#available-actions).

## Sublime TFS

Url: [https://bitbucket.org/CDuke/sublime-tfs/wiki/Home](https://bitbucket.org/CDuke/sublime-tfs/wiki/Home)

Sublime TFS integrates Sublime and your TFS version control system.

### Usage

After successful installation of the plugin, you should see a "TFS" menu which illustrates all of the commands. Obviously they are also accessible by using the sublime menu shortkey and typing "TFS:".

## SynchedSidebar

Url: [https://github.com/sobstel/SyncedSideBar](https://github.com/sobstel/SyncedSideBar)

SynchedSidebar syncs the sidebar with the currently active text editor window, basically selecting the file in the sidebar view.

## Sidebar Enhancements

Url: [https://github.com/titoBouzout/SideBarEnhancements](https://github.com/titoBouzout/SideBarEnhancements)

Adds nice functionality to the context menu of the sidebar like

- Copy Path
- Duplicate file
- Move
- Copy
- ...

## SublimeLinter

Url: [https://github.com/SublimeLinter/SublimeLinter](https://github.com/SublimeLinter/SublimeLinter)