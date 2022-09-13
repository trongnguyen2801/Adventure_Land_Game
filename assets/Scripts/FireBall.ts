
const {ccclass, property} = cc._decorator;

@ccclass
export default class FireBall extends cc.Component {

    @property(cc.Animation)
    anim:cc.Animation = null;
    on_the_ground: boolean;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.anim = this.getComponent(cc.Animation);
        this.anim.play('fireat');
        this.scheduleOnce(function() {
            this.node.destroy();
        },1)
    }

    onCollisionEnter(other, self){
        if(other.node.group === 'player' && other.tag === 50){
            this.node.destroy();
        }
    }

    start () {

    }

    // update (dt) {}
}
