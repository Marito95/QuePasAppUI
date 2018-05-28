angular.module('AppChat').controller('ChatController', ['$http', '$log', '$scope', '$routeParams', '$window',
    function($http, $log, $scope, $routeParams, $window) {
        
        var thisCtrl = this;

        this.currentChat = $routeParams.cname;
        this.currentChatId = $routeParams.cid;
        this.messageList = [];
        this.newText = "";
        this.textBoxTitle = "Message";
        this.replyText = "";
        this.replyId = 0;

        this.loadMessages = function(){

            if(currentUser == "")
                //thisCtrl.redirectToLogin()

            $log.log({
                        "User" : currentUser,
                        "UserId" : currentUserId
                    });
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
        };

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

        /*this.postMsg = function(){
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
        };*/

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
                msgForm.append("authorId", currentUserId);
                msgForm.append("groupId", groupId)
                msgForm.append("content", msg);

                if(this.textBoxTitle == "Reply to"){
                    $log.log("Replying to " + this.replyText);
                    msgForm.append("msgid", this.replyId);
                    var reqURL = "http://192.168.0.3:8000/QuePasApp/messages/sendReply";
                    //var reqURL = "https://quepasapp.herokuapp.com/QuePasApp/messages/sendReply";
                }
                else{
                    var reqURL = "http://192.168.0.3:8000/QuePasApp/messages/send";
                    //var reqURL = "https://quepasapp.herokuapp.com/QuePasApp/messages/send";
                }
                $http.post(reqURL, msgForm, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).then(function(response){
                            // Get the posted message from the server through the rest api
                            result = response.data.Message;
                            $log.log("Message Loaded: ", JSON.stringify(result));
                            if(thisCtrl.textBoxTitle == "Reply to"){
                                thisCtrl.messageList.push({
                                    "id":result["msgId"],
                                    "text":result["content"],
                                    "author":currentUser,
                                    "isReply": true,
                                    "repliesTo": thisCtrl.replyId,
                                    "like": 0,
                                    "nolike": 0,
                                    "postDate":result['postDate'],
                                    "postTime":result['postTime'].substring(0, 5),
                                    "liked":false,
                                    "disliked":false
                                }); 
                                $log.log("Successful Reply");
                                thisCtrl.cancelReply();
                                thisCtrl.newText = "";
                            }
                            else{
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
                                $log.log("Successful Post");
                                thisCtrl.newText = "";
                            } 
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

            var likeForm = new FormData();
            likeForm.append("userid", currentUserId);
            likeForm.append("msgid", msg.id);

            var reqURL = "http://192.168.0.3:8000/QuePasApp/messages/sendLike";
            //var reqURL = "https://quepasapp.herokuapp.com/QuePasApp/messages/sendLike";
    
            $http.post(reqURL, likeForm, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).then(function(response){
                            // Get the posted message from the server through the rest api
                            result = response.data.Result;
                            $log.log({ "Result" : result })
                            if(result == "Like Added to message"){
                                $log.log("Message like added");
                                msg.like++;
                                //msg.liked = true;
                                return msg.like;
                            }
                            else if(result == "Like removed from messages"){ 
                                $log.log("Message like removed");
                                msg.like--;
                                //msg.liked = false;
                                return msg.like;
                            }
                            else{
                                $log.log("User or message does not exist");
                            }            
                });
            
        };

        this.dislikeMsg = function(msg){
            var dislikeForm = new FormData();
            dislikeForm.append("userid", currentUserId);
            dislikeForm.append("msgid", msg.id);

            var reqURL = "http://192.168.0.3:8000/QuePasApp/messages/sendDislike";
            //var reqURL = "https://quepasapp.herokuapp.com/QuePasApp/messages/sendLike";
    
            $http.post(reqURL, dislikeForm, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).then(function(response){
                            // Get the posted message from the server through the rest api
                            result = response.data.Result;
                            $log.log({ "Result" : result })
                            if(result == "Dislike Added to message"){
                                $log.log("Message dislike added");
                                msg.nolike++;
                                //msg.liked = true;
                                return msg.nolike;
                            }
                            else if(result == "Dislike removed from messages"){ 
                                $log.log("Message dislike removed");
                                msg.nolike--;
                                //msg.liked = false;
                                return msg.nolike;
                            }
                            else{
                                $log.log("User or message does not exist");
                            }            
                });
        };

        this.getRepliedMessage = function(rId){
            for (i = 0; i < thisCtrl.messageList.length; i++){
                if(thisCtrl.messageList[i].id == rId){
                    author = this.getRepliedMessageAuthor(rId)
                    return "Replies To " + author + "'s Message: \"" + thisCtrl.messageList[i].text + "\""
                }
            }
        };
        
        this.setReplyToMsg = function(msg, mId){
            this.replyText = msg;
            this.textBoxTitle = "Reply to";
            this.replyId = mId;
            $log.log("Reply to " + msg);
        };

        this.cancelReply = function(){
            this.replyText = "";
            this.replyId = 0;
            this.textBoxTitle = "Message";
        }

        this.replyToMessage = function(mId){
            var msg = thisCtrl.newText + this.newText;
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
                                "isReply":true,
                                "repliesTo": mId,
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
                                "isReply":true,
                                "repliesTo": mId,
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
                    var reqURL = "http://192.168.0.3:8000/QuePasApp/messages/send";
                    //var reqURL = "https://quepasapp.herokuapp.com/QuePasApp/messages/send";
                $http.post(reqURL, msgForm, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).then(function(response){
                            // Get the posted message from the server through the rest api
                            result = response.data.Message;
                            $log.log("Message Loaded: ", JSON.stringify(result));
                            
                            
                            
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

        this.getRepliedMessageAuthor = function(rId){
            for (i = 0; i < thisCtrl.messageList.length; i++){
                if(thisCtrl.messageList[i].id == rId)
                    return thisCtrl.messageList[i].author
            }
        };

        this.refreshMessages = function(){
            thisCtrl.messageList = [];
            this.loadMessages();
        };

        this.redirectToLogin = function(){
            $window.location.href = '/#!/login';
            return
        }

        this.loadMessages();
        this.setChatName(thisCtrl.currentChat);
}]);


