
const {ccclass, property} = cc._decorator;

@ccclass
export default class Glyph extends cc.Component {

    public static intance: Glyph;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Glyph.intance = this;
    }

    start () {

    }

    appearGlyh1(){
        let glyph1 = this.node.getChildByName('gl1');
        let checkpoint = this.node.getChildByName('check1');
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

    appearGlyh2(){
        let glyph2 = this.node.getChildByName("gl2");
        let checkpoint = this.node.getChildByName('check2');
        checkpoint.destroy();
        this.scheduleOnce(function(){
            glyph2.opacity = 100;
        },0.5);
        this.scheduleOnce(function(){
            glyph2.opacity = 150;
        },0.5);
        this.scheduleOnce(function(){
            glyph2.opacity = 255;
        },0.5);
    }

    appearGlyh3(){
        let glyph3 = this.node.getChildByName("gl3");
        let checkpoint = this.node.getChildByName('check3');
        checkpoint.destroy();
        this.scheduleOnce(function(){
            glyph3.opacity = 100;
        },0.5);
        this.scheduleOnce(function(){
            glyph3.opacity = 150;
        },0.5);
        this.scheduleOnce(function(){
            glyph3.opacity = 255;
        },0.5);
    }

    appearStone(){
        let stone = this.node.getChildByName("stonehidden");
        stone.active = true;
    }

    // update (dt) {}
}
