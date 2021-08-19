---
type: post
title: Component hydration with MDX in Next.js and Nx
date: 2021-07-08T08:40:00+01:00
lead: Learn how to use Next.js, Nx and Tailwind together
url: /blog/2021/07/component-hydration-nextjs-nx
draft: false
image: /blog/assets/imgs/nextjs-nx-series/next-mdx-bg.jpg
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
In the [previous article](/blog/2021/06/read-render-markdown-nextjs-and-nx/), we explored how to render Markdown with Next.js as well as how Nx can help by moving the markdown-related processing logic into its own library. In this article, we're going to explore how to dynamically hydrate React components with MDX and Next.js.{{</intro>}}

<!--more-->

{{< postad >}}

**Building a blog with Next.js and Nx Series**  
This article is part of a series around building a blog with Nx, Next.js, Tailwind, Storybook and Cypress.

- [Create a Next.js web app with Nx](/blog/2021/06/create-nextjs-webapp-nx)
- [Setup Next.js to use Tailwind with Nx](/blog/2021/06/setup-tailwind-nextjs-and-nx/)
- [Read and render Markdown files with Next.js and Nx](/blog/2021/06/read-render-markdown-nextjs-and-nx/)
-  **Component hydration with MDX in Next.js and Nx**
- [Hot Reload MDX changes in Next.js with Nx](/blog/2021/07/fast-refresh-mdx-files-next-and-nx/)
- [Using Nx Workspace generators to scaffold new blog posts](/blog/2021/07/nextjs-workspace-generator-blog-draft/)
- [Use Storybook with Tailwind in an Nx Workspace](/blog/2021/08/nextjs-storybook-tailwind-nx/)
- [Use Cypress with Next.js and Nx to battle test your React Components](/blog/2021/08/nextjs-storybook-cypress-nx/)
-  Publishing a Next.js site to Vercel with Nx _(soon)_

_Check back later, [follow me on Twitter](https://twitter.com/juristr) or [subscribe to the Newsletter](/newsletter) to get updates about upcoming articles_

{{<toc>}}

Markdown already gives a lot of flexibility in that you can use both, the Markdown syntax as well as plain HTML for links or embedded content. Many of the common static site generators such as [Jekyll](https://jekyllrb.com/) and [Hugo](https://gohugo.io/) (just to name a few), provide so-called "includes". These are basically snippets or macros that get executed during the static site generation and usually produce a piece of HTML that gets embedded into the existing markdown rendered content. Take for instance the following Hugo snippet which allows to embed an [Egghead.io](http://egghead.io) video into a page.

```html
<!-- egghead-lesson.html -->

<div class="egghead-video-embed">
    <iframe src="https://egghead.io/{{ .Get "uid" }}/embed" width="100%" height="500px" loading="lazy"> </iframe>
    <a href="https://egghead.io/{{ .Get "uid" }}" class="external-link" data-client="eggheadio" data-uid="{{ .Get "uid" }}">View on Egghead.io</a>
</div>
```

Within the markdown content, it can be used as follows:

```markdown
## Styling Angular HTML Elements

This is a recent video lesson I created:

{ {<egghead-lesson uid="lessons/style-html-elements-in-angular-using-the-style-property" >}}
```

If we want to implement something similar with Next.js, the closest we’d go with is probably [MDX](https://mdxjs.com/).

It basically is like JSX but allowing you to embed React components into a Markdown file.

## Generate a Youtube Component

Let's create a Youtube component that we can easily embed in our Markdown articles. 

To host the code for our components we could simply create a folder “components” within the Next.js app `site`to host all these reusable components. However, as we previously discussed, Nx recommends to move logic to the `libs` folder. Also, given these components are most probably highly reusable, and could also be used in other Next.js or React apps which might live in our Nx workspace (now or in the future), we're going to create a Nx React library under the `libs/shared` folder.

```bash
npx nx g @nrwl/react:lib mdx-elements --directory=shared --style=css
```

> Note, we use the `—directory` flag and pass `shared` to it because we want our new library to live within that subfolder. Using this flag allows you to futher structure your libs folder into some app specific features or components and more generally reusable ones.

This command should generate the following structure:

{{<figure url="/blog/assets/imgs/nextjs-nx-series/mdx-lib-folderdir.png" size="small">}}

> Note, apart from using [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) to visually construct these commands, you can also always append `--dry-run` to see what the command would produce, without actually writing anything to the file system.

The Nx React library generator already adds a default component `shared-mdx-elements`. We can remove it as we're not going to require it. That said, you can also directly append `-no-component` to the generator command to not have this default component generated.

We want to generate a new React component `youtube` into our `mdx-elements` library. Again we can use Nx.

Using Nx Console, we search for "React component"

{{<figure url="/blog/assets/imgs/nextjs-nx-series/nx-console-react-component.png" size="full">}}

And we fill in the necessary details into the form:


{{<figure url="/blog/assets/imgs/nextjs-nx-series/nx-console-react-cmp-detail.png" size="full">}}

In the terminal you can also see the according command that would have led to the same result:

```bash
npx nx generate @nrwl/react:component --name=Youtube --project=shared-mdx-elements --no-interactive 
```

Finally, let's implement the component.

```tsx
// libs/shared/mdx-elements/src/lib/youtube/youtube.tsx
import './youtube.module.css';

export interface YoutubeProps {
  title: string;
  uid: string;
}

export function Youtube(props: YoutubeProps) {
  return (
    <div className="youtube-embed">
      <iframe
        src={`https://www.youtube.com/embed/${props.uid}`}
        width="100%"
        height="500px"
        title={props.title}
      ></iframe>
    </div>
  );
}

export default Youtube;
```

In addition, we create a new file `mdx-elements.ts` to group all the components we want to use within our MDX files and export them.

```tsx
// libs/shared/mdx-elements/src/lib/mdx-elements.ts
import { Youtube } from './youtube/youtube';

export const mdxElements = {
  Youtube,
};
```

Note, you can also re-map the components, like

```tsx
export const mdxElements = {
	video: Youtube
}
```

With this change, you basically created an "alias" and hence you could use `<video...>` in your markdown file rather than `<Youtube ...>`.

In order to be able to use our `mdxEements` and import it from within other JavaScript modules, we export them in the `index.ts` file of our library, which represents our public API for other libs and apps within our Nx workspace. We will need those `mdxElements` later in the article.

```tsx
// libs/shared/mdx-elements/src/index.ts
export * from './lib/mdx-elements';
```

With that, we can now import them in other components like

```tsx
import { mdxElements } from '@juridev/shared/mdx-elements';
```

Alright, our shared components we want to use within our Markdown files are ready now. But before being able to use them, we need to make a couple of changes to our current Markdown rendering implementation. Mainly we now need to make sure these embedded components get hydrated properly.

## MDX options with Next.js

Now that we have a component to use in our MDX content, let's actually implement the loading of MDX files with Next.js.

As of writing this article there are basically two options for using MDX with Next.js

- `@next/mdx`
- `next-mdx-remote`

From the [official Next.js docs](https://nextjs.org/blog/markdown):

> To use MDX with Next.js, your approach will differ based on your data source location. For local content, you can use the `@next/mdx` package. This allows you to create pages directly with the `.mdx` extension inside your pages/ folder. For remote data, one option is to use `next-mdx-remote` (a community project) to fetch your Markdown content inside getStaticProps / getStaticPaths.

In this article I'll use `next-mdx-remote`, not necessarily because we're loading it remotely but we have an `_article` folder outside our `pages` folder, which we want to load in our `getStaticProps` page.

## Install dependencies

First of, let's install a couple of libraries which we're gonna need as we develop this new functionality.

```tsx
yarn add next-mdx-remote 
yarn add next-remote-watch
```

## Render MDX files to HTML

We don't need to change anything in our `GetStaticProps` function in `apps/site/pages/articles/[slug].txs` . That's because we previously extracted all markdown rendering logic into a dedicated library located in `libs/markdown`. That's where the change is going to happen.

Open  `libs/markdown/src/lib/markdown.ts` which is where we have our `renderMarkdown` function. Right now we're calling `markdownToHtml` which lives in a separate file in our library that uses `remark`. We can delete `libs/markdown/src/lib/markdownToHtml.ts` entirely as we won't need any more and remove the two packages from our dependencies:

```tsx
yarn remove remark
yarn remove remark-html
```

Furthermore, our `renderMarkdown` function is going to be very simple, by just importing the `serialize` function from `next-mdx-remote/serialize` and passing the content to it:

```tsx
// libs/markdown/src/lib/markdown.ts
...
import { serialize } from 'next-mdx-remote/serialize';

...

export const renderMarkdown = (markdownContent: string) => {
  return serialize(markdownContent || '');
};
```

We also now don't return HTML anymore, but rather a `MDXRemoteSerializeResult` type. Let's adjust the interface in `types.ts`

```tsx
// libs/markdown/src/lib/types.ts

import { MDXRemoteSerializeResult } from 'next-mdx-remote';
...
export interface MarkdownRenderingResult {
  frontMatter: FrontMatter;
  html: MDXRemoteSerializeResult;
}
```

## Rehydrating components with MDX

Inside the React page component, we can then use that `mdxSource` (note that it gets exported as `html` inside `props`) to rehydrate the react components potentially present in the MDX content.

```tsx
// apps/site/pages/articles/[slug].tsx

...
import { MDXRemote } from 'next-mdx-remote';
import { mdxElements } from '@juridev/shared/mdx-elements';

...

export function Article({ frontMatter, html }) {
  return (
    <div className="md:container md:mx-auto">
      <article>
        <h1 className="text-3xl font-bold hover:text-gray-700 pb-4">
          {frontMatter.title}
        </h1>
        <div>by {frontMatter.author.name}</div>
        <hr />

        <MDXRemote {...html} components={mdxElements} />
      </article>
    </div>
  );
}
```

Note the `MDXRemote` component we now use to embed the content into our page as well as the components we pass to the `MDXRemote` which are those we want to have hydrated.

To finally see the hydrated component, let's **rename** our `*.md` files to `*.mdx` which is the usual extension you'd use for MDX files. By doing that we also need to make sure to change the file extensions in 

- `libs/markdown/src/lib/markdown.ts:getParsedFileContentBySlug` function which currently reads the posts by searching for just `md` files.
`const postFilePath = join(postsPath, ${slug}.mdx);`
- `apps/site/pages/articles/[slug].tsx:getStaticPaths` where we clean the file extension. We should change it to `.map((path) => path.replace(/\.mdx?$/, ''))`

Finally, we should now be able to use the Youtube component we initially created in our `_articles/dynamic-content.mdx` file.

```tsx
---
title: 'Dynamic Routing and Static Generation'
excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus.'
date: '2020-03-16T05:35:07.322Z'
author:
  name: JJ Kasper
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel ...

<Youtube uid="9nDjLYXBCYM" title="Nx for React in under 3 minutes" />
```

R**unning our blog** should now properly embed the Youtube video:

{{<figure url="/blog/assets/imgs/nextjs-nx-series/mdx-component-rendering.png" size="full">}}

## Interesting next-mdx-remote and Next.js features

### Dynamic loading of components

Next.js also supports [dynamic loading of components](https://nextjs.org/docs/advanced-features/dynamic-import), using the `dynamic` function

```tsx
import dynamic from 'next/dynamic'
```

In our `libs/shared/mdx-elements/src/lib/mdx-elements.ts` we could rewrite our import to use the dynamic loading feature

```tsx
import dynamic from 'next/dynamic';

// import { Youtube } from './youtube/youtube';

export const mdxElements = {
  Youtube: dynamic(() => import('./youtube/youtube')),
};
```

[This GitHub example](https://github.com/vercel/next.js/tree/canary/examples/with-mdx-remote#conditional-custom-components) from the official docs explains how this could be used together with `next-mdx-remote` to conditionally load heavy components, only when they are present in the Markdown. This is really handy when you have components loaded on just some pages and you wouldn't want to instantiate them always again, but rather just when they're used.

```tsx
// https://github.com/vercel/next.js/tree/canary/examples/with-mdx-remote
import dynamic from 'next/dynamic'
import Test from '../components/test'

const SomeHeavyComponent = dynamic(() => import('SomeHeavyComponent'))

const defaultComponents = { Test }

export function SomePage({ mdxSource, componentNames }) {
  const components = {
    ...defaultComponents,
    SomeHeavyComponent: componentNames.includes('SomeHeavyComponent')
      ? SomeHeavyComponent
      : null,
  }

  return <MDXRemote {...mdxSource} components={components} />
}
```

### Overriding existing HTML elements

Not only can we define new elements, but we can also override existing HTML elements. That way, for instance, we could override all links (`<a>` tags) on the page to add custom behavior to them. Let's try.

First we create a new component which we can generate again:

```bash
npx nx generate @nrwl/react:component --name=CustomLink --project=shared-mdx-elements --style=css
```

And we implement it as follows:

```tsx
// libs/shared/mdx-elements/src/lib/custom-link/custom-link.tsx

import Link from 'next/link';
import './custom-link.module.css';

export interface CustomLinkProps {
  as: string;
  href: string;
}

export function CustomLink({ as, href, ...otherProps }: CustomLinkProps) {
  return (
    <Link as={as} href={href}>
      <a {...otherProps} />
    </Link>
  );
}

export default CustomLink;
```

Again in the `mdx-elements.tsx` we map it:

```tsx
import { MdxRemote } from 'next-mdx-remote/types';
import dynamic from 'next/dynamic';

import { CustomLink } from './custom-link/custom-link';

export const mdxElements: MdxRemote.Components = {
  a: CustomLink,
  Youtube: dynamic(() => import('./youtube/youtube')),
};
```

As a result, for every `<a>` tag in the rendered HTML, our custom `CustomLink` React component will be instantiated and will allow us to manipulate the logic. Obviously, this also works with any other HTML element.

## Conclusion

In this article, we learned:

- About the various MDX options we have with Next.js
- How to use Nx to generate a React library in our workspace as well as React components
- How to organize our components and export them s.t. they can be consumed from our Next.js application
- How to adjust the markdown rendering to add MDX support

See also:

- [https://nextjs.org/blog/markdown](https://nextjs.org/blog/markdown)
- [https://github.com/vercel/next.js/tree/canary/examples/with-mdx-remote](https://github.com/vercel/next.js/tree/canary/examples/with-mdx-remote)

**GitHub repository**  
All the sources for this article can be found in this GitHub repository's branch: https://github.com/juristr/blog-series-nextjs-nx/tree/04-dynamic-markdown-mdx