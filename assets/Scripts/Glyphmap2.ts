
const {ccclass, property} = cc._decorator;

@ccclass
export default class Glyph2 extends cc.Component {

    public static intance: Glyph2; 
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Glyph2.intance = this;
    }

    appearGlyh1(){
        let glyph1 = this.node.getChildByName('glyph');
        let checkpoint = this.node.getChildByName('checkpoint');
        checkpoint.destroy();
        this.scheduleOnce(function(){
            glyph1.opacity = 100;
        },0.5);
        this.scheduleOnce(function(){
            glyph1.opacity = 150;
        },0.5);
        this.scheduleOnce(function(){
            glyph1.opacity = 255;
        },0.5);
    }

    start () {

    }

    // update (dt) {}
}
