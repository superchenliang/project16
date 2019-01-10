/**
 * Created by Administrator on 16-9-14.
 */

$(function(){

    // 用户
    $("#name").blur(function(){
        var tel=$(this).val();
        if(/^1[3578]\d{9}$/.test(tel)){
            $(".p1").html("");
        }else{
            $(".p1").html("用户名不正确");
        }
    })
    // 密码�����
    $("#pwd").blur(function(){
        var pas=$(this).val();
        if(/^[0-9a-zA-Z_]{8,15}$/.test(pas)){
            $(".p2").html("");
        }else{
            $(".p2").html("密码不正确");
        }
    })

    // 再次输入密码
    $("#pwd_again").blur(function(){
        var pass=$(this).val();
        if($(this).val()==$("#pwd").val()){
            $(".p3").html("");
        }else{
            $(".p3").html("密码不一致!");
        }
    })

    // 重置验证码
    function reset_code(){
        var strSum="";
        for(var i=0;i<4;i++)
        {
            //  数字0-9(10位)       48-57
            var sum=parseInt(Math.random()*10)+48;
            //  大写字母A-Z(26位)    65-90
            var num=parseInt(Math.random()*26)+65;
            //  小写字母a-z(26位)    97-122
            var smallNum=parseInt(Math.random()*26)+97;
            //  随机数
            var a=parseInt(Math.random()*10);
            if(a%3==0)
            {
                strSum=strSum.concat(String.fromCharCode(sum));
            }else if(a%3==1){
                strSum=strSum.concat(String.fromCharCode(num));
            }else{
                strSum=strSum.concat(String.fromCharCode(smallNum));
            }
        }
        $(".identifying_code").html(strSum);
    }
    reset_code()
    // 点击刷新验证码
    $(".identifying_code").click(function(){
        reset_code()
    })

    // 验证框
    $("#code").blur(function(){
        if($(this).val()==$(".identifying_code").html()){
            $(".p4").html("");
        }else{
            $(".p4").html("验证码不正确");
        }
    })

    //   注 册
    $("#btn").click(function(){
        var users = $.cookie("users") ? JSON.parse($.cookie("users")) : [];
        //
        for (var i=0; i<users.length; i++) {
            if ( users[i].name == $("#name").val() ) {
                console.log("用户名已存在! 不能注册相同的用户");
                return;
            }
        }

        if($("#name").val().length <= 0){
            $(".p1").html("用户不能为空");
            return;
        }
        if($("#pwd").val().length <= 0){
            $(".p2").html("密码不能为空");
            return;
        }
        if(! ($("#pwd").val() == $("#pwd_again").val()) ){
            $(".p3").html("两次密码输入不一致");
            return;
        }

        var user = {
            name: $("#name").val(),
            pwd: $("#pwd").val(),
            pwd_again:$("#pwd_again").val(),
            code:$("#code").val()
        }
        users.push(user);

        $.cookie("users", JSON.stringify(users), {expires:22, path:"/"});
        console.log( $.cookie("users") );
        window.location.href="entry.html";
    })

})
