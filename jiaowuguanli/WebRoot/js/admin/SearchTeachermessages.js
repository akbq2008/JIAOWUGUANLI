 $("#main_body").find(".info").css("display", "none");
 $("#main_body").find(".info2").css("display", "none");
 $("#main_body").find(".info3").css("display", "none");
 $("#main_body").find(".main_box_right").css("display", "block");
 $("#main_body").find(".add_box").css("display", "none");
 $("#main_body").find(".add_box2").css("display", "none");
 $("#main_body").find(".add_box3").css("display", "none");
 var page = new Paging({
     url: "../SearchTeachermessages",
     pagewrap: ".pager3",
     content_title: "<th>教师号</th><th>姓名</th><th>性别</th><th>年龄</th><th>职称</th><th>院系</th><th>身份标识</th>"
 });