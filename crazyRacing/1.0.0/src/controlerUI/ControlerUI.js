var controlerUI = controlerUI || {};
controlerUI.ControlerUI = function () {
    var s = this;
    F2xContainer.call(s);
    s.initUI();
    //your code here
    s.superEffectBtn.times.gotoAndStop(s.superRunningEffectTimes + 1);
    s.armorEffectBtn.times.gotoAndStop(s.superProtectingEffectTimes + 1);
    //321倒数完毕，游戏开始
    globalDispatcher.addEventListener('gameStageRun', s.g1 = function (e) {
        s.isGameStart = true;
    })
    s.left_btn.addEventListener(annie.MouseEvent.CLICK, function (e) {
        if (!GlobalData.isChangingLanes && s.isGameStart && !GlobalData.isTimeOutGameOver) {
            globalDispatcher.dispatchEvent(new annie.Event('turnL'));
        }
    })
    s.right_btn.addEventListener(annie.MouseEvent.CLICK, function (e) {
        if (!GlobalData.isChangingLanes && s.isGameStart && !GlobalData.isTimeOutGameOver) {
            globalDispatcher.dispatchEvent(new annie.Event('turnR'));
        }
    })
    //加速效果
    s.superEffectBtn.addEventListener(annie.MouseEvent.CLICK, function (e) {
        if (s.superRunningEffectTimes > 0 && !GlobalData.isTimeOutGameOver && s.isGameStart) {
            globalDispatcher.dispatchEvent('superRunning');
        }
    })
    //护盾
    s.armorEffectBtn.addEventListener(annie.MouseEvent.CLICK, function (e) {
        if (s.superProtectingEffectTimes > 0 && !GlobalData.isTimeOutGameOver && s.isGameStart) {
            globalDispatcher.dispatchEvent('superProtecting');
        }
    })
    //递减特效次数
    globalDispatcher.addEventListener('declineEffectTimes', s.g2 = function (e) {
        var effectType = e.data;
        if (effectType == 0 && s.superRunningEffectTimes > 0) {
            s.superRunningEffectTimes--;
            s.superEffectBtn.times.gotoAndStop(s.superRunningEffectTimes + 1);
        } else if (effectType == 1 && s.superProtectingEffectTimes > 0) {
            s.superProtectingEffectTimes--;
            s.armorEffectBtn.times.gotoAndStop(s.superProtectingEffectTimes + 1);
        }
    })
    //移除舞台事件
    s.addEventListener(annie.Event.REMOVE_TO_STAGE, function (e) {
        s.removeAllChildren();
        s.removeAllEventListener();
        globalDispatcher.removeEventListener('gameStageRun', s.g1);
        globalDispatcher.removeEventListener('declineEffectTimes', s.g2);
    })
};
F2xExtend(controlerUI.ControlerUI, F2xContainer);
controlerUI.ControlerUI.prototype.superRunningEffectTimes = 3;
controlerUI.ControlerUI.prototype.superProtectingEffectTimes = 3;
controlerUI.ControlerUI.prototype.isGameStart = false;//321完毕，游戏开始
controlerUI.ControlerUI.prototype.initUI = function () {
    var s = this;
    // f2x_auto_created_init_start
    var _d0 = new controlerUI.F2xAuto_19();
    _d0.name = "armorEffectBtn";
    s.armorEffectBtn = _d0;
    Flash2x.d(_d0, {x: 544, y: 112});
    var _d1 = new controlerUI.F2xAuto_18();
    _d1.name = "superEffectBtn";
    s.superEffectBtn = _d1;
    Flash2x.d(_d1, {x: 544, y: 208});
    var _d2 = new controlerUI.F2xAuto_24();
    _d2.name = "right_btn";
    s.right_btn = _d2;
    Flash2x.d(_d2, {x: 531, y: 302});
    var _d3 = new controlerUI.F2xAuto_22();
    _d3.name = "left_btn";
    s.left_btn = _d3;
    Flash2x.d(_d3, {x: 30, y: 302});
    s.addChild(_d3);
    s.addChild(_d2);
    // s.addChild(_d1);
    // s.addChild(_d0);
    //f2x_auto_created_init_end

};
