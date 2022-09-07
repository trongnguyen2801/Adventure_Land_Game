
const {ccclass, property} = cc._decorator;

export enum Anim{
    ATTACKCLAW = 'Claw Attack',
    ATTACKKNUCKLE = 'Knuckle Rending',
    HIT = 'Damage',
    IDLE = 'Idle',

}

@ccclass
export default class TiamatU extends cc.Component {

    combo:number = null;
    hp:number = null;

    @property(dragonBones.ArmatureDisplay)
    armatureDisplay: dragonBones.ArmatureDisplay = null;

    public static intance: TiamatU;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        TiamatU.intance = this;
        this.hp = 2;
        this.combo = 0;
        this.armatureDisplay.playAnimation(Anim.IDLE,50);
    }

    start () {
        this.schedule(function(){
            if(this.combo % 2 == 0){
                this.attackKnuckle();
            }
            else{
                this.attackClaw();
                this.combo++;
            }
        },3,50,2);
    }

    onCollisionEnter(other, self){
        if(other.node.group === 'player' && other.tag === 5 && self.tag == 0){
            this.hp--;
            this.armatureDisplay.playAnimation(Anim.HIT,1);
        }

        if(other.node.group === 'thunder' && other.tag === 35 && self.tag == 0){
            this.hp -= 2;
            this.armatureDisplay.playAnimation(Anim.HIT,1);
        }

        if(other.node.group === 'thunder' && other.tag === 30 && self.tag == 0){
            this.hp -= 2;
            this.armatureDisplay.playAnimation(Anim.HIT,1);
        }
    }


    attackClaw(){
        if(this.node.scaleX < 0){
            this.node.scaleX = 0.3;
        }
        this.scheduleOnce(function(){
            this.node.getComponent(cc.BoxCollider).size.width = 200;
            this.node.getComponent(cc.BoxCollider).size.height = 220;
            this.node.getComponent(cc.BoxCollider).offset.x = -450;
            this.node.getComponent(cc.BoxCollider).offset.y = 120;
            this.node.getComponent(cc.BoxCollider).tag = 13;
            this.armatureDisplay.playAnimation(Anim.ATTACKCLAW,1);
        },0.85);


        this.scheduleOnce(function(){
            this.node.getComponent(cc.BoxCollider).size.width = 500;
            this.node.getComponent(cc.BoxCollider).size.height = 755;
            this.node.getComponent(cc.BoxCollider).offset.x = 30;
            this.node.getComponent(cc.BoxCollider).offset.y = 400;
            this.node.getComponent(cc.BoxCollider).tag = 0;
        },1.5);

        this.scheduleOnce(function(){
            this.armatureDisplay.playAnimation(Anim.IDLE,50);
        },2);
    }

    attackKnuckle(){
        if(this.node.scaleX < 0){
            this.node.scaleX = 0.3;
        }
        this.scheduleOnce(function(){
            this.node.getComponent(cc.BoxCollider).size.width = 200;
            this.node.getComponent(cc.BoxCollider).size.height = 220;
            this.node.getComponent(cc.BoxCollider).offset.x = -450;
            this.node.getComponent(cc.BoxCollider).offset.y = 270;
            this.node.getComponent(cc.BoxCollider).tag = 13;
            this.armatureDisplay.playAnimation(Anim.ATTACKKNUCKLE,1);
        },0.25);


        this.scheduleOnce(function(){
            this.node.getComponent(cc.BoxCollider).size.width = 500;
            this.node.getComponent(cc.BoxCollider).size.height = 755;
            this.node.getComponent(cc.BoxCollider).offset.x = 30;
            this.node.getComponent(cc.BoxCollider).offset.y = 400;
            this.node.getComponent(cc.BoxCollider).tag = 0;
        },1.5);

        this.scheduleOnce(function(){
            this.armatureDisplay.playAnimation(Anim.IDLE,50);
        },1.75);
    }


    update (dt) {
        if(this.hp < 0 || this.hp == 0){
            this.node.destroy();
        }
    }
}
