angular.module('Chufaba').controller('TabsController', ['$scope', '$rootScope', '$ionicTabsDelegate', '$ionicModal',
    ($scope, $rootScope, $ionicTabsDelegate, $ionicModal) => {
        // 视图配置项
        /* {Boolean}
         * tab: 控制是否显示底部 tab 栏
         * navStyle: 是否使用透明背景的导航栏 
         */
        const viewConfig = {
            'tab.home': {
                tab: true,
                navStyle: false
            },
            'tab.good-detail': {
                tab: false,
                navStyle: true
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
            $scope.loginModal = modal;
            setTimeout(function () {
                $scope.loginModal.show()
                console.log($scope);
            }, 1000);
        });
    }
]);
