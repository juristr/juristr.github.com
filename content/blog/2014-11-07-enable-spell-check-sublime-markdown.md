---
title: 'Sublime Tip: Enable spell checking when you write Markdown'
lead: >-
  You write lots of documents in Markdown, maybe your blog or documentation?
  This is going to be a lifesaver!
show_img_in_detail: true
coverimage: true
category: null
categories: []
date: 2014-11-07T01:00:00.000Z
comments: true
url: /blog/2014/11/enable-spell-check-sublime-markdown
type: post
---

<p class="article-intro">
This is a <strong>huge lifesaver</strong> and I don't know how I couldn't come up with this before. Check out this post to learn how you can enable spell checking when writing Markdown documents with sublime.
</p>

{{< postad >}}

Since I switched to Jekyll and GitHub Pages I'm writing all of my blogs posts in Markdown. Best thing I could do! Being a developer, I spend most of my time in my text editor which happens to be Sublime Text. Given its great plugin and packages ecosystem it obviously also has one for writing Markdown: [MarkdownEditing](https://sublime.wbond.net/packages/MarkdownEditing).

MarkdownEditing not only allows you to quickly navigate through the document structure (ideal for large ones)

![](/blog/assets/imgs/markdownediting-browsedocstructure.png)

..but it also even does in-line highlighting (even your code) while you write

![](/blog/assets/imgs/markdownediting-syntaxhighlighting.png)

But there's one thing that puzzled me: **no spell checking**. Or is there one??

<figure class="image--medium">
    <img src="/blog/assets/imgs/sublime-spellcheck-inaction.png" />
    <figcaption>Spell checking in action</figcaption>
</figure>

**Gosh!!**

Here's how you activate it.

<figure class="image--medium">
    <img src="/blog/assets/imgs/sublime-enable-spellcheck.gif" />
    <figcaption>How to enable spell checking in sublime</figcaption>
</figure>

_[enlarge](/blog/assets/imgs/sublime-spellcheck-inaction.png)_

You basically have to open a Markdown document, then go to `Preferences > Settings - More > Syntax specific - user`. Add

```json
{
    "spell_check": true
}
```

That was easy, wasn't it? Can't believe I didn't find this before!
