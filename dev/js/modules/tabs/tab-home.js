/*
 * @Author: Cphayim 
 * @Date: 2017-04-18 21:33:38 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2017-05-02 01:38:11
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

        // component.js
        // 实例化刷新组件添加到作用域上
        // 精选列表的刷新组件
        $scope.good = new RefreshComponent({
            scope: $scope,
            path: '/product/good-list',
            data: {
                items: []
            },
            reset() {
                this.data.items.length = 0;
            },
            loadData() {
                $http({
                    method: 'GET',
                    url: config.serverUrl + this.path,
                    params: {
                        current: this.current,
                        offset: this.offset
                    }
                }).then(resData => {
                    if (resData.data.code == 'ok' && resData.data.items.length > 0) {
                        // 将新数据合并到数据容器中
                        this.data.items = this.data.items.concat(resData.data.items);
                        this.current += this.offset;
                    } else if (resData.data.code == 'ok' && resData.data.items.length === 0) {
                        this.showInfinite = false; // 关闭上拉加载
                        $cordovaToast.showShortCenter('没有更多数据了!');
                    } else {
                        $cordovaToast.showShortCenter('数据请求失败，请尝试下拉刷新');
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete'); // 向子组件发送广播: 加载完成
                }).catch(resData => {
                    $cordovaToast.showShortCenter('数据请求失败，请检查网络');
                });
            }
        });
        $scope.good.data.banner = {
            // 将配置文件中的主题 banner 挂载到数据容器
            title: config.activityPoster.title,
            image: config.activityPoster.image,
            url: config.activityPoster.url
        };
    }
]).service('HomeService', []);
