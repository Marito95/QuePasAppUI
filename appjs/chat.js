angular.module('AppChat').controller('ChatController', ['$http', '$log', '$scope', '$routeParams',
    function($http, $log, $scope, $routeParams) {
        var thisCtrl = this;

        this.currentChat = $routeParams.cname;
        this.messageList = [];
        this.newText = "";

        this.loadMessages = function(){
            var chatid = $routeParams.cid;
            var reqURL = "https://quepasapp.herokuapp.com/QuePasApp/groups/" + chatid + "/messages";
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

        this.likeMsg = function(index){
            var msg = thisCtrl.messageList[index];
            $log.log(msg)
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

        this.dislikeMsg = function(index){
            var msg = thisCtrl.messageList[index];
            $log.log(msg)
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

        this.loadMessages();
        this.setChatName(thisCtrl.currentChat);
}]);


