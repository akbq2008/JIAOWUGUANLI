window.onload = function() {
    drag();
};

function drag() {
    $('#body .shadow').on('mousedown', {
        name: 'body'
    }, fnDown);
    $('#body2 .shadow').on('mousedown', {
        name: 'body2'
    }, fnDown);
}

function fnDown(event, attr) {
    event = event || window.event; //event事件兼容,ie是window.event
    var oDrag = document.getElementById(event.data.name); //这里不需要括号，直接用event.data.name即可
    disX = event.clientX - oDrag.offsetLeft, //面板的宽度
        disY = event.clientY - oDrag.offsetTop; //面板的高度
    // 光标按下时光标和面板之间的距离
    // clientX 事件属性返回当事件被触发时鼠标指针向对于浏览器页面（或客户区）的水平坐标。
    // 客户区指的是当前窗口。
    // offset() 方法返回或设置匹配元素相对于文档的偏移（位置）。
    // 移动
    document.onmousemove = function(event) {
        event = event || window.event;
        fnMove(event, disX, disY);
        //鼠标移动时，将面板参数传递给fnMove函数
    };
    // 释放鼠标
    document.onmouseup = function() {
        document.onmousemove = null; //删除移动事件
        document.onmouseup = null; //删除鼠标释放事件
    };
}

function fnMove(e, posX, posY) {
    var oDrag = document.getElementById('body'),
        oDrag2 = document.getElementById('body2');
    l = e.clientX - posX, //这里包括border的宽度
        // l2=oDrag.offsetLeft;包括border的
        t = e.clientY - posY,
        winW = document.documentElement.clientWidth || document.body.clientWidth, //获取窗口的宽度
        winH = document.documentElement.clientHeight || document.body.clientHeight,
        maxW = winW - oDrag.offsetWidth,
        maxH = winH - oDrag.offsetHeight;
    if (l < 0) {
        l = 0;
    } else if (l > maxW) {
        l = maxW;
    }
    if (t < 0) {
        t = 10;
    } else if (t > maxH) {
        t = maxH;
    }
    oDrag.style.left = l + 'px';
    oDrag.style.top = t + 'px';
    oDrag2.style.left = l + 'px';
    oDrag2.style.top = t + 'px';
    //当第一个面板移动后，将移动后的坐标给还没移动的第二个面板,
    //当第二个面板移动后，将移动后的坐标给还没移动的第一个面板。
}
// 遇到2个困难  
/*面板移动后的值给不了
想过class 和id的权值问题，想过是否是#body和#body2的浮动属性的left值导致的
最后确定是left值导致的
第二个问题是参数传不进来的问题，
尝试了设置全局变量，闭包的方法    
，最后通过
 $('#body.shadow').on('mousedown', {
        name: 'body'
    }, fnDown);
       var oDrag = document.getElementById(event.data.name); 
       这里的event.data.name外面不需要中括号,且可以区分值
       这2个问题纠结了好几天。 通过查阅大量资料，书籍来灵感解决了。

*/