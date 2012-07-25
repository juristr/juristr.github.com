steal(
	'jquery/controller',
	'jquery/controller/view',
	'jquery/view/ejs',
	'juristr/blognews',
	'juristr/tweets',
	'juristr/stackexchange',
	'juristr/github')
.then(
	'./views/dashboard.ejs')
.then(function(){

	$.Controller('Juristr.Dashboard',{

		init: function(){
			this.element.html(this.view("dashboard"));

			$(".js-blognews").juristr_blognews();
			$(".js-tweets").juristr_tweets();
			$(".js-stackoverflow-top").juristr_stackexchange({ showLatest: true });
			$(".js-stackoverflow-latest").juristr_stackexchange();
			new Juristr.Github($(".js-github-latest")).loadFeedData();
		}

	});

});