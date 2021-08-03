<!--
 * @Descripttion: 
 * @version: 
 * @Author: WJK
 * @Date: 2021-06-10 16:37:35
 * @LastEditors: WJK
 * @LastEditTime: 2021-06-27 12:22:45
-->
<template>
  <div id="loading">
    <div class="radiusBar">
      <div class="bot"></div>
    </div>

    <h3 class="loadingText">Loading......</h3>
    <!-- <div>loading</div> -->
  </div>
</template>

<script>
export default {
  name: "loading",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
#loading {
  width: 425px;
  text-align: center;
  .radiusBar {
    // display: flex;
    height: 43px;
    background-color: white;
    border-radius: 21px;
    // justify-content: center;
    // align-items: center;
    .bot {
      width: 403px;
      height: 27px;
      background-color: #0a03fd;
      border-radius: 13px;
      // margin: 0 auto;
      position: relative;
      top: 7px;
      left: 12px;
      animation: turnOnLoading 1s linear;
      -webkit-animation: turnOnLoading 1s linear;
      -moz-animation: turnOnLoading 1s linear;
    }
  }

  h3 {
    // font-family: FZLANTY_ZHUNJW--GB1-0;
    font-size: 27px;
    font-weight: bold;
    font-stretch: normal;
    line-height: 36px;
    letter-spacing: 0px;
    color: #ffffff;
  }
}

@keyframes turnOnLoading {
  0% {
    width: 0;
  }
  25% {
    width: 25%;
  }
  50% {
    width: 50%;
  }
  100% {
    width: 100%;
  }
}
</style>