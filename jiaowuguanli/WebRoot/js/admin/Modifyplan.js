 $("#main_body").find(".info").css("display", "none");
 $("#main_body").find(".info2").css("display", "none");
 $("#main_body").find(".info3").css("display", "none");
 $("#main_body").find(".main_box_right").css("display", "block");
 $("#main_body").find(".add_box").css("display", "none");
 $("#main_body").find(".add_box2").css("display", "none");
 $("#main_body").find(".add_box3").css("display", "none");
 var page = new Paging({
     url: "../Modifyplan",
     pagewrap: ".pager12",
     content_title: "<th>教师号</th><th>课程名</th><th>课程号</th><th>任课教师</th><th>上课地点</th><th>上课时间</th><th>上课班级</th><th>操作</th>",
     user_defined: "<td><a href='javascript:void(0)' class='plan_modify'>修改</a></td>"
 });
 (function() {
     var td_value = "",
         td_text = "";
     $(document).on("click", ".plan_modify", function() {
         //获取文本
         $(this).each(function() {
             create_text($(this));
             if (!$(this).hasClass("current")) {
                 $(".plan_modify").removeClass("current"); //删除全部的
                 $(this).addClass("current").text("确定"); //给当前的加上
                 $(".handon4").removeClass("current"); //
                 $(this).addClass("handon4").removeClass("plan_modify");
                 $(".handon4").text("修改").removeClass("handon4").addClass("plan_modify"); //
                 $(this).text("确定").removeClass("plan_modify").addClass("handon4");
                 $(this).parent().siblings().children("p").css("display", "none");
                 $(this).parent().parent().siblings().children().children("p").css("display", "block"); //点击修改 确定 再点其他的修改
                 $(".td_input4").css("display", "none"); //防止多个Input同时出现
                 $(this).parent().siblings().children(".td_input4").css("display", "block"); //当前的显示
             } //判断  不含有current的han
             else {
                 $(this).text("确定").removeClass("plan_modify").addClass("handon4"); //当前连续点击2次
                 $(".td_input4").css("display", "none");
                 $(this).parent().siblings().children(".td_input4").css("display", "block");
                 $(this).parent().siblings().children("p").css("display", "none");
             } //含有currentPage的 
         }); //当前plan_modify
         return false;
     });
     $(document).on("click", ".handon4", function() {
         $(this).parent().siblings().children("p").css("display", "block");
         $(".td_input4").css("display", "none");
         $(this).each(function() {
             get_value($(this));
             if (!$(this).hasClass("current")) {
                 $(".handon4").removeClass("current");
                 $(this).addClass("current");
                 $(".plan_modify").removeClass("current");
                 $(this).addClass("plan_modify").removeClass("handon4");
                 $(".handon4").text("修改").removeClass("handon4").addClass("plan_modify");
                 //不含有current的handon4点击
             } else {
                 //
                 $(".handon4").text("修改").removeClass("handon4").addClass("plan_modify");
                 $(".td_input4").css("display", "none"); //所有文本隐藏、
                 $(".handon4").parent().siblings().children("p").css("display", "block");
             }
         });
         if ($.trim(td_value) != $.trim(td_text)) {
             //防止点击了多个后又直接关闭的
             $.ajax({
                 url: "../Modifyplan",
                 type: "post",
                 dataType: "json",
                 data: {
                     JSH: td_value[0],
                     KCM: td_value[1],
                     KCH: td_value[2],
                     XM: td_value[3],
                     SKDD: td_value[4],
                     SKSJ: td_value[5],
                     SKBJ: td_value[6],
                     JSH_old: td_text[0],
                     KCH_old: td_text[2],
                 },
                 error: function() {
                     /* Act on the event */
                     alert("身份标识重复!");
                 },
                 success: function(data) {
                     if (data == false) {
                         alert("课程号或教师号不存在!");
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
         obj.parent().siblings().children(".td_input4").each(function() {
             var st = $(this).val();
             str += st + ",";
             str = str.split(",");
         });
         td_value = str;
         return td_value;
     }

     function create_text(obj) {
         //obj当前plan_modify;
         //td
         var text = "";
         obj.parent().siblings().each(function() {
             var txt = $(this).text();
             var leng = obj.parent().siblings().children("p").length;
             if (!$(this).hasClass("hasadded")) {
                 $(this).addClass("hasadded");
                 $(this).append("<input type='text' style='margin:10px 0 5px 20px;width:160px;height:20px;lineheight:20px; ' class='td_input4' value='" + txt + "'/>");
             }
             $(".td_input4").css("display", "block");
             text += txt + ",";
             text = text.split(",");
         });
         td_text = text;
         return td_text;
     }
 })();