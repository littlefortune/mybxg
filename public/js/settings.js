define(['jquery','template','util'],function($,template,util){
  // 调用接口，获取个人信息
  $.ajax({
    type:'get',
    url:'/api/teacher/profile',
    dataType:'json',
    success:function(data){
      if (data.code == 200) {
        // 解析数据，渲染页面
        var html = template('settinsTpl',data.result);
        $('#settingsInfo').html(html);
      }
    }
  });
});
