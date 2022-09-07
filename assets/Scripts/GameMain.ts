
const {ccclass, property} = cc._decorator;
@ccclass
export default class GameMain extends cc.Component {
    
    onLoad () {
        let physic_manager = cc.director.getPhysicsManager();
        physic_manager.enabled = true;
        physic_manager.gravity = cc.v2(0,-700); 
    }

    start () {

    }

    // update (dt) {}
}
