/**
 * @author anlun214 QQ:58529016
 */
//正式地址:https://qf.56.com/game/race/
//测试地址：https://pre.qf.56.com/game/race/
var serverApi = 'https://pre.qf.56.com/game/race/';
/*全局临时数据*/
var GlobalData = {
    gwToken: null,
    userId: null,
    token: null,
    roomId: null,
    gameRoads: null,//游戏场景信息
    currSelectedStageId: null,//主播当前选择的场景id
    isCreatRoom: null,//是否已经创建了房间
    isGaming: false,//本场次游戏是否已经开赛
    isTimeOutGameOver: false,
    isChangingLanes: false,//赛车是否在变道
    isUseSuperProtectingEffect: false,//是否在使用护盾效果
    isUseSuperRunningEffect: false,//是否使用喷射加速
    identity: 2,//1主播,2用户
    endGameCode: null,//一场比赛结束后的场次编号
    gameCode: null,//场次id编号
    playerNo: true,//玩家座位号用于判断是否在开始游戏中
    creatGameData: null,//当前游戏局的数据
    userChooesedCarId: 1,//用户选择的赛车id
    checkOutGameCostStatus: 0,//清算游戏入场费用情况
    zbGRDSelectedListGameCode: -1,//主播端场次列表被选择的场次id
    userSelectedLlistGameCode: -1,//用户端场次列表所选场次id
    gameKey: '',//请求socket进入游戏赛局秘钥
    menuCurrSelectedIndex: -1,//当菜单按钮选择索引
    racerDistant: 0,//赛车手公里数
    racerCarX: 0,//赛车的X坐标
    tempSocketMessage: null,
    zhuboRacersInfo: null,//主播端记录参数用户信息对象
    currLivePlayerNo: 1,//当前回放座位号
    addAbstacleTimeGap: 1000,//添加障碍物间隔
    coinPool: 0000,//当前奖金池
    gameTools: null,//游戏道具列表
    racerCarDir: 0,//导出转向标识0中间，1左边，2右边,
    giftPool:[],//扔礼物的，礼物池
    gameResultCode: null,//游戏结束gameCode
    gameResultData: null//游戏结果数据
};
//单机数据-begin
GlobalData.creatGameData = {
    road: '欲望都市',//地图,'夏威夷海滩','欲望都市'
    roadId: 1,//1是欲望都市的景物，2是夏威夷海滩的景物
    number: 1//存储游戏现在人数
};
GlobalData.identity = 2;
GlobalData.gameCode = 1;
//可选汽车
GlobalData.chooseCars = [
    {
        own:1,name:'极速火力',id:102,maxSpeed:80,maxTime:6,maxDefense:50
    },
    {
        own:1,name:'国产6玲',id:1,maxSpeed:60,maxTime:10,maxDefense:80
    }
];
//用户剩余金币数
GlobalData.userFreeCoin = 10000;
//道具
GlobalData.gameTools = {
    speed:[
        {
            effect:{effect:100,during:3},
            tag:1
        }
    ],
    defense:[
        {
            effect:{during:3},
            tag:2
        }
    ]
}
GlobalData.gameResultData = {
    rank: 2//结果为第二名
}
//单机数据-end
var F2xExtend = __extends;
window.addEventListener("load", function () {
    annie.debug = false;
    /**
     * 最上层div的id,可以在一个页面同时放多个stage.
     * 设计尺寸的宽
     * 设计尺寸的高
     * FPS刷新率
     * 缩放模式
     * 渲染模式
     */
    var gameRect = document.getElementById('game_rect');
    gameRect.style.height = gameRect.clientWidth * (400/640) + 'px';
    gameRect.style.width = gameRect.clientWidth + 'px';
    var stage = new annie.Stage("game_rect", 640, 400, 30, annie.StageScaleMode.FIXED_WIDTH, 0);
    stage.addEventListener(annie.Event.INIT_TO_STAGE, function (e) {
        var loadSceneArr;
        loadSceneArr = ['gameMain', 'userInitPage', 'rule', 'ready3second'];
        Flash2x.loadScene("loading", function (per) {
            //加载进度
            // console.log("加载进度:"+per+"%");
        }, function () {
            //加载完成
            var loadingObj = new loading.Loading();
            stage.addChild(loadingObj);
            Flash2x.loadScene(loadSceneArr, function (per) {
                //加载进度
                // trace("加载进度:" + per + "%");
                loadingObj.gotoAndStop(per);
                loadingObj.per_txt.text = per + "%";
            }, function (result) {
                stage.removeChild(loadingObj);
                //加载完成 result 里包含了当前加载完成的是哪个场景序号，以及总加载场景数有多少，所以
                //需要同时加载多个模块时可以判断已经加载好的后直接出内容，其他偷偷在后台加载
                if (result.sceneId == result.sceneTotal) {
                    stage.addChild(new gameMain.GameMain());
                    globalDispatcher.dispatchEvent('firstPlayBGM');
                }
            });
        });

    })
});
var globalAddspeed;//全局速度
var CarConfig = {
    id: 1,
    name: 'car',
    maxTime: 5,
    maxSpeed: 30,
    maxDefense: 0.08,
    carType: 1,
    price: 0,
    skinUrl: ''
};//赛车配置表


/**
 * 平面中两点距离公式
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns {number}
 */
var getDistance = function (x1, y1, x2, y2) {
    var x1 = x1;
    var y1 = y1;
    var x2 = x2;
    var y2 = y2;
    var xdiff = x2 - x1;
    var ydiff = y2 - y1;
    var dis = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
    return dis;
};


/*拓展封装Flash2x全局场景加载器*/
(function () {
    var loadSceneManager = function (sceneName, sceneContainer, bringData) {
        var s = this;
        var loadingObj;
        Flash2x.loadScene(sceneName, function (per) {
            //加载进度
            //trace("加载进度:" + per + "%");
            if (!loadingObj) {
                var loadingObj = new loading.Loading();
                sceneContainer.removeChildAt(0);
                sceneContainer.addChild(loadingObj);
            }
            loadingObj.gotoAndStop(per);
            loadingObj.per_txt.text = per + "%";
        }, function (result) {
            //加载完成 result 里包含了当前加载完成的是哪个场景序号，以及总加载场景数有多少，所以
            //需要同时加载多个模块时可以判断已经加载好的后直接出内容，其他偷偷在后台加载
            // trace('场景Id:' + result.sceneName);
            if (result.sceneId == result.sceneTotal) {
                sceneContainer.removeChild(loadingObj);
                var upperCaseSceneName,
                    _sceneName,
                    sceneConstructor;
                if (typeof sceneName == 'string') {
                    _sceneName = sceneName;
                } else {
                    // trace('资源总个数：'+result.sceneTotal);
                    _sceneName = sceneName[0];
                }
                upperCaseSceneName = _sceneName.replace(_sceneName.charAt(0), _sceneName.charAt(0).toUpperCase());//第一字母大写
                sceneConstructor = annie.Eval(_sceneName);//字符串转换成对象
                if (sceneContainer.children.length > 0) {
                    sceneContainer.removeChildAt(0);
                }
                //bringData,携带数据
                var instance = new sceneConstructor[upperCaseSceneName]();
                if (bringData) {
                    instance.bringData = bringData
                } else {
                    instance.bringData = null;
                }
                sceneContainer.addChild(instance);
            }
        });
    }
    return Flash2x.loadSceneManager = loadSceneManager;
})()


/*判断终端*/
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

//TODO 交付打包的时候要改为false
var isLocationTest = true;//是否是本地测试，
/*APP交互Ios*/
//新版本初始化方式
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe)
    }, 0)
}

/*跳转直播间*/
function jumpZhuboRoom() {
    if (!isLocationTest) {
        if (isiOS) {
            //app调用方式    3为协议事件type，最后是回调response
            window.WebViewJavascriptBridge.callHandler('3', {}, function (response) {
                trace('JS got response', response);
            })
        } else if (isAndroid) {
            gameInterface.turn_room();
        }
    }
}





