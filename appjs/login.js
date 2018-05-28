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
    
                    $log.log("User: ", JSON.stringify(data["data"]["User"]));
                    result = data["data"]["User"];
                    thisCtrl.user.push({
                        "id":result["userId"],
                        "username":result["username"]
                    });
                    currentUser = result["username"];
                    currentUserId = result["userId"];
                    alert("Successful login for user : " + currentUser);
                    $window.location.href = '/#!/groups';
                
                }).catch(function(err){
                    alert("Invalid login");
                    $log.error(err.message);
                    $window.location.href = '/#!/login';
                });
        };

        this.register = function(){
            $window.location.href = '/#!/register';
        }
}]);

