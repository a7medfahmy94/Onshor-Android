angular.module('starter.controllers', [])

.controller('HomeCtrl', function($rootScope, $scope, $cordovaGeolocation, $timeout, $ionicLoading,$ionicPopup , User, Device, Message, LOCATION_UPDATE_INTERVAL) {
  var init = function() {
    $scope.page = {
      status:  "init...",
      channels: []
    };
    $scope.posts = new PriorityQueue({ comparator: function(p1, p2) { return p1.priority - p2.priority; }});
    $scope.connect();
    $scope.$watchCollection('posts',function(posts){
      $scope.currentPost = null;
      if(posts.length > 0)
        $scope.currentPost = posts.peek();
    });
    var watchOptions = {
      timeout : LOCATION_UPDATE_INTERVAL,
      enableHighAccuracy: false // may cause errors if true
    };

    var watch = $cordovaGeolocation.watchPosition(watchOptions);
    watch.then(
      null,
      function(err) {
        // error
      },
      function(position) {
        User.currentUser.longitude = position.coords.longitude;
        User.currentUser.latitude = position.coords.latitude;
        User.update(User.currentUser);
    });

    $scope.message = {body: ''};
  };

  $scope.connect = function() {
    $scope.page.status = "Connecting.."
    User.get(Device.id()).then(function(){
      $scope.page.status = "Connected";
      var user = User.currentUser;
      $scope.currentUser = User.currentUser;
      angular.forEach($scope.page.channels,function(ch){
        $rootScope.pusher.unsubscribe(ch);
      })
      $scope.page.channels = [user.device_id];
      $scope.channel = $rootScope.pusher.subscribe(user.device_id);
      $scope.channel.bind('new_post', function(data) {
        $scope.$apply(function(){
            $scope.posts.queue(data.message);
          // $scope.page.status = data.message.content;
        })
      });
    });
  }

  $scope.sendMessage = function() {
    $ionicLoading.show();
    Message.send($scope.message.body).then(function(response){
      $scope.message.body = '';
      $ionicLoading.hide();
      $scope.flash = "Sent !";
      $timeout(function(){
        $scope.flash = '';
      }, 2000)
    })
  };

  $scope.sharePost = function() {
    if($scope.posts.length > 0)
      Message.share($scope.currentPost).then(function(response){
        $scope.nextPost();
      })
  }

  $scope.nextPost = function() {
    if ($scope.posts.length > 0)
      $scope.posts.dequeue();
  }

  $scope.setDeviceId = function(deviceId) {
    Device.deviceId = deviceId;
  }

  // will execute when device is ready, or immediately if the device is already ready.
  ionic.Platform.ready(function(){
    init();
  });

  $scope.reply = function() {
    if($scope.currentPost){
      $scope.data={};
      var myPopup = $ionicPopup.show({
        template: '<input type = "text" ng-model = "data.model">',
        title: 'Reply',
        subTitle: $scope.currentPost.content,
        scope: $scope,

        buttons: [
           { text: 'Cancel' }, {
              text: '<b>Send</b>',
              type: 'button-positive',
                 onTap: function(e) {
                    if (!$scope.data.model) {
                       //don't allow the user to close unless he enters model...
                          e.preventDefault();
                    } else {
                       return $scope.data.model;
                    }
                 }
           }
        ]
     });

     myPopup.then(function(msg) {
       Message.reply($scope.currentPost, msg).then(function(){

       });
     });
    }
  }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
