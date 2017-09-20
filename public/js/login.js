define(['jquery','cookie'],function($){
  // 登录功能
  $('#loginBtn').on('click', function () {
	$.ajax({
	  type:'post',
	  url:'/api/login',
	  data:$('#loginForm').serialize(),
	  dataType:'json',
	  success: function (data) {
		// console.log(data);
		if (data.code == 200) {
		  // 把用户的登录信息存储到 cookie 中，方便跨页面共享数据
		  $.cookie('loginInfo',JSON.stringify(data.result),{path:'/'});
		  // JSON.stringify(json) 把复杂类型的 json 数据转化成 js 字符串
		  // 登录成功，跳转到主页面
		  location.href = '/main/index';
		}
	  }
	});
	return false;// 阻止按钮的默认行为，submit 会自动提交
  });
});