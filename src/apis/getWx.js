/*
 * @Descripttion: 
 * @version: 
 * @Author: WJK
 * @Date: 2020-03-25 10:37:23
 * @LastEditors: WJK
 * @LastEditTime: 2021-07-12 16:17:08
 */
import request from './request'
import store from '../store/index'
import wx from 'weixin-js-sdk'

// import MtaH5 from 'mta-h5-analysis'
import {
    WECHAT_API_LIST,
    WECHAT_HIDE_MENU_LIST,
    WECHAT_SHARE_OPTIONS,
    WECHAT_SHARE_OPTIONS1,
} from '../config/wx'
// /* eslint-disable */
let publicurl = 'https://hzservice.hzxueersi.com/apiH5/';
// let publicurl = 'http://192.168.2.242:12250/apiH5/'
export function getWxConfig(data) {
  //微信授权
  return request.request({
    url: `${publicurl}weChat/get`,
    data,
  })
}

export async function configShare(parType) {
  //微信授权
  
  let signUrl = encodeURIComponent(location.href.split("#")[0]);
  let data = await getWxConfig({ signUrl })
  // debugger;
  // console.log(data)
  if (!data) return
  // let data = res.data;
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: data.appId, // 必填，公众号的唯一标识
    timestamp: data.timestamp, // 必填，生成签名的时间戳
    nonceStr: data.nonceStr, // 必填，生成签名的随机串
    signature: data.signature, // 必填，签名
    jsApiList: WECHAT_API_LIST // 必填，需要使用的JS接口列表
  });
  wx.ready(() => {
    wx.hideMenuItems({
      menuList: WECHAT_HIDE_MENU_LIST // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
    });
    // debugger;
    let channelCode = localStorage.getItem("channelCode")
    let title = WECHAT_SHARE_OPTIONS1.title
    let desc = WECHAT_SHARE_OPTIONS1.desc
    let imgUrl= WECHAT_SHARE_OPTIONS.imgUrl
    let shareUrl =  "https://hzfront.hzxueersi.com/noteContext/" + "?" +"channelCode=" + channelCode; 
    
    console.log(title , desc)
    if (parType) {                                                                                                                              
      title = WECHAT_SHARE_OPTIONS.title
    }
    // debugger;
    if (!store.state.gps.latitude) {
      wx.getLocation({
        type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: res => {
          console.log(res)
          store.commit("setGps", {
            latitude: res.latitude, //纬度
            longitude: res.longitude //经度
          });
        }
      });
    }
    wx.onMenuShareTimeline({
      //分享到朋友圈
      title, // 分享标题
      link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success: () => {
        // 用户点击了分享后执行的回调函数
        // console.log("分享成功");
        // MtaH5.clickStat("share")
      }
    });
    wx.onMenuShareAppMessage({
      //分享到朋友
      title, // 分享标题
      desc, // 分享描述
      link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success: () => {

        // 用户点击了分享后执行的回调函数
        console.log("分享朋友成功");
        // MtaH5.clickStat("share")
      }
    });
  });

}
/* eslint-enable */