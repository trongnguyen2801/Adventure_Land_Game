
const {ccclass, property} = cc._decorator;

@ccclass
export default class Novus extends cc.Component {

    @property(cc.Animation)
    anim: cc.Animation = null;


    @property(cc.Prefab)
    iceArrow: cc.Prefab = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.anim = this.getComponent(cc.Animation);
        this.anim.play('novusidle');
    }

    start () {

    }

    attackLeft(check){
        if(check){
            if(this.node.scaleX < 0){
                this.node.scaleX = 0.5;
            }
            this.anim.play('novusattack');
            this.scheduleOnce(function(){
                let iceA_prefab = cc.instantiate(this.iceArrow);
                iceA_prefab.parent = this.node.parent;
                let pos = this.node.getPosition();
                iceA_prefab.scaleX = 0.5;
                iceA_prefab.scaleY = 0.4;
                iceA_prefab.setPosition(pos.x,pos.y+100);
                pos.x -= 450;
                pos.y -= 100;
                cc.tween(iceA_prefab)
                .to(1.5,{position: new cc.Vec3(pos.x,pos.y,-100)},{easing:'quartOut'})
                .start();
            },0.5);

            this.scheduleOnce(function(){
                this.anim.play('novusidle');
            },0.5);
        }
    }

    attackRight(check){
        if(!check){
            this.node.scaleX = -0.5;
            this.anim.play('novusattack');
            this.scheduleOnce(function(){
                let iceAr_prefab = cc.instantiate(this.iceArrow);
                let scale = iceAr_prefab.scaleX;
                iceAr_prefab.parent = this.node.parent;
                let pos = this.node.getPosition();
                iceAr_prefab.scaleX = -0.5;
                iceAr_prefab.scaleY = 0.4;
                iceAr_prefab.setPosition(pos.x,pos.y+100);
                pos.x += 400;
                pos.y -= 100;
                cc.tween(iceAr_prefab)
                .to(1.5,{position: new cc.Vec3(pos.x,pos.y,-100)},{easing:'quartOut'})
                .start();
            },0.5)

            this.scheduleOnce(function(){
                this.anim.play('novusidle');
            },0.5);
        }
    }

    // update (dt) {}
}
