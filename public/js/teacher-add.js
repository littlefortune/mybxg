define(['jquery','template','util'],function($,template,util){
  var tcId = util.queryString('tc_id');
  if (tcId) {
    // 编辑功能
    $.ajax({
      type:'get',
      url:'/api/teacher/edit',
      data:{tc_id:tcId},
      dataType:'json',
      success:function(data){
        data.result.operate = '编辑讲师';// 此处掉坑里了，把结尾的；写成，号了，麻蛋
        // 解析数据，渲染页面
        var html = template('teacherTpl',data.result);
        $('#teacherInfo').html(html);
        // 处理表单提交功能
        submitForm('/api/teacher/update');
      } 
    });
  } else {
    // 添加功能
    var html = template('teacherTpl',{operate:'添加讲师'});
    $('#teacherInfo').html(html);
    submitForm('/api/teacher/add');
  }

  // 实现表单提交
  function submitForm(url){
    $('#teacherBtn').on('click',function(){
      $.ajax({
        type:'post',
        url:url,
        data:$('#teacherForm').serialize(),
        dataType:'json',
        success:function(data){
          if (data.code == 200) {
            location.href = '/teacher/list';
          }
        }
      });
    });
  }



});
