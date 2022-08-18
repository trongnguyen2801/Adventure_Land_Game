import Player2 from "./Player2";
const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyGreen extends cc.Component {


    @property(cc.Animation)
    anim:cc.Animation = null;

    @property(cc.Node)
    player:cc.Node = null;

    is_death:boolean = false;

    @property(cc.Node)
    checkpoint: cc.Node = null;

    // player: Player2 = null;

    hp:number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.hp = 2;

        // this.player = cc.find('Canvas/Player2').getComponent(Player2);

        this.anim = this.getComponent(cc.Animation);
        this.anim.on('finished',this.onAnimationFinished,this);
    }

    onAnimationFinished(event, data){
        if(data.name === 'eghit'){
            if(this.hp == 0 || this.hp < 0){
                this.is_death = true;
                this.node.destroy();
            }
        }
    };

    onCollisionEnter(other, self){
        if(other.node.group === 'player' && other.tag === 5){
            this.hp--;
            this.anim.play('eghit');
        }

        if(other.node.group === 'thunder' && other.tag === 35){
            this.hp = 0;
            this.anim.play('eghit');
            console.log('dieb');
        }

        if(other.node.group === 'thunder' && other.tag === 30){
            this.hp = 0;
            this.anim.play('eghit');
            console.log('die');
        }
    }

    attack(is_attack){

        if(is_attack){
            this.node.active = true;
            this.checkpoint.destroy();
        }

        this.schedule(function(){
            this.anim.play('ob_greean');
            let pos = this.player.getPosition();
            console.log(pos.x,pos.y);
            let nodePos = this.node.getPosition();

            if(nodePos.x < pos.x){
                this.node.scaleX = -0.15;
                cc.tween(this.node)
                .to(2,{position: new cc.Vec3(pos.x,-387,0)})
                .start();
                console.log("1",pos.x,pos.y);
            }
            else{
                this.node.scaleX = 0.15; 
                cc.tween(this.node) 
                .to(2,{position: new cc.Vec3(pos.x,-387,0)}) 
                .start();
                console.log("2",pos.x,pos.y);
            }
        },1);
    }




    // start () {

    // }

    // update (dt) {
    //     do{
    //         let pos = this.player.getPosition();
    //         cc.tween(this.node)
    //         .to(4,{position: new cc.Vec3(pos.x, pos.y,0)},{easing:'quartOut'})
    //         .start();
    //     }while(this.is_death == true);
    // }

}
