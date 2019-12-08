<template>
  <div>
    <div id="container">
      <div class="zai" @click="search">路线</div>
    </div>
  </div>
</template>
<script>
var map
export default {
  data() {
    return{
      infowindow1:null,
      lnglat : [116.397428, 39.90923]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      map = new AMap.Map('container', {
        center:this.lnglat,
        resizeEnable: true,
        zoom: 10
      })
      // 添加标记点
      var marker = new AMap.Marker({
        position: this.lnglat
      });
      marker.setMap(map);

      map.add(marker);
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale','AMap.Geolocation','AMap.AdvancedInfoWindow'], () => {
        console.log(this.lnglat)
        let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,        //显示定位按钮，默认：true
            buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        map.addControl(new AMap.ToolBar())
        map.addControl(new AMap.Scale())
        map.addControl(geolocation)
        geolocation.getCurrentPosition();
        var content = '<div class="info-title">高德地图</div><div class="info-content">' +
          '<img src="https://webapi.amap.com/images/amap.jpg">' +
          '高德是中国领先的数字地图内容、导航和位置服务解决方案提供商。<br/>' +
          '<a target="_blank" href = "https://mobile.amap.com/">点击下载高德地图</a></div>';
        this.infowindow1 = new AMap.AdvancedInfoWindow({
        content: content,
        offset: new AMap.Pixel(0, -30)
        });
      })
    },
    search() {
      console.log(this.infowindow1)
      this.infowindow1.open(map,this.lnglat)
    }
  }
}
</script>
<style>
#container{
  width:100%;
  height:100vh;
}
.zai{
  width:300px;
  height:50px;
  border:1px solid #0f0;
  position: absolute;
  bottom: 50px;
  right:50px;
  z-index: 1000;
}
</style>