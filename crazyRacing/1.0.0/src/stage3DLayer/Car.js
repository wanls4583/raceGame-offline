var stage3DLayer = stage3DLayer || {};
stage3DLayer.Car = function () {
    var s = this;
    F2xMovieClip.call(s);
    s.initUI();
    //your code here
    s.effectTimes = 60;
    s.isEffectCountTime = false;

    s.addEventListener(annie.Event.ADD_TO_STAGE, function (e) {
        s.gotoAndStop('center');
    })
    globalDispatcher.addEventListener('carUpdateSuperRunningEffect', function (e) {
        s.effectTimes = e.data.during;//特效持续时间
        s.isCarHasEffect = true;
    })
    s.addEventListener(annie.Event.ENTER_FRAME, s.carEF = function (e) {
        if (s.isEffectCountTime) {
            s.effectTimes--;
            if (s.effectTimes <= 0) {
                globalDispatcher.dispatchEvent('removeSpeedLineEffect');
                s.isCarHasEffect = false;
                s.isEffectCountTime = false;
                s.effectTimes = 60;
            }
        }
        s.updateSuperEffect();//喷射特效
        // GlobalData.racerCarX = s.pos.x;//实时记录赛车X
    })
    globalDispatcher.addEventListener('turnL', function (e) {
        if (s.isChangingLanes) {
            return;
        }
        if (s.posStatus == 1) {
            return;
        } else if (s.posStatus == 0) {
            s.play(false);
            s.isChangingLanes = true;
            s.addEventListener(annie.Event.END_FRAME, s.EF = function (e) {
                s.posStatus = 1;
                s.isChangingLanes = false;
                s.removeEventListener(annie.Event.END_FRAME, s.EF);
            })
        } else if (s.posStatus == 2) {
            s.play(false);
            s.isChangingLanes = true;
            s.addEventListener(annie.Event.CALL_FRAME, s.EF = function (e) {
                if (e.data.frameName == 'center') {
                    s.posStatus = 0;
                    GlobalData.isChangingLanes = s.isChangingLanes = false;
                    s.removeEventListener(annie.Event.CALL_FRAME, s.EF);
                }
            })
        }

    })
    globalDispatcher.addEventListener('turnR', function (e) {
        if (s.isChangingLanes) {
            return;
        }
        if (s.posStatus == 2) {
            return;
        } else if (s.posStatus == 0) {
            s.play(true);
            s.isChangingLanes = true;
            s.addEventListener(annie.Event.END_FRAME, s.EF = function (e) {
                s.posStatus = 2;
                s.isChangingLanes = false;
                s.removeEventListener(annie.Event.END_FRAME, s.EF);
            })

        } else if (s.posStatus == 1) {
            s.play(true);
            s.isChangingLanes = true;
            s.addEventListener(annie.Event.CALL_FRAME, s.EF = function (e) {
                if (e.data.frameName == 'center') {
                    s.posStatus = 0;
                    s.isChangingLanes = false;
                    s.removeEventListener(annie.Event.CALL_FRAME, s.EF);
                }
            })
        }
    })
};
F2xExtend(stage3DLayer.Car, F2xMovieClip);
stage3DLayer.Car.prototype.initUI = function () {
    var s = this;
    //f2x_auto_created_init_start
	var _d0=new stage3DLayer.SpeedLine();
	_d0.name="speedLine";
	s.speedLine=_d0;
	var _d1=new stage3DLayer.F2xAuto_49();
	_d1.name="effect0";
	s.effect0=_d1;
	var _d2=new stage3DLayer.F2xAuto_50();
	_d2.name="effect3";
	s.effect3=_d2;
	var _d3=new stage3DLayer.F2xAuto_51();
	_d3.name="effect2";
	s.effect2=_d3;
	var _d4=new stage3DLayer.F2xAuto_52();
	_d4.name="effect1";
	s.effect1=_d4;
	var _d5=new stage3DLayer.F2xAuto_53();
	_d5.name="car_mc";
	s.car_mc=_d5;
	var _d6=new stage3DLayer.F2xAuto_54();
	s.a().b(7).b(7).b(1);
	s.a().b(7).b(8).d("center",7);
	s.a().b(7).e("left").b(7).e("center").b(1).e("right");
	s.a().b(15).c(_d0,{x:-320,y:-200});
	s.a().b(1).c(_d1,{x:-224.85,y:-0.25,a:1.3926,b:1.1936,c:30}).b(1).c(_d1,{x:-207.45,y:3.95,a:1.3926,b:1.1468,c:22.5285}).b(1).c(_d1,{x:-201.35,y:5.55,a:1.3926,b:1.133,c:20.0014}).b(1).c(_d1,{x:-193.85,y:1.3,a:1.3926,b:1.133,c:7.0006}).b(1).c(_d1,{x:-189.85,y:0.75,a:1.3926,b:1.1364,c:6.519}).b(1).c(_d1,{x:-177.25,y:-1.2,a:1.3926,b:1.1478,c:5.2531}).b(1).c(_d1,{x:-156.6,y:-4.4,a:1.3926,b:1.1669,c:3.0178}).b(1).c(_d1,{x:-127.6,y:-8.55,a:1.3926,b:1.1936,r:-0.0007}).b(1).c(_d1,{x:-123.3,y:-7.9,a:1.3926,b:1.1898,c:-0.2969}).b(1).c(_d1,{x:-111.95,y:-6.05,a:1.3926,b:1.1783,c:-1.7506}).b(1).c(_d1,{x:-92.15,y:-3.1,a:1.3926,b:1.1593,c:-3.7985}).b(1).c(_d1,{x:-64.9,y:1.3,a:1.3926,b:1.133,c:-6.9991}).b(1).c(_d1,{x:-51.25,y:5.55,a:1.3926,b:1.133,c:-20}).b(1).c(_d1,{x:-43.2,y:2.3,a:1.3926,b:1.1618,c:-25.0344}).b(1).c(_d1,{x:-35.45,y:-0.25,a:1.3926,b:1.1936,c:-30.0004});
	s.a().b(1).c(_d2,{x:-137.5,y:-75.45,b:1.1593,c:30.395}).b(1).c(_d2,{x:-134.55,y:-76.2,b:1.0926,c:23.3279}).b(1).c(_d2,{x:-132.25,y:-75.45,b:1.0721,c:21.1242}).b(1).c(_d2,{x:-144.5,y:-75.45,b:1.0145,c:9.7083}).b(1).c(_d2,{x:-141.4,y:-75.5,b:1.0131,c:9.031}).b(1).c(_d2,{x:-130.7,y:-76,b:1.0105,c:7.2613}).b(1).c(_d2,{x:-113.95,y:-76.35,b:1.0061,c:4.0631}).b(1).c(_d2,{x:-88.5,y:-75.45}).b(1).c(_d2,{x:-85.6,y:-75.8,b:1.0016,c:-0.7664}).b(1).c(_d2,{x:-77.9,y:-76.7,b:1.0065,c:-3.2549}).b(1).c(_d2,{x:-64.65,y:-77.1,b:1.0145,c:-7.2788}).b(1).c(_d2,{x:-47.25,y:-75.45,b:1.0266,c:-13.0712}).b(1).c(_d2,{x:135.15,y:-75.45,b:1.0721,c:-21.1242,d:180}).b(1).c(_d2,{x:135.75,y:-76.2,b:1.1142,c:-25.7878,d:180}).b(1).c(_d2,{x:135.4,y:-75.45,b:1.1593,c:-30.395,d:180});
	s.a().b(1).c(_d3,{x:-143.45,y:-62.5,a:0.9532,b:1.147,c:29.3232}).b(1).c(_d3,{x:-136.65,y:-62.7,a:0.9532,b:1.0923,c:23.5461}).b(1).c(_d3,{x:-133.85,y:-62.5,a:0.9532,b:1.0759,c:21.6442}).b(1).c(_d3,{x:-137.7,y:-62.5,a:0.9663,b:1.0221,c:11.928}).b(1).c(_d3,{x:-135.3,y:-62.65,a:0.9684,b:1.0201,c:11.0526}).b(1).c(_d3,{x:-126.7,y:-63.2,a:0.9747,b:1.0161,c:8.8043}).b(1).c(_d3,{x:-112.35,y:-63.4,a:0.9852,b:1.0094,c:5.0562}).b(1).c(_d3,{x:-91.5,y:-62.5}).b(1).c(_d3,{x:-85.95,y:-80.6,a:0.9979,b:1.0014,c:-0.5605,d:11.2496}).b(1).c(_d3,{x:-51.65,y:-127.75,a:0.9916,b:1.0053,c:-2.8083,d:45}).b(1).c(_d3,{x:44.9,y:-152,a:0.981,b:1.0121,c:-6.5537,d:101.2493}).b(1).c(_d3,{x:136,y:-62.5,a:0.9663,b:1.0221,c:-11.928,d:180}).b(1).c(_d3,{x:131.55,y:-62.5,a:0.9532,b:1.0759,c:-21.6442,d:180}).b(1).c(_d3,{x:138.15,y:-62.75,a:0.9532,b:1.1276,c:-27.3275,d:180}).b(1).c(_d3,{x:139.75,y:-62.5,a:0.9532,b:1.147,c:-29.3232,d:180});
	s.a().b(1).c(_d4,{x:-137.9,y:-70.95,a:0.8895,b:1.1308,c:27.8252}).b(1).c(_d4,{x:-125.95,y:-71.05,a:0.8729,b:1.0857,c:22.8021}).b(1).c(_d4,{x:-121.35,y:-70.95,a:0.8674,b:1.0725,c:21.182}).b(1).c(_d4,{x:-128.9,y:-70.95,a:0.9348,b:1.0233,c:12.2473}).b(1).c(_d4,{x:-126.9,y:-71.1,a:0.9389,b:1.0212,c:11.3153}).b(1).c(_d4,{x:-119.1,y:-71.65,a:0.9511,b:1.017,c:9.0515}).b(1).c(_d4,{x:-106,y:-71.85,a:0.9715,b:1.0099,c:5.2788}).b(1).c(_d4,{x:-87.55,y:-70.95}).b(1).c(_d4,{x:-82.95,y:-88.9,a:0.9959,b:1.0014,c:-0.7535,d:11.2488}).b(1).c(_d4,{x:-50.05,y:-135.25,a:0.9837,b:1.0057,c:-3.0163,d:45}).b(1).c(_d4,{x:42.6,y:-158.35,a:0.9633,b:1.0127,c:-6.7869,d:101.2496}).b(1).c(_d4,{x:126.8,y:-70.95,a:0.9348,b:1.0233,c:-12.2473,d:180}).b(1).c(_d4,{x:119.05,y:-70.95,a:0.8674,b:1.0725,c:-21.182,d:180}).b(1).c(_d4,{x:131.25,y:-71.1,a:0.884,b:1.1147,c:-26.0768,d:180}).b(1).c(_d4,{x:134.8,y:-70.95,a:0.8895,b:1.1308,c:-27.8252,d:180});
	s.a().b(1).c(_d5,{x:-141,y:-40.05}).b(1).c(_d5,{x:-124.1,y:-39.4,b:0.9997,c:-5.2511}).b(1).c(_d5,{x:-118.35,y:-39.05,c:-7.0002}).b(1).c(_d6,{x:-62.6,y:1.6,b:0.9177,c:12.0001}).b(1).c(_d6,{x:-59,y:1.45,b:0.9169,c:11.0711}).b(1).c(_d6,{x:-47.3,y:0.9,b:0.9164,c:8.8182}).b(1).c(_d6,{x:-27.75,y:0.3,b:0.9157,c:5.0651}).b(1).c(_d6,{b:0.9146}).b(1).c(_d6,{x:3.75,y:0.05,b:0.9145,c:-0.7485}).b(1).c(_d6,{x:14.85,y:0.15,b:0.9144,c:-3.0006}).b(1).c(_d6,{x:33.5,y:0.65,b:0.9143,c:-6.7526}).b(1).c(_d6,{x:59.6,y:1.95,b:0.9146,c:-12.0006}).b(1).c(_d5,{x:118.95,y:-40,b:1.0069,c:7.0003,d:180}).b(1).c(_d5,{x:132.9,y:-40.15,b:1.0016,c:1.7504,d:180}).b(1).c(_d5,{x:137.5,y:-40.05,d:180});
	s.as(function(){this.stop();}.bind(this),14);
	s.as(function(){this.stop();}.bind(this),7);
	s.as(function(){this.stop();}.bind(this),0);
	//f2x_auto_created_init_end
};
stage3DLayer.Car.prototype.isChangingLanes = false;
stage3DLayer.Car.prototype.isCarHasEffect = false;
stage3DLayer.Car.prototype.effectType = 0;//特效类型
stage3DLayer.Car.prototype.posStatus = 0;//0中，1左，2右
stage3DLayer.Car.prototype.creatSupperEffect = function () {
    var s = this;
    //如果有使用护盾效果
    if (GlobalData.isUseSuperProtectingEffect) {
        s.effect0.visible = true;
    } else {
        s.effect0.visible = false;
    }
    if (GlobalData.isUseSuperRunningEffect) {
        s.speedLine.visible = true;
    } else {
        s.speedLine.visible = false;
    }
    //根据速度判断
    if (globalAddspeed < (CarConfig.maxSpeed * 10) * 0.05) {
        s.effect1.visible = s.effect2.visible = s.effect3.visible = false
    } else if (globalAddspeed > (CarConfig.maxSpeed * 10) * 0.05 && globalAddspeed < (CarConfig.maxSpeed * 10) * 0.66) {
        //速度达到20/1
        s.effect2.visible = s.effect3.visible = false;
        s.effect1.visible = true;
    } else if (globalAddspeed > (CarConfig.maxSpeed * 10) * 0.66 && globalAddspeed < CarConfig.maxSpeed * 10) {
        //速度达到3/2
        s.effect1.visible = s.effect3.visible = false;
        s.effect2.visible = true;

    } else if (globalAddspeed >= CarConfig.maxSpeed * 10) {
        //速度达到满速
        s.effect1.visible = s.effect2.visible = false;
        s.effect3.visible = true;
    }
}
stage3DLayer.Car.prototype.updateSuperEffect = function () {
    var s = this;
    s.creatSupperEffect();//实时更新喷射特效
}
stage3DLayer.Car.prototype.getCarInfo = function () {
    var s = this;
    var carCurrFrame = s.currentFrame,
        effectLeng = [],
        effectId = 50;
    for (var i = 0; i < 4; i++) {
        if (s['effect' + i].visible == true) {
            effectLeng.push(i);
        }
    }
    if (effectLeng.length == 0) {
        effectId = 50;
    } else if (effectLeng.length == 1) {
        effectId = effectLeng[0];
    } else if (effectLeng.length == 2) {
        effectId = effectLeng[0] + 10;
    }
    return {
        currentFrame: carCurrFrame,
        effectId: effectId
    }
}

