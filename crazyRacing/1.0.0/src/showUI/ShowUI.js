var showUI = showUI || {};
showUI.ShowUI = function () {
    var s = this;
    F2xContainer.call(s);
    s.initUI();
    //your code here
    s.sp = null;
    var tipsTimer = null;
    s.addEventListener(annie.Event.ADD_TO_STAGE, function (e) {
        s.showBtnByIdentity(GlobalData.identity);
    })
    
    //移除舞台的时候
    s.addEventListener(annie.Event.REMOVE_TO_STAGE, function (e) {
        s.removeAllEventListener();
    })
};
F2xExtend(showUI.ShowUI, F2xContainer);
showUI.ShowUI.prototype.initUI = function () {
    var s = this;
    //f2x_auto_created_init_start
    var _d0 = new showUI.yaowan();
    _d0.name = "join_btn";
    s.join_btn = _d0;
    Flash2x.d(_d0, {x: 530.7, y: 354.3});
    var _d1 = new showUI.F2xAuto_82();
    _d1.name = "throwGifts_btn";
    s.throwGifts_btn = _d1;
    Flash2x.d(_d1, {x: 530.7, y: 277.3});
    var _d2 = new showUI.scrollListCon();
    _d2.name = "scrollListCon";
    s.scrollListCon = _d2;
    Flash2x.d(_d2, {x: 7, y: 109});
    var _d3 = new showUI.CoinDouManager();
    _d3.name = "coinCon";
    s.coinCon = _d3;
    Flash2x.d(_d3, {x: 0.1, y: 63});
    var _d4 = new showUI.F2xAuto_69();
    _d4.name = "distanceCon_mc";
    s.distanceCon_mc = _d4;
    Flash2x.d(_d4, {y: 17});
    var _d5 = new showUI.GameTimeManager();
    _d5.name = "gameTime";
    s.gameTime = _d5;
    Flash2x.d(_d5, {x: 493, y: 16});
    var _d6 = new showUI.CarSpeed();
    _d6.name = "speedCon_mc";
    s.speedCon_mc = _d6;
    Flash2x.d(_d6, {x: 594.5, y: 73.5});
    s.addChild(_d6);
    s.addChild(_d5);
    s.addChild(_d4);
    // s.addChild(_d3);//移除奖杯-lisong
    s.addChild(_d2);
    s.addChild(_d1);
    s.addChild(_d0);
    //f2x_auto_created_init_end

};
//根据不同身份显示不同功能按钮
showUI.ShowUI.prototype.showBtnByIdentity = function (identity) {
    //参数者
    this.throwGifts_btn.visible = false;
    this.join_btn.visible = false;
}


