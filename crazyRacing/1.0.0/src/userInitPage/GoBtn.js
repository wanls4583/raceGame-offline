var userInitPage = userInitPage || {};
userInitPage.GoBtn = function () {
    var s = this;
    F2xContainer.call(s);
    s.initUI();
    //进入待主播开始游戏
    s.addEventListener(annie.MouseEvent.CLICK, function () {
        //appCheckUserLogin();//检测用户是否登录
        globalDispatcher.dispatchEvent('initChooesCarPage');
    })
};
F2xExtend(userInitPage.GoBtn, F2xContainer);
userInitPage.GoBtn.prototype.initUI = function () {
    var s = this;
    //f2x_auto_created_init_start
	var _d1=new userInitPage.F2xAuto_10();
	Flash2x.d(_d1,{x:-17,y:-8});
	var _d0=new userInitPage.F2xAuto_2();
	Flash2x.d(_d0,{x:0.5,y:0.45,a:0.7571,b:0.7571});
	s.addChild(_d0);
	s.addChild(_d1);
	//f2x_auto_created_init_end

};
