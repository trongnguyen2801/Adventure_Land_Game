import AudioSource from "./AudioHome";
const {ccclass, property} = cc._decorator;

@ccclass
export default class SoundClick extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        AudioSource.instance.play();
    }

    click(){
        AudioSource.instance.clickAudio();
    }

    start () {

    }

    // update (dt) {}
}
