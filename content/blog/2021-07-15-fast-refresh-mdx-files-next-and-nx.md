---
type: post
title: Hot Reload MDX changes in Next.js and Nx
date: 2021-07-15T08:40:00+01:00
lead: Learn how to use Next.js, Nx and Tailwind together
url: /blog/2021/07/fast-refresh-mdx-files-next-and-nx
draft: false
image: /blog/assets/imgs/nextjs-nx-series/hot-reload-background.jpg
categories:
  - Next
  - Nx
tags:
  - Next
  - TailwindCSS
  - React
  - markdown
  - mdx
comments: true
---

{{<intro>}}
In the [previous article](/blog/2021/07/component-hydration-nextjs-nx/) we learned how to use `next-mdx-remote` to load and hydrate MDX content. In this article, we're going to learn how to implement a custom server for our Next.js app with Nx, that allows us to auto-refresh the rendering whenever something in our MDX files changes.
{{</intro>}}

<!--more-->

{{< postad >}}

**Building a blog with Next.js and Nx Series**  
This article is part of a series around building a blog with Nx, Next.js, Tailwind, Storybook and Cypress.

- [Create a Next.js web app with Nx](/blog/2021/06/create-nextjs-webapp-nx)
- [Setup Next.js to use Tailwind with Nx](/blog/2021/06/setup-tailwind-nextjs-and-nx/)
- [Read and render Markdown files with Next.js and Nx](/blog/2021/06/read-render-markdown-nextjs-and-nx/)
- [Component hydration with MDX in Next.js and Nx](/blog/2021/07/component-hydration-nextjs-nx/)
- **Hot Reload MDX changes in Next.js with Nx**
- [Using Nx Workspace generators to scaffold new blog posts](/blog/2021/07/nextjs-workspace-generator-blog-draft/)
- [Use Storybook with Tailwind in an Nx Workspace](/blog/2021/08/nextjs-storybook-tailwind-nx/)
- [Use Cypress with Next.js and Nx to battle test your React Components](/blog/2021/08/nextjs-storybook-cypress-nx/)
- [Publishing a Next.js app to Vercel with Nx](/blog/2021/09/nextjs-deploy-vercel-with-nx/)

_Check back later, [follow me on Twitter](https://twitter.com/juristr) or [subscribe to the Newsletter](/newsletter) to get updates about upcoming articles_

{{<toc>}}

Having the live website (running locally on the computer) automatically refresh and reflect the changes made in Markdown is very convenient while writing a new blog article. The common behavior is to auto-refresh the page whenever something in the markdown (MDX) content changes. While this works for our Next.js components, we have to add support for our MDX files.

## What is Fast Refresh aka Hot Reloading

Here's a quick excerpt from the official [Next.js docs](https://nextjs.org/docs/basic-features/fast-refresh).

> Fast Refresh is a Next.js feature that gives you instantaneous feedback on edits made to your React components. Fast Refresh is enabled by default in all Next.js applications on **9.4 or newer**. With Next.js Fast Refresh enabled, most edits should be visible within a second, **without losing component state**.

This works out of the box for Next.js and obviously also with the Nx integration. Whenever you change something in a Next.js component, you should see a small Vercel logo appear at the lower right corner of the open browser window, fast refreshing the current page. The important part here is that it doesn't simply do a Browser refresh, but auto reloads the component, thus you should not lose any current component state.

We definitely want this type of behavior also for our MDX pages, so let's see how we can implement that.

## Using `next-remote-watch`

There's a package [next-remote-watch](https://github.com/hashicorp/next-remote-watch) that allows doing exactly that. As their official GitHub account documents, after installing the package, simply change the npm scripts to the following:

```diff
// ...
"scripts": {
-  "start": "next dev"
+  "start": "next-remote-watch"
}
```

> ⚠️ **WARNING (from the library GitHub repo):** `next-remote-watch` utilizes undocumented APIs from next.js that are not subject to semantic versioning. This means that any version bump to next.js, major, minor, or patch, could cause it to break without warning. If you decide to adopt this package, you should lock your next.js version to patch, and be careful when upgrading.

The downside of using this package is that it controls the entire process, so rather than going through `next dev`, it handles the instantiation of the dev server on its own.

## How it works

`next-remote-watch` uses `chokidar` to watch for file changes and then invokes a private Next.js API to signal the rebuild and reload of the page.

Something like

```tsx
chokidar
  .watch(articlesPath, {
    usePolling: false,
    ignoreInitial: true,
  })
  .on('all', async (filePathContext, eventContext = 'change') => {
    // CAUTION: accessing private APIs
    app['server']['hotReloader'].send('building');
    app['server']['hotReloader'].send('reloadPage');
  });
```

**Note:** As you can see, using such a private API is quite risky, so make sure you freeze the Next.js version and you test things accordingly when you upgrade to a new Next.js release.

## Implementing Fast Refresh

By using `next-remote-watch`, all the Nx specific setup is being bypassed, since the script invokes the Next.js development server directly. We can however implement it with Nx ourselves in a quite easy and straightforward way.

[The Nx Next.js executor](https://nx.dev/latest/react/next/server#customserverpath) (`@nrwl/next:server`) allows you to implement a custom server.

A custom server is basically a function with a certain signature that we register on our Nx Next.js executor. The file itself can be created wherever we want. We could simply add it to our Next.js app, but since it can be reused across different apps, but isn't really something that would require a dedicated library, I'm placing the file in the `tools/next-watch-server` folder.

```tsx
// tools next-watch-server/next-watch-server.ts

import { NextServer } from 'next/dist/server/next';
import { NextServerOptions, ProxyConfig } from '@nrwl/next';

export default async function nextWatchServer(
  app: NextServer,
  settings: NextServerOptions & { [prop: string]: any },
  proxyConfig: ProxyConfig
) {
  ...
}
```

Nx passes the instantiated Next.js app, the settings passed to the executor (these are the options configured in `workspace.json`) and the proxyConfig (if provided). These properties can then be used to implement the watch logic:

```tsx
// tools/next-watch-server/next-watch-server.ts
import { NextServer } from 'next/dist/server/next';
import { NextServerOptions, ProxyConfig } from '@nrwl/next';

const express = require('express');
const path = require('path');
const chokidar = require('chokidar');

export default async function nextWatchServer(
  app: NextServer,
  settings: NextServerOptions & { [prop: string]: any },
  proxyConfig: ProxyConfig
) {
  const handle = app.getRequestHandler();
  await app.prepare();

  const articlesPath = '_articles';

  // watch folders if specified
  if (articlesPath) {
    chokidar
      .watch(articlesPath, {
        usePolling: false,
        ignoreInitial: true,
      })
      .on('all', async (filePathContext, eventContext = 'change') => {
        // CAUTION: accessing private APIs
        app['server']['hotReloader'].send('building');
        app['server']['hotReloader'].send('reloadPage');
      });
  }

  const server = express();
  server.disable('x-powered-by');

  // Serve shared assets copied to `public` folder
  server.use(
    express.static(path.resolve(settings.dir, settings.conf.outdir, 'public'))
  );

  // Set up the proxy.
  if (proxyConfig) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const proxyMiddleware = require('http-proxy-middleware');
    Object.keys(proxyConfig).forEach((context) => {
      server.use(proxyMiddleware(context, proxyConfig[context]));
    });
  }

  // Default catch-all handler to allow Next.js to handle all other routes
  server.all('*', (req, res) => handle(req, res));

  server.listen(settings.port, settings.hostname);
}
```

The implementation is basically copying the Nx default Next.js server ([see here](https://github.com/nrwl/nx/blob/master/packages/next/src/executors/server/lib/default-server.ts)) and adding the watch implementation using `chokidar` to watch the specified folder.

Finally, we need to pass the new custom server to the executor configuration in the `workspace.json`

```json
{
  "version": 2,
  "projects": {
    "site": {
      "root": "apps/site",
      ...
      "targets": {
        ...
        "serve": {
          "executor": "@nrwl/next:server",
          "options": {
            "buildTarget": "site:build",
            "dev": true,
            "customServerPath": "../../tools/next-watch-server/next-watch-server.ts"
          },
          ...
        },
       ...
      }
    },
  },
  ...
}
```

To test this, change something in the current MDX file you're visualizing and hit save. You should see the Next.js fast refresh icon appear at the lower right corner, fast refreshing your changes.

{{<figure url="/blog/assets/imgs/nextjs-nx-series/hot-reload-icon.png" size="full">}}

## Optional: Using an env variable for our _articles path

Right now we have our `_articles` path in two different places, so it might be something we might want to factor out. By using environment variables for instance.

### Step 1: Refactor our code to use environment variables

First of all, let's open our `[slug].tsx` file where we specify our `POSTS_PATH` variable. let's move it into the `getStaticProps` and `getStaticPaths` function as those have full access to the node environment.

Furthermore, we change them as follows:

```diff
+ const POSTS_PATH = join(process.cwd(), '_articles');
- const POSTS_PATH = join(process.cwd(), process.env.articleMarkdownPath);
```

Similarly in our `tools/next-watch-server/next-watch-server.ts` 

```diff
export default async function nextWatchServer(
  app: NextServer,
  settings: NextServerOptions & { [prop: string]: any },
  proxyConfig: ProxyConfig
) {
  const handle = app.getRequestHandler();
  await app.prepare();

- const articlesPath = '_articles';
+ const articlesPath = process.env.articleMarkdownPath;

  // watch folders if specified
  if (articlesPath) {
    chokidar
      .watch(articlesPath, {
        usePolling: false,
        ignoreInitial: true,
      })
      .on('all', async (filePathContext, eventContext = 'change') => {
        // CAUTION: accessing private APIs
        app['server']['hotReloader'].send('building');
        app['server']['hotReloader'].send('reloadPage');
      });
  }
...
```

### Step 2: Specify the environment variables

Now that we refactored all our hard-coded values, let's go and specify our environment variables. We have two options for that

1. create a `.env.local` file at the root of our Nx workspace
2. use the `env` property in our app's `next.config.js`

The Next docs have guides for both, using the [Next config](https://nextjs.org/docs/api-reference/next.config.js/environment-variables) as well as [creating a `.env` file](https://nextjs.org/docs/basic-features/environment-variables). Which one you're using merely depends on the type of environment key. Since we're technically in a monorepo, adding a `.env.local` key is global to the monorepo and thus would not easily allow us to customize it per application. Instead, specifying the environment variable in the `next.config.js` of our app, makes the key local to our application.

```jsx
// apps/site/next.config.js
const withNx = require('@nrwl/next/plugins/with-nx');

module.exports = withNx({
  
  // adding a env variable with Next
  env: {
      articleMarkdownPath: '_articles',
  },
});
```

In this specific example of a blog platform and given we have the `_articles` folder at root of our monorepo vs within the application itself, I'm proceeding with option 1).

At the root of the monorepo, create a new `.env.local` file and add the following:

```
articleMarkdownPath = '_articles'
```

## Conclusion

In this article, we learned 

- What fast refresh is about and what options we have at the moment of writing this article to implement it
- How to create a custom Next.js server with Nx and TypeScript
- How to use the custom Next.js server to implement fast refresh for our MDX files
- How to use environment variables with Next.js and Nx

See also:

- [https://nx.dev/latest/react/guides/nextjs](https://nx.dev/latest/react/guides/nextjs)
- [Nx Next.js executor and `customServerPath` property](https://nx.dev/latest/react/next/server#customserverpath)
- [https://github.com/hashicorp/next-remote-watch](https://github.com/hashicorp/next-remote-watch)

**GitHub repository**  
All the sources for this article can be found in this GitHub repository’s branch:
[https://github.com/juristr/blog-series-nextjs-nx/tree/05-hot-reload-mdx](https://github.com/juristr/blog-series-nextjs-nx/tree/05-hot-reload-mdx)
