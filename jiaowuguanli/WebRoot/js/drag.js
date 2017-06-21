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
    event = event || window.event; //event�¼�����,ie��window.event
    var oDrag = document.getElementById(event.data.name); //���ﲻ��Ҫ���ţ�ֱ����event.data.name����
    disX = event.clientX - oDrag.offsetLeft, //���Ŀ��
        disY = event.clientY - oDrag.offsetTop; //���ĸ߶�
    // ��갴��ʱ�������֮��ľ���
    // clientX �¼����Է��ص��¼�������ʱ���ָ������������ҳ�棨��ͻ�������ˮƽ���ꡣ
    // �ͻ���ָ���ǵ�ǰ���ڡ�
    // offset() �������ػ�����ƥ��Ԫ��������ĵ���ƫ�ƣ�λ�ã���
    // �ƶ�
    document.onmousemove = function(event) {
        event = event || window.event;
        fnMove(event, disX, disY);
        //����ƶ�ʱ�������������ݸ�fnMove����
    };
    // �ͷ����
    document.onmouseup = function() {
        document.onmousemove = null; //ɾ���ƶ��¼�
        document.onmouseup = null; //ɾ������ͷ��¼�
    };
}

function fnMove(e, posX, posY) {
    var oDrag = document.getElementById('body'),
        oDrag2 = document.getElementById('body2');
    l = e.clientX - posX, //�������border�Ŀ��
        // l2=oDrag.offsetLeft;����border��
        t = e.clientY - posY,
        winW = document.documentElement.clientWidth || document.body.clientWidth, //��ȡ���ڵĿ��
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
    //����һ������ƶ��󣬽��ƶ�����������û�ƶ��ĵڶ������,
    //���ڶ�������ƶ��󣬽��ƶ�����������û�ƶ��ĵ�һ����塣
}
// ����2������  
/*����ƶ����ֵ������
���class ��id��Ȩֵ���⣬����Ƿ���#body��#body2�ĸ������Ե�leftֵ���µ�
���ȷ����leftֵ���µ�
�ڶ��������ǲ����������������⣬
����������ȫ�ֱ������հ��ķ���    
�����ͨ��
 $('#body.shadow').on('mousedown', {
        name: 'body'
    }, fnDown);
       var oDrag = document.getElementById(event.data.name); 
       �����event.data.name���治��Ҫ������,�ҿ�������ֵ
       ��2����������˺ü��졣 ͨ�����Ĵ������ϣ��鼮����н���ˡ�

*/