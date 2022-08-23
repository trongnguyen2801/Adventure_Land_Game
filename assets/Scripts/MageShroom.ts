
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
        this.anim.play('mageshroomidle');
    }

    start () {

    }

    attackLeft(check){
        if(check){
            if(this.node.scaleX < 0){
                this.node.scaleX = 0.6;
            }
            this.anim.play('mageshroomattack');
            this.scheduleOnce(function(){
                let blurefire_prefab = cc.instantiate(this.bluefire);
                blurefire_prefab.parent = this.node.parent;
                let pos = this.node.getPosition();
                blurefire_prefab.setPosition(pos);
                pos.x -= 300;
                cc.tween(blurefire_prefab)
                .to(1,{position: new cc.Vec3(pos.x,pos.y,100)},{easing:'quartOut'})
                .start();
            },0.5);

            this.scheduleOnce(function(){
                this.anim.play('mageshroomidle');
            },0.5);
        }
    }

    attackRight(check){
        if(check){
            this.node.scaleX = -0.6;
            this.anim.play('mageshroomattack');
            this.scheduleOnce(function(){
                let blurefire_prefab = cc.instantiate(this.bluefire);
                blurefire_prefab.scaleX = -1;
                blurefire_prefab.parent = this.node.parent;
                let pos = this.node.getPosition();
                blurefire_prefab.setPosition(pos);
                pos.x += 300;
                cc.tween(blurefire_prefab)
                .to(1,{position: new cc.Vec3(pos.x,pos.y,100)},{easing:'quartOut'})
                .start();
            },0.5);

            this.scheduleOnce(function(){
                this.anim.play('mageshroomidle');
            },0.5);
        }
    }

    // update (dt) {}
}
