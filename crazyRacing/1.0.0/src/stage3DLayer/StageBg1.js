var stage3DLayer=stage3DLayer||{};
stage3DLayer.StageBg1=function(){
	var s = this;
	F2xMovieClip.call(s);
	s.initUI();
};
F2xExtend(stage3DLayer.StageBg1,F2xMovieClip);
stage3DLayer.StageBg1.prototype.initUI=function(){
	var s = this;
	//f2x_auto_created_init_start
	var _d0=new stage3DLayer.F2xAuto_32();
	var _d1=new stage3DLayer.stage3DLayerBG();
	s.a().b(2);
	s.a().b(1).c(_d0,{x:320,y:1}).b(1).c(_d1,{x:320,y:1});
	s.as(function(){this.stop();}.bind(this),0);
	//f2x_auto_created_init_end
	
};
