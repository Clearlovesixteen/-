/*
 * @Descripttion: 
 * @version: 
 * @Author: WJK
 * @Date: 2020-03-25 11:03:07
 * @LastEditors: WJK
 * @LastEditTime: 2021-07-07 16:47:22
 */
export default {
  userInfo: {},
  // 存储定位信息
  gps: {
    latitude: "",
    longitude: "",
  },
  fid:'',
  checkInfo:{},
  token:'',
  routerDepth:0,
  showPop:false,//显示标准弹窗
  popType:'',//标准弹窗内容
  focus:false,//是否关注
  course:false,//卖课
  // 存储导航到哪里，然后做判断botBar的显示效果
  barShow:true,
  noteShow:false,
  // 我的笔记的变换的颜色
  toUserNowt:require("../assets/user.png"),
  barColor:false,
  //账号显示
  idStatus:true,
  // 领奖弹框
  showCouPon: false,
  // 点击我的笔记
  toMyPen:false,
  // 渠道码
  channelCode:"",
  // 未关注
  activeFocus:false,
  // 注册or没注册
  register: true,
}