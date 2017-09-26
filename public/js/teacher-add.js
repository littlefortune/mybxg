define(['jquery','template','util','datepicker','language','validate','form'],function($,template,util,validate){
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

  // 用表单验证和表单提交插件来实现表单的验证提交
  function submitForm(url){
    $('#teacherForm').validate({
      sendForm:false,
      description:{
        name_description:{
          required:'姓名不能为空'
        },
        password_description:{
          required:'密码不能为空',
          pattern:'密码必须为6位数字'
        },
        date_description:{
          required:'日期不能为空'
        }
      },
      valid:function(){// 表单里的元素都验证通过时执行此函数
        $(this).ajaxSubmit({
        // ajaxSubmit() 会将 form下的input/select/textarea元素,都按照 name 属性
        // 自动提交对应的 value 值
          type:'post',
          url:url,
          dataType:'json',
          success:function(data){
            if (data.code ==200) {
              location.href = '/teacher/list';
            }
          }
        });
      }
    });
  }

  // 实现表单提交
  /*function submitForm(url){
    $('#teacherBtn').on('click',function(){
      $.ajax({
        type:'post',
        url:url,
        data:$('#teacherForm').serialize(),
        // jQuery 中获取 form 表单下所有 input/textarea/select 的值,
        // 根据表单的 name 属性，来获取对应的 value 值
        dataType:'json',
        success:function(data){
          if (data.code == 200) {
            location.href = '/teacher/list';
          }
        }
      });
    });
  }*/



});
