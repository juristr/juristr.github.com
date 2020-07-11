---
type: post
title: "Level Up your Terminal with fzf and bat"
lead: Instant file search with syntax highlighted preview
date: 2020-07-03T21:29:00+02:00
comments: true
url: /blog/2020/7/level-up-your-terminal-with-fzf-and-bat
# image: /blog/assets/imgs/rx-to-promise-journey/rxjourney-bg.jpg
# categories:
#   - Angular
# tags:
#   - rxjs
#   - angular
draft: true
---

{{<intro>}}
  Automate the h*** out of it :smiley:. We developers are supposed to do that, right? It's our job to automate things, and still I see many not doing the same for their own tooling. I'm pretty sure you have certain operations you do on a regular basis during your workday. Why not automate them? In this article we're in particular looking into automating search & file previewing.
{{</intro>}}
<!--more-->

{{< postad >}}

Today I stumbled over this tweet from Egghead:

{{< tweet 1279131045619736577 >}}

[Ian](https://twitter.com/_jonesian) published a series of lessons about a tool called `fzf` and `bat`. They allow you to do easy previewing of 

## Install fzf

```bash
$ brew install fzf
```

Here's a short Egghead lesson from [Ian](https://twitter.com/_jonesian)

{{<egghead-lesson uid="lessons/bash-interactively-find-anything-by-piping-it-to-fzf-in-the-terminal" >}}

## Install bat

```bash
$ brew install bat
```

Here's a short Egghead lesson from [Ian](https://twitter.com/_jonesian)

{{<egghead-lesson uid="lessons/egghead-use-bat-to-print-a-file-with-syntax-highlighting-in-the-terminal" >}}

## Install ripgrep

Add the following to your `.zshrc` file

```
export FZF_DEFAULT_COMMAND='rg --files'
```

```bash
$ brew install ripgrep
```

{{<egghead-lesson uid="lessons/egghead-interactively-preview-files-with-fzf-and-bat-in-the-terminal" >}}

## Combine them all

```bash
$ fzf --preview 'bat --style numbers,changes --color=always {} | head -500'
```

## Automate with a zsh function

Recently [John Lindquist](https://twitter.com/johnlindquist) posted about a series around automating stuff with ZSH functions. Here's a pretty useful one:

{{<egghead-lesson uid="lessons/bash-store-zsh-functions-in-individual-files-inside-a-directory" >}}

To automate our command above, we create a new zsh function named `isearch`

```
isearch() {
    fzf --preview 'bat --style numbers,changes --color=always {} | head -500'
}
```


