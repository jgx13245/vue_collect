<template>
  <div class="selectway_wrap">
    <section class="selectway_title">{{base_orderType}}</section>
    <section class="selectway_shop">
      <span>店铺名称: </span>
      <span>{{base_market}}</span>
    </section>
    <section class="selectway_order">
      <ul class="selectway_orderul">
        <li><span>订单编号:</span><span>{{base_orderId}}</span></li>
        <li><span>下单时间:</span><span>{{base_orderTime}}</span></li>
      </ul>
    </section>
    <section class="selectway_people" v-show="isDelivery == 2">
      <ul class="selectway_peopleul">
        <li><span>收货人:</span><span>{{deliveryInfo.delivery_name}}</span></li>
        <li><span>手机号:</span><span>{{deliveryInfo.delivery_phone}}</span></li>
        <li><span>配送地址:</span><span>{{deliveryInfo.delivery_address}}</span></li>
        <!-- <li>
          <div style="color:#c1c1c1;">配送明细:</div>
          <div>
            <ul>
              <li v-for="(item,index) in deliveryInfo.goods" :key="index">{{item.name}}</li>
            </ul>
          </div>
        </li> -->
        <li><span>配送人:</span><span>{{deliveryInfo.delivery_courier}}</span></li>
        <li><span>配送时间:</span><span>{{deliveryInfo.delivery_time}}</span></li>
      </ul>
    </section>
    <section class="selectway_payment">
      <ul class="selectway_paymentul">
        <li><span>支付方式:</span><span>{{paymentInfo.base_payType}}</span></li>
        <li><span>商品金额:</span><span>{{paymentInfo.base_orderFee}}</span></li>
        <li><span>商品优惠:</span><span>{{paymentInfo.base_discount}}</span></li>
        <li><span>配送金额:</span><span>{{paymentInfo.base_deliveryFee}}</span></li>
        <li><span>支付金额:</span><span style="font-size:18px; color:#ff6b06;">{{paymentInfo.base_payFee}}</span></li>
      </ul>
    </section>
    <section class="selectway_goods">
      <div class="selectway_goodstitle" style="font-size:18px;">商品</div>
      <ul class="selectway_goodsul">
        <li v-for="(item,index) in goodsInfo" :key="index">
          <div class="goodsul_img">
            <img :src=item.pic alt="">
          </div>
          <div class="goodsul_info" v-show="isDelivery == 0">
            <div>{{item.name}}</div>
            <div><span>x{{item.number}}</span><span>￥{{item.price}}</span></div>
            <div><span>货柜编号:</span><span>{{item.cabinet}}</span></div>
            <div>
              <div class="storagename">货道编号:</div>
              <div class="storage">
                <ul>
                  <li v-for="(items,index) in item.storage" :key="index">{{items}}</li>
                </ul>
              </div>
          </div>
          </div>
          <div class="goodsul_infoDelivery" v-show="isDelivery == 2">
            <div>{{item.name}}</div>
            <div><span>x</span><span>{{item.number}}</span></div>
            <div><span>￥</span><span>{{item.price}}</span></div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { wxDeliveryOrSelf } from '../assets/js/api.js'
export default {
  data() {
    return {
      isDelivery:'', //判断是否存在配送数据
      base_orderType:'', // 0 自提  2 配送  3 触摸屏
      base_market: '', // 店铺
      base_orderId: '', // 订单编号
      base_orderTime: '', // 下单时间
      deliveryInfo:{
        delivery_name: '', // 收货人
        delivery_phone: '', // 手机号
        delivery_address: '', //配送地址
        delivery_courier: '', // 配送人
        delivery_time: '', // 配送时间
      },
      paymentInfo:{
        base_payType: '', // 支付方式
        base_orderFee:'', // 商品金额
        base_discount:'', // 商品优惠
        base_deliveryFee:'', // 配送金额
        base_payFee:'', // 支付金额
      },
      goodsInfo:[],
    }
  },
  mounted() {
    const orderId =  this.$route.query.orderId
    // 100060078 配送
    // 100063897 触摸屏
    // 100060093 自提
    this.handleGetWxInfo({orderId})
  },
  methods:{
    async handleGetWxInfo({orderId}) {
      const { 
        data:{base_market, 
              code,
              message,
              base_orderId, 
              base_orderTime, 
              base_orderType,
              base_payType, 
              base_orderFee, 
              base_discount,
              base_deliveryFee,
              base_payFee,
              base_orderGoods,
              delivery} 
        } = await wxDeliveryOrSelf({orderId})
      if(code == -1) {
        this.$toast(message)
        return
      }
      this.isDelivery = 0
      this.base_orderType = base_orderType
      this.base_market = base_market
      this.base_orderId = base_orderId
      this.base_orderTime = base_orderTime
      this.paymentInfo.base_payType = base_payType
      this.paymentInfo.base_orderFee = base_orderFee
      this.paymentInfo.base_discount = base_discount
      this.paymentInfo.base_deliveryFee = base_deliveryFee
      this.paymentInfo.base_payFee = base_payFee
      this.goodsInfo = base_orderGoods
      //如果存在配送数据。就显示配送
      if(delivery){
        this.isDelivery = 2
        this.deliveryInfo.delivery_address = delivery.delivery_address
        this.deliveryInfo.delivery_courier = delivery.delivery_courier
        this.deliveryInfo.delivery_name = delivery.delivery_name
        this.deliveryInfo.delivery_phone = delivery.delivery_phone
        this.deliveryInfo.delivery_time = delivery.delivery_time
      }
    }
  }
}
</script>

<style lang="scss">
.selectway_wrap {
  width:100%;
}
.selectway_title {
  width:100%;
  height:90px;
  background: #ff6b06;
  font-size:40px;
  color:#fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.selectway_shop{
  width:95%;
  height:60px;
  border-radius: 10px;
  box-shadow: #ccc 0px 0px 10px;
  border:1px solid #ccc;
  background: #fff;
  margin:30px auto;
  padding: 20px;
  font-size:26px;
  color:#3B3B3B;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  >span:nth-child(1) {
    width: 22%;
    color:#c1c1c1;
  }
  >span:nth-child(2) {
    margin-left:20px;
  }
}
.selectway_order{
  width:95%;
  height:120px;
  border-radius: 10px;
  box-shadow: #ccc 0px 0px 10px;
  border:1px solid #ccc;
  background: #fff;
  margin:30px auto;
  padding: 20px;
  color:#3B3B3B;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .selectway_orderul{
    width:100%;
    height:90px;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    align-items: center;
    >li {
      width:100%;
      font-size:28px;
      display: flex;
      >span:nth-child(1) {
        width: 22%;
         color:#c1c1c1;
      }
      >span:nth-child(2) {
        margin-left:20px;
      }
    }
  }
}
.selectway_people{
  width:95%;
  border:1px solid #ccc;
  border-radius: 10px;
  box-shadow: #ccc 0px 0px 10px;
  background: #fff;
  margin:30px auto;
  padding: 20px;
  font-size:20px;
  color:#3B3B3B;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .selectway_peopleul{
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    align-items: center;
    >li {
      width:100%;
      margin-top:20px;
      font-size:26px;
      display: flex;
      >span:nth-child(1) {
        width: 22%;
        color:#c1c1c1;
      }
      >span:nth-child(2) {
        flex:1;
        margin-left:20px;
      }
    }
    >li:nth-child(4) {
      >div:nth-child(1) {
        width: 22%;
      }
      >div:nth-child(2) {
        flex:1;
        margin-left:20px;
        li {
          margin-top:20px;
        }
        li:nth-child(1){
          margin-top:0;
        }
      }
    }
  }
}
.selectway_payment{
  width:95%;
  border:1px solid #ccc;
  border-radius: 10px;
  box-shadow: #ccc 0px 0px 10px;
  background: #fff;
  margin:30px auto;
  padding: 20px;
  font-size:20px;
  color:#3B3B3B;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .selectway_paymentul{
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    align-items: center;
    >li {
      width:100%;
      font-size:26px;
      display: flex;
      padding:10px 0;
      >span:nth-child(1) {
        width: 22%;
        color:#c1c1c1;
      }
      >span:nth-child(2) {
        flex: 1;
        text-align: right;
      }
    }
  }
}
.selectway_goods{
  width:95%;
  border:1px solid #ccc;
  border-radius: 10px;
  box-shadow: #ccc 0px 0px 10px;
  background: #fff;
  margin:30px auto;
  padding: 20px 0;
  font-size:20px;
  color:#3B3B3B;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .selectway_goodstitle{
    width:100%;
    height:50px;
    color:#c1c1c1;
    margin-left:20px;
  }
  .selectway_goodsul{
    width:100%;
    padding: 0 20px;
    background: #F7F7F7;
    >li{
      width:100%;
      height:230px;
      margin:40px 0;
      border:1px solid hsla(0,0%,90%,.5);
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .goodsul_img{
      width:30%;
      height:220px;
      >img{
        display: block;
        width:100%;
        height:218px;
      }
    }
    .goodsul_info{
      flex:1;
      height:200px;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      >div{
        width: 90%;
        display: flex;
        justify-content:flex-start;
        align-items: center;
        >span:nth-child(1){
          display: block;
          width:60%;
        }
        >span:nth-child(2){
          margin-left:10px;
        }
      }
      >div:nth-child(2){
        width: 90%;
        display: flex;
        justify-content:space-around;
        align-items: center;
      }
      >div:nth-child(4){
        width: 90%;
        display: flex;
        justify-content:flex-start;
        align-items: center;
        .storagename{
          width:60%;
        } 
        .storage{
          margin-left:10px;
        } 
      }
    }
    .goodsul_infoDelivery{
      flex:1;
      height:200px;
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      >div{
        width: 90%;
        display: flex;
        justify-content:flex-start;
        align-items: center;
      }
      >div:nth-child(2){
        padding-left: 10px;
      }
      >div:nth-child(3){
        font-size:30px;
      }
    }
  }
}

</style>
