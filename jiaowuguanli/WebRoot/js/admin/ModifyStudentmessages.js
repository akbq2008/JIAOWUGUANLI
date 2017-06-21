 $("#main_body").find(".info").css("display", "none");
 $("#main_body").find(".info2").css("display", "none");
 $("#main_body").find(".info3").css("display", "none");
 $("#main_body").find(".main_box_right").css("display", "block");
 $("#main_body").find(".add_box").css("display", "none");
 $("#main_body").find(".add_box2").css("display", "none");
 $("#main_body").find(".add_box3").css("display", "none");
 var page = new Paging({
     url: "../ModifyStudentmessages",
     pagewrap: ".pager2",
     content_title: "<th>姓名</th><th>性别</th><th>年龄</th><th>专业</th><th>院系</th><th>身份标识</th><th>操作</th>",
     user_defined: "<td><a href='javascript:void(0)' class='student_modify'>修改</a></td>"
 });
 (function() {
     var td_value = "",
         td_text = "";
     $(document).on("click", ".student_modify", function() {
         //获取文本
         $(this).each(function() {
             create_text($(this));
             if (!$(this).hasClass("current")) {
                 $(".student_modify").removeClass("current"); //删除全部的
                 $(this).addClass("current").text("确定"); //给当前的加上
                 $(".handon").removeClass("current"); //
                 $(this).addClass("handon").removeClass("student_modify");
                 $(".handon").text("修改").removeClass("handon").addClass("student_modify"); //
                 $(this).text("确定").removeClass("student_modify").addClass("handon");
                 $(this).parent().siblings().children("p").css("display", "none");
                 $(this).parent().parent().siblings().children().children("p").css("display", "block"); //点击修改 确定 再点其他的修改
                 $(".td_input").css("display", "none"); //防止多个Input同时出现
                 $(this).parent().siblings().children(".td_input").css("display", "block"); //当前的显示
             } //判断  不含有current的han
             else {
                 $(this).text("确定").removeClass("student_modify").addClass("handon"); //当前连续点击2次
                 $(".td_input").css("display", "none");
                 $(this).parent().siblings().children(".td_input").css("display", "block");
                 $(this).parent().siblings().children("p").css("display", "none");
             } //含有currentPage的 
         }); //当前student_modify
         return false;
     });
     $(document).on("click", ".handon", function() {
         $(this).parent().siblings().children("p").css("display", "block");
         $(".td_input").css("display", "none");
         $(this).each(function() {
             get_value($(this));
             if (!$(this).hasClass("current")) {
                 $(".handon").removeClass("current");
                 $(this).addClass("current");
                 $(".student_modify").removeClass("current");
                 $(this).addClass("student_modify").removeClass("handon");
                 $(".handon").text("修改").removeClass("handon").addClass("student_modify");
                 //不含有current的handon点击
             } else {
                 //
                 $(".handon").text("修改").removeClass("handon").addClass("student_modify");
                 $(".td_input").css("display", "none"); //所有文本隐藏、
                 $(".handon").parent().siblings().children("p").css("display", "block");
             }
         });
         if ($.trim(td_value) != $.trim(td_text)) {
             //防止点击了多个后又直接关闭的
             $.ajax({
                 url: "../ModifyStudentmessages",
                 type: "post",
                 dataType: "json",
                 data: {
                     XM: td_value[0],
                     XB: td_value[1],
                     NL: td_value[2],
                     ZY: td_value[3],
                     YX: td_value[4],
                     Idnumber: td_value[5],
                     Idnumber_old: td_text[5]
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
         obj.parent().siblings().children(".td_input").each(function() {
             var st = $(this).val();
             str += st + ",";
             str = str.split(",");
         });
         td_value = str;
         return td_value;
     }

     function create_text(obj) {
         //obj当前student_modify;
         //td
         var text = "";
         obj.parent().siblings().each(function() {
             var txt = $(this).text();
             var leng = obj.parent().siblings().children("p").length;
             if (!$(this).hasClass("hasadded")) {
                 $(this).addClass("hasadded");
                 $(this).append("<input type='text' style='margin:10px 0 5px 20px;width:160px;height:20px;lineheight:20px; ' class='td_input' value='" + txt + "'/>");
             }
             $(".td_input").css("display", "block");
             text += txt + ",";
             text = text.split(",");
         });
         td_text = text;
         return td_text;
     }
 })();