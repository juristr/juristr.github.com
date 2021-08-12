---
type: post
title: Setup Next.js to use Tailwind with Nx
date: 2021-06-15T08:40:00+01:00
lead: Learn how to use Next.js, Nx and Tailwind together
url: /blog/2021/06/setup-tailwind-nextjs-and-nx
draft: false
image: /blog/assets/imgs/nextjs-nx-series/bg-tailwind-next-nx.jpg
categories:
  - Next
  - Nx
tags:
  - Next
  - TailwindCSS
  - React
  - markdown
comments: true
---
{{<intro>}}
In the [previous article](/blog/2021/06/create-nextjs-webapp-nx) we learned how to setup Next.js in an Nx workspace. In this article we carry that forward, by adding [TailwindCSS](https://tailwindcss.com/) support to our setup.
{{</intro>}}

<!--more-->

{{< postad >}}

**Building a blog with Next.js and Nx Series**  
This article is part of a series around building a blog with Nx, Next.js, Tailwind, Storybook and Cypress.

- [Create a Next.js web app with Nx](/blog/2021/06/create-nextjs-webapp-nx)
-  **Setup Next.js to use Tailwind with Nx**
- [Read and render Markdown files with Next.js and Nx](/blog/2021/06/read-render-markdown-nextjs-and-nx)
- [Component hydration with MDX in Next.js and Nx](/blog/2021/07/component-hydration-nextjs-nx)
- [Hot Reload MDX changes in Next.js with Nx](/blog/2021/07/fast-refresh-mdx-files-next-and-nx/)
- [Using Nx Workspace generators to scaffold new blog posts](/blog/2021/07/nextjs-workspace-generator-blog-draft/)
- [Use Storybook with Tailwind in an Nx Workspace](/blog/2021/08/nextjs-storybook-tailwind-nx/)
-  Use Cypress with Next.js and Nx to battle test your React Components _(soon)_
-  Publishing a Next.js site to Vercel with Nx _(soon)_

_Check back later, [follow me on Twitter](https://twitter.com/juristr) or [subscribe to the Newsletter](/newsletter) to get updates about upcoming articles_

{{<toc>}}

> It's important to note that you **don't need to use a preprocessor with Tailwind** — you typically write very little CSS on a Tailwind project anyways so using a preprocessor just isn't as beneficial as it would be in a project where you write a lot of custom CSS.

The official TailwindCSS docs page already [has a guide](https://tailwindcss.com/docs/guides/nextjs) on how to setup Tailwind with Next.js. Definitely check that out.

## Install and configure Tailwind in an Nx workspace

The first step is to install the necessary npm packages.

```bash
yarn add tailwindcss@latest postcss@latest autoprefixer@latest
```

The next step is to create the `tailwind.config.js` as well as `postcss.config.js` files. Tailwind already comes with a utility for that. **Note,** previously we generated our app (named `site`) into the `apps` folder of Nx. Therefore, when generating the Tailwind configuration, we need to cd into that folder.

```bash
cd apps/site
npx tailwindcss init -p 
```

That should generate both of the configuration files directly into the root of our Next.js application.

Make sure you adjust our `postcss.config.js` to properly point to our tailwind config file.

```js
// apps/site/postcss.config.js
const { join } = require('path');

module.exports = {
  plugins: {
    tailwindcss: {
      config: join(__dirname, 'tailwind.config.js'),
    },
    autoprefixer: {},
  },
};
```
## Include the TailwindCSS styles

There are two options for including the Tailwind CSS files:

1. Directly import them in the global `_app.tsx` component
2. Include it in the `styles.css` css file that gets imported by the `_app.tsx` file

**Option 1:**

Open the main Next.js page component `_app.tsx` which functions and import the TailwindCSS file instead of `styles.css`.

```bash
...
import 'tailwindcss/tailwind.css';

function CustomApp({ Component, pageProps }: AppProps) {
  ...
}

export default CustomApp;
```

**Option 2:**

Open `styles.css`, clean all the pre-generated CSS and include the TailwindCSS components there:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`styles.css` gets imported by the `_app.tsx` and thus functions as the global CSS file for our Next.js app. 

Finally also in the `_app.tsx`, remove the header section as we won't need it right now:

```tsx
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to site!</title>
      </Head>
      <div className="app">
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default CustomApp;
```

## Testing the integration

Let's quickly test whether the TailwindCSS integration works by adding the following to our `index.tsx` page component.

```tsx
// apps/site/pages/index.tsx
export function Index() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Ready to dive in?</span>
          <span className="block text-indigo-600">
            Start your free trial today.
          </span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get started
            </a>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
```

The result should look like this

{{<figure url="/blog/assets/imgs/nextjs-nx-series/tailwind-page-preview.png" size="full">}}

## How do we handle Tailwind config files in a monorepo

So far we've placed the Tailwind config within our app root directory (`apps/site`). That makes sense as the app probably knows the Tailwind configs to be designed properly. However, you might also want some more global, cross-app configs. Think about a company design system, where you'll most probably have the same font, maybe even colors etc.

To have a global Nx workspace-wide config we can leverage [Tailwind presets](https://tailwindcss.com/docs/presets). At the Nx workspace root we define a `tailwind-workspace-preset.js`. 

Let's add the [Tailwind Typography package](https://blog.tailwindcss.com/tailwindcss-typography):

```tsx
yarn add @tailwindcss/typography
```

Next, we add it to our `tailwind-workspace-preset.js`

```tsx
// tailwind-workspace-preset.js
module.exports = {
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
```

In order to use the Tailwind preset in our `apps/site` specific Tailwind config, we require the file and add it to the `presets` array of the config.

```tsx
// apps/site/tailwind.config.js

module.exports = {
  presets: [require('../../tailwind-workspace-preset.js')],
  ...
};
```

Note, I've seen people use something like `const { appRootPath } = require('@nrwl/workspace/src/utils/app-root');` and then concatenate it with the actual config file, which obviously also works and gets rid of the relative file import. Importing from `@nrwl/workspace` should be avoided though, and also it is a deep import of a private API that is subject to change.

Using a relative path should be fine here, as the app location will only rarely change.

Verify that your changes work by adding some paragraphs to your `index.tsx`. You can use those mentioned in the [Tailwind Typography repo](https://github.com/tailwindlabs/tailwindcss-typography#usage).

## Tailwind CSS Purging

One of the main advantages of Tailwind is its CSS purging mechanism that allows reducing the final CSS bundle to only the required parts. As a result, you get a small and optimized CSS file. This happens at compile time using the PostCSS configuration.

Right now, if we run `npx nx run site:export`, we'll see that there's quite a large CSS file that gets exported:

{{<figure url="/blog/assets/imgs/nextjs-nx-series/tailwind-css-unpurged.png" size="full">}}

This is because Tailwind during development pulls in all kinds of utility class names which you might never actually need.

### Configure CSS Purging

To enable purging, open the `tailwind.config.js` for the `site` app and add the globs to the `purge` property. For our application `site` it might look as follows:

```jsx
// apps/site/tailwind.config.js
const { join } = require('path');

module.exports = {
  purge: [
    join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}')
  ],
  ...
};
```

One of the particularities and also advantages of Nx is that its setup incentivizes the structuring of your logic into `apps` and `libs` (more [details on the docs](https://nx.dev/latest/react/guides/monorepo-nx-enterprise#apps-and-libs)). As a result, though, our components having Tailwind classes might not only be in the `apps/site/**` but also within libraries in the `libs/**` folder. Naively we could just add those globs as well, like `./libs/**/*.{js,ts,jsx,tsx}`. In a large workspace, this might however lead to unnecessary parsing of files since not all libs might be used by our Next app.

To solve this, we can dynamically calculate the glob pattern based on which `libs` our Next.js app depends on. [Nx has a dependency graph](https://nx.dev/latest/react/structure/dependency-graph), which can not only be used to visualize, but we can also [leverage it in our custom scripts](https://juristr.com/blog/2020/09/use-nx-dep-graph-in-custom-scripts/). Luckily we don't have to create our own script since in **Nx v12.4.0** we added some utility functions that allow us to easily generate glob patterns based on the apps' dependencies.

Change your `tailwind.config.js` to the following:

```jsx
// apps/site/tailwind.config.js
const { join } = require('path');

// available since Nx v 12.5
const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');

module.exports = {
  presets: [require('../../tailwind-workspace-preset.js')],
  purge: [
    join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
```

Note how we import the `createGlobPatternsForDependencies` function from `@nrwl/next/tailwind` and pass it the current directory. What the function does is simply create a list of paths of potential libs our app depends on. For example, consider we depend on a lib `ui` and `core` the resulting generated paths would look like

```tsx
/Users/yourname/juridev/libs/ui/src/**/!(*.stories|*.spec).tsx
/Users/yourname/juridev/libs/core/src/**/!(*.stories|*.spec).tsx
```
_(The exact path obviously depends on your username, Nx workspace name and operating system)_

The glob pattern can be customized by specifying the 2nd parameter of the `createGlobPatternsForDependencies` function.

Finally, to verify the purging works as intended, execute the build or export target on our app (`nx run site:build`). The resulting CSS file should be only a couple of KBs.

{{<figure url="/blog/assets/imgs/nextjs-nx-series/tailwind-css-purged.png" size="full">}}

### Enabling Tailwind JIT

Since purging only happens at build time when you create the deployable bundle, the amount of CSS to load during development might be huge, depending on which TailwindCSS classes you apply to your HTML elements. This might result in an overall slowdown of the debugging tools (e.g. Chrome Devtools).

To mitigate that, the Tailwind team introduced the JIT mode, which (at the time of writing this article) is an experimental feature that can be turned on by adding the `mode: 'jit'` to the Tailwind config

```jsx
// apps/site/tailwind.config.js

module.exports = {
  mode: 'jit',
  ...
};
```

Tailwind's JIT compiler uses its own file watching system, so make sure to set the required environment variables like

- `TAILWIND_MODE` to `watch` to get continuous watching as you have the dev server running and change the Tailwind classes. Set it to `build` for a one-off compilation
- `NODE_ENV` should be set to `production` when doing the final build, s.t. the JIT compiler doesn't watch files, but just does a one-off compilation.

Note that Nx already sets the NODE_ENV to production when you build or export your Next.js app (e.g. using `nx serve site` ).

You can read all the details about JIT mode on the [Tailwind docs](https://tailwindcss.com/docs/just-in-time-mode).

## Conclusion

In this article we learned about

- how to install TailwindCSS into an Nx workspace
- how to configure PostCSS and Tailwind
- how to organize Tailwind config files in a monorepo
- how setup CSS purging with Tailwind and how Nx helps to generate globs for dependent projects

**GitHub repository**  
All the sources for this article can be found in this GitHub repository's branch: https://github.com/juristr/blog-series-nextjs-nx/tree/02-setup-tailwind