var stage3DLayer = stage3DLayer || {};
stage3DLayer.ObsXgtong = function () {
    var s = this;
    F2xContainer.call(s);
    s.initUI();
    s.name = 'Obstacle';
    s.status = 0;
    s.type = 2;
};
F2xExtend(stage3DLayer.ObsXgtong, F2xContainer);
stage3DLayer.ObsXgtong.type = 2;
stage3DLayer.ObsXgtong.name = 'Obstacle';
stage3DLayer.ObsXgtong.status = 0;
stage3DLayer.ObsXgtong.xyz = {x: 0, y: 0, z: 1000};
stage3DLayer.ObsXgtong.posId = 0;
stage3DLayer.ObsXgtong.stageId = 0;
stage3DLayer.ObsXgtong.prototype.initUI = function () {
    var s = this;
    //f2x_auto_created_init_start
	var _d0=new stage3DLayer.F2xAuto_35();
	_d0.name="con";
	s.con=_d0;
	Flash2x.d(_d0,{x:-65.25,y:-225.8,a:3,b:3});
	s.addChild(_d0);
	//f2x_auto_created_init_end

};
