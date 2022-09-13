
const {ccclass, property} = cc._decorator;

@ccclass
export default class Glyph2 extends cc.Component {

    @property(cc.Animation)
    anim:cc.Animation = null;

    public static instance: Glyph2 = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Glyph2.instance = this;
        this.anim = this.getComponent(cc.Animation);
    }

    appearGlyph(){
        this.anim.play('glyph2');
    }

    start () {

    }

    // update (dt) {}
}
