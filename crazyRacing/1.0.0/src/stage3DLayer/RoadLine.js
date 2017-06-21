var stage3DLayer=stage3DLayer||{};
stage3DLayer.RoadLine=function(){
	var s = this;
	F2xMovieClip.call(s);
	s.initUI();
	s.name='roadLine';
};
F2xExtend(stage3DLayer.RoadLine,F2xMovieClip);
stage3DLayer.RoadLine.prototype.initUI=function(){
	var s = this;
	//f2x_auto_created_init_start
	var _d0=new stage3DLayer.F2xAuto_6();
	s.a().b(2);
	s.a().b(1).c(_d0,{x:-0.15,y:-0.05}).b(1).c(_d0,{x:-0.15,y:-0.05,d:180});
	s.as(function(){this.stop();}.bind(this),0);
	//f2x_auto_created_init_end
	
};
