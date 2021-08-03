<!--
 * @Descripttion: 
 * @version: 
 * @Author: WJK
 * @Date: 2021-06-11 14:28:56
 * @LastEditors: WJK
 * @LastEditTime: 2021-07-01 13:22:37
-->
<template>
  <div class="bottomBar">
    <!-- <img src="../assets/homeTip.png" alt /> -->
    <div class="buttonGroup">
      <div @click="toRank">
        <img src="../assets/rank.png" alt />
        <span class="rankText">排行榜</span>
      </div>
      <slot name = "upLoad">
        <div @click="check" class="upAnimation">
          <img src="../assets/add.png" alt class="subBtn" />
          <img src="../assets/moneyLogo.png" alt class="eventPciture" />
        </div>
      </slot>
      <div @click="toMy" class="">
        <img :src="$store.state.toUserNowt" alt />
        <span :class="{ textColor: $store.state.barColor }">我的笔记</span>
      </div>
    </div>
  </div>
</template>

<script>
import { checkUserInfo  , detailsCheck , buryingPoint} from "@/apis";

export default {
  name: "bottomBar",
  data() {
    return {
      // 导航栏颜色和图片切换
      barColor: false,
    };
  },
  methods: {
    // 去我的笔记按钮
    toMy() {
      // debugger;
      buryingPoint({idList: [21]})
      // debugger;
      // console.log(1)
      // debugger;
      if( !this.$store.state.barColor){
        detailsCheck().then(() => {
        this.barColor = true;
        this.$router.push({ name: "my", params: { number: "me" } });
      })
      }
      
    },
    // 上传笔记按钮
    check() {
      console.log(1);
      // 埋点
      buryingPoint({idList : [2]})
      // 校验
      
      let latitude = this.$store.state.gps.latitude;
      let longitude = this.$store.state.gps.longitude;
      // let latitude = "";
      // let longitude = "";
      // if (
      //   localStorage.open_id === "oZYEKj2syHDnQaTGmrYDNIGk-6Gs" ||
      //   localStorage.open_id === "oZYEKjx05zdkP6edxY9JwZWdI-R8" ||
      //   localStorage.open_id === "oZYEKj4Ee07brIt8JSatL747FJWs"
      // ) {
      //   latitude = 30.272663;
      //   longitude = 120.1634;
      // }
      // // if (!longitude) {
      // //     Toast('暂未检测到您的地址！\n本活动只允许浙江省用户参与')
      // //     return
      // // }
      const par = {
        latitude,
        longitude,
      };
      checkUserInfo(par).then(() => {
        // console.log(res)
        this.$router.push("up");
      });
      // this.$router.push("enroll");
    },
    // 点击排行榜
    toRank() {
      buryingPoint({idList: [19]})
      // this.$store.commit("setToMyPen", true)
      // this.$emit("toRank")
      this.barColor = false;
      this.$router.push({ path: "/rank"});
    },
  },
};
</script>

<style scoped  lang="scss">
.bottomBar {
  position: absolute;
  height: 110px;
  bottom: 0;
  width: 100%;
  box-shadow: 8px 7px 22px 5px rgba(188, 188, 188, 0.28);
  .buttonGroup {
    width: 530px;
    margin: auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 51px;
      }
      span {
        font-size: 22px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #a7a7a7;
        // margin-top: 10px;
      }
      .rankText{
        padding-top: 5px;
      }
    }
    .upAnimation {
      position: absolute;
      left: 0;
      right: 0;
      top: -50px;
      width: 300px;
      margin: 0 auto;
      .subBtn {
        width: 100px;
        animation: bigBottom 1s linear infinite;
      }
      .eventPciture {
        width: 280px;
        margin-top: -25px;
      }
    }
  }
}
.textColor {
  color: #1c4ef7 !important;
}
@keyframes bigBottom {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.8);
  }
}
</style>