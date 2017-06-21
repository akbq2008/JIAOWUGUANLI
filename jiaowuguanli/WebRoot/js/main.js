$(function() {
    $('#body').find('.pic2').click(function() {
        // alert("用户代理: " + navigator.userAgent);
        if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") != -1) {
            var flag = confirm('是否要退出系统');
            if (flag == true) {
                window.location.href = "about:blank";
                // window.location.href="index.aspx";
                // 表示重新定向到新页面，同时刷新打开的这个页面；
                window.close();
            }
        } else {
            var flag = confirm('是否要退出系统');
            // alert(flag);
            if (flag == true) {
                window.opener = null;
                window.open("", "_self");
                // _blank：在新窗口显示目标网页
                // _self：在当前窗口显示目标网页
                // _top：框架网页中在上部窗口中显示目标网页
                window.close();
            }
        }
    }); // 点击退出是关闭该窗口,弹窗要设置的。chrome中js弹窗要允许，firefox中也要修改
    $("#body").find(".forget_secrete").click(function() {
        $("#body").css("display", "none");
        $("#main-box").css("display", "block");
    });
    $("#main-box").find(".main-box-turnback").click(function() {
        $("#body").css("display", "block");
        $("#main-box").css("display", "none");
        return false;
    });
});
$(function() {
    mianban('#body', '#body2', '.pic3');
    mianban('#body2', '#body', '.pic5');

    function mianban(attr, str, pic) {
        $(attr).find('.box_close').click(function() {
            $(attr).css('display', 'none');
            $(this).css('display', 'none');
        });
        //关闭按钮
        $(attr).find('.txt').each(function() {
            $(this).focus(function() {
                //点击input获得焦点
                $(this).css("background-color", "#FFFFCC");
            }).blur(function() {
                $(this).css("background-color", "white");
                //点击input失去焦点
            });
        }).keyup(function() {
            var txt = $(this).val();
            if (txt != "") {
                $(this).parent().next().css({
                    display: 'block'
                });
            } else {
                $(this).parent().next().css({
                    display: 'none'
                });
            }
            //小细节问题，txt  null和 ""还是有区别的，null，用退格清除时，close关不掉,''就可以
        });
        //面板1聚焦失焦,键盘输入
        $(attr).find(pic).click(function() {
            if (!$('#body').is(':animated') && !$('#body2').is(':animated')) {
                $(attr).fadeOut();
                $(str).fadeIn();
            }
        });
        // 注册,返回按钮的移动
        $(attr).find('.input-pic').click(function() {
            $(this).next().children().focus();
        });
        // 点击图片时获得对应input的焦点
        $(attr).find('.close').click(function() {
            $(this).prev().children().val('');
            // 这里不能用before，应该用prev
            $(this).css({
                display: 'none'
            });
        });
        // 面板1清空input
    }
});
// 将2个面板封装成一个函数来调用，参数$('#body')  直接换成attr就可以了
// $(attr)
$(function() {
    var verifyCode = new GVerify("v_container");
    $("#form3").validate({
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
                equalTo: '.bpassword'
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
                var url = "../demo9/Handlemodify";
                $.ajax({
                    url: url,
                    type: "post",
                    data: {
                        identity: function() {
                            return $("#identity").val();
                        },
                        password: function() {
                            return $("#password3").val();
                        },
                        again_password: function() {
                            return $("#again_password3").val();
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
                $("#form3").submit(function() {
                    return false;
                });
            }
            //创建验证码实例
        },
    });
});
// 没有length这一用法，导致无法验证