import Player2 from "./Player2";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Camera extends cc.Component {

    @property(cc.Node)
    player_node: cc.Node = null;

    update (dt) {

        let target_position = cc.v2(this.player_node.getPosition().x,this.player_node.getPosition().y + 150);
        let current_position = this.node.getPosition();

        current_position.lerp(target_position,0.1,current_position);
        // current_position.y = cc.misc.clampf(target_position.y,0,220);
        // current_position.x = cc.misc.clampf(target_position.x,220,0);
        this.node.setPosition(current_position);
    }
}
