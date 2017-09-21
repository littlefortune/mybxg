define(['jquery','template','bootstrap'],function($,template){
  // 调用接口获取所有的讲师数据
  $.ajax({
    url:'/api/teacher',
    type:'get',
    dataType:'json',
    success:function(data){
      var html = template('teacherTpl',{list:data.result});
      $('#teacherInfo').html(html);

      // 注销启用讲师功能
      $('.enabledOrDisabled').on('click',function(){
        // var td = $(this).parent('td');
        var that = this;
        var td = $(this).closest('td');// closest() 某个元素最近的父元素 
        var tcId = td.attr('data-tcId');
        var tcStaus = td.attr('data-status');
        $.ajax({
          type:'post',
          url:'/api/teacher/handle',
          data:{tc_id:tcId,tc_status:tcStaus},
          dataType:'json',
          success:function(data){
            if (data.code == 200) {
              td.attr('data-status',data.result.tc_status);
              if (data.result.tc_status == 1) {
                $(that).text('启用');
              } else {
                $(that).text('注销');
              }
            }
          }
        });
      });

      // 查看讲师功能
      $('.preview').on('click',function(){
        var td = $(this).closest('td');// closest() 某个元素最近的父元素 
        var tcId = td.attr('data-tcId');
        $.ajax({
          type:'get',
          url:'/api/teacher/view',
          data:{tc_id:tcId},
          dataType:'json',
          success:function(data){
            if (data.code == 200) {
              var html = template('modalTpl',data.result);
              $('#modalInfo').html(html);
              $('#teacherModal').modal();// 弹出模态框
            }
          }
        });
      });
    }
  });
});
