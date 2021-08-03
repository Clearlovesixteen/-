/*
 * @Descripttion: 
 * @version: 
 * @Author: WJK
 * @Date: 2020-03-25 10:37:23
 * @LastEditors: WJK
 * @LastEditTime: 2021-07-12 16:17:18
 */

import request from './request'

const publicurl = 'https://hzservice.hzxueersi.com/apiH5/'
// const publicurl = 'http://192.168.2.242:12250/apiH5/'


/**
 * @msg: 埋点
 * @param {string} openId
 * * @param {string} unionId
 * @return {object} 
 */
 export function buryingPoint(data) {
    return request.request({
        url: `${publicurl}noSign/buryingPoint/upload`,
        method: 'POST',
        data
    })
}

/**
 * @msg: 获取会话信息
 * @param {string} openId
 * * @param {string} unionId
 * @return {object} 
 */
export function getToken(data) {
    return request.request({
        url: `${publicurl}index/getToken`,
        method: 'POST',
        data
    })
}
/**
 * @msg: 首页-笔记列表 
 * @param {number} currentPage
 * @param {number} lastTime
 * @param {number} pageSize
 * lastTime
 * @return {type} 
 */
export function pageList(data) {
    return request.request({
        url: `${publicurl}index/pageList`,
        method: 'GET',
        data
    })
}

// /**
//  * @msg: 获取首页数据
//  * @param {type} 
//  * @return: 
//  */
// export function activityImage() {
//     return request.request({
//         url: `${publicurl}index/activityImage`,
//         method: 'GET'
//     })
// }


/**
 * @msg: 获取首页数据
 * @param {type} 
 * @return: 
 */
export function getHorseRaceLamp() {
    return request.request({
        url: `${publicurl}index/horseRaceLamp`,
        method: 'GET'
    })
}

/**
 * @msg: 上传笔记校验
 * @param {string} latitude
 * @param {string} longitude
 * @return {type} 
 */
export function checkUserInfo(data) {
    return request.request({
        url: `${publicurl}index/checkUserInfo`,
        method: 'POST',
        data
    })
}

/**
 * @msg: 我的笔记
 * @param {type} 
 * @return {type} 
 */
export function details(data) {
    return request.request({
        url: `${publicurl}note/details`,
        method: 'GET',
        data
    })
}

/**
 * @msg: 笔记详情接口
 * @param {type} 
 * @return {type} 
 */
 export function detailsCheck() {
    return request.request({
        url: `${publicurl}index/detailsCheck`,
        method: 'GET',
    })
}

/**
 * @msg: 给他人-点赞加油
 * @param {type} 
 * @return {type} 
 */
export function likes(data) {
    return request.request({
        url: `${publicurl}note/likes`,
        method: 'POST',
        data
    })
}
/**
 * @msg: 获取手机验证码
 * @param {type} 
 * @return {type} 
 */
export function sendPhoneCode(data) {
    return request.request({
        url: `${publicurl}account/registerSendPhoneCode`,
        method: 'POST',
        data
    })
}

/**
 * @msg: 注册+完善用户信息
 * @param {type} 
 * @return {type} 
 */

export function regAndCom(data) {
    console.log(data)
    return request.request({
        url: `${publicurl}account/register`,
        method: 'POST',
        data
    })
}

/**
 * @msg: 人气榜
 * @param {type} 
 * @return {type} 
 */
export function popularityList(data) {
    return request.request({
        url: `${publicurl}note/popularityList`,
        method: 'GET'
    })
}
/**
 * @msg: 上传图片接口
 * @param {type} 
 * @return {type} 
 */
export function uploadImage(data) {
    return request.request({
        url: `${publicurl}confirm/uploadImageList`,
        method: 'POST',
        data
    })
}


/**
 * @msg: 获取老师信息
 * @param {type} 
 * @return {type} 
 */
 export function teacherList() {
    return request.request({
        url: `${publicurl}confirm/teacherList`,
        method: 'GET',
    })
}




/**
 * @msg: 确认参赛
 * @param {type} 
 * @return {type} 
 */
export function confirmEntry(data) {
    return request.request({
        url: `${publicurl}confirm/confirmEntry`,
        method: 'POST',
        data
    })
}

/**
 * @msg: 领取积分
 * @param {type} 
 * @return {type} 
 */
export function collectIntegral(data) {
    return request.request({
        url: `${publicurl}user/collectIntegral`,
        method: 'GET'
    })


    
/**
 * @msg: 点赞加油
 * @param {type} 
 * @return {type} 
 */
}

export function clickLikes(data) {
    return request.request({
        url: `${publicurl}user/likes`,
        method: 'POST',
        data
    })
}

/**
 * @msg: 优秀榜
 * @param {type} 
 * @return {type} 
 */
export function excellentList() {
    return request.request({
        url: `${publicurl}note/excellentList`,
        method: 'GET'
    })
}

/**
 * @msg: 是否可以领取积分或者优惠券
 * @param {type} 
 * @return {type} 
 */
 export function luckDrawCheck() {
    return request.request({
        url: `${publicurl}luckDraw/check`,
        method: 'GET'
    })
}

/**
 * @msg: 领取积分或者优惠券数量
 * @param {type} 
 * @return {type} 
 */
 export function luckDrawReceive() {
    return request.request({
        url: `${publicurl}luckDraw/receive`,
        method: 'GET'
    })
}


/**
 * @msg: 卖课
 * @param {type} 
 * @return {type} 
 */ 
 export function newStudent() {
    return request.request({
        url: `${publicurl}note/newStudent`,
        method: 'GET'
    })
}

/**
 * @msg: 查询分享次数
 * @param {type} 
 * @return {type} 
 */ 
 export function firstShare() {
    return request.request({
        url: `${publicurl}note/firstShare`,
        method: 'GET'
    })
}


/**
 * @msg: 关闭官微弹窗
 * @param {type} 
 * @return {type} 
 */ 
 export function cancelOfficialMicro() {
    return request.request({
        url: `${publicurl}note/cancelOfficialMicro`,
        method: 'GET'
    })
}

// 切换账户(手机登录)
export function phoneLogin(data) {
    return request.request({
        url: `${publicurl}switching/phoneLogin`,
        method: 'POST',
        data
    })
}
// 切换账户(学员编号登录)
export function stuNumberLogin(data) {
    return request.request({
        url: `${publicurl}switching/stuNumberLogin`,
        method: 'POST',
        data
    })
}
// 切换账户(完善信息)
export function completeUserInfo(data) {
    return request.request({
        url: `${publicurl}switching/completeUserInfo`,
        method: 'POST',
        data
    })
}
// 切换学员

export function switchStuNum(data) {
    return request.request({
        url: `${publicurl}switching/switchStuNum`,
        method: 'POST',
        data
    })
}
export function stuNumList() {
    return request.request({
        url: `${publicurl}switching/stuNumList`,
        method: 'GET',
    })
}