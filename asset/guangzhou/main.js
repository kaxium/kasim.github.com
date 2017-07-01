
;(function(){
    /* 初始化 */
    var home = [113.311112, 22.992108];
    var data = [
        {
            name: '北京路美食街',
            position: [113.270331,23.118724],
            pic: ['https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=e725906f0ff431ada8df4b6b2a5fc7ca/f11f3a292df5e0feccb7fcfc5f6034a85fdf729b.jpg'],
            highlight: [
                '银记肠粉',
                '富临食府',
                '玫瑰甜品店',
                '达杨原味炖品',
                '大头虾',
                '食盈碗仔翅',
                '老西关濑粉',
                '西关婆婆面'
            ],
            addr: '北京路'
        },
        {
             name: '上下九步行街',
            position: [113.246109,23.112835],
            pic: ['https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=f9a1b0fd41a98226accc2375ebebd264/060828381f30e924aafcaeb94e086e061c95f7d9.jpg'],
            highlight: [
                '宝华面店',
                '银记肠粉',
                '陈添记',
                '林林牛杂屋',
                '伍湛记',
                '南信甜品牛奶专家',
                '顺记冰室',
                '仁信甜品店',
                '黄振龙凉茶'
            ],
            addr: '上下九步行街'
        }
    ];

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
            });

            return marker;
        },
        infoWindow:(function() {
            var infoWindow = new AMap.InfoWindow({
                offset: new AMap.Pixel(16, -45),
                isCustom: true
            });

            function createInfo(title, content, idx) {
                 var info = document.createElement("div");
                info.className = "info";

                //可以通过下面的方式修改自定义窗体的宽高
                //info.style.width = "400px";
                // 定义顶部标题
                var top = document.createElement("div");
                var titleD = document.createElement("div");
                var closeX = document.createElement("img");
                top.className = "info-top";
                titleD.innerHTML = '<a>'+title+'</a>';
                titleD.data_idx = idx;
                titleD.onclick = function() {
                    tools.openGaoDe(this.data_idx);
                }

                closeX.src = "http://webapi.amap.com/images/close2.gif";
                closeX.onclick = tools.infoWindow.close;

                top.appendChild(titleD);
                top.appendChild(closeX);
                info.appendChild(top);

                // 定义中部内容
                var middle = document.createElement("div");
                middle.className = "info-middle";
                middle.style.backgroundColor = 'white';
                middle.innerHTML = content;
                info.appendChild(middle);

                // 定义底部内容
                var bottom = document.createElement("div");
                bottom.className = "info-bottom";
                bottom.style.position = 'relative';
                bottom.style.top = '0px';
                bottom.style.margin = '0 auto';
                var sharp = document.createElement("img");
                sharp.src = "http://webapi.amap.com/images/sharp.png";
                bottom.appendChild(sharp);
                info.appendChild(bottom);
                return info;
            }

            return {
                open:function(pos, data, idx) {
                    var content = [];
                    content.push('<img src="'+data.pic+'">地址：'+data.addr);
                    content.push('特色：'+data.highlight.join(','));

                    var info = createInfo(data.name, content.join('<br>'), idx);
                    infoWindow.setContent(info);
                    infoWindow.open(map, pos);
                },
                close:function() {
                    map.clearInfoWindow();
                }
            }
        })(),
        openGaoDe: function(idx) {
            var marker = MarkerMemo[idx].marker;
            var data = MarkerMemo[idx].data;

            marker.markOnAMAP({
                name: data.name,
                position: marker.getPosition()
            })
        }
    }

    tools.addMarker(home, "Home");

    var MarkerMemo= [];

    /* 添加数据 */
    data.forEach(function(item, idx){
        var marker = tools.addMarker(item.position, item.name);
        marker.data = item;

        marker.on('click', function(e){
            tools.infoWindow.open(e.target.getPosition(), e.target.data, idx);
        });

        MarkerMemo.push({
            marker: marker,
            data: item
        })
    });
})();
