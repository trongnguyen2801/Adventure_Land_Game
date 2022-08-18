
const {ccclass, property} = cc._decorator;

@ccclass
export default class TextLable extends cc.Component {

    @property(cc.Label)
    label:cc.Label = null;

    @property
    text:string = '';

    @property(cc.Node)
    labeltext:cc.Node = null;

    @property({
        tooltip:"tesstttt",
    })
    duration:number = 100;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }

    protected start(): void {
        // let strlen = this.text.length;
        let sep = /\s/;
        let content = this.text.split(sep);
        let curStr = "";
        let self = this;
        
        for(let i = 0; i < content.length; i++) {
            setTimeout(() => {
                if(i % 10 == 0){
                    curStr += '\n';
                }
                curStr += ' ' + content[i];
                self.label.string = curStr;

            },self.duration*(i));
        }
        this.scheduleOnce(function(){
            this.labeltext.active = true;
        },1.3)
    }

    // start () {
    //     let arrText :Array<any> = this.textLable.split('');
    //     this.arr = arrText;
    //     let len:number = arrText.length;
    //     this.length = len;
    //     this.node.getChildByName("TextLable").getComponent(cc.Label).string = "";
    //     this.schedule(this.callback,0.2,length-1,0.2);
    // }

    // callback(){
    //     this.node.getChildByName("TextLable").getComponent(cc.Label).string = this.arr[this.step];
    //     this.step++;
    //     if(this.step == this.length){
    //         this.unschedule(this.callback);
    //     }
    // }

    // clickBtn(){
    //     this.unschedule(this.callback);
    //     this.node.getChildByName("TextLable").getComponent(cc.Label).string = this.textLable;
    //     this.step = 0;
    // }
    // update (dt) {}
}
