/**
*	v1.0
*	http://juristr.com
*/

(function($){

	var scrollMenuLocked = true;
    function onPageSroll(e) {
            var target = document.body;
            var scrollTop = 0, scrollLeft = 0;
            while (target != null)  {
                    scrollTop += target.scrollTop ? target.scrollTop : 0;
                    scrollLeft += target.scrollLeft ? target.scrollLeft : 0;
                    target = target.parentNode;
            }

            var ch = document.body.clientHeight;
            var item, attr, top, i;
            el = $(".scroll-menu");
            if (scrollTop >= 80)   {
                    if (scrollMenuLocked) {
                            for (i = 0; i < el.length; i++) {
                                    item = $(el[i]);
                                    attr = item.attr('data-top');
                                    top = attr ? attr : '8px';
                                    item.animate({top:top});
                            }
                    }
                    scrollMenuLocked = false;
            }
            else {
                    if (!scrollMenuLocked) {
                            for (i = 0; i < el.length; i++) {
                                    item = $(el[i]);
                                    top = item.height() + 20;
                                    
                                    item.animate({top:(-top).toString() + 'px'})
                            }
                    }
                    scrollMenuLocked = true;
            }
    }

	$.fn.scrolltop = function(){
		var scrollButton = $('<div class="scroll-menu"><div><a href="javascript:;" class="js-scroll">Top</a></div></div>)');
		$("body").prepend(scrollButton);

		scrollButton.find('.js-scroll').click(function(){
			$("html, body").animate({ scrollTop: 0 }, "slow");
		    return false;
		});

		$(window).bind('scroll', onPageSroll);
	};

})(jQuery);