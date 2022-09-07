
const {ccclass, property} = cc._decorator;

export enum Anim{
    ATTACKGAUNTLET = 'Attack Gauntlet',
    ATTACKSKILL = 'Attack Skill',
    ATTACKSLASH = 'Attack Slash',
    ATTACKTHRUST = 'Attack Thrust',
    HIT = 'Damage',
    IDLE = 'Idle',
    NONE = 0,
    ATTACK = 1,
}

@ccclass
export default class Tiamat extends cc.Component {


    hp:number = null;
    count:number = null;

    @property(dragonBones.ArmatureDisplay)
    armatureDisplay: dragonBones.ArmatureDisplay = null;

    @property(cc.Prefab)
    tiamatU:cc.Prefab = null;
    spellState: number = null;

    public static intance: Tiamat;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Tiamat.intance = this;
        this.spellState = Anim.NONE;
        this.hp = 10;
        this.count = 0;
        this.armatureDisplay.playAnimation(Anim.IDLE,50);
    }

    start(){

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

    attackGauntlet(check){
        if(check){
            if(this.node.scaleX < 0){
                this.node.scaleX = 0.3;
            }
            this.scheduleOnce(function(){
                this.node.getComponent(cc.BoxCollider).size.width = 437;
                this.node.getComponent(cc.BoxCollider).size.height = 77;
                this.node.getComponent(cc.BoxCollider).offset.x = -885;
                this.node.getComponent(cc.BoxCollider).offset.y = 168;
                this.node.getComponent(cc.BoxCollider).tag = 12;
                this.armatureDisplay.playAnimation(Anim.ATTACKGAUNTLET,1);
            },0.85);


            this.scheduleOnce(function(){
                this.node.getComponent(cc.BoxCollider).size.width = 621;
                this.node.getComponent(cc.BoxCollider).size.height = 682;
                this.node.getComponent(cc.BoxCollider).offset.x = 58;
                this.node.getComponent(cc.BoxCollider).offset.y = 318;
                this.node.getComponent(cc.BoxCollider).tag = 0;
            },1.5);

            this.scheduleOnce(function(){
                this.armatureDisplay.playAnimation(Anim.IDLE,50);
            },2);
        }
    }

    attackSlash(check){
        if(check){
            if(this.node.scaleX < 0){
                this.node.scaleX = 0.3;
            }
            this.scheduleOnce(function(){
                this.node.getComponent(cc.BoxCollider).size.width = 343;
                this.node.getComponent(cc.BoxCollider).size.height = 305;
                this.node.getComponent(cc.BoxCollider).offset.x = -500;
                this.node.getComponent(cc.BoxCollider).offset.y = 165;
                this.node.getComponent(cc.BoxCollider).tag = 12;
                this.armatureDisplay.playAnimation(Anim.ATTACKSLASH,1);
            },0.5);


            this.scheduleOnce(function(){
                this.node.getComponent(cc.BoxCollider).size.width = 621;
                this.node.getComponent(cc.BoxCollider).size.height = 682;
                this.node.getComponent(cc.BoxCollider).offset.x = 58;
                this.node.getComponent(cc.BoxCollider).offset.y = 318;
                this.node.getComponent(cc.BoxCollider).tag = 0;
            },1.5);

            this.scheduleOnce(function(){
                this.armatureDisplay.playAnimation(Anim.IDLE,50);
            },2);
        }
    }

    spellSkill(check){

            if(this.node.scaleX < 0){
                this.node.scaleX = 0.3;
            }

            this.armatureDisplay.playAnimation(Anim.ATTACKSKILL,1.25);

            let tiamatU_prefab = cc.instantiate(this.tiamatU);
            let tiamatU_prefab1 = cc.instantiate(this.tiamatU);
            let tiamatU_prefab2 = cc.instantiate(this.tiamatU);

            tiamatU_prefab.parent = tiamatU_prefab1.parent = tiamatU_prefab2.parent = this.node.parent;
            let pos = this.node.getPosition();
            tiamatU_prefab.setPosition(pos.x-300,pos.y);
            tiamatU_prefab1.setPosition(pos.x,pos.y);
            tiamatU_prefab2.setPosition(pos.x+300,pos.y);


            this.scheduleOnce(function(){
                this.armatureDisplay.playAnimation(Anim.IDLE,50);
            },1.5);


            this.scheduleOnce(function(){
                let _pos = this.node.getPosition();
                cc.tween(this.node)
                .to(2,{position: new cc.Vec3(_pos.x, _pos.y + 500, 0)})
                .start();
            },1.5);

            this.scheduleOnce(function(){
                let _pos = this.node.getPosition();
                cc.tween(this.node)
                .to(2,{position: new cc.Vec3(_pos.x, _pos.y - 500, 0)})
                .start();
            },10);

    }

    update (dt) {
        if(this.spellState == Anim.NONE){
            if(this.hp === 6){
                this.spellSkill(true);
                this.spellState = Anim.ATTACK;
            }
        }

        if(this.hp < 0 || this.hp == 0){
            this.node.destroy();
        }
    }
}
