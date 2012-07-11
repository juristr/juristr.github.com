//steal/js testapp/scripts/compress.js

load("steal/rhino/rhino.js");
steal('steal/clean',function(){
	steal.clean('testapp/testapp.html',{indent_size: 1, indent_char: '\t'});
});
