
const {ccclass, property} = cc._decorator;

@ccclass
export default class Ship extends cc.Component {

    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }

    
    onCollisionEnter(other, self){
        if(other.node.group === 'player'){
            cc.tween(this.node)
            .to(4,{position: new cc.Vec3(4769,-536,0)})
            .start();
        }
    }

    start () {

    }

    // update (dt) {}
}
