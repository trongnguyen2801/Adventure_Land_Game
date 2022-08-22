
const {ccclass, property} = cc._decorator;

@ccclass
export default class Novus extends cc.Component {

    @property(cc.Animation)
    anim: cc.Animation = null;


    @property(cc.Prefab)
    airArrow: cc.Prefab = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.anim = this.getComponent(cc.Animation);
    }

    start () {

    }

    attackLeft(check){
        if(check){
            this.anim.play('novusattack');
            this.scheduleOnce(function(){
                let airA_prefab = cc.instantiate(this.airArrow);
                airA_prefab.parent = this.node.parent;
                let pos = this.node.getPosition();
                airA_prefab.scaleX = 0.5;
                airA_prefab.scaleY = 0.4;
                airA_prefab.setPosition(pos);
                pos.x -= 300;
                cc.tween(airA_prefab)
                .to(1,{position: new cc.Vec3(pos.x,pos.y,0)},{easing:'quartOut'})
                .start();
            },0.5);
            this.anim.play('novusidle');
        }
    }

    attackRight(check){
        if(!check){
            this.node.scaleX = -0.5;
            this.anim.play('novusattack');
            this.scheduleOnce(function(){
                let airA_prefab = cc.instantiate(this.airArrow);
                let scale = airA_prefab.scaleX;
                airA_prefab.parent = this.node.parent;
                let pos = this.node.getPosition();
                airA_prefab.scaleX = -0.5;
                airA_prefab.scaleY = 0.4;
                airA_prefab.setPosition(pos);
                pos.x += 300;
                cc.tween(airA_prefab)
                .to(1,{position: new cc.Vec3(pos.x,pos.y,0)},{easing:'quartOut'})
                .start();
            },0.5)
            this.anim.play('novusidle');
        }
    }

    // update (dt) {}
}
