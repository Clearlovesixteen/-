<!--
 * @Descripttion: 
 * @version: 
 * @Author: WJK
 * @Date: 2021-07-07 09:10:23
 * @LastEditors: WJK
 * @LastEditTime: 2021-07-07 18:04:31
-->
<template>
  <div class="changeAccount">
    <img class="changeClose" @click="closeChange"  src="../assets/close.png" alt="" v-show="type != 3" />
    <div class="switch">
      <div class="titleText">
        <span
          @click="type = 1"
          v-show="type != 3"
          class="switchBtn"
          :class="{ changeBtn: type == 1 }"
          >手机号登录</span
        >
        <span
          @click="type = 2"
          v-show="type != 3"
          class="switchBtn"
          :class="{ changeBtn: type == 2 }"
          >学员编号登录</span
        >
        <span
          v-show="type == 3"
          class="switchBtn"
          :class="{ infoBtn: type == 3 }"
          >完善信息</span
        >
      </div>

      <div v-show="type == 1" class="form">
        <input v-model="phone" type="number" placeholder="请输入手机号" />
        <div class="send">
          <input
            v-model="code"
            type="number"
            @input="inputNumber"
            placeholder="请输入验证码"
          />
          <div @click="sendCode">
            <span>{{ sendCodeText }}</span>
          </div>
        </div>
      </div>
      <div v-show="type == 2" class="form">
        <input v-model="username" type="text" placeholder="学员编号" />
        <input v-model="password" type="text" placeholder="请输入密码" />
      </div>
      <div v-show="type == 3" class="form">
        <input v-model="name" type="text" placeholder="请输入学员姓名" />
        <select v-model="grade">
          <option>请选择9月就读年级</option>
          <option v-for="(i, index) in gradeData" :key="index" :value="i.id">
            {{ i.text }}
          </option>
        </select>
        <!-- <input v-model="password" type="text" placeholder="请输入密码" /> -->
      </div>
      <div @click="userLogin" class="btn">
        <span>登录</span>
      </div>
      <!-- <span v-show="type == 1" @click="type = 2" class="switchBtn"
        >使用学员编号登录</span
      >
      <span v-show="type == 2" @click="type = 1" class="switchBtn"
        >使用手机号登录</span
      > -->
    </div>
  </div>
</template>

<script>
import {
  phoneLogin,
  sendPhoneCode,
  stuNumberLogin,
  completeUserInfo,
} from "@/apis/index.js";

import { Toast } from "vant";

export default {
  name: "changeAccount",
  data() {
    return {
      showMain: true,
      showInfo: false,
      phone: "",
      code: "",
      type: 1, //1是手机号，2是学员编号
      sendCodeText: "获取验证码",
      username: "",
      password: "",
      grade: "请选择年级",
      gradeData: [
        { text: "早教", id: "-10" },
        { text: "托班", id: "-9" },
        { text: "小班", id: "-8" },
        { text: "中班", id: "-7" },
        { text: "大班", id: "-6" },
        { text: "一年级", id: "1" },
        { text: "二年级", id: "2" },
        { text: "三年级", id: "3" },
        { text: "四年级", id: "4" },
        { text: "五年级", id: "5" },
        { text: "六年级", id: "6" },
        { text: "七年级", id: "7" },
        { text: "八年级", id: "8" },
        { text: "九年级", id: "9" },
        { text: "高中一年级", id: "10" },
        { text: "高中二年级", id: "11" },
        { text: "高中三年级", id: "12" },
      ],
      name: "",
      puid: "",
    };
  },
  methods: {
    inputNumber() {
      if (this.code.length > 5) this.code = this.code.slice(0, 6);
    },
    sendCode() {
      if (this.sendCodeText != "获取验证码") {
        return;
      }
      const isPhone = function (str) {
        //手机号验证
        var myreg = /^[1][3-9][0-9]{9}$/;
        if (!myreg.test(str)) {
          return false;
        } else {
          return true;
        }
      };
      if (!isPhone(this.phone)) {
        Toast("请输入正确的手机号码！");
        return;
      }
      this.sendCodeText = 30;
      sendPhoneCode({ phone: this.phone }).then((res) => {
        let clearinter = setInterval(() => {
          this.sendCodeText--;
          if (this.sendCodeText < 1) {
            this.sendCodeText = "获取验证码";
            clearInterval(clearinter);
          }
        }, 1000);
      });
    },
    closeChange(){
        console.log(1)
        this.$emit("close")
    },
    async userLogin() {
        
      let stuNumBer = "";
      if (this.type == 1) {
        //使用手机号登录
        if(this.phone == "" || this.code ==""){
            return Toast("输入有误")
        }
        let par = {
          code: this.code,
          phone: this.phone,
          channelCode: localStorage.channelCode,
          unionId: localStorage.union_id,
          openId: localStorage.open_id,
        };
        let stuData = await phoneLogin(par);
        if (stuData.complete == true) {
          //需要完善信息
          this.type = 3;
          this.puid = stuData.puid;
          return;
        }
        stuNumBer = stuData;
      } else if (this.type == 2) {
        //使用账密登陆
        if(this.username == "" || this.password ==""){
            return Toast("输入有误")
        }
        let par = {
          channelCode: localStorage.channelCode,
          username: this.username,
          password: this.password,
          unionId: localStorage.union_id,
          openId: localStorage.open_id,
        };
        stuNumBer = await stuNumberLogin(par);
      } else {
        //完善信息
        if(this.name == "" || this.grade ==""){
            return Toast("输入有误")
        }
        let par = {
          channelCode: localStorage.channelCode,
          gradeId: this.grade,
          name: this.name,
          phone: this.phone,
          puid: this.puid,
          unionId: localStorage.union_id,
          openId: localStorage.open_id,
        };
        stuNumBer = await completeUserInfo(par);
      }
        this.$store.commit("setToken", "");
        window.location.reload()
        this.$emit("close");
        // debugger;
        // this.$route.replace({ path: "/" });
    },
  },
};
</script>


<style lang="scss" scoped>
.changeClose{
    // position: relative;
    position: absolute;
    width: 50px;
    height: 50px;
    // left: 10px;
    top: 15px;
    // left: 0px;
    right: 10px;
    // z-index: 222;
    z-index: 2;
}
// .changeAccount{
//     // width: 100%;
//     // height: 100%;
//     position: absolute;
//     width: 600px;
//     height: 700px;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     margin: auto;
// }
.switch {
  width: 534px;
  //   background-color: #f5f5f5;
  border-radius: 30px;
  padding-top: 38px;
  padding-bottom: 36px;
  position: relative;
  margin-right: 27px;
  left: 13.5px;
  text-align: center;
  > span {
    font-size: 30px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #000000;
    opacity: 0.85;
  }
  .titleText{
      margin-top: 80px;
  }
  .form {
    width: 474px;
    height: 248px;
    margin: 10px 35px;
    background-color: #ffffff;
    box-shadow: 0px 0px 11px 0px rgba(219, 219, 219, 0.54);
    border-radius: 25px;
    box-sizing: border-box;
    padding: 32px 32px 0;
    color: #000000;
    input,
    select {
      height: 90px;
      width: 100%;
      background-color: #ffffff;
      // box-shadow: 0px 0px 11px 0px rgba(219, 219, 219, 0.42);
      background: url("../assets/inputBg.png") center 100%/100% no-repeat;

      // border-radius: 15px;
      font-size: 30px;
      // line-height: 30px;
      border: none;
      padding-left: 30px;
      box-sizing: border-box;
    }
    select::-webkit-select-placeholder {
      color: #8c8c8c;
      font-size: 26px;
    }
    select {
      color: #8c8c8c;
      font-size: 26px;
    }
    .send {
      display: flex;
      align-items: center;
      margin-top: 12px;
      input {
        width: 239px;
        height: 90px;
        background: url("../assets/sendCodeBg.png") center 100%/100% no-repeat;
      }
      > div {
        margin-left: 7px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 163px;
        height: 70px;
        background-color: #feb418;
        box-shadow: 0px 0px 11px 0px rgba(236, 162, 7, 0.42);
        border-radius: 15px;
        span {
          font-size: 24px;
          letter-spacing: 0px;
          color: #ffffff;
        }
      }
    }
  }
  .btn {
    margin: 40px auto 23px;
    width: 354px;
    height: 80px;
    background-color: #0036d3;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      font-size: 36px;

      letter-spacing: 0px;
      color: #ffffff;
    }
  }
  .switchBtn {
    display:inline-block;
    font-size: 30px;
    line-height: 60px;
    letter-spacing: 0px;
    color: #b6b6b6;
    padding: 30px 30px;
    font-weight: 900;
  }
  .changeBtn {
    color: #2157f3 !important;
    // border-bottom: 6px dotted #0036d3;
    background-image: url("../assets/smallBorder.png");
    background-size: 52px 10px;
    background-repeat: no-repeat;
    background-position: 80px 85px;
    // border-width: 5px;
  }
  .infoBtn{
      @extend .changeBtn;
      background-position: 65px 90px;
  }
  .accInfo {
    width: 474px;
    height: 106px;
    background-color: #ffffff;
    box-shadow: 0px 0px 11px 0px rgba(219, 219, 219, 0.54);
    border-radius: 25px;
    display: flex;
    align-items: center;
    margin: 20px auto 0;
    img {
      width: 77px;
      height: 77px;
      background-color: #ffffff;
      box-shadow: 0px 0px 13px 0px rgba(219, 219, 219, 0.31);
      display: block;
      margin-right: 20px;
      margin-left: 12px;
    }
    .center {
      flex: 1;
      font-size: 15px;
      letter-spacing: 0px;
      color: #000000;
      opacity: 0.85;
      display: flex;
      flex-direction: column;
      text-align: left;
    }
    .btn {
      margin-right: 28px;
      width: 108px;
      height: 49px;
      background-color: #ffffff;
      box-shadow: 0px 0px 10px 0px #d8d8d8;
      border-radius: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        width: 100px;
        height: 43px;
        line-height: 43px;
        border-radius: 21px;
        background-color: #f37336;
        display: block;
        font-size: 21px;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
  }
}
</style>