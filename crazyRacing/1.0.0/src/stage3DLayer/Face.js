var stage3DLayer=stage3DLayer||{};
stage3DLayer.Face=function(){
	var s = this;
    annieUI.FacePhoto.call(s);
	s.initUI();
};
F2xExtend(stage3DLayer.Face,annieUI.FacePhoto);
stage3DLayer.Face.prototype.initUI=function(){
	var s = this;
	//f2x_auto_created_init_start
	var _d0=Flash2x.b("stage3DLayer","F2xAuto_378");
	s.addChild(_d0);
	//f2x_auto_created_init_end
	
};
stage3DLayer.Face.prototype.initFcae = function (avatarUrl) {
    var s = this;
    s.init(avatarUrl, 35, 0);
    s.addChild(s.bitmap);
}
