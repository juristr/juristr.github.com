steal(
	'jquery/controller',
	'jquery/controller/route',
	'jquery/controller/view',
	'jquery/view/ejs')
.then(
	//'./resources/markdown/Markdown.Sanitizer.js',
	'./resources/markdown/Markdown.Converter.js'
	)
.then(function(){
	
	$.Controller('Juristr.Pages', {
		_mdConverter: undefined,

		init: function(){
			this._mdConverter = new Markdown.Converter();
		},

		//publics
		about: function(){
			this.element.html(this._renderMarkdown(this.view('about_md')));
		},

		//privates
		_renderMarkdown: function(markdownViewContent){
			return this._mdConverter.makeHtml(markdownViewContent);
		}
	});

});