var userInitPage=userInitPage||{};
userInitPage.UserInitPage=function(){
	var s = this;
	F2xContainer.call(s);
	s.initUI();
};
F2xExtend(userInitPage.UserInitPage,F2xContainer);
userInitPage.UserInitPage.prototype.initUI=function(){
	var s = this;
	//f2x_auto_created_init_start
	var _d0=new userInitPage.InitCtr();
	s.addChild(_d0);
	//f2x_auto_created_init_end
	
};
