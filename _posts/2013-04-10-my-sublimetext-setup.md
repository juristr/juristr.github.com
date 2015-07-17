---
layout: post
title: "My Sublime Text Setup"
description: ""
postimg: "/blog/assets/imgs/sublimecode_background.png"
show_img_in_detail: true
coverimage: true
tags: [tooling]
reposts: ["http://architects.dzone.com/articles/my-sublime-text-setup"]
---

I absolutely love this editor. A ridiculously fast editor which has everything you'd love to have, from a simple notepad to an advanced, extensible IDE with auto-completion and highlighting. This post aims at mainly being a setup reference for myself.

Actually, I'm a bit late now, as a couple of days ago [Alex MacCaw posted published exactly a similar post](http://blog.alexmaccaw.com/sublime-text) to this one here. So go and check that out as well, it contains a bunch of valuable information.

## Sublime Configuration

My Sublime user settings:

```json
{
	"always_show_minimap_viewport": true,
	"bold_folder_labels": true,
	"caret_extra_width": 3,
	"color_scheme": "Packages/Material Theme/schemes/Material-Theme.tmTheme",
	"font_face": "Source Code Pro",
	"font_options":
	[
		"gray_antialias"
	],
	"font_size": 14,
	"ignored_packages":
	[
		"Markdown",
		"ScopeHunter",
		"Dracula Color Scheme",
		"DocBlockr",
		"TrailingSpaces",
		"Vintage"
	],
	"line_padding_bottom": 3,
	"line_padding_top": 3,
	"overlay_scroll_bars": "enabled",
	"soda_folder_icons": true,
	"tab_size": 4,
	"theme": "Material-Theme.sublime-theme",
	"translate_tabs_to_spaces": true,
	"trim_trailing_white_space_on_save": true
}
```


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

Package Control is simply a package manager for Sublime Text packages and extensions. **Installation** is super simple, just [go to their website](https://sublime.wbond.net/installation) and follow the "manual installation" instructions. They're the simplest ones.

Restart Sublime and you're done.

**To use** Package Control simply press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> to open the Sublime Menu and write

- **Install** for installing a new package
- **Upgrade** for upgrading an existing package or
- **Remove** for removing an existing package.

## My Packages

Here's a list of packages I'm currently using with Sublime Text. I'll add/remove this list over time as I find new interesting and useful ones.

> **Note**, most of them are installable through Package Control. Simply google for them to find the installation instructions.

- **All Autocomplete -** Provides auto-completion across all open Sublime files.
- **BracketHighlighter -** As the name tells...highlights brackets in HTML or code.
- **DocBlockr -** For easily adding code comments and JSDoc compliant documentation.
- **Emmet -** Adds Zen-coding capabilities to Sublime Text. See the <a href="https://github.com/sergeche/emmet-sublime#available-actions">docs</a> for a list of available commands and usage instructions.
- **FixMyJS -** Experimental plugin to fix JavaScript code based on JSHint suggestions.
- **JSHint Gutter -** For visualizing JSHint suggestions directly within the Sublime Editor.
- **MarkdownEditing -** For Markdown editing support within Sublime. [Check out my post about how to enable spell-checking](/blog/2014/11/enable-spell-check-sublime-markdown/)!
- **Pretty JSON -** For working with JSON (compression, expansion, formatting etc...)
- **Sass -** Enables syntax highlighting for SASS files
- **Seti_UI -** UI Theme I'm currently using
- **Tag -** For auto-formatting HTML documents
- **TrailingSpaces -** Allows to automatically remove (useless) trailing spaces on lines on each save.

## UI Theme

I currently use [Seti_UI](https://sublime.wbond.net/packages/Seti_UI) a Sublime port of the popular UI theme for [Atom](https://atom.io/). You can simply install it through Package Control and follow the installation instructions.

## Related Posts

Here are some posts I find (and I'll update over time) covering similar aspects around Sublime Text setup.

- [http://drewbarontini.com/setup/sublime-text](http://drewbarontini.com/setup/sublime-text)
