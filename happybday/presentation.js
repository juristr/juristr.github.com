jQuery.fn.wait = function (MiliSeconds) {
    $(this).animate({ opacity: '+=0' }, MiliSeconds);
    return this;
};

$(function(){
  setTimeout(function(){
    $('.js-hint').show();
  }, 15000);
});

$(window).load(function() {
  var currentStep = 0,
      steps = $(".js-step"),
      maxSteps = steps.length,
      showNextStep = function(){
        steps.hide();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        var currStepEl = $(steps[currentStep]).fadeIn('slow');
        currentStep = currentStep + 1;
        return currStepEl;
      },
      loop = function(){
        var $element = showNextStep(),
            waitTime = $element.data('wait') || 5000;
        if(currentStep < maxSteps){
          setTimeout(function(){
            loop();
          }, waitTime);
        }
      };
  steps.hide();

  $('.js-start')
    .html('Ok, jetzt clickn :)')
    .removeAttr('disabled')
    .removeClass('disabled');
  
  $('.js-start').click(function(){
    $('.js-preintro').hide();
    $('.js-presentation').show();
    loop();
  });

  $('.js-open-packtl').click(function(){
    steps.hide();
    $('.js-packtl').fadeIn('slow');
  });

  $('.js-hint').remove();
});