angular.module('AppChat').controller('ChatController', ['$http', '$log', '$scope', '$routeParams',
    function($http, $log, $scope, $routeParams) {
        var thisCtrl = this;

        this.messageList = [];
        this.newText = "";

        this.loadMessages = function(){
            var chatid = $routeParams.cid;
            var reqURL = "https://quepasapp.herokuapp.com/QuePasApp/groups/" + chatid + "/messages";
            users = null
            // $http.get("https://quepasapp.herokuapp.com/QuePasApp/users/").then(function(data){
            //     users = data["data"]["Users"];
                $http.get(reqURL).then( function(data){
                    // Get the messages from the server through the rest api
    
                $log.error("Message Loaded: ", JSON.stringify(thisCtrl.messageList));
                    messages = data["data"]["Messages"];
                    console.log(users)
                    for(m in messages){
                        message = messages[m];
                        // thisCtrl.messageList.push({"id": m, "text": "Hola Mi Amigo", "author" : "Bob",
                        // "like" : 4, "nolike" : 1});
                        thisCtrl.messageList.push({
                            "id":message["msgId"],
                            "text":message["content"],
                            "author":message["username"],
                            "like": message['likes'],
                            "nolike":message['dislikes'],
                        });
                    }
                });
            // });
           
            
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
