// load('testapp/scripts/crawl.js')

load('steal/rhino/rhino.js')

steal('steal/html/crawl', function(){
  steal.html.crawl("testapp/testapp.html","testapp/out")
});
