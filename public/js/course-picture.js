define(['jquery','template','util','uploadify'],function($,template,util){
  // 设置导航菜单选中
  util.setMenu('/course/add');
  // 获取课程 ID
  var csId = util.queryString('cs_id');
  // 获取课程封面数据
  $.ajax({
    type:'get',
    url:'/api/course/picture',
    data:{cs_id:csId},
    dataType:'json',
    success:function(data){
      if (data.code == 200) {
        // 解析数据，渲染页面
        var html = template('pictureTpl',data.result);
        $('#pictureInfo').html(html);
        // 处理图片上传
        $('#myfile').uploadify({
          width:80,
          height:'auto',
          buttonText:'选择图片',
          buttonClass:'btn btn-success btn-sm',
          itemTemplate:'<span></span>',
          swf:'/public/assets/uploadify/uploadify.swf',
          uploader:'/api/uploader/cover',
          fileObjName:'cs_cover_original',
          formData:{cs_id:csId},
          onUploadSuccess:function(a,b,c){
            var obj = JSON.parse(b.trim());// 将去除 空格后的 json 字符串转化成对象
            $('.preview img').attr('src',obj.result.path);
          }
        });
      }
    }
  });
});
