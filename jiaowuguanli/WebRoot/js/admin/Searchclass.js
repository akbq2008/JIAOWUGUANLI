 $("#main_body").find(".info").css("display", "none");
 $("#main_body").find(".info2").css("display", "none");
 $("#main_body").find(".info3").css("display", "none");
 $("#main_body").find(".main_box_right").css("display", "block");
 $("#main_body").find(".add_box").css("display", "none");
 $("#main_body").find(".add_box2").css("display", "none");
 $("#main_body").find(".add_box3").css("display", "none");
 var page = new Paging({
     url: "../Searchclass",
     pagewrap: ".pager7",
     content_title: "<th>课程号</th><th>课程名</th><th>课时</th><th>课程代码</th><th></th><th></th><th></th>"
 });