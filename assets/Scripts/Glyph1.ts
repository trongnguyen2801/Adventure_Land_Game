
const {ccclass, property} = cc._decorator;

@ccclass
export default class Glyph1 extends cc.Component {

    @property(cc.Animation)
    anim:cc.Animation = null;

    public static instance: Glyph1 = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Glyph1.instance = this;
        this.anim = this.getComponent(cc.Animation);
    }

    appearGlyph(){
        this.anim.play('glyph');
    }

    start () {

    }

    // update (dt) {}
}
