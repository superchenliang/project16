/**
 * Created by Administrator on 16-9-18.
 */

// 商品详情
$(function(){
    $.get("json/goods_1.json",function(data){
        if(location.search){
            var id = location.search
            id = id.split("?")[1];
        }

        for(var i=0;i<data.length;i++) {
            var a=data[i];
            //console.log(a);
            if (id == a.id) {
                // 小图
                var img="<img src="+ a.goodsImg.big[i].img +" />";
                $(".goodImg").append(img);
                // 大图
                var bigImg = $("<img class='bigImg' src="+ a.goodsImg.big[i].img +">");
                $(".bigArea").append(bigImg);

                // 右边商品名称与价格
                var h1=$("<h1 class='product'>"+ a.name +"</h1>");
                var li1 = $("<li class='li_relative'>售价: <span>￥" + a.price + "</span></li>");
                h1.prependTo($(".goods_1"));
                li1.appendTo($(".goods_1 ul"));

                // 底部小图
                for(var i=0 ; i<a.goodsImg.small.length; i++){
                    var sImg = $("<li><img src="  + a.goodsImg.small[i].img+   "></li>");
                    $(".smallgoods").append(sImg);
                }
            }
        }
        //切换至大图
        $(function(){
            //  点击小图 ，出现大图
            $(".smallgoods li img").click(function(){
                $(this).parent().addClass("box0").siblings("li").removeClass("box0");
                $(".goodImg img").attr("src",$(this).attr("src"));
                $(".bigArea img").attr("src",$(this).attr("src"));
            })
        });

        // 点击选择 尺码和颜色
        $(".goods_attr ul li").click(function(){
            $(this).removeClass().addClass("sel").siblings().removeClass("sel");
        })

        // 放大镜
        $(function(){
            var _smallImg = $(".goodImg"); // 小图ͼ
            var _smallArea = $(".smallArea"); // 小区域����
            var _bigArea = $(".bigArea"); // 大区域������
            var _bigImg = $(".bigImg"); // 大图��ͼ
            _bigImg.attr("src",$(".goodImg img").attr("src"));

            _smallArea.width( _smallImg.width()/_bigImg.width() * _bigArea.width() );
            _smallArea.height( _smallImg.height()/_bigImg.height() * _bigArea.height() );

            //放大系数(放大倍数)  ���
            var scale = _bigImg.width() / _smallImg.width();

            //鼠标移动��
            _smallImg.mousemove(function(e){
                _smallArea.show(); //��显示小区域���
                _bigArea.show();

                //移动小区域, 跟随鼠标移动�� ��
                var x = e.pageX - _smallImg.offset().left - _smallArea.width()/2;
                var y = e.pageY - _smallImg.offset().top - _smallArea.height()/2;

                //判断x不超出左边界,也不超出右边界
                if (x < 0) {
                    x = 0;
                }
                else if (x > _smallImg.width() - _smallArea.width()) {
                    x = _smallImg.width() - _smallArea.width();
                }
                //�判断y不超出上边界,也不超出下边界
                if (y < 0) {
                    y = 0;
                }
                else if (y > _smallImg.height() - _smallArea.height()) {
                    y = _smallImg.height() - _smallArea.height();
                }

                _smallArea.css({left: x, top: y});

                //�移动大图��ͼ
                _bigImg.css({left: -x*scale, top: -y*scale});
            })
            //鼠标移出�
            _smallImg.mouseleave(function() {
                _smallArea.hide(); //�小图隐藏
                _bigArea.hide(); // 大图隐藏
            })
        })
    })



    // 加减数量
    // 减
    $(".buy_num li").eq(0).click(function(){
        var num=parseInt($(".buy_num li").eq(1).html());
        if(num<=0){
            $(".buy_num li").eq(1).html(0);
            return
        }
        $(".buy_num li").eq(1).html(num-1);
    });
    // 加
    $(".buy_num li").eq(2).click(function(){
        var num=parseInt($(".buy_num li").eq(1).html());
        $(".buy_num li").eq(1).html(num+1);
    })

})


//  购物车
$(function(){
    $(".add").click(function() {
        var allGoods = $.cookie("cart") ? JSON.parse( $.cookie("cart") ) : [];
        console.log(allGoods);
        //if(allGoods.length <= 0){
        //    alert("您还未登录,请登录!");
        //    return
        //}
        var goodsId = location.search.split("?")[1];
        var name=$(".product").html();
        var prices=$(".goods_1 li").eq(2).find("span").html();
        var num=$(".buy_num li").eq(1).html();
        var img=$(".smallgoods li").eq(0).html();
        var total=num*prices;

        var isExists = false; // 表示是否存在相同商品
        // 如果买家买过商品
        for(var i=0 ; i<allGoods.length ; i++){
            //如果存在相同的商品,数量++
            var Good = allGoods[i].data;
            for(var j=0 ;j<Good.length ; j++){
                if ( goodsId == Good[j].id) {
                    Good[j].num++;
                    isExists = true; //表示存在相同商品
                }
            }
            

        }
        // 如果买家一次都没有买商品
        if (!isExists) {
            // 添加一个新商品到购物车
            var obj ={
                data : [{
                    id: goodsId,
                    img:img,
                    name:name,
                    num:num,
                    prices:prices,
                    total:total
                }]};
            allGoods.push(obj);
            console.log(1);
        }
        $.cookie("cart",JSON.stringify(allGoods),{expires: 20, path: "/"});

        console.log( $.cookie("cart") );
    });
})

