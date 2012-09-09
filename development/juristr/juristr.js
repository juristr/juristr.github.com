steal(
	'jquery',
	'jquery/controller',
	'jquery/controller/route',
	'./resources/bootstrap/css/bootstrap.css',
	'./resources/bootstrap/css/bootstrap-responsive.css',
	'./juristr.css',
	'./resources/js/moment.js',
	'./resources/jquery.corners.js')
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
					var cName = registeredControllers[i].Class.shortName.toLowerCase();
					if(oldVal !== newVal && newVal.indexOf(cName) === -1 && oldVal === cName){
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

		'about route': function(){
			var $jsContent = $('.js-content'),
				controller = $jsContent.controller();

			if(controller === undefined || controller.Class.shortName.toLowerCase() !== 'pages'){
				controller = new Juristr.Pages($jsContent);
			}

			controller.about();
		},

		'pages route': function(){
			var $jsContent = $('.js-content'),
				controller = $jsContent.controller();

			if(controller === undefined || controller.Class.shortName.toLowerCase() !== 'pages'){
				controller = new Juristr.Pages($jsContent);
			}

			//controller[data.pagename]();
			controller.renderPagesList();
		},

		'pages/projects route': function(){
			var $jsContent = $('.js-content'),
				controller = $jsContent.controller();

			if(controller === undefined || controller.Class.shortName.toLowerCase() !== 'pages'){
				controller = new Juristr.Pages($jsContent);
			}

			//controller[data.pagename]();
			controller.projects();
		},

		'pages/:pagename route' : function(data){
			var $jsContent = $('.js-content'),
				controller = $jsContent.controller();

			if(controller === undefined || controller.Class.shortName.toLowerCase() !== 'pages'){
				controller = new Juristr.Pages($jsContent);
			}

			//controller[data.pagename]();
			controller.renderPage(data.pagename);
		}
	});

	//new Juristr.Routing(document.body);	
	$(".gravatar").corner("5px");

	//$("#screenloading").hide();
	//$("#container").fadeIn();
});