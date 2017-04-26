/*
 * 精选详情页
 * @Author: Cphayim 
 * @Date: 2017-04-24 21:29:47 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2017-04-24 23:35:51
 */
angular.module('Chufaba').controller('GoodDetailController', ['$scope', '$rootScope', '$stateParams',
    ($scope, $rootScope, $stateParams) => {
        // console.log($stateParams);
        console.log($scope);
        $rootScope.transparentBar = true;
    }
]);
