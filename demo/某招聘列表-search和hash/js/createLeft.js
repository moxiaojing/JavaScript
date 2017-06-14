var oWrap=document.getElementById("wrap");
var oUl=oWrap.getElementsByTagName("ul")[0];
var img=document.getElementById("img1");

var lis=oUl.getElementsByTagName("li");
var sea=window.location.search.substr(1);//获取search 
var has=window.location.hash.substr(1);//全局获取hash值

function createList(a,b){//a表示li的自定义属性lx；b表示a标签的innerHTML
	var li=document.createElement("li");//生成li
	var a=document.createElement("a");//生成li里面的a
	li.className="";
	li.type=a;
	a.innerHTML=b;
	a.href="javascript:;";
	li.appendChild(a);
	oUl.appendChild(li);
	
	
	/////////点击li，改变search////////////////////////////////////
	
}

(function(){//初始化
	for(var i=0;i<(aData.list).length;i++){
		createList((aData.list)[i].lx,(aData.list)[i].text);
		var lis=oUl.getElementsByTagName("li");
		lis[0].className="focus";
	}
	
	if(sea==""){
		sea=aData.list[0].lx;
	}
	if(has==""){
		has=1;
	}
	
})();

for(var i=0;i<lis.length;i++){//li的个数，取决于aData.list的长度
	lis[i].index=i;
	lis[i].onclick=function(){
		window.location.search=aData.list[this.index].lx;//改变search的值
	}
}

for(var i=0;i<lis.length;i++){//点击的时候，对应的li背景颜色发生变化
	if(sea== aData.list[i].lx){//sea的值是点击以后生成的，动态变化的，根据sea的值，判断是点击的li
		
		for(var j=0;j<lis.length;j++){
			lis[j].className="";//全部清空
		}
		
	lis[i].className="focus";
			img.src=aData[sea].img;
//			changeRight(sea,1);
//			changePage(sea);
//			
	}
}