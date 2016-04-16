/**
 * Created by jimmy on 2016/4/14.
 */
define(['tips'],function(){
    var items= $('.download-item');
    items.eq(0).tips({
        html:'<div class="tips-content-item my-btn"><span class="icon-inbox my-inbox"></span> <span class="font">下载</span> </div> <div class="tips-content-item my-btn"> <span class="icon-link my-link"></span> <span class="font">链接</span></div>',
        appendTopContainer:$('#myTipsWrapper'),
        container:$(this),
        sCallback: null,
        cCallback: null,
    });
    items.eq(1).tips({
        html:'<div class="tips-content-item my-btn"><span class="icon-inbox my-inbox"></span> <span class="font">下载</span> </div> <div class="tips-content-item my-btn"> <span class="icon-link my-link"></span> <span class="font">链接</span></div>',
        appendTopContainer:$('#myTipsWrapper'),
        container:$(this),
        sCallback: null,
        cCallback: null,
    });
    items.eq(2).tips({
        html:'<div class="tips-content-item my-btn"><span class="icon-inbox my-inbox"></span> <span class="font">下载</span> </div> <div class="tips-content-item my-btn"> <span class="icon-link my-link"></span> <span class="font">链接</span></div>',
        appendTopContainer:$('#myTipsWrapper'),
        container:$(this),
        sCallback: null,
        cCallback: null,
    });
    var eventName='click',
        webview = operationType();
    if(webview.mobile){
        eventName='touchend';
    }
    $(document).on('touchstart','.btn',function(){});

    $(document).on(eventName,function(e) {
        var $target=$(e.srcElement);
        if($target.hasClass('download-item') ||
            $target.hasClass('tips-content-item') ||
            $target.hasClass('txt') ||
            $target.hasClass('my-link') ||
            $target.hasClass('tips-box-content') ||
            $target.hasClass('tips-box-header') ||
            $target.hasClass('my-diamonds') ||
            $target.hasClass('font')
        ){
            //alert();
            return;
        }
        $(document).find('.tips-main').hide();
    });

    /*
     *判断webview的来源
     */
    function operationType() {
        var u = navigator.userAgent, app = navigator.appVersion;
        return { //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    };
})