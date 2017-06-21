var stage3DLayer = stage3DLayer || {};
stage3DLayer.ObstacleManager = function () {
    var s = this;
    F2xContainer.call(s);
    s.initUI();
    //your code here
    globalDispatcher.addEventListener('recoveryObstacleEvent', function (e) {
        s.recoveryObstacle(e.data);//回收障碍物到对象池中
    })
};
F2xExtend(stage3DLayer.ObstacleManager, F2xContainer);
stage3DLayer.ObstacleManager.prototype.obstaclePool = [];//障碍物池
stage3DLayer.ObstacleManager.prototype.initUI = function () {
    var s = this;
    //f2x_auto_created_init_start
	
	//f2x_auto_created_init_end

};
/*获取障碍物方法*/
stage3DLayer.ObstacleManager.prototype.getObstacle = function (type) {
    var s = this,
        obstacle;
    var len = s.obstaclePool.length;
    if (len > 0) {
        for (var i = 0; i < len; i++) {
            if (s.obstaclePool[i].type == type) {
                obstacle = s.obstaclePool.splice(i, 1)[0];//从数组里面拿出来
                break;
            } else {
                obstacle = s.creatObstacle(type);
            }
        }
        // obstacle = s.obstaclePool.shift();
    } else {
        obstacle = s.creatObstacle(type);
    }
    return obstacle;//返回障碍物类实例
}
/*根据类型创建障碍物*/
stage3DLayer.ObstacleManager.prototype.creatObstacle = function (type) {
    var obstacle;
    if (type == 1) {
        obstacle = new stage3DLayer.ObstacleStone();
    } else if (type == 2) {
        obstacle = new stage3DLayer.ObsXgtong();
    }
    return obstacle;
}

/**
 * 障碍物回收
 * @param bullet
 */
stage3DLayer.ObstacleManager.prototype.recoveryObstacle = function (obstacle) {
    var s = this;
    if (!obstacle) {
        throw new Error('obstacle参数不能为空');
    }
    obstacle.status = 0;
    obstacle.stageId = 0;//用于回放的时候，查找
    obstacle.posId = 0;
    obstacle.xyz.z = 0;
    s.obstaclePool.push(obstacle);
}