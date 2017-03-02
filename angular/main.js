/**
 * Created by joseph on 02/03/17.
 */
angular.module("CustomDirective",[])
    .directive("backImg", function(){
       return function(scope, element, attrs){
           
       }
    })
    .controller("AppCtrl", function($scope, $http){

        var url_get = 'https://api.github.com/users/jbmarflo/repos';
        $http.get(url_get).then(
            function mySucces(data){
                console.log(data);
                $scope.repos = data.data;
            },
            function myError(err){
                console.log(err);
            }
        );
    });