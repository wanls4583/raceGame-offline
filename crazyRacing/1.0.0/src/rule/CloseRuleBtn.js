var rule=rule||{};
rule.CloseRuleBtn=function(){
	var s = this;
	F2xContainer.call(s);
	s.initUI();
	//your code here
	s.addEventListener(annie.MouseEvent.CLICK,function (e) {
		globalDispatcher.dispatchEvent('closeRulePage');
    })
};
F2xExtend(rule.CloseRuleBtn,F2xContainer);
rule.CloseRuleBtn.prototype.initUI=function(){
	var s = this;
	//f2x_auto_created_init_start
	var _d0=Flash2x.b("rule","close");
	s.addChild(_d0);
	//f2x_auto_created_init_end
	
};
