<template>
    <div class="evaCom-record">
      <div class="evaCom-recordTitle">患者健康记录</div>
        <ul class="record-ul">
          <li v-for="(item, index) in RecordParams.data" :key="index" >{{item.name}}</li>
        </ul>
    </div>
</template>

<script>

export default {
  props:["RecordParams"],
  data() {
    return{

    }
  }
}
</script>

<style lang="scss">
/*高血压*/
.evaCom-record{
  width:95%;
  height:400px;
  margin-top:40px;
  background: #C5E6DF;
  border-radius: 30px;
  position: relative;
  border:1px solid #035832;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .evaCom-recordTitle{
    height:50px;
    padding: 0 10px;
    border-radius: 10px;
    background: #22A559;
    color: #fff;
    text-align: center;
    line-height: 50px;
    position: absolute;
    z-index: 100;
    left:30px;
    top:-20px;
  }
  .record-ul{
    width:100%;
    height: 100%;
    padding: 20px;
    overflow: auto;
    li{
      margin-top:20px;
      background: #fff;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
}
</style>