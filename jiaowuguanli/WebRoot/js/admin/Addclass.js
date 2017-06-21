    $("#main_body").find(".info").css("display", "none");
    $("#main_body").find(".info2").css("display", "none");
    $("#main_body").find(".info3").css("display", "none");
    $("#main_body").find(".main_box_right").css("display", "none");
    $("#main_body").find(".add_box").css("display", "none");
    $("#main_body").find(".add_box2").css("display", "block");
    $("#main_body").find(".add_box3").css("display", "none");
    var obj = $("#main_body").find(".add_box2");
    if (!obj.hasClass("checked")) {
        obj.addClass("checked");
        $("#main_body").find(".add_box2").append("  <div class='form_box'><form action='' method='post' id='form2'>" + "<p><label>课程号</label><input type='text' autocomplete='off' placeholder='请输入课程号' name='KCH' class='addadmin_kch'/></p>" + "<p><label>课程名</label><input type='text' autocomplete='off' placeholder='请输入课程名' name='KCM' class='addadmin_kcm'/></p>" + "<p> <label>课时</label><input type='text' autocomplete='off' placeholder='请输入课时' name='KS' class='addadmin_ks'/></p>" + "<p> <label>课程代码</label><input type='text' autocomplete='off' placeholder='请输入课程代码' name='KCDM' class='addadmin_kcdm'/></p>" + "<p><input type='submit' value='提交' class='btn' style='cursor:pointer;margin-left:120px;background:#4490f7;font-size:18px;color:white;font-weight: 550;'></p></form></div>");
    }
    //调用自定义方法
    // jQuery.validator.addMethod("num", function(value, element) {
    //     var num = "^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$";
    //     return this.optional(element) || (num.test(value));
    // }, "*只能为数字");
    $("#form2").validate({
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
            KS: {
                required: true,
                maxlength: 3,
                minlength: 1,
                // num: true,
            },
            KCDM: {
                required: true,
                maxlength: 8,
                minlength: 8,
            }
            // 对密码输入进行约束
        },
        messages: {
            KCH: {
                required: '*课程号不能为空',
                maxlength: '*最多4位',
                minlength: '*最少1位',
                digits: '必须是整数',
            }, // 对用户名的输入进行约束
            KCM: {
                required: '*课程名不能为空',
                maxlength: '*最多20位',
                minlength: '*最少1位',
            }, // 对身份标识进行约束
            KS: {
                required: '*课时不能为空',
                maxlength: '*最多3位',
                minlength: '*最少1位',
                // num: '只能为数字',
            },
            KCDM: {
                required: '*课程代码不能为空',
                maxlength: '*8位课程代码',
                minlength: '*8位课程代码',
                // remote: '身份标识已存在',
            }
            // 对密码输入进行约束
        },
        submitHandler: function() {
            $.ajax({
                type: 'post',
                url: '../Addclass',
                data: {
                    KCH: function() {
                        return $("#form2").find(".addadmin_kch").val();
                    },
                    KCM: function() {
                        return $("#form2").find(".addadmin_kcm").val();
                    },
                    KS: function() {
                        return $("#form2").find(".addadmin_ks").val();
                    },
                    KCDM: function() {
                        return $("#form2").find(".addadmin_kcdm").val();
                    }
                },
                success: function(data) {
                    if (data == "true") {
                        alert("添加成功!");
                        $("#form2").resetForm();
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
        errorLabelContainer: '.info2', // 把错误标签统一放的容器
        errorElement: 'i', // 使用什么标签标记错误
    });
    //remote和ajaxform 没法一起使用，2个都是异步 的