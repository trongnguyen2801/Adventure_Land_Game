
const {ccclass, property} = cc._decorator;

export enum Anim{
    ATTACK = 'Attack',
    IDLE = 'Idle',
    IDLEWEAK = 'Idle Weak',
    SKILL = 'Skill',
    HIT = 'Damage',
}



@ccclass
export default class Poseidon extends cc.Component {

    hp:number = null;

    public static intance:Poseidon ;
    
    @property(cc.Prefab)
    dialogue: cc.Prefab = null;

    @property(cc.Prefab)
    trident:cc.Prefab = null;

    @property(dragonBones.ArmatureDisplay)
    armatureDisplay: dragonBones.ArmatureDisplay = null;

    @property(cc.Node)
    checkpoint: cc.Node = null;

    @property(cc.Node)
    checkSpell:cc.Node = null;

    @property(cc.Node)
    checkSpell2:cc.Node = null;

    @property(cc.Node)
    checkAT:cc.Node = null;

    @property(cc.Node)
    checkAT2:cc.Node = null;

    @property(cc.Prefab)
    blade:cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Poseidon.intance = this;
        this.hp = 5;
        this.armatureDisplay = this.getComponent(dragonBones.ArmatureDisplay);
    }

    start () {
        this.armatureDisplay.playAnimation(Anim.IDLE,100);
    }

    appearDialogue(check){
        if(check){

            this.armatureDisplay.playAnimation(Anim.IDLEWEAK,50);
            this.checkpoint.destroy();
            let dialogue_prefab = cc.instantiate(this.dialogue);
            dialogue_prefab.parent = this.node.parent;
            dialogue_prefab.opacity = 0;
            let _pos = this.node.getPosition();
            dialogue_prefab.setPosition(_pos.x - 230, _pos.y - 120);   

            cc.tween(dialogue_prefab)
            .to(0.5,{opacity:255})
            .to(0.5,{position:new cc.Vec3(_pos.x - 230, _pos.y-60)})
            .start();

            this.scheduleOnce(function(){
                cc.tween(dialogue_prefab)
                .to(0.5,{position:new cc.Vec3(_pos.x - 230, _pos.y-120)})
                .to(0.5,{opacity:0})
                .start();
            },4);


            this.scheduleOnce(function(){
                this.armatureDisplay.playAnimation(Anim.SKILL,1);
                let blade_prefab = cc.instantiate(this.blade);
                blade_prefab.parent = this.node.parent;
                let pos = this.node.getPosition();    
                blade_prefab.setPosition(pos.x,pos.y+250);
                dialogue_prefab.destroy();
                
                this.checkSpell.active = true;
                this.checkSpell2.active = true;
                this.checkAT.active = true;
                this.checkAT2.active = true;
                this.armatureDisplay.playAnimation(Anim.IDLEWEAK,50);
                this.node.getComponent(cc.BoxCollider).enabled = true;
                this.node.getComponent(cc.PolygonCollider).enabled = true;

            },5);
        }
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

    attackTridentL(check){
        if(check){
            if(this.node.scaleX < 0 ){
                this.node.scaleX = 1;
            }
            this.armatureDisplay.playAnimation(Anim.ATTACK,1);
            this.node.getComponent(cc.BoxCollider).tag = 11;
            this.node.getComponent(cc.BoxCollider).offset.x = -145;
            this.node.getComponent(cc.BoxCollider).offset.y = 108;
            this.node.getComponent(cc.BoxCollider).size.height = 221;

            this.scheduleOnce(function(){
                this.node.getComponent(cc.BoxCollider).tag = 0;
                this.node.getComponent(cc.BoxCollider).size.width = 145;
                this.node.getComponent(cc.BoxCollider).size.height = 221;
                this.node.getComponent(cc.BoxCollider).offset.x = -109;
                this.node.getComponent(cc.BoxCollider).offset.y = 364;

            },0.55)
        }
    }

    attackTridentR(check){
        if(check){
            this.node.scaleX = -1;
            this.armatureDisplay.playAnimation(Anim.ATTACK,1);
            this.node.getComponent(cc.BoxCollider).tag = 11;
            this.node.getComponent(cc.BoxCollider).offset.x = -145;
            this.node.getComponent(cc.BoxCollider).offset.y = 108;
            this.node.getComponent(cc.BoxCollider).size.height = 221;

            this.scheduleOnce(function(){
                this.node.getComponent(cc.BoxCollider).tag = 0;
                this.node.getComponent(cc.BoxCollider).size.width = 145;
                this.node.getComponent(cc.BoxCollider).size.height = 221;
                this.node.getComponent(cc.BoxCollider).offset.x = -109;
                this.node.getComponent(cc.BoxCollider).offset.y = 364;

            },0.55)
        }
    }

    spellAttackl(check){
        if(this.node.scaleX < 0){
            this.node.scaleX = 1;
        }

        this.armatureDisplay.playAnimation(Anim.SKILL,1);

        let trident_prefab = cc.instantiate(this.trident);
        let trident_prefab1 = cc.instantiate(this.trident);
        let trident_prefab2= cc.instantiate(this.trident);


        trident_prefab.parent = trident_prefab1.parent = trident_prefab2.parent = this.node.parent;
        

        let _pos = this.node.getPosition();
        let _posCheck = this.checkSpell.getPosition();


        trident_prefab.angle = -20;
        trident_prefab1.angle = 2;
        trident_prefab2.angle = 20;


        trident_prefab.setPosition(_pos.x - 500, _pos.y +400);
        trident_prefab1.setPosition(_pos.x - 600, _pos.y  + 400);
        trident_prefab2.setPosition(_pos.x - 700, _pos.y + 400);


        cc.tween(trident_prefab)
        .to(0.5,{position: new cc.Vec3(_pos.x -500, _pos.y + 400)})
        .to(0.25,{position: new cc.Vec3(_posCheck.x,_posCheck.y,0)},{easing:'quartOut'})
        .start();

        cc.tween(trident_prefab1)
        .to(0.5,{position: new cc.Vec3(_pos.x -600, _pos.y + 400)})
        .to(0.5,{position: new cc.Vec3(_posCheck.x,_posCheck.y,0)},{easing:'quartOut'})
        .start();

        cc.tween(trident_prefab2)
        .to(0.5,{position: new cc.Vec3(_pos.x -700, _pos.y + 400)})
        .to(0.75,{position: new cc.Vec3(_posCheck.x,_posCheck.y,0)},{easing:'quartOut'})
        .start();

        this.scheduleOnce(function(){
            trident_prefab.opacity = 150;
            trident_prefab1.opacity = 150;
            trident_prefab2.opacity = 150;
            trident_prefab.destroy();
            trident_prefab1.destroy();
            trident_prefab2.destroy();
            this.armatureDisplay.playAnimation(Anim.IDLE,10);
        },1);
    }

    spellAttackr(check){

        this.node.scaleX = -1;

        this.armatureDisplay.playAnimation(Anim.SKILL,1);

        let trident_prefab = cc.instantiate(this.trident);
        let trident_prefab1 = cc.instantiate(this.trident);
        let trident_prefab2= cc.instantiate(this.trident);


        trident_prefab.parent = trident_prefab1.parent = trident_prefab2.parent = this.node.parent;
        

        let _pos = this.node.getPosition();
        let _posCheck = this.checkSpell2.getPosition();


        trident_prefab.angle = 20;
        trident_prefab1.angle = 2;
        trident_prefab2.angle = -20;


        trident_prefab.setPosition(_pos.x + 500, _pos.y + 400);
        trident_prefab1.setPosition(_pos.x + 600, _pos.y  + 400);
        trident_prefab2.setPosition(_pos.x + 700, _pos.y + 400);


        cc.tween(trident_prefab)
        .to(0.5,{position: new cc.Vec3(_pos.x + 500, _pos.y + 400)})
        .to(0.25,{position: new cc.Vec3(_posCheck.x,_posCheck.y,0)},{easing:'quartOut'})
        .start();

        cc.tween(trident_prefab1)
        .to(0.5,{position: new cc.Vec3(_pos.x + 600, _pos.y + 400)})
        .to(0.5,{position: new cc.Vec3(_posCheck.x,_posCheck.y,0)},{easing:'quartOut'})
        .start();

        cc.tween(trident_prefab2)
        .to(0.5,{position: new cc.Vec3(_pos.x + 700, _pos.y + 400)})
        .to(0.75,{position: new cc.Vec3(_posCheck.x,_posCheck.y,0)},{easing:'quartOut'})
        .start();
        

        this.scheduleOnce(function(){
            trident_prefab.opacity = 150;
            trident_prefab1.opacity = 150;
            trident_prefab2.opacity = 150;

            trident_prefab.destroy();
            trident_prefab1.destroy();
            trident_prefab2.destroy();

            this.armatureDisplay.playAnimation(Anim.IDLE,10);
        },1);
    }
}