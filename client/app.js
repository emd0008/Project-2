angular.module('Project2', ['ngRoute'])
    .controller('BlogListController', ['$scope', '$http', function($scope, $http){
        $http({
            method: 'GET',
            url: '/api/users'
        }).then((response) => {
            $scope.users = response.data;
        });
        $http({
            method: 'GET',
            url: '/api/categories'
        }).then((response) => {
            $scope.categories = response.data;
        })
        // $scope.categories = Category.query();
        function getPosts(){
            $http({
                method: 'GET',
                url: '/api/posts'
            }).then((response) => {
                $scope.posts = response.data;
            });
        }
        getPosts();

        $scope.postPost = function(){
            $http({
                method: 'POST',
                url: '/api/posts',
                data: {
                    title: $scope.postTitle,
                    userid: $scope.userId,
                    categoryid: $scope.categoryId,
                    content: $scope.postContent,
                }
            }).then((response) => {
                return getPosts();
            });
        }
    }])
    .controller('SinglePostController', ['$scope', '$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location){
        $http({
            method: 'GET',
            url: '/api/posts/' + $routeParams.id
        }).then((response) => {
            $scope.post = response.data;
        });

        $scope.goToUpdate = function() {
            $location.path('/posts/' + $routeParams.id + '/update');
        }

        $scope.deletePost = function() {
            let answer = confirm('Are you sure you want to delete this post?');
            if(answer === true){
                $http({
                    method: 'DELETE',
                    url:'/api/posts/' + $routeParams.id
                }).then((response) => {
                    $location.path('/posts');
                });
            }
        }
    }])
    .controller('UpdatePostController', ['$scope', '$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location){
        $http({
            method: 'GET',
            url: '/api/posts/' + $routeParams.id,
        }).then((response) => {
            const post = response.data;
            $scope.content = post.content;
        });

        $scope.updatePost = function() {
            $http({
                method: 'PUT',
                url: '/api/posts/' + $routeParams.id,
                data: {
                    content: $scope.content
                }
            }).then((response) => {
                $location.path('/posts');
            });
        }
    }])
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