define(['jquery','template','util','ckeditor'],function($,template,util,CKEDITOR){
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
      // 处理二级分类的下拉联动
      $('#firstType').on('change',function(){
        var pid = $(this).val();
        $.ajax({
          type:'get',
          url:'/api/category/child',
          data:{cg_id:pid},
          dataType:'json',
          success:function(data){
            var tpl = '<option>请选择二级分类...</option>' 
            + '{{each list}} <option value="{{$value.cg_id}}">'
            + '{{$value.cg_name}}</option> {{/each}}';
            var html = template.render(tpl,{list:data.result});
            $('#secondType').html(html);
          }
        });
      });
      // 处理富文本功能
      CKEDITOR.replace('editor',{
        toolbarGroups : [
          { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
          { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
          { name: 'links', groups: [ 'links' ] }
        ]
      });
    }
  });
});
