
const {ccclass, property} = cc._decorator;

@ccclass
export default class Arrow extends cc.Component {

    @property(cc.Animation)
    anim:cc.Animation = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.anim = this.getComponent(cc.Animation);
        this.anim.play('arrowat');
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
