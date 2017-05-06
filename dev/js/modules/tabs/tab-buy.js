/*
 * 购买
 * @Author: Cphayim 
 * @Date: 2017-05-01 01:22:22 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2017-05-02 21:23:47
 */

angular.module('Chufaba').controller('BuyController', ['$scope', '$http','$cordovaToast',
    ($scope, $http,$cordovaToast) => {
        $scope.data = [1,2,3,4];
        // 从测量元素获得宽度值设置到 sprite 的高度
        $scope.spriteHeight = $('.market .measure .sprite').width()+'px'; 
        // 实例化一个刷新组件
        $scope.market = new RefreshComponent({
            scope: $scope,
            path: '/product/market',
            offset: 0,
            hasInfinite: true,
            data:{},
            reset(){
                this.data = {};
            },
            loadData() {
                $http({
                    method: 'GET',
                    url: config.serverUrl + this.path,
                }).then(resData => {
                    if (resData.data.code == 'ok') {
                        console.log(resData.data);
                        this.data = resData.data.marketData;
                        console.log($scope.market.data);
                    } else {
                        $cordovaToast.showShortCenter('数据请求失败，请尝试下拉刷新');
                    }
                    this.showInfinite = false;
                    $scope.$broadcast('scroll.infiniteScrollComplete'); // 向子组件发送广播: 加载完成
                }).catch(resData => {
                    $cordovaToast.showShortCenter('数据请求失败，请检查网络');
                });
            }
        });
        $scope.$on('$ionicView.afterEnter', function () {
            
        });
    }
]);
