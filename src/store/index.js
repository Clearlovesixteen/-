/*
 * @Descripttion: 
 * @version: 
 * @Author: WJK
 * @Date: 2020-07-09 14:40:34
 * @LastEditors: WJK
 * @LastEditTime: 2020-07-09 17:31:14
 */ 
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations' 
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions: {
  },
  modules: {
  }
})
