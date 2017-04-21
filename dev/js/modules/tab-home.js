/*
 * @Author: Cphayim 
 * @Date: 2017-04-18 21:33:38 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2017-04-20 21:35:02
 */

'use strict';
angular.module('Chufaba').controller('HomeController', ['$scope', '$ionicSlideBoxDelegate','$cordovaToast',
	($scope, $ionicSlideBoxDelegate,$cordovaToast) => {
		// 当前 tab 
		$scope.activeItem = 1;
		// 设置 tab
		$scope.setActive = function(index) {
			$scope.activeItem = index;
			$ionicSlideBoxDelegate.slide(index);
		}
		$scope.items = [];
		for(var i = 0; i < 50; i++) {
			$scope.items.push('数据' + i);
		}
		
		// 测试数据
		$scope.data={
			good:{
				banner:{
					image:'http://img.chufaba.me/events/e3d11e3218c1a9102a0848ff54ad4a17n.jpg'
				},
				items:[]
			},
			hot:{
				
			}
		}
		
		$scope.showToast = ()=>{
			$cordovaToast.showShortCenter('123');
		}
	}
]);