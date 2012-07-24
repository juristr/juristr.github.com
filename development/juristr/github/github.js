steal(
	'jquery/controller',
	'jquery/controller/view',
	'jquery/view/ejs')
.then(
	 './views/github.ejs',
	 './views/feedentry.ejs',
	 './views/feedlist.ejs'
	)
.then(function(){
	
	$.Controller('Juristr.Github',{

		init: function(element, options){
			this.element.html(this.view("github"));

			this._loadFeedData("http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=5&output=json&q=https://github.com/juristr.atom&callback=?");
		},

		//privates
		_loadFeedData: function(url){
			$.ajax({
				url: url,
				type: "GET",
				dataType: "JSON",
				success: this.proxy(function(result){
					$(".js-feed-content", this.element).html(
						this.view("feedlist", result.responseData.feed.entries));
				}),
				error: function(e){
					console.log("Oops, an error occured");
				}
			});
		}
	});
});