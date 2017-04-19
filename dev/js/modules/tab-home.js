/*
 * @Author: Cphayim 
 * @Date: 2017-04-18 21:33:38 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2017-04-18 23:26:47
 */

'use strict';
angular.module('Chufaba').controller('HomeController', ['$scope', '$ionicSlideBoxDelegate',
    ($scope, $ionicSlideBoxDelegate) => {
       $scope.activeItem = 1;
       $scope.setActive = function(index){
           $scope.activeItem = index;
           $ionicSlideBoxDelegate.slide(index);
       }
       $scope.items=[];
       for(var i=0;i<50;i++){
           $scope.items.push('数据'+i);
       }
    }
]);