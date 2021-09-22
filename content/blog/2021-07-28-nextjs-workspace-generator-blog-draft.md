---
type: post
title: Using Nx Workspace generators to scaffold new blog posts
date: 2021-07-28T08:40:00+01:00
lead: Learn how to use Next.js, Nx and Tailwind together
url: /blog/2021/07/nextjs-workspace-generator-blog-draft/
draft: false
image: /blog/assets/imgs/nextjs-nx-series/workspace-gen-bg.jpg
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
In the [previous article](/blog/2021/07/fast-refresh-mdx-files-next-and-nx/) we talked about how to leverage Nx capabilities to create a custom Next server that allows us to perform a fast refresh not only when our React components change, but also whenever we change something in our MDX files. This is especially interesting as we're writing a new article and want to see the changes live immediately in our browser. This week we'll continue by looking at how to leverage Nx Workspace generators to scaffold new blog drafts.
{{</intro>}}

<!--more-->

{{< postad >}}

**Building a blog with Next.js and Nx Series**  
This article is part of a series around building a blog with Nx, Next.js, Tailwind, Storybook and Cypress.

- [Create a Next.js web app with Nx](/blog/2021/06/create-nextjs-webapp-nx)
- [Setup Next.js to use Tailwind with Nx](/blog/2021/06/setup-tailwind-nextjs-and-nx/)
- [Read and render Markdown files with Next.js and Nx](/blog/2021/06/read-render-markdown-nextjs-and-nx/)
- [Component hydration with MDX in Next.js and Nx](/blog/2021/07/component-hydration-nextjs-nx/)
- [Hot Reload MDX changes in Next.js with Nx](/blog/2021/07/fast-refresh-mdx-files-next-and-nx/)
- **Using Nx Workspace generators to scaffold new blog posts**
- [Use Storybook with Tailwind in an Nx Workspace](/blog/2021/08/nextjs-storybook-tailwind-nx/)
- [Use Cypress with Next.js and Nx to battle test your React Components](/blog/2021/08/nextjs-storybook-cypress-nx/)
- [Publishing a Next.js app to Vercel with Nx](/blog/2021/09/nextjs-deploy-vercel-with-nx/)

_Check back later, [follow me on Twitter](https://twitter.com/juristr) or [subscribe to the Newsletter](/newsletter) to get updates about upcoming articles_

{{<toc>}}

As software developers, we write a lot of code and some of it is repetitive. Hopefully not from the point of view of the actual logic performed by the code, but related to the boilerplate part of it. Things like setting up a new React component, which involves a couple of activities, such as

- Creating a new file in a given directory
- Create the actual function that defines the React component in that file
- Create the corresponding props typings (if you're using TypeScript)
- Create a dedicated CSS file for the React component, especially if you use [CSS modules](https://github.com/css-modules/css-modules)
- *(and potentially more)*

This is a lot of repetitive code, just to get started at writing the actual logic. The point here is not necessarily just about the burden of writing the code itself, but we also want to have consistency in the naming of the files, the CSS modules and obviously the setup of the components themselves. This dramatically helps to lower friction, facilitates collaboration among developers and thus allows us to scale much easier as more teams onboard our project or even monorepo.

## Built-in Nx Generators

Nx already comes with lots of generators built-in. In fact, we've already covered and used some of these in the past articles, such as in the article when we talked about reading and rendering MD files and we generated a new Next.js page with the following command.

```
npx nx generate @nrwl/next:page --name=slug --project=site --directory=articles
```

This particular generator comes shipped with `@nrwl/next` so you can use it straight away. 

Similarly, we generated a new library in that very same article with

```
npx nx generate @nrwl/workspace:lib --name=markdown
```

or new React components in the article about [component hydration](https://blog.nrwl.io/component-hydration-with-mdx-in-next-js-and-nx-90f46ea0431c):

```
npx nx generate @nrwl/react:component --name=Youtube --project=shared-mdx-elements --no-interactive
```

As you can see, Nx generators **not only scaffold files** but are able to generate entire folder structures, register new Nx libraries or create/update source and configuration files. This makes working overall much more pleasant.

> **Pro tip:** if you're using VSCode, make sure to [install Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) as it allows you to have a visual UI for discovering and running such generators (and more).

## What is a Workspace Generator?

*Official Nx docs guide: [https://nx.dev/latest/react/generators/workspace-generators](https://nx.dev/latest/react/generators/workspace-generators)*

While there are lots of built-in generators, we can also create specific Nx workspace generators. Those are particularly useful as we can tailor them to our own needs within the Nx workspace. 

Again, this is all about automation, consistency and compliance. Example use case: assume we have specific corporate guidelines on how a React component should look like. We can have docs that describe it, but we all know devs are lazy and don't read docs. Hence, we can create an Nx workspace generator that runs the existing Nx built-in React component generator but then also modifies the result to match the internal compliance rules.

In our example of creating a blog platform (or personal portfolio site) with Nx and Next.js, the most immediate example of automating our setup is to scaffold new blog drafts such as creating the actual markdown file and pre-generating the Markdown Front Matter.

## Generating a new workspace generator with Nx

Obviously, we want to generate our new Nx workspace generator and we can do that with the following command:

```
npx nx g @nrwl/workspace:workspace-generator new-article
```

This creates a new folder in `tools/generators/new-article` with an `index.ts` and a `schema.json` file.

{{<figure url="/blog/assets/imgs/nextjs-nx-series/workspace-generator-fs-tree.png" size="medium">}}

### Adjusting the `schema.json`

Let's first have a look at the `schema.json` file. This describes the metadata of our generator. It allows Nx to discover the generator, provides metadata such as the possible argument the generator takes for validation purpose or for dynamically rendering a UI like [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) does.

In our case, a new blog draft has the following Markdown Front Matter:

```
---
title: 'Dynamic Routing and Static Generation'
excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus.'
date: '2020-03-16T05:35:07.322Z'
author:
  name: JJ Kasper
---
```

Hence, our generator needs to take the following arguments:

- `title`
- `author.name`

The date can be autogenerated to the current one. We could optionally also take the `excerpt`, but since it might tend to be a longer paragraph and only be written at a later stage of writing the blog article, we can leave it out for now.

Open the `tools/generators/new-article/schema.json` and adjust the schema to match our requirements.

```json
// tools/generators/new-article/schema.json
{
  "cli": "nx",
  "id": "new-article",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "The title of the blog post",
      "$default": {
        "$source": "argv",
        "index": 0
      }
    },
    "author": {
      "type": "string",
      "description": "The name of the author"
    },
    "excerpt": {
      "type": "string",
      "description": "An excerpt that summarizes the blog post in a single line"
    }
  },
  "required": ["title", "author"]
}
```

Note how "title" and "author" are required entries. Nx validates all the passed arguments when executing the generator based on this metadata, so you don't have to worry about it.

Next, open the `tools/generators/new-article/index.ts` and let's create a matching TypeScript interface `NewArticleSchemaOptions` to work with in the generator itself:

```tsx
// tools/generators/new-article/index.ts
import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

interface NewArticleSchemaOptions {
  title: string;
  author: string;
  excerpt?: string;
}

export default async function (host: Tree, schema: NewArticleSchemaOptions) {
  await libraryGenerator(host, { name: schema.title });
  await formatFiles(host);
  return () => {
    installPackagesTask(host);
  };
}
```

We can leave the rest of the file content untouched. This is mostly a generate example that shows common tasks

- Invoke another built-in generator, such as the `libraryGenerator(...)`
- `formatFiles(host)` shows how to invoke the Nx built-in file formatting task which uses the Nx workspace prettier configuration. This is especially useful if you modify or generate new files into your workspace
- `() => { installPackagesTask(host) }` shows the ability to return a callback, that will be invoked only at the very end when the generator is executed (and not in [dry-run mode](https://nx.dev/latest/react/cli/generate#dryrun)).

## Scaffolding a new file and adding the Markdown Front Matter

As a first step, create a new folder `files` in `tools/generators/new-article`. This folder hosts the actual files we want to generate.

Next, create a file with the following name within that folder: `__normalizedTitle__.mdx`. `__normalizedTitle__` is a variable that will be replaced with the actual value when we execute our workspace generator.

Add the following content to the template file:

```tsx
// tools/generators/new-article/files/__normalizedTitle__.mdx
---
title: '<%= title %>'
excerpt: ''
date: '<%= creationDate %>'
author:
  name: <%= author %>
---

Here goes your awesome content 🔥
```

Now let's implement the actual [logic.](http://logic.In) Most of the utilities we're using come from the `@nrwl/devkit` which is the core part for creating Nx generators and [executors](https://nx.dev/latest/react/executors/creating-custom-builders).

In order to generate files, we can use the `generateFiles(..)` function coming from `@nrwl/devkit`and pass in the required data.

```tsx
// tools/generators/new-article/index.ts
import {
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
  Tree,
} from '@nrwl/devkit';

interface NewArticleSchemaOptions {
  title: string;
  author: string;
  excerpt?: string;
}

export default async function (host: Tree, schema: NewArticleSchemaOptions) {
  generateFiles(
    // virtual file system
    host,

    // the location where the template files are
    joinPathFragments(__dirname, './files'),

    // where the files should be generated
    './_articles',

    // the variables to be substituted in the template
    {
      title: schema.title,
      author: schema.author,
      excerpt: schema.excerpt || '',
      normalizedTitle: names(schema.title).fileName,
      creationDate: new Date().toISOString(),
    }
  );

  await formatFiles(host);
}
```

Note how we pass in the variables to replace, which we previously defined in our EJS template. Also for the filename we can rely on the `names(...)` function from `@nrwl/devkit` which has a handy `.fileName` property to make sure we generate a file-system compliant file name from our `title` property.

## Running the workspace generator with the CLI

Our simple workspace generator is done! Let's try it out. To run the generator, use the following command:

```
npx nx workspace-generator new-article "my generated article" --author=juri --dry-run
```

Note `new-article` is the name of our generator which we specified when generating it initially. "my generated article" is the title we provide and `--author` is self-explanatory 🙂. Notice the `--dry-run` appended to the end of the command. This allows simulating a run of our generator, without actually touching the file system, which is particularly useful for testing it.

{{<figure url="/blog/assets/imgs/nextjs-nx-series/workspace-gen-dryrun.png" size="full">}}

Removing the `--dry-run` finally creates the files:

{{<figure url="/blog/assets/imgs/nextjs-nx-series/workspace-gen-generation-result.png" size="medium">}}

`_articles/my-generated-article.mdx`

```
---
title: 'my generated article'
excerpt: ''
date: '2021-07-26T14:34:45.317Z'
author:
  name: juri
---

Here goes your awesome content 🔥
```

If you now run the site with `npx nx serve site` and navigate to [http://localhost:4200/articles/my-generated-article](http://localhost:4200/articles/my-generated-article) you should see it rendered.

## Running the workspace generator with Nx Console

I've previously mentioned [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console), which is a VSCode companion extension to an Nx workspace. Nx Console is particularly useful if you want to discover available generators, or just some help filling out all the necessary arguments of a given one.

The cool part is that Nx Console also discovers Nx Workspace generators, such as the one we created. With the extension installed click

1. On the Nx Console icon on the VSCode sidebar
2. Click the "Generate" menu
3. Find your workspace generator
4. Fill out the details
5. Finally hit Run

{{<figure url="/blog/assets/imgs/nextjs-nx-series/nx-console-workspace-generator.png" size="full">}}

## Optional: Improving the DX of our Workspace Generator

We can further improve the developer experience of running the workspace generator with the CLI.

### Providing prompts for the workspace generator

One way is to provide prompts if the user doesn't provide required arguments. Add `x-prompt` properties to the various entries in `schema.json`.

```json
{
  "cli": "nx",
  "id": "new-article",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "The title of the blog post",
      "$default": {
        "$source": "argv",
        "index": 0
      },
      "x-prompt": "What's the title of your new article?"
    },
    "author": {
      "type": "string",
      "description": "The name of the author",
      "x-prompt": "What's the name of the author?"
    },
    "excerpt": {
      "type": "string",
      "description": "An excerpt that summarizes the blog post in a single line"
    }
  },
  "required": ["title", "author"]
}
```

Running the generator now without providing any arguments will result in a prompt that asks the user for more details:

{{<figure url="/blog/assets/imgs/nextjs-nx-series/workspace-gen-prompts.png" size="full">}}

### Validating input

You can validate the input by providing a `pattern` property such as

```json
{
  "cli": "nx",
  "id": "new-article",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "The title of the blog post",
      "$default": {
        "$source": "argv",
        "index": 0
      },
      "x-prompt": "What's the title of your new article?",
			"pattern": "^[a-zA-Z].*$"
    },
    ...
  },
  "required": ["title", "author"]
}
```

Or alternatively, provide a set of valid options such as in the example of the `style` property when generating the Next component

```json
"style": {
  "description": "The file extension to be used for style files.",
  "type": "string",
  "alias": "s",
  "default": "css",
  "x-prompt": {
    "message": "Which stylesheet format would you like to use?",
    "type": "list",
    "items": [
      { "value": "css", "label": "CSS" },
      {
        "value": "scss",
        "label": "SASS(.scss)       [ http://sass-lang.com          ]"
      },
      {
        "value": "styl",
        "label": "Stylus(.styl)     [ http://stylus-lang.com        ]"
      },
      {
        "value": "less",
        "label": "LESS              [ http://lesscss.org            ]"
      },
      {
        "value": "styled-components",
        "label": "styled-components [ https://styled-components.com ]"
      },
      {
        "value": "@emotion/styled",
        "label": "emotion           [ https://emotion.sh            ]"
      },
      {
        "value": "styled-jsx",
        "label": "styled-jsx        [ https://www.npmjs.com/package/styled-jsx ]"
      }
    ]
  }
},
...
```

### Providing defaults

Providing defaults is another way to customize the workspace generator. One way to provide the defaults is to directly provide them in the `schema.json` itself by adding the `default` property to the corresponding generator input declaration.

Since it is my own blog platform, the `author` property will default to "Juri" in 99% of the cases (unless there are guest posts). As such it might make sense to set the author default in the `schema.json`

```json
{
  "cli": "nx",
  "id": "new-article",
  "type": "object",
  "properties": {
    ...
    "author": {
      "type": "string",
      "description": "The name of the author",
      "default": "Juri"
    },
    ...
  },
  "required": ["title", "author"]
}
```

## Conclusion

In this article we learned

- Why it is important to automate your Nx workspace
- What Nx generators are
- How automation can be achieved by using Nx workspace generators
- How to write our own workspace generator
- How to run our workspace generator with the CLI and Nx Console

See also:

- [https://nx.dev/latest/react/generators/using-schematics](https://nx.dev/latest/react/generators/using-schematics)

**GitHub repository**

All the sources for this article can be found in this GitHub repository's branch: [https://github.com/juristr/blog-series-nextjs-nx/tree/06-nx-workspace-generator](https://github.com/juristr/blog-series-nextjs-nx/tree/06-nx-workspace-generator)