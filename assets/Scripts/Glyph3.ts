
const {ccclass, property} = cc._decorator;

@ccclass
export default class Glyph3 extends cc.Component {

    @property(cc.Animation)
    anim:cc.Animation = null;

    public static instance: Glyph3 = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Glyph3.instance = this;
        this.anim = this.getComponent(cc.Animation);
    }

    appearGlyph(){
        this.anim.play('glyph3');
    }

    start () {

    }

    // update (dt) {}
}
