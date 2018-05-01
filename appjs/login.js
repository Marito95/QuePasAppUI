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
    
                    //$log.error("Message Loaded: ", JSON.stringify(data["data"]["User"]));
                    result = data["data"]["User"];
                    console.log(result);
                    thisCtrl.user.push({
                        "id":result["userId"],
                        "username":result["username"]
                    });
                    alert("Valid login for user: " + result["username"]);
                    $window.location.href = '/#!/groups';
                    
                
                }).catch(function(){
                    alert("Invalid login");
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
