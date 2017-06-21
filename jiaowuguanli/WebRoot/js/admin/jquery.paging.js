!(function(window, document) {
    function Paging(options) {
        this.options = {
            wrapcontent: "#main_body .result_box", //容器具体内容
            pagewrap: "", //要显示的页码的容器
            wrapid: "#main_body", // 容器外层id
            url: "",
            user_defined: "",
            content_title: "" //标题
        };
        if (Object.prototype.toString.call(options) == "[object Object]") { //判断传入参数类型
            for (var i in options) { //根据传入的参数，修改默认参数值
                this.options[i] = options[i];
            }
        }
        methods.init(this.options.url, this.options.wrapcontent, this.options.wrapid, this.options.content_title, this.options.pagewrap, this.options.user_defined);
        // methods.turninto(this.options.url, this.options.wrapid, this.options.wrapcontent, this.options.content_title, this.options.pagewrap);
        methods.pager_a(this.options.url, this.options.wrapcontent, this.options.wrapid, this.options.content_title, this.options.pagewrap, this.options.user_defined);
    }
    var methods = {
        init: function(url, wrapcontent, wrapid, content_title, pagewrap, user_defined) {
            $.ajax({
                url: url,
                type: "post",
                dataType: "JSON",
                success: function(data) {
                    methods.afterLoad(data, content_title, wrapcontent, wrapid, pagewrap, user_defined);
                    //接收传回来的数据和标题
                },
                error: function(data) {
                    alert("error");
                }
            });
        },
        //标题设置
        content_modify: function(totalcontent, index, col, user_defined) {
            var linetd = "",
                linecontent = "";
            for (var i = 0; i < col; i++) {
                if (index[i] != undefined) {
                    linetd += "<td><p>" + index[i] + "</p></td>"; //将后台返回的内容进行组装
                }
            }
            linecontent = "<tr>" + linetd + user_defined + "</tr>"; //将内容组装成行
            totalcontent += linecontent; //将全部内容组装
            return totalcontent; //返回内容
        },
        //根据返回的内容组装
        afterLoad: function(data, title, wrapcontent, wrapid, pagewrap, user_defined) {
            //数据,      容器具体内容,  容器外层id  包裹层id
            var str = "";
            $.each(data, function(index, content) {
                var totalRecord = content.biaoti[0].totalRecord, //总的数量
                    totalPages = content.biaoti[0].totalPages, //总的页数
                    pageSize = content.biaoti[0].pageSize, //每页显示的记录数
                    lineRecord = content.biaoti[0].lineRecord;
                if (totalRecord >= 1) {
                    if (pageSize >= totalRecord) { //显示一页
                        for (var i = 0; i < totalRecord; i++) {
                            if (content.neirong[i] != undefined) {
                                str = methods.content_modify(str, content.neirong[i], lineRecord, user_defined); //将作用域传过去
                                //将拼装的返回值返回
                            }
                        }
                        methods.createa(data, wrapid, pagewrap);
                    } else {
                        for (var i = 0; i < pageSize; i++) { //多页显示
                            if (content.neirong[i] != undefined) {
                                str = methods.content_modify(str, content.neirong[i], lineRecord, user_defined); //将作用域传过去
                            }
                        }
                        methods.createa(data, wrapid, pagewrap);
                    }
                } else {
                    alert("没有数据");
                }
            });
            $(wrapcontent).html("<tr class='box-title'>" + title + "</tr>" + str);
        },
        /*生成数据*/
        loadPage: function(data, page, title, wrapcontent, wrapid, pagewrap, user_defined) {
            var str = "";
            $.each(data, function(index, content) {
                var totalRecord = content.biaoti[0].totalRecord, //总的数量
                    totalPages = content.biaoti[0].totalPages, //总的页数
                    pageSize = content.biaoti[0].pageSize, //每页显示的记录数
                    lineRecord = content.biaoti[0].lineRecord;
                if (pageSize >= totalRecord) {
                    for (var i = 0; i < totalRecord; i++) {
                        str = methods.content_modify(str, content.neirong[i], lineRecord, user_defined);
                    }
                    methods.createa(data, wrapid, pagewrap);
                } else {
                    for (var i = (page - 1) * pageSize; i <= page * pageSize - 1; i++) {
                        if (content.neirong[i] != undefined) {
                            str = methods.content_modify(str, content.neirong[i], lineRecord, user_defined);
                        }
                    }
                    methods.createa(data, wrapid, pagewrap);
                }
            });
            $(wrapcontent).html("<tr class='box-title'>" + title + "</tr>" + str);
        },
        // 点击页码加载数据
        createa: function(data, wrapid, pagewrap) {
            var html = "";
            for (var i = 1; i <= data[0].biaoti[0].totalPages; i++) {
                html += "<a href='javascript:void(0)' class='page_" + i + "'>" + i + "</a>";
            }
            var flag = $(wrapid).find(pagewrap);
            if (!flag.hasClass("page_checked")) {
                flag.addClass("page_checked");
                $(wrapid).find(pagewrap).append("<a href='javascript:void(0);' class='Prev_p'>Prev </a>" + html + "<a href='javascript:void(0);' class='Next_n'>Next</a >");
                // <button class='turninto'>跳转</button><input type='text'  class='input-txt' name='text' style='width:30px;border:1px solid black' value=''/>
            } //防止有多个pager生成
            if (!$(wrapid).find(pagewrap).hasClass("select")) {
                $(wrapid).find(pagewrap).addClass("select");
                $(wrapid).find(pagewrap).siblings().removeClass("select");
                if ($(wrapid).find(pagewrap).hasClass("select")) {
                    $(wrapid).find(pagewrap).css("display", "block");
                    $(wrapid).find(pagewrap).siblings().css("display", "none");
                    $(wrapid).find(".result_box").css("display", "block");
                    $(wrapid).find(pagewrap).siblings().children().removeClass("currentPage");
                    //去除相同辈的currentPage
                }
            }
            //解决点击一个就生成一个，草拟吗的这段垃圾代码弄了我这么多天
            $(wrapid).find(pagewrap + " a[class!=Prev_p][class!=Next_n]").each(function() {
                $(this).click(function() {
                    var num = $(".currentPage").attr("class");
                    var number = num.split(" ");
                    $('.' + number[0]).removeClass("currentPage");
                    $(this).addClass("currentPage");
                });
            }); //点击a标签的时候让currentPage移动
            $(wrapid).find(pagewrap + " a[class!=Prev_p][class!=Next_n]").each(function() {
                var page_1 = $(".page_1");
                if (!page_1.hasClass("currentPage") && !page_1.siblings().hasClass("currentPage")) {
                    if ($(wrapid).find(pagewrap).hasClass("select")) {
                        $(".page_1").addClass("currentPage");
                    }
                    if (!$(wrapid).find(pagewrap).siblings().hasClass("select")) {
                        $(wrapid).find(pagewrap).siblings().children().removeClass("currentPage");
                    }
                }
            }); //初始化currentPage
            var length = $(wrapid).find(pagewrap + " a").length;
            if (length <= 3) {
                // $(".turninto").css("display", "none");
                // $(".input-txt").css("display", "none");
                $(".Prev_p").css("display", "none");
                $(".Next_n").css("display", "none");
            } else if (length > 1) {
                $(".page_1").css("left", "50%");
                $(".Prev_p").css("display", "block");
                $(".Next_n").css("display", "block");
            }
            //如果单页显示的话，就隐藏其他按钮
        },
        // 生成页码
        pager_a: function(url, wrapcontent, wrapid, content_title, pagewrap, user_defined) {
                $(document).on("click", wrapid + " " + pagewrap + " a", function(e) {
                    $(this).each(function() {
                        var cur = $(wrapid).find(".currentPage");
                        var pagenum = $(this).attr("class");
                        var number = $(wrapid).find(".currentPage").attr("class");
                        var num = number.split(" ");
                        var nump = num[0].substring(5);
                        nump = parseInt(nump);
                        if (pagenum != "Prev_p" && pagenum != "Next_n") {
                            if (!$(this).hasClass("select")) {
                                $(this).addClass("select");
                                $(this).siblings().removeClass("select");
                                $.ajax({
                                    url: url,
                                    type: "get",
                                    dataType: "JSON",
                                    success: function(data) {
                                        methods.loadPage(data, nump, content_title, wrapcontent, wrapid, pagewrap, user_defined);
                                    }
                                });
                            }
                        } else if (pagenum == "Prev_p") {
                            if (nump > 1) {
                                cur.removeClass("currentPage"); //删除其他容器内的currentPage
                                $(pagewrap).children(".page_" + (nump - 1)).addClass("currentPage");
                                $.ajax({
                                    url: url,
                                    type: "get",
                                    dataType: "JSON",
                                    success: function(data) {
                                        methods.loadPage(data, nump - 1, content_title, wrapcontent, wrapid, pagewrap, user_defined);
                                    }
                                });
                            }
                        } else if (pagenum == "Next_n") {
                            var length = $(wrapid).find(pagewrap + " a").length;
                            if (nump < (length - 2)) {
                                cur.removeClass("currentPage");
                                $(pagewrap).children(".page_" + (nump + 1)).addClass("currentPage");
                                $.ajax({
                                    url: url,
                                    type: "get",
                                    dataType: "JSON",
                                    success: function(data) {
                                        methods.loadPage(data, (nump + 1), content_title, wrapcontent, wrapid, pagewrap, user_defined);
                                    }
                                });
                            }
                        }
                    });
                }); //页码点击跳转
            }
            // turninto: function(url, wrapid, wrapcontent, content_title, pagewrap) {
            //     $(document).on("click", ".turninto", function() {
            //         var txt = $(wrapid).find(".input-txt").val().trim();
            //         var cur = $(wrapid).find(".currentPage");
            //         var str = "",
            //             str2 = "",
            //             name = "";
            //         $(wrapid).find(pagewrap + " a").each(function() {
            //             if (!$(this).hasClass("currentPage")) {
            //                 var id = $(this).attr("class"), //不包含currentPage的class
            //                     st = "";
            //                 str2 = id.substring(5) + ","; //对没有currentPage的class属性值进行操作
            //                 //对有currentPage的class属性单独操作
            //                 // alert(str2);
            //                 var classname = cur.attr("class");
            //                 var classname2 = classname.split(" "); //因为classname值为 page_1 currentPage这种形式，先分割成数组
            //                 name = classname2[0].substring(5); //再对索引为0的数组进行截取5以后的字符
            //                 str += str2;
            //             }
            //         });
            //         str += name;
            //         // alert(str.indexOf(txt));
            //         // alert(str);
            //         // 对class属性名字中有currentPage和没有currentPage的分开切割字符串然后组装，
            //         // 最后通过str.indexOf(txt)>0,判断str中是否有txt字符串;
            //         if (str.indexOf(txt) >= 0 && str != "") {
            //             if (txt != "") {
            //                 cur.removeClass("currentPage");
            //                 alert("s");
            //                 $(wrapid).find(pagewrap + " a[class!=Prev_p][class!=Next_n]").each(function() {
            //                     if (!$(pagewrap).children().hasClass("currentPage")) {
            //                         alert(1);
            //                         $(pagewrap).children(".page_" + txt).addClass("currentPage");
            //                     }
            //                 });
            //                 $(wrapid).find(".input-txt").val(" ");
            //                 $.ajax({
            //                     url: url,
            //                     type: "get",
            //                     dataType: "JSON",
            //                     success: function(data) {
            //                         methods.loadPage(data, txt, content_title, wrapcontent, wrapid, pagewrap);
            //                     }
            //                 });
            //             }
            //         } else if (str.indexOf(txt) < 0 && str != "") {
            //             alert("不包含当前页");
            //             $(wrapid).find(".input-txt").val(" ");
            //         } else {
            //             alert("error");
            //         }
            //     });
            // },
            //页码跳转
    };
    window.Paging = Paging;
})(window, document);