angular.module('AppChat').controller('GroupsController', ['$http', '$log', '$scope', '$routeParams', '$window',
    function($http, $log, $scope, $routeParams, $window) {
        
        var thisCtrl = this;
        this.groupList = [];
        // this.groupList1 = [];
        // this.groupList2 = [];
        this.newGroup = "";

        this.redirectToLogin = function(){
            $window.location.href = '/#!/login';
        }

        this.loadGroups = function(){

            if(currentUser == "")
                thisCtrl.redirectToLogin()

            var chatid = $routeParams.cid;
            var reqURL = "https://quepasapp.herokuapp.com/QuePasApp/groups/";
            var index = 0;
                $http.get(reqURL).then( function(data){
                    // Get the messages from the server through the rest api

                    groups = data["data"]["Groups"];
                    $log.log("Groups Loaded: ", JSON.stringify(groups));
                    for(g in groups){
                        group = groups[g];
                        thisCtrl.groupList.push({
                                    "id":group["groupId"],
                                    "name":group["groupName"],
                                    "owner":group["ownerId"]
                        });
                        // if(index%2 == 0){
                        //     thisCtrl.groupList1.push({
                        //         "id":group["groupId"],
                        //         "name":group["groupName"],
                        //         "owner":group["ownerId"]
                        //     });
                        // }
                        // else{
                        //     thisCtrl.groupList2.push({
                        //         "id":group["groupId"],
                        //         "name":group["groupName"],
                        //         "owner":group["ownerId"]
                        //     });
                        // }
                        // index++
                    }

                    // $log.log("Group List1: ", JSON.stringify(thisCtrl.groupList1));
                    // $log.log("Group List2: ", JSON.stringify(thisCtrl.groupList2));
                });

           
            
        };

        this.redirectToLogin = function(){
            $window.location.href = '/#!/login';
        }

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