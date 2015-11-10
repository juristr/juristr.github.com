Angular 2 Beta Release Burndown 
---

Frontend code for: [Angular 2 Beta Release Projection](http://juristr.com/apps/ng2beta/).


## How does it work

Nothing special as of now:

- jQuery mess in `main.js`
- index.html containing the copy&paste + adjustments of [ANDROID.COM MDL SKIN](http://www.getmdl.io/templates/android-dot-com/index.html).
- `data.json` gets automatically committed by [this guy](https://github.com/juristr/github-milestone-burndown) once changes on the Angular milestone/issues are detected. 

This app/page is directly integrated into my [Jekyll](https://jekyllrb.com/) powered blog post that gets
deployed by GitHub Pages. Meaning, the source is committed to master on this repo
and GitHub Pages will compile the Jekyll output and deploy it.

## Run it locally

Currently the best way is to install `http-server`

```
$ npm install http-server -g
```

and then execute it within this directory, like

```
$ http-server -p 1234
```
