var stage3DLayer=stage3DLayer||{};
stage3DLayer.StageBg2=function(){
	var s = this;
	F2xMovieClip.call(s);
	s.initUI();
};
F2xExtend(stage3DLayer.StageBg2,F2xMovieClip);
stage3DLayer.StageBg2.prototype.initUI=function(){
	var s = this;
	//f2x_auto_created_init_start
	var _d0=new stage3DLayer.F2xAuto_39();
	s.a().b(2);
	s.a().b(1).c(_d0).b(1).c(_d0);
	s.as(function(){this.stop();}.bind(this),0);
	//f2x_auto_created_init_end
	
};
