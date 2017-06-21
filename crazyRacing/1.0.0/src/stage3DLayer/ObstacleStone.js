var stage3DLayer = stage3DLayer || {};
stage3DLayer.ObstacleStone = function () {
    var s = this;
    F2xContainer.call(s);
    s.initUI();
    s.name = 'Obstacle';
    s.status = 0;
    s.type = 1;
};
F2xExtend(stage3DLayer.ObstacleStone, F2xContainer);
stage3DLayer.ObstacleStone.type = 1;
stage3DLayer.ObstacleStone.name = 'Obstacle';
stage3DLayer.ObstacleStone.status = 0;
stage3DLayer.ObstacleStone.stageId = 0;
stage3DLayer.ObstacleStone.xyz = {x: 0, y: 0, z: 1000};
stage3DLayer.ObstacleStone.posId = 0;
stage3DLayer.ObstacleStone.prototype.initUI = function () {
    var s = this;
    //f2x_auto_created_init_start
	var _d0=new stage3DLayer.F2xAuto_59();
	_d0.name="con";
	s.con=_d0;
	Flash2x.d(_d0,{x:0.45,y:-1.5,a:3,b:3});
	s.addChild(_d0);
	//f2x_auto_created_init_end

};
