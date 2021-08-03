<!--
 * @Descripttion: 
 * @version: 
 * @Author: WJK
 * @Date: 2021-06-17 15:36:41
 * @LastEditors: WJK
 * @LastEditTime: 2021-07-07 17:11:30
-->
<template>
  <div class="enroll">
    <img class="bgImg" src="../../assets/enrollBg.png" alt />
    <div class="from">
      <div class="input">
        <input
          @blur="blurIn"
          v-model="studName"
          placeholder="请填写学生姓名"
          type="text"
        />
        <input v-model="phone" placeholder="请输入手机号" type="text" />
        <input v-model="code" placeholder="请输入验证码" type="text" />
        <div class="codeBtn" :class="{ yellowBtn: btnStatus }" @click="getCode">
          <span>{{ codeText }}</span>
        </div>
        <div class="selectBtn">
          <van-field
            readonly
            clickable
            :value="value"
            placeholder="请选择9月就读年级"
            @click="change"
            class="input"
            type="textarea"
            :right-icon="icon"
          />
          <van-popup
            v-model="showPicker"
            round
            position="bottom"
            @click-overlay="clickClose"
          >
            <van-picker
              show-toolbar
              :columns="columns"
              @cancel="changeOk"
              @confirm="onConfirm"
            />
          </van-popup>
        </div>
      </div>
      <img
        class="enterJoin"
        @click="add"
        src="../../assets/enterJoin.png"
        alt
      />
      <div @click="ruleActive = !ruleActive" class="radio">
        <img
          src="../../assets/noChange.png"
          alt=""
          v-show="ruleActive"
          class="ruleActive"
        />
        <img
          src="../../assets/change.png"
          alt=""
          v-show="!ruleActive"
          class="ruleActive"
        />
        <a href="https://xesapi.speiyou.cn/h5/help/privacy"> <span>我已阅读并同意个人信息保护政策</span> </a> 
      </div>
      <!-- <img class="head" :src="head" alt /> -->
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { sendPhoneCode, regAndCom  , buryingPoint} from "@/apis/index";

export default {
  name: "enroll",
  data() {
    return {
      // 勾选显示状态
      ruleActive: true,
      // 绑定表单
      studName: "",
      phone: "",
      code: "",
      // 验证码按钮
      btnStatus: false,
      codeText: "获取验证码",
      timer: null,
      // 选择器
      value: "",
      showPicker: false,
      columns: [
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
      gradeID: "",
      icon: require("../../assets/selectBottom.png"),
    };
  },
  props: {},
  watch: {},
  methods: {
    // 确定
    add() {
      buryingPoint({idList:[15]})
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      if (this.ruleActive) {
        Toast("请同意个人信息保护政策");
        return
      }
      if (this.studName.length < 2 || !this.phone) {
        Toast("信息填写错误，请检查！");
        return;
      }
      if(this.code == ""){
        Toast("请输入验证码");
        return
      }
      if (this.value == "") {
        Toast("请选择孩子9月份就读年级");
        return
      }
      // 验证手机号
      const isPhone = function (str) {
        //手机号验证
        var myreg = /^[1][3-9][0-9]{9}$/;
        if (!myreg.test(str)) {
          return false;
        } else {
          return true;
        }
      };
      // debugger;
      if (!isPhone(this.phone)) {
        Toast("请输入正确的手机号码！");
        return;
      }

      let par = {
        code: this.code,
        grade: this.gradeID,
        name: this.studName,
        phone: this.phone,
        openId: localStorage.open_id,
        unionId: localStorage.union_id,
        channelCode: localStorage.getItem("channelCode"),
      };
      regAndCom(par).then(res=>{
        Toast("注册成功！");
        this.$router.go(-1)
      })
      
    },
    blurIn() {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
    },
    // 选择器确定按钮
    onConfirm(value) {
     
      this.value = value.text;
      this.gradeID = value.id;
      this.showPicker = false;
      this.icon = require("../../assets/selectBottom.png");
    },
    // 获取验证码
    getCode() {
      if (this.codeText != "获取验证码") {
        return;
      }
      const isPhone = function(str) {
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
      this.btnStatus = true;
      let i = 60; //倒计时时间
      this.codeText = i + "s"
      sendPhoneCode({ phone: this.phone }).then(res => {
        if (!res) {
          //发送验证码失败
          Toast("验证码发送失败！");
          return;
        } else {
          let clearinter = setInterval(() => {
            i--;
            this.codeText = i + "s";
            if (i < 1) {
              this.codeText = "获取验证码";
              this.btnStatus = false
              clearInterval(clearinter);
            }
          }, 1000);
        }
      });
    },
    // 选择器打开
    change() {
      this.showPicker = true;
      this.icon = require("../../assets/topSelect.png");
    },
    // 选择器取消按钮
    changeOk(value) {
      console.log(value);
      this.showPicker = false;
      this.icon = require("../../assets/selectBottom.png");
    },
    // 点击遮罩层
    clickClose() {
      this.icon = require("../../assets/selectBottom.png");
    },
  },
  mounted(){
    buryingPoint({idList: [14]})
  }
};
</script>


<style scoped  src="./index.scss" lang="scss">
</style>