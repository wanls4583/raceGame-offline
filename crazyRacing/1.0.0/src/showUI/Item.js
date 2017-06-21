var showUI = showUI || {};
showUI.Item = function () {
    var s = this;
    F2xContainer.call(s);
    s.initUI();
    s.addEventListener(annie.Event.REMOVE_TO_STAGE,function () {
		s.removeAllEventListener();
    })
};
F2xExtend(showUI.Item, F2xContainer);
showUI.Item.prototype.id = 0;
showUI.Item.prototype.data = null;
showUI.Item.prototype.initData = function (id, data) {
    var s = this;
    s.id = id;
    if (data) {
        s.nickname.text = data.nickName;
        s.listDistantCon.setDistance(data.distance);
        s.avatarCon.initFcae(data.avatar);//头像
    }
    // if(s.id%2==0){
    //     s.cell.gotoAndStop(2);
    // }
};

showUI.Item.prototype.initUI = function () {
    var s = this;
    //f2x_auto_created_init_start
	var _d0=new showUI.F2xAuto_45();
	var _d1=new showUI.Face();
	_d1.name="avatarCon";
	s.avatarCon=_d1;
	Flash2x.d(_d1,{x:2,y:3});
	var _d2=new showUI.F2xAuto_47();
	_d2.name="carsCon";
	s.carsCon=_d2;
	Flash2x.d(_d2,{x:102.25,y:15});
	var _d3=new showUI.ListDistantManager();
	_d3.name="listDistantCon";
	s.listDistantCon=_d3;
	Flash2x.d(_d3,{x:142,y:17});
	var _d4=Flash2x.t(0,decodeURI("%E5%88%80%E8%90%A7%E9%9D%A2"),12,"#457EBB","Microsoft YaHei",0,0,49.5,15.55,17.55,"center",false,false,"single",false);
	_d4.name="nickname_txt";
	s.nickname_txt=_d4;
	Flash2x.d(_d4,{x:49.75,y:15.5});
	var _d5=new showUI.F2xAuto_49();
	Flash2x.d(_d5,{x:8.25,y:12});
	s.addChild(_d5);
	s.addChild(_d4);
	s.addChild(_d3);
	s.addChild(_d2);
	s.addChild(_d1);
	s.addChild(_d0);
	//f2x_auto_created_init_end

};
