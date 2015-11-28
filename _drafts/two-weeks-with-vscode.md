---
layout: post_new
title: "One..ehm two weeks with Visual Studio Code"
lead: "..and I'm still using it"
show_img_in_detail: true
coverimage: false
category:
tags: []
---

<div class="article-intro">
    Before starting, I'm a Sublime user, right from the beginning. I just love that tool, it's fast, it has a huge amount of plugins, I'm even <a href="/blog/2014/11/enable-spell-check-sublime-markdown/">writing this article right now using Sublime</a>. But there are other tools out there and from now and then I like to take a look around of what's going on. This time: <a href="https://code.visualstudio.com/">Visual Studio Code</a>.
</div>

<figure>
    <img src="/blog/assets/imgs/vscode/vscodelogo.png">
    <figcaption>VSCode Logo</figcaption>
</figure>

{% include postads %}

When you hear Visual Studio you immediately think about the full blown Microsoft IDE. But it isn't. With VSCode, Microsoft has entered the market of the **Text Editors** which have been popularized by Sublime, followed by Atom from GitHub.

## The Good

- soft transition of the cursor
- suggestions, like adding jshint globals etc..
- autocomplete within functions (local vars etc..) is excellent
- native Git functionality (diff, committing, visualization of changes beneath line numbers etc..)
- function quick-view: `Ctrl+Shift+O`, enter the name of the function within the file, watch it, press ESC to return to the last cursor position.

## The Bad

- autocompletion not so good as in sublime (when having all-autocomplete plugin)...except oviously if you use typescript.
- search isn't as powerful as in Sublime; doesn't show context
- Lack of plugins
   - EditorConfig support
- `Ctrl+Shift+P` doesn't allow to search over paths, like 'userwidget/module' doesn't work which allows in Sublime to restrict the search into a folder
- VSCode doesn't autocomplete HTML within strings which is awesome when you write them in Angular directive templates

## Good to know

Here's a link [to Google.com](http://www.google.com).

1. List with numbers
1. Another entry
1. And a last one

We can also have lists with dots...

- `Ctrl+Shift+F` for searching
- `Alt+Shift+F` for formatting JS code
- `Alt+Shift+O` for jumping to functions (same as Sublime)
- `Alt+Shift+]` for jumping between matching braces
- `Alt+Left` or `Alt+Right` to jump back and forth on your cursor positions
