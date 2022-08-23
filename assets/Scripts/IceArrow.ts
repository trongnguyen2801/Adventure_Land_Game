
const {ccclass, property} = cc._decorator;

@ccclass
export default class IceArrow extends cc.Component {

    @property(cc.Animation)
    anim:cc.Animation = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.anim = this.getComponent(cc.Animation);
        this.scheduleOnce(function() {
            this.node.destroy();
        },1)
    }

    start () {

    }

    // update (dt) {}
}
