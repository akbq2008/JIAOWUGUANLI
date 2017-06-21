window.onload = function() {
    move('moocBox', 'con1', 'con2');
    move('moocBox2', 'con3', 'con4');
    move('moocBox3', 'con5', 'con6');
};

function move(attr, box1, box2) {
    var area = document.getElementById(attr);
    var con1 = document.getElementById(box1);
    var con2 = document.getElementById(box2);
    con2.innerHTML = con1.innerHTML;
    var time = null;
    time = setInterval(startMove, 50);
    con1.onmouseover = function() {
        clearInterval(time);
    };
    con1.onmouseout = function() {
        time = setInterval(startMove, 50);
    };
    con2.onmouseover = function() {
        clearInterval(time);
    };
    con2.onmouseout = function() {
        time = setInterval(startMove, 50);
    };
    /* 直接用盒子就好，因为滚动的区域是盒子。 */
    function startMove() {
        if (area.scrollTop >= con1.offsetHeight) {
            area.scrollTop = 0;
        } else {
            area.scrollTop++;
        }
    }
    /* 它是每隔50毫秒执行一次，所以不需要回调函数。 */
}

function showLocale(objD) {
    var str, colorhead, colorfoot;
    var yy = objD.getYear();
    if (yy < 1900) yy = yy + 1900;
    var MM = objD.getMonth() + 1;
    if (MM < 10) MM = '0' + MM;
    var dd = objD.getDate();
    if (dd < 10) dd = '0' + dd;
    var hh = objD.getHours();
    if (hh < 10) hh = '0' + hh;
    var mm = objD.getMinutes();
    if (mm < 10) mm = '0' + mm;
    var ss = objD.getSeconds();
    if (ss < 10) ss = '0' + ss;
    var ww = objD.getDay();
    if (ww == 0) colorhead = "";
    if (ww > 0 && ww < 6) colorhead = "";
    if (ww == 6) colorhead = "";
    if (ww == 0) ww = "星期日";
    if (ww == 1) ww = "星期一";
    if (ww == 2) ww = "星期二";
    if (ww == 3) ww = "星期三";
    if (ww == 4) ww = "星期四";
    if (ww == 5) ww = "星期五";
    if (ww == 6) ww = "星期六";
    colorfoot = "";
    str = colorhead + yy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss + " " + ww + colorfoot;
    return (str);
}

function tick() {
    var today;
    today = new Date();
    document.getElementById("sj").innerHTML = showLocale(today);
    window.setTimeout(tick, 1000);
}
tick();
$(function() {
    $('#form').submit(function() {
        return false;
    });
    //这里有form的默认提交
    $('#form').submit(function() {
        var txt = $('#txt').val();
        if (txt != "") {
            $.cookie("cityname", txt, {
                path: "",
                expires: 30
            });
            //将输入的城市存入cookie;
            findWeather(txt);
        } else {
            return false;
        }
        txt = "";
    });
    findWeather();

    function findWeather(attr) {
        var cityUrl = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';
        // ip地址检测
        $.getScript(cityUrl, function(script, textStatus, jqXHR) {
            var citytq = remote_ip_info.city; // 获取城市
            if (attr != undefined) {
                citytq = attr;
            }
            if ($.cookie("cityname")) {
                var cityname = $.cookie("cityname");
                citytq = cityname;
                var url = "https://free-api.heweather.com/v5/weather?city=" + citytq + "&key=d7bd43af19c64994b62fc643e5d75272";
            } else {
                var url = "https://free-api.heweather.com/v5/weather?city=" + citytq + "&key=d7bd43af19c64994b62fc643e5d75272";
            }
            //如果有cookie的话就执行cookie的城市名字的天气查询,否则就根据ip地址定位查询
            // 天气
            $.ajax({
                type: "post",
                url: url,
                dataType: "json",
                success: function(data) {
                    $("#weather").empty();
                    var html = "";
                    if (citytq == "丽水") {
                        var tianqi = data.HeWeather5[1];
                        var img = "<img src='../weather-image/" + tianqi.now.cond.code + ".png' alt='error' class='weather-img'/>";
                        html = citytq + ":" + img + "" + tianqi.now.fl + "℃" + tianqi.aqi.city.qlty + "" + tianqi.aqi.city.aqi;
                        $("#weather").html(html);
                    } else {
                        var tianqi = data.HeWeather5[0];
                        var img = "<img src='../weather-image/" + tianqi.now.cond.code + ".png' alt='error' class='weather-img'/>";
                        html = citytq + ":" + img + "" + tianqi.now.fl + "℃" + tianqi.aqi.city.qlty + "" + tianqi.aqi.city.aqi;
                        $("#weather").html(html);
                    }
                }
            });
        });
    }
    // 天气
    $('#top').find('.weather-arrow').click(function() {
        /* Stuff to do every *odd* time the element is clicked */
        $(this).toggleClass('up');
        // 先给该类加上down，然后控制up是否覆盖down就可以了
        $('#top').find('.move-box').toggle();
    });
    box_switch('#close');
    box_switch('#submit');

    function box_switch(attr) {
        $(attr).click(function() {
            //$("#txt").val("");
            $('#top').find('.move-box').css('display', 'none');
            $('#top').find('.weather-arrow').removeClass('up').addClass('down');
        });
    }
    // 天气盒子开关
    $('#top .top-list li').click(function() {
        $(this).each(function() {
            if ($(this).hasClass('selected')) {
                $(this).siblings().removeClass('selected');
            } else {
                $(this).siblings().removeClass('selected');
                $(this).addClass('selected');
            }
            var href = $(this).find('.txt a').attr('class');
            var url = href + '.jsp';
            window.location=url;
            // $.ajax({
            //     url: url,
            //     type: "post",
            //     success: function(data) {
            //         // alert(data.main);
            //         var result = $(data).find("#main"); //这里是过滤
            //         $("#main").html(result);
            //         //异步加载其他页面的内容到当前页面
            //     }
            // });
            // 这里用异步加载的话,导致页面加载文件变多
        });
    }).mouseover(function() {
        /* Act on the event */
        if (!$(this).hasClass('selected')) {
            $(this).addClass('hover');
        }
    }).mouseout(function() {
        /* Act on the event */
        $(this).removeClass('hover');
    });
    // 头部标签跳转
    $('#top').find('.top-userpic').mouseover(function() {
        $('#top').find('.subNav li').css('display', 'block');
    }).mouseout(function() {
        $('#top').find('.subNav li').css('display', 'none');
    });
});
//天气及地理位置的获取
// (function() {
//     var w = [];
//     w['平顶山'] = [{
//         s1: '多云',
//         s2: '小雨',
//         f1: 'duoyun',
//         f2: 'xiaoyu',
//         t1: '26',
//         t2: '15',
//         p1: '3-4',
//         p2: '≤3',
//         d1: '南风',
//         d2: '无持续风向'
//     }];
//     var add = {
//         now: '2017-05-07 16:34:56',
//         time: '1494146096',
//         update: '北京时间05月07日08:10更新',
//         error: '0',
//         total: '1'
//     };
//     window.SWther = {
//         w: w,
//         add: add
//     };
// })(); //0
// // 地理位置获取
// $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js&ip?', function(_result) {
//     if (remote_ip_info.ret == '1') {
//         $.ajax({
//             type: "GET",
//             url: "http://wthrcdn.etouch.cn/weather_mini?city=" +  remote_ip_info.city ,
//             data: "",
//             // remote_ip_info.country + remote_ip_info.province +remote_ip_info.district
//             success: function(msg) {
//                 var res = eval('(' + msg + ')');
//                 //alert(msg);
//                 if (res.status == 1000) {
//                     //请求成功
//                     alert(res.data.city);
//                     alert(res.data.wendu);
//                     alert(res.data.forecast[0].type);
//                 }
//             }
//         });
//     }
// });