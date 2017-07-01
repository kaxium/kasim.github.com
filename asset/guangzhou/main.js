;(function(){
    var map = new BMap.Map("allmap");    // 创建Map实例
    var point = new BMap.Point(113.31834, 22.998259);
	map.centerAndZoom(point,14);
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
})();
