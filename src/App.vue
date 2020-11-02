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
      <img src="./static/prize.png" />
      <div class="receive-btn">
        立即领取
      </div>
      <img class="close" @click="isPop = false" src="./static/close-gg.png" />
    </div>
    <div class="rule-pop" v-show="isPopRule">
      <div class="rule-content">
        【活动奖品】<br />
        此活动为概率中奖，奖品数量有限，祝好运！<br />
        惊喜一：<br />
        惊喜二： <br />
        惊喜三：惊喜好礼 <br />
        【特殊说明】<br />
        在活动中获得道具、奖品后，如退出活动，可能导致道具或奖品丢失，请在获得道具、奖品后及时兑换或领取，避免损失。<br />
        -------------------------------------- <br />
        活动说明<br />
        1.页面中展示的参与次数，为同一用户每天的参与次数；用户依据页面提示参与活动后，有机会获得相应礼品。参与活动用户的设备不同，参与活动的具体操作步骤请以进入活动页面时的实时展示为准。<br />
        2、通过非法途径获得商品的，主办方有权不提供奖品。<br />
        3、实物类奖品将在中奖后的30个工作日内发货，请注意查收；话费、红包等虚拟奖品将在中奖后的72小时内充值进用户填写的账号。敬请认真、准确填写领取账号，因个人原因填写错误，导致充值失败的，将不给予补发。<br />
        4、因不可抗力、技术故障等原因，我们有权相应调整或终止活动，而无需向用户进行赔偿或补偿。<br />
        5、活动期间内，用户存在作弊等违法违规行为的，将被撤销抽奖资格、奖品使用资格，收回已获得的权益。<br />
        6、对活动规则、奖品使用规则、奖品领取等有疑问的，请在工作日9:00-18:00，按照如下方式联系客服：<br />
        客服热线
      </div>
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
const currentCard = ref(1);
const isPop = ref(false);
const turnCardList = ref([]);
const turnCardTextList = ref([]);
const lastCount = ref(9);
const isPopRule = ref(false);
const cardText = ["好运", "健康", "幸运", "暴富"];
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
    });
    return {
      turnCardList,
      turnCardTextList,
      currentCard,
      turnCard,
      isPop,
      closePop,
      lastCount,
      isPopRule
    };
  }
};
function turnCard(index) {
  if (lastCount.value !== 0) {
    turnCardList.value.push(index);
    turnCardTextList.value[index] =
      cardText[parseInt(Math.random() * (3 - 0 + 1) + 0, 10)];
    lastCount.value--;
    setTimeout(() => {
      isPop.value = true;
    }, 800);
  }
}
function closePop() {
  isPop.value = false;
  isPopRule.value = false;
}
</script>
<style lang="scss">
.content {
  background-image: url("static/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  padding-top: 44vw;
  min-height: calc(100% - 44vw);
  .top-tips {
    color: #fff;
    text-align: center;
    font-weight: bold;
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
      height: 34vw;
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
      height: 34vw;
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
</style>
