define(['jquery','template','util'],function($,template,util){
  // 设置导航菜单选中
  util.setMenu('/course/add');
  // 获取课程 ID
  var csId = util.queryString('cs_id');
  // 获取操作标志位
  // (有此标志位表示是编辑操作，因为根据 cs_id 区分不出到底是添加还是编辑)
  var flag = util.queryString('flag');
  // 根据课程 ID 查询课程相关信息
  $.ajax({
    type:'get',
    url:'/api/course/basic',
    data:{cs_id:csId},
    dataType:'json',
    success:function(data){
      if (flag) {
        data.result.operate = '课程编辑';    
      } else {
        data.result.operate = '课程添加';
      }
      if (data.code == 200) {
        var html = template('basicTpl',data.result);
        $('#basicInfo').html(html);
      }
    }
  });
});
