/*
 * 登录/注册
 * @Author: Cphayim 
 * @Date: 2017-04-30 22:12:01 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2017-05-01 03:10:48
 */
angular.module('Chufaba').controller('loginController', ['$scope',
    ($scope) => {
        
        // 状态记录
        $scope.isRegister = false;
        $scope.toLogin = _=>{
            $scope.isRegister = false;
        }
        $scope.toRegister = _=>{
            $scope.isRegister = true;
        }
        $scope.user = {

        };
        setTimeout(function() {
            console.log($scope.user.phone);
            console.log($scope.password);
            console.log($scope);
            // $scope.registerForm.$setPristine();
        }, 10000);
    }
])
