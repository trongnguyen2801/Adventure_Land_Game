
const {ccclass, property} = cc._decorator;

@ccclass
export default class SeaMermaid extends cc.Component {

    @property(cc.Node)
    checkpoint: cc.Node = null;

    @property(cc.Prefab)
    ship: cc.Prefab = null;

    @property(cc.Animation)
    anim: cc.Animation = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.anim = this.getComponent(cc.Animation);
    }

    appearMermaid(){
        this.node.active = true;
    }

    appearShip(){
        this.node.scaleX = 0.7;
        this.anim.play('seamermaid');
        this.scheduleOnce(function(){
            let ship_prefab = cc.instantiate(this.ship);
            ship_prefab.parent = this.node.parent;
            let _pos = this.node.getPosition();
            ship_prefab.setPosition(_pos.x + 350,_pos.y + 250);
        },1)
        
        this.scheduleOnce(function(){
            this.anim.play('mermaididle');
        },2)
    }

    // disappearMermaid(){
        
    // }

    start () {

    }

    // update (dt) {}
}
