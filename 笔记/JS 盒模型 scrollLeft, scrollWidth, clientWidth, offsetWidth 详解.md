# JS 盒模型 scrollLeft, scrollWidth, clientWidth, offsetWidth 详解 

标签（空格分隔）： JS盒模型

---

    网页可见区域宽：document.body.clientWidth
    网页可见区域高：document.body.clientHeight
    网页可见区域宽：document.body.offsetWidth (包括边线的宽)
    网页可见区域高：document.body.offsetHeight (包括边线的宽)
    网页正文全文宽：document.body.scrollWidth
    网页正文全文高：document.body.scrollHeight
    网页被卷去的高：document.body.scrollTop
    网页被卷去的左：document.body.scrollLeft
    网页正文部分上：window.screenTop
    网页正文部分左：window.screenLeft
    屏幕分辨率的高：window.screen.height
    屏幕分辨率的宽：window.screen.width
    屏幕可用工作区高度：window.screen.availHeight
    屏幕可用工作区宽度：window.screen.availWidth

 

本节代码主要使用了Document对象关于窗口的一些属性，这些属性的主要功能和用法如下：

要得到窗口的尺寸，对于不同的浏览器，需要使用不同的属性和方法：
    若要检测窗口的真实尺寸，在Netscape下需要使用Window的属性；
    在 IE下需要深入Document内部对body进行检测；
    在DOM环境下，若要得到窗口的尺寸，需要注意根元素的尺寸，而不是元素。

Window对象的innerWidth属性包含当前窗口的内部宽度。Window对象的innerHeight属性包含当前窗口的内部高度。

 
```

//全兼容的 scrollTop:  
var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

```




