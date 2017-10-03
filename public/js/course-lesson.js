define(['jquery','template','util'],function($,template,util){
  // 设置导航菜单选中
  util.setMenu('/course/add');
  // 获取课程 ID
  var csId = util.queryString('cs_id');
  // 获取课时管理数据
  $.ajax({
    type:'get',
    url:'/api/course/lesson',
    data:{cs_id:csId},
    dataType:'json',
    success:function(data){
      if (data.code == 200) {
        // 解析数据，渲染页面
        var html = template('lessonTpl',data.result);
        $('#lessonInfo').html(html);
      }
    }
  });
});
