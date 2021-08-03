<!--
 * @Descripttion: 
 * @version: 
 * @Author: WJK
 * @Date: 2021-06-15 09:32:51
 * @LastEditors: WJK
 * @LastEditTime: 2021-07-08 17:54:50
-->
<template>
  <div id="idModule">
    <div class="studName">
      <span v-show="studNumber != ''">
        当前帐号: {{ studentName }}({{ studNumber }})</span
      >
    </div>
    <div class="handOff" v-show="!$store.state.register">
      <span @click="switchAccounts">切换账号</span>
      <span>|</span>
      <span @click="changeStudent">切换学员</span>
    </div>
    <div class="handOff" v-show="$store.state.register">
      <span @click="goEnroll">注册</span>
    </div>

    <van-popup v-model="show" position="bottom" closeable safe-area-inset-bottom>
      <div class="popUpStudent"><h3>切换学员</h3></div>
      <!-- <div class="studentItem">
        
      </div> -->
      <div class="studentItem" v-for="item in studentList"  :key="item.id">
        <div class="switchStuText">
          <img :src="item.headPic" alt="" />
          <div class="studentInfo">
            <span>{{item.name}}</span>
            <div class="gradeName">{{item.gradeName}}</div>
          </div>
        </div>
        <div class="clickChange" @click="changeSwitch(item)">点击切换</div>
      </div>
    </van-popup>
    <van-popup class="switchPop" v-model = "accountsShow"  :close-on-click-overlay="false">

      <img src="../assets/account.png" alt="">
      <change-account @close="close"/>
    </van-popup>
  </div>
</template>

<script>
import { Popup } from "vant";
import changeAccount from "./changeAccount.vue"
import {switchStuNum , stuNumList} from "@/apis/index"

export default {
  name: "idModule",
  data() {
    return {
      show: false,
      studentList: [],
      accountsShow:false,
      // close2:require('../assets/close.png')
    };
  },
  components: {
    Popup,
    changeAccount
  },
  props: {
    studentName: {
      type: String,
      default() {
        return "未登录";
      },
    },
    studNumber: {
      type: String,
      default() {
        return "";
      },
    },
  },
  methods: {
    // 切换学员
    changeStudent() {
      this.show = true;
      stuNumList().then(res => {
        this.studentList = res
        console.log(this.studentList)
      })
    },
    // 切换账号
    switchAccounts() {
      this.accountsShow = true
    },
    close(){
      console.log(1)
      this.accountsShow = false
    },
    // 切换学员
    changeSwitch(item){
      console.log(item)
      let  switchStuNumP = {
        channelCode : localStorage.channelCode,
        stuNum: item.stuNumber
      }
      switchStuNum(switchStuNumP).then(res =>{
        this.show = false
        // debugger;
        this.$store.commit("setToken", "");
        window.location.reload()
        // this.$router.replace({name : 'Home'})
      })
    },
    goEnroll(){
      this.$router.push({ name: 'enroll' })
    }
  },
};
</script>

<style lang="scss" scoped>
#idModule {
  height: 85px;
  background-color: #0041ff;
  display: flex;
  justify-content: space-between;
  line-height: 85px;
  // margin: 0 35px;
  // font-size: 13px;
  font-stretch: normal;
  color: #ffffff;
  .studName {
    font-size: 20px;
    margin-left: 35px;
    span {
      font-size: 24px;
      margin-left: 5px;
    }
  }
  .handOff {
    margin-right: 35px;
    font-size: 24px;
    span {
      margin: 0 3px;
    }
  }
  .popUpStudent {
    color: #2157f3;
    display: flex;
    padding: 10px 50px;
    align-content: flex-start;
    h3 {
      margin: 0;
      font-size: 40px;
    }
  }
  .studentItem {
    display: flex;
    padding: 10px 50px;
    justify-content: space-between;
    color: #0041ff;
    align-items: center;
    .clickChange {
      width: 148px;
      height: 60px;
      line-height: 60px;
      background-color: #2157f3;
      border-radius: 50px;
      font-size: 24px;
      color: #ffffff;
    }
    .switchStuText{
      display: flex;
      align-items: center;
      line-height: 30px;
      // height: 90px;
      // line-height: 90px;
      .studentInfo{
        text-align: left;
        margin-left: 5px;
      }
      .gradeName{
        color: #000000;
        font-size: 20px;
        // margin-left: 5px;
        margin-top: 5px;
        // color: #eeeeee;
        opacity: 0.4;
      }
      img{
        width: 90px;
        height: 90px;
        border-radius: 50px;
      }
      span{
        // margin-left: 5px;
        font-size: 30px;
        color: #000000;
      }
    }
  }
}
::v-deep .van-dropdown-menu__bar {
  background-color: #0041ff;
}
::v-deep .van-dropdown-menu__title {
  color: #ffffff;
}

.switchPop{
  border-radius: 30px;
  img{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
  }
  // .close{
  //   position: absolute;
  //   width: 40px;
  //   height: 40px;
  //   z-index: 1;
  //   top: 40px;
  //   right: 0px;
  //   // top: -40px;
  // }
}
</style>