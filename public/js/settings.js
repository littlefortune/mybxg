define(['jquery','template','uploadify','datepicker','language','region'],function($,template){
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
        
      }
    }
  });
});
