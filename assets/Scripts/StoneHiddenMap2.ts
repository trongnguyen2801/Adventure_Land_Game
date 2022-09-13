
const {ccclass, property} = cc._decorator;

@ccclass
export default class StoneHiddenMap2 extends cc.Component {

    public static instance: StoneHiddenMap2;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        StoneHiddenMap2.instance = this;
    }

    start () {

    }

    // update (dt) {}
}
