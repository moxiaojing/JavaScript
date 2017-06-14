var oWrap=document.getElementById("wrap");
var oUl=oWrap.getElementsByTagName("ul")[0];
var img=document.getElementById("img1");

var lis=oUl.getElementsByTagName("li");
var sea=window.location.search.substr(1);//获取search 
var has=window.location.hash.substr(1);//全局获取hash值

var oContent=document.getElementById("content");

function createList(a,b){//a表示li的自定义属性lx；b表示a标签的innerHTML
	var li=document.createElement("li");//生成li
	var a=document.createElement("a");//生成li里面的a
	li.className="";
	li.type=a;
	a.innerHTML=b;
	a.href="javascript:;";
	li.appendChild(a);
	oUl.appendChild(li);
	
	///////////////点击li，改变search/////////////////////////////////
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
	if(has==""){
		has=1;
		window.location.hash=has;//这一步是改变的地址栏的真正内容
	}
	
})();

for(var i=0;i<lis.length;i++){//li的个数，取决于aData.list的长度
	lis[i].index=i;
	lis[i].onclick=function(){
		window.location="list.html?"+aData.list[this.index].lx+"#"+1;
//		createRightContent(sea,has-1);
	}
}

for(var i=0;i<lis.length;i++){//点击的时候，对应的li背景颜色发生变化
	if(sea== aData.list[i].lx){//sea的值是点击以后生成的，动态变化的，根据sea的值，判断是点击的li
		
		for(var j=0;j<lis.length;j++){
			lis[j].className="";//全部清空
		}
		
	lis[i].className="focus";
	img.src=aData[sea].img;	
			
	}
}

/*-------------生成右侧内容---------------------------------------------*/
createRightContent(sea,has-1);

//console.log(sea,has);

function createRightContent(a,b){//生成右侧内容,a表示校园还是社会，search值；b表示点击的a的索引
	
	var newdata = aData.date( aData[a].text[b].sj,0 );//格式化日期
	
	var h2=document.createElement("h2");
	h2.innerHTML=aData[a].text[b].zw;//点击的a的innerHTML
//	h2.innerHTML="测试工程师11【社会招聘】";
	
	var div1=document.createElement("div");
	var span1=document.createElement("span");
	span1.className="l";
//	span1.innerHTML="招聘公司：北京智信创通信息技术有限公司查看公司地理位置>>";
	span1.innerHTML="招聘公司："+aData[a].text[b].gs;
	var span2=document.createElement("span");
	span2.innerHTML="公司性质："+aData[a].text[b].xz;
	
	var span3=document.createElement("span");
	span3.className="l";
	span3.innerHTML="职位性质："+aData[a].text[b].gz;
	
	var span4=document.createElement("span");
	span4.innerHTML="工作地点："+aData[a].text[b].dd;
	
	var span5=document.createElement("span");
	span5.className="l";
	span5.innerHTML="工作经验："+aData[a].text[b].jy;
	
	var span6=document.createElement("span");
	span6.innerHTML="学历要求："+aData[a].text[b].xl;
	
	var span7=document.createElement("span");
	span7.className="l";
	span7.innerHTML="招聘人数："+aData[a].text[b].rs;
	
	var span8=document.createElement("span");
	span8.innerHTML="薪资待遇："+aData[a].text[b].dy;
	
	var span9=document.createElement("span");
	span9.className="l";
	span9.innerHTML="发布日期："+newdata;
	
	var span10=document.createElement("span");
	span10.className="l";
	span10.innerHTML="招聘类型："+aData[a].text[b].lx;
	
	div1.appendChild(span1);
	div1.appendChild(span2);
	div1.appendChild(span3);
	div1.appendChild(span4);
	div1.appendChild(span5);
	div1.appendChild(span6);
	div1.appendChild(span7);
	div1.appendChild(span8);
	div1.appendChild(span9);
	div1.appendChild(span10);
	
	var div2=document.createElement("div");
	div2.className="clear";
	
//	var dl1=document.createElement("dl");
//	var dt1=document.createElement("dt");
//	dt1.innerHTML="工作职责：";
//	dl1.appendChild(dt1);
//	var dd1=document.createElement("dd");
//	dd1.innerHTML=aData[a].text[b].info;
//	dl1.appendChild(dd1);
//	
//	
//	var dl2=document.createElement("dl")
//	var dt2=document.createElement("dt");
//	dt2.innerHTML="岗位要求：";
//	dl2.appendChild(dt2);
//	
//	var dd2=document.createElement("dd");
//	dd2.innerHTML="1.计算机或相关专业本科以上学历；";
//	var dd3=document.createElement("dd");
//	dd3.innerHTML="2.从事软件测试工作3年及以上；";
//	var dd4=document.createElement("dd");
//	dd4.innerHTML="3.具备良好的沟通能力和快速学习能力；";
//	var dd5=document.createElement("dd");
//	dd5.innerHTML="4.精通测试策略和方法、测试用例设计；";
//	var dd6=document.createElement("dd");
//	dd6.innerHTML="5.熟悉DB2、AIX等平台的基本操作；";
//	var dd7=document.createElement("dd");
//	dd7.innerHTML="6.具备2年以上金融IT行业经验，特别是有金融行业相关业务的测试或者开发工作经验者优先。";
//	
//	dl2.appendChild(dd2);
//	dl2.appendChild(dd3);
//	dl2.appendChild(dd4);
//	dl2.appendChild(dd5);
//	dl2.appendChild(dd6);
//	dl2.appendChild(dd7);
//	

	oContent.appendChild(h2);
	oContent.appendChild(div1);
	oContent.appendChild(div2);
	
	for(var i=0;i<aData[a].text[b].info.length;i++){
		var dl=document.createElement("dl");
		var dt=document.createElement("dt");
		dt.innerHTML=aData[a].text[b].info[i].t;
		dl.appendChild(dt);
		oContent.appendChild(dl);
	}

	var p1=document.createElement("p")
	p1.innerHTML=aData.email;
//	p1.innerHTML="有意者请投递简历至 liuyajuan@fulan.com.cn";
	
	oContent.appendChild(p1);
	
	//根据info的长度生成对应个数的dl
//		for (var i = 0; i < data.info.length; i++) {
//			str += "<dl><dt>"+ data.info[i].t +"</dt>";
//			for (var j = 0; j < data.info[i].l.length; j++) {
//				str += "<dd>"+ data.info[i].l[j] +"</dd>";
//			}
//			str += "</dl>";
//		}
//		str += '<p>有意者请投递简历至 '+ aData.email +'</p>';
		
	
	
//	oContent.appendChild(dl1);
//	oContent.appendChild(dl2);
}
