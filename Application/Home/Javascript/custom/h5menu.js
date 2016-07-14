/**
 * Created by jimmy on 16/7/14.
 */

$(function(){
    $(document).on('click','.myheader span',function(){
        var $target=$(this),
            $menu=$('.menus');
        if($target.hasClass('show')){
            $target.removeClass('show');
            $menu.addClass('hide').removeClass('show');
        }
        else{
            $target.addClass('show');
            $menu.addClass('show').removeClass('hide');
        }
    });
});
