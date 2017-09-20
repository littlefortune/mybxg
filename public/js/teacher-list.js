define(['jquery','template'],function($,template){
  // 调用接口获取所有的讲师数据
  $.ajax({
    url:'/api/teacher',
    type:'get',
    dataType:'json',
    success:function(data){
      console.log(data.result);
      var html = template('teacherTpl',{list:data.result});
      $('#teacherInfo').html(html);
    }
  });
});
