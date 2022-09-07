
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(dragonBones.ArmatureDisplay)
    armatureDisplay: dragonBones.ArmatureDisplay = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.armatureDisplay.playAnimation('Attack A',20);
    }

    start () {

    }

    // update (dt) {}
}
