/*
 * @Author: Cphayim 
 * @Date: 2017-04-18 21:33:38 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2017-04-24 23:12:36
 */
// Home 界面控制器
angular.module('Chufaba').controller('HomeController', ['$scope', '$ionicSlideBoxDelegate', '$cordovaToast', '$http', '$state',
    ($scope, $ionicSlideBoxDelegate, $cordovaToast, $http, $state) => {
        // HomeTab 类
        class HomeTab {
            constructor(defaultIndex = 0) {
                this.activeItem = defaultIndex;
            }
            setActive(index) {
                // 设置 tab
                this.activeItem = index;
                $ionicSlideBoxDelegate.slide(this.activeItem);
            }
        }
        $scope.homeTab = new HomeTab(1); // 绑定homeTab实例到作用域，默认激活第二个 tab

        /**
         * 刷新(下拉刷新/上拉加载)组件类
         * @class RefreshComponent
         */
        class RefreshComponent {
            /**
             * 构造函数参数说明
             * 传入的对象将被解构赋值
             * @param {Object} {
             *        {Sring}    path          http 请求路径，不包括主机名，默认值 '/product'
             *        {Number}   current       当前列表索引，默认值 0
             *        {Number}   offset        每次请求加载的数量(列表项数)，默认值 10
             *        {Boolean}  showInfinite  是否启用上拉加载，默认值 true
             *        {Function} loadData      http 请求函数，将在 refresh/infinite 中回调
             *    } 
             */
            constructor({
                path = '/product',
                current = 0,
                offset = 10,
                showInfinite = true,
                loadData
            }) {
                this.path = path;
                this.current = current;
                this.offset = offset;
                this.showInfinite = showInfinite;
                this.loadData = loadData;
                this.data = { // 数据挂载容器对象，绑定到视图层
                    items: []
                }
            }
            // 下拉刷新方法
            refresh() {
                // 重置上拉加载状态
                this.showInfinite = true;
                // 重置数据列表/索引
                this.current = 0;
                this.data.items = [];
                setTimeout(() => {
                    this.loadData(); // 发送 http 请求
                    $scope.$broadcast('scroll.refreshComplete');
                }, 1000);
            }
            // 上拉加载方法
            infinite() {
                setTimeout(() => {
                    this.loadData(); // 发送 http 请求
                }, 500);
            }
        }
        // 实例化刷新组件添加到作用域上
        $scope.good = new RefreshComponent({
            path: '/product/good',
            loadData: function () {
                $http({
                    method: 'GET',
                    url: config.serverUrl + this.path,
                    params: {
                        current: this.current,
                        offset: this.offset
                    }
                }).then(resData => {
                    if (resData.data.code && resData.data.items.length > 0) {
                        this.data.items = this.data.items.concat(resData.data.items);
                        this.current += this.offset;
                    } else if (resData.data.code && resData.data.items.length === 0) {
                        this.showInfinite = false; // 关闭上拉加载
                        $cordovaToast.showShortCenter('没有更多数据了!');
                    } else {
                        $cordovaToast.showShortCenter('数据请求失败，请尝试下拉刷新');
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete'); // 发送广播:加载完成
                }).catch(resData => {
                    $cordovaToast.showShortCenter('数据请求失败，请检查网络');
                });
            }
        });
        $scope.good.data.banner = {
            image: config.activityPoster
        };
        $scope.good.goDetail = id => {
            $state.go('good-detail');
        }

    }
]).service('HomeService', []);
