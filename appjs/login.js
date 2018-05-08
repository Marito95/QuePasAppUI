var currentUser = "";
var currentUserId;

angular.module('AppChat').controller('LoginController', ['$http', '$log', '$scope', '$routeParams', '$window',
    function($http, $log, $scope, $routeParams, $window) {
        var thisCtrl = this;

        this.user = [];
        this.email = thisCtrl.email;
        this.password = thisCtrl.password;

        this.login = function(){
            //var chatid = $routeParams.cid;
            var parameter = JSON.stringify({email:this.email, password:this.password})
            var reqURL = "https://quepasapp.herokuapp.com/QuePasApp/login";
                $http.post(reqURL, parameter).then( function(data){
                    // Get the user from the server through the rest api
    
                    $log.log("Message Loaded: ", JSON.stringify(data["data"]["User"]));
                    result = data["data"]["User"];
                    thisCtrl.user.push({
                        "id":result["userId"],
                        "username":result["username"]
                    });
                    alert("Valid login for user: " + result["username"]);
                    currentUser = result["username"];
                    currentUserId = result["userId"];
                    $window.location.href = '/#!/groups';
                
                }).catch(function(err){
                    alert("Invalid login");
                    $log.error(err.message);
                    $window.location.href = '/#!/login';
                });
                // thisCtrl.email = "";
                // thisCtrl.password = "";
        };


        // this.postMsg = function(){
        //     var msg = thisCtrl.newText;
        //     // Need to figure out who I am
        //     var author = "Me";
        //     var nextId = thisCtrl.counter++;
        //     thisCtrl.messageList.unshift({"id": nextId, "text" : msg, "author" : author, "like" : 0, "nolike" : 0});
        //     thisCtrl.newText = "";
        // };

        // this.login();
}]);

