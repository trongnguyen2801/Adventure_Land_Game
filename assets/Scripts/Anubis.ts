import { CheckpointTag } from "./Player2";

const {ccclass, property} = cc._decorator;

export enum AnimationState{
    APPEAR = 'anubisappear',
    ATTACK = 'anubisattack',
    IDLE = 'anubisidle',
    HIT = 'anubishit',
}

export enum StateChar{
    APPEAR = 1,
    NONE = 0,
}

@ccclass
export default class Anubis extends cc.Component {

    @property(cc.Animation)
    anim:cc.Animation = null;

    @property(cc.Prefab)
    carpetfire:cc.Prefab = null;

    @property(cc.Prefab)
    airBlade:cc.Prefab = null;

    hp:number = null;

    charState: number = StateChar.NONE;

    public static intance: Anubis; 


    // LIFE-CYCLE CALLBACKS:

    onLoad () { 
        this.anim = this.getComponent(cc.Animation);
        this.hp = 10;
        Anubis.intance = this;
    }

    onAnimationFinished(event, data){
        if(data.name === AnimationState.HIT){
            if(this.hp == 0 || this.hp < 0){
                this.node.destroy();
            }
        }
    }

    start () {

    }

    onCollisionEnter(other, self){
        if(other.node.group === 'player' && other.tag === 5){
            this.hp--;
            this.anim.play(AnimationState.HIT);
        }

        if(other.node.group === 'thunder' && other.tag === 35){
            this.hp -= 2;
            this.anim.play(AnimationState.HIT);
        }

        if(other.node.group === 'thunder' && other.tag === 30){
            this.hp -= 2;
            this.anim.play(AnimationState.HIT);
        }
    }

    attackAirBlade(check){
        this.anim.play(AnimationState.ATTACK);
        if(check){
            let airblade_prefab = cc.instantiate(this.airBlade);
            // airblade_prefab.setScale(0.5,0.5);
            airblade_prefab.parent = this.node.parent;
            let _pos = this.node.getPosition();
            airblade_prefab.setPosition(_pos.x-70,_pos.y);


            this.scheduleOnce(function(){
                cc.tween(airblade_prefab)
                .to(0.5,{position: new cc.Vec3 (_pos.x-500 ,_pos.y-50,0)}, {easing:'quartOut'})
                .start();
            },0.5);
            this.scheduleOnce(function (){
                airblade_prefab.destroy();
            },1);
        }
    }

    appearAnubis(check){
        if(check){      

            if(this.charState  === StateChar.NONE){

                this.charState = StateChar.APPEAR;
                let warning = this.node.getChildByName("warning");
                let pos = this.node.getPosition();
                warning.parent = this.node.parent;
                warning.setPosition(pos.x-200,pos.y);
                warning.active = true;
                let checkpoint = this.node.getChildByName("checkpointAirBlade");

    
                this.scheduleOnce(function(){
                    warning.destroy();
                },2.5);
                this.scheduleOnce(function(){
                    this.scheduleOnce(function(){
                        this.node.opacity = 100;
                    },0.5);
                    this.scheduleOnce(function(){
                        this.node.opacity = 150;
                    },0.6);
                    this.scheduleOnce(function(){
                        this.node.opacity = 255;
                    },0.7);

                    this.anim.play(AnimationState.APPEAR);
                    let pos = this.node.getPosition();
                    let carpet_prefab = cc.instantiate(this.carpetfire);
                    carpet_prefab.parent = this.node.parent;
                    carpet_prefab.opacity = 200;
                    carpet_prefab.setPosition(pos);
        
        
                    this.scheduleOnce(function(){
                        carpet_prefab.destroy();
                        checkpoint.active = true;
                        checkpoint.getComponent(cc.BoxCollider).size.height = 100;
                        checkpoint.getComponent(cc.BoxCollider).size.width = 40;
                    },2);
                },2.5);
            }
        }
    }

    // update (dt) {}
}
