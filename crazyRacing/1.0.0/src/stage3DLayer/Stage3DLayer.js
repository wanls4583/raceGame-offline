var stage3DLayer = stage3DLayer || {};
stage3DLayer.Stage3DLayer = function () {
    var s = this;
    F2xContainer.call(s);
    s.initUI();
    //your code here
    var scene3D = null;
    var userCar = null;
    var stageBg = null;
    s.addEventListener(annie.Event.ADD_TO_STAGE, function (e) {
        if (GlobalData.creatGameData.road == '欲望都市') {
            stageBg = new stage3DLayer.StageBg1();
        } else if (GlobalData.creatGameData.road == '夏威夷海滩') {
            stageBg = new stage3DLayer.StageBg2();
        }
        s.addChildAt(stageBg, 0);//放到最低层
        if (!scene3D) {
            scene3D = new annie.Stage3D();
        }
        scene3D.x = 320;
        s.addChild(scene3D);
        if (GlobalData.userChooesedCarId == 1) {
            //免费国产六铃
            userCar = new stage3DLayer.Car();
        } else if (GlobalData.userChooesedCarId == 102) {
            //极速火力
            userCar = new stage3DLayer.Carjshl();
        }
        userCar.effect1.visible = userCar.effect2.visible = userCar.effect3.visible = false;//隐藏特效
        userCar.gotoAndStop('center');//默认在中间赛道
        userCar.x = 320;
        userCar.y = 200;
        s.addChild(userCar);//赛车在上层
        scene3D.CarObj = userCar;
        if (!scene3D.ObstacleManager) {
            scene3D.ObstacleManager = new stage3DLayer.ObstacleManager();
        }
        if (!scene3D.GiftsManager) {
            scene3D.GiftsManager = new stage3DLayer.GiftsManager();
        }
        // s.addChild(s.showUseEffectBox);//特效小动画窗口
        globalDispatcher.dispatchEvent('initStage3DGameLayerUI', GlobalData.identity);//初始化游戏Ui界面
    })
    //移除舞台
    s.addEventListener(annie.Event.REMOVE_TO_STAGE, function (e) {
        s.removeAllChildren();
        s.removeAllEventListener();
        globalDispatcher.dispatchEvent('removeStage3DGameLayerUI');//移除游戏Ui界面
        globalDispatcher.removeEventListener('gameStageRun', s.g1);
        globalDispatcher.removeEventListener('bgRoadStopMoving', s.g2);
        globalDispatcher.removeEventListener('someOneReadyToPassYou', s.g3);
    })
    globalDispatcher.addEventListener('gameStageRun', s.g1 = function (e) {
        stageBg.gotoAndStop(2);
        annie.Tween.to(s.deng_mc, .8, {x: -260, y: 430, scaleX: 2, scaleY: 2, ease: annie.Tween.quarticIn});
        annie.Tween.to(s.road_mc, .8, {x: 62, y: 420, scaleX: 2, scaleY: 2, ease: annie.Tween.quarticIn});
    })
    globalDispatcher.addEventListener('bgRoadStopMoving', s.g2 = function (e) {
        stageBg.gotoAndStop(1);
    })
    globalDispatcher.addEventListener('someOneReadyToPassYou', s.g3 = function (e) {
        s.addChild(s.tipsCon);
        s.tipsCon.removeChildAt(0);
        var someOne = e.data;
        var tipsReadyToPassYou = new stage3DLayer.SomeOneNearYouTip();
        tipsReadyToPassYou.avatarCon.initFcae(someOne.avatar);
        s.tipsCon.addChild(tipsReadyToPassYou);
        setTimeout(function () {
            s.tipsCon.removeChildAt(0);
        }, 1000)
    })
};
F2xExtend(stage3DLayer.Stage3DLayer, F2xContainer);
stage3DLayer.Stage3DLayer.prototype.initUI = function () {
    var s = this;
    //f2x_auto_created_init_start
	var _d0=new stage3DLayer.F2xAuto_41();
	_d0.name="effectShowCon";
	s.effectShowCon=_d0;
	Flash2x.d(_d0,{x:20,y:20});
	var _d1=new stage3DLayer.F2xAuto_40();
	_d1.name="tipsCon";
	s.tipsCon=_d1;
	Flash2x.d(_d1,{x:146,y:23.05});
	var _d2=new stage3DLayer.F2xAuto_4();
	_d2.name="deng_mc";
	s.deng_mc=_d2;
	Flash2x.d(_d2,{x:56.85,y:179.05});
	var _d3=new stage3DLayer.road_mc();
	_d3.name="road_mc";
	s.road_mc=_d3;
	Flash2x.d(_d3,{x:190.9,y:188});
	s.addChild(_d3);
	s.addChild(_d2);
	s.addChild(_d1);
	s.addChild(_d0);
	//f2x_auto_created_init_end
};


/**
 * Created by Saron on 2017/3/19.
 */
var annie = annie || {};
annie.Stage3D = function () {
    var s = this;
    F2xContainer.call(s);
    //场景距离
    s.fl = 500;
    s.wh = {w: 640, h: 400};
    //屏幕当前所在的z轴位置
    s.baseZ = 0;
    //中心消失点坐标
    s.cX = 0;
    s.cY = 0;
    //中心消失点偏移
    s.cXl = 0;
    s.cYl = 0;
    //偏移系数
    s.ce = 0;
    //是否在暂停状态
    s.isPausing = false;
    //计算
    s.count = 0;
    //初始化场景
    s.initUI();//初始化各场景对象
    var flash2xAddObsTimer = null;
    s.addEventListener(annie.Event.ADD_TO_STAGE, function (e) {
        s.updateScene();
        GlobalData.addAbstacleTimeGap = 1000;
        if (!flash2xAddObsTimer) {
            flash2xAddObsTimer = new annie.Timer(GlobalData.addAbstacleTimeGap);
            flash2xAddObsTimer.addEventListener(annie.Event.TIMER, s.ado = function (e) {
                s.addObstacle();//添加障碍物
            })
        }
    })
    s.addEventListener(annie.Event.REMOVE_TO_STAGE, function (e) {
        s.addSpeed = 0;
        flash2xAddObsTimer.removeEventListener(annie.Event.TIMER, s.ado);
        flash2xAddObsTimer.kill();
        flash2xAddObsTimer = null;
        s.removeAllChildren();
        s.removeAllEventListener();
        globalDispatcher.removeEventListener('addObstacleRadio', s.g1);
        globalDispatcher.removeEventListener('gameStageRun', s.g3);
        globalDispatcher.removeEventListener('superRunning', s.g4);
        globalDispatcher.removeEventListener('superProtecting', s.g5);
        globalDispatcher.removeEventListener('carSlowDown', s.g6);
        globalDispatcher.removeEventListener('timeOutGameOver', s.g7);
    })
    //添加障礙物
    globalDispatcher.addEventListener('addObstacleRadio', s.g1 = function (e) {
        // var times = e.data;
        // if (times > 0 && times % 20 == 0) {
            GlobalData.addAbstacleTimeGap = GlobalData.addAbstacleTimeGap - 200;
            flash2xAddObsTimer.delay = GlobalData.addAbstacleTimeGap;
            flash2xAddObsTimer.reset();
            flash2xAddObsTimer.start();
        // }
    })
   
    globalDispatcher.addEventListener('gameStageRun', s.g3 = function (e) {
        GlobalData.isTimeOutGameOver = false;
        s.isGaming = true;
        s.isCarInitGo = true;
        s.startRun();
        flash2xAddObsTimer.start();//添加障碍物计时开始
    })

    //加速特效
    globalDispatcher.addEventListener('superRunning', s.g4 = function (e) {
        // trace('当前车速：' + s.addSpeed);
        //TODO 先调用app 充值接口
        if (!s.isCarHasEffect) {
            trace('加速特效数据：' + GlobalData.gameTools.speed[0]);
            if (GlobalData.gameTools.speed[0]) {
                s.useEffectToCost(GlobalData.gameTools.speed[0].id, GlobalData.gameTools.speed[0].tag);
            }
        }
    })
    //护盾特效
    globalDispatcher.addEventListener('superProtecting', s.g5 = function (e) {
        //TODO 先调用app 充值接口
        if (!GlobalData.isUseSuperProtectingEffect) {
            //请求使用道具接口
            trace('护盾特效数据：' + GlobalData.gameTools.defense[0]);
            if (GlobalData.gameTools.defense[0]) {
                s.useEffectToCost(GlobalData.gameTools.defense[0].id, GlobalData.gameTools.defense[0].tag);
            }
        }
    })

    //碰撞到障碍物减速
    globalDispatcher.addEventListener('carSlowDown', s.g6 = function (e) {
        // trace('当前车速：' + s.addSpeed);
        var timeId;
        s.isCarHitObstacleSlowingDown = true;
        // s.addSpeed -= (s.addSpeed * 0.1);
        if (!timeId) {
            timeId = setTimeout(function (e) {
                s.isCarHitObstacleSlowingDown = false;
                clearTimeout(timeId);
            }, 1000);
        }
    })
    //游戏结束
    globalDispatcher.addEventListener('timeOutGameOver', s.g7 = function (e) {
        s.stopRun();
        flash2xAddObsTimer.kill();
        s.ObstacleManager.obstaclePool = [];//清空对象池
        trace(e.data);
    })
};
__extends(annie.Stage3D, F2xContainer);
annie.Stage3D.prototype.isGaming = false;
annie.Stage3D.prototype.isTimeOutGameOver = false;
annie.Stage3D.prototype.CarObj = null;
annie.Stage3D.prototype.ObstacleManager = null;
annie.Stage3D.prototype.GiftsManager = null;
annie.Stage3D.prototype.isCarInitGo = true;
annie.Stage3D.prototype.isCarHasEffect = false;
annie.Stage3D.prototype.isCarHitObstacleSlowingDown = false;//赛车碰撞到障碍物减速中
annie.Stage3D.prototype.acceleration = (CarConfig.maxSpeed * 10 ) / (CarConfig.maxTime * 30);//匀加速度
annie.Stage3D.prototype.addSpeed = 0;
annie.Stage3D.prototype.intervalId = 0;
annie.Stage3D.prototype.giftStagePos = 0;
annie.Stage3D.prototype.giftStageId = 0;//礼物爆炸id
annie.Stage3D.prototype.obstacleStagePos = 0;
annie.Stage3D.prototype.obstacleStageId = 0;//爆炸id
annie.Stage3D.prototype.socketDataArr = [];//用于上报socket的数据对象
annie.Stage3D.prototype.initUI = function () {
    var s = this;
    s.creatStageInstance(GlobalData.creatGameData.roadId);
};
//根据不同场景，创建不同景物
annie.Stage3D.prototype.creatStageInstance = function (stageId) {
    var s = this,
        maxNum = 10,
        tempIndex = -1;
    // trace(s.addSpeed);
    if (stageId == 1) {
        //欲望都市
        for (var i = 0; i < maxNum; i++) {
            var tree = new stage3DLayer.Tree(),
                roadLine = new stage3DLayer.RoadLine(),
                index = Math.floor(Math.random() * 8);
            // trace(index);
            if (tempIndex == index) {
                if (tempIndex > 1) {
                    index = tempIndex - 1;
                } else {
                    index = tempIndex + 1;
                }
            }
            tempIndex = index;
            if (i % 2 == 0) {
                var buildR = new stage3DLayer.BuildingR();
                buildR.gotoAndStop(i);
                buildR.xyz = {x: 680, y: 680, z: (maxNum - i) * 1000};
                roadLine.xyz = {x: -200, y: 710, z: (maxNum - i) * 1000};
                tree.xyz = {x: -400, y: 460, z: (maxNum - i) * 1000};
                s.addChild(buildR);
            } else {
                var buildL = new stage3DLayer.BuildingL();
                buildL.gotoAndStop(i - 1);
                buildL.xyz = {x: -680, y: 680, z: (maxNum - i) * 1000};
                roadLine.gotoAndStop(2);
                tree.gotoAndStop(2);
                roadLine.xyz = {x: 200, y: 710, z: (maxNum - i - 1) * 1000};
                tree.xyz = {x: 400, y: 460, z: (maxNum - i) * 1000};
                s.addChild(buildL);
            }
            s.addChild(roadLine);
            s.addChild(tree);
        }
    } else if (stageId == 2) {
        //夏威夷海滩
        for (var i = 0; i < maxNum; i++) {
            var roadLine = new stage3DLayer.RoadLine(),
                index = Math.floor(Math.random() * 8);
            // trace(index);
            if (tempIndex == index) {
                if (tempIndex > 1) {
                    index = tempIndex - 1;
                } else {
                    index = tempIndex + 1;
                }
            }
            tempIndex = index;
            if (i % 2 == 0) {
                var botanyR = new stage3DLayer.BotanyR();
                botanyR.gotoAndStop(i);
                botanyR.xyz = {x: 930, y: 1070, z: (maxNum - i) * 1000};
                roadLine.xyz = {x: -200, y: 710, z: (maxNum - i) * 1000};
                s.addChild(botanyR);
            } else {
                var botanyL = new stage3DLayer.BotanyL();
                botanyL.gotoAndStop(i - 1);
                botanyL.xyz = {x: -930, y: 1070, z: (maxNum - i) * 1000};
                roadLine.gotoAndStop(2);
                roadLine.xyz = {x: 200, y: 710, z: (maxNum - i - 1) * 1000};
                s.addChild(botanyL);
            }
            s.addChild(roadLine);
        }
    }
}
//计算位置及大小
annie.Stage3D.prototype.updateScene = function () {
    var s = this;
    var child;
    var scale;
    var z;
    var zShowDis;
    for (var i = 0; i < s.children.length; i++) {
        child = s.children[i];
        z = child.xyz.z - s.baseZ;
        scale = s.fl / (s.fl + z);
        if (child.name == 'roadLine') {
            zShowDis = 10000;
        } else if (child.name == 'build') {
            zShowDis = 9000;
        } else if (child.name == 'Obstacle') {
            zShowDis = 9000;
        } else if (child.name == 'gift') {
            zShowDis = 9000;
        }
        if (z > zShowDis) {
            child.visible = false;
        } else {
            if (z < 0) {
                if (child.name == 'Obstacle') {
                    //trace('obstacleOut');
                    s.removeChild(child);
                    globalDispatcher.dispatchEvent('recoveryObstacleEvent', child);//回收障碍物
                    return;
                }
                if (child.name == 'gift') {
                    // trace(child.xyz.z, 'giftOut');
                    s.removeChild(child);
                    globalDispatcher.dispatchEvent('recoveryGiftsEvent', child);//回收障碍物
                    return;
                }
                child.xyz.z += 10000;
                s.addChildAt(child, 0);
            } else {
                child.scaleX = child.scaleY = scale;
                child.y = (s.cY + ((child.xyz.y + s.cYl - s.cY) * scale));
                child.x = (s.cX + ((child.xyz.x + s.cXl - s.cX) * scale));
            }
            child.visible = true;
        }
        s.checkHitTest(child);//检测碰撞,礼物，障碍物
    }
    /*判断加减速情况*/
    if (s.isCarInitGo && !s.isCarHasEffect && !s.isCarHitObstacleSlowingDown && !s.isTimeOutGameOver) {
        //赛车开始启动
        s.addSpeed += s.acceleration;
    } else if (s.isCarHasEffect) {
        if (s.isCarInitGo) {
            s.isCarInitGo = false;
        }
        //赛车加速特效
        if (s.addSpeed < CarConfig.maxSpeed * 10 + 240) {
            s.addSpeed += 240 / 30;
            trace('特效加速' + s.addSpeed);
        }
    } else if (!s.isCarHasEffect && !s.isCarInitGo && !s.isTimeOutGameOver) {
        //赛车加速特效结束后，要匀减速
        if (s.addSpeed > CarConfig.maxSpeed * 10) {
            s.addSpeed -= CarConfig.maxSpeed * 10 * 0.1 / 30;
            trace('减速：' + s.addSpeed);
        } else {
            s.addSpeed = CarConfig.maxSpeed * 10
        }
    }
    //开场匀加速情况
    if (s.isCarInitGo && s.addSpeed > CarConfig.maxSpeed * 10 && !s.isTimeOutGameOver) {
        s.addSpeed = CarConfig.maxSpeed * 10;
        s.isCarInitGo = false;
        // trace('开场加速：' + s.addSpeed);
    }
    //时间到游戏结束，场景匀减速直至停止
    if (s.isTimeOutGameOver) {
        if (s.addSpeed > 0) {
            s.addSpeed -= 4;
            if (s.addSpeed < 0) {
                s.addSpeed = 0;
            }
        }
    }

    //碰到障碍物减速情况
    if (s.isCarHitObstacleSlowingDown) {
        if (!GlobalData.isUseSuperRunningEffect) {
            if (s.addSpeed >= CarConfig.maxSpeed * 10) {
                s.addSpeed -= (s.addSpeed * 0.2);//减速20%
            } else {
                s.addSpeed -= (s.addSpeed * 0.008);//减速8%
            }
        } else {
            s.addSpeed -= (s.addSpeed * 0.004);//在加速过程中,减速4%
        }

    }
    s.baseZ += Math.round(s.addSpeed * 100) / 100;
    globalAddspeed = Math.round(s.addSpeed * 100) / 100;//全局公开加速度
};


/*启动游戏场景运动*/
annie.Stage3D.prototype.startRun = function (e) {
    var s = this;
    s.addEventListener(annie.Event.ENTER_FRAME, s.ef = s.updateScene.bind(s));
};
/*停止游戏场景运动*/
annie.Stage3D.prototype.stopRun = function (e) {
    var s = this;
    s.isGaming = false;
    trace('stageToStopping');
    s.isTimeOutGameOver = true;
    GlobalData.isTimeOutGameOver = s.isTimeOutGameOver;
    globalDispatcher.dispatchEvent('bgRoadStopMoving');
};
/*添加障碍物*/
annie.Stage3D.prototype.addObstacle = function () {
    var s = this;
    var obstacleType = Math.floor(Math.random() * 2);//障碍物类型
    var obstacle = s.ObstacleManager.getObstacle(obstacleType + 1);
    obstacle.status = 0;
    var obstaclePosArr = [[0, 600], [-260, 566], [260, 566]],
        randomNum = Math.floor(Math.random() * 3);
    obstacle.posId = randomNum;//记录哪个赛道出现
    s.obstacleStagePos = randomNum;//存储障碍物赛道id
    s.obstacleStageId++;
    obstacle.xyz = {x: obstaclePosArr[randomNum][0], y: obstaclePosArr[randomNum][1], z: s.baseZ + 12000};
    s.addChildAt(obstacle, 0);
    obstacle.con.gotoAndStop(1);
}

//使用道具提交扣费接口
annie.Stage3D.prototype.useEffectToCost = function (toolId, toolsTag) {
    var s = this;
    if (toolsTag == 1) {
        //喷射加速效果
        s.isCarHasEffect = true;
        GlobalData.isUseSuperRunningEffect = true;
        globalDispatcher.dispatchEvent('declineEffectTimes', 0);//扣减特效次数
        //加速效果持续时间
        var effectAttr = GlobalData.gameTools.speed[0].effect;//获取特效属性
        var superRunning = new annie.Timer(effectAttr.during * 1000);
        superRunning.addEventListener(annie.Event.TIMER, s.supRF = function (e) {
            s.isCarHasEffect = false;
            GlobalData.isUseSuperRunningEffect = false;
            superRunning.removeEventListener(annie.Event.TIMER, s.supRF);
        })
        globalDispatcher.dispatchEvent('carUpdateSuperRunningEffect', {
            addSPer: effectAttr.effect,
            during: effectAttr.during
        });//抛发急速火力特效事件，汽车类接收,effectAttr.effect是一个百分比(%)加速幅度
        superRunning.start();//开始计时
        //使用道具上报
        var carSpeed = Math.floor(((globalAddspeed / 10) * 100)) / 100;
    } else if (toolsTag == 2) {
        //护盾效果
        s.CarObj.effect0.visible = true;//开启护盾
        GlobalData.isUseSuperProtectingEffect = true;
        globalDispatcher.dispatchEvent('declineEffectTimes', 1);//扣减特效次数
        //护盾效果1秒
        var effectAttr = GlobalData.gameTools.defense[0].effect;//获取特效属性
        var superProtecting = new annie.Timer(effectAttr.during * 1000);
        superProtecting.addEventListener(annie.Event.TIMER, s.supPF = function (e) {
            GlobalData.isUseSuperProtectingEffect = false;
            superProtecting.removeEventListener(annie.Event.TIMER, s.supPF);
            s.supPF = null;
        })
        superProtecting.start();

        //使用道具上报
        var carSpeed = Math.floor(((globalAddspeed / 10) * 100)) / 100;
    }
}

annie.Stage3D.prototype.checkHitTest = function (child) {
    var s = this;
    //检测障碍物碰撞
    if (child.name == 'Obstacle') {
        var obstacle = child;
        if (obstacle.status == 0 && s.CarObj) {
            if ((child.xyz.z - s.baseZ ) < s.CarObj.y + 800 && obstacle.posId == s.CarObj.posStatus) {
                if (s.CarObj.effect0.visible) {
                    child.status = 1;
                    child.con.gotoAndPlay(2);
                    s.CarObj.effect0.visible = false;//护盾效果消失
                    GlobalData.isUseSuperProtectingEffect = false;
                } else {
                    child.status = 1;
                    child.con.gotoAndPlay(2);
                    //碰到障碍物减速处理carSlowDown
                    globalDispatcher.dispatchEvent('carSlowDown');
                    s.addSpeed -= (s.addSpeed * 0.05);
                }
            }
        }
        // trace('状态：' + child.status);
    }
}



