/*
 * 前端全局配置文件
 * @Author: Cphayim 
 * @Date: 2017-04-23 19:14:18 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2017-04-28 14:53:47
 */

/**
 * 配置类
 * 用于实例化一个包含全局配置信息的对象
 * @param {Object} {
 *         host = '127.0.0.1', // 主机名，默认本地
 *         port = '3000', // 端口号，默认3000
 *         ssl = false, // 传输协议是否包含安全套接层
 *         activityPoster = '' // 活动海报的 imageUrl
 *     } 
 */
class Config {
    constructor({ // 解构赋值
        host = '127.0.0.1',
        port = '3000',
        ssl = false,
        activityPoster = '/img/default.jpg'
    }) {
        this.host = host;
        this.port = port;
        this.protocol = ssl ? 'https' : 'http';
        this.serverUrl = `${this.protocol}://${this.host}:${this.port}`;
        this.activityPoster = activityPoster;
    }
}
const activityPoster = `http://img.chufaba.me/events/e3d11e3218c1a9102a0848ff54ad4a17n.jpg`;
// 开发环境
const config = new Config({
    host:'192.168.31.59',
    activityPoster
});
// 生产环境
// const config = new Config({
//     host: 'cfb.cphayim.me',
//     port: '3377',
//     activityPoster
// });
// console.log(config);
