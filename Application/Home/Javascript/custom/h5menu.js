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
});
