steal(
	'jquery/controller',
	'jquery/controller/view',
	'jquery/view/ejs')
.then(
	'./views/tweets.ejs',
	'./views/tweetlist.ejs',
	'./views/tweetentry.ejs')
.then(function(){
	
	$.Controller('Juristr.Tweets',{

		init: function(){
			//google.load("feeds", "1");

			this.element.html(this.view("tweets"));
			this._loadFeedData();
		},

		//privates
		_loadFeedData: function(){
			$.ajax({
				url: "https://twitter.com/statuses/user_timeline/juristr.json?count=10&callback=?",
				type: "GET",
				dataType: "JSON",
				success: this.proxy(function(result){
					$(".js-feed-content", this.element).html(
						this._urlify(this.view("tweetlist", result)));

				}),
				error: function(e){
					console.log("Oops, an error occured");
				}
			});
		},

		_urlify: function(text){
		    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
		    return text.replace(exp,"<a href='$1'>$1</a>"); 
		}

	});

});