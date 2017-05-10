/*
 * 精选详情页
 * @Author: Cphayim 
 * @Date: 2017-04-24 21:29:47 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2017-05-09 01:10:59
 */
angular.module('Chufaba').controller('GoodDetailController', ['$scope', '$stateParams', '$ionicLoading', '$http',
    ($scope, $stateParams, $ionicLoading, $http) => {
        // 显示加载框
        // $ionicLoading.show();
        // 滚动区域下拉顶端图片放大效果
        const innerHeight = window.innerHeight;
        $scope.navOpacity = 0;
        $scope.topImageSize = function () {
            const transform = document.querySelector('#good-detail .scroll').style.transform;
            const translateY = Number(transform.split(', ')[1].replace('px', ''));
            // 当滚动容器到达顶部并继续向上滚动时放大顶部的背景图片
            if (translateY >= 0) {
                $('.back-image').css('transform', `scale(${translateY/300+1})`);
            }
            const absTranslateY = Math.abs(translateY);
            let alpha = 0;
            // 当屏幕滚动距离超过30%屏幕高度时调整导航的透明度
            if (absTranslateY > innerHeight * 0.3) {
                alpha = ((absTranslateY - innerHeight * 0.3) / 100).toFixed(2);
            } else {
                alpha = 0;
            }
            $scope.navOpacity != alpha && setAlpha(alpha);
        }
        /**
         * 设置导航栏透明度
         * @param {Number} alpha 
         */
        function setAlpha(alpha) {
            $('.bar-stable.bar.bar-header').css('background', `rgba(33,39,47,${alpha})`);
            $scope.navOpacity = alpha
        }
        /**
         * 详情视图类
         * @class DetailView
         */
        class DetailView {
            /**
             * 构造器参数说明
             * 传入的对象将被解构赋值
             * @param {Object} {
             *        {Sring}    path          http 请求路径，不包括主机名，默认值 '/product'
             *        {Number}   id            当前请求详细视图的唯一 id (数据库辅键)
             *        {Function} loadData      http 请求函数，将在 refresh/infinite 中回调
             *    } 
             */
            constructor({
                path = '/product',
                id = 0,
                loadData = function () {}
            }) {
                this.path = path;
                this.id = id;
                this.loadData = loadData;
            }
        }

        $scope.detail = new DetailView({
            path: '/product/good-detail',
            id: $stateParams.id,
            loadData() {
                $http({
                    method: 'GET',
                    url: config.serverUrl + this.path,
                    params: {
                        id: this.id,
                    }
                }).then(resData => {
                    if (resData.data.code) {
                        // 将数据挂载到数据容器中
                        this.data = resData.data.detailData;
                    } else {
                        $cordovaToast.showShortCenter('数据请求失败');
                    }
                    setTimeout(() => {
                        $ionicLoading.hide(); // 隐藏加载框  
                    }, 1000);
                }).catch(resData => {
                    $cordovaToast.showShortCenter('数据请求失败，请检查网络');
                    setTimeout(() => {
                        $ionicLoading.hide(); // 隐藏加载框  
                    }, 1000);
                });
            }
        });
        // 视图模板加载完毕时显示等待框
        $scope.$on('$ionicView.loaded', function () {
            $ionicLoading.show();
        });
        // 视图进入时请求数据
        $scope.$on('$ionicView.afterEnter', function () {
            $scope.detail.loadData();
        });
    }
]);
