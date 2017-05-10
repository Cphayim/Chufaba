/*
 * 我的
 * @Author: Cphayim 
 * @Date: 2017-05-01 01:22:22 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2017-05-07 20:32:35
 */

angular.module('Chufaba').controller('MeController', ['$scope',
    ($scope) => {
        // 打开登录窗口
        $scope.openLogin = _ => {
            $scope.$emit('showLoginModal');
        }
        // 退出登录
        $scope.logout = _ => {
            const flag = confirm('确认退出登录吗?');
            if (flag) {
                // 删除本地存储
                localStorage.removeItem('userInfo');
                // 触发检查登录事件
                $scope.$emit('loginCheck');
            }
        }
    }
]);
