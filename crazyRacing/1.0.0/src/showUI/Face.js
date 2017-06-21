var showUI = showUI || {};
showUI.Face = function () {
    var s = this;
    annieUI.FacePhoto.call(s);
    s.initUI();
};
F2xExtend(showUI.Face, annieUI.FacePhoto);
showUI.Face.prototype.initUI = function () {
    var s = this;
    //f2x_auto_created_init_start
	var _d0=new showUI.F2xAuto_59();
	Flash2x.d(_d0,null,[0,0,0,0,1,204,204,204,0]);
	s.addChild(_d0);
	//f2x_auto_created_init_end

};
showUI.Face.prototype.initFcae = function (avatarUrl) {
    var s = this;
    s.init(avatarUrl, 40, 0);
    s.addChild(s.bitmap);
}
