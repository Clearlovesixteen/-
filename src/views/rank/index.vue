<!--
 * @Descripttion: 
 * @version: 
 * @Author: WJK
 * @Date: 2020-08-14 16:19:05
 * @LastEditors: WJK
 * @LastEditTime: 2021-07-02 18:36:29
-->
<!--  -->
<template>
  <div class="main">
    <img src="../../assets/rankBanner2.png" alt="" style="width: 100%" />
    <img class="rule" @click="showRule = true" :src="ruleImg" alt />
    <!-- <img src="../../assets/rankBanner2.png" class="banner" /> -->
    <div class="listMain">
      <div class="centerMain">
        <div class="buttonGroup">
          <div
            :class="{ active: active == 1 }"
            @click="setActive(1)"
            class="button"
          >
            <img src="../../assets/rankLeft.png" alt />
          </div>
          <div
            :class="{ active: active == 2 }"
            @click="setActive(2)"
            class="button"
          >
            <img src="../../assets/rankRight.png" alt />
          </div>
        </div>
        <div class="content">
          <div v-show="active == 1">
            <div class="three">
              <div class="twoMod">
                <img @click="setAdd(two.noteFlag)" :src="two.headPic" alt />
                <span class="twoText">{{ two.name }}</span>
              </div>
              <div class="oneMod">
                <img @click="setAdd(one.noteFlag)" :src="one.headPic" alt />
                <span class="oneText">{{ one.name }}</span>
              </div>
              <div class="threeMod">
                <img @click="setAdd(three.noteFlag)" :src="three.headPic" alt />
                <span class="threeText">{{ three.name }}</span>
              </div>
            </div>
            <div class="gift">
              <div>
                <div class="number">
                  <img src="../../assets/assist1.png" alt />
                  <span>{{ two.likesNum }}</span>
                </div>
                <div class="tip">可获奖励</div>
              </div>
              <div>
                <div class="number">
                  <img src="../../assets/assist1.png" alt />
                  <span>{{ one.likesNum }}</span>
                </div>
                <div class="tip">可获奖励</div>
              </div>
              <div>
                <div class="number">
                  <img src="../../assets/assist1.png" alt />
                  <span>{{ three.likesNum }}</span>
                </div>
                <div class="tip">可获奖励</div>
              </div>
            </div>
            <div class="list">
              <div
                v-for="(item, index) in rankList"
                :key="item.rank"
                class="li"
              >
                <span class="userId">{{ index + 4 }}</span>
                <!-- <span></span> -->
                <img :src="item.headPic" class="userImg" />
                <span class="userName">{{ item.name }}</span>
                <img
                  src="../../assets/pan.png"
                  alt=""
                  v-if="index < 17"
                  class="giftPic"
                />
                <img
                  src="../../assets/eating.png"
                  alt=""
                  v-if="index >= 17 && index <= 46"
                  class="giftPic"
                />
                <img src="" alt="" v-if="index > 46" class="giftPic" />
                <img src="../../assets/assist.png" class="zanPic" />

                <span class="zanNum">{{ item.likesNum }}</span>
                <img
                  class="eyes"
                  @click="setAdd(item.noteFlag)"
                  src="../../assets/look.png"
                  alt
                />
              </div>
            </div>
          </div>
          <div class="excel" v-show="active == 2">
            <div class="group">
              <div :class="{ activeBtn: activeBtn == 1 }" @click="getGroup(1)">
                小低组
              </div>
              <div :class="{ activeBtn: activeBtn == 3 }" @click="getGroup(3)">
                小高组
              </div>
              <div :class="{ activeBtn: activeBtn == 2 }" @click="getGroup(2)">
                初高组
              </div>
            </div>
            <div class="three">
              <div class="twoMod">
                <img @click="setAdd(two2.noteFlag)" :src="two2.headPic" alt />
                <span class="twoText">{{ two2.name }}</span>
              </div>
              <div class="oneMod">
                <img @click="setAdd(one2.noteFlag)" :src="one2.headPic" alt />
                <span class="oneText">{{ one2.name }}</span>
              </div>
              <div class="threeMod">
                <img
                  @click="setAdd(three2.noteFlag)"
                  :src="three2.headPic"
                  alt
                />
                <span class="threeText">{{ three2.name }}</span>
              </div>
            </div>
            <div class="gift">
              <div>
                <div class="teacher">
                  <img src="../../assets/teacherIcon.png" alt />
                  <span>{{ two2.teacherName }}</span>
                </div>
              </div>
              <div>
                <div class="teacher">
                  <img src="../../assets/teacherIcon.png" alt />
                  <span>{{ one2.teacherName }}</span>
                </div>
              </div>
              <div>
                <div class="teacher">
                  <img src="../../assets/teacherIcon.png" alt />
                  <span>{{ three2.teacherName }}</span>
                </div>
              </div>
            </div>

            <!-- <img class="rankHead" src="../../assets/rankHead.png" alt="" /> -->
            <div class="list">
              <div
                v-for="(item, index) in lentList"
                :key="item.rank"
                class="li"
              >
                <span class="userId">{{ index + 4 }}</span>
                <img :src="item.headPic" class="userImg" />
                <span class="userName">{{ item.name }}</span>
                <div class="teacherMod">
                  <img src="../../assets/teacherIcon.png" alt="" />
                  <span class="teacherName">{{ item.teacherName }}</span>
                </div>
                <div class="popStudent">
                  <img src="../../assets/assist.png" />
                  <span>{{ item.likesNum }}</span>
                </div>

                <img
                  @click="setAdd(item.noteFlag)"
                  src="../../assets/look.png"
                  alt
                  class="eyes"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-show="active == 1" class="Prompt">
          <span>人气榜仅显示前200名哦~</span>
        </div>
      </div>
    </div>
    <!-- my.name && -->
    <div v-show="myMod" class="bottom">
      <div class="li">
        <div class="myRanking">
          <img src="../../assets/myChampion.png" alt="" />
          <!-- <span>{{my.rank}}</span> -->
          <span>{{ my.rank }}</span>
        </div>
        <img :src="my.headPic" class="headerImg" />
        <div class="myInfo">
          <!-- <span>{{ my.name }}</span> -->
          <span>{{ my.name }}</span>
          <div class="goodNum">
            <img src="../../assets/assist2.png" />
            <!-- <span>{{ my.likesNum }}</span> -->
            <span>{{ my.likesNum }}</span>
          </div>
        </div>
      </div>
      <div @click="setAdd(my.noteFlag)" class="my">
        <img src="../../assets/myNote.png" alt />
        <!-- <span>我的笔记</span> -->
      </div>
    </div>
    <!-- <van-popup
      :close-on-click-overlay="false"
      v-model="showAdd"
      style="background-color: rgba(0, 0, 0, 0)"
    >
      <img
        @click="showAdd = false"
        class="close"
        src="../../assets/close.png"
        alt
      />
      <div class="addPop">
        <div class="imgList">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(image, index) in images" :key="index">
              <img v-lazy="image" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="number">
          <div>No.4455</div>
          <div>
            <img src="../../assets/assist.png" alt />
            3322
          </div>
        </div>
        <img src="../../assets/come.png" alt />
      </div>
    </van-popup> -->
    <van-popup
      :close-on-click-overlay="false"
      v-model="showRule"
      style="background-color: rgba(0, 0, 0, 0)"
    >
      <rulePop @onCancel="showRule = false" :active="active"></rulePop>
    </van-popup>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getToken, popularityList, excellentList, buryingPoint } from "@/apis";
import { configShare } from "@/apis/getWx";
import { isLogin } from "@/config/islogin";
import rulePop from "@/components/rule";
import { Toast } from "vant";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { rulePop },
  props: [],
  data() {
    //这里存放数据
    return {
      active: 1,
      // 存储人气榜的名单
      list: {},
      // 人气榜的第一第二第三名
      one: {},
      two: {},
      three: {},
      // 自己
      my: {},
      myMod: true,
      // 优秀版的第一第二第三名
      one2: {},
      two2: {},
      three2: {},
      images: [
        require("../../assets/showNote0.png"),
        require("../../assets/ruleBg.png"),
      ],
      // showAdd: false,
      addValue: "",
      showRule: false,
      activeBtn: 1,
      groupList: [],
      // 规则图片变化
      ruleImg: require("../../assets/ruleBtn.png"),
    };
  },
  //计算属性
  computed: {
    rankList() {
      let list = [];
      if (this.list.listVList && this.list.listVList.length > 3) {
        list = this.list.listVList.slice(3);
      }
      // console.log(list)
      return list;
    },
    lentList() {
      let list = [];
      switch (this.activeBtn) {
        case 1:
          if (
            this.groupList.youngGroupList &&
            this.groupList.youngGroupList.length > 3
          ) {
            // this.one2 = this.list.listVList[0] || {};
            // this.two2 = this.list.listVList[1] || {};
            // this.three2 = this.list.listVList[2] || {};
            list = this.groupList.youngGroupList.slice(3);
          }
          // debugger;

          break;
        case 2:
          if (
            this.groupList.juniorHighGroupList &&
            this.groupList.juniorHighGroupList.length > 3
          ) {
            list = this.groupList.juniorHighGroupList.slice(3);
          }
          break;
        default:
          if (
            this.groupList.smallHighGroupList &&
            this.groupList.smallHighGroupList.length > 3
          ) {
            list = this.groupList.smallHighGroupList.slice(3);
          }
          break;
      }
      return list;
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getGroup(val) {
      this.activeBtn = val;
      if (val == 1) {
        this.one2 = this.groupList.youngGroupList[0] || {};
        this.two2 = this.groupList.youngGroupList[1] || {};
        this.three2 = this.groupList.youngGroupList[2] || {};
      } else if (val == 2) {
        this.one2 = this.groupList.juniorHighGroupList[0] || {};
        this.two2 = this.groupList.juniorHighGroupList[1] || {};
        this.three2 = this.groupList.juniorHighGroupList[2] || {};
      } else {
        this.one2 = this.groupList.smallHighGroupList[0] || {};
        this.two2 = this.groupList.smallHighGroupList[1] || {};
        this.three2 = this.groupList.smallHighGroupList[2] || {};
      }
      // console.log(this.one2, this.two2, this.three2);
    },

    setAdd(val) {
      buryingPoint({ idList: [20] });
      if (val) {
        this.$router.push({ name: "my", params: { number: val } });
      }
      // debugger;

      // this.addValue = val;
      // this.showAdd = true;
    },
    setActive(val) {
      // debugger;
      if (val == 1) {
        this.ruleImg = require("../../assets/ruleBtn.png");
        this.active = val;
        if (this.list.participated) {
          this.myMod = true;
        }
      } else {
        if (this.list.inVoteTime) {
          this.active = val;
          this.ruleImg = require("../../assets/ruleImg2.png");
          this.myMod = false;
          this.one2 = this.groupList.youngGroupList[0] || {};
          this.two2 = this.groupList.youngGroupList[1] || {};
          this.three2 = this.groupList.youngGroupList[2] || {};
        } else {
          Toast("优秀榜将于7月29日笔记直播结束后公布，敬请期待");
        }
      }
      //9.9开启
    },
    // 优秀榜排名

    // getGroupList() {
    //   excellentList().then((res) => {
    //     this.groupList = res;
    //     console.log(this.groupList);
    //   });
    // },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    await configShare();
    await isLogin();
    if (!this.$store.state.token) {
      // if (this.$route.query.channelCode) {
      //   this.$store.commit("setChannelCode", this.$route.query.channelCode);
      // }
      let token = {
        openId: localStorage.open_id || null,
        unionId: localStorage.union_id || null,
        channelCode: localStorage.getItem("channelCode"),
      };
      let data = await getToken(token);
      console.log(data);
      this.$store.commit("setToken", data);
    }
    this.list = await popularityList();
    this.groupList = await excellentList();
    // console.log(this.$store.token)
    // 人气榜的第一第二第三

    this.one = this.list.listVList[0] || {};
    this.two = this.list.listVList[1] || {};
    this.three = this.list.listVList[2] || {};
    // 优秀榜

    // debugger;
    if (this.list.participated) {
      this.my = this.list.detailListV;
    } else {
      this.myMod = false;
    }

    console.log(this.list);
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
