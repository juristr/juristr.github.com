//steal/js testapp/scripts/compress.js

load("steal/rhino/rhino.js");
steal('steal/build','steal/build/scripts','steal/build/styles',function(){
	steal.build('testapp/scripts/build.html',{to: 'testapp'});
});
