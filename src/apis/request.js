

/*
 * @Descripttion: 
 * @version: 
 * @Author: WJK
 * @Date: 2020-06-01 13:21:27
 * @LastEditors: WJK
 * @LastEditTime: 2021-07-12 16:17:25
 */

import { Toast } from 'vant';
import store from '../store'
import router from '../router'
import md5 from 'js-md5'

class Request {
    constructor(parms) {
        this.withBaseURL = parms.withBaseURL
        this.baseURL = parms.baseURL
        // this.path = parms.getPath()
    }
    request(parames) {
        // debugger;
        let url = parames.url || ''
        let method = parames.method || 'GET'
        let data = parames.data || ''
        this.withBaseURL = (url.indexOf('http') == -1)
        let requestUrl = this.withBaseURL ? this.baseURL + url : url;
        let time = new Date().getTime()
        // console.log(store.state.token)
        let options = {
            method,
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=UTF-8',
                authorization: store.state.token || null,
                time:time
            },
            body: data ? JSON.stringify(data) : JSON.stringify({ 'null': null })
        }
        // 签名校验
        if (method == 'GET') {
            // debugger;
            delete options.body;
            
            // console.log(window.location.search)
            let salt = "dg*&%&546&*%;'34%&^#&*./,kl][du"
            let objArr = []
            let objArrStr = ""
            let qs = '?';
            for (const key in parames.data) {
                objArr.push(`${key}=${parames.data[key]}`)
                qs+= key + "=" + parames.data[key] + "&"
            }
            objArr.push(`time=${time}`)
            objArr = objArr.sort((a, b) => {
                return a - b
            })
            // debugger;
            // 26
            // 31
            // debugger;
            let path = parames.url.substring(31 , parames.url.length)
            objArrStr = `${[path]}&&${objArr.join('&&')}&&${salt}`
            options.headers.sign =  md5(objArrStr)
            qs = qs.substring(0, qs.length - 1)
            qs.length > 1 ? requestUrl += qs : ''
            // console.log(options)
        }
        if (method == 'POST') {
            let salt = "dg*&%&546&*%;'34%&^#&*./,kl][du"
            let objArr = []
            let objArrStr = ""
            objArr.push(`time=${time}`)
            objArr = objArr.sort((a, b) => {
                return a - b
            })
            let path = parames.url.substring(31 , parames.url.length)
            objArrStr = `${[path]}&&${objArr.join('&&')}&&${salt}`
            options.headers.sign =  md5(objArrStr)
        }
        // debugger
        // return fetch(requestUrl, options)
        //         .then( response=> response.json())
        //         .then(function (res) {
        //             return successFn('',res)
        //         }).catch(function (err) {
        //             console.log('catch了');
        //             error(err)
        //         })
        return new Promise((resolve, reject) => {
            fetch(requestUrl, options)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        return Promise.reject({
                            status: response.status,
                            statusText: response.statusText
                        })
                    }
                })
                .then(function (res) {
                    successFn(resolve, res)
                }).catch(function (err) {
                    reject(error(err))
                })
        })
    }
}
function error(err) {
    Toast({
        message: '网络不给力！请稍后再试',
        icon: 'none',
        duration: 3500
    })
    // Toast({
    //     message: err,
    //     duration: 2000
    // })
}
function successFn(resolve, data) {
    Toast.clear();
    // debugger;
    switch (data.code) {
        case 0:
            resolve(data.data)
            break;
        case 89:
            //活动未开始
            store.commit('setShowPop', true)
            store.commit('setPopType', 'noStart')
            break;
        case 90:
            //活动已结束
            store.commit('setShowPop', true)
            store.commit('setPopType', 'reviewNote')
            // setTimeout(() => {
            //     window.location.href = 'https://mlecture.speiyou.com/page/im/Lecture?live_room_id=1597830329134&lecture_id=1597831546142&type=lecture'
            // }, 2000);
            break;
        case 108:
            //超过提交次数
            store.commit('setShowPop', true)
            store.commit('setPopType', 'only')
            // resolve(data)
            break;
        case 91:
            //不是浙江用户
            store.commit('setShowPop', true)
            store.commit('setPopType', 'loction')
            // resolve(data)
            break;
        case 111:
            //洞察未关注
            // Toast(data.msg)
            store.commit('setActiveFocus', true)
            break;
        case 112:
            //洞察未注册
            // Toast(data.msg)
            router.push({ name: 'enroll' })
            break;
        case 118:
            //超过6次
            store.commit('setShowPop', true)
            store.commit('setPopType', 'countOverflow')
            break;
        // 用户已经领取
        case 133:
            // debugger;
            Toast("您已领取")
            setTimeout(() => {
                router.push({ name: 'my', params: { number: "me" } })
            }, 2000)
            store.commit("setShowCouPon", false)
            break;
        // // 卖课
        case 137:
           
            break;
        case 138:
           
            break;
        // 领取失败
        case 136:
            Toast(data.msg)
            setTimeout(() => {
                router.push({ name: 'my', params: { number: "me" } })
            }, 2000)
            store.commit("setShowCouPon", false)
            break;
        case 132:
            store.commit("setToMyPen", true)
            break;
        default:
            businessError(data.msg)
            break;
    }

}



function businessError(err) {

    Toast({
        message: err,
        duration: 2000
    })
    // throw error(err)
}
const request = new Request({
    baseURL: process.env.VUE_APP_API,
    withBaseURL: true
})

// const signAlgorithm = function(obj) {
//     let objArr = [],
//         objArrStr = ''
//     for (var key in obj.data) {
//         objArr.push(`${key}=${obj[key]}`)
//     }
//     objArr.push(`time=${obj.time}`)
//     objArr = objArr.sort((a, b) => {
//         return a - b
//     })
//     objArrStr = `${obj.url}&&${objArr.join('&&')}&&${config.salt}`
//     return md5(objArrStr)
// }


export default request