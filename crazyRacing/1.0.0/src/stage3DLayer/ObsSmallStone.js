var stage3DLayer = stage3DLayer || {};
stage3DLayer.ObsSmallStone = function () {
    var s = this;
    F2xContainer.call(s);
    s.initUI();
    s.name = 'Obstacle';
    s.status = 0;
    s.type = 3;
};
F2xExtend(stage3DLayer.ObsSmallStone, F2xContainer);
stage3DLayer.ObsSmallStone.type = 3;
stage3DLayer.ObsSmallStone.name = 'Obstacle';
stage3DLayer.ObsSmallStone.status = 0;
stage3DLayer.ObsSmallStone.xyz = {x: 0, y: 0, z: 1000};
stage3DLayer.ObsSmallStone.posId = 0;
stage3DLayer.ObsSmallStone.stageId = 0;
stage3DLayer.ObsSmallStone.prototype.initUI = function () {
    var s = this;
    //f2x_auto_created_init_start
	var _d0=new stage3DLayer.F2xAuto_37();
	_d0.name="con";
	s.con=_d0;
	Flash2x.d(_d0,{a:3,b:3});
	s.addChild(_d0);
	//f2x_auto_created_init_end

};
