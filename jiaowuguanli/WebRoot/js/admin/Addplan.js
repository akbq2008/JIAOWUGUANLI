 $("#main_body").find(".info").css("display", "none");
 $("#main_body").find(".info2").css("display", "none");
 $("#main_body").find(".info3").css("display", "none");
 $("#main_body").find(".main_box_right").css("display", "none");
 $("#main_body").find(".add_box").css("display", "none");
 $("#main_body").find(".add_box2").css("display", "none");
 $("#main_body").find(".add_box3").css("display", "block");
 var obj = $("#main_body").find(".add_box3");
 if (!obj.hasClass("checked")) {
     obj.addClass("checked");
     $("#main_body").find(".add_box3").append("  <div class='form_box'><form action='' method='post' id='form3'>" + "<p><label>教师号</label><input type='text' autocomplete='off' placeholder='请输入教师号' name='JSH' class='addadmin_jsh'/></p>" + "<p><label>课程名</label><input type='text' autocomplete='off' placeholder='请输入课程名' name='KCM' class='addadmin_kcm'/></p>" + "<p> <label>课程号</label><input type='text' autocomplete='off' placeholder='请输入课程号' name='KCH' class='addadmin_kch'/></p>" + "<p> <label>姓名</label><input type='text' autocomplete='off' placeholder='请输入姓名' name='XM' class='addadmin_xm'/></p>" + "<p><label>上课地点</label><input type='text' autocomplete='off' placeholder = '请输入上课地点' name = 'SKDD' class='addadmin_skdd'/></p>" + "<p><label>上课时间</label><input autocomplete = 'off' placeholder = '请输入上课时间' name = 'SKSJ' class = 'addadmin_sksj'/></p>" + "<p><label>上课班级</label> <input type = 'text' autocomplete = 'off'   placeholder = '请输入上课班级' name = 'SKBJ'  class = 'addadmin_skbj' /></p>" + "<p><input type='submit' value='提交' class='btn' style='cursor:pointer;margin-left:120px;background:#4490f7;font-size:18px;color:white;font-weight: 550;'></p> </form></div>");
 }
 //调用自定义方法
 $("#form3").validate({
     rules: {
         KCH: {
             required: true,
             maxlength: 4,
             minlength: 1,
             digits: true,
         }, // 对用户名的输入进行约束
         KCM: {
             required: true,
             maxlength: 20,
             minlength: 1,
         }, // 对身份标识进行约束
         JSH: {
             required: true,
             maxlength: 3,
             minlength: 1,
             digits: true,
         },
         XM: {
             required: true,
             maxlength: 10,
             minlength: 1,
         },
         SKDD: {
             required: true,
             maxlength: 20,
             minlength: 1,
         },
         SKSJ: {
             required: true,
             maxlength: 20,
             minlength: 1,
         },
         SKBJ: {
             required: true,
             maxlength: 7,
             minlength: 7,
         }
         // 对密码输入进行约束
     },
     messages: {
         KCH: {
             required: '*课程号不能为空',
             maxlength: '*最多4位',
             minlength: '*最少1位',
             digits: '只能为整数',
         }, // 对用户名的输入进行约束
         KCM: {
             required: '*课程名不能为空',
             maxlength: '*最多20位',
             minlength: '最少1位',
         }, // 对身份标识进行约束
         JSH: {
             required: '*教师号不能为空',
             maxlength: '*最多3位',
             minlength: '最少1位',
             digits: '只能为整数',
         },
         XM: {
             required: '*姓名不能为空',
             maxlength: '*最多10位',
             minlength: '最少1位',
         },
         SKDD: {
             required: '*上课地点不能为空',
             maxlength: '*最多20位',
             minlength: '最少1位',
         },
         SKSJ: {
             required: '*上课时间不能为空',
             maxlength: '*最多20位',
             minlength: '最少1位',
         },
         SKBJ: {
             required: '*上课班级不能为空',
             maxlength: '*只能为7位',
             minlength: '*只能为7位',
         }
     },
     submitHandler: function() {
         $.ajax({
             type: 'post',
             url: '../Addplan',
             data: {
                 KCH: function() {
                     return $("#form3").find(".addadmin_kch").val();
                 },
                 KCM: function() {
                     return $("#form3").find(".addadmin_kcm").val();
                 },
                 JSH: function() {
                     return $("#form3").find(".addadmin_jsh").val();
                 },
                 XM: function() {
                     return $("#form3").find(".addadmin_xm").val();
                 },
                 SKDD: function() {
                     return $("#form3").find(".addadmin_skdd").val();
                 },
                 SKSJ: function() {
                     return $("#form3").find(".addadmin_sksj").val();
                 },
                 SKBJ: function() {
                     return $("#form3").find(".addadmin_skbj").val();
                 }
             },
             success: function(data) {
                 if (data == "true") {
                     alert("添加成功!");
                     $("#form3").resetForm();
                 } else if (data == "kch_false") {
                     alert("课程号不存在!");
                 } else if (data == "jsh_false") {
                     alert("教师号不存在!");
                 } else {
                     alert("已有数据!");
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