
const {ccclass, property} = cc._decorator;

@ccclass
export default class Fire extends cc.Component {

    @property(cc.Animation)
    anim: cc.Animation = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.anim = this.getComponent(cc.Animation);

    }

    start () {

    }

    appearFire(check){
        this.node.active;
    }

    // update (dt) {}
}
