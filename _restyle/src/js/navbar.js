$(function() {
  var $nav = $('nav'),
    _hideShowOffset = 10,
    _lastScroll = 0,
    _detachPoint = 50;

  $(window).scroll(function() {
    var t = $(window).scrollTop(),
      e = t > _lastScroll ? "down" : "up",
      i = Math.abs(t - _lastScroll);

    if (t >= _detachPoint || 0 >= t || t > -1) {
      if ('down' === e && i >= _hideShowOffset) {
        $nav.slideUp();
      } else if ('up' === e && i >= _hideShowOffset) {
        $nav.slideDown();
      }
    }

    _lastScroll = t;
  });
});