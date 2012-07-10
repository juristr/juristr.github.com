//steal/js juristr/scripts/compress.js

load("steal/rhino/rhino.js");
steal('steal/clean',function(){
	steal.clean('juristr/juristr.html',{indent_size: 1, indent_char: '\t'});
});
