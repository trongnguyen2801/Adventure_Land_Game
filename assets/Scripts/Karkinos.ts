import { AttackState } from "./Player2";

const {ccclass, property} = cc._decorator;

export enum Anim{
    ATTACKA = 'Attack A',
    ATTACKB = 'Attack B',
    ATTACKC = 'Attack C',
    ATTACKD = 'Attack D',
    ATTACKE = 'Attack E',
    IDLE = 'Idle',
    HIT = 'Damage',
}

@ccclass
export default class Karkinos extends cc.Component {

    hp:number = null;

    checkStop: boolean = false

    @property(dragonBones.ArmatureDisplay)
    armatureDisplay: dragonBones.ArmatureDisplay = null;



    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.hp = 2;
        this.armatureDisplay = this.getComponent(dragonBones.ArmatureDisplay);

    }

    start () {
        this.armatureDisplay.playAnimation(Anim.IDLE,50);

        this.move();

    }



    move(){
        let pos = this.node.getPosition();
        this.schedule(function(){
            cc.tween(this.node)
            .to(0.1,{scaleX: 0.25})
            .to(5,{position: new cc.Vec3(pos.x - 300,pos.y,0)})
            .to(0.1,{scaleX: -0.25})
            .to(5,{position: new cc.Vec3(pos.x + 300,pos.y,0)})
            .start();
            if(this.checkStop){
                cc.tween(this.node).stop();
            }
        },10,30,0.1);
    }

    onAnimationFinished(event, data){
        if(data.name === Anim.HIT){
            if(this.hp == 0 || this.hp < 0){
                this.node.destroy();
            }
        }
    }

    onCollisionEnter(other, self){
        if(other.node.group === 'player' && other.tag === 5 && self.tag === 0){
            this.hp--;
            this.armatureDisplay.playAnimation(Anim.HIT,1);
        }

        if(other.node.group === 'thunder' && other.tag === 35 && self.tag === 0){
            this.hp -= 2;
            this.armatureDisplay.playAnimation(Anim.HIT,1);
        }

        if(other.node.group === 'thunder' && other.tag === 30 && self.tag === 0){
            this.hp -= 2;
            this.armatureDisplay.playAnimation(Anim.HIT,1);
        }
    }

    attackA(check){
        if(check){
            if(this.node.scaleX < 0){
                this.node.scaleX = -0.25;
                this.node.scaleY = 0.25;
            }

            this.node.getComponent(cc.BoxCollider).tag = 9;
            this.node.getComponent(cc.BoxCollider).offset.x = -99;
            this.node.getComponent(cc.BoxCollider).offset.y = 252;
            this.node.getComponent(cc.BoxCollider).size.width = 865;
            this.node.getComponent(cc.BoxCollider).size.height = 404;

            this.armatureDisplay.playAnimation(Anim.ATTACKA,1);

            this.scheduleOnce(function(){
                this.node.getComponent(cc.BoxCollider).tag = 0;
                this.node.getComponent(cc.BoxCollider).size.width = 0;
                this.node.getComponent(cc.BoxCollider).size.height = 0;
                this.node.getComponent(cc.BoxCollider).offset.x = 0;
                this.node.getComponent(cc.BoxCollider).offset.y = 0;

            },1)

            this.scheduleOnce(function(){
                this.armatureDisplay.playAnimation(Anim.IDLE,50);
            },1)
        }
    }

    attackB(check){
        if(check){
            this.checkStop = true;
            if(this.node.scaleX < 0){
                this.node.scaleX = -0.25;
                this.node.scaleY = 0.25;
            }

            this.node.getComponent(cc.BoxCollider).tag = 9;
            this.node.getComponent(cc.BoxCollider).offset.x = -155;
            this.node.getComponent(cc.BoxCollider).offset.y = 252;
            this.node.getComponent(cc.BoxCollider).size.width = 975;
            this.node.getComponent(cc.BoxCollider).size.height = 404;


            this.armatureDisplay.playAnimation(Anim.ATTACKB,1);

            this.scheduleOnce(function(){
                this.node.getComponent(cc.BoxCollider).tag = 0;
                this.node.getComponent(cc.BoxCollider).size.width = 0;
                this.node.getComponent(cc.BoxCollider).size.height = 0;
                this.node.getComponent(cc.BoxCollider).offset.x = -0;
                this.node.getComponent(cc.BoxCollider).offset.y = 0;

            },1)

            this.scheduleOnce(function(){
                this.armatureDisplay.playAnimation(Anim.IDLE,50);
            },1)
        }
    }

    attackC(check){
        if(check){

            if(this.node.scaleX < 0){
                this.node.scaleX = -0.25;
                this.node.scaleY = 0.25;
            }

            this.node.getComponent(cc.BoxCollider).tag = 9;
            this.node.getComponent(cc.BoxCollider).offset.x = -99;
            this.node.getComponent(cc.BoxCollider).offset.y = 252;
            this.node.getComponent(cc.BoxCollider).size.width = 865;
            this.node.getComponent(cc.BoxCollider).size.height = 404;


            this.armatureDisplay.playAnimation(Anim.ATTACKC,1);

            this.scheduleOnce(function(){
                this.node.getComponent(cc.BoxCollider).tag = 0;
                this.node.getComponent(cc.BoxCollider).size.width = 0;
                this.node.getComponent(cc.BoxCollider).size.height = 0;
                this.node.getComponent(cc.BoxCollider).offset.x = -0;
                this.node.getComponent(cc.BoxCollider).offset.y = 0;  

            },1)

            this.scheduleOnce(function(){
                this.armatureDisplay.playAnimation(Anim.IDLE,50);
            },1)
        }
    }

    attackD(check){
        if(check){
            this.checkStop = true;
            if(this.node.scaleX < 0){
                this.node.scaleX = -0.25;
                this.node.scaleY = 0.25;
            }

            this.node.getComponent(cc.BoxCollider).tag = 9;
            this.node.getComponent(cc.BoxCollider).offset.x = -200;
            this.node.getComponent(cc.BoxCollider).offset.y = 252;
            this.node.getComponent(cc.BoxCollider).size.width = 1410;
            this.node.getComponent(cc.BoxCollider).size.height = 404;


            this.armatureDisplay.playAnimation(Anim.ATTACKD,1.5);

            this.scheduleOnce(function(){
                this.node.getComponent(cc.BoxCollider).tag = 0;
                this.node.getComponent(cc.BoxCollider).size.width = 0;
                this.node.getComponent(cc.BoxCollider).size.height = 0;
                this.node.getComponent(cc.BoxCollider).offset.x = -0;
                this.node.getComponent(cc.BoxCollider).offset.y = 0;

            },1)

            this.scheduleOnce(function(){
                this.armatureDisplay.playAnimation(Anim.IDLE,50);
            },1)
        }
    }

    attackE(check){
        if(check){

            if(this.node.scaleX < 0){
                this.node.scaleX = -0.25;
                this.node.scaleY = 0.25;
            }

            this.node.getComponent(cc.BoxCollider).tag = 9;
            this.node.getComponent(cc.BoxCollider).offset.x = -155;
            this.node.getComponent(cc.BoxCollider).offset.y = 252;
            this.node.getComponent(cc.BoxCollider).size.width = 975;
            this.node.getComponent(cc.BoxCollider).size.height = 404;

            this.armatureDisplay.playAnimation(Anim.ATTACKE,1);

            this.scheduleOnce(function(){
                this.node.getComponent(cc.BoxCollider).tag = 0;
                this.node.getComponent(cc.BoxCollider).size.width = 0;
                this.node.getComponent(cc.BoxCollider).size.height = 0;
                this.node.getComponent(cc.BoxCollider).offset.x = -0;
                this.node.getComponent(cc.BoxCollider).offset.y = 0;

            },1)

            this.scheduleOnce(function(){
                this.armatureDisplay.playAnimation(Anim.IDLE,50);
            },1)
        }
    }

    protected update(dt: number): void {
        if(this.hp == 0 || this.hp < 0){
            this.node.destroy();
        }
    }
}