
const {ccclass, property} = cc._decorator;

@ccclass
export default class ThunderBlue extends cc.Component {
    @property(cc.Animation)
    anim:cc.Animation = null;

    on_the_ground: boolean;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.anim = this.getComponent(cc.Animation);
    }

    start () {

    }

    onBeginContact(contact, selfCollider, otherCollider){
        if(selfCollider.tag === 2){
            this.on_the_ground = true;
            if(this.on_the_ground){
                this.anim.play('thunderblue');
                this.scheduleOnce(function() {
                    this.node.destroy();
                },0.75)
                this.on_the_ground = false;
            }
        }
        // this.node.destroy();
    }

    // update (dt) {}
}
