/*
 * 登录/注册
 * @Author: Cphayim 
 * @Date: 2017-04-30 22:12:01 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2017-05-07 01:06:11
 */
angular.module('Chufaba').controller('loginModelController', ['$scope',
    ($scope) => {
        // 状态记录
        $scope.isRegister = false;
        $scope.toLogin = _ => {
            $scope.isRegister = false;
        }
        $scope.toRegister = _ => {
            $scope.isRegister = true;
        }
    }
]).controller('formController', ['$scope', '$http', '$cordovaToast', '$ionicLoading', '$interval',
    ($scope, $http, $cordovaToast, $ionicLoading, $interval) => {
        // 请求的路由
        const routerName = '/user';
        // 登录数据对象 $scope.loginData = {phone, password}
        // 注册数据对象 $scope.registerData = {phone,username,password}

        // 是否禁用验证码按钮
        $scope.vCodeBtnDis = false;
        $scope.vCodeTime = 60;
        $scope.timer = null; // 定时器
        // 获取验证码
        $scope.getVCode = e => {
            // 禁用按钮
            $scope.vCodeBtnDis = true;
            // 开启倒计时
            openCountdown();
            // 发送请求
            $http.post(`${config.serverUrl + routerName}/sms`, {
                phone: $scope.registerData.phone,
                r: true
            }).then(resData => {
                if (resData.data.code === 'ok') {
                    $cordovaToast.showShortBottom('验证码发送成功');
                } else if (resData.data.code === 'repeat') {
                    closeCountdown();
                    $cordovaToast.showShortBottom('该手机号码已被注册');
                } else {
                    closeCountdown();
                    $cordovaToast.showShortBottom('验证码发送失败');
                }
            }).catch(resData => {
                closeCountdown();
                $cordovaToast.showShortBottom('连接失败，请检查网络');
            });
        }
        // 开启一分钟定时器
        function openCountdown() {
            let i = 60;
            $scope.vCodeTime = --i;
            $scope.timer = $interval(_ => {
                $scope.vCodeTime = --i;
                if (!i) {
                    // 关闭定时器恢复按钮
                    closeCountdown()
                }
            }, 1000);
        }
        // 关闭定时器
        function closeCountdown() {
            $interval.cancel($scope.timer);
            $scope.vCodeBtnDis = false;
            $scope.vCodeTime = 60;
        }

        // 登录表单提交
        $scope.loginSubmit = e => {
            e.preventDefault();
            if ($scope.loginForm.$invalid) {
                // 表单验证失败，拦截请求
                return;
            }
            // 显示等待框
            $ionicLoading.show({
                template: `<ion-spinner icon="lines" class="spinner-balanced"></ion-spinner><p>正在登录</p>`
            });
            // 拷贝对象
            const data = JSON.parse(JSON.stringify($scope.loginData));
            // MD5
            data.password = MD5(data.password);
            setTimeout(_ => {
                // 发送登录请求
                $http.post(`${config.serverUrl+routerName}/login`, data)
                    .then(resData => {
                        $ionicLoading.hide();
                        loginResult(resData.data)
                    })
                    .catch(resData => {
                        $ionicLoading.hide();
                        $cordovaToast.showShortBottom('连接失败，请检查网络')
                    });
            }, 500);
        }

        // 注册表单提交
        $scope.registerSubmit = e => {
            e.preventDefault();
            if ($scope.registerForm.$invalid || $scope.confirm != $scope.registerData.password) {
                // 表单验证失败，拦截请求
                return;
            }
            // 显示等待框
            $ionicLoading.show({
                template: `<ion-spinner icon="lines" class="spinner-balanced"></ion-spinner><p>正在注册</p>`
            });
            const data = JSON.parse(JSON.stringify($scope.registerData));
            data.password = MD5(data.password);

            setTimeout(_ => {
                // 发送注册请求
                $http.post(`${config.serverUrl+routerName}/register`, data)
                    .then(resData => {
                        $ionicLoading.hide();
                        if (resData.data.code == 'repeat') {
                            $cordovaToast.showShortBottom('该号码已被注册');
                        } else if(resData.data.code == 'vCode'){
                            $cordovaToast.showShortBottom('短信验证码错误');
                        }else {
                            loginResult(resData.data)
                        }
                    })
                    .catch(resData => {
                        $ionicLoading.hide();
                        $cordovaToast.showShortBottom('连接失败，请检查网络')
                    });
            }, 500);
        }
        /**
         * 登录结果处理 (登录/注册(自动登录) ajax 请求成功后回调)
         * @param {Object} data 响应数据
         */
        function loginResult(data) {
            if (data && data.code === 'ok') {
                // 登录成功，本地存储用户信息
                localStorage.setItem('userInfo', JSON.stringify(data.userInfo));
                // 向父级发射事件，关闭登录窗口，并广播更新 用户 视图
                $scope.$emit('hideLoginModal', true);
                $cordovaToast.showShortBottom('登录成功');
            } else if (data && data.code === 'fail') {
                // 登录失败
                $cordovaToast.showShortBottom('账号或密码错误，登录失败');
            } else if (data && !/^err_/.test(data.code)) {
                // 服务端数据库查询/写入失败
                $cordovaToast.showShortBottom('服务器错误，登录失败');
            } else {
                console.log(data.msg);
                $cordovaToast.showShortBottom('未知错误，登录失败');
            }
        }
    }
]);
