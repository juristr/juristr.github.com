---
type: post
title: Read and render MD files with Next.js and Nx
date: 2021-06-23T08:40:00+01:00
lead: Learn how to use Next.js, Nx and Tailwind together
url: /blog/2021/06/read-render-markdown-nextjs-and-nx
draft: false
image: /blog/assets/imgs/nextjs-nx-series/bg-nextjs-md-rendering.jpg
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
In the previous article, we looked into how to setup [Tailwind with Next.js and Nx workspace](/blog/2021/06/setup-tailwind-nextjs-and-nx).
In this article we are going to learn how to use Next.js to read files from the file system, to parse the Markdown, and to render it to HTML. In particular, we're going to see how Nx helps us generate code and organize the features into Nx libraries. Rendering Markdown files is an essential part of creating a JAMStack application. For our blog platform, we are going to write articles in Markdown, which should then be parsed and rendered properly.
{{</intro>}}

<!--more-->

{{< postad >}}

**Building a blog with Next.js and Nx Series**  
This article is part of a series around building a blog with Nx, Next.js, Tailwind, Storybook and Cypress.

- [Create a Next.js web app with Nx](/blog/2021/06/create-nextjs-webapp-nx)
- [Setup Next.js to use Tailwind with Nx](/blog/2021/06/setup-tailwind-nextjs-and-nx/)
- **Read and render Markdown files with Next.js and Nx**
- [Component hydration with MDX in Next.js and Nx](/blog/2021/07/component-hydration-nextjs-nx)
- [Hot Reload MDX changes in Next.js with Nx](/blog/2021/07/fast-refresh-mdx-files-next-and-nx/)
- [Using Nx Workspace generators to scaffold new blog posts](/blog/2021/07/nextjs-workspace-generator-blog-draft/)
- [Use Storybook with Tailwind in an Nx Workspace](/blog/2021/08/nextjs-storybook-tailwind-nx/)
-  Use Cypress with Next.js and Nx to battle test your React Components _(soon)_
-  Publishing a Next.js site to Vercel with Nx _(soon)_

_Check back later, [follow me on Twitter](https://twitter.com/juristr) or [subscribe to the Newsletter](/newsletter) to get updates about upcoming articles_

{{<toc>}}

## Install dependencies

First of all, let's install a couple of libraries which we're gonna need as we develop this new functionality.

```bash
$ yarn add gray-matter add remark remark-html
```

## Create the markdown file

We want to have all of our article markdown files in a single `_articles` directory at the root of our workspace. For now, let's keep things simple and place a single markdown demo file there: `_articles/dynamic-routing.md`.

```markdown
---
title: 'Dynamic Routing and Static Generation'
excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus.'
date: '2020-03-16T05:35:07.322Z'
author:
  name: JJ Kasper
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus. Praesent elementum facilisis leo vel fringilla. Congue mauris rhoncus aenean vel. Egestas sed tempus urna et pharetra pharetra massa massa ultricies.

## Lorem Ipsum

Tristique senectus et netus et malesuada fames ac turpis. Ridiculous mus mauris vitae ultricies leo integer malesuada nunc vel. In mollis nunc sed id semper. Egestas tellus rutrum tellus pellentesque. Phasellus vestibulum lorem sed risus ultricies tristique nulla. Quis blandit turpis cursus in hac habitasse platea dictumst quisque. Eros donec ac odio tempor orci dapibus ultrices. Aliquam sem et tortor consequat id porta nibh. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. Diam vulputate ut pharetra sit amet. Ut tellus elementum sagittis vitae et leo. Arcu non odio euismod lacinia at quis risus sed vulputate.
```

## Next.js Fundamentals - Data Handling

Before we dive straight into the loading, parsing and rendering of our Markdown file, let’s first go through some of the fundamentals that we need to understand first.

There are three functions that play a major role when it comes to data fetching in Next.js:

- `getStaticProps` - (Static Generation) to fetch data at build time
- `getStaticPaths` - (Static Generation) to specify dynamic routes that get prerendered at build-time.
- `getServerSideProps` - (Server-side Rendering) to fetch data on each request

To get started, for our blog platform we mostly need the first two. You can read all the details on the [official Next.js docs](https://nextjs.org/docs/basic-features/data-fetching). But let’s quickly go over the main parts.

### GetStaticProps

If our Next.js page has an `async` export named `getStaticProps`, that page is pre-rendered with the information returned by that function.

```tsx
export const getStaticProps: GetStaticProps = async (context) => {
  // your logic  

  return {
    props: {}
  }
});
```

The context object is well defined and has a couple of useful properties. The most important one in our case is the `params` property. It is the one that contains the route parameters when rendering dynamic routes. All the data is passed from the `getStaticPaths` function which we'll see next.

There are other properties that are being passed to the `getStaticProps` function. Read all about it [on the docs](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation).

### GetStaticPaths

Whenever we have [a dynamic Next.js route](https://nextjs.org/docs/routing/dynamic-routes), we need to get the path of the route to find the corresponding markdown file. If we don't implement it, we get the following error:

{{<figure url="/blog/assets/imgs/nextjs-nx-series/error-static-paths.png" size="full">}}

The `getStaticPaths` needs to return a list of paths that need to be rendered to HTML at build time.

Say we have a file `pages/articles/[slug].tsx` and we invoke the URL `/articles/dynamic-routes`. 

We have our Markdown articles in the `_articles` directory. Say we have a file `dynamic-routing.mdx` and `nextjs-update.mdx`. To target a given article, our URL will be `/articles/<filename>`. As such, the `getStaticPaths` should return all these so-called "slug" entries in the following form:

```
[
  { "params": { "slug": "dynamic-routing" } },
  { "params": { "slug": "nextjs-update" } }
]
```

We're going to explore the detailed implementation in a minute.

### GetServerSideProps

Use this function if you want to dynamically render pages for each request. The props returned from this function will directly get passed to the React component. Obviously using this function means you need to deploy your Next.js app on an environment that supports running a Node server. You cannot use this if you plan to deploy your site statically to some CDN.

## Generate our Next.js page to render Articles

The first step to rendering our Markdown articles is to create a new Next.js page that does the rendering. If you already followed one of the [previous article of this series](/blog/2021/06/create-nextjs-webapp-nx/) you should already have a `apps/site/pages/articles/[slug].tsx` file.

Alternatively, you can generate it now. Instead of manually creating the file, use Nx to generate it. The goal is to generate a file `apps/site/pages/articles/[slug].tsx`. `[slug]` in particular, because that is the dynamic part.

```tsx
npx nx generate @nrwl/next:page --name=[slug] --project=site --directory=articles
```

If you are not the console type of person, you can use [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) for VSCode to generate the Next.js page.

{{<figure url="/blog/assets/imgs/nextjs-nx-series/generate-nextjs-page.png" size="full">}}

Select `@nrwl/next - page` as the generator from the command menu. 


{{<figure url="/blog/assets/imgs/nextjs-nx-series/generate-nextjs-page-details.png" size="full">}}

When you're ready to generate, click the "Run" button.

Let's adjust the generated CSS module file from `[slug].module.css` into `articles.module.css` and adjust the import on the `[slug].tsx`

```tsx
// articles/[slug].tsx
import styles from './articles.module.css';

...
```

## Retrieve a list of paths

As we've learned in the previous section about the Next.js Data Handling basics, we need to implement the `getStaticPaths` function for our dynamic `articles/[slug].tsx` route.

The user should be able to enter `/article/<some-title>` where for simplicity, `some-title` corresponds to the name of our file.

> Note, you might want to have some `url` property in your article [frontmatter](https://assemble.io/docs/YAML-front-matter.html) to guard yourself against breaking existing links if you rename your file.

Here's the implementation:

```tsx
// apps/site/pages/articles/[slug].tsx
import fs from 'fs';
import { join } from 'path';
...
interface ArticleProps extends ParsedUrlQuery {
  slug: string;
}

const POSTS_PATH = join(process.cwd(), '_articles');

...

export const getStaticPaths: GetStaticPaths<ArticleProps> = async () => {
  const paths = fs
    .readdirSync(POSTS_PATH)
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
```

## Read and Parse the Markdown file content

Now that we have the list of paths provided by `getStaticPaths`, we retrieve the actual content in the `getStaticProps` function. 

We need to:

- Read the content of the markdown file from the file system
- Parse the Markdown and according frontmatter
- Convert the Markdown content into HTML
- Pass the rendered HTML and frontmatter data to the React component

### Generate a Nx library to handle Markdown operations

We wouldn't want to have all logic of reading, parsing and rendering markdown within our `getStaticProps` function. In Nx the recommendation is to move most of the logic into your `libs` . This makes your functionality more reusable and helps define a clearer API from the get go, compared when you're just placing things in a simple folder.

```tsx
npx nx generate @nrwl/workspace:lib --name=markdown
```

We use the simple Nx workspace library which comes with just TypeScript support and does not have any framework specific setup. We could also use `@nrwl/node` and generate a Node library that already comes with the Node types and more. But it is pretty quick to adjust the Nx workspace library `tsconfig.lib.json` to add `node` to the `types` array as well as adding `allowSyntheticDefaultImports` (read more on the [TS docs](https://www.typescriptlang.org/tsconfig#allowSyntheticDefaultImports)).

```json
// libs/markdown/src/tsconfig.lib.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    ...
    "allowSyntheticDefaultImports": true,
    "types": ["node"]
  },
  ...
}
```

### Read and parse Markdown

In our new `markdown` lib, let's create a new `markdown.ts` file. First we create a new function `getParsedFileContentBySlug` which given a `slug` (e.g. `dynamic-routing`) reads the `_articles/dynamic-routing.mdx` file.

```tsx
// libs/markdown/src/lib/markdown.ts
import fs from 'fs';
import { join } from 'path';
...

export const getParsedFileContentBySlug = (
  slug: string,
  postsPath: string
) => {

  const postFilePath = join(postsPath, `${slug}.mdx`);
  const fileContents = fs.readFileSync(postFilePath);

  ...
};
```

As you can see, we get the `slug` and article MD files location `postsPath` as params and simply use Node.js API to read from the file system.

Next we use `gray-matter` to parse the Markdown content into the frontmatter and actual content piece.

```tsx
// libs/markdown/src/lib/markdown.ts

import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export const getParsedFileContentBySlug = (
  slug: string,
  postsPath: string
) => {

  const postFilePath = join(postsPath, `${slug}.mdx`);
  const fileContents = fs.readFileSync(postFilePath);

  const { data, content } = matter(fileContents);

  return {
    frontMatter: data,
    content,
  };
};
```

Given we're using TypeScript, let's enhance our signatures with some TypeScript interfaces. For that, create a new file `markdown-document.ts` :

```tsx
// libs/markdown/src/lib/types.ts
export interface FrontMatter {
  [prop: string]: string;
}

export interface MarkdownDocument {
  frontMatter: FrontMatter;
  content: string;
}
```

And consequently add it as return type:

```tsx
// libs/markdown/src/lib/markdown.ts
...
import { MarkdownDocument } from './types';

export const getParsedFileContentBySlug = (
  slug: string,
  postsPath: string
): MarkdownDocument => {

  ...

  return {
    frontMatter: data,
    content,
  };
};
```

We can now call `getParsedFileContentBySlug` from the `getStaticProps` function in our `articles/[slug].tsx` file of the Next.js app. First we need to make sure to **export the functions and required types** from our Nx library.

```tsx
// libs/markdown/src/index.ts
export * from './lib/types';
export * from './lib/markdown';
```

> **Note:** The `index.ts` of every Nx library is like a public API for the other workspace projects. **Only** what gets exported via this public API can be shared and used by others. The fact that you have to think about what to expose and what not, implicitly leads to a better architectural design (compared to for instance just a folder structure).

Then, in our `[slug].tsx` invoke the function from the `getStaticProps`. We can simply import them from `@juridev/markdown` as if it was an external NPM package. This is thanks to the TypeScript paths mappings, which Nx automatically added to the `tsconfig.base.json` when we generated the library. 

```tsx
// apps/site/pages/articles/[slug].tsx
import {
  getParsedFileContentBySlug
} from '@juridev/markdown'

...


export const getStaticProps: GetStaticProps<ArticleProps> = async ({
  params,
}: {
  params: ArticleProps;
}) => {
  // read markdown file into content and frontmatter
  const articleMarkdownContent = getParsedFileContentBySlug(
    params.slug,
    POSTS_PATH
  );

  return {
    props: {
      slug: params.slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths<ArticleProps> = async () => {...}
```

With that we have the Markdown content loaded. We now need to convert the Markdown into HTML.

> Note, how we can directly call Node APIs (e.g. from within our  `getParsedFileContentBySlug` ) and directly invoke such functions from the `getStaticProps` and `getStaticPaths` functions. This is because both, `getStaticProps` and `getStaticPaths` run at build-time, thus in a Node environment.

### Convert Markdown to HTML

Again, we make use of our `markdown` lib in `libs/markdown` of our Nx workspace.

We accomplish the HTML rendering itself with `remark`. The logic for that is private to our `markdown` lib meaning we don't export it in our `libs/markdown/src/index.ts`. This is simply because it is an implementation detail how and with which library we render our Markdown.

Let's create a new `markdownToHtml.ts` file in the `libs/markdown` lib of our workspace.

```tsx
//libs/markdown/src/lib/markdownToHtml.ts
import remark from 'remark';
import html from 'remark-html';

export async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}
```

Let's call the public API function `renderMarkdown` and define it in the `markdown.ts` file of our lib. We can call the `markdownToHtml` function directly from there.

```tsx
// libs/markdown/src/lib/markdown.ts
...

export const renderMarkdown = async (
  markdownContent: string
): Promise<string> => {
  return await markdownToHtml(markdownContent || '');
};
```

Finally, we can wrap everything up and call our `renderMarkdown` from the `[slug].tsx` as well. Here's the full code:

```tsx
// apps/site/pages/articles/[slug].tsx
import {
  getParsedFileContentBySlug,
  MarkdownRenderingResult,
  renderMarkdown,
} from '@juridev/markdown'
import fs from 'fs';
import { join } from 'path';
import { GetStaticPaths, GetStaticProps } from 'next';

...
export const getStaticProps: GetStaticProps<MarkdownRenderingResult> = async ({
  params,
}: {
  params: ArticleProps;
}) => {
  // read markdown file into content and frontmatter
  const articleMarkdownContent = getParsedFileContentBySlug(
    params.slug,
    POSTS_PATH
  );

  // generate HTML
  const renderedHTML = await renderMarkdown(articleMarkdownContent.content);

  return {
    props: {
      frontMatter: articleMarkdownContent.frontMatter,
      content: renderedHTML
    },
  };
};

export const getStaticPaths: GetStaticPaths<ArticleProps> = async () => {...}
```

You might have noticed the `MarkdownRenderingResult` type. We define it in our `markdown` lib's `type.ts` file as well:

```tsx
// libs/markdown/src/lib/types.ts

export interface FrontMatter { ... }

export interface MarkdownRenderingResult {
  frontMatter: FrontMatter;
  html: string;
}
```

Next section rendering the content with our React component.

## Render the article

We have all data prepared now and can basically just take care of the rendering. I'm not going to create a fully styled rendering of an article (I'll leave that to you ;)).

```tsx
// pages/articles/[slug].tsx

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

        <main dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </div>
  );
}
```

By navigating to `/articles/dynamic-routing` you should see something like the following:

{{<figure url="/blog/assets/imgs/nextjs-nx-series/rendered-markdown-page-preview.png" size="full">}}

## Visualize our Nx Workspace

Now that we have our pyarage rendered, let's have a look at how our Nx workspace looks from a code organization perspective. Nx has a handy feature called the "[Dependency Graph](https://nx.dev/latest/react/structure/dependency-graph)". To visualize it, run

```bash
npx nx dep-graph
```

You should see the rendering of our app `site` and library `markdown`.

{{<figure url="/blog/assets/imgs/nextjs-nx-series/dep-graph-markdownlib.png" size="full">}}

## Conclusion

We've covered quite a lot in this article.

- Next.js Data fetching basics
- How to read and parse markdown files
- How to extract our logic for the reading, parsing and rendering of our Markdown into a dedicated Nx library
- How to reference our Nx `markdown` lib from our Next.js page
- How you can visualize your Nx workspace with the `dep-graph` feature

**GitHub repository**  
All the sources for this article can be found in this GitHub repository's branch: https://github.com/juristr/blog-series-nextjs-nx/tree/03-render-md-nextjs