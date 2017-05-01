/*
 * 登录/注册
 * @Author: Cphayim 
 * @Date: 2017-04-30 22:12:01 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2017-05-01 21:21:33
 */
angular.module('Chufaba').controller('loginModelController', ['$scope',
    ($scope) => {

        // 状态记录
        $scope.isRegister = false;
        $scope.toLogin = _ => {
            $scope.isRegister = false;
        }
        $scope.toRegister = _ => {
            $scope.isRegister = true;
        }
    }
]).controller('formController', ['$scope',
    ($scope) => {
        // console.log($scope);
    }
])
