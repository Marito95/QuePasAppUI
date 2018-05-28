angular.module('AppChat').controller('RegisterController', ['$http', '$log', '$scope', '$routeParams', '$window',
    function($http, $log, $scope, $routeParams, $window) {
        var thisCtrl = this;

        this.username = thisCtrl.username;
        this.name = thisCtrl.name;
        this.lastname = thisCtrl.lastname;
        this.password = thisCtrl.password;
        this.phonenumber = thisCtrl.phonenumber;
        this.email = thisCtrl.email;

        this.register = function(){
            var userForm = new FormData();
            var phone = this.phonenumber.toString();
            var phoneEdit = phone.substring(0,3) + "-" + phone.substring(3,6) + "-" + phone.substring(6, 10);
            userForm.append("username", this.username);
            userForm.append("name", this.name);
            userForm.append("lastname", this.lastname);
            userForm.append("password", this.password);
            userForm.append("phonenumber", phoneEdit);
            userForm.append("email", this.email);
            
            var reqURL = "http://192.168.0.3:8000/QuePasApp/users/new";
            //var reqURL = "https://quepasapp.herokuapp.com/QuePasApp/users/new";
            $http.post(reqURL, userForm, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).then(  function(response){
                        // Get the user from the server through the rest api
                        result = response.data.userId;
                        $log.log(result);
                        alert("Valid registration for user: " + thisCtrl.username);
                        currentUser = thisCtrl.username;
                        currentUserId = result;
                        $window.location.href = '/#!/groups';
                
                }).catch(function(err){
                    alert("Invalid Register Field/s : " + err.message);
                    $log.error(err.message);
                    //$log.error(response.data);
                    $window.location.href = '/#!/register';
                });
        };
}]);

