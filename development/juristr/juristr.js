steal( 
	'./resources/bootstrap/css/bootstrap.css',
	'./resources/bootstrap/css/bootstrap-responsive.css',
	'./juristr.css',
	'juristr/dashboard',
	'./resources/js/moment.min.js')
.then(function(){
	
	$(".js-content").juristr_dashboard();
	
});