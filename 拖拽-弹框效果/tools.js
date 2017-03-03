var tools = {
	on:function( ele,evName,evFn ){
		ele.addEventListener( evName,evFn ,false );
	},
	
	//解除ele 身上绑定的 evName 事件的处理函数 evFn
	off:function( ele,evName,evFn ){//解除ele 身上绑定的 evName 事件的处理函数 evFn
		ele.removeEventListener( evName,evFn ,false );
	}
}
