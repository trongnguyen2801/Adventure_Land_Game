import Glyph2 from "./Glyph2";
import Glyph3 from "./Glyph3";
import Glyph4 from "./Glyph4";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Glyph extends cc.Component {

    public static instance: Glyph;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Glyph.instance = this;
    }

    start () {

    }

    appearGlyh1(){
        // let glyph1 = this.node.getChildByName('gl1');
        let checkpoint = this.node.getChildByName('check1');
        checkpoint.destroy();
        Glyph2.instance.appearGlyph();
        // this.scheduleOnce(function(){
        //     glyph1.opacity = 100;
        // },0.5);
        // this.scheduleOnce(function(){
        //     glyph1.opacity = 150;
        // },0.5);
        // this.scheduleOnce(function(){
        //     glyph1.opacity = 255;
        // },0.5);
    }

    appearGlyh2(){
        // let glyph2 = this.node.getChildByName("gl2");
        let checkpoint = this.node.getChildByName('check2');
        checkpoint.destroy();
        Glyph3.instance.appearGlyph();
        // this.scheduleOnce(function(){
        //     glyph2.opacity = 100;
        // },0.5);
        // this.scheduleOnce(function(){
        //     glyph2.opacity = 150;
        // },0.5);
        // this.scheduleOnce(function(){
        //     glyph2.opacity = 255;
        // },0.5);
    }

    appearGlyh3(){
        // let glyph3 = this.node.getChildByName("gl3");
        let checkpoint = this.node.getChildByName('check3');
        checkpoint.destroy();
        Glyph4.instance.appearGlyph();
        // this.scheduleOnce(function(){
        //     glyph3.opacity = 100;
        // },0.5);
        // this.scheduleOnce(function(){
        //     glyph3.opacity = 150;
        // },0.5);
        // this.scheduleOnce(function(){
        //     glyph3.opacity = 255;
        // },0.5);
    }

    appearStone(){
        let stone = this.node.getChildByName("stonehidden");
        stone.active = true;
    }

    // update (dt) {}
}
