//steal/js juristr/scripts/compress.js

load("steal/rhino/rhino.js");
steal('steal/build','steal/build/scripts','steal/build/styles',function(){
	steal.build('juristr/scripts/build.html',{to: '../'});
});
