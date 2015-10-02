---
layout: link
type: link
title: "Building an Enterprise CSS Framework"
link: https://medium.com/salesforce-ux/building-an-enterprise-framework-is-hard-1e8d8b33e082
tags: [undefined]
---
I've already had a couple of times the chance to work on a common style guide for our enterprise-wide web applications. It **really is tough**. Not only in coming up with a standard that meet the need of most of our apps, but especially in documenting, maintaining and letting evolve it over time.

The people from Salesforce seem to have done a really really nice job: [Lightning Design System](https://www.lightningdesignsystem.com/)

---

## Some notes

- have a living style guide
- design system of patterns, CSS + markup samples, icons, custom fonts, color swatches etc...
- resources used equally by internal devs as well as external partners (huge :thumbsup: )
- 4 design principles: clarity, efficiency, consistency, beauty
- Clarity
  - prefer verbose class names for the sake of saving bits
  - adopted [BEM naming](https://css-tricks.com/bem-101/).
  - documentation
  - living example, you can interact with (i.e.) the button, hover it, click it..
- Efficiency
  - audit & collect components in your different web apps and standardize them
  - align styles: common borders, font sizes,...
  - build inventory of components
  - start from smallest component -> aggregate to build larger ones
  - account for special needs: enterprise apps might have unique traits
  - interesting decision: make all headings same size to avoid scenarios where devs take a lower/higher heading just for the purpose of having a larger/smaller font. Use semantic classes instead
  - accessibility!
- Consistency
  - design tokens: basic atoms of the design system, common variables like fonts, colors,... (can be done with SASS, Less)
  - play well with others -> prefix styles
- Beauty
  - SVG icons -> with sprites
  - width controlled by parent container
- How to make decisions
  - work in a group, debates -> [Cap Watkins Sliding Scale](http://blog.capwatkins.com/the-sliding-scale-of-giving-a-fuck)
  - go open source to gather feedback
- Open Source:
  - [https://github.com/salesforce-ux/design-system](https://github.com/salesforce-ux/design-system)
  - [https://www.lightningdesignsystem.com](https://www.lightningdesignsystem.com)
