/*
 * @Descripttion: 
 * @version: 
 * @Author: WJK
 * @Date: 2020-08-14 09:20:30
 * @LastEditors: WJK
 * @LastEditTime: 2021-07-05 17:29:30
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import VConsole from 'vconsole';
// const vConsole = new VConsole();
// const vConsole = new VConsole({ maxLogNumber: 1000 });


Vue.config.productionTip = false

import { List, Popup, CountDown, Lazyload, Search, Uploader, Swipe, SwipeItem,ImagePreview , NoticeBar , DropdownMenu, DropdownItem ,Picker  , Field , Icon ,Progress } from 'vant';

Vue.use(List);
Vue.use(Popup);
Vue.use(CountDown);
Vue.use(Search);
Vue.use(Lazyload);
Vue.use(Uploader);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(ImagePreview);
Vue.use(NoticeBar);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Picker);
Vue.use(Field);
Vue.use(Icon);
Vue.use(Progress);

import MtaH5 from 'mta-h5-analysis';
// import xesAnalytics from '@peiyou/open_platform_sdk/dist';
import 'vant/lib/index.css';
// import vconsole from 'vconsole'
// new vconsole()

// xesAnalytics.init({
// 	app_id: "123123",
//   	event_env: "test",
//   	show_log: false,
//   	source: "5"
// })

// xesAnalytics.getFrontSign()

// MtaH5.init({
// 	"sid": '500727334', //必填，统计用的appid
// 	"cid": '500727335', //如果开启自定义事件，此项目为必填，否则不填
// 	"autoReport": 1, //是否开启自动上报(1:init完成则上报一次,0:使用pgv方法才上报)
// 	"senseHash": 0, //hash锚点是否进入url统计
// 	"senseQuery": 0, //url参数是否进入url统计
// 	"performanceMonitor": 0, //是否开启性能监控
// 	"ignoreParams": [] //开启url参数上报时，可忽略部分参数拼接上报
// });
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')

