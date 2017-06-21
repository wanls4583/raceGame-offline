var stage3DLayer=stage3DLayer||{};
stage3DLayer.BuildingR=function(){
	var s = this;
	F2xMovieClip.call(s);
	s.initUI();
    s.name='build';
};
F2xExtend(stage3DLayer.BuildingR,F2xMovieClip);
stage3DLayer.BuildingR.prototype.initUI=function(){
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
	s.a().b(1);
	s.a().b(1).c(_d0,{x:-43,y:-832,a:4,b:4}).b(1).c(_d1,{x:-12,y:-664,a:4,b:4}).b(1).c(_d2,{x:-66,y:-608,a:4,b:4}).b(1).c(_d3,{x:-19,y:-652,a:4,b:4}).b(1).c(_d4,{x:-67,y:-612,a:4,b:4}).b(1).c(_d5,{x:860,y:-528,a:4,b:4,d:180}).b(1).c(_d6,{x:760,y:-652,a:4,b:4,d:180}).b(1).c(_d7,{x:742,y:-496,a:4,b:4,d:180});
	s.as(function(){this.stop();}.bind(this),0);
	//f2x_auto_created_init_end
	
};
