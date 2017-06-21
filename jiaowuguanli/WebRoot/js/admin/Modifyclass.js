 $("#main_body").find(".info").css("display", "none");
 $("#main_body").find(".info2").css("display", "none");
 $("#main_body").find(".info3").css("display", "none");
 $("#main_body").find(".main_box_right").css("display", "block");
 $("#main_body").find(".add_box").css("display", "none");
 $("#main_body").find(".add_box2").css("display", "none");
 $("#main_body").find(".add_box3").css("display", "none");
 var page = new Paging({
     url: "../Modifyclass",
     pagewrap: ".pager8",
     content_title: "<th>课程名</th><th>课时</th><th>课程代码</th><th>操作</th><th></th><th></th><th></th>",
     user_defined: "<td><a href='javascript:void(0)' class='class_modify'>修改</a></td>"
 });
 (function() {
     var td_value = "",
         td_text = "";
     $(document).on("click", ".class_modify", function() {
         //获取文本
         $(this).each(function() {
             create_text($(this));
             if (!$(this).hasClass("current")) {
                 $(".class_modify").removeClass("current"); //删除全部的
                 $(this).addClass("current").text("确定"); //给当前的加上
                 $(".handon3").removeClass("current"); //
                 $(this).addClass("handon3").removeClass("class_modify");
                 $(".handon3").text("修改").removeClass("handon3").addClass("class_modify"); //
                 $(this).text("确定").removeClass("class_modify").addClass("handon3");
                 $(this).parent().siblings().children("p").css("display", "none");
                 $(this).parent().parent().siblings().children().children("p").css("display", "block"); //点击修改 确定 再点其他的修改
                 $(".td_input3").css("display", "none"); //防止多个Input同时出现
                 $(this).parent().siblings().children(".td_input3").css("display", "block"); //当前的显示
             } //判断  不含有current的han
             else {
                 $(this).text("确定").removeClass("class_modify").addClass("handon3"); //当前连续点击2次
                 $(".td_input3").css("display", "none");
                 $(this).parent().siblings().children(".td_input3").css("display", "block");
                 $(this).parent().siblings().children("p").css("display", "none");
             } //含有currentPage的 
         }); //当前class_modify
         return false;
     });
     $(document).on("click", ".handon3", function() {
         $(this).parent().siblings().children("p").css("display", "block");
         $(".td_input3").css("display", "none");
         $(this).each(function() {
             get_value($(this));
             if (!$(this).hasClass("current")) {
                 $(".handon3").removeClass("current");
                 $(this).addClass("current");
                 $(".class_modify").removeClass("current");
                 $(this).addClass("class_modify").removeClass("handon3");
                 $(".handon3").text("修改").removeClass("handon3").addClass("class_modify");
                 //不含有current的handon3点击
             } else {
                 //
                 $(".handon3").text("修改").removeClass("handon3").addClass("class_modify");
                 $(".td_input3").css("display", "none"); //所有文本隐藏、
                 $(".handon3").parent().siblings().children("p").css("display", "block");
             }
         });
         if ($.trim(td_value) != $.trim(td_text)) {
             //防止点击了多个后又直接关闭的
             $.ajax({
                 url: "../Modifyclass",
                 type: "post",
                 dataType: "json",
                 data: {
                     KCM: td_value[0],
                     KS: td_value[1],
                     KCDM: td_value[2],
                     KCDM_old: td_text[2]
                 },
                 error: function() {
                     /* Act on the event */
                     alert("身份标识重复!");
                 },
                 success: function(data) {
                     if (data == false) {
                         alert("身份标识不存在!");
                     } else {
                         alert("修改成功!");
                     }
                 }
             });
         } //异步
         return false;
     }); //提交
     function get_value(obj) {
         var str = "";
         obj.parent().siblings().children(".td_input3").each(function() {
             var st = $(this).val();
             str += st + ",";
             str = str.split(",");
         });
         td_value = str;
         return td_value;
     }

     function create_text(obj) {
         //obj当前class_modify;
         //td
         var text = "";
         obj.parent().siblings().each(function() {
             var txt = $(this).text();
             var leng = obj.parent().siblings().children("p").length;
             if (!$(this).hasClass("hasadded")) {
                 $(this).addClass("hasadded");
                 $(this).append("<input type='text' style='margin:10px 0 5px 20px;width:160px;height:20px;lineheight:20px; ' class='td_input3' value='" + txt + "'/>");
             }
             $(".td_input3").css("display", "block");
             text += txt + ",";
             text = text.split(",");
         });
         td_text = text;
         return td_text;
     }
 })();