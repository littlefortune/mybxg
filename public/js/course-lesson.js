define(['jquery','template','util','bootstrap'],function($,template,util){
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
        // 绑定添加课时事件
        $('#addLesson').on('click',function(){
          var html = template('modalTpl',{operate:'添加课时'});
          $('#modalInfo').html(html);
          // 显示模态框
          $('#chapterModal').modal();
        });
        // 绑定编辑课时事件
        $('.edit').on('click',function(){
          // 获取课时 ID
          var ctId = $(this).attr('data-ctId');
          // 根据课时 ID 查询课时数据信息
          $.ajax({
            type:'get',
            url:'/api/course/chapter/edit',
            data:{ct_id:ctId},
            dataType:'json',
            success:function(data){
              data.result.operate = '编辑课时';
              var html = template('modalTpl',data.result);
              $('#modalInfo').html(html);
              // 显示模态框
              $('#chapterModal').modal();
            }
          });
        });
      }
    }
  });
});
