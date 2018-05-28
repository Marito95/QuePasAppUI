(function() {

    var app = angular.module('AppChat',['ngRoute']);

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider, $location) {
        $routeProvider.when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'LoginController',
            controllerAs : 'loginCtrl'
        }).when('/register', {
            templateUrl: 'pages/register.html',
            controller: 'RegisterController',
            controllerAs : 'registerCtrl'
        }).when('/chat/:cid/:cname', {
            templateUrl: 'pages/chat.html',
            controller: 'ChatController',
            controllerAs : 'chatCtrl'
        }).when('/messageDetails/:cid/:cname/:msgid', {
            templateUrl: 'pages/messageDetails.html',
            controller: 'MessageDetailsController',
            controllerAs : 'msgDetailsCtrl'
        }).when('/groups', {
            templateUrl: 'pages/group.html',
            controller: 'GroupsController',
            controllerAs : 'groupsCtrl'
        }).when('/joinGroups', {
            templateUrl: 'pages/joinGroup.html',
            controller: 'JoinGroupsController',
            controllerAs : 'joinGroupsCtrl'
        }).otherwise({
            redirectTo: '/login'
        });
    }]);

})();
