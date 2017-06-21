 
 $("#main_body").find(".info").css("display", "none");
 $("#main_body").find(".info2").css("display", "none");
 $("#main_body").find(".info3").css("display", "none");
 $("#main_body").find(".main_box_right").css("display", "none");
 $("#main_body").find(".add_box").css("display", "block");
 $("#main_body").find(".add_box2").css("display", "none");
 $("#main_body").find(".add_box3").css("display", "none");
 var obj = $("#main_body").find(".add_box");
 if (!obj.hasClass("checked")) {
     obj.addClass("checked");
     $("#main_body").find(".add_box").append("  <div class='form_box'><form action='' method='post' id='form'>" + "<p><label>姓名</label><input type='text' autocomplete='off' placeholder='请输入姓名' name='XM' class='addadmin_xm'/></p>" + "<p><label>性别</label><input type='text' autocomplete='off' placeholder='请输入性别' name='XB' class='addadmin_xb'/></p>" + "<p> <label>年龄</label><input type='text' autocomplete='off' placeholder='请输入年龄' name='NL' class='addadmin_nl'/></p>" + "<p> <label>身份标识</label><input type='text' autocomplete='off' placeholder='请输入身份标识' name='Idnumber' class='addadmin_Idnumber'/></p>" + "<p><input type='submit' value='提交' class='btn' style='cursor:pointer;margin-left:120px;background:#4490f7;font-size:18px;color:white;font-weight: 550;'></p></form></div>");
 }
 jQuery.validator.addMethod("chinese", function(value, element) {
     var chinese = /^[\u4e00-\u9fa5]+$/;
     return this.optional(element) || (chinese.test(value));
 }, "*只能输入中文");
 //调用自定义方法
 $("#form").validate({
     rules: {
         XM: {
             required: true,
             maxlength: 10,
             minlength: 2,
         }, // 对用户名的输入进行约束
         XB: {
             required: true,
             maxlength: 1,
             minlength: 1,
             chinese: true,
         }, // 对身份标识进行约束
         NL: {
             required: true,
             maxlength: 3,
             minlength: 1,
         },
         Idnumber: {
             required: true,
             maxlength: 9,
             minlength: 9,
         }
         // 对密码输入进行约束
     },
     messages: {
         XM: {
             required: '*姓名不能为空',
             maxlength: '*最多10位',
             minlength: '*最少2位',
         }, // 对用户名的输入进行约束
         XB: {
             required: '*性别不能为空',
             maxlength: '*只能为1位',
             minlength: '*只能为1位',
             chinese: '*只能输入中文',
         }, // 对身份标识进行约束
         NL: {
             required: '*年龄不能为空',
             maxlength: '*最多3位',
             minlength: '*最少1位',
         },
         Idnumber: {
             required: '*身份标识不能为空',
             maxlength: '*9位身份标识',
             minlength: '*9位身份标识',
             // remote: '身份标识已存在',
         }
         // 对密码输入进行约束
     },
     submitHandler: function() {
         $.ajax({
             type: 'post',
             url: '../Addadmin',
             data: {
                 XM: function() {
                     return $("#form").find(".addadmin_xm").val();
                 },
                 XB: function() {
                     return $("#form").find(".addadmin_xb").val();
                 },
                 NL: function() {
                     return $("#form").find(".addadmin_nl").val();
                 },
                 Idnumber: function() {
                     return $("#form").find(".addadmin_Idnumber").val();
                 }
             },
             success: function(data) {
                 if (data) {
                     alert("添加成功!");
                       $("#form").resetForm();
                 } else {
                     alert("已有该身份标识!");
                 }
             },
             error: function() {
                 alert("error");
             }
         }); //提交
     },
     success: function(li) {
         $(this).removeClass('error');
     },
     errorLabelContainer: '.info', // 把错误标签统一放的容器
     errorElement: 'i', // 使用什么标签标记错误
 });
 //remote和ajaxform 没法一起使用，2个都是异步 的