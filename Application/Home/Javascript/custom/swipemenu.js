/**
 * Created by jimmy on 2016/7/5.
 */
$(function(){
    var len= 0,
        f= 0,
        cq=0;
    $('.top-box li').tap(function(){
        var t=$(this).index();
        f=-25*t+'%';
        cq=100*t+'%';
        swipeToPage($(this),f,cq);
    });

    $('.box-1').swipeLeft(function(){
        var i=$(this).index();
        if(i==$(this).siblings().length){
            return;
        }
        i++;
        swipeToPage($('.top-box li').eq(i),-25*i+'%',100*i+'%');

    }).swipeRight(function(){
        var i=$(this).index();
        if(i==0){
            return;
        }
        i--;
        swipeToPage($('.top-box li').eq(i),-25*i+'%',100*i+'%');
    });

    function swipeToPage($navTarget,f,cq){
        $('.box-content').css({
            '-webkit-transform':'translate('+f+')',
            '-webkit-transition':'500ms linear'
        });
        $('.line').css({
            '-webkit-transform':'translate('+cq+')',
            '-webkit-transition':'300ms linear'
        });
        $navTarget.addClass('on').siblings().removeClass('on');
    }

});