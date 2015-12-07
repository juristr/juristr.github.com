(function() {
  if($('.image--full').length > 0) {

    function rearrange(container){
      var $this = container.find('.image--full').first();
      var allPrevious = $this.prevUntil('.image--full');
      var allNext = $this.nextAll();

      var newContainer = $('<div>').addClass('article-body');
      newContainer.append(allPrevious.get().reverse());

      var newContainerAfter = $('<div>').addClass('article-body');
      newContainerAfter.append(allNext);

      newContainer.insertAfter(container);
      $this.insertAfter(newContainer);
      newContainerAfter.insertAfter($this);

      container.remove();

      if(newContainerAfter.find('.image--full').length > 0) {
        rearrange(newContainerAfter);
      }
    }

    rearrange($('.article-body'));
  }
})();