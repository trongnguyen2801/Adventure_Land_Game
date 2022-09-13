import StoneHiddenMap2 from "./StoneHiddenMap2";
import Glyph1 from "./Glyph1";
const {ccclass, property} = cc._decorator;
@ccclass
export default class GlyphMap2 extends cc.Component {

    public static instance: GlyphMap2; 

    @property(cc.Node)
    stoneHidden: cc.Node = null;

    @property(cc.Animation)
    anim:cc.Animation = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        GlyphMap2.instance = this;
    }

    appear(){
        // let glyph1 = this.node.getChildByName('glyph');
        // this.anim = this.node.getChildByName('glyph').getComponent(cc.Animation);
        let checkpoint = this.node.getChildByName('checkpoint');
        checkpoint.destroy();

        Glyph1.instance.appearGlyph();
        
        // this.scheduleOnce(function(){
        //     glyph1.scale = 0.5;
        //     glyph1.opacity = 100;
        // },0.5);
        // this.scheduleOnce(function(){
        //     glyph1.scale = 1;
        //     glyph1.opacity = 150;
        // },1);
        // this.scheduleOnce(function(){
        //     glyph1.opacity = 255;
        //     glyph1.scale = 0.5;
        // },1.5);
        
        this.stoneHidden.active = true;
    }

    start () {

    }

    // update (dt) {}
}
