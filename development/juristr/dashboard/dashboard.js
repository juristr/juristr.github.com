steal(
	'jquery/controller',
	'jquery/controller/view',
	'jquery/view/ejs',
	'juristr/blognews')
.then(
	'./views/dashboard.ejs')
.then(function(){

	$.Controller('Juristr.Dashboard',{

		init: function(){
			this.element.html(this.view("dashboard"));

			$(".js-blognews").juristr_blognews();
		}

	});

});