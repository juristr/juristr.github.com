steal(
	'jquery/controller',
	'jquery/controller/view',
	'jquery/view/ejs',
	'//juristr/resources/bootstrap/js/bootstrap.js')
.then(
	 './views/github.ejs',
	 './views/feedentry.ejs',
	 './views/feedlist.ejs',
	 './views/githubprojectlist.ejs',
	 './views/githubprojects.ejs'
	)
.then(function(){
	
	$.Controller('Juristr.Github',{

		init: function(element, options){
			//this._loadFeedData("http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=5&output=json&q=https://github.com/juristr.atom&callback=?");
		},

		//publics
		displayMyProjects: function(){
			this.element.html(this.view("githubprojects"));

			//https://api.github.com/users/juristr/repos?per_page=5
			$.ajax({
				url: "https://api.github.com/users/juristr/repos?per_page=15&callback=?",
				type: "GET",
				dataType: "JSON",
				success: this.proxy(function(result){
					var $githubprojContainer = $(".js-githubproj-content", this.element);
					$githubprojContainer.html(
						this.view("githubprojectlist", result.data));
					$("*[rel=tooltip]", $githubprojContainer).tooltip()
				}),
				error: function(e){
					console.log("Oops, an error occured");
				}
			});
		},

		loadFeedData: function(){
			var url = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=5&output=json&q=https://github.com/juristr.atom&callback=?";
			this.element.html(this.view("github"));
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