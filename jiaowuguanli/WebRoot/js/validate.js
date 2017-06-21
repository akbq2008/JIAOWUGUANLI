$(function() {
    $("#body2").find(".pic4").submit(function() {
        return false;
    });
    $('#body2').find('.pic6').click(function() {
        handon();
    });

    function justice(data) {
        if (data == "true") {
            alert("用户名或身份标识已存在");
            return false;
        } else if (data == "no") {
            alert("身份标识不存在!");
        } else {
            alert("可以使用");
            return false;
        }
    }

    function justice2(data) {
        if (data == "true") {
            alert("用户名或身份标识已存在");
            return false;
        } else {
            if ($("#form2").valid()) {
                alert("注册成功!");
                $("#body2").find(".pic4").submit();
                $('#form2')[0].reset(); //清空表单 也就是通过调用 DOM 中的reset方法来重置表单。
                $("#body2").fadeOut();
                $("#body").fadeIn();
            }
        }
    }

    function handon() {
        var url = "../demo9/registerServlet";
        var logname = $("#logname2").val();
        var Idnumber = $("#Idnumber2").val();
        var password = $("#password2").val();
        var again_password = $("#again_password2").val();
        var search = $('#body2').find('.pic6').val();
        if (logname != "" && Idnumber != "") {
            $.ajax({
                url: url,
                type: "post",
                data: {
                    logname: logname,
                    Idnumber: Idnumber,
                    password: password,
                    again_password: again_password,
                    search: search
                },
                dataType: "html",
                success: function(data) {
                    justice(data);
                },
                error: function() {
                    alert("error");
                }
            });
        } else {
            alert("身份标识和用户名不能为空!");
        }
    }

    function jiance(data) {
        if (data == "true") {
            alert("你已经注册过了!");
            return false;
        }
    }

    function handon2() {
        var url = "../demo9/registerServlet";
        var logname = $("#logname2").val();
        var Idnumber = $("#Idnumber2").val();
        var password = $("#password2").val();
        var again_password = $("#again_password2").val();
        var search = $('#body2').find('.pic4').val();
        if (logname != "" && Idnumber != "") {
            $.ajax({
                url: url,
                type: "post",
                data: {
                    logname: logname,
                    Idnumber: Idnumber,
                    password: password,
                    again_password: again_password,
                    search: search
                },
                dataType: "html",
                success: function(data) {
                    justice2(data);
                },
                error: function() {
                    alert("error");
                }
            });
            // zhuce();
        } else {
            alert("身份标识和用户名不能为空!");
        }
    }
    var url = "../demo9/registerServlet";
    var logname = $("#logname2").val();
    // alert(Validator.form());
    $('#form1').validate({
        rules: {
            logname: {
                required: true,
                maxlength: 10,
                minlength: 2,
            }, // 对用户名的输入进行约束
            Idnumber: {
                required: true,
                maxlength: 9,
                minlength: 9,
            }, // 对身份标识进行约束
            password: {
                required: true,
                maxlength: 10,
                minlength: 2,
            }
            // 对密码输入进行约束
        },
        messages: {
            logname: {
                required: '用户名不能为空',
                maxlength: '最多10位',
                minlength: '最少2位',
            }, // 对用户名的输入进行约束
            Idnumber: {
                required: '身份标识不能为空',
                maxlength: '9位身份标识',
                minlength: '9位身份标识',
            }, // 对身份标识进行约束
            password: {
                required: '密码不能为空',
                maxlength: '最多10位',
                minlength: '最少2位',
            }
            // 对密码输入进行约束
        },
        errorClass: 'error',
        success: function(li) {
            $(this).removeClass('error');
        },
        errorLabelContainer: '.info', // 把错误标签统一放的容器
        errorElement: 'li', // 使用什么标签标记错误
        wrapper: 'ul' // 包裹错误
    });
    $('#form2').validate({
        rules: {
            logname: {
                required: true,
                maxlength: 10,
                minlength: 2,
            },
            Idnumber: {
                required: true,
                maxlength: 9,
                minlength: 9,
            }, // 对身份标识进行约束
            password: {
                required: true,
                maxlength: 10,
                minlength: 2,
            },
            'again_password': {
                required: true,
                equalTo: '.apassword'
            },
        },
        messages: {
            logname: {
                required: '用户名不能为空',
                maxlength: '最多10位',
                minlength: '最少2位',
            }, // 对用户名的输入进行约束
            Idnumber: {
                required: '标识+身份+5位数',
                maxlength: '9位身份标识',
                minlength: '9位身份标识',
            },
            // 对身份标识进行约束
            password: {
                required: '密码不能为空',
                maxlength: '最多10位',
                minlength: '最少2位',
            },
            'again_password': {
                required: '不能为空',
                equalTo: '密码不一致'
            }
        },
        submitHandler: handon2,
        errorClass: 'error',
        success: function(li) {
            $(this).removeClass('error').addClass('right');
        },
        // 这样可以逐个验证
        onkeyup: true,
        // errorContainer: '.info1', // 是否显示隐藏
        errorLabelContainer: '.info1', // 把错误标签统一放的容器
        errorElement: 'li', // 使用什么标签标记错误
        wrapper: 'ul' // 包裹错误
    });
    // }
});
// 表单2的验证、
// 问题1
// validate 的remote传输数据弄了半天
// 用remote的话，
// logname: {
// required: true,
// maxlength: 10,
// minlength: 2,
// remote: {
// url: 'login',
// method: 'post',
// dataType: 'json', //传输类型
// data: {
// logname: function() {
// return $("#body .logname").val();
// },
// success: function(da) {
// var flag = da.toString();
// if (flag == 1) {
// self.location = 'https://www.baidu.com';
// }
// },
// // error: function() {
// // alert("error");
// // }
// }
// }
//
// }
// 会有局限性,只会验证一个，success目前有点莫名其妙
/*
 * submitHandler: function(form) { $.ajax({ type: 'post', url:
 * 'registerServlet', dataType: 'json', }); $(form).$.ajaxSubmit(); }
 */
// 问题2 显示错误标签的位置及如何显示