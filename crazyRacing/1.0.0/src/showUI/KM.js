var showUI=showUI||{};
showUI.KM=function(){
	var s = this;
	F2xContainer.call(s);
	s.initUI();
};
F2xExtend(showUI.KM,F2xContainer);
showUI.KM.prototype.initUI=function(){
	var s = this;
	//f2x_auto_created_init_start
	var _d0=Flash2x.b("showUI","KM");
	s.addChild(_d0);
	//f2x_auto_created_init_end
	
};
