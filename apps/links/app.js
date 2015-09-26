angular
  .module('links', [
    'ngMaterial',
    'firebase'
  ])
  .run(function(user){
    user.login();
  })
  .factory('user', function($firebaseAuth){
    var authData;
    var service = {
      login: login,
      getUid: getUid
    };
    return service;

    ////////////////////////

    function login(){
      var ref = new Firebase("https://juristr-linkshare.firebaseio.com");
      var auth = $firebaseAuth(ref);

      auth.$authWithOAuthPopup("github").then(function(authDataObj){
        authData = authDataObj;
        console.log('Authenticated.', authData);
      });
    }

    function getUid(){
      return authData.uid;
    }
  })
  .controller('FormController', function($firebaseArray, user){
    var vm = this;
    vm.submitLink = submitLink;

    var scheduledLinksRef = new Firebase("https://juristr-linkshare.firebaseio.com/scheduled");
    var scheduledLinks = $firebaseArray(scheduledLinksRef);

    //////////////////////

    function submitLink(link){
      // add user id
      link.uid = user.getUid();

      scheduledLinks.$add(link).then(function(){
        vm.link = {};
      });
    }
  })
  .controller('ScheduledListController', function($firebaseArray){
    var vm = this;
    vm.removeLink = removeLink;
    var scheduledLinksRef = new Firebase("https://juristr-linkshare.firebaseio.com/scheduled");

    init();

    /////////////////////////////

    function init(){
      vm.scheduledLinks = $firebaseArray(scheduledLinksRef);
    }

    function removeLink(scheduledLink){
      vm.scheduledLinks.$remove(scheduledLink.$id).then(function(){
        alert('done');
      });
    }

  });