
const {ccclass, property} = cc._decorator;

@ccclass
export default class Glyph4 extends cc.Component {

    @property(cc.Animation)
    anim:cc.Animation = null;

    public static instance: Glyph4 = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Glyph4.instance = this;
        this.anim = this.getComponent(cc.Animation);
    }

    appearGlyph(){
        this.anim.play('glyph4');
    }

    start () {

    }

    // update (dt) {}
}
