var stage3DLayer=stage3DLayer||{};
stage3DLayer.SomeOneNearYouTip=function(){
	var s = this;
	F2xContainer.call(s);
	s.initUI();
};
F2xExtend(stage3DLayer.SomeOneNearYouTip,F2xContainer);
stage3DLayer.SomeOneNearYouTip.prototype.initUI=function(){
	var s = this;
	//f2x_auto_created_init_start
	var _d0=new stage3DLayer.F2xAuto_60();
	Flash2x.d(_d0,{x:215.7,y:57.5});
	var _d1=new stage3DLayer.F2xAuto_61();
	Flash2x.d(_d1,{x:98.75,y:38.8,a:0.8392,b:0.8392});
	var _d2=new stage3DLayer.Face();
	_d2.name="avatarCon";
	s.avatarCon=_d2;
	Flash2x.d(_d2,{x:100.45,y:41.3,a:0.8392,b:0.8392});
	var _d3=new stage3DLayer.F2xAuto_63();
	Flash2x.d(_d3,{x:174.75,y:41.5,a:1.5});
	s.addChild(_d3);
	s.addChild(_d2);
	s.addChild(_d1);
	s.addChild(_d0);
	//f2x_auto_created_init_end
	
};
