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
            var url = "../searchclasses";
            $.ajax({
                url: url,
                type: "get",
                dataType: "JSON",
                error: function() {
                    alert("error");
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
    $("#main").find(".select-results").click(function() {
        if (!$(this).hasClass("checked")) {
            $(this).siblings().removeClass("checked");
            $(this).addClass("checked");
            var ready_select = $("#main").find(".select-results");
            var url = "../Handlexuankeresult";
            $.ajax({
                url: url,
                type: "get",
                dataType: "JSON",
                async: false,
                error: function() {
                    alert("你还没有选课!");
                },
                success: function(data) {
                    afterLoad2(data);
                }
            });
            ready_select.addClass("select");
        } else {
            $(this).siblings().removeClass("checked");
        }
        $("#main").find(".pager2").css("display", "block");
        $("#main").find(".pager").css("display", "none");
    });
    //预选ajax请求
    function afterLoad(data) {
        var html = "",
            html2 = "",
            str = "";
        str2 = true;
        //这步是关键，
        $.each(data, function(index, content) {
            var totalRecord = content.biaoti[0].totalRecord, //总的数量
                totalPages = content.biaoti[0].totalPages, //总的页数
                pageSize = content.biaoti[0].pageSize; //每页显示的记录数
            if (totalRecord >= 1) {
                if (pageSize >= totalRecord) {
                    for (var i = 0; i < totalRecord; i++) {
                        if (content.neirong[i] != undefined) {
                            var kch = content.neirong[i].KCH,
                                kcm = content.neirong[i].KCM,
                                ks = content.neirong[i].KS,
                                kcdm = content.neirong[i].KCDM;
                            if (Idnumber != undefined) {
                                html = "<tr class='content-box'><td class='kch'>" + kch + "</td> " + "<td>" + kcm + "</td> " + "<td>" + ks + "</td> " + "<td>" + kcdm + "</td> <td>" + Idnumber + "</td></tr>";
                                str += html;
                            } else {
                                html = "<tr class='content-box'><td class='kch'>" + kch + "</td> " + "<td>" + kcm + "</td> " + "<td>" + ks + "</td> " + "<td>" + kcdm + "</td>+ <td class='add-pic-box'><i class='add-pic'></i></td><td class='delete-pic-box'><i class='delete-pic'></i></td> </tr>";
                                str += html;
                                str2 = false;
                            }
                        }
                    }
                    createa(data);
                } else {
                    for (var i = 0; i < pageSize; i++) {
                        if (content.neirong[i] != undefined) {
                            var kch = content.neirong[i].KCH,
                                kcm = content.neirong[i].KCM,
                                ks = content.neirong[i].KS,
                                kcdm = content.neirong[i].KCDM;
                            Idnumber = content.neirong[i].Idnumber;
                            if (Idnumber != undefined) {
                                html = "<tr class='content-box'><td class='kch'>" + kch + "</td> " + "<td>" + kcm + "</td> " + "<td>" + ks + "</td> " + "<td>" + kcdm + "</td> <td>" + Idnumber + "</td></tr>";
                                str += html;
                            } else {
                                html = "<tr class='content-box'><td class='kch'>" + kch + "</td> " + "<td>" + kcm + "</td> " + "<td>" + ks + "</td> " + "<td>" + kcdm + "</td>+ <td class='add-pic-box'><i class='add-pic'></i></td><td class='delete-pic-box'><i class='delete-pic'></i></td> </tr>";
                                str += html;
                                str2 = false;
                            }
                        }
                    }
                    createa(data);
                }
            } else {
                alert("没有数据");
            }
            // else
        }); //$.each();
        if (str2) {
            $("#main .main-serarch-box").html("<tr class='box-title'><th>课程号</th><th>课程名</th><th>课时</th><th>课程代码</th><th>身份标识</th></tr>" + str);
            $("#main .content-box:odd").addClass("odd");
        } else {
            $("#main .main-serarch-box").html("<tr class='box-title'><th>课程号</th><th>课程名</th><th>课时</th><th>课程代码</th><th>操作</th><th>操作</th></tr>" + str);
            $("#main .content-box:odd").addClass("odd");
        }
    }

    function afterLoad2(data) {
        var html = "",
            html2 = "",
            str = "";
        str2 = true;
        //这步是关键，
        $.each(data, function(index, content) {
            var totalRecord = content.biaoti[0].totalRecord, //总的数量
                totalPages = content.biaoti[0].totalPages, //总的页数
                pageSize = content.biaoti[0].pageSize; //每页显示的记录数
            if (totalRecord >= 1) {
                if (pageSize >= totalRecord) {
                    for (var i = 0; i < totalRecord; i++) {
                        if (content.neirong[i] != undefined) {
                            var kch = content.neirong[i].KCH,
                                kcm = content.neirong[i].KCM,
                                ks = content.neirong[i].KS,
                                kcdm = content.neirong[i].KCDM;
                            Idnumber = content.neirong[i].Idnumber;
                            if (Idnumber != undefined) {
                                html = "<tr class='content-box'><td class='kch'>" + kch + "</td> " + "<td>" + kcm + "</td> " + "<td>" + ks + "</td> " + "<td>" + kcdm + "</td> <td>" + Idnumber + "</td></tr>";
                                str += html;
                            } else {
                                html = "<tr class='content-box'><td class='kch'>" + kch + "</td> " + "<td>" + kcm + "</td> " + "<td>" + ks + "</td> " + "<td>" + kcdm + "</td>+ <td class='add-pic-box'><i class='add-pic'></i></td><td class='delete-pic-box'><i class='delete-pic'></i></td> </tr>";
                                str += html;
                                str2 = false;
                            }
                        }
                    }
                    createa2(data);
                } else {
                    for (var i = 0; i < pageSize; i++) {
                        if (content.neirong[i] != undefined) {
                            var kch = content.neirong[i].KCH,
                                kcm = content.neirong[i].KCM,
                                ks = content.neirong[i].KS,
                                kcdm = content.neirong[i].KCDM;
                            Idnumber = content.neirong[i].Idnumber;
                            if (Idnumber != undefined) {
                                html = "<tr class='content-box'><td class='kch'>" + kch + "</td> " + "<td>" + kcm + "</td> " + "<td>" + ks + "</td> " + "<td>" + kcdm + "</td> <td>" + Idnumber + "</td></tr>";
                                str += html;
                            } else {
                                html = "<tr class='content-box'><td class='kch'>" + kch + "</td> " + "<td>" + kcm + "</td> " + "<td>" + ks + "</td> " + "<td>" + kcdm + "</td>+ <td class='add-pic-box'><i class='add-pic'></i></td><td class='delete-pic-box'><i class='delete-pic'></i></td> </tr>";
                                str += html;
                                str2 = false;
                            }
                        }
                    }
                    createa2(data);
                }
            } else {
                alert("没有数据");
            }
            // else
        }); //$.each();
        if (str2) {
            $("#main .main-serarch-box").html("<tr class='box-title'><th>课程号</th><th>课程名</th><th>课时</th><th>课程代码</th><th>身份标识</th></tr>" + str);
            $("#main .content-box:odd").addClass("odd");
        } else {
            $("#main .main-serarch-box").html("<tr class='box-title'><th>课程号</th><th>课程名</th><th>课时</th><th>课程代码</th><th>操作</th><th>操作</th></tr>" + str);
            $("#main .content-box:odd").addClass("odd");
        }
    }
    //ajax请求成功之后执行的函数，这里要注意一点的是。jquery给元素绑定事件需要在html()或者append()之后，不然的话没有效果
    function createa(data) {
        var html = "";
        for (var i = 1; i <= data[0].biaoti[0].totalPages; i++) {
            html += "<a href='#" + i + "' class='page_" + i + "'   id='" + i + "'    >" + i + "</a>";
        }
        $("#main").find(".pager").empty();
        $("#main").find(".pager").append("<a href='javascript:void(0);' class='Prev' id='Prev'>Prev </a>" + html + "<a href='javascript:void(0);' class='Next' id='Next'>Next</a ><input type='text'  class='input-txt' name='text' style='width:30px;border:1px solid black' value=''/><button id='turninto'>跳转</button>");
        $("#main").find(".pager a[id!=Prev][id!=Next]").click(function() {
            if (!$(this).hasClass('currentPage')) {
                $(this).addClass("currentPage");
                $(this).siblings().removeClass("currentPage");
            }
        });
        $("#1").addClass("currentPage");
        var length = $("#main").find(".pager a").length;
        if (length == 3) {
            $("#turninto").css("display", "none");
            $(".input-txt").css("display", "none");
            $("#Prev").css("display", "none");
            $("#Next").css("display", "none");
        }
        //如果单页显示的话，就隐藏其他按钮
    }
    //这是创建页码的
    function createa2(data) {
        var html = "";
        for (var i = 1; i <= data[0].biaoti[0].totalPages; i++) {
            html += "<a href='#" + i + "' class='page2_" + i + "'   id='page_" + i + "'    >" + i + "</a>";
        }
        $("#main").find(".pager2").empty();
        $("#main").find(".pager2").append("<a href='javascript:void(0);' class='Prev2' id='Prev2Prev2'>Prev </a>" + html + "<a href='javascript:void(0);' class='Next2' id='Next2Next2'>Next</a ><input type='text'  class='input-txt2' name='text' style='width:30px;border:1px solid black' value=''/><button id='turninto2'>跳转</button>");
        $("#main").find(".pager2 a[id!=Prev2Prev2][id!=Next2Next2]").click(function() {
            if (!$(this).hasClass('currentPage2')) {
                $(this).addClass("currentPage2");
                $(this).siblings().removeClass("currentPage2");
            }
        });
        $("#page_1").addClass("currentPage2");
        var length = $("#main").find(".pager2 a").length;
        if (length == 3) {
            $("#turninto2").css("display", "none");
            $(".input-txt2").css("display", "none");
            $("#Prev2Prev2").css("display", "none");
            $("#Next2Next2").css("display", "none");
        }
        //如果单页显示的话，就隐藏其他按钮
    }
    $(document).on("click", "#turninto", function() {
        var txt = $("#main").find(".input-txt").val();
        var str = "";
        $("#main").find(".pager a").each(function() {
            var id = $(this).attr("id");
            str += id + ",";
            return str;
        });
        if (str.indexOf(txt) > 0) {
            if (txt != "") {
                var url = "../searchclasses";
                var num = $("#main").find(".currentPage").attr("id");
                $("#" + num).removeClass("currentPage");
                $("#" + txt).addClass("currentPage");
                $.ajax({
                    url: url,
                    type: "get",
                    dataType: "JSON",
                    error: function() {
                        alert("error");
                    },
                    success: function(data) {
                        loadPage(data, txt);
                    }
                });
            }
        } else {
            alert("不包含当前页");
        }
    });
    //检测是否有当前页;
    $(document).on("click", "#turninto2", function() {
        var txt = $("#main").find(".input-txt2").val();
        var str = "";
        $("#main").find(".pager2 a").each(function() {
            var id = $(this).attr("id");
            str += id + ",";
            return str;
        });
        if (str.indexOf(txt) > 0) {
            if (txt != "") {
                var url = "../Handlexuankeresult";
                var num = $("#main").find(".currentPage2").attr("id");
                num = num.slice(5);
                $("#page_" + num).removeClass("currentPage2");
                $("#page_" + txt).addClass("currentPage2");
                $.ajax({
                    url: url,
                    type: "get",
                    dataType: "JSON",
                    error: function() {
                        alert("error");
                    },
                    success: function(data) {
                        loadPage(data, txt);
                    }
                });
            }
        } else {
            alert("不包含当前页");
        }
    });
    $(document).on("click", "#main .pager a", function() {
        $(this).each(function() {
            var pagenum = $(this).attr("id");
            var url = "../searchclasses";
            var num = $("#main").find(".currentPage").attr("id");
            if (pagenum != "Prev" && pagenum != "Next") {
                $.ajax({
                    url: url,
                    type: "get",
                    dataType: "JSON",
                    error: function() {
                        alert("error");
                    },
                    success: function(data) {
                        loadPage(data, pagenum);
                    }
                });
            } else if (pagenum == "Prev") {
                if (num > 1) {
                    $("#" + num).removeClass("currentPage");
                    $("#" + (num - 1)).addClass("currentPage");
                    $.ajax({
                        url: url,
                        type: "get",
                        dataType: "JSON",
                        error: function() {
                            alert("error");
                        },
                        success: function(data) {
                            loadPage(data, num - 1);
                        }
                    });
                }
            } else if (pagenum == "Next") {
                var length = $("#main").find(".pager a").length;
                var number = parseInt(num); //突然变字符串了？
                if (number < (length - 2)) {
                    $("#" + number).removeClass("currentPage");
                    $("#" + (number + 1)).addClass("currentPage");
                    $.ajax({
                        url: url,
                        type: "get",
                        dataType: "JSON",
                        error: function() {
                            alert("error");
                        },
                        success: function(data) {
                            loadPage(data, (number + 1));
                        }
                    });
                }
            }
        });
    });
    //下面是a 的跳转
    $(document).on("click", "#main .pager2 a", function() {
        $(this).each(function() {
            var pagenum = $(this).attr("id"); //a的id
            pagenum = pagenum.slice(5);
            var url = "../Handlexuankeresult";
            var num = $("#main").find(".currentPage2").attr("id"); //当前页的id名字
            num = num.slice(5);
            if (pagenum != "Prev2" && pagenum != "Next2") {
                $.ajax({
                    url: url,
                    type: "get",
                    dataType: "JSON",
                    error: function() {
                        alert("error");
                    },
                    success: function(data) {
                        loadPage2(data, pagenum);
                    }
                });
            } else if (pagenum == "Prev2") {
                var length = $("#main").find(".pager2 a").length;
                var number = Number(num); //突然变字符串了？
                if (number > (1)) {
                    // alert("1-1");
                    $(".page2_" + number).removeClass("currentPage2");
                    $(".page2_" + (number - 1)).addClass("currentPage2");
                    $.ajax({
                        url: url,
                        type: "get",
                        dataType: "JSON",
                        error: function() {
                            alert("error");
                        },
                        success: function(data) {
                            loadPage2(data, number - 1);
                        }
                    });
                }
            } else if (pagenum == "Next2") {
                var length = $("#main").find(".pager2 a").length;
                var number = Number(num); //突然变字符串了？
                if (number < (length - 2)) {
                    $(".page2_" + number).removeClass("currentPage2");
                    $(".page2_" + (number + 1)).addClass("currentPage2");
                    $.ajax({
                        url: url,
                        type: "get",
                        dataType: "JSON",
                        error: function() {
                            alert("error");
                        },
                        success: function(data) {
                            loadPage2(data, (number + 1));
                        }
                    });
                }
            } //else if
        });
    });
    //参数的传递
    //这样就可以根据总页数来生成页码了
    function loadPage(data, page) {
        var html = "",
            html2 = "",
            str = "";
        str2 = true;
        $.each(data, function(index, content) {
            var totalRecord = content.biaoti[0].totalRecord, //总的数量
                totalPages = content.biaoti[0].totalPages, //总的页数
                pageSize = content.biaoti[0].pageSize; //每页显示的记录数
            if (pageSize >= totalRecord) {
                for (var i = 0; i < totalRecord; i++) {
                    var kch = content.neirong[i].KCH,
                        kcm = content.neirong[i].KCM,
                        ks = content.neirong[i].KS,
                        kcdm = content.neirong[i].KCDM;
                    Idnumber = content.neirong[i].Idnumber;
                    if (Idnumber != undefined) {
                        html = "<tr class='content-box'><td class='kch'>" + kch + "</td> " + "<td>" + kcm + "</td> " + "<td>" + ks + "</td> " + "<td>" + kcdm + "</td> <td>" + Idnumber + "</td></tr>";
                        str += html;
                    } else {
                        html = "<tr class='content-box'><td class='kch'>" + kch + "</td> " + "<td>" + kcm + "</td> " + "<td>" + ks + "</td> " + "<td>" + kcdm + "</td>+ <td class='add-pic-box'><i class='add-pic'></i></td><td class='delete-pic-box'><i class='delete-pic'></i></td> </tr>";
                        str += html;
                        str2 = false;
                    }
                }
                createa(data);
            } else {
                for (var i = (page - 1) * pageSize; i <= page * pageSize - 1; i++) {
                    if (content.neirong[i] != undefined) {
                        var kch = content.neirong[i].KCH,
                            kcm = content.neirong[i].KCM,
                            ks = content.neirong[i].KS,
                            kcdm = content.neirong[i].KCDM;
                        Idnumber = content.neirong[i].Idnumber;
                        if (Idnumber != undefined) {
                            html = "<tr class='content-box'><td class='kch'>" + kch + "</td> " + "<td>" + kcm + "</td> " + "<td>" + ks + "</td> " + "<td>" + kcdm + "</td> <td>" + Idnumber + "</td></tr>";
                            str += html;
                        } else {
                            html = "<tr class='content-box'><td class='kch'>" + kch + "</td> " + "<td>" + kcm + "</td> " + "<td>" + ks + "</td> " + "<td>" + kcdm + "</td>+ <td class='add-pic-box'><i class='add-pic'></i></td><td class='delete-pic-box'><i class='delete-pic'></i></td> </tr>";
                            str += html;
                            str2 = false;
                        }
                    }
                    //如果最后一页都有值的话
                }
            }
        });
        if (str2) {
            $("#main .main-serarch-box").html("<tr class='box-title'><th>课程号</th><th>课程名</th><th>课时</th><th>课程代码</th><th>身份标识</th></tr>" + str);
            $("#main .content-box:odd").addClass("odd");
        } else {
            $("#main .main-serarch-box").html("<tr class='box-title'><th>课程号</th><th>课程名</th><th>课时</th><th>课程代码</th><th>操作</th><th>操作</th></tr>" + str);
            $("#main .content-box:odd").addClass("odd");
        }
    }

    function loadPage2(data, page) {
        var html = "",
            html2 = "",
            str = "";
        str2 = true;
        $.each(data, function(index, content) {
            var totalRecord = content.biaoti[0].totalRecord, //总的数量
                totalPages = content.biaoti[0].totalPages, //总的页数
                pageSize = content.biaoti[0].pageSize; //每页显示的记录数
            if (pageSize >= totalRecord) {
                for (var i = 0; i < totalRecord; i++) {
                    var kch = content.neirong[i].KCH,
                        kcm = content.neirong[i].KCM,
                        ks = content.neirong[i].KS,
                        kcdm = content.neirong[i].KCDM;
                    Idnumber = content.neirong[i].Idnumber;
                    if (Idnumber != undefined) {
                        html = "<tr class='content-box'><td class='kch'>" + kch + "</td> " + "<td>" + kcm + "</td> " + "<td>" + ks + "</td> " + "<td>" + kcdm + "</td> <td>" + Idnumber + "</td></tr>";
                        str += html;
                    } else {
                        html = "<tr class='content-box'><td class='kch'>" + kch + "</td> " + "<td>" + kcm + "</td> " + "<td>" + ks + "</td> " + "<td>" + kcdm + "</td>+ <td class='add-pic-box'><i class='add-pic'></i></td><td class='delete-pic-box'><i class='delete-pic'></i></td> </tr>";
                        str += html;
                        str2 = false;
                    }
                }
                createa2(data);
            } else {
                for (var i = (page - 1) * pageSize; i <= page * pageSize - 1; i++) {
                    if (content.neirong[i] != undefined) {
                        var kch = content.neirong[i].KCH,
                            kcm = content.neirong[i].KCM,
                            ks = content.neirong[i].KS,
                            kcdm = content.neirong[i].KCDM;
                        Idnumber = content.neirong[i].Idnumber;
                        if (Idnumber != undefined) {
                            html = "<tr class='content-box'><td class='kch'>" + kch + "</td> " + "<td>" + kcm + "</td> " + "<td>" + ks + "</td> " + "<td>" + kcdm + "</td> <td>" + Idnumber + "</td></tr>";
                            str += html;
                        } else {
                            html = "<tr class='content-box'><td class='kch'>" + kch + "</td> " + "<td>" + kcm + "</td> " + "<td>" + ks + "</td> " + "<td>" + kcdm + "</td>+ <td class='add-pic-box'><i class='add-pic'></i></td><td class='delete-pic-box'><i class='delete-pic'></i></td> </tr>";
                            str += html;
                            str2 = false;
                        }
                    }
                    //如果最后一页都有值的话
                }
            }
        });
        if (str2) {
            $("#main .main-serarch-box").html("<tr class='box-title'><th>课程号</th><th>课程名</th><th>课时</th><th>课程代码</th><th>身份标识</th></tr>" + str);
            $("#main .content-box:odd").addClass("odd");
        } else {
            $("#main .main-serarch-box").html("<tr class='box-title'><th>课程号</th><th>课程名</th><th>课时</th><th>课程代码</th><th>操作</th><th>操作</th></tr>" + str);
            $("#main .content-box:odd").addClass("odd");
        }
    }
    //ajax加载其他页的内容
    //for循环的参数判断是关键,索引的控制
    //这个是点击a标签生成查询;
    $(document).on("click", "#main .add-pic", function() {
        $(this).each(function() {
            var r = confirm("是否要添加");
            var str = "";
            var arr = new Array();
            var flag = true;
            if (r) {
                $(this).parent().siblings().each(function(i) {
                    var text = $(this).text();
                    arr[i] = text;
                    str += arr[i];
                });
                var url = "../Handlexuanke";
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    data: {
                        kch: arr[0],
                        kcm: arr[1],
                        ks: arr[2],
                        kcdm: arr[3],
                    },
                    success: function(data) {
                        if (data) {
                            alert("成功!");
                        }
                    },
                    error: function() {
                        alert("已有数据!");
                    }
                });
                // $(this).parent().rotate({
                //     animateTo: 180
                // });
            }
            // $(this).removeClass("add-pic").addClass("delete-pic");
        });
    });
    //添加数据
    $(document).on("click", "#main .delete-pic", function() {
        $(this).each(function() {
            var r = confirm("是否要删除");
            var str = "";
            var arr = new Array();
            var flag = true;
            if (r) {
                $(this).parent().siblings().each(function(i) {
                    var text = $(this).text();
                    arr[i] = text;
                    str += arr[i];
                });
                var url = "../Handlexuankedel";
                $.ajax({
                    url: url,
                    type: "post",
                    dataType: "json",
                    data: {
                        kch: arr[0],
                        kcm: arr[1],
                        ks: arr[2],
                        kcdm: arr[3],
                    },
                    success: function(data) {
                        if (data) {
                            alert("删除成功!");
                        } else {
                            alert("还没有数据!");
                        }
                    },
                    error: function() {
                        alert("删除失败!");
                    }
                });
            }
        });
    });
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