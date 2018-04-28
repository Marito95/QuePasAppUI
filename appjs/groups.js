angular.module('AppChat').controller('GroupsController', ['$http', '$log', '$scope', '$routeParams',
    function($http, $log, $scope, $routeParams) {
        var thisCtrl = this;

        this.groupList = [];
        this.newGroup = "";

        this.loadGroups = function(){
            var chatid = $routeParams.cid;
            var reqURL = "https://quepasapp.herokuapp.com/QuePasApp/groups/";
                $http.get(reqURL).then( function(data){
                    // Get the messages from the server through the rest api
    
                $log.error("Message Loaded: ", JSON.stringify(thisCtrl.messageList));
                    groups = data["data"]["Groups"];
                    console.log(groups)
                    for(g in groups){
                        group = groups[g];
                        thisCtrl.groupList.push({
                            "id":group["groupId"],
                            "name":group["groupName"],
                            "owner":group["ownerId"]
                        });
                    }
                });

           
            
        };

        /*this.addGroup = function(){
            var msg = thisCtrl.newText;
            // Need to figure out who I am
            var author = "Me";
            var nextId = thisCtrl.counter++;
            thisCtrl.messageList.unshift({"id": nextId, "text" : msg, "author" : author, "like" : 0, "nolike" : 0});
            thisCtrl.newText = "";
        };*/

        this.loadGroups();
}]);