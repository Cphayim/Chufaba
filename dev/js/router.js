/*
 * 前端路由模块
 * @Author: Cphayim 
 * @Date: 2017-04-15 19:52:03 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2017-04-30 23:08:26
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
            templateUrl: 'views/tabs.html',
            controller:'TabsController'
        }).state('tab.home', {
            // 主页
            url: '/home',
            views: {
                'tab-home': {
                    templateUrl: 'views/tabs/tab-home.html',
                    controller: 'HomeController'
                }
            }
        }).state('tab.good-detail', {
            // 精选详情
            url: '/good-detail:id',
            views: {
                'tab-home': {
                    templateUrl: 'views/detail/good.html',
                    controller: 'GoodDetailController'
                }
            }
        }).state('tab.destination', {
            // 目的地
            url: '/destination',
            views: {
                'tab-destination': {
                    templateUrl: 'views/tabs/tab-destination.html',
                    controller: 'DestinationController'
                }
            }
        }).state('tab.buy', {
            // 购买
            url: '/buy',
            views: {
                'tab-buy': {
                    templateUrl: 'views/tabs/tab-buy.html',
                    controller: 'BuyController'
                }
            }
        }).state('tab.account', {
            // 我的
            url: '/me',
            views: {
                'tab-me': {
                    templateUrl: 'views/tabs/tab-me.html',
                    controller: 'MeController'
                }
            }
        })
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise(localStorage['guided'] ? '/tab/home' : '/guide');
    }
])
