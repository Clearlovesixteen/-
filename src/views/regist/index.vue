<!--
 * @Descripttion: 
 * @version: 
 * @Author: WJK
 * @Date: 2020-06-04 16:13:34
 * @LastEditors: WJK
 * @LastEditTime: 2020-08-21 16:45:42
--> 
<!--  -->
<template>
  <div class="main">
    <div class="userInfo">
      <span class="tips">为保证比赛公平公正公开，须实名上传和支持笔记</span>
      <div class="input">
        <span>姓名</span>
        <input @blur="blurIn" v-model="username" type="text" placeholder="请输入孩子姓名" />
      </div>
      <div class="input">
        <span>年级</span>
        <select @change="blurIn" v-model="grade">
          <option :value="0">请选择孩子9月就读年级</option>
          <option v-for="(i,index) in gradeList" :key="index" :value="i.gridCode">{{i.name}}</option>
        </select>
      </div>
      <div class="input">
        <span>电话</span>
        <input @blur="blurIn" v-model="phone" type="number" placeholder="请输入手机号" />
      </div>
      <div class="input">
        <span>验证码</span>
        <input @blur="blurIn" v-model="code" type="number" placeholder="获取验证码" />
        <div class="send" @click="sendCode">{{sendCodeText}}</div>
      </div>
      <img class="submit" @click="sumbit" src="../../assets/submit.png" alt />
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { sendPhoneCode, regAndCom } from "@/apis/index";
import { Toast } from "vant";
import { gradeList } from "./grade";
import MtaH5 from "mta-h5-analysis";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {  },
  props: ["id"],
  data() {
    //这里存放数据
    return {
      username: "",
      grade: 0,
      phone: "",
      code: "",
      gradeList,
      sendCodeText: "获取验证码"
    };
  },
  //计算属性
  computed: {
    info() {
      return this.$store.state.checkInfo;
    }
  },
  //监控data中的数据变化
  watch: {
    code:function(value){
      if(value.length>6)
      this.code=this.code.slice(0,6)
    }
  },
  //方法集合
  methods: {
    sendCode() {
      if (this.sendCodeText != "获取验证码") {
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
      this.disabled = true;
      let time = 60;
      this.sendCodeText = time + "s";
      sendPhoneCode({ phone: this.phone }).then(res => {
        if (!res) {
          //发送验证码失败
          Toast("验证码发送失败！");
          return;
        } else {
          let clearinter = setInterval(() => {
            time--;
            this.sendCodeText = time + "s";
            if (time < 1) {
              this.sendCodeText = "获取验证码";
              clearInterval(clearinter);
            }
          }, 1000);
        }
      });
    },
    blurIn() {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
    },
    sumbit() {
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      if (!this.username || !this.phone || this.grade == 0 || this.code == "") {
        Toast("信息填写错误，请检查！");
        return;
      }
      let par = {
        code: this.code,
        grade: this.grade,
        name: this.username,
        phone: this.phone,
        openId: localStorage.open_id,
        unionId: localStorage.union_id,
      };
      regAndCom(par).then(res=>{
        Toast("注册成功！");
        this.$router.go(-1)
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  async created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    MtaH5.clickStat("regist")
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' src='./index.scss' scoped>
//@import url(); 引入公共css类
</style>