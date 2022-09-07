import AudioSource from "./AudioHome";
const {ccclass, property} = cc._decorator;

@ccclass
export default class SoundClick extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        AudioSource.intance.play();
    }

    click(){
        AudioSource.intance.clickAudio();
    }

    start () {

    }

    // update (dt) {}
}
