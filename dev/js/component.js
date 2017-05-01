/*
 * 公共组件类文件
 * @Author: Cphayim 
 * @Date: 2017-05-01 21:19:26 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2017-05-01 22:15:50
 */

/**
 * 刷新(下拉刷新/上拉加载)组件类
 * 实例化一个刷新组件对象
 * @class RefreshComponent
 */
class RefreshComponent {
    /**
     * 构造器参数说明
     * 传入的对象将被解构赋值 (对象属性->变量)
     * @param {Object} {
     *        {Object}   scope         组件实例所在作用域的 $scope 对象
     *        {Sring}    path          http 请求路径，不包括主机名，默认值 '/product'
     *        {Number}   current       当前列表索引，默认值 0
     *        {Number}   offset        每次请求加载的数量(列表项数)，默认值 10
     *        {Boolean}  hasInfinite   是否启用上拉加载，默认值 true
     *        {Object}   data          数据容器对象，用于存放网络请求获得的数据，并绑定到视图层。可预创建后传入, 默认值 {}
     *        {Function} reset         data 数据容器重置规则，将在 refresh 中回调，之后执行 loadData (例:清空列表->发送请求)
     *        {Function} loadData      http 请求函数，将在 refresh/infinite 中回调
     *    } 
     */
    constructor({
        scope = null,
        path = '/product',
        current = 0,
        offset = 10,
        hasInfinite = true,
        data = {},
        reset = function () {},
        loadData = function () {}
    }) {
        this.scope = scope;
        this.path = path;
        this.current = current;
        this.offset = offset;
        this.hasInfinite = hasInfinite; // 是否开启上拉加载功能
        this.showInfinite = !!this.hasInfinite; // 上拉加载开关状态
        this.data = data; // 数据容器对象，绑定到视图层
        this.reset = reset;
        this.loadData = loadData;
    }
    // 下拉刷新方法
    refresh() {
        // 重置上拉加载状态(未开启功能则跳过)
        this.hasInfinite && (this.showInfinite = true);
        // 重置索引
        this.current = 0;
        // 重置数据容器
        this.reset();
        // 发送 http 请求
        setTimeout(_ => {
            this.loadData();
            this.scope.$broadcast('scroll.refreshComplete'); // 广播刷新完成
        }, 1000);
    }
    // 上拉加载方法
    infinite() {
        // 发送 http 请求
        setTimeout(_ => {
            this.loadData();
        }, 500);
    }
}
