/*
 * 自定义过滤器
 * @Author: Cphayim 
 * @Date: 2017-04-24 15:25:00 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2017-04-24 21:19:42
 */

angular.module('Chufaba').filter('imageSize',()=>{
    // 图片大小处理
    return (imageUrl)=>{
        return imageUrl.replace('!320','!375');
    }
}).filter('avatar',()=>{
    // 处理头像地址
    return (avatarUrl)=>{
        let reg = /(jpg|png)$/;
        // 没有头像或头像 url 未通过正则验证，使用默认头像
        if(!avatarUrl || !reg.test(avatarUrl)){
            avatarUrl = 'http://cfbassets.b0.upaiyun.com/assets/v2/head.png';
        }
        return avatarUrl;
    }
}).filter('pointer',()=>{
    // 处理地点
    return (str)=>{
        // 正则替换
        return `— · ${str.replace(/(、)/g,' · ')} · —`;
    }
});