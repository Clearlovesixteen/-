/*
 * @Descripttion: 
 * @version: 
 * @Author: WJK
 * @Date: 2020-04-10 13:43:11
 * @LastEditors: WJK
 * @LastEditTime: 2021-07-13 12:16:27
 */
// 判断是否已经洞察授权过了
import store from '@/store'
export async function isLogin() {
    // debugger;
    const channelCode = getQueryVariable('channelCode') || localStorage.getItem("channelCode");
    // store.commit("setChannelCode", channelCode);
    localStorage.setItem("channelCode" , channelCode)

    // 教师编号
    const teacherEmpNo = getQueryVariable('teacherEmpNo') || sessionStorage.getItem("teacherEmpNo");
    sessionStorage.setItem("teacherEmpNo" , teacherEmpNo)

    // 教师名字
    const teacherName = getQueryVariable('teacherName') || sessionStorage.getItem("teacherName");
    sessionStorage.setItem("teacherName" ,decodeURI(teacherName) )
    
    // console
    // debugger;
    if (localStorage.union_id) {
        return true
    } else {
        // 如果不存在，再判断
        
        if (getQueryVariable('union_id')) {
            // debugger;
            let a = window.location.href.split('?')[0]
            console.log(a)
            localStorage.union_id = getQueryVariable('union_id')
            localStorage.open_id = getQueryVariable('open_id')
            location.replace(window.location.href.split('&')[0])
        } else {
            // 如果缓存中没有，链接中也没有，则需要去获取 
            // let url = 'https://insight.speiyou.com/i/usercenter/api/wxoauth?app_id=wxc5260a5797fcc8c3&callback_url=' + window.location.href;
            // debugger;
            const url = 'https://wxapi.speiyou.com/usercenter/common/wxoauth?app_id=wxc5260a5797fcc8c3&callback_url=' + window.location.href
            console.log(url)
            location.replace(url)
        }
    }
}
function getQueryVariable(variable) {
    // debugger;
    var query = window.location.search.substring(1)
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (pair[0] == variable) {
            return pair[1]
        }
    }
    return ''
}