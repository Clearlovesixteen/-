<!--
 * @Descripttion: 
 * @version: 
 * @Author: WJK
 * @Date: 2020-08-14 09:20:30
 * @LastEditors: WJK
 * @LastEditTime: 2021-07-07 16:50:27
-->
<template>
  <div id="app">
    <!-- showImg -->
    <div v-show="showImg" class="start none">
      <img
        @load="loadEnd"
        src="https://xes-public.oss-cn-hangzhou.aliyuncs.com/note/start.png"
      />
      <loading class="loading" />
    </div>
    <!-- <keep-alive> -->
    <router-view v-if="$route.meta.keepAlive" class="main" ></router-view>
    <!-- </keep-alive> -->
    <router-view v-if="!$route.meta.keepAlive" ></router-view>
    <van-popup
      style="background-color: rgba(0, 0, 0, 0)"
      v-model="$store.state.showPop"
    >
      <pop :type="$store.state.popType"></pop>
    </van-popup>
    <van-popup
      :close-on-click-overlay="false"
      style="background-color: rgba(0, 0, 0, 0)"
      v-model="$store.state.activeFocus"
    >
      <img
        @click="setActiveFocus"
        class="close"
        src="./assets/close.png"
        alt
        v-if="$route.name != 'Home'"
      />
      <img class="focus" src="./assets/focus1.png" alt />
    </van-popup>
    <bottomBar v-show="$store.state.barShow">
      <template v-slot:upLoad v-if="$store.state.noteShow">
        <div @click="toNoteShow">
          <img src="../src/assets/noteShow.png" alt="" class="noteShow" />
          <span>笔记秀场</span>
        </div>
      </template>
    </bottomBar>
  </div>
</template>
<script>
import loading from "@/components/loading";
import pop from "@/components/pop";
import bottomBar from "@/components/bottomBar";
import { buryingPoint, cancelOfficialMicro } from "@/apis";

export default {
  data() {
    return {
      showImg: true,
      showBar: true,
    };
  },
  components: { pop, bottomBar, loading },
  methods: {
    loadEnd() {
      setTimeout(() => {
        this.showImg = false;
      }, 1300);
    },
    toNoteShow() {
      this.$router.push({ name: "Home" });
    },
    setActiveFocus() {
      debugger;
      buryingPoint({ idList: [13] });
      cancelOfficialMicro();
      this.$store.commit("setActiveFocus", false);
    },
  },
  computed:{
  },
  created() {
    let that = this
    // window.addEventListener("beforeunload", function (event) {
    //   debugger;
    //   console.log(event) 
    //   console.log(that.$store.state.token)
    // });
  },
  mounted() {
    this.loadEnd();
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html,
body,
#app {
  margin: 0;
  height: 100%;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
// .main {
//   width: 100%;
//   height: calc(100vh - 110px - 85px);
//   // height: 100%;
// }

.van-popup {
  // left: 0 !important;
  // top: 0 !important;
  // transform: none !important;
  .focus {
    width: 591px;
    height: 670px;
  }
}
.start {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #2157f3;
  z-index: 9999;
  img {
    width: 100%;
    height: 100vh;
    // position: relative;
  }
}
.loading {
  position: relative;
  top: -130px;
  left: 166px;
  // z-index: 16;
}
.close {
  width: 60px;
  height: 60px;
  position: relative;
  left: 260px;
}
.noteShow {
  width: 45px !important;
}
</style>
