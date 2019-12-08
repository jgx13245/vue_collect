<template>
  <div class="address">
    <ul v-if="dataSource.length > 0" class="container">
      <li v-for="(item, index) in dataSource" :key="index" class="item-container">
        <div class="info-wrapper">
          <span class="info-name">收货人：{{item.name}}</span>
          <span class="info-phone">{{item.phone}}</span>
        </div>
        <div class="info-address">{{item.address}}{{item.doorNumber}}</div>
        <div class="info-action">
          <div class="action-edit" @click="navigateToEditAddr(item)">
            <img class="edit-icon" src="../assets/images/edit_address.png" alt="">
            <span class="edit-label">编辑地址</span>
          </div>
          <span class="action-use" @click="selectAction(item)">使用该地址</span>
        </div>
      </li>
      <li class="add-new" role="button" @click="navigateToCreateAddr">
        <img class="add-new-image" src="../assets/images/address-create.png" alt="">
        <span>添加新地址</span>
      </li>
    </ul>

    <div class="empty-view" v-if="dataSource.length === 0">
      <img src="../assets/images/address-placeHolder.png" class="empty-view-image empty-image">
      <span class="empty-add" @click="navigateToCreateAddr">新增地址</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { addressList } from '../assets/js/api.js'
export default {
  data () {
    return {
      dataSource: []
    }
  },
  computed: {
    ...mapState(["marketId","userId"])
  },
  mounted() {
    this.requestAddressList()
  },
  methods: {
    ...mapMutations({
      currentCurrentAddress: 'currentCurrentAddress'
    }),
    async requestAddressList() {
      let params = {
        marketId: this.marketId,
        userId: this.userId
      }
      const { data } = await addressList(params)
      if (data) {
        this.dataSource = data
      }
    },
    navigateToCreateAddr() {
      this.$router.push({
        name: "create-addr"
      });
    },
    navigateToEditAddr(model) {
      this.$router.push({
        name: 'create-addr',
        query: {model: model}
      })
    },
    selectAction(model) {
      this.currentCurrentAddress(model)
      this.$router.replace({
        path: '/delivery-info'
      })
    }
  }
}
</script>

<style lang="scss">
.address {
  min-height: 100vh;
  background-color: #f4f4f4;
  .container {
    background-color: #f4f4f4;
    box-sizing: border-box;
    padding: 28px 16px;
    padding-bottom: 160px;

    .item-container {
      padding: 40px;
      margin-bottom: 20px;
      background-color: white;
      border-radius: 10px;

      .info-wrapper {
        display: flex;
        justify-content: space-between;
        .info-name {
          font-size: 32px;
          color: #3c3c3c;
        }
        .info-phone {
          font-size: 34px;
          color: #3c3c3c;
        }
      }
      .info-address {
        font-size: 30px;
        color: #aaa;
        margin-top: 20px;
        word-wrap : break-word;
      }
      .info-action {
        margin-top: 25px;
        border-top: 1px solid #d7d7d7;
        padding-top: 25px;
        color: #3c3c3c;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .action-edit {
          display: flex;
          align-items: center;
          .edit-icon {
            width: 25px;
            height: auto;
            margin-right: 10px;
          }
        }
        .action-use {
          color: #FF6B06;
        }
      }
    }
    .add-new {
      position: fixed;
      text-align: center;
      height: 90px;
      font-size: 36px;
      border-radius: 10px;
      color: white;
      background-color: #ff6e06;
      bottom: 60px;
      left: 40px;
      right: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      .add-new-image {
        width: 40px;
        height: auto;
        margin-right: 36px;
      }
    }
  }
  .empty-view {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .empty-view-image {
      width: 332px;
      height: 150px;
      margin-bottom: 120px;
    }
    .empty-add {
      margin-top: 30px;
      text-align: center;
      height: 80px;
      line-height: 80px;
      font-size: 38px;
      border-radius: 6px;
      padding-left: 40px;
      padding-right: 40px;
      color: white;
      background-color: #ff6e06;
    }
  }
}
</style>
