var showUI = showUI || {};
showUI.CarSpeed = function () {
    var s = this;
    F2xContainer.call(s);
    s.initUI();
    //your code here
    s.addEventListener(annie.Event.ADD_TO_STAGE, function (e) {

    })
    /*游戏场景开始运动*/
    globalDispatcher.addEventListener('gameStageRun', function (e) {
        s.addEventListener(annie.Event.ENTER_FRAME, function (e) {
            s.updateSpeedNum(globalAddspeed);//实时更新速度
            var per = Math.floor((globalAddspeed / CarConfig.maxSpeed) * 5);
            if (per == 0) {
                per = per + 1
            }
            s.perBar.gotoAndStop(per);
        })
    })
};
F2xExtend(showUI.CarSpeed, F2xContainer);
showUI.CarSpeed.prototype.initUI = function () {
    var s = this;
    //f2x_auto_created_init_start
	var _d0=new showUI.F2xAuto_57();
	_d0.name="perBar";
	s.perBar=_d0;
	Flash2x.d(_d0,{y:11.5});
	var _d1=new showUI.F2xAuto_64();
	Flash2x.d(_d1,{x:6.5,y:-10.5});
	var _d3=new showUI.F2xAuto_56();
	_d3.name="s1";
	s.s1=_d3;
	Flash2x.d(_d3,{x:-20,y:-7});
	var _d2=new showUI.F2xAuto_56();
	_d2.name="s0";
	s.s0=_d2;
	Flash2x.d(_d2,{x:-6,y:-7});
	s.addChild(_d2);
	s.addChild(_d3);
	s.addChild(_d1);
	s.addChild(_d0);
	//f2x_auto_created_init_end

};
showUI.CarSpeed.prototype.updateSpeedNum = function (currSpeed) {
    var s = this,
        carSpeed = Math.floor(currSpeed / 10),
        numArr = carSpeed.toString().split(''),
        numLeng = numArr.length;
    // trace(numArr);
    switch (numLeng) {
        case 1:
            s.s0.gotoAndStop(parseInt(numArr[0]) + 1)
            s.s1.gotoAndStop(1);
            break;
        case 2:
            s.s0.gotoAndStop(parseInt(numArr[1]) + 1);
            s.s1.gotoAndStop(parseInt(numArr[0]) + 1);
            break;
        default:
            break;
    }
}
