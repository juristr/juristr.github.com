(function(exports, undefined){

    // replace this url with yours!!
    var firebase = new Firebase('https://juristr.firebaseio.com/'),
        firebaseKudos = firebase.child('kudos'),
        key = document.location.pathname.replace(/[\/-]/g,'');

    var getAuthData = function(){
        var deferred = $.Deferred();

        var authData = firebase.getAuth();
        if(authData == null){
            // authenticate the user
            firebase.authAnonymously(function(err, authenticationData) {
                //authData = authenticationData
                deferred.resolve(authenticationData);
            });
        }else{
            deferred.resolve(authData);
        }

        return deferred.promise();
    };

    // fix for local debugging
    if(key === ''){
        key = 'localhost'
    }

    var hasVoted = function(){
        var deferred = $.Deferred();

        getAuthData().then(function(authData){
            firebaseKudos.child(key).child('likes').child(authData.uid).once('value', function(snap){
                deferred.resolve(snap.val() !== null);
            });
        });
        return deferred.promise();
    };


    var addKudo = function(){
        getAuthData().then(function(authData){
            firebaseKudos
                .child(key)
                .child('likes')
                .child(authData.uid)
                .set({
                    count: 1
                });
        });
    };

    var removeKudo = function(){
        getAuthData().then(function(authData){
            firebaseKudos
                .child(key)
                .child('likes')
                .child(authData.uid)
                .remove();
        });
    };

    // listening for updates

    var onKudoUpdates = function(cb){
        firebaseKudos.child(key).on('value', function(snapshot){
            if(snapshot){
                var article = snapshot.val();
                var likeCount = 0;
                if(article){
                    for(var prop in article.likes){
                        likeCount++;
                    }

                    // old counts for backwards compatibility
                    if(article.count){
                        likeCount += article.count;
                    }

                }
                cb(likeCount);
            }
        });
    }

    var firebaseStorage = {
        hasVoted: hasVoted,
        addKudo: addKudo,
        removeKudo: removeKudo,
        onKudoUpdates: onKudoUpdates
    };

    exports.firebaseStorage = firebaseStorage;

})(window);