import log = cc.log;

const {ccclass, property} = cc._decorator;

@ccclass
export default class ProgressBar extends cc.Component {

    num = 0;
    isShow = false;

    show() {
        this.isShow = true;
        this.node.active = true;
        cc.find("Canvas/GameManager/ProgressBar").active = true;
    }

    hide() {
        this.isShow = false;
        this.node.active = false;
        cc.find("Canvas/GameManager/ProgressBar").active = false;
    }

    update() {
        let progressBar = this.node.getComponent(cc.ProgressBar);
        progressBar.progress = this.num;
        // cc.find('Canvas/bgm').getComponent(cc.Label).string= Math.trunc(this.num*100)+'%';//更新进度条文字
    }
}