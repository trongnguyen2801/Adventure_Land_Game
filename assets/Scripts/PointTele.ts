import GameManager from "./GameManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class PointTele extends cc.Component {

    @property(cc.Animation)
    anim:cc.Animation = null;

    public static instance: PointTele;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.anim = this.node.getComponent(cc.Animation);
        PointTele.instance = this;
    }

    start () {

    }

    onCollisionEnter(self, other){
        if(other.node.group === 'player'){
            console.log("checkkkkk");
            this.anim.play('teleportPoint');
        }
    }

    telePlay(){
        this.anim.play('teleportPoint');
    }

    levelUp(){
        GameManager.instance.nextLevel();
    }

    appearPointTele(){
        this.node.active = true;
    }

    // update (dt) {}
}
