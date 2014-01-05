(function($, undefined){

    // replace this url with yours!!
    var firebaseUrl = 'https://juristr.firebaseio.com/kudos',
        key = document.location.pathname.replace(/[\/-]/g,''),
        kudoStore = new Firebase(firebaseUrl);

    // slightly hacky way of updating the count
    var updateKudoCount = function(count){
        $('.count .num').html(count);
    };

    // fix for locla debugging
    if(key === ''){
        key = 'localhost'
    }

    //retrieve the current kudo count
    $.getJSON(firebaseUrl + '/' + key + ".json", function(result){
        if(result){
            result.count = result.count || 0;
            updateKudoCount(result.count);
        }
    });

    $(document).on('kudo.added', function(e, data){
        kudoStore.child(key).set({ count: data.count });
    });

    $(document).on('kudo.removed', function(e, data){
       kudoStore.child(key).set({ count: data.count }); 
    });

    // listening for updates
    var kudoEntry = new Firebase(firebaseUrl + '/' + key);
    kudoEntry.on('value', function(snapshot){
        if(snapshot && snapshot.val()){
            updateKudoCount(snapshot.val().count);
        }
    });

})(jQuery);