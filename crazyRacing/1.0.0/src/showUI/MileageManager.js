var showUI = showUI || {};
showUI.MileageManager = function () {
    var s = this;
    F2xContainer.call(s);
    s.initUI();
    //your code here
    s.count = 0;
    s.speed = 0;
    /*游戏场景开始运动*/
    if (GlobalData.identity == 1) {
        //主播端
        globalDispatcher.addEventListener('receiveSocketGamingData', function (e) {
            var message = e.data;
            //主播端
            if (message.castType == 4) {
                s.creatCountUnit(message.list[0].distance);
            }
        })
    } else {
        globalDispatcher.addEventListener('gameStageRun', function (e) {
            s.addEventListener(annie.Event.ENTER_FRAME, s.ef = function (e) {
                s.count++;
                // if (s.count < 1800 && s.count % 30 == 0) {
                //     var addSpeed = Math.floor(globalAddspeed / 10 * 100) / 100;
                //     s.speed += addSpeed;
                //     GlobalData.racerDistant = s.speed.toFixed(2);
                //     s.creatCountUnit(s.speed);
                // }
                if (s.count <= 1800) {
                    var addSpeed = Math.floor(globalAddspeed / 10 / 30 * 100) / 100;
                    s.speed += addSpeed;
                    GlobalData.racerDistant = s.speed.toFixed(2);
                    s.creatCountUnit(s.speed);
                }
            })
        })
    }

    //游戏结束
    globalDispatcher.addEventListener('timeOutGameOver', function (e) {
        s.removeEventListener(annie.Event.ENTER_FRAME, s.ef);
    })

};
F2xExtend(showUI.MileageManager, F2xContainer);
showUI.MileageManager.prototype.initUI = function () {
    var s = this;
    //f2x_auto_created_init_start
	
	//f2x_auto_created_init_end

};
//countMileage
showUI.MileageManager.prototype.creatCountUnit = function (num) {
    var s = this;
    if (isNaN(num)) {
        throw new Error('请输入数字类型');
        return;
    }
    s.removeAllChildren();//移除所有子集
    var numDot,//小数点对象
        numStr = num.toFixed(2);
    var isHasDot = numStr.indexOf('.') > 0 ? 1 : 0;//是否有小数点
    var numArr = numStr.split(''),
        numLeng = isHasDot ? numArr.length - 1 : numArr.length,//真实数字长度
        dotIndex;//小数点索引
    if (isHasDot) {
        dotIndex = numStr.indexOf('.');//小数点索引
        numArr.splice(dotIndex, 1);
        if (!numDot) {
            numDot = new showUI.NumDot();
            s.addChild(numDot);
        }
        numDot.x = 6 + (12 + 4) * dotIndex;
        numDot.y = 14;
    }

    var gap = 4,
        unitW;
    for (var i = 0; i < numLeng; i++) {
        var countUnit = new showUI.CountUnit();
        countUnit.gotoAndStop(parseInt(numArr[i]) + 1);
        if (i >= dotIndex) {
            countUnit.x = 8 + (countUnit.width + gap) * i + gap;
        } else {
            countUnit.x = 8 + (countUnit.width + gap) * i;
        }
        s.addChild(countUnit);
        /*数字最后一位*/
        if (i == numArr.length - 1) {
            if (!km) {
                var km = new showUI.KM();
                s.addChild(km);
            }
            km.x = countUnit.x + countUnit.width + gap;
            km.y = 0;
        }
    }
}