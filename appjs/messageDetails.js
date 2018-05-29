angular.module('AppChat').controller('MessageDetailsController', ['$http', '$log', '$scope', '$routeParams', '$window',
    function($http, $log, $scope, $routeParams, $window) {
        
        var thisCtrl = this;
        this.likesList = [];
        this.dislikesList = [];
        this.currentGroupId = $routeParams.cid;
        this.currentGroupName = $routeParams.cname;
        this.currentMessageId = $routeParams.msgid;

        this.loadDetails = function(){

            if(currentUser == "")
               thisCtrl.redirectToLogin();
               
            $log.log("MessageId : " + thisCtrl.currentMessageId.toString());
            var chatid = $routeParams.cid;
            var reqURL = "http://192.168.0.3:8000/QuePasApp/messages/" + thisCtrl.currentMessageId + "/likes";
            //var reqURL = "https://quepasapp.herokuapp.com/QuePasApp/users/" + currentUserId + "/groups/";
            $http.get(reqURL).then( function(response){
                // Get the messages from the server through the rest api

                result = response.data.Users;
                $log.log("Users that like : ", JSON.stringify(result));
                
                    for(u in result){
                        user = result[u];
                        thisCtrl.likesList.push({
                                    "username":user["username"]
                        });
                    }
                
                
            });


            var reqURL = "http://192.168.0.3:8000/QuePasApp/messages/" + thisCtrl.currentMessageId + "/dislikes";
            //var reqURL = "https://quepasapp.herokuapp.com/QuePasApp/users/" + currentUserId + "/groups/";
            $http.get(reqURL).then( function(response){
                // Get the messages from the server through the rest api

                result = response.data.Users;
                $log.log("Users that dislike : ", JSON.stringify(result));
              
                    for(u in result){
                        user = result[u];
                        thisCtrl.dislikesList.push({
                                    "username":user["username"]
                        });
                    }
            
               
            });

           
            
        };

        this.redirectToLogin = function(){
            $window.location.href = '/#!/login';
            return
        }

        this.returnToGroup = function(){
            $window.location.href = "/#!/chat/" + thisCtrl.currentGroupId + "/" + thisCtrl.currentGroupName;  
            return
        }

        /*this.addGroup = function(){
            var msg = thisCtrl.newText;
            // Need to figure out who I am
            var author = "Me";
            var nextId = thisCtrl.counter++;
            thisCtrl.messageList.unshift({"id": nextId, "text" : msg, "author" : author, "like" : 0, "nolike" : 0});
            thisCtrl.newText = "";
        };*/
       
        this.loadDetails();
}]);