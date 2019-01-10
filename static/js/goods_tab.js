/**
 * Created by Administrator on 16-9-21.
 */

$(function(){
    $(".tab_brand li").mouseenter(function(){
        var index=$(this).index;
        $(this).find("a").removeClass().addClass("hover2").parent().siblings().find("a").removeClass("hover2");

        $(".tab_con").hide();
        $(".tab_con").eq(index).show();

    })
})



