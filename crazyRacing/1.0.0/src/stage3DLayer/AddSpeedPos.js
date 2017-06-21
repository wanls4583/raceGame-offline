var stage3DLayer=stage3DLayer||{};
stage3DLayer.AddSpeedPos=function(){
	var s = this;
	F2xContainer.call(s);
	s.initUI();
};
F2xExtend(stage3DLayer.AddSpeedPos,F2xContainer);
stage3DLayer.AddSpeedPos.prototype.initUI=function(){
	var s = this;
	//f2x_auto_created_init_start
	var _d0=Flash2x.b("stage3DLayer","F2xAuto_367");
	Flash2x.d(_d0,{x:-63,y:-66});
	s.addChild(_d0);
	//f2x_auto_created_init_end
	
};
