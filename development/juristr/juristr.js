steal(
	'jquery/controller',
	'jquery/controller/route',
	'./resources/bootstrap/css/bootstrap.css',
	'./resources/bootstrap/css/bootstrap-responsive.css',
	'./juristr.css',
	'./resources/js/moment.js')
.then(
	'juristr/dashboard',
	'juristr/pages')
.then(function(){
	
	$.Controller('Juristr.Routing', {

		init: function(){

		},

		'route' : function(){
			$.route.attr("route", "dashboard");	//redirect to dashboard route		
		},

		'dashboard route' : function(){
			$('.js-content').juristr_dashboard();
		},

		'pages/:type route' : function(){
			console.log("juristr routing pages/:type");
			$('.js-content').juristr_pages();
		}

	});

	new Juristr.Routing(document.body);


	//$(".js-content").juristr_dashboard();
	
});