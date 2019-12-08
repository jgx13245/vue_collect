<template>
  <div class="create-addr">
    <ul>
      <li class="item-container">
        <span class="key-view">联系人</span>
        <input class="value-view" placeholder="请输入联系人姓名" v-model="name">
      </li>
      <li class="item-container flex">
        <div class="key-view"></div>
        <section class="button-container">
          <div class="button" role="button" @click="changeSex(1)">
            <img :src="sex === 1?require('../assets/images/item_select.png'):require('../assets/images/item_unselect.png')">
            <span>先生</span>
          </div>
          <div class="button" role="button" @click="changeSex(0)">
            <img :src="sex === 0?require('../assets/images/item_select.png'):require('../assets/images/item_unselect.png')">
            <span>女士</span>
          </div>
        </section>
      </li>
      <li class="item-container">
        <span class="key-view">手机号码</span>
        <input class="value-view" type="number" placeholder="请输入手机号码" v-model="phone">
      </li>

      <li class="item-container">
        <span class="key-view">所在超市</span>
        <span class="value-view disabled">{{marketName}}</span>
      </li>
      <li class="item-container">
        <span class="key-view">收货地址</span>
        <span class="value-view disabled">{{address}}</span>
      </li>
      <li class="item-container">
        <span class="key-view">详细地址</span>
        <input class="value-view" placeholder="例：xx号楼xx单元xx门牌号" v-model="doorNumber">
      </li>
    </ul>
    <div class="save" role="button" @click="saveAction">保存</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { createAddress, editAddress } from '../assets/js/api.js'
export default {
  data () {
    return {
      addressId: null,
      sex: 1,
      name: null,
      phone: null,
      doorNumber: null,
      isDefault: 0,
      address: null
    }
  },
  computed: {
    ...mapState(["marketId","userId","marketName","marketLocation"])
  },
  created() {
    const model = this.$route.query.model
    if (model) {
      // 编辑地址
      this.addressId = model.addressId
      this.sex = model.sex
      this.name = model.name
      this.phone = model.phone
      this.doorNumber = model.doorNumber
      this.address = model.address
      this.isDefault = model.isDefault
    } else {
      this.address = this.marketLocation
    }
  },
  methods: {
    changeSex(sex) {
      this.sex = sex
    },
    async saveAction() {
      const { name, phone, doorNumber, addressId, address, marketName, sex, isDefault, userId, marketId } = this
      if (!name || !phone || !doorNumber) {
        let message = ""
        if (!this.name) {
          message = "请输入姓名"
        } else if (!this.phone) {
          message = "请输入手机号"
        } else if (!this.doorNumber) {
          message = "请输入门牌号"
        }
        this.$toast(message)
      } else if (this.addressId) {
        // 编辑地址
        this.$loading.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
        const { data } = await editAddress({ name, phone, doorNumber, addressId, address, marketName, sex, isDefault, userId, marketId })
        const { message } = data
        this.$loading.close()
        this.$nextTick(() => {
          this.$toast(message)
          setTimeout(() => {
            this.$router.go(-1)
          }, 2000)
        })
      } else {
        // 新增地址
        const { data } = await createAddress({ name, phone, doorNumber, address, marketName, sex, userId, marketId })
        const { message } = data
        this.$loading.close()
        this.$nextTick(() => {
          this.$toast(message)
          setTimeout(() => {
            this.$router.go(-1)
          }, 2000)
        })
      }
    }
  }
}
</script>

<style lang="scss">
input {
  border: none;
}
.create-addr {
  background: #f4f4f4;
  min-height: 100vh;
  ul {
    .item-container {
      height: 120px;
      font-size: 32px;
      background-color: white;
      margin-bottom: 1px;
      color: #333;
      padding-left: 24px;
      padding-right: 24px;
      display: flex;
      align-items: center;
      .key-view {
        width: 200px;
        float: left;
      }
      .value-view {
        flex: 1;
      }
      .disabled {
        color: lightgray;
      }
      .button-container {
        flex: 1;
        .button {
          width: 45%;
          display: flex;
          align-items: center;
          float: left;
        }
        .button img {
          width: 40px;
          height: auto;
        }

        .button span {
          padding-left: 20px;
          font-size: 30px;
          color: #333;
        }
      }
    }
    .flex {
      display: flex;
    }
  }
  .save {
    height: 90px;
    font-size: 36px;
    border-radius: 10px;
    color: white;
    background-color: #ff6e06;
    // width: 100%;
    box-sizing: border-box;
    margin: 0 40px;
    line-height: 90px;
    text-align: center;
    margin-top: 60px;
  }
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
