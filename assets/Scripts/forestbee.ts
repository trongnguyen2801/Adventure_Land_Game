
const {ccclass, property} = cc._decorator;

@ccclass
export default class ForestBee extends cc.Component {

    @property(dragonBones.ArmatureDisplay)
    armatureDisplay: dragonBones.ArmatureDisplay = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.armatureDisplay = this.getComponent(dragonBones.ArmatureDisplay);
    }

    start () {
        this.armatureDisplay.playAnimation('Idle',5);
    }

    // update (dt) {}
}
