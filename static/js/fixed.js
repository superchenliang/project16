/**
 * Created by Administrator on 16-9-21.
 */

// 固定吸顶效果 fixed_top
$(function(){
    var fixedTop = $("#hd_logo").offset().top;
    $(window).scroll(function(){
        var _scrollTop = $(document).scrollTop();
        if (_scrollTop >= fixedTop) {
            $("#fixed_top").fadeIn(); //显示
        }
        else {
            $("#fixed_top").fadeOut(); //隐藏
        }
    })
})

