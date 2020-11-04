<template>
  <div class="content">
    <img src="./static/rule.png" class="rule" @click="isPopRule = true" />
    <div class="top-tips">
      <span>今日剩余次数：{{ lastCount }}</span>
    </div>
    <div class="card-group">
      <div
        v-for="index in 9"
        :key="index"
        class="card"
        :class="{ isTurn: turnCardList.includes(index) }"
      >
        <div
          class="card-forward"
          :class="{
            cardShake: currentCard === index && !turnCardList.includes(index)
          }"
          @click="turnCard(index)"
        ></div>
        <div class="card-back">
          {{ turnCardTextList[index] }}
        </div>
      </div>
    </div>

    <div class="prize-pop" v-show="isPop">
      <img :src="currentAdBus.img" />
      <div class="receive-btn" @click="goToAdBusPage">
        立即领取
      </div>
      <img class="close" @click="isPop = false" src="./static/close-gg.png" />
    </div>
    <div class="rule-pop" v-show="isPopRule">
      <div class="rule-content" v-html="rule"></div>
    </div>
    <div class="footer">
      闽ICP备19014187号-2
    </div>
    <Mask v-show="isPop || isPopRule" @click="closePop" />
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import Mask from "./components/mask";
import { getGameRules, qryAdDetail, qryAdExposure, qryAdClick } from "./api";
const currentCard = ref(1);
const isPop = ref(false);
const turnCardList = ref([]);
const turnCardTextList = ref([]);
const lastCount = ref(9);
const isPopRule = ref(false);
const cardText = ["好运", "健康", "幸运", "暴富"];
let rule = ref();
let adBusUrlList = [];
let currentAdBus = ref({
  img: "",
  url: ""
});
export default {
  name: "App",
  components: {
    Mask
  },
  setup() {
    onMounted(() => {
      setInterval(() => {
        currentCard.value++;
        if (currentCard.value === 10) {
          currentCard.value = 1;
        }
      }, 800);
      const adress = window.location.href;
      let adId = "";
      if (window.location.search.split("=").length > 1) {
        adId = window.location.search.split("=")[1];
      }
      /* window.location.pathname.split("/")[
        window.location.pathname.split("/").length - 1
      ]; */
      getGameRules(adress).then(res => {
        console.log(res);
        rule.value = res.data?.data?.ruleOfActivity || `无`;
        rule.value = rule.value.replace(/[\r\n]/g, "<br />");
      });
      qryAdDetail(adId).then(res => {
        adBusUrlList = res?.data?.restsData || [];
        console.log(adBusUrlList);
      });
    });
    return {
      turnCardList,
      turnCardTextList,
      currentCard,
      turnCard,
      isPop,
      closePop,
      lastCount,
      isPopRule,
      rule,
      goToAdBusPage,
      currentAdBus
    };
  }
};
function turnCard(index) {
  if (lastCount.value !== 0) {
    turnCardList.value.push(index);
    turnCardTextList.value[index] =
      cardText[parseInt(Math.random() * (3 - 0 + 1) + 0, 10)];
    lastCount.value--;
    if (adBusUrlList.length > 0) {
      const randomBusItem =
        adBusUrlList[
          parseInt(Math.random() * (adBusUrlList.length - 1 - 0 + 1) + 0, 10)
        ];
      currentAdBus.value = {
        id: randomBusItem.businessId,
        url: randomBusItem.landingPage,
        img: randomBusItem.displayMaterial
      };
      qryAdExposure(randomBusItem.businessId).then(res => {
        console.log(res);
      });
    }
    setTimeout(() => {
      isPop.value = true;
    }, 800);
  }
}
function closePop() {
  isPop.value = false;
  isPopRule.value = false;
}
function goToAdBusPage() {
  if (adBusUrlList.length > 0) {
    qryAdClick(currentAdBus.value.id).then(res => {
      console.log(res);
      window.location.href = currentAdBus.value.url;
    });
  } else {
    alert("未配置落地页");
  }
}
</script>
<style lang="scss">
.content {
  background-image: url("static/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  padding-top: 43vw;
  min-height: calc(100% - 43vw);
  position: relative;
  .top-tips {
    color: #fff;
    text-align: center;
    font-weight: bold;
    font-size: 4vw;
  }
  .rule {
    width: 14.4vw;
    height: 6vw;
    position: absolute;
    left: 1.2vh;
    top: 1.2vh;
  }
  .footer {
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 0.6;
    height: 6vw;
    width: 90vw;
    position: absolute;
    bottom: 4vw;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 4vw;
    text-align: center;
    line-height: 6vw;
    color: #fff;
    font-size: 2vw;
  }
}
.card-group {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .card {
    position: relative;
    .card-forward {
      width: 23vw;
      height: 30vw;
      margin: 4vw;
      background-image: url("static/card.png");
      background-repeat: no-repeat;
      background-size: 100% auto;
      backface-visibility: hidden;
      transition: all 1s;
      &.cardShake {
        -webkit-animation: cardShake 0.6s linear 0.2s 2;
        animation: cardShake 0.6s linear 0.2s 2;
      }
    }
    .card-back {
      transition: all 1s;
      width: 23vw;
      height: 30vw;
      margin: 4vw;
      backface-visibility: hidden;
      background-image: url("static/cardBack.png");
      background-repeat: no-repeat;
      background-size: 100% auto;
      transform: rotateY(180deg);
      position: absolute;
      top: 0;
      left: 0;
      text-align: center;
      line-height: 18vw;
      font-weight: 500;
      color: #cb1413;
      font-size: 5vw;
    }
    &.isTurn {
      .card-forward {
        transform: rotateY(-180deg);
      }
      .card-back {
        transform: none;
      }
    }
  }
}
.prize-pop {
  width: 100%;
  height: 50vh;
  z-index: 1000;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  img {
    width: 80%;
    top: 20vh;
    margin: auto;
    display: block;
  }
  .receive-btn {
    width: 24vw;
    height: 8vw;
    background-color: #ffaa00;
    margin: auto;
    border-radius: 1vw;
    color: #fff;
    text-align: center;
    line-height: 8vw;
    font-size: 4vw;
  }
  .close {
    width: auto;
    height: 8vw;
    margin: auto;
    margin-top: 4vw;
    color: #fff;
    text-align: center;
  }
}
.rule-pop {
  width: 80vw;
  height: 100vw;
  z-index: 1000;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url("static/ruleBg.png");
  .rule-content {
    font-size: 2.5vw;
    padding: 0 4vw;
    margin-top: 20vw;
    height: 73vw;
    overflow: auto;
  }
}
@keyframes cardShake {
  14.3% {
    -webkit-transform: rotate(15deg) scale(1.1);
    transform: rotate(15deg) scale(1.1);
  }
  28.6% {
    -webkit-transform: rotate(-15deg) scale(1.1);
    transform: rotate(-15deg) scale(1.1);
  }
  38.12% {
    -webkit-transform: rotate(0) scale(1);
    transform: rotate(0) scale(1);
  }
}

@media screen and (min-width: 700px) {
  .content {
    min-height: 110%;
  }
}
</style>
