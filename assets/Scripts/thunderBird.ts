
const {ccclass, property} = cc._decorator;

@ccclass
export default class ThunderBird extends cc.Component {

    @property(cc.Animation)
    anim:cc.Animation = null;
    on_the_ground: boolean;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.anim = this.getComponent(cc.Animation);
        this.anim.play('thunderbird');
        this.scheduleOnce(function() {
            this.node.destroy();
        },1)
    }

    start () {

    }

    // thunderBirdRight(){
    //     cc.tween(this.node)
    //     .to(1,{position: new cc.Vec3(100,10,10)})
    //     .start();
    // }

    // thunderBirdLeft(){
    //     cc.tween(this.node)
    //     .to(1,{position: new cc.Vec3(-100,-10,-10)})
    //     .start();
    // }
    // onBeginContact(contact, selfCollider, otherCollider){
    //     if(selfCollider.tag === 2){
    //         this.on_the_ground = true;
    //         if(this.on_the_ground){
    //             this.anim.play('thunderbird');
    //             this.scheduleOnce(function() {
    //                 this.node.destroy();
    //             },1)
    //             this.on_the_ground = false;
    //         }
    //     }
    //     // this.node.destroy();
    // }
    // // update (dt) {}
}
