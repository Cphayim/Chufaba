/*
 * 自定义过滤器
 * @Author: Cphayim 
 * @Date: 2017-04-24 15:25:00 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2017-04-28 03:36:35
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
}).filter('date',()=>{
    // 处理时间，带星期
    return (dateStr,index)=>{
        const date = new Date(dateStr);
        date.setDate(date.getDate()+index);
        const week = date.getDay();
        let weekStr = '';
        switch(week){
            case 0: weekStr = '周日';break;
            case 1: weekStr = '周一';break;
            case 2: weekStr = '周二';break;
            case 3: weekStr = '周三';break;
            case 4: weekStr = '周四';break;
            case 5: weekStr = '周五';break;
            case 6: weekStr = '周六';break;
            default: '不详';
        }
        return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}，${weekStr}`;
    }
});