  $("#main_body").find(".info").css("display", "none");
  $("#main_body").find(".info2").css("display", "none");
  $("#main_body").find(".info3").css("display", "none");
  $("#main_body").find(".main_box_right").css("display", "block");
  $("#main_body").find(".add_box").css("display", "none");
  $("#main_body").find(".add_box2").css("display", "none");
  $("#main_body").find(".add_box3").css("display", "none");
  var page = new Paging({
      url: "../Delplan",
      pagewrap: ".pager14",
      content_title: "<th>课程号</th><th>课程名</th><th>教师号</th><th>任课教师</th><th>上课地点</th><th>上课时间</th><th>上课班级</th><th>操作</th>",
      user_defined: "<td><a href='javascript:void(0)' class='del_plan'>删除</a></td>"
  });
  $(document).on("click", ".del_plan", function() {
      if (!$(this).hasClass("select")) {
          $(this).addClass("select");
          var r = confirm("ÊÇ·ñÒªÉ¾³ý");
          var arr = new Array();
          var flag = true;
          if (r) {
              $(this).parent().siblings().each(function(i) {
                  var text = $(this).text();
                  arr[i] = text;
              });
              var url = "../Delplan";
              $.ajax({
                  url: url,
                  type: "post",
                  dataType: "json",
                  data: {
                      JSH: arr[0],
                      KCH: arr[2],
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