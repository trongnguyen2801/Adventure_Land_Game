
const {ccclass, property} = cc._decorator;

@ccclass
export default class Thunder extends cc.Component {
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
                this.anim.play('thunder');
                this.scheduleOnce(function() {
                    this.node.destroy();
                },1)
                this.on_the_ground = false;
            }
        }
        // this.node.destroy();
    }

    // update (dt) {}
}
