
const {ccclass, property} = cc._decorator;

@ccclass
export default class Fish extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    onLoad () {}

    start () {
        this.move();
    }
    
    move(){
        let pos = this.node.getPosition();
        this.schedule(function(){
            cc.tween(this.node)
            .to(0.1,{scaleX: 0.25})
            .to(5,{position: new cc.Vec3(pos.x - 400,pos.y,0)})
            .to(0.1,{scaleX: -0.25})
            .to(5,{position: new cc.Vec3(pos.x + 400,pos.y,0)})
            .start();
            if(this.checkStop){
                cc.tween(this.node).stop();
            }
        },10,100,0.1);
    }

    // update (dt) {}
}
