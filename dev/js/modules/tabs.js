angular.module('Chufaba').controller('TabsController', ['$scope', '$rootScope', '$ionicTabsDelegate', '$ionicModal', '$http', '$cordovaToast',
    ($scope, $rootScope, $ionicTabsDelegate, $ionicModal, $http, $cordovaToast) => {
        // 视图配置项
        /* {Boolean}
         * tab: 控制是否显示底部 tab 栏
         * navStyle: 是否使用透明背景的导航栏 
         */
        const viewConfig = {
            // 首页
            'tab.home': {
                tab: true,
                navStyle: false
            },
            'tab.good-detail': {
                tab: false,
                navStyle: true
            },
            'tab.home-web': {
                tab: false,
                navStyle: false
            },
            // 目的地
            'tab.destination': {
                tab: true,
                navStyle: false
            },
            'tab.destination-web': {
                tab: false,
                navStyle: false
            },
            // 购买
            'tab.buy': {
                tab: true,
                navStyle: false
            },
            'tab.buy-web': {
                tab: false,
                navStyle: false
            },
            // 我的
            'tab.me': {
                tab: true,
                navStyle: false
            },
            'tab.me-web': {
                tab: false,
                navStyle: false
            }
        }
        // 监听视图加载完毕准备进入时
        $rootScope.$on('$ionicView.beforeEnter', function (e, data) {
            // console.log(data.stateName+'准备进入');
            viewConfig[data.stateName] && $ionicTabsDelegate.showBar(viewConfig[data.stateName].tab);
            const $bar = $('.bar-stable.bar.bar-header');
            viewConfig[data.stateName] && viewConfig[data.stateName].navStyle ?
                $bar.css('background', 'none') : $bar.css('background', '#21272f');
        });
        $rootScope.$on('$ionicView.beforeLeave', function (e, data) {
            // console.log(data.stateName+'准备离开');
        });

        // 登录模态框
        $ionicModal.fromTemplateUrl('login.html', {
            scope: $scope
        }).then(function (modal) {
            // 将登录框绑定到全局
            $rootScope.loginModal = modal;
            $rootScope.$on('showLoginModal', (e) => {
                $scope.loginModal.show();
            });
            $rootScope.$on('hideLoginModal', (e, isBroadcast) => {
                $scope.loginModal.hide();
                // 检查登录状态
                isBroadcast && loginCheck(); 
            });
        });

        loginCheck();
        // 登录状态检查事件
        $rootScope.$on('loginCheck', (e) => {
            loginCheck();
        });
        /**
         * 检查登录状态，更新全局用户信息
         */
        function loginCheck() {
            // 本地存储读取用户信息
            $rootScope.userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
            // 登录状态确认
            $rootScope.isLogin = $rootScope.userInfo?accessTokenCheck():false;
        }
        /**
         * accessToken 校验
         */
        function accessTokenCheck() {
            // 本地不存在 access_token
            if (!$rootScope.userInfo.access_token || !$rootScope.userInfo.phone) {
                $rootScope.isLogin = false;
                return false;
            }
            const data = {
                phone: $rootScope.userInfo.phone,
                access_token: $rootScope.userInfo.access_token
            }

            $http.post(`${config.serverUrl}/user/token`, data).then(resData => {
                if (resData.data.code === 1000) {
                    $rootScope.isLogin = true;
                } else {
                    $rootScope.isLogin = false;
                    $cordovaToast.showShortBottom('鉴权失败，请重新登录');
                }
            }).catch(resData => {
                $rootScope.isLogin = false;
                $cordovaToast.showShortBottom('连接失败，请检查网络');
            });
        }
    }
]);
