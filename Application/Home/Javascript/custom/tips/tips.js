/**
 * Created by jimmy on 2016/4/14.
 */

define(['$','fx'],function(){
    var Tips=function(options){
        this.options = $.extend({
            html:'',
            appendTopContainer:null,
            container:null,
            sCallback: null,
            cCallback: null,
        }, options);
        var eventName='click',
            webview = this.getDeviceType(),that=this;
        if(webview.mobile){
            eventName='touchend';
        }
        this.options.container.on(eventName,'.txt',function(){
            var id=$(document).find('#'+$(this).parent().data('tipid'));
            var $target=$(id);
            that.show($target);
            event.stopPropagation();
        });
        this.fillIn();
    };

    Tips.prototype={
        fillIn:function(){
            var id=this.getId();
            if($(document).find(id).length>0){
                this.fillIn();
            }
            var tipId=this.options.container.data('tipid');
            if(tipId){
                return;
            }
            var str='<div class="tips-main" id="'+id+'">'+
                '<div class="tips-box-header">'+
                '<span class="icon-diamonds my-diamonds"></span>'+
                '</div>'+
                '<div class="tips-box-content">'+this.options.html+'</div>'+
                '</div>';
            this.options.container.data('tipid',id);
            this.options.container.append(str);
        },

        show:function($target){
            $(document).find('.tips-main').not($target).hide();
            if($target.css("display")=='none'){
                $target.show();
            }else {
                $target.hide();
            }
            this.options.sCallback && this.options.sCallback.call(this);
        },
        hide:function(){
            this.options.cCallback && this.options.cCallback.call(this);
        },
        getId:function(){
            var num =parseInt((0 + Math.random()*100),10),
                id='mytips-'+num;
            return id;
        },
        /*
         *判断webview的来源
         */
        getDeviceType:function() {
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
            }
        },
    };

    $.fn.tips = function(options){
        options=options || {};
        options.container=this;
        return new Tips(options);
    }
});