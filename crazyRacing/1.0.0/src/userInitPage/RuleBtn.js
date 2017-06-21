var userInitPage=userInitPage||{};
userInitPage.RuleBtn=function(){
	var s = this;
	F2xContainer.call(s);
	s.initUI();
    s.addEventListener(annie.MouseEvent.CLICK, function () {
        globalDispatcher.dispatchEvent('addRulePage');
    })
};
F2xExtend(userInitPage.RuleBtn,F2xContainer);
userInitPage.RuleBtn.prototype.initUI=function(){
	var s = this;
	//f2x_auto_created_init_start
	var _d1=new userInitPage.F2xAuto_5();
	Flash2x.d(_d1,{x:52,y:-5});
	var _d0=new userInitPage.F2xAuto_4();
	Flash2x.d(_d0,{x:-62,y:-16.5});
	s.addChild(_d0);
	s.addChild(_d1);
	//f2x_auto_created_init_end
	
};
