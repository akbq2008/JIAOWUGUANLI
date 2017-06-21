$(function() {
    var cookie_peopel_name = 'peopel',
        cookie_logname_name = 'logname',
        cookie_password_name = 'password',
        cookie_Idnumber_name = 'Idnumber';
    cookie('#logname', cookie_logname_name);
    cookie('#peopel', cookie_peopel_name);
    cookie('#password', cookie_password_name);
    cookie('#Idnumber', cookie_Idnumber_name);

    function cookie(name, val) {
        var $cookie = $.cookie(val); //
        if ($cookie) {
            $(name).val(decodeURIComponent($cookie)); // 
        }
        $('#body .remember').click(function() {
            if (this.checked) {
                var content = encodeURIComponent($(name).val());

                $.cookie(val, content, {
                    path: '/',
                    expires: 10,
                    secure: false
                });
            } else {
                $.cookie(val, null, {
                    path: '/'
                });
                // 
            }
        });
    }
});