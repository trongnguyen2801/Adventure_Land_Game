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

    @property(cc.Node)
    checkpoint:cc.Node = null;

    @property(cc.Node)
    warning: cc.Node = null;

    @property(cc.Node)
    checkpointAirBlade:cc.Node = null;

    hp:number = null;

    charState: number = StateChar.NONE;


    // LIFE-CYCLE CALLBACKS:

    onLoad () { 
        this.anim = this.getComponent(cc.Animation);
        this.hp = 10;
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
            airblade_prefab.setPosition(_pos);


            this.scheduleOnce(function(){
                cc.tween(airblade_prefab)
                .to(0.5,{position: new cc.Vec3 (_pos.x-500 ,_pos.y-50,0)}, {easing:'quartOut'})
                .start();
            },0.5)
        }
    }

    appearAnubis(check){
        if(check){      
            if(this.charState  === StateChar.NONE){
                this.charState = StateChar.APPEAR;
                this.warning.active = true;
                this.checkpointAirBlade.getComponent(cc.BoxCollider).size.width = 40;
                this.checkpointAirBlade.getComponent(cc.BoxCollider).size.height = 100;
    
                this.scheduleOnce(function(){
                    this.warning.destroy();
                    let pos = this.node.getPosition();
                    let carpet_prefab = cc.instantiate(this.carpetfire);
                    carpet_prefab.parent = this.node.parent;
                    carpet_prefab.opacity = 200;
                    carpet_prefab.setPosition(pos);
        
                    this.scheduleOnce(function(){
                        this.node.active = true;
                        this.anim.play(AnimationState.APPEAR);
                    },0.15);
        
                    this.scheduleOnce(function(){
                        carpet_prefab.destroy();
                        this.checkpoint.destroy();
                    },0.75);
                },2);
            }
        }
    }

    // update (dt) {}
}
