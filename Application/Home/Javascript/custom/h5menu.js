/**
 * Created by jimmy on 16/7/14.
 */

$(function(){
    $(document).on('click','.myheader span',function(){
        var $target=$(this),
            $menu=$('.menus');
        if($target.hasClass('show')){
            hideMenu();
        }
        else{
            $target.addClass('show');
            $menu.addClass('show').removeClass('hide');
        }
    });
    $(document).on('click',function(e){
        var $target=$(e.srcElement);
        if($target.hasClass('menus') ||
            $target.hasClass('menuBtn') ||
            $target.parent().hasClass('menuBtn') ||
            $target.hasClass('menus-item')){
            return;
        }
        hideMenu();
    });
    function hideMenu(){
        var $target=$('.menuBtn'),
            $menu=$('.menus');
        $target.removeClass('show');
        $menu.addClass('hide').removeClass('show');
    };

    var tempData = {
            account:'18140662282',
            secret: '123456',
            type: '300',
            device: ''
        };

    $.ajax({
        url:'http://dev.api.hisihi.com/v1/token',
        data:JSON.stringify(tempData),
        type:'post',
        success:function(err){
            console.log('ok');
        },
        error:function(err) {
            console.log('error');
        }
    });

    $.ajax({
        url:'http://dev.api.hisihi.com/v1/org/57/teaching_course?except_id=41&page=1&per_page=100000',
        data:null,
        type:'get',
        success:function(err){
            console.log('ok');
        },
        error:function(err) {
            console.log('error');
        }
    });


});
