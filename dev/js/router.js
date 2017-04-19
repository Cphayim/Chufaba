/*
 * @Author: Cphayim 
 * @Date: 2017-04-15 19:52:03 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2017-04-15 22:04:50
 */

'use strict';
angular.module('myRouter', ['ionic']).config(['$stateProvider', '$urlRouterProvider',
    ($stateProvider, $urlRouterProvider) => {
        $stateProvider.state('guide', {
            url: '/guide',
            templateUrl: 'views/guide/guide.html',
            controller: 'guideController'
        }).state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'views/tabs.html'
        }).state('tab.home', {
            url: '/home',
            views: {
                'tab-home': {
                    templateUrl: 'views/tabs/tab-home.html',
                    // controller: 'DashCtrl'
                }
            }
        }).state('tab.chats', {
            url: '/chats',
            views: {
                'tab-chats': {
                    templateUrl: 'views/tab-chats.html',
                    controller: 'ChatsCtrl'
                }
            }
        }).state('tab.chat-detail', {
            url: '/chats/:chatId',
            views: {
                'tab-chats': {
                    templateUrl: 'views/chat-detail.html',
                    controller: 'ChatDetailCtrl'
                }
            }
        }).state('tab.account', {
            url: '/account',
            views: {
                'tab-account': {
                    templateUrl: 'views/tab-account.html',
                    controller: 'AccountCtrl'
                }
            }
        });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise(localStorage['guided'] ? '/tab/home' : '/guide');
    }
])