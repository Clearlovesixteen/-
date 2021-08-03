<!--
 * @Descripttion: 
 * @version: 
 * @Author: WJK
 * @Date: 2020-08-14 14:00:22
 * @LastEditors: WJK
 * @LastEditTime: 2021-07-02 10:56:14
-->
<!--  -->
<template>
  <div class="main">
    <div class="content">
      <img
        class="rule"
        @click="showRule = true"
        src="../../assets/ruleBtn.png"
        alt
      />
      <div class="upcontent">
        <van-uploader
          v-model="fileList"
          :max-size="8000 * 1024"
          @oversize="onOversize"
          :after-read="afterRead"
          multiple
          :max-count="6"
        >
          <img
            v-show="fileList.length == 0"
            class="upBig"
            src="../../assets/upBig.png"
            alt
          />
          <div
            style="
              width: 26.4vw;
              height: 28.4vw;
              background-color: #ffffff;
              box-shadow: 0px 0.533vw 1.067vw 0px rgba(25, 108, 224, 0.51);
              border-radius: 2.667vw;
              border: solid 0.533vw #2157f3;
              display: flex;
              align-items: center;
              justify-content: center;
            "
            class="upSmall"
            v-show="fileList.length > 0 && fileList.length < 6"
          >
            <img src="../../assets/upSmall.png" alt />
          </div>
        </van-uploader>
      </div>

      <div class="join">
        <img @click="upload" src="../../assets/join.gif" alt />
        <!-- <img src="../../assets/tip.png" alt /> -->
        <img src="../../assets/bottomLogo.png" alt />
      </div>
    </div>
    <van-popup
      :close-on-click-overlay="false"
      v-model="showRule"
      style="background-color: rgba(0, 0, 0, 0)"
    >
      <img
        @click="showRule = false"
        class="close"
        src="../../assets/close.png"
        alt
      />
      <rulePop @onCancel="showRule = false"></rulePop>
    </van-popup>
    <van-popup
      :close-on-click-overlay="false"
      v-model="showFrom"
      style="background-color: rgba(0, 0, 0, 0)"
    >
      <img
        @click="showFrom = false"
        class="close"
        src="../../assets/close.png"
        alt
      />
      <div class="from">
        <div class="input">
          <span>参赛姓名</span>
          <input
            @blur="blurIn"
            v-model="name"
            placeholder="请输入孩子姓名"
            type="text"
          />
        </div>
        <div class="input">
          <span>参赛组别</span>
          <div class="buttonGroup">
            <div :class="{ active: active == 1 }" @click="active = 1">
              小低组
            </div>
            <div :class="{ active: active == 3 }" @click="active = 3">
              小高组
            </div>
            <div :class="{ active: active == 2 }" @click="active = 2">
              初高组
            </div>
          </div>
        </div>
        <div class="input opacity">
          <span>参赛组别</span>
          <div class="buttonGroup">
            <span>一-三年级</span>
            <span>四-六年级</span>
            <span>初一-高三</span>
          </div>
        </div>
         
        <div class="input phone" v-show="oldOrNewStud">
          <van-field
            readonly
            clickable
            label="任课老师"
            :value="teacherValue"
            placeholder="请选择任课老师"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" round position="bottom">
            <van-picker
              show-toolbar
              :columns="columns"
              value-key="teacherName"
              @cancel="showPicker = false"
              @confirm="onConfirm"
            />
          </van-popup>
          <!-- <span>任课老师</span>
          <input
            @blur="blurIn"
            v-model="phone"
            placeholder="选择任课老师"
            type="text"
          /> -->
        </div>
        <div class="submit">
          <div @click="add" class="cilckSub">
            <span>确认提交</span>
          </div>
          <div class="radio">
            <span>笔记一经上传不可修改，您确定要上传该笔记吗？</span>
          </div>
        </div>

        <img class="head" :src="head" alt />
      </div>
    </van-popup>
    <van-popup
      :close-on-click-overlay="false"
      v-model="showSuccess"
      style="background-color: rgba(0, 0, 0, 0)"
    >
      <!-- <img @click="showSuccess=false" class="close" src="../../assets/close.png" alt />
      <rulePop @onCancel="showSuccess=false"></rulePop>-->
      <img class="success" src="../../assets/successBg.png" alt />
    </van-popup>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  uploadImage,
  getToken,
  confirmEntry,
  teacherList,
  buryingPoint,
} from "@/apis";
import { configShare } from "@/apis/getWx";
import { isLogin } from "@/config/islogin";
import { Toast } from "vant";
// import MtaH5 from "mta-h5-analysis";

import rulePop from "@/components/rule";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { rulePop },
  props: [],
  data() {
    //这里存放数据
    return {
      fileList: [
        // { url: 'https://img.yzcdn.cn/vant/leaf.jpg',name:'11' },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      ],
      photos: [],
      showRule: false,
      showFrom: false,
      active: 1,
      showSuccess: false,
      urlList: "",
      head: "",
      name: "",
      // 判断新老生
      oldOrNewStud: true,
      // 选择老师部门
      teacherId: "",
      teacherValue: "",
      showPicker: false,
      columns: [],
    };
  },
  //计算属性
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 老师点击确定按钮
    onConfirm(value) {
      this.teacherId = value.teacherEmpNo;
      this.teacherValue = value.teacherName;
      this.showPicker = false;
    },
    blurIn() {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
    },
    onOversize(file) {
      Toast("文件大小不能超过 8M");
    },
    async upload() {
      // debugger;
      buryingPoint({ idList: [3] });
      if (this.photos.length == 0) {
        Toast("请上传笔记图片");
        return;
      }
      // Toast.loading({
      //   message: "上传中...",
      //   duration: 0, // 持续展示 toast
      //   forbidClick: true,
      //   loadingType: "spinner",
      //   overlay:true,
      // });
      let arr = [];
      for (let index = 0; index < this.fileList.length; index++) {
        let base64Str = await pi(this.fileList[index].content);
        let o = {
          base64Str,
        };
        arr.push(o);
      }
      this.photos = arr.slice(0, 6);
      Toast.loading({
        message: "上传中...",
        duration: 0, // 持续展示 toast
        forbidClick: true,
        loadingType: "spinner",
        overlay:true,
      });
      uploadImage({ contentList: this.photos }).then((res) => {
        this.showFrom = true;
        this.urlList = res.fileUrlList;
        this.head = res.headerImage;
        this.name = res.name;
        if (res.role == 0) {
          teacherList().then((res) => {
            console.log(res)
            this.columns = res;
          });
        } else {
          this.oldOrNewStud = false;
        }
      });
      function pi(base64, bili = 2) {
        return new Promise((resolve, reject) => {
          // console.log("执行缩放程序,缩放比例=" + bili);
          //处理缩放，转格式
          var _img = new Image();
          _img.src = base64;
          _img.onload = function () {
            var _canvas = document.createElement("canvas");
            var w = this.width / bili;
            var h = this.height / bili;
            _canvas.setAttribute("width", w);
            _canvas.setAttribute("height", h);
            _canvas.getContext("2d").drawImage(this, 0, 0, w, h);
            var base64 = _canvas.toDataURL("image/jpeg");
            _canvas.toBlob(function (blob) {
              // console.log(blob.size);

              if (blob.size > 1024 * 1024) {
                suofang(base64, bili);
              } else {
                // callback(blob, base64);
                resolve(base64);
              }
            }, "image/jpeg");
          };
        });
      }
    },
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器

      let o;
      if (file.length > 1) {
        //多选功能的数组
        for (let index = 0; index < file.length; index++) {
          let base64Str = file[index].content;
          o = {
            base64Str,
          };
          this.photos.push(o);
        }
      } else {
        let base64Str = file.content;
        o = {
          base64Str,
        };
        this.photos.push(o);
      }
    },
    add() {
      buryingPoint({ idList: [4] });
      // let latitude = this.$store.state.gps.latitude;
      // let longitude = this.$store.state.gps.longitude;
      // if (
      //   localStorage.open_id === "oZYEKj2syHDnQaTGmrYDNIGk-6Gs" ||
      //   localStorage.open_id === "oZYEKjx05zdkP6edxY9JwZWdI-R8" ||
      //   localStorage.open_id === "oZYEKj4Ee07brIt8JSatL747FJWs"
      // ) {
      //   latitude = 30.272663;
      //   longitude = 120.1634;
      // }
      // if (!longitude) {
      //   Toast("暂未检测到您的地址！\n本活动只允许浙江省用户参与");
      //   return;
      // }
      if (this.name.length < 2 || this.name.length >= 10) {
        Toast("信息填写错误，请检查！");
        return;
      }
      // const isPhone = function (str) {
      //   //手机号验证
      //   var myreg = /^[1][3-9][0-9]{9}$/;
      //   if (!myreg.test(str)) {
      //     return false;
      //   } else {
      //     return true;
      //   }
      // };
      // if (!isPhone(this.phone)) {
      //   Toast("请输入正确的手机号码！");
      //   return;
      // }

      // MtaH5.clickStat(`note${this.active}`);
      let par = {
        group: this.active,
        imageUrls: this.urlList,
        teacherEmpNo: this.teacherId,
        name: this.name,
      };
      Toast.loading({
        message: "加载中...",
        duration: 0, // 持续展示 toast
        forbidClick: true,
        loadingType: "spinner",
      });
      confirmEntry(par).then((data) => {
        //弹出参赛成功弹窗
        this.showSuccess = true;
        this.showFrom = false;
        setTimeout(() => {
          this.$router.push({ name: "my", params: { number: "me" } });
        }, 3000);
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    await configShare();
    await isLogin();
    if (!this.$store.state.token) {
      let token = {
        openId: localStorage.open_id || null,
        unionId: localStorage.union_id || null,
        channelCode: localStorage.getItem("channelCode")
      };
      let data = await getToken(token);
      this.$store.commit("setToken", data);
    }
    // teacherList().then( res => {
    //   this.teacherList = res
    // })
  },
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
<style lang='scss' src='./index.scss' scoped>
//@import url(); 引入公共css类
</style>
