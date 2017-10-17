angular.module('blog', [
    'ngRoute', 
    'ngResource', 
    'blog.factories', 
    'blog.controllers', 
    'blog.services', 
    'blog.directives'
]).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $locationProvider.html5Mode(true);
        $routeProvider
        .when('/', {
            templateUrl: 'views/welcome.html', 
        })
        .when('/posts', {
            templateUrl: 'views/list.html',
            controller: 'BlogListController',
            requiresLogin: true
        })
        .when('/posts/:id/update', {
            templateUrl: 'views/updatePost.html',
            controller: 'UpdatePostController',
            requiresLogin: true
        })
        .when('/posts/:id', {
            templateUrl: 'views/singlePost.html',
            controller: 'SinglePostController',
            requiresLogin: true
        })
        .when('/users', {
            templateUrl: 'views/user_list.html',
            controller: 'UserListController',
            requiresLogin: true
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .otherwise({
            redirectTo: '/'
        });
    }])
    .run(['$rootScope', '$location', 'UserService', function($rootScope, $location, UserService){
        $rootScope.$on('$routeChangeStart', function(event, nextRoute, previousRoute){
            if(nextRoute.$$route.requiresLogin && !UserService.isLoggedIn()){
                event.preventDefault();
                UserService.loginRedirect();
            }
        });
    }]);