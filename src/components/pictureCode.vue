<!--
 * @Descripttion: 
 * @version: 
 * @Author: WJK
 * @Date: 2021-06-21 17:33:21
 * @LastEditors: WJK
 * @LastEditTime: 2021-07-12 14:36:13
-->
<template>
  <div class="pictureCode">
    <img src="../assets/close.png" alt="" class="close" @click="clickClose" />
    <div class="inputMod">
      <img
        src="../assets/changeIt.png"
        alt=""
        class="changeIt"
        @click="changeList"
      />
      <input
        type="textarea"
        v-model="inputText"
        class="copy-input"
        ref="input2"
      />
      <img src="../assets/copyText.png" alt="" class="copy" @click="copyText" />
    </div>

    <!-- <div class="pic" ref="pic" v-show="picShow">
      <div class="userPic">
        <img :src="userImg" alt="" class="userImg" />
        <div class="userText">
            <span>{{studName}}</span>
            <span>邀您为TA的笔记加加油</span>
        </div>
      </div>
      <img :src="penImg" alt="" class="pentext" crossorigin="anonymous" ref="pentext">
      <img src="../assets/getFriendPic.png" alt="" class="backGroundImg"/>
      <div class="qrcode" ref="qrCodeUrl"></div>
    </div> -->
    <div class="pic">
      <img :src="postersImg" class="posterImg" />
    </div>
    <vue-canvas-poster
      :widthPixels="1000"
      :painting="painting"
      @success="success"
      @fail="fail"
      class="canvasPoster"
    ></vue-canvas-poster>
    <!-- <img :src="realImg" alt="" class="realImg" /> -->
    <img src="../assets/shareText.png" alt="" class="picText" />
  </div>
</template>


<script>
import { Toast } from "vant";
import QRCode from "qrcodejs2";
import { VueCanvasPoster } from "vue-canvas-poster";
import { buryingPoint } from '@/apis'

export default {
  name: "pictureCode",
  data() {
    return {
      inputText: "",
      value: "https://hzfront.hzxueersi.com/noteContext/my",
      picShow: true,
      realImg: "",
      //   轮播列表
      list: [
        "我家宝贝正在参加杭州学而思笔记达人秀，快扫码为我们加油吧！你也可以获电子版思维导图一份哦！",
        "朋友圈的各位朋友们～我家宝贝正在参加杭州学而思笔记达人秀，需要您的加油，谢谢啦！您也可以参加该活动，晒出孩子的优秀，赢取华为手机等大奖！",
        "各位朋友注意啦！能否动动小手为我们加加油～每人每天最多11次！宝贝正在参加杭州学而思笔记达人秀，需要您的支持哦，非常感谢～",
      ],
      listIndex: 0,
      //   图片轮播
      imgindex: 0,
      penImg: "",

      //   第二种方式海报
      postersImg: undefined,
      painting: {},
    };
  },
  components: { VueCanvasPoster },
  props: ["noteFlag", "userImg", "studName", "images"],
  methods: {
    //   更改轮播语
    changeList() {
      buryingPoint({idList: [6]})
        // debugger;
      if (this.imgindex >= this.images.length - 1) {
        this.imgindex = 0;
      } else {
        this.imgindex++;
      }
      if (this.listIndex >= this.list.length - 1) {
        this.listIndex = 0;
      } else {
        this.listIndex++;
      }
      this.inputText = this.list[this.listIndex];
      this.penImg = this.images[this.imgindex];
      Toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
        });
      this.setPainting()
    },
    clickClose() {
      buryingPoint({idList: [8]})
      this.$emit("clickClose");
    },
    copyText() {
      buryingPoint({idList: [7]})
      const textString = this.inputText.toString();
      let input = this.$refs.input2;
      this.selectText(input, 0, textString.length);
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        Toast({
          message:"已复制到粘贴板",
          type:"success",
          duration:0
        });
      }
      input.blur();
    },
    // getQrCode() {
    //   const Basis = (window.screen.width / 100) * 17;
    //   new QRCode(this.$refs.qrCodeUrl, {
    //     text: this.value + "?" + "noteFlag" + this.noteFlag, // 二维码内容
    //     width: Basis,
    //     height: Basis,
    //     // colorDark: "#000000",
    //     // colorLight: "#ffffff",
    //     // correctLevel: QRCode.CorrectLevel.H,
    //   });
    // },
    // ios端的一键复制功能
    selectText(textbox, startIndex, stopIndex) {
      if (textbox.createTextRange) {
        //ie
        const range = textbox.createTextRange();
        range.collapse(true);
        range.moveStart("character", startIndex); //起始光标
        range.moveEnd("character", stopIndex - startIndex); //结束光标
        range.select(); //不兼容苹果
      } else {
        //firefox/chrome
        textbox.setSelectionRange(startIndex, stopIndex);
        textbox.focus();
      }
    },
    setPainting(){
      let channelCode = localStorage.getItem("channelCode")
        this.painting = {
      width: "750px",
      height: "1170px",
      background: "#f4f5f7",
      views: [
        {
          type: "image",
          url: require("../assets/getFriendPic.png"),
          css: {
            width: "750px",
            //   height: "100%",
          },
        },
        {
          type: "qrcode",
          content: this.value + "/" + this.noteFlag + "?" + "channelCode=" + channelCode,
          css: {
            width: "200px",
            height: "200px",
            right: "45px",
            bottom: "65px",
          },
        },
        {
          type: "image",
          url: this.penImg,
          css: {
            width: "435px",
            height: "460px",
            right: "150px",
            bottom: "455px",
          },
        },
        {
          type: "image",
          url: this.userImg,
          css: {
              borderRadius:"50px",
            width: "120px",
            height: "120px",
            left:"60px",
            top:"60px"
          },
        },
        {
          type: "text",
          text: this.studName,
           css: [
                {
                    top: '85px',
                    color:"#ffffff",
                    // textDecoration: 'overline',
                    left: '200px',
                    fontSize: '30px'
                }
            ]
        },
        {
          type: "text",
          text: "邀您为TA的笔记加加油",
          css: [
                {
                    top: '135px',
                    color:"#ffffff",
                    // textDecoration: 'overline',
                    left: '200px',
                    fontSize: '30px'
                }
            ]
        },
      ],
    };
    },
    // setCanvas() {
    //   // this.$refs.pentext.crossOrigin = "*"
    //   //   debugger;
    //   var targetDom = this.$refs.pic;
    //   var width = targetDom.offsetWidth; // 获取(原生）dom 宽度
    //   var height = targetDom.offsetHeight; // 获取(原生）dom 高
    //   var canvas = document.createElement("canvas"); // 创建一个canvas节点
    //   var scale = window.devicePixelRatio; // 定义任意放大倍数 支持小数

    //   canvas.width = width * scale; // 定义canvas 宽度 * 缩放
    //   canvas.height = height * scale; // 定义canvas高度 *缩放
    //   canvas.style.width = width + "px";
    //   canvas.style.height = height - 5 + "px";

    //   html2canvas(targetDom, {
    //     useCORS: true,
    //     scale: scale,
    //     canvas: canvas,
    //     logging: false, // 日志开关
    //     dpi: 300,
    //   }).then((canvas) => {
    //     // const context = canvas.getContext('2d')
    //     // context.mozImageSmoothingEnabled = false
    //     // context.webkitImageSmoothingEnabled = false
    //     // context.msImageSmoothingEnabled = false
    //     // context.imageSmoothingEnabled = false
    //     // const wid = canvas.width
    //     // const hei = canvas.height
    //     // const img = Canvas2Image.convertToJPEG(canvas, wid, hei)
    //     var dataURL = canvas.toDataURL("image/jpeg", 1.0);
    //     // const dataURL = img.getAttribute('src')

    //     /* 如果只是显示,可用以下代码 */
    //     this.picShow = false;
    //     this.realImg = dataURL;
    //   });
    // },
    
    // 第二种生成海报的方式
    success(src) {
      this.postersImg = src;
      Toast.clear()
    },
    fail(err) {},
  },
  created() {
    this.inputText = this.list[this.listIndex];
    this.penImg = this.images[this.imgindex];
    console.log(this.penImg);
  },
  mounted() {
    //   debugger;
    Toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'spinner',
        });
    console.log(this.userImg);
    console.log(this.noteFlag);
    // this.getQrCode();
    // console.log(this);
    // this.setCanvas();
    this.setPainting()
  },
};
</script>

<style scoped lang="scss">
$pix: 3;
.pictureCode {
  width: 100%;
  height: 100%;
  margin-top: 80px;

  .inputMod {
    position: relative;
    margin-bottom: 30px;
    input {
      display: block;
      margin: 0 auto;
      // margin-top: 80px;
      width: 400px;
      height: 100px;
      border-radius: 40px;
      padding: 0 70px;
    }
    img {
      position: absolute;
      width: 100px;
    }
    .changeIt {
      width: 100px;
      height: 100px;
      left: 70px;
      top: 2px;
    }
    .copy {
       width: 100px;
      height: 100px;
      right: 70px;
      top: 2px;
    }
  }
  .close {
    width: 70px;
    height: 70px;
    // top: 50px;
    right: -300px;
    position: relative;
    margin-bottom: 20px;
  }
  .canvasPoster{
      display: none;
      canvas{
          display: none;
      }
  }
  .pic {
    // margin: 0 auto;
    // margin-top: 70px;
    width: 500px;
    
    // height: 800px;
    // background-image: url("../assets/getFriendPic.png");
    // background-size: 100% 100%;
    // background-repeat: no-repeat;
    // background-position: center;
    // position: absolute;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    left: 140px;
    // justify-content: center;
    // align-items: center;
    flex-direction: column;
    
    // top: -3000px;
    // left: 50px;
    // z-index: 1;
    // .backGroundImg {
    //   width: 100%;
    //   height: 100%;
    // }
    .posterImg {
      width: 100%;
      // height: 100%;
    }
    // .pentext {
    //   width: 290px;
    //   height: 315px;
    //   position: absolute;
    //   top: 56px * $pix;
    //   left: 35px * $pix;
    //   z-index: 3;
    // }
    // .qrcode {
    //   position: absolute;
    //   right: 9px * $pix;
    //   bottom: 18px * $pix;
    //   width: 45px * $pix;
    //   height: 45px * $pix;
    //   overflow: hidden;
    //   display: flex;
    //   justify-content: center;
    //   align-items: center;
    // }
    // .userPic {
    //   width: 400px;
    //   position: absolute;
    //   display: flex;
    //   left: 50px;
    //   top: 65px;
    //   img {
    //     width: 60px;
    //     height: 60px;
    //     border-radius: 50px;
    //   }
    //   .userText {
    //     font-size: 24px;
    //     color: #ffffff;
    //     margin-left: 20px;
    //     text-align: left;
    //     span {
    //       display: block;
    //     }
    //   }
    // }
  }
  .picText {
    width: 500px;
    height: 100px;
    margin: 40px 0;
  }
  .realImg {
    width: 520px;
    height: 760px;
    border-radius: 20px;
    -webkit-touch-callout: none;
  }
}
</style>