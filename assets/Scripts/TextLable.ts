
const {ccclass, property} = cc._decorator;

@ccclass
export default class TextLable extends cc.Component {

    textLable :string  = "Chào ngươi nhà thám hiểm ngươi gặp ta có nghĩa ngươi đã tiêu diệt hết quái vật và thu thập đủ chìa khoá bây giờ ta sẽ giúp ngươi triệu hồi thuyền để đi tới hòn đảo của con quái vật thống trị vùng đất này hãy tiêu diệt nó và cứu công chúa của ngươi, chúc ngươi may mắn"

    step: number = 0;
    arr: Array<any> = new Array();
    length: number = 0;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }

    start () {
        let arrText :Array<any> = this.textLable.split('');
        this.arr = arrText;
        let len:number = arrText.length;
        this.length = len;
        this.node.getChildByName("TextLable").getComponent(cc.Label).string = "";
        this.schedule(this.callback,0.2,length-1,0.2);
    }

    callback(){
        this.node.getChildByName("TextLable").getComponent(cc.Label).string = this.arr[this.step];
        this.step++;
        if(this.step == this.length){
            this.unschedule(this.callback);
        }
    }

    clickBtn(){
        this.unschedule(this.callback);
        this.node.getChildByName("TextLable").getComponent(cc.Label).string = this.textLable;
        this.step = 0;
    }
    // update (dt) {}
}
