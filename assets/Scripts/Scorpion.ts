
const {ccclass, property} = cc._decorator;

export enum Anim{
    ATTACK = 'Attack A',
    IDLE = 'Idle',
    HIT = 'Damage',
}



@ccclass
export default class Scorpion extends cc.Component {

    hp:number = null;

    @property(dragonBones.ArmatureDisplay)
    armatureDisplay: dragonBones.ArmatureDisplay = null;

    public static intance: Scorpion;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Scorpion.intance = this;
        this.hp = 5;
        this.armatureDisplay = this.getComponent(dragonBones.ArmatureDisplay);
    }

    start () {
        this.armatureDisplay.playAnimation(Anim.IDLE,50);
    }

    
    onAnimationFinished(event, data){
        if(data.name === Anim.HIT){
            if(this.hp == 0 || this.hp < 0){
                this.node.destroy();
            }
        }
    }

    onCollisionEnter(other, self){
        if(other.node.group === 'player' && other.tag === 5){
            this.hp--;
            this.armatureDisplay.playAnimation(Anim.HIT,1);
        }

        if(other.node.group === 'thunder' && other.tag === 35){
            this.hp -= 2;
            this.armatureDisplay.playAnimation(Anim.HIT,1);
        }

        if(other.node.group === 'thunder' && other.tag === 30){
            this.hp -= 2;
            this.armatureDisplay.playAnimation(Anim.HIT,1);
        }
    }

    attackLeft(check){
        if(check){
            if(this.node.scaleX < 0){
                this.node.scaleX = 1;
            }

            this.node.getComponent(cc.BoxCollider).tag = 8;
            this.node.getComponent(cc.BoxCollider).size.width = 310;
            this.node.getComponent(cc.BoxCollider).size.height = 215;
            this.node.getComponent(cc.BoxCollider).offset.x = -62.8;
            this.armatureDisplay.playAnimation(Anim.ATTACK,1);

            
            this.scheduleOnce(function(){
                this.node.getComponent(cc.BoxCollider).size.width = 230;
                this.node.getComponent(cc.BoxCollider).size.height = 215;
                this.node.getComponent(cc.BoxCollider).offset.x = -22.8;
                this.node.getComponent(cc.BoxCollider).tag = 0;
            },1.2)
    
            this.scheduleOnce(function(){
                this.armatureDisplay.playAnimation(Anim.IDLE,50);
            },1.5);
        }

    }

    attackRight(check){
        if(check){
            this.node.scaleX = -1;
            this.node.getComponent(cc.BoxCollider).tag = 8;
            this.node.getComponent(cc.BoxCollider).size.width = 310;
            this.node.getComponent(cc.BoxCollider).size.height = 215;
            this.node.getComponent(cc.BoxCollider).offset.x = -62.8;
            this.armatureDisplay.playAnimation(Anim.ATTACK,1);

            
            this.scheduleOnce(function(){
                this.node.getComponent(cc.BoxCollider).size.width = 230;
                this.node.getComponent(cc.BoxCollider).size.height = 215;
                this.node.getComponent(cc.BoxCollider).offset.x = -22.8;
                this.node.getComponent(cc.BoxCollider).tag = 0;
            },1.2)
        }

        this.scheduleOnce(function(){
            this.armatureDisplay.playAnimation(Anim.IDLE,50);
        },1.5);
    }

    update (dt) {
        if(this.hp < 0 || this.hp ==0){
            this.node.destroy();
        }
    }
}
