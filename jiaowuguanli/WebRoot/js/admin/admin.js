$(function() {
   $("#main_body").find(".main_box_left dd").css("display", 'none');
    $("#main_body").find(".main_box_left dt").each(function() {
        $(this).click(function() {
            $(this).addClass("currentdt ");
            $(this).parent().siblings().children("dt").removeClass('currentdt');
            $(this).siblings("dd").css("display", "block");
            $(this).parent().siblings().children("dt").siblings("dd").css("display", "none");
        });
    });
    $("#main_body").find(".main_box_left dd").each(function() {
        $(this).click(function() {
            $(this).addClass("dd_checked");
            var url1 = "url(../admin-images/main_body_left.png) no-repeat -5px -5px",
                url2 = "url(../admin-images/main_body_left.png) no-repeat -5px -47px";
            if ($(this).hasClass("dd_checked")) {
                $(this).siblings().removeClass("dd_checked");
                $(this).parent().siblings().children("dd").removeClass("dd_checked");
                $(this).siblings().children("dd i").css("background", url1);
                $(this).parent().siblings().children("dd").children("i").css("background", url1);
                $(this).children("i").css("background", url2);
            }
        });
    });
    $("#top_content").find(".top_content_pic span").each(function() {
        var classname = $(this).attr("class");
        $(this).mouseover(function() {
            if (classname == "top_main_page") {
                $(this).children('i').css("background", "url(../admin-images/main_body_left.png) no-repeat -5px -173px");
                $(this).children("p").css("color", "#f93");
            } else if (classname == "top_account_user") {
                $(this).children('i').css("background", "url(../admin-images/main_body_left.png) no-repeat -5px -89px");
                $(this).children("p").css("color", "#f93");
            } else {
                $(this).children('i').css("background", "url(../admin-images/main_body_left.png) no-repeat -5px -131px");
                $(this).children("p").css("color", "#f93");
            }
        }).mouseout(function(event) {
            /* Act on the event */
            if (classname == "top_main_page") {
                $(this).children('i').css("background", "url(../admin-images/top_content_picture.png) no-repeat -5px -299px");
                $(this).children("p").css("color", "black");
            } else if (classname == "top_account_user") {
                $(this).children('i').css("background", "url(../admin-images/top_content_picture.png) no-repeat -5px -47px");
                $(this).children("p").css("color", "black");
            } else {
                $(this).children('i').css("background", "url(../admin-images/top_content_picture.png) no-repeat -5px -215px");
                $(this).children("p").css("color", "black");
            }
        });
    });
    $("#top_content").find(".top_exit").click(function() {
        var flag = confirm("确定要退出吗?");
        if (flag) {
            window.location = "http://localhost:8080/demo9/login.html";
        }
    });
});
$(function() {
    // 将url提升到全局变量,
    $("#main_body").find(".main_box_left dd").each(function() {
        $(this).click(function() {
            if ($(this).hasClass("dd_checked")) {
                $(this).siblings().removeClass("dd_checked");
                $(this).parent().siblings().children("dd").removeClass("dd_checked");
                if (!$(this).hasClass("select")) {
                    $(this).addClass("select");
                    $(this).siblings().removeClass("select");
                    $(this).parent().siblings().children("dd").removeClass("select");
                    var txt = "";
                    var clas = $(this).attr("class");
                    var add = "";
                    txt = clas.split(" ");
                    add = "../js/admin/" + txt[0] + ".js";
                    $.getScript(add);
                }
            }
        });
    });
});