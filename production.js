steal.loading('juristr/juristr.js','steal/coffee/coffee.js');
steal({src: '../production.css', has: ['juristr/resources/bootstrap/css/bootstrap.css','juristr/resources/bootstrap/css/bootstrap-responsive.css','juristr/juristr.css']});
steal("./resources/bootstrap/css/bootstrap.css","./resources/bootstrap/css/bootstrap-responsive.css","./juristr.css","steal/coffee");steal.loaded("juristr/juristr.js");steal({src:"./coffee-script.js",ignore:true},function(){steal.type("coffee js",function(a,b){a.text=CoffeeScript.compile(a.text);b()})});steal.loaded("steal/coffee/coffee.js");
