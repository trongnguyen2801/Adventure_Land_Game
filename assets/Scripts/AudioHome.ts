
const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioSource extends cc.Component {

    @property(cc.Node)
    play_stopSound:cc.Node = null;

    @property(cc.AudioSource)
    BG: cc.AudioSource = null;

    @property(cc.SpriteFrame)
    onSound:cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    offSound:cc.SpriteFrame = null;

    public static instance: AudioSource;

    onLoad () {
        AudioSource.instance = this;

        // this.play();
    }

    play(){
        this.BG.play();
        this.play_stopSound.getComponent(cc.Sprite).spriteFrame = this.onSound;
    }

    stop(){
        this.BG.pause();
        this.play_stopSound.getComponent(cc.Sprite).spriteFrame = this.offSound;
    }

    clickAudio(){
        if(this.BG.isPlaying){
            this.stop();
        }
        else{
            this.play();
        }
    }

    start () {

    }

    // update (dt) {}
}
