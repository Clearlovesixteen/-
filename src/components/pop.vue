<!--
 * @Descripttion: 
 * @version: 
 * @Author: WJK
 * @Date: 2020-06-05 18:09:56
 * @LastEditors: WJK
 * @LastEditTime: 2021-07-01 14:25:52
--> 
<!--  -->
<template>
  <div class="popView">
    <img v-show="type=='countOverflow'|| type=='reviewNote'" @click="setClose" class="closePop" src="../assets/close.png" alt="">
    <div v-show="type=='reviewNote'" class="popBg">
      <span class="qrText">杭州学而思第二届笔记达人秀</span>
      <span class="qrText">加油环节已结束</span>
      <h3 class="timeText">7月29日19:00</h3>
      <span class="qrText">坐等专业评审团直播点评</span>
      <a href="https://t.1yb.co/ueBs"><img src="../assets/live.png" alt="" class="live" @click="bookingLive"></a>
    </div>
    <div v-show="type=='loction'" class="popBg">
      <span class="qrText">杭州学而思第二届笔记达人秀</span>
      <span class="qrText">仅限浙江省用户哦～</span>
    </div>
    <div v-show="type=='noStart'" class="popBg">
      <span class="qrText">活动开始时间</span>
      <span style="color: #2157f3;" class="qrText">2021年7月5日</span>
      <span class="qrText">敬请期待</span>
    </div>
    <div v-show="type=='countOverflow'" class="popBg">
      <span class="qrText">今日次数已用完，请明天再来吧～</span>
    </div>
    <div v-show="type=='only'" class="popBg">
      <span class="qrText">同一学员编号仅限提交1份笔记作品哦～</span>
      <div @click="toRank" class="lookBtn">查看我的笔记</div>
    </div>
    <!-- <div v-show="type=='only'" class="popBg">
      <span class="qrText">一个用户只能提交1份笔记作品哦～</span>
      <div @click="toRank" class="lookBtn">查看我的笔记</div>
    </div> -->
    <!-- <div v-show="type=='reOpen'" class="popBg">
      <span class="numText">当前所开班级名额已超出</span>
      <span class="numText">请重新选择班级</span>
      <span class="minText">若有名额空出，学而思将第一时间联系您</span>
      
    </div>-->
    <!-- <img v-show="showClose" @click="close" class="close" src="../assets/close.png" alt /> -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import {newStudent , buryingPoint} from "@/apis"

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["type", "showClose", "src" ],
  data() {
    //这里存放数据
    return {};
  },
  //计算属性
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {

    toRank(){
      this.$store.commit('setShowPop',false)
      this.$router.push({name:'my' , params:{number:'me'}})
    },
    setClose(){
      console.log('关闭弹窗');
      this.$store.commit('setShowPop',false)
      debugger;
      if(this.type == 'countOverflow'){
        newStudent().then( () => {
          this.$store.commit('setCourse', true)
        })
      }
    },
    close() {
      this.$emit("close");
    },
    // 预约直播
    bookingLive(){
      buryingPoint({idList:[22]})
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.popView {
  // position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .popBg {
    width: 591px;
    height: 467px;
    // margin-top: 273px;
    background: url("../assets/tipBg.png") center 100%/100% no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding-top: 126px;
    box-sizing: border-box;
  }
  .timeText{
    margin-top: 20px;
    margin-bottom: 5px;
  }
  .qr {
    width: 216px;
    height: 216px;
    margin-top: 99px;
  }
  .loction {
    margin-top: 99px;
    width: 142px;
    height: 168px;
  }
  .lookBtn {
    width: 281px;
    height: 63px;
    background-color: #2157f3;
    margin-top: 65px;
    border-radius: 32px;
    font-size: 38px;
    font-weight: 600;
    font-stretch: normal;
    
    line-height: 63px;
    letter-spacing: 3px;
    color: #ffffff;
  }

  .qrText:first-of-type {
    // margin-top: 36px;
  }
  .qrText {
    font-size: 30px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 50px;
    letter-spacing: 0px;
    color: #44403f;
  }
  .numText:first-of-type {
    margin-top: 132px;
  }
  .numText {
    font-size: 30px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #4e2114;
  }
  .minText {
    margin-top: 56px;
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 1px;
    color: #4e2114;
  }
  .btn {
    // margin-top: 55px;
    width: 363px;
    height: 68px;
    position: absolute;
    bottom: 50px;
  }
  .close {
    width: 52px;
    margin-top: 20px;
  }
}
.closePop {
    width: 60px;
    height: 60px;
    position: relative;
    left: 260px;
    margin-bottom: 20px;
}
.live{
  width: 300px;
  margin-top: 20px;
}
</style>