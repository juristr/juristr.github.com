---
title: 'Angular: Using the JSONPipe for debugging'
lead: Remember the JSON filter in Angular 1? Here's how you can use it in Angular
categories:
  - Angular
  - JavaScript
reposts:
  - 'https://dzone.com/articles/angular-2-using-the-jsonpipe-for-debugging'
date: 2016-09-21T00:00:00.000Z
comments: true
url: /blog/2016/09/ng2-serialize-with-json-pipe
type: post
image: /blog/assets/imgs/ng2-jsonpipe-cardimg.png
---

<div class="article-intro">
	A powerful way of debugging, especially templates, in Angular 1 was the JSON pipe (or filter) which could be used within a template. The pipe still natively exists in Angular. Here's how you can import and use it.
</div>

{{< postad >}}

{{<warn-notice message="$1" >}}
 

Especially when you have to debug your Angular templates it was particularly useful in Angular 1 to use the JSON filter.

```html
{% raw %}
<h1>Some template</h1>
<pre>{{ myObj | json }}</pre>
{% endraw %}
```

As a result you got a nicely formatted JSON representation of your databound JavaScript object.

![](/blog/assets/imgs/json-pipe-result.png)

## Use the JSONPipe in Angular

The very same holds for Angular, which has [a built-in JSONPipe object](https://angular.io/docs/ts/latest/api/common/index/JsonPipe-pipe.html) as well.

To use it you have to import the `CommonModule` from the `@angular/common` package into your own module.

```javascript
{% raw %}
import { CommonModule } from '@angular/common';


@NgModule({
    ...
    imports: [ CommonModule ]
    ...
})
{% endraw %}
```

Then you can start using it in your template, just as you did in Angular 1.

```javascript
{% raw %}
@Component({
    selector: 'my-app',
    template: `
      <pre>{{ myObj | json }}</pre>
    `
})
export class MyAppComponent {
    myObj: any;

    constructor() {
        this.myObj = {
            name: 'Juri',
            website: 'http://juristr.com',
            twitter: '@juristr'
        };
    }
}
{% endraw %}
```

Easy, isn't it :wink:.

## Try it yourself

Here's a Plunker to play around with: [https://plnkr.co/edit/zA3ogWLGwg0raLyz1iVj?p=preview](https://plnkr.co/edit/zA3ogWLGwg0raLyz1iVj?p=preview)

{{<plunker plunker_url="https://embed.plnkr.co/zA3ogWLGwg0raLyz1iVj/">}}
 

