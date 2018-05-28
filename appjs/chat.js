angular.module('AppChat').controller('ChatController', ['$http', '$log', '$scope', '$routeParams', '$window',
    function($http, $log, $scope, $routeParams, $window) {
        var thisCtrl = this;

        this.currentChat = $routeParams.cname;
        this.messageList = [];
        this.newText = "";

        this.loadMessages = function(){
            var chatid = $routeParams.cid;
            var reqURL = "http://192.168.0.3:8000/QuePasApp/groups/" + chatid + "/messages";
            //var reqURL = "https://quepasapp.herokuapp.com/QuePasApp/groups/" + chatid + "/messages";
            $http.get(reqURL).then( function(data){
                // Get the messages from the server through the rest api
                $log.log("Message Loaded: ", data["data"]["Messages"]);
                messages = data["data"]["Messages"];
                for(m in messages){
                    message = messages[m];
                    thisCtrl.messageList.push({
                        "id":message["msgId"],
                        "text":message["content"],
                        "author":message["username"],
                        "isReply":message['isReply'],
                        "repliesTo":message['repliesTo'],
                        "like":message['likes'],
                        "nolike":message['dislikes'],
                        "postDate":message['postDate'],
                        "postTime":message['postTime'].substring(0, 5),
                        "liked":false,
                        "disliked":false
                    });
                }
                $log.log("MessageList : ", thisCtrl.messageList);
            });   
        };z

        this.reloadMessages = function(){
            return thisCtrl.messageList;
        };

        this.setUser = function(user){
            thisCtrl.currentUser = user;
        };
        
        this.getChatName = function(name){
            return thisCtrl.currentChatName;
        }

        this.setChatName = function(name){
            thisCtrl.currentChatName = name;
            $log.log("Changed chat name to: " + name)
        }

        this.postMsg = function(){
            var msg = thisCtrl.newText;
            if(msg != ""){
                var author = currentUser;
                var nextId = thisCtrl.counter++;
                thisCtrl.messageList.unshift({"id": nextId, "text" : msg, "author" : author, "like" : 0, "nolike" : 0});
                thisCtrl.newText = "";
            }
            else{
                alert("Message is empty!");
            }
        };

        this.postMsg = function(){
            var msg = thisCtrl.newText;
            var groupId = $routeParams.cid;
            
            if(currentUser == ""){
                alert("Please login!");
                $window.location.href = '/#!/login';
                return
            }

            if(msg != ""){
                var msgForm = new FormData();
                msgForm.append("authorId", 1);
                msgForm.append("groupId", groupId)
                msgForm.append("content", msg);
                var config = {
                    headers : {
                        //'Content-Type': 'application/json;charset=utf-8;'
                        'Content-Type': undefined
    
                    }
                }
                var reqURL = "http://192.168.0.3:8000/QuePasApp/messages/send";
                //var reqURL = "https://quepasapp.herokuapp.com/QuePasApp/messages/send";
                $http.post(reqURL, msgForm, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).then(function(response){
                            // Get the posted message from the server through the rest api
                            result = response.data.Message;
                            $log.log("Message Loaded: ", JSON.stringify(result));
                            
                            thisCtrl.messageList.push({
                                "id":result["msgId"],
                                "text":result["content"],
                                "author":currentUser,
                                "isReply":false,
                                "repliesTo": null,
                                "like": 0,
                                "nolike": 0,
                                "postDate":result['postDate'],
                                "postTime":result['postTime'].substring(0, 5),
                                "liked":false,
                                "disliked":false
                            });  
                        },
                        function(response){
                            $log.error(response.data);
                        }
                    );
            }
            else{
                alert("Message is empty!");
            }
        };

        this.likeMsg = function(msg){
            $log.log({ "Message" : msg })
            if(!msg.liked){
                msg.like++;
                msg.liked = true;
                return msg.like;
            }
            else{ 
                msg.like--;
                msg.liked = false;
                return msg.like;
            }
        };

        this.dislikeMsg = function(msg){
            $log.log({ "Message" : msg })
            if(!msg.disliked){
                msg.nolike++;
                msg.disliked = true;
                return msg.nolike;
            }
            else{
                msg.nolike--;
                msg.disliked = false;
                return msg.nolike;
            }
        };

        this.getRepliedMessage = function(rId){
            for (i = 0; i < thisCtrl.messageList.length; i++){
                if(thisCtrl.messageList[i].id == rId){
                    author = this.getRepliedMessageAuthor(rId)
                    return "Replies To " + author + "'s Message: \"" + thisCtrl.messageList[i].text + "\""
                }
            }
        };
        this.getRepliedMessageAuthor = function(rId){
            for (i = 0; i < thisCtrl.messageList.length; i++){
                if(thisCtrl.messageList[i].id == rId)
                    return thisCtrl.messageList[i].author
            }
        };

        this.refreshMessages = function(){
            thisCtrl.messageList = [];
            this.loadMessages();
        }

        this.loadMessages();
<<<<<<< Updated upstream
        this.setChatName(thisCtrl.currentChat);
}]);
=======
    }]);
>>>>>>> Stashed changes


