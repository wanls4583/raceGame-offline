var stage3DLayer = stage3DLayer || {};
stage3DLayer.GiftsManager = function () {
    var s = this;
    F2xContainer.call(s);
    s.initUI();
    //your code here
    globalDispatcher.addEventListener('recoveryGiftsEvent', function (e) {
        s.recoveryGifts(e.data);//回收礼物到对象池中
    })
};
F2xExtend(stage3DLayer.GiftsManager, F2xContainer);
stage3DLayer.GiftsManager.prototype.giftsPool = [];//礼物池
stage3DLayer.GiftsManager.prototype.initUI = function () {
    var s = this;
    //f2x_auto_created_init_start
	
	//f2x_auto_created_init_end

};
/*获取礼物方法*/
stage3DLayer.GiftsManager.prototype.getGift = function () {
    var s = this,
        gift;
    if (s.giftsPool.length > 0) {
        gift = s.giftsPool.shift();
    } else {
        gift = new stage3DLayer.GiftBox();
    }
    return gift;//返回礼物类实例
}

/**
 * 礼物回收
 * @param gift
 */
stage3DLayer.GiftsManager.prototype.recoveryGifts = function (gift) {
    var s = this;
    if (!gift) {
        throw new Error('gift参数不能为空');
    }
    gift.giftCode = null;
    gift.status = 0;
    gift.stageId = 0;//用于回放的时候，查找
    gift.posId = 0;
    gift.xyz.z = 0;
    s.giftsPool.push(gift);
}