---
title: Blog Like a Hacker with Jekyll and Nitrous.IO
description: ''
show_img_in_detail: false
category: null
categories:
  - The Desk
  - tooling
reposts:
  - 'http://css.dzone.com/articles/blog-hacker-jekyll-and'
date: 2013-05-08T00:00:00.000Z
comments: true
url: /blog/2013/05/blog-like-a-hacker-with-jekyll-and-nitrousio
type: post
---

One of the best moves I probably did about half a year ago was to move my [Blog from blogger to Jekyll](/blog/2012/09/im-relocating-my-domain-site-and-blog/), hosted on GitHub.
It simply reflects the kind of blogging experience you want as a dev, with Markdown support, full version control and amazing hosting on GitHub plus - not to forget - [Jekyll](http://jekyllrb.com/). What I was missing so far, however, was the ability to blog from any computer or even tablet. Today I found a possible workflow: [Nitrous.IO](https://www.nitrous.io/)

Jekyll is awesome as a blogging engine. You get an engine that allows to dynamically generate static pages: the best of both worlds! This allows
to have full control over the generated HTML code. Moreover Markdown editing is absolutely perfect for writing technical blog posts with lots of source code in it. 
There's nothing really I miss, except for..well you know when you're on another machine and you'd just like to quickly edit some post or even publish a new one, or when you'd like to use your tablet for finishing
that blog post...you **simply can't**. Why? Because Jekyll requires a working Ruby installation + if you have it hosted on GitHub (as I have) you need Git installed
as well. On a table that doesn't work. Or does it?

## Nitrous.IO Makes It Possible

<iframe width="560" height="315" src="http://www.youtube.com/embed/7X6IvkgkC7k" frameborder="0" allowfullscreen="allowfullscreen"> </iframe>

Simply speaking Nitrous.IO is a cloud IDE similar to Cloud9 but with the additional focus to give you a complete development box, with SSH access and in-browser shell. Their goal is to make a new setup as easy as possible.

> **Hello World in 60 Seconds.** Managing development environments is a pain. Get setup lightning fast in the cloud & code from anywhere, on any machine. <cite><a href="https://www.nitrous.io/">nitrous.io/</a></cite>

And it is _literally_ set up in seconds.

Nitrous has the concept of boxes

<figure class="image--medium">
    <img src="/blog/assets/imgs/nitrousio_boxes.png" />
    <figcaption>Nitrous Boxes</figcaption>
</figure>

When you setup a new box you're being asked to choose your environment. Currently these are supported:

![](/blog/assets/imgs/nitrousio_envselection.png)

Once selected, Nitrous will setup your box and immediately afterwards you'll be forwarded to the corresponding cloud IDE:

![](/blog/assets/imgs/nitrousio_ide.png)

Note the shell window in the lower region of the IDE. This is a full SSH access to your box. You can even configure Nitrous to use Putty (Windows) or your unix shell to SSH into your cloud box. Extremely nice!!

## Configuring Jekyll on Nitrous

Since Nitrous gives you full access either through SSH or directly through a shell in its web IDE and given that Ruby is one of the native development platforms available on it, setting up Jekyll is really just a matter of minutes.

### Configure GitHub

Configuring GitHub is - again - easy as Nitrous is already designed to be connected to it. You can just follow the instructions provided on [their help site](http://help.nitrous.io/github-add-key/).

Once that's set up, just clone your blog from GitHub.

### Install Jekyll

Just follow the instructions on its [official homepage](http://jekyllrb.com) and execute

    $ gem install jekyll

Enter your previously downloaded Jekyll blog repository and start Jekyll through the corresponding rake task.

    $ rake preview

### Start Blogging

Now you can open the corresponding blog markdown file in the web IDE and start writing your blog post. You can even directly run Jekyll on Nitrous and preview the resulting posts in the browser while writing it.

Thanks to Chrome on Android you can seamlessly also write your Jekyll blog post from your tablet!

Once finished, just git push it to GitHub as usual for publishing the post.

## Conclusion

**So do I like Nitrous?** Of course, what I have seen is impressive given it is only in private beta. But actually the use case described in this post isn't probably the intended one. Instead, to be able to get a better overview of Nitrous one would have to explore its features in terms of code editor support and so on by developing a piece of software directly on that platform, i.e. using NodeJS. So far I have played with Nitrous only for a couple of hours.

**Would such workflow be possible in another Cloud IDE as well??** Sure, why not. I didn't try any other cloud IDE like Cloud9 extensively, but as long as you have shell access and can run Ruby on it, it should work just fine.
