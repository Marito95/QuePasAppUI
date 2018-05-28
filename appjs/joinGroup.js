angular.module('AppChat').controller('JoinGroupsController', ['$http', '$log', '$scope', '$routeParams', '$window',
    function($http, $log, $scope, $routeParams, $window) {
        
        var thisCtrl = this;
        this.groupList = [];
        this.newGroup = "";

        this.loadAllGroups = function(){
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
                    }
                });

           
            
        };

        this.redirectToGroup = function(gId, gName){
            $window.location.href = "/#!/chat/" + gId + "/gName";
            return
        }

        this.joinGroup = function(gId, gName){
            var reqURL = "http://192.168.0.3:8000/QuePasApp/groups/" + gId + "/addUser/" + currentUserId;
            //var reqURL = "https://quepasapp.herokuapp.com/QuePasApp/groups/" + gId + "/addUser/" + currentUserId;
            $http.post(reqURL).then( function(response){
                // Get the messages from the server through the rest api

                var result = response.data.Message;
                if(result == "User added to group"){
                    $log.log("Groups Loaded: ", JSON.stringify(result));
                    alert("You have joined " + gName);
                    $window.location.href = "/#!/chat/" + gId + "/" + gName;
                }
                else{
                    alert("You have joined this group already");
                }
            });
        }    
        
       
        this.loadAllGroups();
}]);