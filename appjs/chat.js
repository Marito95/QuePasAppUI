angular.module('AppChat').controller('ChatController', ['$http', '$log', '$scope',
    function($http, $log, $scope) {
        var thisCtrl = this;

        this.messageList = [];
        this.counter  = 2;
        this.newText = "";

        this.loadMessages = function(){
            // Get the messages from the server through the rest api
            thisCtrl.messageList.push({"id": 1, "text": "Hola Mi Amigo", "author" : "Bob",
            "like" : 4, "nolike" : 1});
            thisCtrl.messageList.push({"id": 2, "text": "Hello World", "author": "Joe",
                "like" : 11, "nolike" : 12});

            $log.error("Message Loaded: ", JSON.stringify(thisCtrl.messageList));
        };

        this.postMsg = function(){
            var msg = thisCtrl.newText;
            // Need to figure out who I am
            var author = "Me";
            var nextId = thisCtrl.counter++;
            thisCtrl.messageList.unshift({"id": nextId, "text" : msg, "author" : author, "like" : 0, "nolike" : 0});
            thisCtrl.newText = "";
        };

        this.loadMessages();
}]);
