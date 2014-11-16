(function($, browserStore, undefined){

    var Kudoable,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

    Kudoable = (function() {
        var key = document.location.pathname;

        function Kudoable(element){
            this.element = element;

            this.start = __bind(this.start, this);
            this.stop = __bind(this.stop, this);
            this.complete = __bind(this.complete, this);
            this.undo = __bind(this.undo, this);

            // hook on the mouse and touch events
            $(document).on('touchstart', this.element, this.start);
            $(document).on('touchend', this.element, this.stop);
            this.element.mouseenter(this.start);
            this.element.mouseleave(this.stop);
            this.element.click(this.undo);

            // init
            this.render();
            this.$counter = this.element.find('.count .num');

            if(browserStore.get(key) === true){
                // set to complete
                this.element.addClass('complete');
            }
        }

        Kudoable.prototype.render = function(){
            var template = $('<a class="kudobject">' +
                                    '<div class="opening">' +
                                        '<div class="circle">&nbsp;</div>' +
                                    '</div>' +
                                '</a>' +
                                '<a href="#kudo" class="count">' +
                                    '<span class="num">0</span>' +
                                    '<span class="txt">Kudos</span>' +
                                '</a>');
            this.element.append(template);
        };

        Kudoable.prototype.start = function(){
            if(!this.isKudoed()){
                this.element.addClass('active');

                this.activationTimer = setTimeout(this.complete, 700);
            }
        };

        Kudoable.prototype.stop = function(){
            clearTimeout(this.activationTimer);

            this.element.removeClass('active');
        };

        Kudoable.prototype.complete = function(){
            this.stop();

            this.incrementCount();
            browserStore.set(key, true);
            this.element.trigger('kudo.added', { count: this.currentCount() });

            this.element.addClass('complete');
        };

        Kudoable.prototype.undo = function(){
            if(this.isKudoed()){
                if(this.currentCount() > 0){
                    this.decrementCount();
                }

                browserStore.set(key, false);
                this.element.trigger('kudo.removed', { count: this.currentCount() });

                this.element.removeClass('complete');
            }
        };

        Kudoable.prototype.currentCount = function(){
            var count = parseInt(this.$counter.html(), 10);
            if(isNaN(count))
                count = 0;

            return count;
        };

        Kudoable.prototype.isKudoed = function(){
            return this.element.hasClass('complete');
        };

        Kudoable.prototype.setCount = function(count){
            this.$counter.html(count);
        };

        Kudoable.prototype.incrementCount = function(){
            this.setCount(this.currentCount() + 1);
        };

        Kudoable.prototype.decrementCount = function(){
            this.setCount(this.currentCount() - 1);
        };

        return Kudoable;

    })();

    $(function(){
        $.fn.kudoable = function() {
            return this.each(function(){
                return new Kudoable($(this));
            });
        };
    })

})(jQuery, $.jStorage);