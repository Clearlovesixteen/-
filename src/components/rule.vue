<!--
 * @Descripttion: 
 * @version: 
 * @Author: WJK
 * @Date: 2020-08-14 13:05:32
 * @LastEditors: WJK
 * @LastEditTime: 2021-07-01 15:56:45
-->
<!--  -->
<template>
  <div class="rulePop">
    <div class="ruleContent">
      <img src="../assets/ruleImg.png" alt=""  v-show="active == 1">
      <img src="../assets/ruleText.png" alt="" v-show="active == 2">
    </div>
    <img class="enter" @click="closeAll" src="../assets/ruleEnter.png" alt />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { buryingPoint } from "@/apis"

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    value: Boolean,
    active:Number
  },
  data() {
    //这里存放数据
    return {
      show: false,
    };
  },
  //计算属性
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    closeAll() {
      this.$emit("onCancel");
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    buryingPoint({idList: [18]})
  },
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
.rulePop {
  width: 592px;
  height: 847px;
  background: url("../assets/ruleBg.png") center 100%/100% no-repeat;
  padding: 224px 36px 63px+49px+30px;
  box-sizing: border-box;
  .ruleContent {
    height: 100%;
    display: flex;
    flex-direction: column;
    font-size: 22px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 32px;
    letter-spacing: 0px;
    text-align: left;
    color: #44403f;
    word-wrap: break-word;
    overflow: scroll;
    img{
      width: 100%;
    }
  }
  .enter {
    margin-top: 30px;
    width: 281px;
  }
}
.hig{
  color: rgb( 68, 114, 216);
}
</style>