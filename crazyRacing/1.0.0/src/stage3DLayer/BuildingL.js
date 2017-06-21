var stage3DLayer=stage3DLayer||{};
stage3DLayer.BuildingL=function(){
	var s = this;
	F2xMovieClip.call(s);
	s.initUI();
    s.name='build';
};
F2xExtend(stage3DLayer.BuildingL,F2xMovieClip);
stage3DLayer.BuildingL.prototype.initUI=function(){
	var s = this;
	//f2x_auto_created_init_start
	var _d0=Flash2x.b("stage3DLayer","b1");
	var _d1=Flash2x.b("stage3DLayer","b2");
	var _d2=Flash2x.b("stage3DLayer","b3");
	var _d3=Flash2x.b("stage3DLayer","b4");
	var _d4=Flash2x.b("stage3DLayer","b5");
	var _d5=Flash2x.b("stage3DLayer","b6");
	var _d6=Flash2x.b("stage3DLayer","b7");
	var _d7=Flash2x.b("stage3DLayer","b8");
	s.a().b(8);
	s.a().b(1).c(_d0,{x:31,y:-833,a:4,b:4,d:180}).b(1).c(_d1,{y:-665,a:4,b:4,d:180}).b(1).c(_d2,{x:54,y:-609,a:4,b:4,d:180}).b(1).c(_d3,{x:7,y:-653,a:4,b:4,d:180}).b(1).c(_d4,{x:55,y:-613,a:4,b:4,d:180}).b(1).c(_d5,{x:-872,y:-529,a:4,b:4}).b(1).c(_d6,{x:-772,y:-653,a:4,b:4}).b(1).c(_d7,{x:-754,y:-497,a:4,b:4});
	s.as(function(){this.stop();}.bind(this),0);
	//f2x_auto_created_init_end
	
};
