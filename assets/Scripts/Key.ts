
const {ccclass, property} = cc._decorator;

@ccclass
export default class Key extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }

    onCollisionEnter(other, self){
        if(other.node.group === 'player'){
            this.node.destroy();
        }
    }

    start () {

    }

    // update (dt) {}
}
