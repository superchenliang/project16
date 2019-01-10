/**
 * Created by Administrator on 16-9-21.
 */

//$(function(){
//    // 点击加入购物车
//    $(".add").click(function(){
//        var users = $.cookie("users") ? JSON.parse( $.cookie("users") ) : [];
//        var goods=$.cookie("goods")?JSON.parse($.cookie("goods")):[] ;
//        var prices=$.cookie("prices")?JSON.parse($.cookie("prices")):[] ;
//
//        //如果购物车中已经存在商品, 保存在cookie中的商品基础上添加新的商品
//        //console.log( typeof $.cookie("cart") ); //string
//        var goodsList = $.cookie("cart") ? JSON.parse( $.cookie("cart") ) : [];
//
//        //先判断购物车中是否存在我即将要添加的商品
//        var isExists = false;     //表示是否存在相同商品
//        for (var i=0; i<goodsList.length; i++) {
//            //如果存在相同的商品, 则把数量++, 不需要重新添加新的商品
//            if (goodsId == goodsList[i].id) {
//                goodsList[i].num++;
//                isExists = true; //表示存在相同商品
//            }
//        }
//
//        //如果不存在相同商品, 则添加新商品
//        if (!isExists) {
//            //添加一个新商品到购物车
//            var goods = {
//                id: goodsId,
//                name: goodsName,
//                price: goodsPrice,
//                num: 1
//            }
//            goodsList.push(goods);
//        }
//
//        $.cookie("cart", JSON.stringify(goodsList), {expires:22, path:"/"});
//        console.log( $.cookie("cart") );
//    })
//
//    //结算
//    $(".shopping_buy").click(function(){
//        location.href = "cart.html";
//    })
//
//})



$(function(){
    var users = $.cookie("cart") ? JSON.parse( $.cookie("cart") ) : [];
    console.log(users);

    //读取cookie中买家购买的物品
    for(var i=0 ; i<users.length ; i++){
        (function(index) {
            //拿到data中的数据，并显示
            var data = users[index].data;
            for(var j=0 ;j<data.length; j++){
                (function(a) {
                    var id = data[a].id;           // 商品id
                    var img=data[a].img;          // 商品图
                    var num = data[a].num;        // 商品数量
                    var name = data[a].name;      // 商品名
                    var prices = data[a].prices;  // 商品价格
                    var total=data[a].total;      // 商品总价格

                    $.get("json/goods_1.json",function(event) {
                        $(".shopping_none").hide();
                        for(var l = 0;l < event.length ;l++){
                            if(id == event[l].id){
                                // 添加/创建商品
                                var div11="<div class='shop_product_pic'><a href='goods_1.html?"+  event[l].id +"'><img src="+ event[l].goodsImg.small[0].img +"></a></div>";
                                var div12="<div class='shop_product_name'><a href='#'>"+ event[l].name +"</a></div>";
                                var div1=$("<div class='shop_product'>"+ div11 + div12 +"</div>");
                                var div2=$("<div class='shop_money'>￥<span>"+ event[l].price +"</span></div>");
                                var span01="<span class='increase'>+</span>";
                                var span02="<span class='decrease'>-</span>";
                                var input="<input class='num' type='text' value='"+ num +"' />";
                                var span1="<span class='shop_count_num'>"+ span01 + span02 + input +"</span>";
                                var div3="<div class='shop_count'>"+ span1 +"</div>";
                                var total = parseInt(event[l].price)*num;
                                var div4=$("<div class='shop_allMoney'>￥"+ total +"</div>");
                                var div5=$("<div class='shop_del'><a href='#'>删除</a></div>");
                                var div6=$("<div class='shop_message'></div>");
                                var li=$("<li></li>");
                                var ul=$("<ul class='shopping_cartList'></ul>");

                                li.append(div1,div2,div3,div4,div5,div6);
                                ul.append(li);
                                $(".shopping").append(ul);
                            }
                        }

                        // 删 除
                        $(function(){
                            $(".shop_del a").click(function() {
                                var id=$(this).parent().parent().find(".shop_product_pic").find("a").attr("href").split("?")[1];
                                var users = $.cookie("cart") ? JSON.parse( $.cookie("cart") ) : [];
                                for(var i=0 ; i<users.length ; i++){
                                    if(users.length>=1){
                                        var data = users[index].data;
                                        for(var p =0 ;p<data.length;p++){;
                                            if(id == data[p].id){
                                                $.cookie("cart"," ",{expires: 0, path: "/"})
                                            }
                                        }
                                    }
                                }

                                //$.cookie("cart"," ",{expires: 0, path: "/"});   // 清楚当前在cookie中的数据
                                $(this).parent().parent().remove();     // 在页面上移除cookie
                            })
                        });

                        // 商品数量
                        $(function(){
                            // 加减数量
                            // 减

                            $(".decrease").click(function(){
                                var num=parseInt($(".num").val());
                                var price=parseInt($(".shop_money span").html());
                                var total=price*num;
                                if(num<=1){
                                    $(".num").val(1);
                                    $(".shop_allMoney").html("￥"+price);
                                    return
                                }
                                $(".num").val(num-1);
                                $(".shop_allMoney").html("￥"+(total-price));
                            });
                            // 加
                            $(".increase").click(function(){
                                var num=parseInt($(".num").val());
                                var price=parseInt($(".shop_money span").html());
                                $(".num").val(num+1);
                                $(".shop_allMoney").html("￥"+(price*num+price));
                            })

                        });
                    })
                })(j)
            }


        })(i)
    }
});




