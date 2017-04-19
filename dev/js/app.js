/*
 * @Author: Cphayim 
 * @Date: 2017-04-15 19:53:57 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2017-04-16 18:21:28
 */
'use strict';
angular.module('Chufaba', ['ionic','ngCordova', 'myRouter', 'starter.controllers', 'starter.services']).run(['$ionicPlatform', function ($ionicPlatform) {
    $ionicPlatform.ready(()=> {
        // 隐藏启动界面
        navigator.splashscreen && navigator.splashscreen.hide();
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
            // StatusBar.backgroundColorByHexString('#387ef5');
        }
    });

}]).config(['$ionicConfigProvider',
    ($ionicConfigProvider)=> {
        // $ionicConfigProvider.tabs.position('bottom');// 统一 tab 栏位置
        // $ionicConfigProvider.platform.android.tabs.position('bottom');     
    }
]);