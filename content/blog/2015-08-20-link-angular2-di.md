---
type: post
title: Host and Visibility in Angular 2's Dependency Injection
link: >-
  http://blog.thoughtram.io/angular/2015/08/20/host-and-visibility-in-angular-2-dependency-injection.html
category: null
categories:
  - Angular
  - JavaScript
date: 2015-08-20T00:00:00.000Z
comments: true
url: /blog/2015/08/link-angular2-di
---

[@PascalPrecht](https://twitter.com/PascalPrecht) dives into the details of Angular 2's dependency injection.

- Angular 2's DI to solve all current issues
- more flexible; concept of host and child injectors

Definition of a binding on a `<video-player>` component:

```javascript
@Component({
  selector: 'video-player',
  bindings: [
    PlayerService // shorthand for bind(PlayerService).toClass(PlayerService)
  ]
})
@View({ ... })
class VideoPlayer {
  ...
}
```

Child component `PlayButton`

```javascript
@Component...
@View...
class PlayButton {
  constructor(playerService: PlayerService) { ... }
}
```

In this case the dependency for `PlayerService` will be searched upwards recursively. Problem: the parent component doesn't define it.

To restrict the search to remain within the component host, we can use `@Host()`:

```javascript
...
constructor(@Host() playerService: PlayerService) { ... }
```

To **bind a specific instance** this syntax can be used:

```javascript
@Component({
  selector: 'video-player',
  bindings: [
    PlayerService,
    bind(VideoService).toClass(SpecificVideoService)
  ]
})
...
```

Problem: we might want to give `SpecificVideoService` only to the `<video-player>`'s view itself. Child components should get `VideoService` as usual.

`viewBindings` can be used for that. They allow to control the visibility "downwards", basically to specify
which bindings are available to which child injectors (light or shadow dom).

```javascript
@Component({
  selector: 'video-player',
  bindings: [
    PlayerService
  ],
  viewBindings: [
    bind(VideoService).toClass(SpecificVideoService)
  ]
})
@View({ ... })
class VideoPlayer {
  ...
}
```

Really cool article. Check it out!
