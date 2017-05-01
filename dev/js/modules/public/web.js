angular.module('Chufaba').controller('WebController', ['$scope', '$stateParams', '$sce', '$ionicLoading',
    ($scope, $stateParams, $sce, $ionicLoading) => {
        // 外部 url 需要 使用 $sce 设置代理
        $scope.title = $stateParams.title;

        document.getElementById('iframe').onload = function () {
            $ionicLoading.hide();
        }
        $scope.$on('$ionicView.loaded', function () {
            $ionicLoading.show();
            setTimeout(function () {
                $ionicLoading.hide();
            }, 3000);
        });
        $scope.$on('$ionicView.afterEnter', function () {
            $scope.targetUrl = $sce.trustAsResourceUrl($stateParams.url);
        });
    }
]);
