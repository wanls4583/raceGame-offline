var showUI = showUI || {};
showUI.GameTimeManager = function () {
    var s = this;
    F2xContainer.call(s);
    s.initUI();
    //your code here
    s.count = 0;//时间计算
    s.numLevel1 = 0;//毫秒
    s.numLevel2 = 0;//个位秒
    s.numLevel3 = 0;//十位秒
    s.numLevel4 = 0;//分
    s.isCounting = false;//是否正在计算中
    s.addEventListener(annie.Event.ADD_TO_STAGE, function (e) {

    })
    /*游戏场景开始运动*/
    globalDispatcher.addEventListener('gameStageRun', function (e) {
         // s.timePlay();//后端去计时间
         s.timePlay();//-lisong
    })
};
F2xExtend(showUI.GameTimeManager, F2xContainer);
showUI.GameTimeManager.prototype.initUI = function () {
    var s = this;
    //f2x_auto_created_init_start
	var _d1=new showUI.CountUnit();
	_d1.name="num2";
	s.num2=_d1;
	Flash2x.d(_d1,{x:88,y:8.25});
	var _d0=new showUI.CountUnit();
	_d0.name="num3";
	s.num3=_d0;
	Flash2x.d(_d0,{x:75,y:8.25});
	var _d2=Flash2x.b("showUI","F2xAuto_143");
	Flash2x.d(_d2,{x:109});
	var _d3=Flash2x.b("showUI","F2xAuto_88");
	Flash2x.d(_d3,{y:2});
	s.addChild(_d3);
	s.addChild(_d2);
	s.addChild(_d0);
	s.addChild(_d1);
	//f2x_auto_created_init_end

};

//倒计时-lisong
showUI.GameTimeManager.prototype.timePlay = function () {
    var s = this;
    var timeRemain = 60,count = 0;
    s.num3.gotoAndStop(7);
    s.num2.gotoAndStop(1);
    s.addEventListener(annie.Event.ENTER_FRAME, s.EF = function (e) {
        count++;
        if(count == 30){
            count = 0;
            timeRemain--;
            var decade = Math.floor(timeRemain / 10);
            var theUnit = timeRemain % 10;
            s.num3.gotoAndStop(decade+1);
            s.num2.gotoAndStop(theUnit+1);
            if(timeRemain > 0 && (timeRemain % 20 == 0 || timeRemain == 5)){
                globalDispatcher.dispatchEvent('addObstacleRadio');
            }
        }
        if(timeRemain <= 0){
            GlobalData.gameResultData.distance = GlobalData.racerDistant;
            globalDispatcher.dispatchEvent('timeOutGameOver','单机结束');
            globalDispatcher.dispatchEvent('raceResult', {nickName:false});
            globalDispatcher.dispatchEvent('showGameOverPage');
            s.removeEventListener(annie.Event.ENTER_FRAME, s.EF);
        }
    })
}
/*暂停时间*/
showUI.GameTimeManager.prototype.timePause = function () {

}
/*重设时间*/
showUI.GameTimeManager.prototype.timeReset = function () {
    var s = this;
    s.count = 0;//时间计算
    s.numLevel1 = 0;//毫秒
    s.numLevel2 = 0;//个位秒
    s.numLevel3 = 0;//十位秒
    // s.numLevel4 = 0;//分
}
showUI.GameTimeManager.prototype.updateGameTime = function (timeNum) {
    var s = this;
    var numArr = timeNum.toString().split('');
    if (numArr.length == 1) {
        s.num2.gotoAndStop((parseInt(numArr[0]) + 1));
    } else if (numArr.length == 2) {
        s.num3.gotoAndStop((parseInt(numArr[0]) + 1));
        s.num2.gotoAndStop((parseInt(numArr[1]) + 1));
    }
}