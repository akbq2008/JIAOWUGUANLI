$(function() {
    $("#main").find(".main-left dt").click(function() {
        $("#main").find(".main-left dd").slideToggle();
    });
    //点击dt进行滑动
    $("#main").find(".ready-select").click(function() {
        if (!$(this).hasClass("checked")) {
            $(this).siblings().removeClass("checked");
            $(this).addClass("checked");
            var ready_select = $("#main").find(".ready-select");
            var url = "../personnal";
            $.ajax({
                url: url,
                type: "get",
                dataType: "JSON",
                error: function() {
                    alert("学生信息表中没有你的数据!");
                },
                success: function(data) {
                    afterLoad(data);
                }
            });
            ready_select.addClass("select");
        } else {
            $(this).siblings().removeClass("checked");
        }
        $("#main").find(".pager2").css("display", "none");
        $("#main").find(".pager").css("display", "block");
    });

    function afterLoad(data) {
        var html = "",
            html2 = "",
            str = "";
        str2 = true;
        //这步是关键，
        $.each(data, function(index, content) {
            var totalRecord = content.biaoti[0].totalRecord, //总的数量
                currentPage = content.biaoti[0].currentPage,
                totalPages = content.biaoti[0].totalPages, //总的页数
                pageSize = content.biaoti[0].pageSize; //每页显示的记录数
            if (totalRecord >= 1) {
                if (pageSize >= totalRecord) {
                    for (var i = 0; i < totalRecord; i++) {
                        if (content.neirong[i] != undefined) {
                            var xm = content.neirong[i].XM,
                                xb = content.neirong[i].XB,
                                nl = content.neirong[i].NL,
                                zy = content.neirong[i].ZY;
                            yx = content.neirong[i].YX;
                            Idnumber = content.neirong[i].Idnumber;
                            if (Idnumber != undefined) {
                                html = "<tr class='content-box'><td class='kch'>" + xm + "</td> " + "<td>" + xb + "</td> " + "<td>" + nl + "</td> " + "<td>" + zy + "</td> " + "<td>" + yx + "</td> <td>" + Idnumber + "</td></tr>";
                                str += html;
                            } else {
                                html = "<tr class='content-box'><td class='kch'>" + xm + "</td> " + "<td>" + xb + "</td> " + "<td>" + nl + "</td> " + "<td>" + zy + "</td> " + "<td>" + yx + "</td> <td>" + Idnumber + "</td></tr>";
                                str += html;
                                str2 = false;
                            }
                        }
                    }
                } else {
                    for (var i = 0; i < pageSize; i++) {
                        if (content.neirong[i] != undefined) {
                            var kch = content.neirong[i].KCH,
                                kcm = content.neirong[i].KCM,
                                ks = content.neirong[i].KS,
                                kcdm = content.neirong[i].KCDM;
                            Idnumber = content.neirong[i].Idnumber;
                            if (Idnumber != undefined) {
                                html = "<tr class='content-box'><td class='kch'>" + xm + "</td> " + "<td>" + xb + "</td> " + "<td>" + nl + "</td> " + "<td>" + zy + "</td> " + "<td>" + yx + "</td> <td>" + Idnumber + "</td></tr>";
                                str += html;
                            } else {
                                html = "<tr class='content-box'><td class='kch'>" + xm + "</td> " + "<td>" + xb + "</td> " + "<td>" + nl + "</td> " + "<td>" + zy + "</td> " + "<td>" + yx + "</td> <td>" + Idnumber + "</td></tr>";
                                str += html;
                                str2 = false;
                            }
                        }
                    }
                }
            } else {
                alert("没有数据");
            }
            // else
        }); //$.each();
        if (str2) {
            $("#main .main-serarch-box").html("<tr class='box-title'><th>姓名</th><th>性别</th><th>年龄</th><th>专业</th><th>学院</th><th>身份标识</th></tr>" + str);
            $("#main .content-box:odd").addClass("odd");
        } else {
            $("#main .main-serarch-box").html("<tr class='box-title'><th>姓名</th><th>性别</th><th>年龄</th><th>专业</th><th>学院</th><th>身份标识</th></tr>" + str);
        }
    }
    $(document).on("mouseover", "#main .content-box", function() {
        $(this).addClass("current");
    });
    $(document).on(" mouseout", "#main .content-box", function() {
        $(this).removeClass("current");
    });
    // 通过事件委托来对ajax返回的html元素绑定事件
    //点击dd进行异步请求
    $("#main").find(".main-left dd").mouseover(function(event) {
        /* Act on the event */
        if (!$(this).hasClass("checked")) {
            $(this).addClass("hover");
        }
    }).mouseout(function(event) {
        /* Act on the event */
        $(this).removeClass("hover");
    });
    //对dd添加滑动效果
    $(".main-open-close").click(function() {
        if ($("#main .main-left").hasClass("visible")) {
            $("#main .main-right").css("width", "100%");
            $("#main .main-left").animate({
                left: "-401px"
            }, 600);
            $("#main .main-right").animate({
                left: "-401px"
            }, 600);
            $("#main .main-left").removeClass("visible");
        } else {
            $("#main .main-left").animate({
                left: "0px"
            }, 600);
            $("#main .main-right").animate({
                left: "0px"
            }, 600);
            $("#main .main-left").addClass("visible");
        }
    });
});