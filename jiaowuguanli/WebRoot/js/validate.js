$(function() {
    $("#body2").find(".pic4").submit(function() {
        return false;
    });
    $('#body2').find('.pic6').click(function() {
        handon();
    });

    function justice(data) {
        if (data == "true") {
            alert("�û�������ݱ�ʶ�Ѵ���");
            return false;
        } else if (data == "no") {
            alert("��ݱ�ʶ������!");
        } else {
            alert("����ʹ��");
            return false;
        }
    }

    function justice2(data) {
        if (data == "true") {
            alert("�û�������ݱ�ʶ�Ѵ���");
            return false;
        } else {
            if ($("#form2").valid()) {
                alert("ע��ɹ�!");
                $("#body2").find(".pic4").submit();
                $('#form2')[0].reset(); //��ձ� Ҳ����ͨ������ DOM �е�reset���������ñ���
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
            alert("��ݱ�ʶ���û�������Ϊ��!");
        }
    }

    function jiance(data) {
        if (data == "true") {
            alert("���Ѿ�ע�����!");
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
            alert("��ݱ�ʶ���û�������Ϊ��!");
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
            }, // ���û������������Լ��
            Idnumber: {
                required: true,
                maxlength: 9,
                minlength: 9,
            }, // ����ݱ�ʶ����Լ��
            password: {
                required: true,
                maxlength: 10,
                minlength: 2,
            }
            // �������������Լ��
        },
        messages: {
            logname: {
                required: '�û�������Ϊ��',
                maxlength: '���10λ',
                minlength: '����2λ',
            }, // ���û������������Լ��
            Idnumber: {
                required: '��ݱ�ʶ����Ϊ��',
                maxlength: '9λ��ݱ�ʶ',
                minlength: '9λ��ݱ�ʶ',
            }, // ����ݱ�ʶ����Լ��
            password: {
                required: '���벻��Ϊ��',
                maxlength: '���10λ',
                minlength: '����2λ',
            }
            // �������������Լ��
        },
        errorClass: 'error',
        success: function(li) {
            $(this).removeClass('error');
        },
        errorLabelContainer: '.info', // �Ѵ����ǩͳһ�ŵ�����
        errorElement: 'li', // ʹ��ʲô��ǩ��Ǵ���
        wrapper: 'ul' // ��������
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
            }, // ����ݱ�ʶ����Լ��
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
                required: '�û�������Ϊ��',
                maxlength: '���10λ',
                minlength: '����2λ',
            }, // ���û������������Լ��
            Idnumber: {
                required: '��ʶ+���+5λ��',
                maxlength: '9λ��ݱ�ʶ',
                minlength: '9λ��ݱ�ʶ',
            },
            // ����ݱ�ʶ����Լ��
            password: {
                required: '���벻��Ϊ��',
                maxlength: '���10λ',
                minlength: '����2λ',
            },
            'again_password': {
                required: '����Ϊ��',
                equalTo: '���벻һ��'
            }
        },
        submitHandler: handon2,
        errorClass: 'error',
        success: function(li) {
            $(this).removeClass('error').addClass('right');
        },
        // �������������֤
        onkeyup: true,
        // errorContainer: '.info1', // �Ƿ���ʾ����
        errorLabelContainer: '.info1', // �Ѵ����ǩͳһ�ŵ�����
        errorElement: 'li', // ʹ��ʲô��ǩ��Ǵ���
        wrapper: 'ul' // ��������
    });
    // }
});
// ��2����֤��
// ����1
// validate ��remote��������Ū�˰���
// ��remote�Ļ���
// logname: {
// required: true,
// maxlength: 10,
// minlength: 2,
// remote: {
// url: 'login',
// method: 'post',
// dataType: 'json', //��������
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
// ���о�����,ֻ����֤һ����successĿǰ�е�Ī������
/*
 * submitHandler: function(form) { $.ajax({ type: 'post', url:
 * 'registerServlet', dataType: 'json', }); $(form).$.ajaxSubmit(); }
 */
// ����2 ��ʾ�����ǩ��λ�ü������ʾ