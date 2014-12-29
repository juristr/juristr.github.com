// $(function() {
//   var $nav = $('.metabar'),
//     _hideShowOffset = 20,
//     _lastScroll = 0,
//     _detachPoint = 50;

//   $(window).scroll(function() {
//     var t = $(window).scrollTop(),
//       e = t > _lastScroll ? "down" : "up",
//       i = Math.abs(t - _lastScroll);

//     if (t >= _detachPoint || 0 >= t || t > -1) {
//       if ('down' === e && i >= _hideShowOffset) {
//         $nav.slideDown();
//       } else if ('up' === e && i >= _hideShowOffset) {
//         $nav.slideUp();
//       }
//     }

//     _lastScroll = t;
//   });
// });