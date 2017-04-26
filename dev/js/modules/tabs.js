angular.module('Chufaba').controller('TabsController', ['$scope', '$rootScope','$ionicTabsDelegate',
    ($scope, $rootScope,$ionicTabsDelegate) => {
        let viewName;
        $rootScope.$on('$ionicView.beforeEnter',function(e,data){
            // console.log(data.stateName+'准备进入');
            viewName = data.stateName;
            let flag = viewName == 'tab.home' || viewName == 'tab.user';
            $ionicTabsDelegate.showBar(flag)
        });
        $rootScope.$on('$ionicView.beforeLeave',function(e,data){
            // console.log(data.stateName+'准备离开');
        });

    }
]);