var showUI = showUI || {};
showUI.CoinDouManager = function () {
    var s = this;
    F2xContainer.call(s);
    s.initUI();
    //
    s.addEventListener(annie.Event.ADD_TO_STAGE, function (e) {
        s.setGameCoin(GlobalData.coinPool);
    })
    //更新奖金池
    globalDispatcher.addEventListener('updateUserCoinPool', function (e) {
        var coin = e.data;
        s.setGameCoin(coin);
    })
};
F2xExtend(showUI.CoinDouManager, F2xContainer);
showUI.CoinDouManager.prototype.initUI = function () {
    var s = this;
    //f2x_auto_created_init_start
	var _d0=new showUI.ShuUnit();
	_d0.name="num0";
	s.num0=_d0;
	Flash2x.d(_d0,{x:56.7,y:12.75,a:0.82,b:0.82});
	var _d1=new showUI.ShuUnit();
	_d1.name="num3";
	s.num3=_d1;
	Flash2x.d(_d1,{x:88.95,y:12.75,a:0.82,b:0.82});
	var _d2=new showUI.ShuUnit();
	_d2.name="num2";
	s.num2=_d2;
	Flash2x.d(_d2,{x:77.85,y:12.75,a:0.82,b:0.82});
	var _d3=new showUI.ShuUnit();
	_d3.name="num1";
	s.num1=_d3;
	Flash2x.d(_d3,{x:67,y:12.75,a:0.82,b:0.82});
	var _d4=new showUI.F2xAuto_66();
	Flash2x.d(_d4,{x:15});
	var _d5=new showUI.F2xAuto_67();
	Flash2x.d(_d5,{x:103,y:9});
	var _d6=new showUI.F2xAuto_49();
	Flash2x.d(_d6,{y:8,a:0.5068,b:0.8393});
	s.addChild(_d6);
	s.addChild(_d5);
	s.addChild(_d4);
	s.addChild(_d3);
	s.addChild(_d2);
	s.addChild(_d1);
	s.addChild(_d0);
	//f2x_auto_created_init_end

};
showUI.CoinDouManager.prototype.setGameCoin = function (num) {
    var s = this;
    var numStr = num.toString();
    for (var i = 0; i < numStr.length; i++) {
        s['num' + i].gotoAndStop(parseInt(numStr[i]) + 1);
    }
}