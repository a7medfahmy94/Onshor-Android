angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $timeout, User, Device, Message) {
  var init = function() {
    User.get(Device.id());
    $scope.message = {body: ''};
  };

  $scope.sendMessage = function() {
    $scope.status = "sending...";
    Message.send($scope.message.body).then(function(response){
      $scope.message.body = '';
      $timeout(function(){
        $scope.status = "success";
        $timeout(function(){
          $scope.status = "";
        }, 3000);
      }, 3000);
    },function(response){
      $timeout(function(){
        $scope.status = "fail";
        $timeout(function(){
          $scope.status = "";
        }, 3000);
      }, 3000);
    })
  };

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
