# JavaScript中如何处理浏览器兼容性

标签（空格分隔）： js处理浏览器兼容性

---
常用的 jQuery可以避免兼容性问题

##1、 检测该浏览器是不是支持某个方法

用if判断语句
```
if(document.fangfa){
    表示支持该方法
}else{
    不支持该方法
    就要自己封装一个方法
}

```
##2、 获取元素
###获取元素
    全兼容：
        getElementById
    	getElementsByTagName
				
	部分兼容：			
        getElementsByClassName  ie6,7，8不支持
        querySelector           ie6,7不支持
        querySelectorAll	ie6,7不支持
    
###获取元素的css样式，不是行间样式

    高版本使用 
        window.getComputedStyle 获取,返回值是一个对象 
        
    低版本使用
        element.currentStyle 获取,
        
----------------------------------
##3、 主流浏览器内核

    IE内核----Trident 
    Firefox内核----Gecko
    苹果系统Safari和Chrome内核----Webkit
    Opera内核------Presto

-----------------------------------------
##4、 DOM ---属性

    firstElementChild---不兼容，ie9（包含ie9）以上兼容
    
    firstChild----返回第一个子节点
    在高版本浏览器中，会获取第一个子节点--包括-空白文本节点#text（回车或空格造成的）
    在低版本浏览器中，会获取第一个元素子节点

    childNodes---标准，但不兼容，某个元素下的所有子节点，包括文本节点和元素节点

    children---非标准，全兼容，只获取元素节点


---------------------------------------

##5、 BOM方法--和--DOM方法

    BOM方法  --- window.方法

    window.innerWidth---可视区域的宽度
    
    DOM方法 ---- document.方法

    document.document.clientWidth---可视区域的宽度
    
 pageXOffset 设置或返回当前页面相对于窗口显示区左上角的 X 位置。
 pageYOffset 设置或返回当前页面相对于窗口显示区左上角的 Y 位置。
 有兼容性，ie8及以下浏览器不支持，可以替换为：
 
    document.documentElement.scrollTop/scrollLeft----页面向上/左 偏移了多少，chrome下是0
     
    document.body.scrollTop/scrollLeft----页面向上/左 偏移了多少，ie下面是0
    
   
    
##6、 Event对象---事件出发后的信息

高版本
事件对象---作为事件处理函数的第一个参数

低版本ie6、7、8 
获取事件对象，全局有一个event变量，保存事件触发后的细节


如果全局打印一个event
```
console.log(event) //此时event是变量
console.log(window.event) //此时event是window的event属性

//火狐会报错--说明event不存在
//chrome和ie都不会报错，说明存在event

btn.onclick = function(ev){

    var e = ev || event;//ev 和 event 顺序不能变，否则火狐会报错
    
    //如果非要交换位置，那么要写成
   // var e = window.event || ev;

}
```
##7、 绑定事件处理函数

高版本（含ie10）使用***addEventListener***

		1.事件名称不用带on
		2.顺序绑定，顺序执行 - 队列
		3.支持捕获模式
		4.事件函数中的this指向触发该事件的对象
```
element.addEventListener(evName,evFn,true|false)-----是否捕获
```
    

低版本（ie6、7、8、9 ）***detachEvent***

		1.事件名称需要带on
		2.顺序绑定，倒序执行 - 栈
		3.不支持捕获模式
		4.事件函数中的this指向window

```
element.attachEvent(on+evName,evFn)---只有冒泡节点
```
   
	
		
事件处理函数中的this----指向window,不指向事件触发元素

绑定多个事件处理函数，执行顺序是倒序的，后写的先执行
```
function fn(ev){
	alert(this);
	alert(ev);
}

btn.attachEvent("onclick",function (){
	fn.call(btn,event);
})

/*btn.attachEvent("onclick",function (){
	alert(this)//指向window
}.call(btn))*/


```

解决兼容性，只能封装一个函数
```
function on(element,evName,evFn,boolean){
    if(element.addEventListener){
        element.addEventListener(evName,evFn,boolean);//是否捕获
    }else if(element.attachEvent){
        element.attachEvent("on"+evName，function(){
            evFn.call(element,event);//将this指向调用函数的对象
        
        });
    }else{
        element[on+"evName"]
    }

}

```


##8、 解绑事件处理函数

addEventListener-----removeEventListener
attachEvent-----------detachEvent

由attachEvent绑定的事件处理函数，不能解绑，因为匿名函数不能解绑

##9、 滚轮事件

mousewheel -----  ie、chrome --- 在document上 用on绑定
    事件对象属性 wheelDelta
    
DOMMouseScroll ------firefox --- 在document上 用addEventListener
    事件对象属性 detail
```
document.onmousewheel = wheelFn;//ie和chrome
document.addEventListener("DOMMouseScroll",wheelFn)//firefox

function wheelFn(ev){
	console.log( ev.wheelDelta );
	console.log( ev.detail );
}
```
    
##10、    阻止冒泡和默认事件
###阻止浏览器默认行为
    
    通过 addEventListener（DOM2事件模型）来绑定，那么需要使用
    event.preventDefault()
    
    通过 对象.on事件名称=函数（DOM1事件模型）来绑定，那么需要使用
    return false

###阻止冒泡
    event.cancelBubble()
	   和children很像，不是标准方法，但是每个浏览器都支持
	
	event.stopPropagation()
	    标准推荐使用,但是这个方法非标准ie是不支持的

##11、    事件源
	标准：
		ev.target
		
	非标准ie：
		ev.srcElement
		
```
var target = ev.target || ev.srcElement;
```

##12、    AJAX对象

标准：
```
new XMLHttpRequest();
```
监控ajax状态用 onload：
```
var xhr = new XMLHttpRequest();
xhr.onload = function(){ }
```

ie6低版本:
```
new ActiveXObject("Microsoft.XMLHTTP");
```
监控ajax状态使用 onreadyStatechange：
```
var xhr = new ActiveXObject("Microsoft.XMLHTTP");
 xhr.onreadyStatechange = function(){  }
```


   
   
   
   
   
   
   
   
   
   
   
