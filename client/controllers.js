angular.module('blog.controllers', [])
.controller('UserListController', ['$scope', 'User', function($scope, User){
    $scope.users = User.query();
}])
.controller('ContactController', ['SEOService', '$location', function(SEOService, $location){
    SEOService.setSEO({
        title: 'Blog Central',
        image: 'http://' + $location.host() + '/images/contact-us-graphic.png',
        url: $location.url(),
        description: 'Blog Central: For all your blogging needs'
    });
}])
.controller('DonationController', ['$scope', function($scope){
    let elements = stripe.elements();
    let card = elements.create('card');
    card.amount('#card-field');

    $scope.process = function(){
        stripe.createToken(card).then((result) => {
            if(result.error){
                $scope.error = result.error.message;
            }else{

            }
        });
    }
}])
.controller('LoginController', ['$scope', '$location', 'UserService', function($scope, $location, UserService){
    UserService.me()
    .then((success) => {
        redirect();
    });

    function redirect(){
        let dest = $location.search().dest;
        if(!dest){
            dest = '/posts';
        }
        $location.path(dest).search('dest', null);                                        
    }

    $scope.login = function(){
        UserService.login($scope.email, $scope.password)
        .then((user) => {
            redirect();
        }, (err) => {
            console.log(err);
        });
    }
}])
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
.controller('UpdatePostController', ['$scope', '$routeParams', 'Post', 'Category', '$location', function($scope, $routeParams, Post, Category, $location){
    $scope.categories = Category.query();

    $scope.post = Post.get({id: $routeParams.id}, function(success){
        $scope.post.categoryid = String($scope.post.categoryid);
    });

    $scope.update = function(){
        $scope.post.$update(function(){
            $location.path('/');
        });
    }  
}])