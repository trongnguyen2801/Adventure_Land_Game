
const {ccclass, property} = cc._decorator;

@ccclass
export default class Ship extends cc.Component {

    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }
    
    onCollisionEnter(other, self){
        if(other.node.group === 'player'){
            cc.tween(this.node)
            .to(10,{position: new cc.Vec3(5600,60,0)})
            .start();
        }
    }

    start () {

    }

    // update (dt) {}
}
