steal(
	'jquery/controller',
	'jquery/controller/route',
	'jquery/controller/view',
	'jquery/view/ejs',
	'./pages.css')
.then(
	//'./resources/markdown/Markdown.Sanitizer.js',
	'./resources/markdown/Markdown.Converter.js',
	'./resources/prettify.js',
	'./resources/jqueryui/jquery-ui-1.8.23.custom.css',
	'./resources/jqueryui/jquery-ui-1.8.23.custom.min.js'
	)
.then(
	'./resources/tocify/jquery.tocify.css',
	'./resources/tocify/jquery.tocify.js')
.then(
	'./views/pageslist.ejs',
	'./views/versionhistory.ejs'
	)
.then(function(){
	
	$.Controller('Juristr.Pages', {
		_mdConverter: undefined,

		init: function(){
			this._mdConverter = new Markdown.Converter();
		},

		//publics
		renderPage: function(pageName){
			var $versionHistory,
				$toc;

			this.element.html(this._renderMarkdown(this.view(pageName + "_md")));

				url: "https://api.github.com/repos/juristr/juristr.github.com/commits?per_page=10&path=./juristr/pages/views/" + pageName + "_md.ejs&callback=?",
			$toc = this.element.find("#toc");
			if($toc.length > 0){
				$toc.remove();

				var $navSection = $("<section class='span4'></div>");
					$navSection.append($toc);
					
				this.element.append($navSection);

				$toc.tocify();
			}

			this._addPrettify();
			prettyPrint();

			$versionHistory = this.element.find("#versionhistory");
			if($versionHistory.length > 0){
				$.ajax({
					url: "https://api.github.com/repos/juristr/juristr.github.com/commits?path=./juristr/pages/views/" + pageName + "_md.ejs&callback=?",
					dataType: "json",
					type: "GET",
					success: this.proxy(function(result){
						$versionHistory.html(this.view("versionhistory", result.data));
					})
				});
			}
		},

		renderPagesList: function(){
			$.ajax({
				url: "/juristr/pages/pages.json",
				dataType: "json",
				type: "GET",
				success: this.proxy(function(data){
					this.element.html(this.view("pageslist", data));
				}),
				error: function(e){
					alert("error");
				}
			});
		},

		about: function(){
			this.element.html(this._renderMarkdown(this.view('about_md')));
			$(".js-emailfield").prop("href", this._renderMailTo());
		},

		projects: function(){
			this.element.html(this._renderMarkdown(this.view('projects_md')));
			//$(".js-github-projects").html("github stuff here...");
			new Juristr.Github($(".js-github-projects")).displayMyProjects();
		},

		//privates
		_renderMarkdown: function(markdownViewContent){
			return "<section class='span8 pages-content'>" + this._mdConverter.makeHtml(markdownViewContent); + "</section>";
		},

		_renderMailTo: function() {
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
        },

        _addPrettify: function () {
			var els = document.querySelectorAll('pre');
			for (var i = 0, el; el = els[i]; i++) {
				if (!el.classList.contains('noprettyprint')) {
					el.classList.add('prettyprint');
				}
				el.classList.add('drop-shadow');
				el.classList.add('curved');
				el.classList.add('curved-hz-2');
			}
		}
	});

});