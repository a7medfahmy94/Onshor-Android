angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
.factory('User', function($q, $http, BASE_URL){
  var User = {
    currentUser: null
  };

  User.get = function(device_id) {
    var deferred = $q.defer();
    $http.get(BASE_URL + '/users/' + device_id).then(function(response){
      User.currentUser = response.data;
      deferred.resolve(response);
    }, function(response){
      deferred.reject(response);
    });

    return deferred.promise;
  }

  User.update = function(user) {
    return $http.put(BASE_URL + '/users/' + user.id, {
      user: user
    });
  }

  User.block = function(id) {
    return $http.post(BASE_URL + '/users/' + User.currentUser.id + '/block/' + id);
  }

  return User;
})
.factory('Message', function($http, User, BASE_URL) {
  var Message = {};

  Message.send = function(msg) {
    return $http.post(BASE_URL + '/posts',{
      post: {
        content: msg,
        user_id: User.currentUser.id,
        priority: "low"
      }
    });
  };

  Message.share = function(msg) {
    return $http.post(BASE_URL + '/posts/' + msg.id + '/share', {
      user_id: User.currentUser.id
    });
  }

  Message.reply = function(post, msg){
    return $http.post(BASE_URL + '/posts',{
      post: {
        content: msg,
        user_id: User.currentUser.id,
        reply_to: post.user_id,
        priority: "medium"
      }
    });
  }
  return Message;
})
.factory('Device', function($cordovaDevice,$cordovaGeolocation){
  var Device = {
    deviceId: null
  };

  Device.id = function() {
    if (Device.deviceId == null) {
      if (!(ionic.Platform.isAndroid() || ionic.Platform.isIOS())) {
        return "000";
      }
      return $cordovaDevice.getUUID();
    } else {
      return Device.deviceId;
    }
  }

  Device.geolocation = function() {
    return $cordovaGeolocation.getCurrentPosition();
  }

  return Device;
})
