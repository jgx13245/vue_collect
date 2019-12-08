<template>
  <section class="delivery-info">
    <div class="delivery-info__item" @click="selectAddress">
      <span>{{currentAddress}}</span>
      <span class="icon icon-coupon-back"></span>
    </div>
    <div class="delivery-info__item" @click="showTimePicker">
      <span>{{currentDeliveryTime}}</span>
      <span class="icon icon-coupon-back"></span>
    </div>
    <a class="delivery-info__btn" href="javascript:;" role="button" @click="confirm">确认提交</a>
    <mt-popup class="create-picker" v-model="pickerVisible" position="bottom">
      <mt-picker :slots="pickerSlots" @change="onDateChange" :show-toolbar="true">
        <button @click.stop="handleCancel" class="cancel">取消</button>
        <button @click.stop="handleConfirm" class="sure">确认</button>
      </mt-picker>
    </mt-popup>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Picker, Popup } from 'mint-ui'
import { fetchDeliveryTime, updateDeliveryInfo } from '../assets/js/api.js'

export default {
  data() {
    return {
      date: null,
      pickerVisible: false,
      dateSlots: [],
      deliveryTimeList: [],
      pickerSlots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        }
      ]
    }
  },
  watch: {
    pickerVisible: {
      handler(newValue) {
        if (newValue) {
          document.querySelector('body').className = 'fix-body'
        } else {
          document.querySelector('body').className = ''
        }
      },
      immediate: true
    }
  },
  components:{
    [Picker.name] : Picker,
    [Popup.name]: Popup
  },
  created() {
    fetchDeliveryTime().then(({data}) => {
      this.deliveryTimeList = data
      const { time } = data[0]
      const days = data.map(item => item.day)
      this.pickerSlots[0].values = days
      this.pickerSlots[2].values = time
    })
  },
  computed: {
    ...mapState({
      id: state => state.couponId,
      addressId(state) {
        return state.currentAddress.addressId
      },
      userId (state) {
        return state.userId
      },
      marketId (state) {
        return state.marketId
      },
      currentAddress(state) {
        if (!state.currentAddress.addressId) {
          return '选择收货地址'
        }
        const { name, address, doorNumber } = state.currentAddress
        return `${name} ${address}${doorNumber}`
      },
      currentDeliveryTime (state) {
        if (state.currentDeliveryTime.length === 0) {
          return '选择配送时间'
        }
        return state.currentDeliveryTime.join(' ')
      },
      delivery(state) {
        if (state.currentDeliveryTime.length === 0) {
          return null
        }
        return state.currentDeliveryTime.join(',')
      }
    })
  },
  methods: {
    ...mapMutations({
      updateCurrentDeliveryTime: 'updateCurrentDeliveryTime',
      resetDeliveryInfo: 'resetDeliveryInfo'
    }),
    handleCancel() {
      this.pickerVisible = false
    },
    showTimePicker() {
      this.pickerVisible = true
    },
    selectAddress() {
      this.$router.push({
        path: '/address'
      })
    },
    confirm() {
      if (!this.addressId) {
        return this.$toast('请选择收货地址')
      }
      if (!this.delivery) {
        return this.$toast('请选择配送时间')
      }
      this.$loading.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      const options = {
        marketId: this.marketId,
        userId: this.userId,
        addressId: this.addressId,
        delivery: this.delivery,
      }
      if (this.id) {
        options['id'] = this.id
      }
      updateDeliveryInfo(options).then(({ data }) => {
        this.$loading.close()
        const { code, message } = data
        if (code === 200) {
          this.resetDeliveryInfo()
          this.$router.replace({
            path: '/coupon',
            query: {
              index: 1
            }
          })
        } else {
          this.$toast(message)
        }
      }).catch(() => {
        this.$loading.close()
      })
    },
    onDateChange(picker, values) {
      if (this.deliveryTimeList.length !== 0) {
        this.selectedTime = values
        const index = this.pickerSlots[0].values.indexOf(values[0])
        this.pickerSlots[2].values = this.deliveryTimeList[index].time
      }
    },
    handleConfirm() {
      this.updateCurrentDeliveryTime(this.selectedTime)
      this.pickerVisible = false
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/sprite.scss';
.delivery-info {
  width: 100%;
  min-height: 100vh;
  background: #FFF;
}

.delivery-info__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 25px;
  border-bottom: 1px solid rgba(213,213,213,.5);
  color: rgb(102,102,102);
  font-size: 30px;
  > span {
    &:first-child {
      flex: 1;
    }
    &:last-child {
      width: 30px;
    }
  }
}

.delivery-info__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 600px auto 0 auto;
  width:690px;
  height:90px;
  background:rgba(255,107,6,1);
  border-radius:11px;
  color: #FFF;
  font-size: 36px;
  text-decoration: none;
}

.create-picker {
  width: 100%;
  .picker-toolbar {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    .cancel {
      border: none;
      background-color: transparent;
    }
    .sure {
      border: none;
      background-color: transparent;
    }
  }
  
}
</style>
