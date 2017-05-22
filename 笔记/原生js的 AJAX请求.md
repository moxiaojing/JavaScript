# 原生js的 AJAX

标签（空格分隔）： 原生js的AJAX 

---

##1 AJAX的组成

AJAX是一种创建交互式网页应用的网页开发技术
AJAX = Asynchronous JavaScript(异步js) 和 XHL（标准通用标记语言的子集）

##2 使用form表单提交数据
	
form表单中form标签有一个action和method属性

        action: 提交地址
        method：提交方式（动作，方法）
        
表单控件的name值是前端和后端约定好的，代表一个有意义的属性

**有两种方式获取数据**

1    使用get方式提交数据

    会缓存在浏览器的历史记录中
    数据放在地址的?后面，格式是 ?key=value
    如果有多种 用&&连接，例如 ?key=value&&key=value
    这种方式，浏览器对地址栏的字符长度有限制，如果超出后，会导致发送数据不完整

 2   使用post方式提交数据
 
    不会存在历史记录中，而且会加密，相对安全。传送数据时 理论上是不限大小的，但是服务器会做一些限制

```
<form action="http://localhost/dataphp.php" method="get">
    <p>
        用户名：
        <input type="text" name="user" />
    </p>
    <p>
        密码：
        <input type="password" name="" />
    </p>
    <input type="submit" name="" value="提交" />
</form>

```

在新窗口打开页面
window.open("http://地址","_blank");//地址只能用get方式获取数据

##3 使用AJAX提交数据（流程）

html结构不再使用form

ajax的对象 XMLHttpRequest 中有一个readyState属性,使用 onreadyStatechange 可以监控到 ajax执行到哪一个步骤

    --------------------------------------准备步骤(readyState）
    1--通过构造函数获取ajax对象（new XMLHttpRequest）        0
    2--连接地址，准备数据 （open）                           1
    3--发送数据 （send）                                    2
    4--后端响应数据(不一定响应数据完成)                 3
    5--传输数据完成                                   4
    
    
   
new XMLHttpRequest.open("方式","地址","boolean")，会有3个参数
   1--获取方法
   2--获取数据的地址
   3--获取方式，（true--异步，false--同步）
        true--异步--不用必须等到一件事完成，另一件事可以先执行
        false--同步--必须等到一件事情完成之后，才进行另一件事情
        
```
//使用get方式获取数据
<p>
    用户名：
    <input type="text" name="user" id="text" autocomplete="off" />
    //autocomplete="off"表示阻止记录输入信息
</p>
<p>
    密码：
    <input type="password" name="" />
</p>
<input type="button" name="" value="提交" id="btn" />

<script>
    text.onblur=function(){//失去焦点的时候
    var xhr = new XMLHttpRequest;//ajax的对象
    
    xhr.open("Get","http://localhost/dataphp.php?user="+this.value,false);//准备数据，同步，浏览器会给一个警告
    
    xhr.onload=function(){//表示请求完成，拿到数据完成
    之后要做的事情
        tips.innerHTML = xhr.responseText；//拿到后端返回的数据
    }
    
    xhr.send();//发送数据,要写在onload后面，避免用户下载文件的时候，会产生的bug
    
    console.log("我是被同步执行的语句")；//会等到ajax返回结果之后，才会执行，在等待过程中浏览器会出现一条黄色的建议警告（建议异步）
    }

</script>
```

post可以提交多种格式的数据，要设置一个请求头---xhr.setRequestHeader("Content-Type",'application/x-www-form-urlencoded')（固定方式），目的是告诉后端要请求什么格式的数据

```
//使用post方式获取数据

 xhr.open("post","http://localhost/dataphp.php?user="+this.value,false);//准备数据，同步，浏览器会给一个警告
 
xhr.setRequestHeader("Content-Type",'application/x-www-form-urlencoded');//请求头--是固定不变的

xhr.send("user="+this.value)；//传输数据要写在send中

```


##4 提交的地址需要用url格式

浏览器只认识ＵＲＬ格式
chrome 浏览器会自动将中文转成 URL 格式
但是 IE 没有办法自动转换成 URL 格式，不认识中文
encodeURl（）-----中文解析成url格式
decodeURL（）----url格式解析成中文

如果使用post格式，在请求头里已经设置好了，不需要重新转换格式

上传文件-----一般用post方式

new FormData（），可以转成二进制格式对象，
它只有一个方法----append（key，resource），2个参数
key值--前后端约定好的
resource--获取到的资源


//form表单,通过下面的input--file，可以打开本地文件
<input type="file" id="fileInput"/>

//file中value存储的是上传资源的路径
资源 实际存放在---这个控件中的files属性里面，这个files属性是一个数组
```
//下面是一个进度条运动的效果
<div id="progressBox">
<div id="loading1"></div>//颜色red
<span id="loading2">0%</span>//进度百分比
</div>
xhr.upload.onprogress=function(ev){
  var p = Math.round(ev.loaded/ev.total*100+"%");//完成进度
  
}
```


##5 同源策略
    是一种约定
    所谓同源，就是域名，协议，端口相同，
    只要有一个不同，就会产生跨域，一般会用jsonp技术实现跨域请求
###5.1 域名
    域名指的是就是IP地址
    如果域名和IP绑定，需要DNS解析
        主域名：https://www.baidu.com/
    	二级域名：http://news.baidu.com/
    	三级域名：http://29.classcase.sinaapp.com/
    	
###5.2  协议
    不同服务器之间通信的一种约定
    
  提示：  
    No 'Access-Control-Allow-Origin' header is present on the requested resource.
    表示php文件中没有同意跨域，也就是说，没有
    Header（Access-Control-Allow-Origin:"*"）//*表示不管谁来请求，我都同意
    
###5.3  使用ajax跨域访问
####5.3.2    后端写一个请求头
php为例： Header（Access-Control-Allow-Origin:"*"）
 // *表示不管谁来请求，我都同意
  
####5.3.3     代理方式
后端语言是不存在跨域的，访问自己域下的后台文件，在后台文件中请求别的域上的数据
####5.3.1 flash
    这种方法快挂掉了
    
####5.3.4    jsonp（json + padding）使用json格式填充数据
    可以跨域访问的标签
    img script link
    每一种标签不关心获取的内容，只关心文件内容是否能被解析
img 图片编码是base64格式

    jsonp方法使用的是 script
```
//动态创建script标签，
//使用jsonp方式请求服务器，只能是get方式
    var script = document.createElement("script");
//写的是要请求的地址
    script.src=""；
    document.body.appendChild(script);  
    
```

