var stage3DLayer=stage3DLayer||{};
stage3DLayer.ShowUserEffectView=function(){
	var s = this;
	F2xContainer.call(s);
	s.initUI();
};
F2xExtend(stage3DLayer.ShowUserEffectView,F2xContainer);
stage3DLayer.ShowUserEffectView.prototype.initUI=function(){
	var s = this;
	//f2x_auto_created_init_start
	var _d0=Flash2x.s({type:0,data:"ArrHWIAAurIXWAAIAAOrg"},{type:0,color:"#000000"},null);
	Flash2x.d(_d0,{x:74.75,y:47.55});
	var _d1=new stage3DLayer.showCarEffect();
	Flash2x.d(_d1,{x:74.9,y:32,a:0.36,b:0.36});
	_d1.mask=_d0;
	var _d2=Flash2x.t(0,decodeURI("%E5%8A%A0%E9%80%9F%E4%B8%AD"),12,"#FFFFFF","SimHei",0,0,47,12,9.5,"left",false,false,"multiline",false);
	Flash2x.d(_d2,{x:43.65,y:10.5});
	var _d3=new stage3DLayer.F2xAuto_70();
	Flash2x.d(_d3,{x:7.9,y:1.5,a:0.5,b:0.5});
	var _d4=new stage3DLayer.F2xAuto_129();
	Flash2x.d(_d4,{x:126.4,y:22.1});
	var _d5=new stage3DLayer.F2xAuto_75();
	Flash2x.d(_d5,{x:0.45,a:0.2966,b:0.3});
	s.addChild(_d5);
	s.addChild(_d4);
	s.addChild(_d3);
	s.addChild(_d2);
	s.addChild(_d1);
	//f2x_auto_created_init_end
	
};
