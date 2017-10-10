angular.module('blog.controllers', [])
.controller('BlogListController', ['$scope', 'Post', 'User', 'Category', function($scope, Post, User, Category){
    $scope.users = User.query();
    $scope.categories = Category.query();

    function getPosts(){
        $scope.posts = Post.query();
    }
    getPosts();

    $scope.postPost = function(){
        let post = new Post({
            title: $scope.postTitle,
            userid: $scope.userId,
            categoryid: $scope.categoryId,
            content: $scope.postContent,
        });

        post.$save(function(){
            getPosts();
        });
    }
}])
.controller('SinglePostController', ['$scope', '$routeParams', 'Post', '$location', function($scope, $routeParams, Post, $location){
    $scope.post = Post.get({id: $routeParams.id});

    $scope.goToUpdate = function(){
        $location.path('/posts/' + $routeParams.id + '/update');
    }

    $scope.deletePost = function(){
        let answer = confirm('Are you sure you want to delete this post?');
        if(answer === true){
            $scope.post.$delete(function(){
                $location.path('/posts');
            });
        }
    }
}])
.controller('UpdatePostController', ['$scope', '$routeParams', 'Post', '$location', function($scope, $routeParams, Post, $location){
    $scope.post = Post.get({id: $routeParams.id});

    $scope.updatePost = function(){
        $scope.post.$update(function(){
            $location.path('/posts');
        });
    }
}]);