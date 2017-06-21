$("#main_body").find(".info").css("display", "none");
$("#main_body").find(".info2").css("display", "none");
$("#main_body").find(".info3").css("display", "none");
$("#main_body").find(".main_box_right").css("display", "block");
$("#main_body").find(".add_box").css("display", "none");
$("#main_body").find(".add_box2").css("display", "none");
$("#main_body").find(".add_box3").css("display", "none");
var page = new Paging({
    url: "../Deladmin",
    pagewrap: ".pager6",
    content_title: "<th>姓名</th><th>性别</th><th>年龄</th><th>身份标识</th><th>操作</th><th></th>",
    user_defined: "<td><a href='javascript:void(0)' class='del_admin'>删除</a></td>"
});
$(document).on("click", ".del_admin", function() {
    if (!$(this).hasClass("select")) {
        $(this).addClass("select");
        var r = confirm("是否要删除");
        var str = "";
        var arr = new Array();
        var flag = true;
        if (r) {
            var text = $(this).parent().prev().text();
            var url = "../Deladmin";
            $.ajax({
                url: url,
                type: "post",
                dataType: "json",
                data: {
                    Idnumber: text,
                },
                success: function(data) {
                    if (data) {
                        alert("删除成功!");
                    }
                },
                error: function() {
                    alert("删除失败!");
                }
            });
        }
        return false;
    }
});