<!--
 * @Descripttion: 
 * @version: 
 * @Author: WJK
 * @Date: 2020-08-14 15:32:28
 * @LastEditors: WJK
 * @LastEditTime: 2021-07-02 10:57:55
-->
<!--  -->
<template>
    <div class="myMain">
        <img src="../../assets/myBg.png" alt="" class="myMainBg">
        <div class="content">
            <van-image-preview
                v-model="showImg"
                :start-position="startPosition"
                :images="images"
            ></van-image-preview>
            <img
                class="rule"
                @click="showRule = true"
                src="../../assets/ruleBtn.png"
                alt
            >
            <div class="user">
                <div class="head">
                    <img :src="mainData.headPic" alt>
                </div>
                <div class="info">
                    <div class="name">
                        <span>{{ mainData.name }}</span>
                        <span>{{ mainData.stuNumber }}</span>
                    </div>
                    <div class="score" v-show="scoreShow">
                        <img :src="pic" alt=""><span>{{
                            mainData.scoreCouponValue
                        }}</span> <span v-show="this.mainData.winningType == 2">元</span>
                    </div>
                    <!-- <div class="score">
              <img src="../../assets/pointsImg.png" alt="">
              <span>{{mainData.name}}</span>
            </div> -->
                    <!-- <span>积分：500</span> -->
                    <!-- <span class="ok" @click="collect" v-show="mainData.approved==1&&mainData.receivedIntegral==0">领取积分</span>
            <span v-show="mainData.approved==2">待审核</span>
            <span v-show="mainData.approved==0">审核未通过</span>
            <span v-show="mainData.receivedIntegral==1">已到账</span>
            <span v-show="mainData.receivedIntegral==2">到账失败</span> -->
                    <div class="code">
                        <div>No.{{ mainData.serialNum }}</div>
                        <div>{{ mainData.groupName }}</div>
                        <div v-show="mainData.teacherName">
                            {{ mainData.teacherName }}老师
                        </div>
                    </div>
                </div>
            </div>
            <div class="imgList">
                <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#2157f3">
                    <van-swipe-item
                        @click="open(index)"
                        v-for="(image, index) in imageList"
                        :key="index"
                    >
                        <img v-lazy="image">
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div v-show="audit">
                <div class="ranking">
                    <div>
                        <img src="../../assets/ranking1.png" alt="" class="popularityIcon">
                        <h3 class="rankName">
                            人气榜
                        </h3>
                        <h3 class="rankdot">
                            :
                        </h3>
                        <span>{{ mainData.rank }}</span>
                    </div>
                    <div>
                        <img src="../../assets/ranking2.png" alt="">
                        <h3 class="rankName">
                            人气值
                        </h3>
                        <h3 class="rankdot">
                            :
                        </h3>
                        <span>{{ mainData.likesNum }}</span>
                        <h3
                            id="addRank"
                            :class="{ addRankAni: addNum }"
                            @animationend="animationend2"
                        >
                            +1
                        </h3>
                    </div>
                </div>
                <!-- 进度条 -->
                <div class="progressMod" v-show=" mainData.needLikes != 0 && mainData.rank <= 200">
                    <div class="progress">
                        <van-progress :percentage="percentage" stroke-width="12" pivot-text="" />
                    </div>
                </div>
                <div class="progressText" v-show="mainData.needLikes != 0 && mainData.rank <= 200">
                    <h3>
                        还差<span>{{ mainData.needLikes }}</span>个加油就可以拿到{{
                            mainData.prizeName
                        }}
                        <!-- <img :src="giftSrc" alt="" class="giftImg"/> -->
                    </h3>
                </div>

                <div class="buttonGroup">
                    <div id="giveFight" @click="fightClick">
                        <!-- <img src="../../assets/orange.png" alt="" class="bgImage"> -->
                        <h3>{{ refuelingText }}</h3>
                        <span>每日可加油{{ mainData.availableUseLikes }}次</span>
                        <img src="../../assets/clickHand.gif" alt="" class="clickhand2" v-show="giveFightShow">
                        <!-- <img
              src="../../assets/zan.png"
              id="addOne"
              :class="{ aniAddOne: clickAni }"
              @animationend="animationend"
              alt=""
              ref="zanAnimtioned"
            /> -->
                    </div>
                    <div class="share" @click="toShare">
                        <!-- <img src="../../assets/blue.png" alt="" class="bgImage2"> -->
                        <h3>立即分享</h3>
                        <!-- <img src="../../assets/getfriend1.png" alt="" class="getfriend"> -->
                        <img :src="sharePic" alt="" class="getfriend">
                        <img src="../../assets/clickHand.gif" alt="" class="clickhand" v-show="shareImgShow">
                    </div>
                    <!-- <img @click="clickLikes" src="../../assets/come.png" alt />
        <img @click="showShare = true" src="../../assets/share.png" alt /> -->
                </div>
            </div>
            <!-- 人气榜 -->
        </div>
        <van-popup
            class="shareBg"
            v-model="showShare"
            style="background-color: rgba(0, 0, 0, 0)"
        >
            <picture-code
                @clickClose="clickClose"
                :note-flag="noteFlag"
                :user-img="userImg"
                :stud-name="studName"
                :images="images"
            />
        </van-popup>
        <van-popup
            :close-on-click-overlay="false"
            v-model="showRule"
            style="background-color: rgba(0, 0, 0, 0)"
        >
            <rulePop @onCancel="showRule = false" :active="1"></rulePop>
        </van-popup>

        <van-popup
            :close-on-click-overlay="false"
            v-model="$store.state.course"
            style="background-color: rgba(0, 0, 0, 0)"
        >
            <img @click="setCourse" class="close" src="../../assets/close.png" alt>
            <img src="../../assets/course.png" alt="" class="courseImg">
            <a href="https://apzlm.speiyou.com/activityconf/UwasTkvcSS6bHxbAhQocYA_1_2_p.html?id=UwasTkvcSS6bHxbAhQocYA"><img
                src="../../assets/clickEnlists.png"
                alt=""
                class="clickEnlists"
                @click="clickEnlists"
            ></a>
      
            <!-- <img class="focus" src="../../assets/focus1.png" alt /> -->
        </van-popup>
        <van-popup
            :close-on-click-overlay="false"
            v-model="sharetimes"
            style="background-color: rgba(0, 0, 0, 0)"
            class="shareSuccess"
        >
            <img src="../../assets/shareSuccess.png" alt="" class="shareImg">
            <h2>加油次数+{{ shareNum }}</h2>
            <!-- <img class="focus" src="../../assets/focus1.png" alt /> -->
        </van-popup>
    </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import {
    details,
    getToken,
    likes,
    collectIntegral,
    clickLikes,
    buryingPoint,
    firstShare
} from '@/apis'
import { configShare } from '@/apis/getWx'
import { isLogin } from '@/config/islogin'
import rulePop from '@/components/rule'
import { Toast } from 'vant'
import pop from '@/components/pop'
import pictureCode from '@/components/pictureCode'
export default {
    // import引入的组件需要注入到对象中才能使用
    components: { pop, rulePop, pictureCode },
    props: ['number'],
    data() {
    // 这里存放数据
        return {
            imageList: [],
            images: [
                // require("../../assets/showNote0.png"),
                // require("../../assets/ruleBg.png"),
            ],
            showShare: false,
            showRule: false,
            mainData: {},
            showImg: false,
            startPosition: 0,
            // 优惠券或者积分值的图片
            scoreShow: true,
            pic: require('../../assets/scoreImg.png'),
            // 加油文字
            refuelingText: '为TA加油',
            giveFightShow: true,
            // 分享按钮的底下图片
            sharePic: require('../../assets/getfriend2.png'),
            shareImgShow: true,
            // 审核通过与不通过的显示
            audit: true,
            // 用户标记
            noteFlag: '',
            // 进度条
            percentage: 0,
            // 用户头像
            userImg: '',
            // 学生姓名
            studName: '',
            // 动画按钮
            // clickAni: false,
            addNum: false,
            // 礼物src
            giftSrc: '',
            // 分享次数弹窗
            sharetimes: false,
            shareNum: ''
        }
    },
    // 计算属性
    computed: {},
    // 监控data中的数据变化
    watch: {
        mainData(val) {
            if (val.completePercent) {
                this.percentage = val.completePercent
            }
            this.images = val.imageList
            this.noteFlag = val.noteFlag
            this.userImg = val.headPic
            this.studName = val.name
            // console.log(val)
            // 加油文字判断
            if (val.isOneSelf) {
                this.refuelingText = '为自己加油'
                this.shareImgShow = true 
                this.giveFightShow = false
            } else {
                this.refuelingText = '为TA加油'
                this.giveFightShow =  true
                this.shareImgShow = false
            }
            if (val.prizeLevel == 1) {
                this.giftSrc = require('../../assets/huaweiPhone.png')
            } else if (val.prizeLevel == 2) {
                this.giftSrc = require('../../assets/printerImg.png')
            } else if (val.prizeLevel == 3) {
                this.giftSrc = require('../../assets/riceCooker.png')
            } else if (val.prizeLevel == 4) {
                this.giftSrc = require('../../assets/snacks.png')
            }
            // 分享下面的图片判断
            if (val.shared) {
                this.sharePic = require('../../assets/getfriend1.png')
            } else {
                this.sharePic = require('../../assets/getfriend2.png')
            }
            // debugger
            if (val.approved == 0) {
                this.audit = false
                this.scoreShow = false
            } else if (!val.showScore || !val.isOneSelf) {
                this.scoreShow = false
            } else if (val.winningType == 1) {
                this.pic = require('../../assets/pointsImg.png')
            } else {
                this.pic = require('../../assets/scoreImg.png')
            }
        }
    },
    // 方法集合
    methods: {
    // 监听关闭分享点击
        clickClose() {
            // debugger;
            this.showShare = false
            firstShare().then(res => {
                console.log(res)
                this.sharetimes = true
                this.shareNum = res
                this.mainData.availableUseLikes += this.shareNum
                setTimeout(() => {
                    // this.$router.go(0)
                    this.sharetimes = false
                }, 2000)
            })
        },
        open(index) {
            this.showImg = true
            this.startPosition = index
        },
        setCourse() {
            this.$store.commit('setCourse', false)
        },
        // clickLikes() {
        //   let latitude = this.$store.state.gps.latitude;
        //   let longitude = this.$store.state.gps.longitude;
        //   // if (
        //   //   localStorage.open_id === "oZYEKj2syHDnQaTGmrYDNIGk-6Gs" ||
        //   //   localStorage.open_id === "oZYEKjx05zdkP6edxY9JwZWdI-R8" ||
        //   //   localStorage.open_id === "oZYEKj4Ee07brIt8JSatL747FJWs"
        //   // ) {
        //   //   latitude = 30.272663;
        //   //   longitude = 120.1634;
        //   // }
        //   // if (!longitude) {
        //   //   Toast("暂未检测到您的地址！\n本活动只允许浙江省用户参与");
        //   //   return;
        //   // }
        //   let par = {
        //     latitude,
        //     longitude,
        //     userFlag: this.mainData.userFlag,
        //   };
        //   Toast.loading({
        //     message: "加载中...",
        //     duration: 0, // 持续展示 toast
        //     forbidClick: true,
        //     loadingType: "spinner",
        //   });
        //   likes(par).then((data) => {
        //     this.mainData.likesNum = data.likesNum;
        //     this.mainData.rank = data.rank;
        //   });
        // },
        // 点击加油
        fightClick() {
            // debugger;
            const noteFlag = this.mainData.noteFlag
            if (this.refuelingText == '为自己加油') {
                buryingPoint({ idList: [9] })
            } else {
                buryingPoint({ idList: [12] })
            }
            likes({ noteFlag: noteFlag }).then(res => {
                Object.assign(this.mainData, res)
                // console.log()
                // this.mainData = details({ noteFlag:noteFlag });
                // this.mainData.likesNum++;
                // this.mainData.availableUseLikes--;
                // console.log(this.mainData)
                this.addNum = true
                const praiseBubble = document.getElementById('giveFight')
                const last = 0
                const b = Math.floor(Math.random() * 6) + 1
                const bl = Math.floor(Math.random() * 11) + 1 // bl1~bl11
                const d = document.createElement('div')
                d.className = `bubble b${b} bl${bl}`
                praiseBubble.appendChild(d)
                d.addEventListener('animationEnd', this.animationend(praiseBubble, d))
            })

            // 动画
            // debugger;
        },
        toShare() {
            if (this.refuelingText == '为自己加油') {
                buryingPoint({ idList: [5] })
            } else {
                buryingPoint({ idList: [11] })
            }
            this.showShare = true
        },
        // 报课
        clickEnlists() {
            buryingPoint({ idList: [16] })
        },
        // 捕捉动画的结束
        animationend(parent, e) {
            // setTimeout(() => {
            //   parent.removeChild(e);
            // }, 4000);
            // this.clickAni = false;
        },
        animationend2() {
            this.addNum = false
        },
        // 图片判断问题
        imgTransfrom(list) {
            const imgList = []
            list.forEach(res => {
                const img = new Image()
                img.src = res
                if (img.width > img.height) {
                    img.style.transform = 'rotate(' + 90 + 'deg)'
                }
                imgList.push(img)
            })
            return imgList
        }
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    async created() {
    // console.log(this.number)
        await isLogin()
        // debugger;
        if (!this.$store.state.token) {
            // if (this.$route.query.channelCode) {
            //   this.$store.commit("setChannelCode", this.$route.query.channelCode);
            // }
            const token = {
                openId: localStorage.open_id || null,
                unionId: localStorage.union_id || null,
                channelCode: localStorage.getItem('channelCode')
            }
            if (!localStorage.open_id) {
                return
            }
            const data = await getToken(token)
            this.$store.commit('setToken', data)
        }
        // debugger;
        const noteFlag = this.number == 'me' ? '' : this.number
        console.log(this.noteFlag)
        this.mainData = await details({ noteFlag })
        this.imageList = this.imgTransfrom(this.mainData.imageList)
        console.log(this.mainData)
        await configShare(this.mainData.noteFlag)
    },
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeCreate() {}, // 生命周期 - 创建之前
    beforeMount() {}, // 生命周期 - 挂载之前
    beforeUpdate() {}, // 生命周期 - 更新之前
    updated() {}, // 生命周期 - 更新之后
    beforeDestroy() {}, // 生命周期 - 销毁之前
    destroyed() {}, // 生命周期 - 销毁完成
    activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' src='./index.scss' >
// @import url("./animiation.scss");
//@import url(); 引入公共css类
// .bubble {
//     // position: absolute;
//     width: 10px;
//     height: 10px;
//     left: 50%;
//     bottom: 0;
//     background: url('../../assets/zan.png');
//     background-size: 5px;
// }
</style>