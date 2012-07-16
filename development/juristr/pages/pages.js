steal(
	'jquery/controller',
	'jquery/controller/route',
	'jquery/controller/view',
	'jquery/view/ejs')
.then(function(){
	
	$.Controller('Juristr.Pages', {

		init: function(){

		},

		"pages/about route": function(){
			console.log("pages about route");
		}

	});

});