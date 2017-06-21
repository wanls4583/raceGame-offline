var showUI = showUI || {};
showUI.ListDistantManager = function () {
    var s = this;
    F2xContainer.call(s);
    s.initUI();

};
F2xExtend(showUI.ListDistantManager, F2xContainer);
showUI.ListDistantManager.prototype.initUI = function () {
    var s = this;
    //f2x_auto_created_init_start

    //f2x_auto_created_init_end

};
showUI.ListDistantManager.prototype.cleanData = function (e) {
    var s = this;
    s.removeAllChildren();
}
showUI.ListDistantManager.prototype.setDistance = function (distance) {
    var s = this;
    s.cleanData();
    var distanceStr = distance.toString();
    var potIndex = null;
    for (var i = 0; i < distanceStr.length; i++) {
        if (distanceStr[i] == '.') {
            potIndex = i;
            var pot = new showUI.Posicon();
            pot.x = i * 12;
            pot.y = 12;
            s.addChild(pot);
        } else {
            var countNum = new showUI.ShuUnit();
            countNum.gotoAndStop(parseInt(distanceStr[i]) + 1);
            if (potIndex) {
                if (i > potIndex) {
                    countNum.x = i * 12 - 4;
                } else {
                    countNum.x = i * 12;
                }
            } else {
                countNum.x = i * 12;
            }
            s.addChild(countNum);
        }
    }
    var km = new showUI.Kmsmall();
    if (potIndex) {
        km.x = 12 * distanceStr.length - 4;
    } else {
        km.x = 12 * distanceStr.length + 4;
    }
    km.y = 4;
    s.addChild(km);
}