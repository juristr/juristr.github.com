/*
	Usage:
	<div id="#terminal">

	</div>

*/
(function(console){

	var browserConsole = console.log;

	console.log = function(msg){
		var liEl = $("<p />");
		liEl.html("&gt; " + msg);
		var $terminal = $("#terminal");
		$terminal.append(liEl);

		$terminal[0].scrollTop = $terminal[0].scrollHeight;

		browserConsole.call(console, msg);
	};

})(console);