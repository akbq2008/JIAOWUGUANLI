$(function() {
    var verifyCode = new GVerify("v_container");
    $("#form2").validate({
        rules: {
            identity: {
                required: true,
                maxlength: 9,
                minlength: 9
            },
            password: {
                required: true,
                minlength: 2,
                maxlength: 10
            },
            'again_password': {
                required: true,
                equalTo: '.password'
            },
            validation: {
                required: true
            }
        },
        messages: {
            identity: {
                required: "*9位身份标识",
                maxlength: "*字长为9位",
                minlength: "*字长为9位"
            },
            password: {
                required: "*不能为空",
                minlength: "*最少2位",
                maxlength: "*最多10位"
            },
            'again_password': {
                required: "*不能为空",
                equalTo: '*2次密码不同'
            },
            validation: {
                required: "*不能为空"
            }
        },
        errorClass: "error",
        // onkeyup: true,
        success: function(li) {
            $(this).removeClass('error');
        },
        submitHandler: function(form) {
            var rs = verifyCode.validate($("#validation").val());
            //这里是文本框的值
            if (rs) {
                var url = "../Handlemodify";
                $.ajax({
                    url: url,
                    type: "post",
                    data: {
                        identity: function() {
                            return $("#identity").val();
                        },
                        password: function() {
                            return $("#password").val();
                        },
                        again_password: function() {
                            return $("#again_password").val();
                        }
                    },
                    success: function(data) {
                        if (data == "true") {
                            alert("修改成功");
                            window.location = "http://localhost:8080/demo9/login.html";
                        } else {
                            alert("身份标识不存在！");
                        }
                    }
                });
            } else {
                alert("验证码错误");
                $("#form2").submit(function() {
                    return false;
                });
            }
            //创建验证码实例
        },
    });
});
// 没有length这一用法，导致无法验证