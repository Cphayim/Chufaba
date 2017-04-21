/*
 * @Author: Cphayim 
 * @Date: 2017-04-15 19:51:57 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2017-04-20 22:58:36
 */

'use strict';
angular.module('Chufaba').controller('guideController', ['$scope', '$ionicPlatform', '$state', '$timeout',
    ($scope, $ionicPlatform, $state, $timeout) => {
        $scope.index = 0;
        $scope.slideStatus = [true, false, false];
        $scope.delay = true;
        $scope.changeBC = ($index) => {
            $scope.index = $index;
            $scope.delay = false;
            $scope.slideStatus[$index] = true;
        }
        $scope.go = () => {
            // $state.go('tab.dash');
            $scope.out = true;
            $timeout(() => {
                   $state.go('tab.home');
            }, 1000);
        }
        // 设置 已首次打开过 的 localStorage
        // localStorage['guided'] = true;
    }
]);
