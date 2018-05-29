angular.module('AppChat').controller('GroupsController', ['$http', '$log', '$scope', '$routeParams', '$window',
    function($http, $log, $scope, $routeParams, $window) {
        
        var thisCtrl = this;
        this.groupList = [];
        this.newGroup = "";

        this.loadGroups = function(){

            if(currentUser == "")
                thisCtrl.redirectToLogin();

            var chatid = $routeParams.cid;
            var reqURL = "https://quepasapp.herokuapp.com/QuePasApp/users/" + currentUserId + "/groups/";
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
                    }
                });

           
            
        };

        this.redirectToLogin = function(){
            $window.location.href = '/#!/login';
            return
        }

        this.redirectToJoinGroups = function(){
            $window.location.href = '/#!/joinGroups';
            return
        }
       
        this.loadGroups();
}]);