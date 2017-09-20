define(['jquery','cookie'], function ($) {
  /*NProgress.start();
  NProgress.done();*/

  $('.navs ul').prev('a').on('click', function () {
    $(this).next().slideToggle();
  });

  // 实现退出功能
  $('#logoutBtn').on('click',function(){
    $.ajax({
      type:'post',
      url:'/api/logout',
      dataType:'json',
      success:function(data){
        if (data.code == 200) {
          // 重新跳转到登录页
          location.href = '/main/login';
        }
      }
    });
  });

  // 检测用户是否登录

  var flag = $.cookie('PHPSESSID');
  if (!flag && location.pathname != '/main/login') {// 域名不是 登录页面的时候，才跳转
  // 只要登录过，服务器就会生成 PHPSESSID，不存在就代表没登陆过
    // 如果 cookie 不存在，跳转到登录页
    location.href = '/main/login';
  }

  // 设置用户头像信息
  var loginInfo = $.cookie('loginInfo');
  loginInfo = loginInfo && JSON.parse(loginInfo);
  // JSON.parse (str) 将 js 字符串转换成 json 对象数据格式
  $('.aside .profile .avatar > img').attr('src',loginInfo.tc_avatar);
  $('.aside .profile h4').html(loginInfo.tc_name);

});