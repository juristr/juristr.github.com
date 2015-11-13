Angular 2 Beta Release Burndown 
---

Frontend code for: [Angular 2 Beta Release Projection](http://juristr.com/apps/ng2beta/).


## How does it work

- Made with [Angular 2](https://angular.io)! ... of course ;)
- index.html containing the copy&paste + adjustments of [ANDROID.COM MDL SKIN](http://www.getmdl.io/templates/android-dot-com/index.html).
- `data.json` gets automatically committed by [this guy](https://github.com/juristr/github-milestone-burndown) once changes on the Angular milestone/issues are detected. 

This app/page is directly integrated into my [Jekyll](https://jekyllrb.com/) powered blog post that gets
deployed by GitHub Pages. Meaning, the source is committed to master on this repo
and GitHub Pages will compile the Jekyll output and deploy it.

## Run it locally

```
npm install
gulp play
```

**Note**: ignore Typescript warnings when you run it. This was converted on the quick and didn't have time to get the .d.ts files all straight.

## Credits

Project setup based on [ng2-play](https://github.com/pkozlowski-opensource/ng2-play)

<table>
	<tr valign="top">
		<td>
			[<img alt="NathanWalker" src="https://avatars.githubusercontent.com/u/457187?v=3&s=117" width="117">](https://github.com/NathanWalker)
		</td>
		<td>
			Special thanks to [Nathan Walker](https://github.com/NathanWalker) for converting the original implementation
to Angular 2 :clap:		
		</td>
	</tr>
</table>
  

