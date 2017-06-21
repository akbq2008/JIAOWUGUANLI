 $("#main_body").find(".info").css("display", "none");
 $("#main_body").find(".info2").css("display", "none");
 $("#main_body").find(".info3").css("display", "none");
 $("#main_body").find(".main_box_right").css("display", "block");
 $("#main_body").find(".add_box").css("display", "none");
 $("#main_body").find(".add_box2").css("display", "none");
 $("#main_body").find(".add_box3").css("display", "none");
 var page = new Paging({
     url: "../ModifyTeachermessages",
     pagewrap: ".pager3",
     content_title: "<th>姓名</th><th>性别</th><th>年龄</th><th>专业</th><th>院系</th><th>身份标识</th><th>操作</th>",
     user_defined: "<td><a href='javascript:void(0)' class='teacher_modify'>修改</a></td>"
 });
 (function() {
     var td_value = "",
         td_text = "";
     $(document).on("click", ".teacher_modify", function() {
         //获取文本
         $(this).each(function() {
             create_text($(this));
             if (!$(this).hasClass("current")) {
                 $(".teacher_modify").removeClass("current"); //删除全部的
                 $(this).addClass("current").text("确定"); //给当前的加上
                 $(".handon2").removeClass("current"); //
                 $(this).addClass("handon2").removeClass("teacher_modify");
                 $(".handon2").text("修改").removeClass("handon2").addClass("teacher_modify"); //
                 $(this).text("确定").removeClass("teacher_modify").addClass("handon2");
                 $(this).parent().siblings().children("p").css("display", "none");
                 $(this).parent().parent().siblings().children().children("p").css("display", "block"); //点击修改 确定 再点其他的修改
                 $(".td_input2").css("display", "none"); //防止多个Input同时出现
                 $(this).parent().siblings().children(".td_input2").css("display", "block"); //当前的显示
             } //判断  不含有current的han
             else {
                 $(this).text("确定").removeClass("teacher_modify").addClass("handon2"); //当前连续点击2次
                 $(".td_input2").css("display", "none");
                 $(this).parent().siblings().children(".td_input2").css("display", "block");
                 $(this).parent().siblings().children("p").css("display", "none");
             } //含有currentPage的 
         }); //当前teacher_modify
         return false;
     });
     $(document).on("click", ".handon2", function() {
         $(this).parent().siblings().children("p").css("display", "block");
         $(".td_input2").css("display", "none");
         $(this).each(function() {
             get_value($(this));
             if (!$(this).hasClass("current")) {
                 $(".handon2").removeClass("current");
                 $(this).addClass("current");
                 $(".teacher_modify").removeClass("current");
                 $(this).addClass("teacher_modify").removeClass("handon2");
                 $(".handon2").text("修改").removeClass("handon2").addClass("teacher_modify");
                 //不含有current的handon2点击
             } else {
                 //
                 $(".handon2").text("修改").removeClass("handon2").addClass("teacher_modify");
                 $(".td_input2").css("display", "none"); //所有文本隐藏、
                 $(".handon2").parent().siblings().children("p").css("display", "block");
             }
         });
         if ($.trim(td_value) != $.trim(td_text)) {
             $.ajax({
                 url: "../ModifyTeachermessages",
                 type: "post",
                 dataType: "json",
                 data: {
                     XM: td_value[0],
                     XB: td_value[1],
                     NL: td_value[2],
                     ZC: td_value[3],
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
             }); //异步
         }
         return false;
     }); //提交
     function get_value(obj) {
         var str = "";
         obj.parent().siblings().children(".td_input2").each(function() {
             var st = $(this).val();
             str += st + ",";
             str = str.split(",");
         });
         td_value = str;
         return td_value;
     }

     function create_text(obj) {
         //obj当前teacher_modify;
         //td
         var text = "";
         obj.parent().siblings().each(function() {
             var txt = $(this).text();
             var leng = obj.parent().siblings().children("p").length;
             if (!$(this).hasClass("hasadded")) {
                 $(this).addClass("hasadded");
                 $(this).append("<input type='text' style='margin:10px 0 5px 20px;width:160px;height:20px;lineheight:20px; ' class='td_input2' value='" + txt + "'/>");
             }
             $(".td_input2").css("display", "block");
             text += txt + ",";
             text = text.split(",");
         });
         td_text = text;
         return td_text;
     }
 })();