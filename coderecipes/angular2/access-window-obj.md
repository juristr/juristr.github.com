---
layout: post_new
title: "Accessing window object"
type: snippet
category:
    - Other
---

Since Angular 2 is designed to run on multiple platforms, this is a safe way for accessing it.

```javascript
import {Injectable, Provider} from 'angular2/core';
import {window} from 'angular2/src/facade/browser';
import {unimplemented} from 'angular2/src/facade/exceptions';

import {OpaqueToken} from 'angular2/src/core/di';
import {CONST_EXPR} from 'angular2/src/facade/lang';


function _window(): any {
  return window
}

export const WINDOW: OpaqueToken = CONST_EXPR(new OpaqueToken('WindowToken'));

export abstract class WindowRef {
  get nativeWindow(): any {
    return unimplemented();
  }
}

export class WindowRef_ extends WindowRef {
  constructor() {
    super();
  }
  get nativeWindow(): any {
    return _window();
  }
}


export const WINDOW_PROVIDERS = [
  new Provider(WindowRef, {useClass: WindowRef_}),
  new Provider(WINDOW, {useFactory: _window, deps: []}),
];
```

## Usage

You can use it within your app like

```javascript
import {WindowRef, WINDOW_PROVIDERS} from './window-service';

@Component({
    ...
    providers: [ WINDOW_PROVIDERS ]
})
class MyComponent {

    constructor(window: WindowRef) {
        var win = window.nativeWindow.
    }

}

```

