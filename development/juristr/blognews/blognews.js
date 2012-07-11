steal(
	'jquery/controller',
	'jquery/controller/view',
	'jquery/view/ejs')
.then(
	'./views/blognews.ejs',
	'./views/feedlist.ejs',
	'./views/feedentry.ejs')
.then(function(){
	
	$.Controller('Juristr.Blognews',{

		init: function(){
			//google.load("feeds", "1");

			this.element.html(this.view("blognews"));
			this._loadFeedData();
		},

		//privates
		_loadFeedData: function(){
			$.ajax({
				url: "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=http://feeds.feedburner.com/juristrumpflohner&callback=?",
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