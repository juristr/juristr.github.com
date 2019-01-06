---
title: Easy SSL support for your Jekyll Blog with CloudFlare
lead: Learn how CloudFlare makes it easy to activate SSL for your blog
categories:
  - The Desk
date: 2017-01-04T01:00:00.000Z
comments: true
url: /blog/2017/01/enable-ssl-jekyll-blog
type: post
image: /blog/assets/imgs/blog-secure-connection.png
---

<div class="article-intro">
  It's 2017 and if you didn't switch to a secure SSL connection yet, it's definitely time to do so. This has been on my todo list for a while already and now that I know how easy it was, I definitely should have done it before!
</div>

{{< postad >}}

Every site should definitely make use of a secure connection, even if you only have a static website or blog like this one here. Besides other advantages, there's a simple thing that should be enough of a motivation for you to go SSL: **Google will start to penalize websites in their search resuls, which are not using a secure SSL connection**. Convinced? :wink:  
After all, it's an easy task and _completely free thanks to CloudFlare!_

## Activate SSL with CloudFlare for free!

CloudFlare is an amazing service. Already years ago, they actually introduced a new concept called ["universal SSL"](https://blog.cloudflare.com/introducing-universal-ssl/) - included in their free plan - which allows you to benefit from a SSL connection using a shared certificate.

Here's an awesome article that guides through the various steps.

{{< article-link
	url="https://rck.ms/jekyll-github-pages-custom-domain-gandi-https-ssl-cloudflare/"
	title="How to have a SSL-enabled Jekyll site with a custom domain on GitHub Pages"
	text="GitHub Pages in combination with Jekyll is a simple yet powerful tool to build and serve static websites. This article explains how to set it up and activate and enable SSL encryption with CloudFlare."
>}}

You basically add a new site to CloudFlare by entering your existing URL. As a consequence, CloudFlare then scans for the the according DNS configuration and copies them over. After that, simply point to those DNS servers on your domain provider's admin panel.

<figure class="image--medium">
    <a href="/blog/assets/imgs/cloudflaredns.png" class="image--zoom">
        <img src="/blog/assets/imgs/cloudflaredns.png">
    </a>
    <figcaption>Example configuration</figcaption>
</figure>

### Enable redirects with CloudFlare Page Rules

An important part is that you setup proper redirects from your `http://` urls to the new `https://` endpoints.

<figure class="image--medium">
    <a href="/blog/assets/imgs/cloudflare-redirects.png" class="image--zoom">
        <img src="/blog/assets/imgs/cloudflare-redirects.png">
    </a>
    <figcaption>CloudFlare Page Rules</figcaption>
</figure>

The redirect rule should look like this:

<figure class="image--medium">
    <a href="/blog/assets/imgs/cloudflare-redirects-example.png" class="image--zoom">
        <img src="/blog/assets/imgs/cloudflare-redirects-example.png">
    </a>
    <figcaption>Redirect example</figcaption>
</figure>


## Remove any "mixed content"

You will get a warning if your website loads "mixed content" which is when you embed external `http://` based resources within your SSL secured `https` site. So make sure to update all embeds of external resources (scripts, css,...).

```html
...
<!-- option 1 -->
<script src="//somedomain.com/..."></script>

<!-- option 2 -->
<script src="https://somedomain.com/..."></script>
```

Btw, an easy way to check is to use Chrome. It'll warn you if you have mixed content on your page.

## Migrate Disqus comments

Finally, if you happen to use Disqus as your external comment service, make sure you adjust the callback URL in the Disqus script and finally also migrate the existing Disqus comments over to your new https URL. This can be done easily through the Disqus admin panel:

<figure class="image--medium">
    <a href="/blog/assets/imgs/disqus-comment-migration.png" class="image--zoom">
        <img src="/blog/assets/imgs/disqus-comment-migration.png">
    </a>
    <figcaption>Migrate Disqus comments</figcaption>
</figure>

## Conclusion

This is definitely a no-brainer. CloudFlare makes it really easy to get set up and running. Moreover, you won't only benefit from the free SSL support, but they add a lot of other optimizations on top which will make your site even blazingly fast! 

It's easy and done in minutes. So go for it :+1:!
