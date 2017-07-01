;(function(){
    /* 初始化 */
    var home = [113.311112, 22.992108];

    var map = new AMap.Map("allmap", {
        resizeEnable: true,
        zoom: 12,
        center: home
    });

    /* 添加定位 */
    map.plugin('AMap.Geolocation', function(){
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition:'RB'
        });
        map.addControl(geolocation);
        // geolocation.getCurrentPosition();
    });

    /* 图片自适应 */
    AMap.event.addDomListener(document.getElementById('setFitView'), 'click', function() {
        var newCenter = map.setFitView();
    });

    var tools = {
        addMarker:function(point, labelText) {
            var marker = new AMap.Marker({
                position: point
            });
            marker.setMap(map);

            labelText && marker.setLabel({
                offset: new AMap.Pixel(20,20),
                content: labelText
            })
        }
    }

    tools.addMarker(home, "Home")
})();
