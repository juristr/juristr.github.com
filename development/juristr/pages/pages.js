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
			$(".js-emailfield").prop("href", this._renderMailTo());
		},

		links: function(){
			this.element.html(this._renderMarkdown(this.view('links_md')));	
		},

		//privates
		_renderMarkdown: function(markdownViewContent){
			return "<section class='span6'>" + this._mdConverter.makeHtml(markdownViewContent); + "</section>";
		},

		_renderMailTo: function printEmail() {
			/* Original idea taken from Mihai Parparita, http://persistent.info */
            var a = [106, 117, 114, 105, 46, 115, 116, 114, 117, 109, 112, 102, 108, 111,
                    104, 110, 101, 114, 64, 106, 115, 45, 100, 101, 118, 101, 108, 111, 112, 109, 101,
                    110, 116, 46, 99, 111, 109];
            var b = [];
            for (var i = 0; i < a.length; i++) {
                    b.push(String.fromCharCode(a[i]));
            }
            b = b.join('');
            return "mailto:" + b;
        }
	});

});