---
type: post
title: Use Cypress with Next.js and Nx to battle test your React Components
date: 2021-08-18T07:40:00+01:00
lead: Learn how to use Next.js, Nx and Tailwind together
url: /blog/2021/08/nextjs-storybook-cypress-nx
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
comments: true
---

{{<intro>}}
In the [previous article](/blog/2021/08/nextjs-storybook-tailwind-nx/), we talked about how Nx comes with first-class support for setting up Storybook. Nx also automatically generates Cypress e2e tests for the various Storybook stories, which is exactly what we're going to explore in this article.
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
- **Use Cypress with Next.js and Nx to battle test your React Components**
- [Publishing a Next.js app to Vercel with Nx](/blog/2021/09/nextjs-deploy-vercel-with-nx/)

_Check back later, [follow me on Twitter](https://twitter.com/juristr) or [subscribe to the Newsletter](/newsletter) to get updates about upcoming articles_

{{<toc>}}


Adding automated tests for our personal blog platform is probably overkill and most people wouldn't probably do. One of the key benefits of Nx is that it automatically integrates a variety of tools. So far in the series, we've seen

- automated setup of Next.js apps with TypeScript support
- allowing to split your application logic into separate libraries and seamlessly integrate them into an application, in our case a Next.js based one
- integrating Storybook with React components and TypeScript

By having Nx generate these configs for you, you don't have to deal with the complexity of setting up all these tools. Also, it will lower the entry barrier and friction for developers to start using them. Such as the automated Cypress setup. I probably wouldn't write Cypress tests for my personal blog platform, but given the hard task of setting everything up is already done, what's left is really only to write some high-level tests.

## Writing Cypress e2e tests for your Next.js application

Right at the very beginning of this series when we [generated our Nx workspace with the Next.js preset](/blog/2021/06/create-nextjs-webapp-nx/), you might have noticed that we also got a `apps/site-e2e` folder setup automatically.

{{<figure url="/blog/assets/imgs/nextjs-nx-series/next-cypress-e2e-folderstructure.png" size="medium">}}

Nx also generated a default Cypress spec file:

```ts
// apps/site-e2e/src/integration/app.spec.ts
import { getGreeting } from '../support/app.po';

describe('site', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome to site!');
  });
});
```

You can run the Next.js app Cypress tests very much the same way as we did for our Storybook Cypress tests:

```bash
npx nx e2e site-e2e
```

Obviously, they might not pass successfully right now since we've modified the initially generated application. Let's fix them and to make an example, let's test whether our [markdown rendered article we've covered in a previous post](/blog/2021/06/read-render-markdown-nextjs-and-nx/), renders properly at `/articles/dynamic-routing`.

{{<figure url="/blog/assets/imgs/nextjs-nx-series/nextjs-cypress-article-to-test.png" size="full">}}

What we want to test is

- When navigating to `/articles/dynamic-routing`, the page loads properly.
- The `h1` contains the expected title of the article.
- the embedded Youtube component we talked about in the article about [component hydration with MDX](/blog/2021/07/component-hydration-nextjs-nx/) renders properly.

We can launch Cypress in "watch mode" such that we can see the test running as we make adjustments.

```bash
npx nx e2e site-e2e --watch
```

Let's modify the existing `apps/site-e2e/src/integration/app.spec.ts` file to implement the Cypress test.

> *Note*, you might want to create a dedicated spec file for testing the article loading, while the `app.spec.ts` might be more suitable for loading more high-level things about the web app. Like whether the navbar loads etc. But for the purpose of demoing the Cypress integration quickly, it works 🙂.

Here's the modified test:

```ts
// apps/site-e2e/src/integration/app.spec.ts
describe('site', () => {
  beforeEach(() => {
    // navigate to an example article
    cy.visit('/articles/dynamic-routing');
  });

  it('should render the title of the article', () => {
    cy.get('h1').should('contain', 'Dynamic Routing and Static Generation');
  });

  it('should properly render the Youtube component', () => {
    cy.get('iframe').should('be.visible');
  });
});
```

If you have a look at the Cypress runner, you should see it pass properly.

{{<figure url="/blog/assets/imgs/nextjs-nx-series/nextjs-cypress-run.png" size="full">}}


## Writing Cypress e2e tests for our previously created Storybook stories

Similarly to the Next.js app based e2e tests, Nx also generated e2e tests specifically for our Storybook setup, which we generated in the [previous article](/blog/2021/08/nextjs-storybook-tailwind-nx/). All those tests reside in the `apps/storybook-e2e/ui-e2e` folder. The reason why they are in a separate "storybook-e2e" folder is because I specifically passed that as the Cypress directory when generating the Storybook setup.

{{<figure url="/blog/assets/imgs/nextjs-nx-series/storybook-e2e-treeview.png" size="medium">}}

The default Cypress spec generated by Nx is the following:

```tsx
// apps/storybook-e2e/ui-e2e/src/integration/topic-button/topic-button.spec.ts
describe('shared-ui: TopicButton component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=topicbutton--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to TopicButton!');
    });
});
```

There are a couple of things to notice here in terms of the testing strategy. What Nx leverages here when generating the Storybook tests, is [Storybook's interaction testing](https://storybook.js.org/docs/react/workflows/interaction-testing) functionality. That feature allows to directly target the story rendering via a URL:

```tsx
cy.visit('/iframe.html?id=topicbutton--primary')
```

Furthermore, we can control the different component props variation by leveraging the possibility to also pass the [Story args via the URL](https://storybook.js.org/docs/react/writing-stories/args#setting-args-through-the-url):

```tsx
cy.visit('/iframe.html?id=topicbutton--primary&args=topicName:Next.js;');
```

Having that knowledge we can easily develop our Cypress test.

## Launch Storybook Cypress e2e tests

```json
npx nx e2e storybook-e2e-ui-e2e --watch
```

By passing the `--watch` flag, we can interact with the Cypress runner which is handy during development. Without the flag, the e2e tests will run in headless mode which is suitable for CI.

When you launch this command, behind the scenes, Nx serves our Storybook for the `shared/ui` library, followed by launching Cypress and making sure it points to the local Storybook server.

Obviously running the Cypress e2e now wouldn't really work as we've changed the implementation of our React component meanwhile. So let's fix that.

## Implementing the Cypress test for our Storybook story

We want to have two different test cases for our simple Topic Button component:

1. make sure it renders the passed `topicName` properly
2. make sure it passes the topic name to the event handler when clicking on the Topic button component

### Test case 1

In order to have "hook points" that can be grabbed during the Cypress test run, it is [good practice](https://docs.cypress.io/guides/references/best-practices#Selecting-Elements) to use `data-testid` attributes on the DOM elements which we want to use in our test implementation. Thus, we need to change our `topic-button.tsx` and add one to the rendering element of our `topicName` as well as to the entire topic button div:

```tsx
// libs/shared/ui/src/lib/topic-button/topic-button.tsx
...

export function TopicButton(props: TopicButtonProps) {
  ...

  return (
    <div
      ...
      data-testid="topicButton"
    >
      <img src={icon} alt="" className="w-12" />
      <div className="p-5">
        <h2 className="font-bold text-4xl" data-testid="topicName">
          {props.topicName}
        </h2>
      </div>
    </div>
  );
}
```

Then, in our test case, we use [set the Story args via the URL](https://storybook.js.org/docs/react/writing-stories/args#setting-args-through-the-url), in this case passing first `topicName:Next.js`, and then we verify whether the `[data-testid=topicName]` element contains the correct name. And to be sure, we also change it to `React`and assert those changes are reflected in the rendering

```tsx
// apps/storybook-e2e/ui-e2e/src/integration/topic-button/topic-button.spec.ts
describe('shared-ui: TopicButton component', () => {

  it('should render the topic name', () => {
    cy.visit('/iframe.html?id=topicbutton--primary&args=topicName:Next.js;');
    cy.get('[data-testid=topicName]').should('contain', 'Next.js');

    cy.visit('/iframe.html?id=topicbutton--primary&args=topicName:React;');
    cy.get('[data-testid=topicName]').should('contain', 'React');
  });

});
```

### Test case 2

Back when implementing our `topic-button.stories.tsx` we added a feature to the story that registers to the `TopicButton`'s `onClick` event and renders the result directly below the button. This makes it particularly easy to test it in our Cypress test. To make it easy to grab the according DOM element in our Cypress test, we add another `data-testid="click-result"` to that element.

```tsx
// libs/shared/ui/src/lib/topic-button/topic-button.stories.tsx
... 

const Template: Story<TopicButtonProps> = (args) => {
  const [clickedTopic, setClickedTopic] = useState<string | null>(null);
  return (
    <div className="bg-gray-100 p-20">
      <TopicButton
        {...args}
        onClick={(topicName) => setClickedTopic(topicName)}
      />
      {clickedTopic && (
        <div data-testid="click-result">
          Button has been clicked: {clickedTopic}
        </div>
      )}
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  topicName: 'Next.js',
};
```

In the `topic-button.spec.ts` we add another test case, set the `topicName` to `React`, click the topic button component and verify the output matches our expectations:

```tsx
// apps/storybook-e2e/ui-e2e/src/integration/topic-button/topic-button.spec.ts
describe('shared-ui: TopicButton component', () => {
  it('should render the topic name', () => {
    ...
  });

  it('clicking the icon should properly pass the name of the topic to the event handler', () => {
    cy.visit('/iframe.html?id=topicbutton--primary&args=topicName:React;');

    cy.get('[data-testid=topicButton]').click();

    cy.get('[data-testid=click-result]').should('contain', 'React');
  });
});
```

## Running Cypress tests

Finally we can run the Cypress tests again

```tsx
npx nx e2e storybook-e2e-ui-e2e --watch
```

<video width="820" height="440" autoplay muted loop style="border: 1px solid #323f4b">
  <source src="/blog/assets/imgs/nextjs-nx-series/nx-tailwind-cypress-run.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>


## Conclusion

In this article we learned

- How Nx is able to automatically generates a Cypress e2e test for our Nx apps as well as our Storybook stories
- How the Cypress setup works
- How to implement a simple Cypress test for our Next.js app
- How to implement the Cypress e2e test for our Topic button story

See also:

- [https://storybook.js.org/docs/react/workflows/interaction-testing](https://storybook.js.org/docs/react/workflows/interaction-testing)
- [https://storybook.js.org/docs/react/writing-stories/args#setting-args-through-the-url](https://storybook.js.org/docs/react/writing-stories/args#setting-args-through-the-url)
- [https://docs.cypress.io/guides/references/best-practices#Selecting-Elements](https://docs.cypress.io/guides/references/best-practices#Selecting-Elements)

**GitHub repository**

All the sources for this article can be found in this GitHub repository's branch: [https://github.com/juristr/blog-series-nextjs-nx/tree/08-storybook-cypress-tests](https://github.com/juristr/blog-series-nextjs-nx/tree/08-storybook-cypress-tests)