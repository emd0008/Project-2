angular.module('blog', ['ngRoute', 'ngResource', 'blog.factories', 'blog.controllers'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $locationProvider.html5Mode(true);
        $routeProvider
        .when('/', {
            templateUrl: 'views/welcome.html'
        })
        .when('/posts', {
            templateUrl: 'views/list.html',
            controller: 'BlogListController'
        })
        .when('/posts/:id/update', {
            templateUrl: 'views/updatePost.html',
            controller: 'UpdatePostController'
        })
        .when('/posts/:id', {
            templateUrl: 'views/singlePost.html',
            controller: 'SinglePostController'
        })
        .otherwise({
            redirectTo: '/'
        });
    }]);