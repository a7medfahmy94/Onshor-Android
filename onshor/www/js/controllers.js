angular.module('starter.controllers', [])

.controller('HomeCtrl', function($rootScope, $scope, $cordovaGeolocation, $timeout, $ionicLoading, User, Device, Message, LOCATION_UPDATE_INTERVAL) {
  var init = function() {
    $scope.page = {
      status:  "init..."
    };
    $scope.posts = [];
    $scope.currentPost = null;

    $scope.connect();

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
      $scope.channel = $rootScope.pusher.subscribe(user.id.toString());
      $scope.channel.bind('new_post', function(data) {
        $scope.$apply(function(){
          if ($scope.currentPost == null) {
            $scope.currentPost = data.message
          } else {
            $scope.posts.push(data.message);
          }
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
    })
  };

  $scope.sharePost = function() {
    Message.share($scope.currentPost).then(function(response){
      if ($scope.posts.length > 0) {
        $scope.currentPost = $scope.posts[0];
        $scope.posts.splice(0,1);
      } else {
        $scope.currentPost = null;
      }
    })
  }

  // will execute when device is ready, or immediately if the device is already ready.
  ionic.Platform.ready(function(){
    init();
  });
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
