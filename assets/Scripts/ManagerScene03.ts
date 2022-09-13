
const {ccclass, property} = cc._decorator;

@ccclass
export default class ManagerScene03 extends cc.Component {


    @property(cc.Prefab)
    fire1: cc.Prefab = null;

    @property(cc.Prefab)
    glyph1: cc.Prefab = null;

    @property(cc.Prefab)
    glyph2: cc.Prefab = null;

    @property(cc.Prefab)
    glyph3: cc.Prefab = null;

    @property(cc.Prefab)
    stone: cc.Prefab = null;

    public static instance: ManagerScene03;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        ManagerScene03.instance = this;

    }

    // appearGlyh1(){
    //     let glyph1 = cc.instantiate(this.glyph1);
    //     glyph1.parent = this.node.parent;
    //     glyph1.setPosition(3208,-237);
    //     this.scheduleOnce(function(){
    //         glyph1.opacity = 100;
    //     },0.5);
    //     this.scheduleOnce(function(){
    //         glyph1.opacity = 150;
    //     },0.5);
    //     this.scheduleOnce(function(){
    //         glyph1.opacity = 255;
    //     },0.5);
    // }

    // appearGlyh2(){
    //     let glyph2 = cc.instantiate(this.glyph2);
    //     glyph2.parent = this.node.parent;
    //     glyph2.setPosition(3615,-237);
    //     this.scheduleOnce(function(){
    //         glyph2.opacity = 100;
    //     },0.5);
    //     this.scheduleOnce(function(){
    //         glyph2.opacity = 150;
    //     },0.5);
    //     this.scheduleOnce(function(){
    //         glyph2.opacity = 255;
    //     },0.5);
    // }

    // appearGlyh3(){
    //     let glyph3 = cc.instantiate(this.glyph3);
    //     glyph3.parent = this.node.parent;
    //     glyph3.setPosition(4013,-237);
    //     this.scheduleOnce(function(){
    //         glyph3.opacity = 100;
    //     },0.5);
    //     this.scheduleOnce(function(){
    //         glyph3.opacity = 150;
    //     },0.5);
    //     this.scheduleOnce(function(){
    //         glyph3.opacity = 255;
    //     },0.5);
    // }

    // appearStone(){
    //     let stone_pf = cc.instantiate(this.stone);
    //     // stone_pf.parent = this.node.parent;
    //     let _pos = this.node.getPosition();
    //     stone_pf.setPosition(2000,-374);
    // }

    start () {
        
    }

    // update (dt) {}
}
