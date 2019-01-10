/**
 * Created by Administrator on 16-9-14.
 */

$(function(){
    $(".list").css("display","none")
    // 下拉菜单
    $(".pullTitle").mouseenter(function(){
        $(".list").css("display","block");
    }).mouseleave(function(){
        $(".list").css("display","none");
    })
    $(".list").mouseenter(function() {
        $(this).show();
    })
})
