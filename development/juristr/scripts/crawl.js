// load('juristr/scripts/crawl.js')

load('steal/rhino/rhino.js')

steal('steal/html/crawl', function(){
  steal.html.crawl("juristr/juristr.html","juristr/out")
});
