---
type: post
title: "Dynamically Load CSS with the Angular CLI"
lead: "You probably don't know, but you can specify how the CLI loads your CSS"
date: 2019-08-22T12:42:15+02:00
comments: true
url: /blog/2019/08/dynamically-load-css-angular-cli
image: /blog/assets/imgs/lazy-load-css.png
categories:
  - Angular
tags:
  - angular
  - tooling
draft: false
---

{{<intro>}}
  I’ve written about [lazy loading](/blog/2019/04/state-lazy-loading-components-angular/) in the past, as well as how to [handle various styling issues in Angular](/blog/2016/01/learning-ng2-dynamic-styles). This time we’ll explore how to customize the Angular CLI s.t. we can lazy load CSS files on the fly.
{{</intro>}}
<!--more-->

{{< postad >}}

Normally if you generate an Angular app, you’ll get a `styles.css` or `styles.scss` file (based on whether you choose to use some CSS precompiler or not). This style gets directly compiled and injected into your `index.html`. In fact, if you open the `angular.json` file, you’ll find a configuration like

```css
"dyncss": {
    ...
    "build": {
        ...
        options: {
          ...
          "styles": [
              "src/styles.scss",
          ],
        }
    },
    ...
},
```

and finally in your `index.html` something like

```html
<!doctype html>
<html lang="en">
<head>
  ...
  <link rel="stylesheet" href="styles.11660fe9b6fe10ffd079.css"></head>
<body>
  ...
</body>
</html>
```

Now what if you have different styles you compile and you want to lazy load them at runtime?

## TL;DR - Watch the lesson on Egghead

{{<egghead-lesson uid="lessons/egghead-lazy-load-css-at-runtime-with-the-angular-cli" >}}

## Create various style entry points

First of all, we need to create the various entry point CSS files of course. You can just create further `scss`  files at the level where the `styles.scss` is in your project. For example:

- `client-a-styles.scss`
- `client-b-styles.scss`

You can see each of these as a fully independent `styles.scss` but for different clients, different project themes, or whatever you're trying to achieve. Obviously you may want to reuse parts among these via according Sass imports.


## Configuring the CLI

Next we need to configure the Angular CLI to take our newly defined Sass files as well (btw, this totally also works with plain CSS of course).

```json
"dyncss": {
    ...
    "build": {
        ...
        options: {
          ...
          "styles": [
            "src/styles.scss",
            "src/client-a-styles.scss",
            "src/client-b-styles.scss"
          ],
        }
    },
    ...
},
```

However, there's a problem with this approach. Configuring the styles like this, all of them would be included and the last would win over the others. What do I mean by that. Well, most likely you might be using these for theming purposes, so `client-a-styles.scss` might include something like

```css
.app-title {
  color: blue;
}
```

..while `client-b-styles.scss` includes

```css
.app-title {
  color: red;
```

`client-b-style.scss` is included **after** `client-a-style.scss`, so it would override all previously defined CSS rules.

Hence, we need to **tell the Angular CLI to NOT include these styles** as we are going to load them on the fly. This can be done by including them as follows:

```json
"dyncss": {
    ...
    "build": {
        ...
        options: {
          ...
          "styles": [
            "src/styles.scss",
            {
              "input": "src/client-a-styles.scss",
              "bundleName": "client-a",
              "inject": false
            },
            {
              "input": "src/client-b-styles.scss",
              "bundleName": "client-b",
              "inject": false
            }
          ],
        }
    },
    ...
},
```

> Hint: you might have seen `lazy` being used when configuring styles in the `angular.json`. It has been deprecated in favor of `inject` however, as the latter better expresses the actual meaning.

To see the effect, compile the app with `ng build --prod`.

{{<figure url="/blog/assets/imgs/lazy-css-bundles.png" size="medium">}}

## Lazy load at runtime

Now that we have separate CSS files being produced by the Angular CLI, we can think about how to lazy load them. In your app you should encapsulate the behavior in a dedicated service. For the purpose of showcasing it here, I simply create a `loadStyle(...)` function in my `AppComponent` and use the `Document` to add the link to the `<head>` section.

```javascript
import { DOCUMENT } from '@angular/common';
...
export class AppComponent {
  title = 'dyncss';

  constructor(@Inject(DOCUMENT) private document: Document) {}

  loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];

    let themeLink = this.document.getElementById(
      'client-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;

      head.appendChild(style);
    }
  }
}
```

This would allow us to load the theme at runtime, based on the user login, some configuration variable or whatever, by simply invoking `loadStyle('client-a.css')`.

### Hint: Lazy load in development

If you try to invoke `loadStyle('client-a.css')` in development (via `ng serve`) you'll most likely get the following error:

{{<figure url="/blog/assets/imgs/lazy-css-in-dev-err.png" size="medium">}}

The reason is that the CSS is served via a JavaScript file (`style.js`) as it is faster during development. To disable this behavior, you can add the `"extractCss": true` to the project configuration in the `angular.json`:

```json
"dyncss": {
    ...
    "build": {
        ...
        options: {
          ...
          "extractCss": true,
          "styles": [
            ...
          ]
        }
    },
    ...
},
```

## Alternative use case: During deployment

Alternatively you can "inject" the stylesheet during deployment into your `index.html` via some deployment script (i.e. with Ansible). The script can post-process the `index.html` during the deployment phase and add the correct stylesheet into the head section.

## Conclusion

So in this article you learned

- how to configure the Angular CLI to _not inject the styles_ into the HTML file
- how to lazy load the styles at runtime

Obviously the example is very simplified for the purpose of learning this approach. In a real world example you could have a much more elaborate and sophisticated mechanism for handling themes in your application.