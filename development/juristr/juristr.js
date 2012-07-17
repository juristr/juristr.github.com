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
			// article about routing:
			// https://forum.javascriptmvc.com/#Topic/32525000000837567

			$.route.bind('change', function(ev, attr, how, newVal, oldVal){
				var registeredControllers = $('.js-content').controllers();
				for(var i=0; i<registeredControllers.length; i++){
					if(oldVal){
						registeredControllers[i].destroy();
					}
				}
			});
		},

		'route' : function(){
			$.route.attr("route", "dashboard");	//redirect to dashboard route
		},

		'route change': function(){
			console.log("Route changed: ", arguments);
		},

		'dashboard route' : function(){
			$('.js-content').juristr_dashboard();
		},

		'pages/about route' : function(){
			var $jsContent = $('.js-content'),
				controller = $jsContent.controller();

			if(controller === undefined || controller.Class.shortName.toLowerCase() !== 'pages'){
				controller = new Juristr.Pages($jsContent);
			}

			controller.about();
		}
	});

	new Juristr.Routing(document.body);


	//$(".js-content").juristr_dashboard();
	
});