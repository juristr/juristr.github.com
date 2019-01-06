---
type: post
title: 'Article Design Demo'
lead: 'Learn how to properly redirect in an Angular route guard'
date: 2019-01-04T11:39:40+01:00
draft: true
---

Demo article showcasing the various things you can use on this blog here

<!--more-->

Intros as seen above, are wrapped with the `.article-intro` class.

## Some text

The information corresponding to the source of the quote is a separate text field, similar to captions under images, so the structure of the quote is protected even if you select, modify, or remove the source. It’s always easy to add it back.

Blocks can be anything you need. For instance, you may want to add a subdued quote as part of the composition of your text, or you may prefer to display a giant stylized one. All of these options are available in the inserter.

Also having some bullet points

- number 1
- another one
- one with [a link in it](https://www.google.com)
- and a last one


## Images

Images can be added in a variety of ways.

**Wide images**

<figure class="image--wide">
    <img src="https://d262ilb51hltx0.cloudfront.net/max/1067/1*0nMN9zMCyIDhnjbzRgeIlw.jpeg" >
    <figcaption>Sample img</figcaption>
</figure>

```html
<figure class="image--wide">
  <img src="..." />
  <figcaption>Sample img</figcaption>
</figure>
```

Images can also be **full-sized**

<figure class="image--full">
    <img src="https://d262ilb51hltx0.cloudfront.net/max/1067/1*0nMN9zMCyIDhnjbzRgeIlw.jpeg" >
    <figcaption>Full sample img</figcaption>
</figure>

```html
<figure class="image--full">
  <img src="..." />
  <figcaption>Full sample img</figcaption>
</figure>
```

Note, add zooming like this:

<a href="https://d262ilb51hltx0.cloudfront.net/max/1067/1*0nMN9zMCyIDhnjbzRgeIlw.jpeg" class="image--zoom">
    <img src="https://d262ilb51hltx0.cloudfront.net/max/1067/1*0nMN9zMCyIDhnjbzRgeIlw.jpeg">
</a>

```html
<a href="/blog/assets/imgs/us2015/jump.jpg" class="image--zoom">
  <img src="/blog/assets/imgs/us2015/jump.jpg" />
</a>
```

Other variations:

- `.image--small` for small sized images.
- `.image--medium` for medium sized images.
- `.image--left` for having the text flow on the right

Example

```html
<figure class="image--medium">
  <a href="/blog/assets/imgs/us2015/ourcar.jpg" class="image--zoom">
    <img src="/blog/assets/imgs/us2015/ourcar.jpg" />
  </a>
  <figcaption>Our massive car!</figcaption>
</figure>
```

Library used: [Fluidbox](http://www.jqueryscript.net/demo/Medium-Style-jQuery-Image-Enlargement-Plugin-Fluidbox/)

---

## Blockquotes

A plain normal blockquote looks like this.

<blockquote>
    At that moment, shitty tempura was the worst thing in my life.
</blockquote>

A more emphasized blockquote is written like this

```html
<blockquote class="emphasized">I'm super emphasized!</blockquote>
```

and looks like

<blockquote class="emphasized">I'm super emphasized!</blockquote>

### Source cites

It's also possible to add `cites`:

> The editor will endeavor to create a new page and post building experience that makes writing rich posts effortless, and has “blocks” to make it easy what today might take shortcodes, custom HTML, or “mystery meat” embed discovery. <cite>Matt Mullenweg, 2017</cite>

## Emphasizing

Simple use the `em` tag:

<em>This is an emphasized part of the text</em>


## Code

Simply us the standard approach using in Markdown docs.

```javascript
function someJSFunction() {
  var x = 'Hi there';
}
```

```html
<h1>Test</h1>
```
