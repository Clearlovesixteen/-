<!--
 * @Descripttion: 
 * @version: 
 * @Author: WJK
 * @Date: 2020-08-14 09:34:08
 * @LastEditors: WJK
 * @LastEditTime: 2021-07-13 12:13:09
-->
<!--  -->
<template>
  <div class="main">
    <id-module v-show="$store.state.idStatus"  :studentName="studentName" :studNumber="studNumber" class="idModule"/>
    <div class="content">
      <!-- <div class="userInfo"></div> -->
      <img class="top" src="../../assets/top.png" />
      <img class="rule" @click="setRule" src="../../assets/ruleBtn.png" alt />
      <!-- <div class="starts">
        <img :src="showNote" alt>
        <img :src="reviewNote" alt>
        <img :src="sunDryingNote" alt>
      </div> -->
      <!-- <img
        v-show="showFlag"
        class="banner"
        :src="bannerUrl"
        @click="toUrl"
        alt
      /> -->
      <van-search
        v-model="search"
        shape="round"
        show-action
        class="searchMod"
        placeholder="输入作品编号或姓名搜索笔记"
        @search="onSearch"
        right-icon="https://xes-public.oss-cn-hangzhou.aliyuncs.com/search.png"
      >
        <template #action>
          <div class="searchBtn" @click="onSearch"></div>
        </template>
      </van-search>
      <!-- 跑马灯 -->
      <!-- swipeStatus -->
      <van-notice-bar :scrollable="false" v-show="swipeStatus">
        <van-swipe
          vertical
          class="notice-swipe"
          :autoplay="3000"
          :show-indicators="false"
        >
          <div v-for="(list, index) in marqueeList" :key="index">
            <van-swipe-item class="swipeDiv">
              <img :src="list.headPic" alt="" />
              <span v-if="list.winningType == 1"
                >上传了笔记 ，抽中了{{ list.receiveValue }}积分</span
              >
              <span v-if="list.winningType == 2"
                >上传了笔记 ，抽中了{{ list.receiveValue }}元优惠券</span
              >
            </van-swipe-item>
          </div>
        </van-swipe>
      </van-notice-bar>
      <!-- 老师模块 -->
      <div class="teacherMod" v-show="teacherModStu">
        <div class="teacherModText">
          <img src="../../assets/smallLine.png" alt="">
          <h3>{{teacherModName}}</h3>
          <span>老师的学生笔记专场</span>
        </div>
        <div class="goNoteShow">
          <img src="../../assets/goBackShow.png" alt="" @click="gobackNoteShow">
        </div>
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        class="list"
        offset="50"
        @load="onLoad"
        v-show="listStatus"
      >
        <div
          @click="toBook(item.noteFlag)"
          v-for="item in list"
          :key="item.serialNum"
          class="li"
        >
          <span class="studName">No.{{ item.serialNum }}</span>
          <img class="detailImg" :src="item.defaultUrl" alt />
          <div class="code">
            <div class="imgAndName">
              <img :src="item.headPic" alt="用户头像" class="userImg" />
              <span class="name">{{ item.name }}</span>
            </div>

            <div class="assist">
              <img src="../../assets/assist.png" alt />
              <span>{{ item.likesNum }}</span>
            </div>
          </div>
        </div>
      </van-list>
      <img
        src="../../assets/searchNone.png"
        class="searchNone"
        v-show="searchNoneImg"
      />
    </div>

    <van-popup
      :close-on-click-overlay="false"
      v-model="showRule"
      style="background-color: rgba(0, 0, 0, 0)"
    >
      <rulePop @onCancel="showRule = false" :active="1"></rulePop>
    </van-popup>
    <van-popup
      style="background-color: rgba(0, 0, 0, 0)"
      v-model="$store.state.showCouPon"
    >
      <div class="couponText">
        <h3>{{ discountNum }}</h3>
        <span>{{ discountType }}</span>
      </div>
      <img src="../../assets/coupon.png" alt="" class="coupon" />
      <img
        src="../../assets/clickCoupon2.png"
        alt=""
        class="clickCoupon"
        v-show="BtnShow"
      />
      <img
        src="../../assets/clickCoupon.png"
        alt=""
        class="clickCoupon"
        v-show="!BtnShow"
        @click="clickCoupon"
      />
    </van-popup>
    <!-- <van-popup style="background-color: rgba(0, 0, 0, 0)" v-model="showFocus">
      <img class="qr" src="../../assets/focus1.png" />
    </van-popup> -->
    <van-popup style="background-color: rgba(0, 0, 0, 0)" v-model="showPop">
      <pop :type="type"></pop>
    </van-popup>
    <van-popup style="background-color: rgba(0, 0, 0, 0)" v-model="showUpTip">
      <div class="upTip">
        <button @click="showUpTip = false">确认</button>
      </div>
    </van-popup>

    <van-popup
      style="background-color: rgba(0, 0, 0, 0)"
      v-model="$store.state.toMyPen"
    >
      <img class="close" src="../../assets/close.png" @click="closeNote" />
      <img src="../../assets/toMyPen.png" class="toMyNote" />
    </van-popup>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { configShare } from "@/apis/getWx";
import { isLogin } from "@/config/islogin";

import {
  getToken,
  pageList,
  details,
  getHorseRaceLamp,
  luckDrawCheck,
  luckDrawReceive,
  buryingPoint,
} from "@/apis";
import rulePop from "@/components/rule";
import idModule from "../../components/idModule.vue";
import { Toast } from "vant";
import pop from "@/components/pop";
import _ from "lodash";
var that;
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { rulePop, pop , idModule},
  props: [],

  data() {
    // 这里存放数据

    return {
      // 老师模块
      teacherModStu:false,
      teacherModName:"ssss",
      teacherEmpNo:"",

      // 跑马灯，搜索图，搜索列表的显示于隐藏
      swipeStatus: true,
      searchNoneImg: false,
      listStatus: true,
      // 跑马灯list
      marqueeList: [
        {
          name: "内容1",
        },
        {
          name: "内容2",
        },
        {
          name: "内容3",
        },
      ],
      // mainData: {},
      search: "",
      page: 1,
      total: 0,
      list: [],
      loading: false,
      finished: false,
      lastTime: "",
      showRule: false,
      // showFocus: false,
      showPop: false,
      showUpTip: false,
      // showFlag: false,
      // bannerUrl: "",
      // bannerJumpUrl: "",
      type: "only",
      // showNote: require("../../assets/showNote0.png"),
      // reviewNote: require("../../assets/reviewNote0.png"),
      // sunDryingNote: require("../../assets/sunDryingNote0.png"),
      noFirst: false,
      // 领优惠券的弹框
      showCouPon: false,
      // 积分还是优惠券
      discountType: "",
      discountNum: "",
      // 领取优惠券显示
      // ShowCouPon:false,
      BtnShow: true,
      // 学员姓名
      studentName:"",
      // 学员编号
      studNumber:"",
      
    };
  },
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // toUrl() {
    //   window.location.href = this.bannerJumpUrl;
    // },

    toBook(number) {
      buryingPoint({ idList: [10] });
      this.$router.push({ name: "my", params: { number } });
    },

    setRule() {
      this.showRule = true;
    },
    // 搜索
    onSearch() {
      // console.log(1);
      buryingPoint({ idList: [17] });
      this.finished = true;
      this.page = 1;
      this.list = [];
      (this.lastTime = ""), this.getList();
    },
    // onCancel() {
    //   //
    // },
    onLoad: _.throttle(() => {
      console.log(1);
      that.loading = true;
      Toast.loading({
        message: "加载中...",
        duration: 0, // 持续展示 toast
        forbidClick: true,
        loadingType: "spinner",
      });
      that.getList();
    }, 300),
    getList() {
      // debugger;
      const par = {
        currentPage: this.page,
        lastTime: this.lastTime,
        pageSize: 10,
        searchP: this.search,
        teacherEmpNo:this.teacherEmpNo
      };

      if (this.search == "" && this.teacherEmpNo == "") {
        this.swipeStatus = true;
      }else{
        this.swipeStatus = false;
      }
      pageList(par).then((data) => {
        // debugger;
        Toast.clear();
        // debugger;
        // console.log("本次加载页码--", this.page);
        // console.log("本次加载数据--");
        // console.log(data);
        this.loading = false;
        // if (this.page === 1 ) {
        //   this.list = data.list;
        // } else {
        //   this.list = this.list.concat(data.list);
        // }
        // debugger;
        if (this.search == "") {
          // debugger;
          this.searchNoneImg = false;
          this.listStatus = true;
          if (data.list.length == 0) {
            this.finished = true
          } else if (data.list.length > 0 && data.list.length < 10) {
            // this.listStatus = true;
            this.finished = true
            this.list = this.list.concat(data.list);
          } else {
            this.finished = false
            this.list = this.list.concat(data.list);
            this.page++
          }
        }else{
          // debugger;
          if(this.page == 1 && data.list.length == 0){
            this.searchNoneImg = true;
            this.listStatus = false;
            this.finished = true;
            return
          }
          if(data.list.length == 0){
            this.finished = true;
            this.searchNoneImg = false;
            this.listStatus = true;
          }else if(data.list.length > 0 && data.list.length < 10 ){
            this.list = this.list.concat(data.list);
            this.listStatus = true;
            this.searchNoneImg = false;
            this.finished = true
          }else {
            this.list = this.list.concat(data.list);
            this.listStatus = true;
            this.searchNoneImg = false;
            this.finished = false;
            this.page++
          }
        }
        // 防止数据重复
        data.list.length > 0
          ? (this.lastTime = data.list[data.list.length - 1].lastTime)
          : "";
        
        // if ( data.list.length < 10) {
        //   this.finished = true;
        //   this.listStatus = true;
        // }
        // 判断是否首次加载
        // this.noFirst = true;
      });
    },
    // 点击领取优惠券按钮
    clickCoupon() {
      if (this.discountType == "积分") {
        buryingPoint({ idList: [23] });
      } else {
        buryingPoint({ idList: [24] });
      }
      // console.log(1)
      this.$store.commit("setShowCouPon", false);
      luckDrawReceive().then(() => {
        Toast("领取成功");
        setTimeout(() => {
          this.$router.push({ name: "my", params: { number: "me" } });
        }, 2000);
      });
      // if(true){
      //   setTimeout(()=> {
      //       this.showCouPon =false
      //      this.$router.push({ name: "my", params: { number: "me" } });
      //   },2000)
      // }else{
      // }
    },
    closeNote() {
      this.$store.commit("setToMyPen", false);
    },
    // 老师模块的 回笔记秀场
    gobackNoteShow(){
      // console.log(2)
      this.swipeStatus = true
      this.teacherModStu = false
      this.page = 1;
      this.lastTime = "",
      this.teacherEmpNo = "",
      this.search = ""
      localStorage.setItem('teacherName' , "")
      localStorage.setItem('teacherEmpNo' , '')
      this.getList()
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    buryingPoint({ idList: [1] });
    await configShare();
    await isLogin();
    // debugger;
    // if (this.$route.query.channelCode) {
    //   this.$store.commit("setChannelCode", this.$route.query.channelCode);
    // }
    // let channelCode = this.$route.
    // debugger;
    // let channelCode =  this.$store.state.channelCode
    // console.log(channelCode)
    // console.log(localStorage)
    // console.log(this.$route)
    // debugger;
    const token = {
      openId: localStorage.open_id || null,
      unionId: localStorage.union_id || null,
      channelCode: localStorage.getItem("channelCode"),
    };
    if (!localStorage.open_id) {
      return;
    }
    this.marqueeList = await getHorseRaceLamp();
    // console.log(data2)
    const data = await getToken(token);
    // debugger;
    this.studentName = data.name
    // debugger;
    this.studNumber = data.stuNumber
    console.log(data);
    // debugger;
    // console.log(data)
    this.$store.commit("setToken", data);
    this.$store.commit("setRegister", data.register);
    // debugger;
    if (this.$route.query.msg == 1) {
      // debugger;
      this.$store.commit("setShowCouPon", true);
      luckDrawCheck().then((res) => {
        this.BtnShow = false;
        if (res.winningType == 1) {
          this.discountType = "积分";
          this.discountNum = res.receiveValue;
        } else {
          this.discountType = "优惠券";
          this.discountNum = res.receiveValue + "元";
        }
      });
    }else if(sessionStorage.teacherEmpNo != undefined && sessionStorage.teacherEmpNo != "null" && sessionStorage.teacherEmpNo != ""){
      // debugger;
      this.teacherEmpNo = sessionStorage.getItem('teacherEmpNo')
      this.teacherModName = sessionStorage.getItem('teacherName')
      this.swipeStatus = false
      this.teacherModStu = true
    }
    // console.log(this.$route)
    // this.mainData = await activityImage();
    // this.showNote = require(`../../assets/showNote${this.mainData.activityDateImageV.showNoteStatus}.png`);
    // this.reviewNote = require(`../../assets/reviewNote${this.mainData.activityDateImageV.reviewNoteStatus}.png`);
    // this.sunDryingNote = require(`../../assets/sunDryingNote${this.mainData.activityDateImageV.sunDryingNoteStatus}.png`);
    this.getList();
    // this.showFlag = this.mainData.showFlag;
    // if (this.showFlag) {
    //   // this.bannerUrl = this.mainData.bannerImageV.bannerUrl;
    //   // this.bannerJumpUrl = this.mainData.bannerImageV.bannerJumpUrl;
    // }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    that = this;
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {
    // if (this.noFirst) {
    //   this.page = 1;
    //   this.lastTime = "";
    //   this.search = "";
    //   this.getList();
    // }
    console.log(1)
  }, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' src='./index.scss' scoped>
//@import url(); 引入公共css类
</style>