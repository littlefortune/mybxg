<?php
  
  // 后端路由 (根据 url 的不同响应不同的页面)
  header('content-type:text/html;charset=utf8');
  // include ('子页面路径')   在当前 PHP 页面内嵌入一个子页面
  // include('/.gitignore/header.html');
  // echo '<div>主页内容</div>';
  // include('/.gitignore/footer.html');

  // 必须能通过 url 区分用户想要访问哪个页面

  // include('./views/main/index.html');

  // php 中的全局变量 $_SERVER
  // var_dump($_SERVER);

  // 默认目录名称
  $dir = 'main';
  
  // 默认文件名称
  $filename = 'index';

  // echo $path;
  // 处理 url 的路径
  // array_key_exists(key,search) 判断 key 在数组 search 中是否存在，true/false
  if (array_key_exists('PATH_INFO',$_SERVER)) {
    // PATH_INFO 属性存在
    // 获取请求路径
    $path = $_SERVER['PATH_INFO'];//   /main/index

    // 去掉第一个 '/'   substr(string,start) 从字符串的索引 start 位置截取到最后
    $str = substr($path, 1); // main/index

    // 字符串分割，和 js 中字符串的 split 方法类似
    $ret = explode('/', $str); // 将字符串分割成数组
    //var_dump($ret);

    // 数组中元素的个数，类似 js 中的长度  count()
    if (count($ret) === 2) {
      // 路径有两层
      $dir = $ret[0];// 覆盖目录
      $filename = $ret[1]; // 覆盖文件名称
    } else {
      // 其他情况全部跳转到登录页面
      $filename = 'login';
    }
  }
  // 嵌入子页面
  include('./views/'. $dir .'/'. $filename .'.html');
?>
