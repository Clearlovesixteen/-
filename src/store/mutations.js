// import { set } from "vue/types/umd"

/*
 * @Descripttion: 
 * @version: 
 * @Author: WJK
 * @Date: 2020-03-25 11:03:25
 * @LastEditors: WJK
 * @LastEditTime: 2021-07-07 16:45:48
 */
export default {
    setGps(state, par) {
        state.gps = par
    },
    setFid(state, par) {
        state.fid = par
    },
    setUserInfo(state, par) {
        state.userInfo = par
    },
    setCheckInfo(state, par) {
        state.checkInfo = par
    },
    setToken(state, par) {
        state.token = par.authorization
        // console.log(state.authorization)
    },
    conDepth(state, par){
        //记录页面深度
        state.routerDepth++
    },
    setShowPop(state, par) {
        state.showPop = par
    },
    setPopType(state, par) {
        state.popType = par
    },
    setFocus(state, par) {
        state.focus = par
    },
    setCourse(state, par) {
        state.course = par
    },

    // botBar的显示与否
    setBotBar(state , par){
        state.barShow = par
    },

    // 修改tabBar的显示
    setNoteShow(state , par){
        state.noteShow = par
    },
    // 修改我的笔记icon和笔记颜色
    setToUserNowt(state , par){
        state.toUserNowt = par
    },
    setBarColor(state , par){
        state.barColor = par
    },
    // 账号ID
    setIDStatus(state , par){
        state.idStatus = par
    },
    // 参与有奖
    setShowCouPon(state , par){
        state.showCouPon = par
    },
    // 点击我的笔记弹窗问题
    setToMyPen(state , par){
        state.toMyPen = par
    },

    // 渠道码
    setChannelCode(state , par){
        state.channelCode = par
    },
    // 洞察未关注
    setActiveFocus(state , par){
        state.activeFocus = par
    },
    // 未注册
    setRegister(state , par){
        state.register = par
    }
}