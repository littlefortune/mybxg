define(['jquery'],function($){
  return {
    queryString:function (key){
      // 获取 url 中指定参数 key 的值 value
      var param = location.search.substr(1);
      var result = null;
      if (param) {
        var ps = param.split('&');
        $.each(ps,function(i,item){ // $.each(数组,function(i,item){})
         var kv = item.split('=');
         if (key == kv[0]) {
          result = kv[1];
          return false;// 终止 each 循环
         }
        });
      }
      return result;
    }
  }
});
