
const {ccclass, property} = cc._decorator;

@ccclass
export default class MageShroom extends cc.Component {

    @property(cc.Prefab)
    bluefire: cc.Prefab = null;

    @property(cc.Animation)
    anim: cc.Animation = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.anim = this.getComponent(cc.Animation);
    }

    start () {

    }

    attackLeft(check){
        if(check){
            this.anim.play('mageshroomattack');
            this.scheduleOnce(function(){
                let blurefire_prefab = cc.instantiate(this.bluefire);
                blurefire_prefab.parent = this.node.parent;
                let pos = this.node.getPosition();
                blurefire_prefab.setPosition(pos);
                pos.x -= 350;
                cc.tween(blurefire_prefab)
                .to(1,{position: new cc.Vec3(pos.x,pos.y,100)},{easing:'quartOut'})
                .start();
            },0.5);
            this.anim.play('mageshroomidle');
        }
    }

    // update (dt) {}
}
