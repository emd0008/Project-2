angular.module('blog.directives', [])
.directive('systemUser', [function(){
    return{
        templateUrl: 'directives/user.html',
        restrict: 'E',
        scope: {
            user: '=userData'
        }
    }
}]);