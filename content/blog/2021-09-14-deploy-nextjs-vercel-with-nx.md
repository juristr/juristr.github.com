---
type: post
title: Publishing a Next.js app to Vercel with Nx
date: 2021-09-14T07:40:00+01:00
lead: Learn how to use Next.js, Nx and Tailwind together
url: /blog/2021/09/nextjs-deploy-vercel-with-nx
draft: false
image: /blog/assets/imgs/nextjs-nx-series/nextjs-nx-storybook-cypress-cover.jpg
categories:
  - Next
  - Nx
tags:
  - Next
  - TailwindCSS
  - React
  - Storybook
  - Vercel
comments: true
---

{{<intro>}}
During this journey from [setting up our Next.js app within an Nx workspace](/blog/2021/06/create-nextjs-webapp-nx/), to [configuring Tailwind](/blog/2021/06/setup-tailwind-nextjs-and-nx/), [Markdown rendering](/blog/2021/06/read-render-markdown-nextjs-and-nx/), [Storybook](/blog/2021/08/nextjs-storybook-tailwind-nx/) and [Cypress](/blog/2021/08/nextjs-storybook-cypress-nx/) we're now at the point where we should look at the deployment of our site. Let's learn how to deploy to some static environment as well as leverage the rich features when deploying to [Vercel](https://vercel.com/).
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
- [Using Nx Workspace generators to scaffold new blog posts](/blog/2021/07/nextjs-workspace-generator-blog-draft/)
- [Use Storybook with Next.js, Tailwind and Nx to develop components in isolation](/blog/2021/08/nextjs-storybook-tailwind-nx/)
- [Use Cypress with Next.js and Nx to battle test your React Components](/blog/2021/08/nextjs-storybook-cypress-nx/)
- **Publishing a Next.js app to Vercel with Nx**

_Check back later, [follow me on Twitter](https://twitter.com/juristr) or [subscribe to the Newsletter](/newsletter) to get updates about upcoming articles_

{{<toc>}}

## Deploying our site as a set of static files

In our specific context of developing our personal portfolio website or blog, we can totally rely on static site generators. Tools like [Jekyll](https://jekyllrb.com/), [Eleventy](https://www.11ty.dev/), [Hugo](https://gohugo.io/) and so on do a perfect job in taking a set of markdown files and transform them into static HTML files. These can be deployed to any web server that is able to statically serve files. Often these tools are very opinionated on how you should structure your site and where to place the markdown files. This can be a pro and cons, depending on your needs. While for a simple portfolio website you don't really need any kind of backend, as your site grows, you might find it useful to have access to simple cloud functions and persistent backend storage to create a more dynamic experience for your visitors.

Turns out that with Next.js you have many of these properties already built in. As we learned in our [very first article of the series](/blog/2021/06/create-nextjs-webapp-nx/), Next.js allows you to dynamically decide whether to statically or dynamically render it from the server.

In our specific case, we have just used static rendering so far, which **means we can just "export"** **our site** with this simple command:

```bash
npx nx export site
```

This generates a set of static HTML, CSS and JS files at `dist/apps/site/exported`. With a plain simple HTTP server, capable of serving static files, we can run the exported Next.js application.

```bash
cd dist/apps/site/exported
npx http-server .
```

In many scenarios, such a deployment is all you ever want. You can configure [GitHub Pages (even with your custom domain)](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) to directly deploy your website from your GitHub repo. Nowadays GitHub has even SSL built-in, and alternatively, you can use [CloudFlare to enable it](/blog/2017/01/enable-ssl-jekyll-blog/).

## Understanding deployments on Vercel

If you want to have static deployments, but at the same time the freedom to easily expand beyond that, I'd highly recommend having a look at [Vercel](https://vercel.com).

Vercel [deploys from your Git](https://vercel.com/docs/git) repository and has different **deployment types**.

- **Production deployment -** Production deployments are made each time you merge to your production branch (e.g. `main`) or when you use the `vercel --prod` command. [Read more here](https://vercel.com/docs/platform/deployments#production).
- **Preview deployment -** This happens every time you push a new commit to a branch or when you run the `vercel` command. [Read more here](https://vercel.com/docs/platform/deployments#preview).
- *Instant rollbacks* are also deployments, which happen whenever you revert any changes to a production deployment

Let's get started by configuring our project first.

## Setting up our project on Vercel

To set up our deployments on Vercel, first go to [https://vercel.com/](https://vercel.com/), create an account or log into your existing one. Since we already have our Next.js project setup with Nx, we choose "**Create a New Project**".

{{<figure url="/blog/assets/imgs/nextjs-nx-series/vercel-dashboard.png" size="full">}}

We can directly import the repository from GitHub:

{{<figure url="/blog/assets/imgs/nextjs-nx-series/vercel-import-github.png" size="full">}}

Once that's done, you'll have to run through the configuration, giving the Vercel platform a couple of inputs on how to build your project. **Creating a team is optional** and really just makes sense if you plan to collaborate with others on the project. Here's what it would look like if we created one.

{{<figure url="/blog/assets/imgs/nextjs-nx-series/vercel-create-team.png" size="full">}}

In the next step, you can configure the project, giving it a name to identify it in your Vercel dashboard later. You can leave the other settings untouched.

Before going ahead and hit the **Deploy** we need to configure the "Build and Output Settings" to use the underlying Nx build commands.

{{<figure url="/blog/assets/imgs/nextjs-nx-series/vercel-configure-project.png" size="full">}}


## Building your Next.js app for Vercel

Similarly to exporting the Next.js app (as we've seen a couple of sections ago), we can build the Next.js site for Vercel by running the **build** command:

```bash
npx nx build site --prod
```

Once that build succeeds, you can see the output in the `dist/apps/site` directory.

{{<figure url="/blog/assets/imgs/nextjs-nx-series/nextjs-build-outdir.png" size="medium">}}

> **Note:** If needed, you can also customize the output path in the project configuration of your application `workspace.json`

Let's have a look at how to configure Vercel to pick up these commands.

## Production deployment on Vercel

This would be all Vercel needs to deploy your app successfully. Hence, let's go ahead and configure the "Build command" and "Output directory" as shown in the following screenshot:

{{<figure url="/blog/assets/imgs/nextjs-nx-series/vercel-build-settings.png" size="full">}}

Once you hit deploy, Vercel takes over and looks at your [current production branch](https://vercel.com/docs/git#production-branch) (in our case `main`), fetches the source code, executes the build command we have specified above, and deploys it into production.

{{<figure url="/blog/assets/imgs/nextjs-nx-series/vercel-deployment-running.png" size="full">}}

Congrats, you should now have a successful deployment 🎉.

{{<figure url="/blog/assets/imgs/nextjs-nx-series/vercel-successful-first-deployment.png" size="full">}}

Going to the dashboard we can see more information about the deployment:

{{<figure url="/blog/assets/imgs/nextjs-nx-series/vercel-dashboard-deploy-details.png" size="full">}}

And obviously, we can go to the deployment URL ([https://blog-series-nextjs-nx-alpha.vercel.app/articles/dynamic-routing](https://blog-series-nextjs-nx-alpha.vercel.app/articles/dynamic-routing)) and see the site live:

{{<figure url="/blog/assets/imgs/nextjs-nx-series/vercel-deployed-site.png" size="full">}}

## Preview deployments on Vercel

We just deployed to production. As we described earlier, Vercel has another cool feature that comes in really handy: Preview Deployments.

When you push to a branch that is not the production branch, a preview deployment will be created automatically. Whenever that PR is then merged to the main branch, a production deployment will be triggered.

Let's create a new branch to test these out: 

```bash
git checkout -b vercel-preview-deployment-test
```

Let's create a new article in `_articles/welcome-to-vercel.mdx`

```bash
---
title: 'Welcome to Vercel'
excerpt: 'How to deploy your Nx based Next.js app to Vercel'
date: '2021-08-25T05:35:07.322Z'
author:
  name: JJ Kasper
---

Hey!! You just deployed your first Nx based Next.js site to Vercel!!
```

If you want to quickly test this locally, run

```bash
npx nx serve site
```

and navigate to [http://localhost:4200/articles/welcome-to-vercel](http://localhost:4200/articles/welcome-to-vercel). You should see the article be rendered properly. Let's deploy it 🚀. Commit your changes and push the branch:

```bash
git push --set-upstream origin vercel-preview-deployment-test
```

> **Note:** make sure to use the name of the branch you've chosen.

If you go to the `/deployments` page on your Vercel project, in my case [https://vercel.com/nx-blog-series/blog-series-nextjs-nx/deployments](https://vercel.com/nx-blog-series/blog-series-nextjs-nx/deployments), you should already see a deployment running which is marked as "Preview":

{{<figure url="/blog/assets/imgs/nextjs-nx-series/vercel-deployment-overview-running.png" size="full">}}

In addition, if you create a PR on GitHub, you'll also automatically get the info posted into the PR itself:

{{<figure url="/blog/assets/imgs/nextjs-nx-series/vercel-pr-comment.png" size="full">}}

There's one thing though. When you make new changes to the `_articles/*.mdx` files, it might happen that the changes aren't actually being reflected on the deployed preview, even though the deployment ran and finished successfully.

Inspecting the deployment logs, you might see something like "`[retrieved from cache]`".

{{<figure url="/blog/assets/imgs/nextjs-nx-series/deployment-retrieved-from-cache.png" size="full">}}

This is the Nx [computation caching in action](https://nx.dev/latest/react/core-extended/computation-caching). Let's learn more.

## Nx and Computation caching

Nx has an internal computation cache which helps to optimize for speed. Basically, whenever you execute a command which you already ran previously, and granted you didn't change any relevant file that might alter the outcome of that specific task, Nx just replays it from the cache. Sounds complicated? Here's a more detailed video on how this works: [https://egghead.io/lessons/javascript-speed-up-with-nx-computation-caching](https://egghead.io/lessons/javascript-speed-up-with-nx-computation-caching)

But wait a minute! We did actually change something: we updated one of our files in `_articles`. Let's dig a bit deeper into how Nx caching works and **how we can influence which files get included in the cache**.

Nx uses [its internal dependency graph](https://egghead.io/lessons/javascript-use-the-nx-dependency-graph-to-visualize-your-monorepo-structure) to understand which files to include when it computes the cache. If we look at our dependency graph by running `npx nx dep-graph` we can see that the `_articles` folder is not present there.

{{<figure url="/blog/assets/imgs/nextjs-nx-series/site-deployment-graph-before.png" size="full">}}

As a result, it misses it when calculating the cache, and **hence doesn't invalidate the cache** when we change one of our article MDX files. 

Nx is flexible enough to allow us to fix this issue. Here are the options:

1. Adding our `_articles` files to the global `implicitDependencies` 
2. Moving our articles as a project into the `libs/` folder and referencing it as an implicit dependency on our `site` Next.js application
3. Adding our existing `_articles` folder as a node to the dependency graph and referencing it as an implicit dependency on our `site` Next.js application

Let's explore them.

### Global implicit dependencies

Global implicit dependencies cause the entire Nx workspace to rebuild / retest etc. Basically, on every change of one of these global dependencies, the entire cache gets invalidated and everything gets rebuilt. As you can imagine, this is not always ideal, but there are some use cases where we might want this to happen. Examples are:

- changes to the CI build configuration when we definitely would want to make sure the CI runs all the projects
- changes to our global lint rule configuration file
- ...

You can specify these global implicit dependencies in the `nx.json`. Here's an example configuration:

```json
// nx.json
{
  "implicitDependencies": {
    "package.json": {
      "dependencies": "*",
      "devDependencies": "*"
    },
    ".eslintrc.json": "*"
  },
  ...
}
```

You can read more about it and the possible configuration options [on the Nx docs](https://nx.dev/latest/react/core-concepts/configuration#implicit-dependencies).

For our `_articles` folder, we could add an entry here that looks like the following:

```json
// nx.json
{
  "implicitDependencies": {
		...
    "_articles/*.mdx": "*"
  },
  ...
}
```

With this configuration, every change to any `*.mdx` file within the `_articles` folder would invalidate the Nx cache and cause a full re-computation. This definitely fixes our issue with the Vercel deployments and would totally work for our simple use case. But imagine in a more real-world setting, where you have other apps in this workspace that are not really using the `_articles` folder at all. Those would also always be recomputed, which is a waste of computation power and ultimately a waste of your time.

### Registering _articles as a node in the Nx Dependency Graph

The other options which we had were the following:

- Moving our articles as a project into the `libs/` folder and referencing it as an implicit dependency on our `site` Next.js application
- Adding our existing `_articles` folder as a node to the dependency graph and referencing it as an implicit dependency on our `site` Next.js application

I'm skipping the 1st point, as I think it wouldn't be worth the effort of generating a library in the `libs` folder and removing all of the config files, because clearly, we wouldn't have any use for the TypeScript and Jest configuration. Moreover, I want to have the `_articles` at the very root where they are easily accessible when I create new ones.

We can however just manually configure our `_articles` folder s.t. Nx recognizes it as a node in its dependency graph. We can do that by manually adding a configuration in the `workspace.json`:

```json
// workspace.json
{
  "version": 2,
  ...
  "projects": {
		...
    "site-articles": {
      "root": "_articles",
      "sourceRoot": "_articles",
      "projectType": "application",
      "targets": {}
    }
  }
}
```

As you can see it is an empty configuration. Also, we use `projectType: "application"` although it doesn't really matter in this case.

Next, we also need to add a new entry in our `nx.json`:

```json
// nx.json
{
  "implicitDependencies": {
    ...
  },
	...
  "projects": {
		...
    "site-articles": {
      "tags": []
    }
  }
}
```

If we now run our Nx Dependency graph visualization, using `npx nx dep-graph`, we should see our "site-articles" node appear on the graph:

{{<figure url="/blog/assets/imgs/nextjs-nx-series/site-deployment-graph-with-articles.png" size="full">}}

Finally, we need to make sure to establish a connection from our Next.js app "site" to "site-articles". Nx doesn't recognize this relationship automatically, which it does just for source imports. 

> We could extend the Nx dependency graph's capabilities via a custom Nx plugin, but that is the topic of another article series 😅. Read more about it here: [https://nx.dev/latest/angular/structure/project-graph-plugins](https://nx.dev/latest/angular/structure/project-graph-plugins)

To create this connection, we can add the `site-articles` node to the `implicitDependencies` property of `site`:

```json
// nx.json
{
  "implicitDependencies": {
	  ...
  },
	...
  "projects": {
		...
    "site": {
      "tags": [],
      "implicitDependencies": ["site-articles"]
    },
    "site-articles": {
      "tags": []
    }
  }
}
```

Re-running our dependency graph visualization now shows the correct relationship:

{{<figure url="/blog/assets/imgs/nextjs-nx-series/site-deployment-graph-with-implicit-deps.png" size="full">}}

Now, every time we change an article, **only our Next.js site** application would be rebuilt, which is exactly what we wanted.

## Use Nx to build and deploy only when something changed

Besides the Nx computation cache we've just discussed, Nx has another feature that helps you scale. Now again, talking about scaling when creating our personal portfolio and blog site is not really your top priority. The main benefit of going through this blog series though is that you can apply these concepts nearly 1-1 to a real-world project with Nx and Next.js. Even though scaling is not your main concern right now, it definitely might be as your Nx workspace grows and hosts more than just your Next.js application.

The Nx feature I'm talking about is so-called "affected commands". They only trigger for projects which are affected by the changes we made. Based on the dependency graph of your project and your Git history, Nx is able to figure out on which projects a given command needs to be executed. Without going too much into the details here, feel free to check out these resources for more info:

- Guide: [Rebuilding and Retesting what is Affected](https://nx.dev/latest/react/core-extended/affected)
- Video: [Scale CI runs with Nx Affected Commands](https://egghead.io/lessons/javascript-scale-ci-runs-with-nx-affected-commands)

To only run our Vercel build if something changed that might have affected it, we can leverage [Vercel's ignored build step feature](https://vercel.com/docs/platform/projects#ignored-build-step). That feature requires us to respond with either an exit code `1` if the build is required or `0` if it should be canceled.

This Nx guide describes it in more depth: [https://nx.dev/latest/react/guides/deploy-nextjs-to-vercel#skipping-build-if-the-application-is-not-affected](https://nx.dev/latest/react/guides/deploy-nextjs-to-vercel#skipping-build-if-the-application-is-not-affected)

To set up affected builds for Vercel, copy the script mentioned in the guide I just linked and place it into the `tools/vercel-deploy/vercel-affected-deploy.sh` file.

We should also adjust the `APP` variable to reflect our own app name: `site`. Most probably we could also inject this via some Vercel environment variable we define for the application. This would make the script more reusable, but I'll leave that for you. So here is the entire script:

```bash
# tools/vercel-deploy/vercel-affected-deploy.sh

# Name of the app to check. Change this to your application name!
APP=site

# Determine version of Nx installed
NX_VERSION=$(node -e "console.log(require('./package.json').devDependencies['@nrwl/workspace'])")
TS_VERSION=$(node -e "console.log(require('./package.json').devDependencies['typescript'])")

# Install @nrwl/workspace in order to run the affected command
npm install -D @nrwl/workspace@$NX_VERSION --prefer-offline
npm install -D typescript@$TS_VERSION --prefer-offline

# Run the affected command, comparing latest commit to the one before that
npx nx affected:apps --plain --base HEAD~1 --head HEAD | grep $APP -q

# Store result of the previous command (grep)
IS_AFFECTED=$?

if [ $IS_AFFECTED -eq 1 ]; then
  echo "🛑 - Build cancelled"
  exit 0
elif [ $IS_AFFECTED -eq 0 ]; then
  echo "✅ - Build can proceed"
  exit 1
fi
```

Note that there's the line where we print out all the affected apps (because we need to deploy those) and filter it for the provided application name:

```bash
npx nx affected:apps --plain --base HEAD~1 --head HEAD | grep $APP -q
```

By default, Nx compares the current Git HEAD with the main production branch. Make sure you set it to the one you're using in the `nx.json`. 

```json
// nx.json
{
  "implicitDependencies": {
     ...
  },
  "affected": {
    "defaultBase": "main"
  },
  ...
  "projects": {
    ...
  },
  ...
}
```

Make sure it matches your main branch name. In my case it is `main`.

The script above explicitly passes the base and head references explicitly, setting them to `HEAD~1` and `HEAD` accordingly. Basically just comparing the changes that have been made from the last commit.

> **Note,** right now it is not possible to get a reference to the last successful deployment commit SHA on Vercel. If that was possible we could pass that to `--base` and thus have an even more efficient affected command evaluation because it would allow us to truly determine what changed since the last deployment.

### Configuring Nx Affected deploys on Vercel

Finally, **let's configure the script on Vercel**. Go to the `Settings > Git` and scroll to the section "Ignored Build Step". Add `./tools/vercel-deploy/vercel-affected-deploy.sh` and save your configuration.

{{<figure url="/blog/assets/imgs/nextjs-nx-series/vercel-ignore-build-step.png" size="full">}}

### Testing Nx affected deploys on Vercel

To verify whether our script works, let's create a new  React application in our workspace. For the sake of this simple showcase, let's call it "react-demo".

```bash
npx nx g @nrwl/react:app
```

Also, let's create a new React library `react-ui` :

```json
npx nx g @nrwl/react:lib reactui
```

Finally, let's change the generated React application in a way to create dependencies to `react-ui` as well as `shared-ui`. To do so, open `apps/react-app/src/app/app.tsx` and replace its content with the following:

```tsx
import styles from './app.module.css';

import { ReactComponent as Logo } from './logo.svg';
import { TopicButton } from '@juridev/shared/ui';
import { Reactui } from '@juridev/reactui';

export function App() {
  return (
    <div className={styles.app}>
      <header className="flex">
        <Logo width="75" height="75" />
        <h1>Welcome to react-app!</h1>
      </header>
      <main>
        <TopicButton topicName="React" />
        <Reactui />
      </main>
    </div>
  );
}

export default App;
```

If you now visualize the dependency graph with `nx dep-graph` you should see something like the following:

{{<figure url="/blog/assets/imgs/nextjs-nx-series/site-dep-graph-with-reactapp.png" size="full">}}

Commit everything and push it to your GitHub repo.

When the build is triggered on Vercel, you should now see that the `vercel-affected-deploy.sh` has been used.

{{<figure url="/blog/assets/imgs/nextjs-nx-series/vercel-deployment-cancelled.png" size="full">}}

Since we didn't change anything related to our Next.js application, the build gets canceled just as we expect.

Let's try to change something in the `react-ui` library which is supposed to be our React application specific UI library.

```tsx
// libs/reactui/src/lib/reactui.tsx
import './reactui.module.css';

/* eslint-disable-next-line */
export interface ReactuiProps {}

export function Reactui(props: ReactuiProps) {
  return (
    <div>
      <h1>Welcome to Reactui!</h1>
      <p>Nx ❤️ Next</p>
    </div>
  );
}

export default Reactui;
```

**Commit the change**, then execute the command Vercel will execute to determine whether to deploy our "site" app or not. Instead of `affected:apps` we can also use `affected:dep-graph` to show what changed in our last commit:

```bash
npx nx affected:dep-graph --base HEAD~1 --head HEAD
```

{{<figure url="/blog/assets/imgs/nextjs-nx-series/vercel-affected-deploy-graph.png" size="small">}}

If you push this commit to your GitHub repo, Vercel would again cancel the deployment as expected.

If however, we make a change in our `shared-ui` library, which our React application as well as our Next.js based `site` application depends on, then a deployment would be triggered.

{{<figure url="/blog/assets/imgs/nextjs-nx-series/vercel-affected-deploy-full.png" size="full">}}

## Conclusion

This article was quite packed with knowledge. We learned

- How to export our Next.js based site as a set of static assets
- What type of deployments Vercel offers
- How to configure our project on Vercel
- How to build our Next.js based Nx application for Vercel
- How to configure our Nx project on Vercel
- What Nx computation cache is all about and how to configure implicit dependencies
- How Nx affected commands work and how we can configure them on Vercel

See also:

- [https://nx.dev/latest/react/guides/deploy-nextjs-to-vercel](https://nx.dev/latest/react/guides/deploy-nextjs-to-vercel)
- [https://nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- [https://vercel.com/docs/git](https://vercel.com/docs/git)
- [https://nextjs.org/learn/basics/deploying-nextjs-app](https://nextjs.org/learn/basics/deploying-nextjs-app)
- [https://egghead.io/lessons/javascript-speed-up-with-nx-computation-caching](https://egghead.io/lessons/javascript-speed-up-with-nx-computation-caching)
- [https://nx.dev/latest/react/core-extended/affected](https://nx.dev/latest/react/core-extended/affected)
- [https://egghead.io/lessons/javascript-scale-ci-runs-with-nx-affected-commands](https://egghead.io/lessons/javascript-scale-ci-runs-with-nx-affected-commands)

**GitHub repository**

All the sources for this article can be found in this GitHub repository's branch: [https://github.com/juristr/blog-series-nextjs-nx/tree/09-deploy-to-vercel](https://github.com/juristr/blog-series-nextjs-nx/tree/09-deploy-to-vercel)