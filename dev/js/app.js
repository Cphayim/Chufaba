/*
 * @Author: Cphayim 
 * @Date: 2017-04-15 19:53:57 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2017-04-20 23:40:00
 */
angular.module('Chufaba', ['ionic','ngCordova', 'myRouter', 'starter.controllers', 'starter.services'])
.run(['$ionicPlatform', function ($ionicPlatform) {
    $ionicPlatform.ready(()=> {
        // 隐藏启动界面
        setTimeout(()=> {
            // 延迟1.5秒防止闪屏
            navigator.splashscreen && navigator.splashscreen.hide();
        }, 1500);
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
            StatusBar.backgroundColorByHexString('#21272f');
        }
    });
}]).config(['$ionicConfigProvider',
    ($ionicConfigProvider)=> {
        // iOS/Android 平台设置
        $ionicConfigProvider.platform.ios.tabs.style('standard');     /*标准的    striped and standard. */
        $ionicConfigProvider.platform.ios.tabs.position('bottom');    /*ios 平台tabs的位置*/
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('bottom');   /*android 平台tabs的位置*/

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');    /*标题的位置*/
        $ionicConfigProvider.platform.android.navBar.alignTitle('left');

        /*返回文字  和图标*/
        //$ionicConfigProvider.platform.ios.backButton.previousTitleText(' ').icon('ion-ios-arrow-thin-left');
        //$ionicConfigProvider.platform.android.backButton.previousTitleText(' ').icon('ion-android-arrow-back');


        $ionicConfigProvider.platform.ios.views.transition('ios');    /*切换效果*/
        $ionicConfigProvider.platform.android.views.transition('android');
    }
]);