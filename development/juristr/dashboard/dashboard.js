steal(
	'jquery/controller',
	'jquery/controller/view',
	'jquery/view/ejs',
	'juristr/blognews',
function(){

	$.Controller('Juristr.Dashboard',{

		init: function(){
			this.element.html(this.view("dashboard"));

			$(".js-blognews").juristr_blognews();
		}

	});

});