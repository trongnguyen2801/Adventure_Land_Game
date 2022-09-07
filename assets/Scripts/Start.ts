import GameManager from "./GameManager";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Start extends cc.Component {

    // LIFE-CYCLE CALLBACKS:


    onLoad () {

    }

    clickStart(){
        this.node.on('touchstart',function(){
            GameManager.instance.LoadLevel(GameManager.instance.reachLevel);
        });
    }


    start () {

    }

    // update (dt) {}
}
