steal( 
	'./resources/bootstrap/css/bootstrap.css',
	'./resources/bootstrap/css/bootstrap-responsive.css',
	'./juristr.css',
	'./resources/js/moment.js')
.then(
	'juristr/dashboard')
.then(function(){
	
	$(".js-content").juristr_dashboard();
	
});