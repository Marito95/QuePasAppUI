(function() {

    var app = angular.module('AppChat',['ngRoute']);

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider, $location) {
        $routeProvider.when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'LoginController',
            controllerAs : 'loginCtrl'
        }).when('/chat/:cid/:cname', {
            templateUrl: 'pages/chat.html',
            controller: 'ChatController',
            controllerAs : 'chatCtrl'
        }).when('/groups', {
            templateUrl: 'pages/group.html',
            controller: 'GroupsController',
            controllerAs : 'groupsCtrl'
        }).otherwise({
            redirectTo: '/login'
        });
    }]);

})();
