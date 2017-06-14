/*
 * 思路：
 * 1、生成左侧的li（两个页面中都有用到）
 * 2、给li添加点击事件，控制地址栏的search值；刷新页面，同时对应 生成右侧的内容
 * 3、点击右侧的a标签，实现页面跳转到content.html，content页面中显示的是a标签的职位对应的content信息
 */
var oWrap=document.getElementById("wrap");
var oUl=oWrap.getElementsByTagName("ul")[0];
var lis=oUl.getElementsByTagName("li");
var img=document.getElementById("img1");
var sea=window.location.search.substr(1);//获取search 
var has=window.location.hash.substr(1);//全局获取hash值
var info1=document.getElementById("info1");
var jumpAs=info1.getElementsByTagName("a");//全局获取跳转页面的 a标签

var prev1=document.getElementById("prev1");//上一页
var next1=document.getElementById("next1");//下一页

/*------生成左侧li--------------------------------*/
//console.log(oWrap);

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
		window.location.search=sea;
	}
	if(has==""){//如果hash值没有，就给他赋值
		has=1;//只是给变量赋值，并没有真正添加到地址栏
//		window.location.hash=has;//这一步是改变的地址栏的真正内容
	}
	
})();

/*-------------点击li，改变search-----------------------------------------------*/

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
	img.src=aData[sea].img;//改变标题
	changeRight(sea,has);//改变显示的内容的类别
	changePage(sea);//根据不同的类别，改变对应页码的显示数量
	
	}
}

/*----------------生成右侧的内容-----------------------------*/
//jobname:表示职位,在数据aData中是zw
//num:表示招聘人数，在数据aData中是rs
//date:表示发布日期，在数据aData中是sj
//Infos:表示职位需要具备的能力，在数据aData中是info
// i 表示每一个职位（a1标签）对应的索引值
function createRight(jobname,num,date,Infos,i){
	var info1=document.getElementById("info1");
	var p1=document.createElement("p");//生成p标签，class=“zp”，装3个span
	p1.className="zp";//添加class
	var span1=document.createElement("span");
	
	var a1=document.createElement("a");
//	console.log(has);
	a1.href = "content.html?"+sea+"#"+(i+1);
	a1.innerHTML="★ 职位需求："+jobname;
	span1.appendChild(a1);
	
	var span2=document.createElement("span");
	span2.innerHTML="需求人数："+num+"名";
	
	var span3=document.createElement("span");
	span3.className="date";
	span3.innerHTML=date;
	
	p1.appendChild(span1);
	p1.appendChild(span2);
	p1.appendChild(span3);
	
	var p2=document.createElement("p");//生成p标签class=“yq”，装职位需要具备的条件
	p2.className="yq";
//	p2.innerHTML=Infos;
//console.log( Infos.join("") );
//console.log( Infos.join("").slice(0,100) );

	p2.innerHTML=( Infos.join("").slice(0,100) )+"...";//实现文字省略效果
	var a2=document.createElement("a");
	a2.href="content.html?"+sea+"#"+(i+1);
	a2.innerHTML="[查看详情]";
	p2.appendChild(a2);
	info1.appendChild(p1);
	info1.appendChild(p2);
}

function changeRight(a,b){//a表示右侧生成的是 社会招聘sh 还是 校园招聘xy;
//	b表示a标签的innerHTML的值，也就是变量has的值，也就是页码；(b*2-2) 表示生成的是从哪一组开始显示
	for(var i=(b*2-2);i<b*2;i++){	
//		if(aData[a].text[i]==false){//判断如果text的第i项存在，就执行下面，如果不存在，就跳出for循环
//			break;	
//		}

		if(aData[a].text[i]){//判断如果text的第i项存在，就执行下面，如果不存在，就跳出for循环		
			var newdata = aData.date( aData[a].text[i].sj,0 );
			createRight(aData[a].text[i].zw, aData[a].text[i].rs, newdata, aData[a].text[i].info[0].l,i );
		}	
	}
}


/*-----------点击a，跳转页面------------------------------------------------------*/

//for(var i=0;i<jumpAs.length;i++){
//	jumpAs[i].onclick=function(){
//		this.href="content.html?"+sea+"#"+has;
//	}
//}




/*---------生成page页码----------------------------------------------------*/

function createPage(pageNum){
	var page1=document.getElementById("page1");
	var span=document.createElement("span");
	var a=document.createElement("a");
	a.innerHTML=pageNum;
	span.appendChild(a);
	page1.appendChild(span);
	if(pageNum==has){
		a.style.background="#666";
		a.style.color="#fff";
	}
////////////点击页码，改变hash值//////////////////////////

//	a.onclick=function(){
//		window.location.hash=pageNum;
//	}
}
function changePage(a){//根据text的length，生成多少个页码
	var num=0;
//	console.log( aData[a].text.length );
	for(var i=0;i<( (aData[a].text.length) /2 );i++){//循环几遍，就生成几个页码，要求，一页只显示两调岗位信息，就除以2
		num++;
		createPage( num );
	}
}
/*-----------点击page页码，改变hash，同时改变右侧内容------------------------------------------------*/

var info1=document.getElementById("info1");//全局的info1
var as=page1.getElementsByTagName("a");//全局获取所有的页码按钮

//window.location.hash=1;
//console.log("has"+has);

for(var i=0;i<as.length;i++){
	
//	as[i].index=i;//页面跳转到content后，用这个索引，对应显示的右侧的内容
//	as[i].href="content.html?"+sea+"#"+i;
//	console.log(as[i]);
	
	as[i].onclick=function(){
		info1.innerHTML="";//点击时，先清空，再生成
		window.location.hash=this.innerHTML;//表示本页地址栏#后面 显示的页面
		for(var j=0;j<as.length;j++){
			as[j].style.background="";
			as[j].style.color="";
		}
		this.style.background="#666";
		this.style.color="#fff";
		if(sea==""){
			sea=aData.list[0].lx;
		}
		changeRight( sea,window.location.hash.substr(1) );
		
	}
}

/*----------上一页、下一页----------------------------------------------------*/
console.log(prev1);

prev1.onclick=function(){
//	alert(1);
	var addHas=window.location.hash.substr(1);
	if(addHas==1){
		alert("亲，已经是第一页喽~");
		return;
	}
	
	addHas--;
	
	info1.innerHTML="";
	for(var j=0;j<as.length;j++){//先全部清空a的样式，再生成
		as[j].style.background="";
		as[j].style.color="";
	}
	console.log(as[addHas]);
	as[addHas-1].style.background="#666";
	as[addHas-1].style.color="#fff";
	
	changeRight( sea,addHas );
	window.location.hash=addHas;
	
	
}

next1.onclick=function(){
	var addHas=window.location.hash.substr(1);
	if(addHas==as.length){
		alert("亲，已经是最后一页喽~");
		return;
	}

	addHas++;
	
	console.log(as[addHas]);
	
	info1.innerHTML="";
	for(var j=0;j<as.length;j++){//先全部清空a的样式，再生成
		as[j].style.background="";
		as[j].style.color="";
	}
	
	as[addHas-1].style.background="#666";
	as[addHas-1].style.color="#fff";
	
	changeRight( sea,addHas );
	window.location.hash=addHas;
}
