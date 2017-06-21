$(function() {
    $('#top').find('.changeskins').click(function() {
        $('#skin').slideToggle('slow'); // 向上是slideDown
    });
    // 点击换肤滑动
    $('#skin').find('.skin-cancel').click(function() {
        searchskins();
        $('#skin').slideUp('slow');
    });
    // 取消换肤
    $('#skin').find('.skin-recover').click(function() {
        $('#skin').find('.skin-content-color a:first').addClass('checked').siblings().removeClass('checked');
        var $checked = $('#skin').find('.checked');
        var id = $checked.attr('id');
        // alert(id);
        $.cookie('myskins', id, {
            expires: 10,
            path: '/'
        });
        $('#cssfile').attr('href', '../css/skin-content-color-class.css');
        $('#skin').slideUp('slow');
    });
    //第二句的可以防止当恢复默认的时候checked属性没有恢复默认
    // $('body').css({
    //     'background': 'url(../image/u=3474258384,3167604542&fm=23&gp=0.jpg) no-repeat',
    //     'background-size': 'cover'
    // });
    // 这样的话就不能够再恢复默认之后点击其他的
    // 这里置空就好了
    // 恢复默认皮肤
    function searchskins() {
        var cookie = $.cookie('myskins'); //获取保存的皮肤
        if (cookie) {
            // alert(cookie);
            $('#skin').find('.skin-content-color a').each(function() {
                $('#skin').find('.skin-pics-page img').removeClass('checked'); //取消原先的checked
                $("#" + cookie).addClass('checked');
                $('#cssfile').attr('href', '../css/skin-content-color-' + cookie + '.css');
                // 获取对应的css文件
                // }
                return false;
            });
            $('#skin').find('.skin-pics-page img').each(function() {
                $('#skin').find('.skin-content-color a').removeClass('checked');
                $("#" + cookie).addClass('checked');
                $('#cssfile').attr('href', '../css/skin-content-color-' + cookie + '.css');
                // 获取对应的css文件
                // }
                return false;
            });
        }
    }
    searchskins();
    //检测页面是否有已保存的皮肤
    $('#skin').find('.skin-save').click(function() {
        var $checked = $('#skin').find('.checked');
        var id = $checked.attr('id');
        // alert(id);
        $.cookie('myskins', id, {
            expires: 10,
            path: '/'
        });
        $('#skin').slideUp('slow');
    });
    //保存皮肤
    $('#skin').find('.skin-content-color a').each(function() {
        $(this).click(function() {
            $('#skin').find('.skin-pics-page img').removeClass('checked');
            if ($(this).hasClass('checked')) {
                $(this).siblings().removeClass('checked');
            } else {
                $(this).siblings().removeClass('checked');
                $(this).addClass('checked');
                var color = $(this).attr('id');
                $('#cssfile').attr('href', '../css/skin-content-color-' + color + '.css');
                // 获取对应的css文件
            }
        });
    });
    $('#skin').find('.skin-content-pics-pages img').each(function() {
        $(this).click(function() {
            $('#skin').find('.skin-content-color a').removeClass('checked');
            if ($(this).hasClass('checked')) {
                $(this).parent().siblings().children().removeClass('checked');
                $(this).closest('.skin-pics-page').siblings().find('img').removeClass('checked');
            } else {
                $(this).parent().siblings().children().removeClass('checked'); //去除同一个层面的checked
                $(this).closest('.skin-pics-page').siblings().find('img').removeClass('checked'); //去除不同层面上的checked
                $(this).addClass('checked');
                var color = $(this).attr('id');
                $('#cssfile').attr('href', '../css/skin-content-color-' + color + '.css');
                // 获取对应的css文件
            }
        });
    });
    // parent().parent()==closest('selector'),children().children()==find('selector')
    // 换肤操作
    skinsmove();

    function skinsmove() {
        var pages = $('#skin').find('.skin-content-pics-pages'); //最外层div
        var pagesWidth = $('#skin').find('.skin-content-pics-pages').width(); //总的容器宽度
        var pageWidth = $('#skin').find('.skin-pics-page').width(); //一个版面的宽度
        var pagelength = Math.round(pagesWidth / pageWidth);
        var page = 1;
        $('#skin').find('.prev').click(function() {
            // if () 
            if (!pages.is(':animated')) {
                if (page == 1) {
                    pages.animate({
                        left: '-2970px'
                    }, 600);
                    page = 4;
                    // 如果当前为第一版面又点击了一次，则把整个容器向左移，
                    // 并把page=4
                } else {
                    pages.animate({
                        left: '+=' + pageWidth + 'px'
                    }, 600);
                    page--;
                }
            }
            $('#skin').find('.pagenum').text(page + "/" + pagelength); //设置当前的页数
            /*看是否运动是看点击的时候判断的*/
        });
        $('#skin').find('.next').click(function() {
            if (!pages.is(':animated')) {
                if (page == pagelength) {
                    pages.animate({
                        left: '0px'
                    }, 600);
                    page = 1;
                } else {
                    pages.animate({
                        left: '-=' + pageWidth + 'px'
                    }, 600);
                    page++;
                }
            }
            $('#skin').find('.pagenum').text(page + "/" + pagelength);
        });
    }
});