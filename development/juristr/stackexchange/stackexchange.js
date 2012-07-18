steal(
	'jquery/controller',
	'jquery/controller/view',
	'jquery/view/ejs')
.then(
	)
.then(function(){
	
	$.Controller('Juristr.Stackexchange',{

		init: function(){
			this.element.html(this.view("stackoverflow"));
			this._loadFeedData();
			/* 
				Answers: http://api.stackexchange.com/2.0/users/50109/answers?site=stackoverflow
				Questions: http://api.stackexchange.com/2.0/questions/11518816;11518470?order=desc&sort=activity&site=stackoverflow
			*/
		},

		//privates
		_loadFeedData: function(){
			$.ajax({
				url: "http://api.stackexchange.com/2.0/users/50109/answers?site=stackoverflow&pagesize=10&callback=?",
				type: "GET",
				dataType: "JSON",
				success: this.proxy(function(result){
					
					$(".js-feed-content", this.element).html(
						this.view("feedlist", result.items));
				}),
				error: function(e){
					console.log("Oops, an error occured");
				}
			});
		}

	});

});