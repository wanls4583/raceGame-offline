var gameMain = gameMain || {};
gameMain.GameMain = function () {
    var s = this;
    F2xContainer.call(s);
    s.initUI();
    //your code here
    var userInitGamePage,
        rulePage,
        begin = false;
    s.addEventListener(annie.Event.ADD_TO_STAGE, function (e) {
        var userInitGamePage = new userInitPage.UserInitPage();
        s.layerGame.addChild(userInitGamePage);
    })

    globalDispatcher.addEventListener('initChooesCarPage', function (e) {
        // Flash2x.loadSceneManager('userChooseCar', s.layerGame);//选车
        globalDispatcher.dispatchEvent('preLoadStage3DLayer');//加载游戏场景
    })
  
    //比赛结果,单播的比赛用户才能收到
    globalDispatcher.addEventListener('raceResult', function (e) {
        s.layerGame.removeChildAt(0);//移除游戏界面
        //Flash2x.loadSceneManager('userGameResultShow', s.alertLayerForChange);//成績
    })
    
    //添加活动规则页面
    globalDispatcher.addEventListener('addRulePage', function (e) {
        if (!rulePage) {
            rulePage = new rule.Rule();
        }
        s.alertLayerForChange.addChild(rulePage);
    })
    //关闭游戏规则
    globalDispatcher.addEventListener('closeRulePage', function (e) {
        s.alertLayerForChange.removeChild(rulePage);
    })
    
    //预加载游戏部分内容
    globalDispatcher.addEventListener('preLoadStage3DLayer', function (e) {
        if (GlobalData.identity == 2) {
            if (!s.isUserStage3DLayerGamePartLoaded) {
                var loadingObj;
                if (!loadingObj) {
                    loadingObj = new loading.Loading();
                    s.alertLayerForChange.addChild(loadingObj);
                }
                Flash2x.loadScene(['stage3DLayer', 'controlerUI', 'showUI'], function (per) {
                    loadingObj.gotoAndStop(per);
                    loadingObj.per_txt.text = per + "%";
                }, function (result) {
                    if (result.sceneId == result.sceneTotal) {
                        s.alertLayerForChange.removeChild(loadingObj);
                        s.isUserStage3DLayerGamePartLoaded = true;
                        globalDispatcher.dispatchEvent('initStage3DLayer');//开始游戏
                    }
                })
            } else {
                globalDispatcher.dispatchEvent('initStage3DLayer');//开始游戏
            }
        }
    })

    //BGM控制
    globalDispatcher.addEventListener('firstPlayBGM', function (e) {
        Flash2x.getMediaByName('ready3second','BGM').play(0,3000);
        begin = true;
    });
    globalDispatcher.addEventListener('playBGM', function (e) {
        if(begin){
            Flash2x.getMediaByName('ready3second','BGM').pause(false);
        }
    });
    globalDispatcher.addEventListener('stopBGM', function (e) {
        if(begin){
            Flash2x.getMediaByName('ready3second','BGM').pause(true);
        }
    });

    //开启游戏
    globalDispatcher.addEventListener('initStage3DLayer', function (e) {
        s.alertLayerForChange.removeChildAt(0);
        s.changeLayer.removeChildAt(0);
        if (GlobalData.playerNo) {
            if (GlobalData.identity == 1) {
                var stage3dLayerAnchorPlane = new stage3DLayerAnchor.Stage3DLayerAnchor();
                s.layerGame.removeChildAt(0);
                s.layerGame.addChild(stage3dLayerAnchorPlane);
            } else if (GlobalData.identity == 2) {
                var stage3dLayerPlane = new stage3DLayer.Stage3DLayer();
                s.layerGame.removeChildAt(0);
                s.layerGame.addChild(stage3dLayerPlane);
            } else if (GlobalData.identity == 3) {
                var stage3dLayerTouristPlane = new stage3DLayerTourist.Stage3DLayerTourist();
                s.layerGame.removeChildAt(0);
                s.layerGame.addChild(stage3dLayerTouristPlane);
            }
        }
    })
    //初始化Stage3D游戏的相关Ui界面
    globalDispatcher.addEventListener('initStage3DGameLayerUI', function (e) {
        //游戏部分
        var contrlUI = new controlerUI.ControlerUI();
        var showUIP = new showUI.ShowUI();
        s.showUILayer.addChild(showUIP);
        s.controlUILayer.addChild(contrlUI);
        var readyGo = new ready3second.Ready3second();//321准备倒计时
        s.alertUILayer.addChild(readyGo);
    })
    //移除游戏Ui界面
    globalDispatcher.addEventListener('removeStage3DGameLayerUI', function (e) {
        s.showUILayer.removeChildAt(0);
        s.controlUILayer.removeChildAt(0);
        s.alertUILayer.removeChildAt(0);
    })
    //用户重新加入游戏
    globalDispatcher.addEventListener('userReInitGame', function (e) {
        s.changeLayer.removeChildAt(0);
        s.alertLayerForChange.removeChildAt(0);
        s.layerGame.removeChildAt(0);
        s.controlUILayer.removeChildAt(0);
        s.showUILayer.removeChildAt(0);
        var userInitGamePage = new userInitPage.UserInitPage();
        s.layerGame.addChild(userInitGamePage);
    })
};
F2xExtend(gameMain.GameMain, F2xContainer);
gameMain.GameMain.prototype.initUI = function () {
    var s = this;
    //f2x_auto_created_init_start
    var _d0 = new gameMain.F2xAuto_2();
    _d0.name = "menuUILayer";
    s.menuUILayer = _d0;
    var _d1 = new gameMain.F2xAuto_2();
    _d1.name = "alertLayerForChange";
    s.alertLayerForChange = _d1;
    var _d2 = new gameMain.F2xAuto_2();
    _d2.name = "changeLayer";
    s.changeLayer = _d2;
    var _d3 = new gameMain.F2xAuto_2();
    _d3.name = "alertUILayer";
    s.alertUILayer = _d3;
    var _d4 = new gameMain.F2xAuto_2();
    _d4.name = "showUILayer";
    s.showUILayer = _d4;
    var _d5 = new gameMain.F2xAuto_2();
    _d5.name = "controlUILayer";
    s.controlUILayer = _d5;
    var _d6 = new gameMain.F2xAuto_2();
    _d6.name = "layerGame";
    s.layerGame = _d6;
    var _d7 = new gameMain.F2xAuto_3();
    _d7.name = "uiBg";
    s.uiBg = _d7;
    s.addChild(_d7);
    s.addChild(_d6);
    s.addChild(_d5);
    s.addChild(_d4);
    s.addChild(_d3);
    s.addChild(_d2);
    s.addChild(_d1);
    s.addChild(_d0);
    //f2x_auto_created_init_end

};
gameMain.GameMain.prototype.userSceneArr = [['userInitPage', 'userChooseCar', 'userWaitToStartGame'], ['userGameChampionList', 'userGameChampionNoData'], 'userGameRoundList', 'userGameCenter'];
// gameMain.GameMain.prototype.zhuboSceneArr = [['zhuboWaitToStartGameRoom', 'zhuboLive'], 'zhuboSetGame', 'zhuboChampion', ['zhuboAllGameRoundData', 'zhuboGameRoundData'], 'zhuboUserCenter'];
gameMain.GameMain.prototype.zhuboSceneArr = ['zhuboWaitToStartGameRoom', 'zhuboSetGame', ['zhuboAllGameRoundData', 'zhuboGameRoundData']];
gameMain.GameMain.prototype.isUserStage3DLayerGamePartLoaded = false;//用户游戏部分是否加载过





