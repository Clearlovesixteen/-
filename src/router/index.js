/*
 * @Descripttion: 
 * @version: 
 * @Author: WJK
 * @Date: 2020-08-14 09:20:30
 * @LastEditors: WJK
 * @LastEditTime: 2021-07-07 16:20:15
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index/index.vue'
import store from '../store/index'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            keepAlive: false // 需要缓存
        },
        component: index
    },
    {
        path: '/my/:number',
        props: true,
        name: 'my',
        component: () => import(/* webpackChunkName: "my" */ '../views/my')
    },
    {
        path: '/up',
        name: 'up',
        component: () => import(/* webpackChunkName: "up" */ '../views/up')
    },
    {
        path: '/rank',
        name: 'rank',
        component: () => import(/* webpackChunkName: "rank" */ '../views/rank')
    },
    {
        path: '/regist',
        name: 'regist',
        component: () => import(/* webpackChunkName: "regist" */ '../views/regist')
    },
    {
        path: '/enroll',
        name: 'enroll', 
        component: () => import(/* webpackChunkName: "regist" */ '../views/enroll')
    }
]



const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from  , next) => {
    // debugger;
    // if(!to.query.channelCode){
    //     to.query.channelCode = store.state.channelCode
    // }
    if(to.name == "rank" || to.name  == "up" || to.name == "enroll"){
        store.commit("setIDStatus" , false)
        store.commit("setBarColor" , false)
        store.commit("setBotBar" , false)
        store.commit("setToUserNowt" , require("../assets/user.png"))
    }else if(to.name  == "my"){
        // debugger;
        store.commit("setIDStatus" , true)
        store.commit("setBarColor" , true)
        store.commit("setToUserNowt" , require("../assets/userimg.png"))
        store.commit("setNoteShow" , true)
        store.commit("setBotBar" , true)
    }else{
        store.commit("setIDStatus" , true)
        store.commit("setBarColor" , false)
        store.commit("setToUserNowt" , require("../assets/user.png"))
        store.commit("setNoteShow" , false)
        store.commit("setBotBar" , true)
    }
    next()
    
    // console.log(to)
  })

export default router
