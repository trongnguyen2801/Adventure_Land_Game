import Player2 from "./Player2";
const {ccclass, property} = cc._decorator;

@ccclass
export default class BossGolem extends cc.Component {

    @property(cc.Animation)
    anim: cc.Animation = null;

    // player: Player2 = null;
    @property(cc.Node)
    player:cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.player = cc.find('Canvas/player').getComponent(Player2);
        this.anim = this.getComponent(cc.Animation);
    }

    start () {

    }

    // update (dt) {}
}
