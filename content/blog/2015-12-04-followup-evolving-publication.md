---
title: 'Follow-up: EvolvingPublication'
show_img_in_detail: true
coverimage: false
category: null
categories: []
date: 2015-12-04T01:00:00.000Z
comments: true
url: /blog/2015/12/followup-evolving-publication
type: post
---

<p class="article-intro">
Martin Fowler just published a "Bliki" article on his site about <a href="http://martinfowler.com/bliki/EvolvingPublication.html">EvolvingPublication</a>. This is a concept I've been using for a while now by myself and found it very useful. Here's my follow-up to this article.
</p>

{{< postad >}}

Good articles have to be concise and deliver their core message quickly. People don't have time, **time to read** but also **time to write** the article itself. Articles that finish in the various "read me later" services are mostly destined to die.

The major motivation for me to start adopt publishing articles in parts and to update them over time was the lack of time of finishing the entire one in one shot. And I wanted to commit and share what I have so far.

I'm using [Jekyll](https://jekyllrb.com) as my platform which gives you enough flexibility to perfectly cope with such workflow.

## Partial articles

To publish partial articles, just go and publish them. In Jekyll this is nothing more than creating a new [Markdown](https://daringfireball.net/projects/markdown/) file in the `_posts` folder, commit the file and push it to GitHub.

But what you may want to do is to give your readers a bit more, like displaying a _last updated_ date to let people know when I last modified the article. Take a look at my [Git Explained](/blog/2013/04/git-explained/) article.

![](/blog/assets/imgs/postupdates.png)

Specifying the last update date is done by simply [adding a new property in the post header](https://github.com/juristr/juristr.github.com/blob/master/_posts/2013-04-30-git-explained.md) section and [render it](https://github.com/juristr/juristr.github.com/blob/master/_includes/article-header.html#L28).

![](/blog/assets/imgs/articlehistory.png)

Similarly, showing a history of changes is simply done by linking to the corresponding GitHub commit history.

## What about the news feed?

When you publish your article in pieces it's important to let your readers know about updates, just as Martin mentions. I do this by creating special ["update articles" such as this one](https://github.com/juristr/juristr.github.com/blob/master/_posts/2015-06-09-update-git-explained.md). 

```
---
layout: articles-post
title: "How to undo (almost) everything with Git"
type: update-notice
target-url: /blog/2013/04/git-explained/#Undoing
---
...
```

They get then [rendered in the atom.xml](https://github.com/juristr/juristr.github.com/blob/master/blog/atom.xml#L20) feed with the atom link property field pointing to the original article that has been updated, represented by the `target-url` property in the post header.

## Conclusion

As you can see, it is really straightforward to implement the pattern of "EvolvingPublication" with Jekyll. Publishing an article incrementally gives you the advantage of quickly sharing your ideas, but at the same time the freedom to continue to refine it over time which I really like.
