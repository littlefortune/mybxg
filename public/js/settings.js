define(['jquery','template','ckeditor','validate','form','uploadify','datepicker','language','region'],function($,template,CKEDITOR,validate){
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
        // 上传头像
        $('#upfile').uploadify({
          width:120,// 设置宽，高
          height:120,
          buttonText:'',// 将按钮的文本置空
          itemTemplate:'<span></span>',// 将图片上传时的进度条置空
          swf:'/public/assets/uploadify/uploadify.swf',//里边封装了 flash 的代码
          uploader:'/api/uploader/avatar',//图片上传的地址
          fileObjName:'tc_avatar',//要求的数据，此名称就可以直接代表图片
          onUploadSuccess:function(a,b,c){// b 代表我们需要的参数，是字符串
            var obj = JSON.parse(b);// 将 json 字符串转化成 json 对象
            $('.preview img').attr('src',obj.result.path); 
          }
        });
        // 省市区 下拉联动
        $('#pcd').region({
          url:'/public/assets/jquery-region/region.json'
        });
        // 添加富文本功能
        CKEDITOR.replace('editor',{
          toolbarGroups : [
            { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
            { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
            { name: 'links', groups: [ 'links' ] }
          ]
        });
        // 处理表单提交
        $('#settingsForm').validate({
          sendForm:false,
          valid:function(){
            // 获取家乡信息
            var p = $('#p').find('option:selected').text();
            var c = $('#c').find('option:selected').text();
            var d = $('#d').find('option:selected').text();
            var hometown = p + '|' + c + '|' + d;
            // 同步富文本内容
            for(var instance in CKEDITOR.instances){
              CKEDITOR.instances[instance].updateElement();
            }
            // 提交表单
            $(this).ajaxSubmit({
              type:'post',
              url:'/api/teacher/modify',
              data:{tc_hometown:hometown},
              dataType:'json',
              success:function(data){
                if (data.code == 200) {

                  // 修改成功后重新刷新当前页面
                  // location.reload();
                }
              }
            });
          }
        });
        
      }
    }
  });
});
