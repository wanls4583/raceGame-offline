var showUI=showUI||{};
showUI.NumDot=function(){
	var s = this;
	F2xContainer.call(s);
	s.initUI();
};
F2xExtend(showUI.NumDot,F2xContainer);
showUI.NumDot.prototype.initUI=function(){
	var s = this;
	//f2x_auto_created_init_start
	var _d0=Flash2x.b("showUI","dot");
	s.addChild(_d0);
	//f2x_auto_created_init_end
	
};
