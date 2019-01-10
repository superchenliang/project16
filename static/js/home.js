/**
 * Created by Administrator on 16-9-20.
 */

// top网站导航 移入事件
$(function(){
    $(".wzdhBox").css("display","none")
    $(".top_enter").mouseenter(function(){
        $(".wzdhBox").show();
    }).mouseleave(function(){
        $(".wzdhBox").hide();
    })
    $(".wzdhBox").mouseenter(function(){
        $(".wzdhBox").show();
    }).mouseleave(function(){
        $(".wzdhBox").hide();
    })
    $("#H_top ul li").mouseenter(function(){
        $(this).find("a").css("color","#C80A28")
    }).mouseleave(function(){
        $(this).find("a").css("color","#666666");
        $("#top_left_ul li .on").css("color","red");
    })

})


// 导航栏左侧效果
$(function(){
    // 导航左侧栏js效果 start
    $(".list li").hover(function(){
        $(".list_right_1").hide();
        $(this).find(".list_1").children("img").eq(0).css("display","none"); // 移入时第一张隐藏
        $(this).find(".list_1").children("img").eq(1).css("display","block"); // 第二张显示
        $(".list_right").fadeIn();
        var index=$(this).index(".list li");
        $(this).addClass("select").siblings().removeClass("select");  // select事件
        $($(".list_right_1")[index]).fadeIn().siblings().fadeOut();
        $($(".list_right_1")[index]).addClass("list_hover").siblings().removeClass("list_hover");
        $(this).siblings().children("list_right_1").hide();

    },function(){
        $(this).find(".list_1").children("img").eq(0).css("display","block");
        $(this).find(".list_1").children("img").eq(1).css("display","none");
    })
    $("#classify").mouseleave(function(){
        $(".list_right").fadeOut();
        $(".list_right_1").fadeOut();
        $(".list li").removeClass("select");
    })

})


//  nav 鼠标划过事件

$(function(){
    $(".member").hide();
    var menu_right1=$(".menu_right").eq(1);
    var menu_right2=$(".menu_right").eq(2);
    menu_right1.mouseenter(function(){
        $("#consult").show();
    }).mouseleave(function(){
        $("#consult").hide();
    })
    menu_right2.mouseenter(function(){
        $("#member").show();
    }).mouseleave(function(){
        $("#member").hide();
    })

    $("#menu ul li").mouseenter(function(){
        $(this).children("a").css("color","#f00")
    }).mouseleave(function(){
        $(this).children("a").css("color","#000")
    })
})



//  互联网品牌生态运营集团
$(function(){
    var index_01 = 0;
    var llength = $(".hide_pic").length;      //
    var imge = $(".hd_top_left .hide_pic");
    imge.eq(0).show();         // 第一张显示
    imge.hide();               // 其余隐藏����
    // �点击��
    $("#toRight").click(function(){
        clearInterval(timer_01);
        index_01++;
        if ( index_01< llength) {
            imge.hide();
            imge.eq(index_01).show();
        }else{
            index_01 = 0;
            imge.hide();
            imge.eq(index_01).show();
        };
    })
    //�点击换一批�
    $(".divhuan").click(function(){
        clearInterval(timer_01);
        index_01++;
        if ( index_01< llength) {
            imge.hide();
            imge.eq(index_01).show();
        }else{
            index_01 = 0;
            imge.hide();
            imge.eq(index_01).show();
        };
    })
    //�自动播放����
    function autoRun(){
        if(index_01<llength-1){
            index_01 =index_01+1;
        }else{
            index_01 = 0;
        }
        imge.hide();
        imge.eq(index_01).show();
    }
    var  timer_01 = setInterval(autoRun,3000);
    $(".hide_pic a").hover(function(){
        clearInterval(timer_01);
    },function(){
        timer_01 = setInterval(autoRun,3000);
    })
})


//  互联网品牌生态运营集团 右侧新闻
$(function() {
    // tab
    $(".tabs li").mousemove(function () {
        var index = $(this).index();
        $(this).addClass("on2").siblings().removeClass("on2");
        $(".flower_item").hide();
        $(".flower_item").eq(index).show();
    });
})



// 新品上市New Arrival  -- ajax 调用

$(function(){
    $.get("json/goods1.json",function(data){
        for(var i=0;i<data.length;i++){
            (function(index) {
                var img=$("<a href='goods_1.html?"+data[index].id+"' target='_blank'><img src="+ data[index].img +"></a>");
                var span2 = "<span class='arrow'>"+ data[index].mon  + "</span>" + data[index].prices;
                var span1 = "<span class='new_price'>" + span2+ "</span>";
                var del = "<del class='old_price'>" + data[index].del+ "</del>";
                var li1 = "<li class='price'>" + span1  + del+ "</li>";
                var li2 = "<li><button class='buy_new'>"+ data[index].button +" </button></li>";

                var ul=$("<ul>" + li1  + li2+ "</ul>");

                $(".tab_con .new_boxs").eq(index).append(img,ul);

            })(i)
        }
        // 滑动鼠标

        var ulLi=$(".tab_brand li");
        var j=0;
        function Run(){
            if(j>=ulLi.length){
                j=0;
                $(".tab_brand li a").eq(0).addClass("hover2");
            }
            $(".tab_brand li").eq(j).find("a").removeClass().addClass("hover2").parent().siblings().find("a").removeClass("hover2");
        }


        //启动定时器, 开始自动轮播
        ulLi.timer = setInterval(function(){
            j++;
            Run();
        }, 1000);

        ulLi.mouseenter(function(){
            clearInterval(ulLi.timer);
            var index=$(this).index;
            $(this).find("a").removeClass().addClass("hover2").parent().siblings().find("a").removeClass("hover2");
        }).mouseleave(function() {
            //移出, mouseleave
            clearInterval(ulLi.timer);
            ulLi.timer = setInterval(function () {
                j++;
                Run();
            }, 1000);
        })
        //ulLi.hover(function(){
        //    //移入 mouseenter
        //    clearInterval(ulLi.timer);  //停止定时器, 停止自动轮播
        //},function(){
        //    //移出, mouseleave
        //    clearInterval(ulLi.timer);
        //    ulLi.timer = setInterval(function(){
        //        j++;
        //        Run();
        //    }, 1000);
        //})



    })

})



// 韩风时尚女装 --- 热销排行
$(function(){
    $(".bg_right ul li").eq(0).find(".hot_con").show();
    $(".bg_right ul li").eq(0).find("h5").hide();
    $(".bg_right ul li").hover(function(){
        $(this).find(".hot_con").show();
        $(this).find("h5").hide();
        $(this).siblings().find(".hot_con").hide();
        $(this).siblings().find("h5").show();
    });
})



