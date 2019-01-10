/**
 * Created by Administrator on 16-9-13.
 */
$(function(){
    $.get("json/bg_carousel.json",function(data){
        for(var i=0 ; i<data.length ; i++){
            (function(index) {
                var li = $("<li><img src=" +data[index].img +"></li>");
                $("#list").append(li);
                var li2 = $("<li>" +data[index].name + "</li>");
                $("#list2").append(li2);
            })(i)
        }

        var _list1 = $("#list");
        var _list2 = $("#list2");
        var _li1 = $("#list li");
        var _li2 = $("#list2 li");

        var i = 0;
        _li1.eq(0).css("opacity",1);
        _li2.eq(0).addClass("active");

        //启动定时器, 开始自动轮播
        _list1.timer = setInterval(function(){
            i++;
            autoRun();
        }, 2000);

        // 播放判断
        function autoRun(){
            if (i >= _li1.length){
                i = 0;
                _li2.eq(0).removeClass().addClass("active").siblings().removeClass("active");
            }

            _li1.eq(i).css("opacity",1).siblings().css("opacity",0)
            _li2.eq(i).removeClass().addClass("active").siblings().removeClass("active")
        }
        // 鼠标移入按钮事件
        _li2.mouseenter(function(){
            var index = $(this).index();
            i = index;
            autoRun();
        })
        $("#bg").hover(function(){
            //移入 mouseenter
            clearInterval(_list1.timer);  //停止定时器, 停止自动轮播
        },function(){
            //移出, mouseleave
            clearInterval(_list1.timer);
            _list1.timer = setInterval(function(){
                i++;
                autoRun();
            }, 2000);
        })
    })
})

