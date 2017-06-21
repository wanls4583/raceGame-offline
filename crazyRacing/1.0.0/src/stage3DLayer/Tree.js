var stage3DLayer = stage3DLayer || {};
stage3DLayer.Tree = function () {
    var s = this;
    F2xMovieClip.call(s);
    s.initUI();
    s.name = 'tree';
};
F2xExtend(stage3DLayer.Tree, F2xMovieClip);
stage3DLayer.Tree.prototype.initUI = function () {
    var s = this;
    //f2x_auto_created_init_start
	var _d0=new stage3DLayer.F2xAuto_26();
	s.a().b(2);
	s.a().b(1).c(_d0,{x:-120,y:-92}).b(1).c(_d0,{x:120,y:-92,d:180});
	s.as(function(){this.stop();}.bind(this),0);
	//f2x_auto_created_init_end

};
