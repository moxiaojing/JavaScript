(function () {
	var size = {w: 300, h: 300};
	var mouse = {x: 0, y: 0};
	var controls = {
	    button: document.querySelector('button'),
		size: document.querySelector('input[type=number]'),
		color: document.querySelector('input[type=color]')
	};

  	var canvas = document.querySelector('canvas');
  	var ctx = canvas.getContext('2d');
 	canvas.width = size.w;
 	canvas.height = size.h;
  	ctx.lineJoin = 'round';//控制两条线相交处是 round / bevel (斜交) / miter (斜接)
  	ctx.lineCap = 'round';//控制线条末端的形状是 round / butt (平头) / square (方头)
	  
	var onPaint = function () {
	    ctx.lineWidth = controls.size.value;//线条粗细
	    ctx.strokeStyle = controls.color.value;//线条颜色
	    ctx.lineTo(mouse.x, mouse.y);//绘制到目标点
	    ctx.stroke();//绘制路径
	};
	
  	canvas.addEventListener('mousemove', function(e) {
    	mouse.x = e.pageX - this.offsetLeft;
    	mouse.y = e.pageY - this.offsetTop;
 	}, false);

  	canvas.addEventListener('mousedown', function(e) {
    	ctx.beginPath();//开始路径
    	ctx.moveTo(mouse.x, mouse.y);//将起始点移动到x，y，但是不画线
    	canvas.addEventListener('mousemove', onPaint, false);
  	}, false);

  	document.addEventListener('mouseup', function() {
    	canvas.removeEventListener('mousemove', onPaint, false);
    	
  	}, false);
  
  	controls.button.addEventListener('click', function () {
    	ctx.clearRect(0, 0, canvas.width, canvas.height);//清除画布里面的线条
  	});
  	
	document.addEventListener('mousedown', function(e) {
    	e.preventDefault();//阻止浏览器默认事件
  	}, false);
  	
}());