angular.module('Chufaba').controller('TabsController', ['$scope', '$rootScope', '$ionicTabsDelegate', '$ionicModal',
    ($scope, $rootScope, $ionicTabsDelegate, $ionicModal) => {
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
            $rootScope.$on('showLoginModal',(e)=>{
                $scope.loginModal.show();
            });
            $rootScope.$on('hideLoginModal',(e,isBroadcast)=>{
                $scope.loginModal.hide();
                // 更新 用户 视图
                // isBroadcast&&
            });
        });
    }
]);
