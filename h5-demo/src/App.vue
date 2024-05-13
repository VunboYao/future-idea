<template>
  <div class="content">
    <van-nav-bar class="x" title="" left-arrow right-text="..." />
    <main>
      <img class="logo" src="./logo.png" alt="">
      <span>廊坊芝麻饼</span>
      <div class="pay-box">
        <div class="inner">
          <div class="money">
            <span class="title">消费金额</span>
            <div class="wrap">
              <span @click="show = true" class="number" v-if="money">{{ money }}</span>
              <span v-else @click="show = true" class="placeholder">请输入消费金额</span>
              <span v-if="show" class="line"></span>元
            </div>
          </div>
          <div class="remark">添加付款备注(最多20字)</div>
        </div>
      </div>

      <div class="tips" v-if="show">
        <span>温馨提示</span>
        <span>1.增强安全意识,勿随意扫码;</span>
        <span>2.仔细识别真伪,核对商户信息,确认二维码安全有效</span>
      </div>
      <template v-if="!show">

        <section v-if="bankActive.length">
          <p class="active" @click="showBankActive = !showBankActive">
            <van-icon style="color: #ee7045" name="cash-back-record" size="20px" />
            <span class="title_bank">贵州银行卡用户营销活动</span>
            <van-icon v-if="showBankActive" name="arrow-down" style="margin-left: auto;" />
            <van-icon v-else name="arrow-up" style="margin-left: auto;" />
          </p>
          <div v-show="showBankActive">
            <div class="bank-active_list" v-for="item in bankActive">
              <span>{{ item.name }}</span>
              <span v-if="item.status !== 'yes'"
                :class="item.status === 'no' ? 'status' : item.status === 'todo' ? 'todo' : 'yes'"
                @click="onStatus(item)">{{
                  item.statusName
                }}</span>
              <van-icon v-if="item.status === 'yes'" name="checked" size="20" style="color: #d4001b;" />
            </div>
          </div>
        </section>

        <section v-if="shopActive.length">
          <p class="active" @click="showShopActive = !showShopActive">
            <van-icon style="color: #ee7045" name="shop-collect" size="20px" />
            <span class="title_bank">商户_廊坊芝麻饼</span>
            <van-icon v-if="showShopActive" name="arrow-down" style="margin-left: auto;" />
            <van-icon v-else name="arrow-up" style="margin-left: auto;" />
          </p>
          <div v-if="showShopActive">
            <div class="bank-active_list" v-for="item in shopActive">
              <span>{{ item.name }}</span>
              <span v-if="item.status !== 'yes'"
                :class="item.status === 'no' ? 'status' : item.status === 'todo' ? 'todo' : 'yes'"
                @click="onStatus2(item)">{{
                  item.statusName
                }}</span>
              <van-icon v-if="item.status === 'yes'" name="checked" size="20" style="color: #d4001b;" />
            </div>
          </div>
        </section>
        <section @click="payActive = 'wx'">
          <p class="active pay">
            <van-icon style="color: #00bc5b;" name="wechat" size="20px" />
            <span class="title_bank">微信支付</span>
            <van-icon v-if="payActive === 'wx'" name="checked" size="20" style="margin-left: auto; color: #d4001b;" />
            <van-icon v-else name="checked" size="20" style="margin-left: auto; color: #bbb;" />
          </p>
        </section>

        <section @click="payActive = 'ys'">
          <p class="active pay">
            <van-icon style="color: #ee6956;" name="weibo" size="20px" />
            <span class="title_bank">云闪付支付</span>
            <van-icon v-if="payActive === 'ys'" name="checked" size="20" style="margin-left: auto; color: #d4001b;" />
            <van-icon v-else name="checked" size="20" style="margin-left: auto; color: #bbb;" />
          </p>
        </section>

        <footer class="safe-area">
          <van-button type="danger" size="large">确认付款</van-button>
        </footer>
      </template>
      <section :style="!cardList.length ? 'padding-bottom: 10px;' : ''">
        <p class="active">
          <img src="./g.png" alt="" class="g">
          <span class="title_bank">贵州银行卡支付</span>
        </p>
        <div class="card-list" v-if="cardList.length">
          <div @click="payActive = 'card'" class="card_list_item van-hairline--top" v-for="(item, index) in cardList">
            <p style="display: flex;align-items: center;"><img src="./g.png" alt="" class="g-18">贵州银行 储蓄卡 ({{ item }})
            </p>
            <van-icon v-if="payActive === 'card'" name="checked" size="20" style="color: #d4001b;" />
            <van-icon v-else name="checked" size="20" style="color: #bbb;" />
          </div>
        </div>
        <p class="add-card" v-if="!cardList.length">
          <span class="add-card_add">
            <van-icon name="plus" /> 添加银行卡
          </span>
          <span class="add-card_active">绑贵州银行卡送立减金</span>
        </p>
      </section>

      <section @click="payActive = 'ali'">
        <p class="active pay">
          <van-icon style="color: #366cf9" name="alipay" size="20px" />
          <span class="title_bank">支付宝支付</span>
          <van-icon v-if="payActive === 'ali'" name="checked" size="20" style="margin-left: auto; color: #d4001b;" />
          <van-icon v-else name="checked" size="20" style="margin-left: auto; color: #bbb;" />
        </p>
      </section>
    </main>

    <van-number-keyboard :transition="false" :maxlength="9" :hide-on-click-outside="false" :show="show" theme="custom"
      extra-key="." close-button-text="完成" @input="onInput" @delete="onDelete" @close="onClose" />


  </div>
</template>

<script setup>
import { showToast } from 'vant';
import { ref } from 'vue'
const money = ref('')

const onInput = (val) => {
  console.log(val, '>>>');
  if (money.value.length >= 10) return
  // 0开头,输入的值只能是小数点
  if (money.value.length === 1 && money.value.startsWith('0') && val !== '.') {
    return
  }
  // 2位小数
  let processZeroStartReg = /^(\d*\.)(.{2,2})/g
  if (processZeroStartReg.test(money.value)) {
    return
  }
  // 0.00过滤
  if (money.value === '0.0' && val === 0) {
    return
  }
  money.value += val
}

const onDelete = (val) => {
  if (!money.value) return
  money.value = money.value.slice(0, money.value.length - 1)
}
const show = ref(true)

const onClose = () => {
  if (!money.value) {
    showToast('请输入消费金额')
    return
  }
  showLoadingToast({
    duration: 3000,
    message: '加载中...',
    forbidClick: true,
  });
  setTimeout(() => {
    show.value = false
  }, 3000);
}

const cardList = ref([])

const payActive = ref('ali')

const bankActive = ref([
  { name: '优惠券', statusName: '领取', status: 'todo' },
  { name: '积分', statusName: '不可用', status: 'no' },
  { name: '满十剪二', statusName: '不可用', status: 'no' },
])

const shopActive = ref([
  { name: '营销活动', statusName: '领取', status: 'todo' },
  { name: '优惠券', statusName: '不可用', status: 'no' },
  { name: '红包', statusName: '不可用', status: 'no' }
])

const showBankActive = ref(!bankActive.value.length)
const showShopActive = ref(!shopActive.value.length)
/* 
底部控制
*/
const userAgent = navigator.userAgent
console.log(userAgent, '>>>>');


const onStatus = (item) => {
  console.log(item, '>>>>');
  if (item.status === 'todo') {
    showToast('领取成功')
    item.status = 'yes'
  }
}
const onStatus2 = (item) => {
  console.log(item, '>>>>');
  if (item.status === 'todo') {
    showToast('领取成功')
    item.status = 'yes'
  }
}
</script>
