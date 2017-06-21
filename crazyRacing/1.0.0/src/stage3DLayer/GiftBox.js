var stage3DLayer = stage3DLayer || {};
stage3DLayer.GiftBox = function () {
    var s = this;
    F2xContainer.call(s);
    s.initUI();
    s.name = 'gift';
    s.status = 0;
};
F2xExtend(stage3DLayer.GiftBox, F2xContainer);
stage3DLayer.GiftBox.name = 'gift';
stage3DLayer.GiftBox.status = 0;
stage3DLayer.GiftBox.stageId = 0;
stage3DLayer.GiftBox.xyz = {x: 0, y: 0, z: 1000};
stage3DLayer.GiftBox.posId = 0;
stage3DLayer.GiftBox.prototype.initUI = function () {
    var s = this;
    //f2x_auto_created_init_start
	var _d0=new stage3DLayer.F2xAuto_30();
	_d0.name="con";
	s.con=_d0;
	Flash2x.d(_d0,{a:2,b:2});
	s.addChild(_d0);
	//f2x_auto_created_init_end

};
