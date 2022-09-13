import DragonChild from "./DragonChild";
import EnemyGreen from "./EnemyObGreen";
import DryadsArcher from "./DryadsArcher";
import SeaMermaid from "./SeaMermaid";
import Slime from "./Slime";
import Leafen from "./Leafen";
import Novus from "./Novus";
import MageShroom from "./MageShroom";
import Anubis from "./Anubis";
import Scorpion from "./Scorpion";
import Karkinos from "./Karkinos";
import Poseidon from "./Poseidon";
import Tiamat from "./Tiamatboss";
import GameManager from "./GameManager";
import Glyph from "./GlyphManager";
import GlyphMap2 from "./Glyphmap2";
import PointTele from "./PointTele";



const Input = {};

export enum State{
    STAND = 1,
    ATTACK = 2,
}

export enum AttackState{
    NONE = 0, 
    KTHUNDER = 1, 
    LTHUNDER = 2,
    SHIELD = 3,
}

export enum AnimationState{
    IDLE = 'idle',
    RUN = 'run',
    ATTACK = 'sword_attack',
    THUNDER = 'thunder',
    DEAD = 'deadplayer',
    HIT = 'plhit',
    JUMP = 'jump',
    HEAL = 'heal',
    SHIELD = 'shield',
}

export enum Artifact{
    KEY = 1,
}

export enum LocalStorage{
    ARTIFACTKEY = 'artifactKey',
}

export enum Group{
    CHECKPOINT = 'checkpoint',
    WALLS = 'walls',
    ENEMY = 'enemy',
    ARTIFACT = 'Artifact',
}

export enum EnemySkillTag{
    SLIMEATTACK = 1,
    BALLFIRE = 2,
    ARROW = 3,
    EXPLOSION = 4,
    AIRARROW = 5,
    BLUEFIRE = 6,
    AIRBLADE = 7,
    SCORPIONAT = 8,
    KARKINOSAT = 9,
    TRIDENT = 10,
    TRIDENTAT = 11,
    TIAMAT = 12,
    TIAMATU = 13,
}

export enum CheckpointTag{
    FIREBALLLEFT = 1,
    FIREBALLRIGHT = 2,
    ENEMYGREEN = 3,
    DRYADSARROWLEFT = 4,
    DRYADSARROWRIGHT = 5,
    SEAMERMAID = 6,
    LEAFENATTACKLEFT = 8,
    NOVUSATTACKLEFT = 9,
    NOVUSATTACKRIGHT = 11,
    FIRE1 = 12,
    FIRE2 = 13,
    FIRE3 = 14,
    CHECKGLYPHMAP2 = 15,
    BLUEFIREL = 16,
    BLUEFIRER = 17,
    ANUBISAPPEAR = 18,
    AIRBLADEAT = 19,
    SCORPION = 20,
    SCORPION2 = 21,
    POSEIDEN = 22,
    KARKINOS1 = 23,
    KARKINOS2 = 24,
    SPELLPOSEIDONL = 25,
    SPELLPOSEIDONR = 26,
    POSEIDONATL = 27,
    POSEIDONATR = 28,
    LEAFENATTACKRIGHT = 29,
    TIAMATGA = 30,
    TIAMATSL = 31,
    TIAMATSK = 32,
    TIAMATTH = 33,
    TIAMATU = 34,
    POINTTELE = 35,
    CHECKAPPEARTIAMAT = 36,
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player2 extends cc.Component {

    _speed: number = 0;
    charState: number;
    attackState: number;
    on_the_ground: boolean;
    anim: string;
    jump_force: number;
    hp:number;
    is_death: boolean = false;
    pos_X_thunder: number = 0;
    scale_x_thunder_bird:number = 0;
    count: number = 0;
    // spellThunder: number = null;
    // spellBirdThunder: number = null;
    artifact: number = null;
    checkLevelKey:number = null;


    lv: cc.Vec2;
    sp: cc.Vec2;
    Rigid_Body: cc.RigidBody;


    @property(cc.Animation)
    heroAni: cc.Animation = null;

    @property(cc.Node)
    camera: cc.Node = null;

    @property(cc.Prefab)
    thunder:cc.Prefab = null;

    @property(cc.Prefab)
    thunderBird:cc.Prefab = null;

    @property(cc.Prefab)
    shield:cc.Prefab = null;

    @property(cc.Prefab)
    dialoguebox: cc.Prefab = null;

    @property(cc.Prefab)
    dialoguebox2: cc.Prefab = null;

    @property(cc.Prefab)
    supporter: cc.Prefab = null;

    sea_mermaid_dialogue: boolean = false;
    poseidon_dialogue: boolean = false;

    public static intance: Player2;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Player2.intance = this;


        this.heroAni = this.getComponent(cc.Animation);
        this.Rigid_Body = this.node.getComponent(cc.RigidBody);

        this._speed = 250;
        this.jump_force = 270000;
        this.sp = cc.v2(0,0);
        this.hp = 10;
        this.count = 0;
        // this.spellThunder = 4;
        // this.spellBirdThunder = 4;
        this.artifact = 0;
        this.checkLevelKey = 0;
        cc.sys.localStorage.setItem(LocalStorage.ARTIFACTKEY, this.artifact);

        this.charState = State.STAND;
        this.attackState = AttackState.NONE;

        this.heroAni.on('finished',this.onAnimationFinished,this);
        
        cc.systemEvent.on('keydown',this.onKeyDown,this);
        cc.systemEvent.on('keyup',this.onKeyUp,this);

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;

    }

    onKeyDown(event){
        Input[event.keyCode] = 1;
    }

    onKeyUp(event){
        Input[event.keyCode] = 0;
    }

    onAnimationFinished(event, data){
        if(data.name === AnimationState.THUNDER){
            this.charState = State.STAND;
            this.attackState = AttackState.NONE;
            // this.heroAni.play(AnimationState.IDLE);
        }

        if(data.name === AnimationState.ATTACK){
            this.charState = State.STAND;
            this.attackState = AttackState.NONE;
            // this.heroAni.play(AnimationState.IDLE);
        }

        if(data.name === AnimationState.SHIELD){
            this.charState = State.STAND;
            this.attackState = AttackState.NONE;
            // this.heroAni.play(AnimationState.IDLE);
        }

        if(data.name === AnimationState.JUMP){
            this.charState = State.STAND;
            this.heroAni.play(AnimationState.RUN);
        }

        if(data.name === AnimationState.HIT){
            this.charState = State.STAND;
            if(this.hp == 0 || this.hp < 0){
                this.node.pauseAllActions();
                this.is_death = true;
                this.heroAni.play(AnimationState.DEAD);
                this.scheduleOnce(function(){
                    this.node.destroy();
                    GameManager.instance.returnLevel();
                },2)

            }
        }

    }

    onBeginContact(contact, selfCollider, otherCollider){
        if(selfCollider.tag === 2){
            this.on_the_ground = true;
        }
    }

    onCollisionEnter(other,self){

        // if(other.node.group === Group.CHECKPOINT && other.tag === EnemySkillTag.SLIMEATTACK){
        //     Slime.intance.attack(true);
        //     console.log('slime');
        // }
        
        if(other.node.group === Group.ENEMY && other.tag === EnemySkillTag.BALLFIRE){
            this.hp--;
            this.heroAni.play(AnimationState.HIT);
            console.log(this.hp);
            this.setAni(AnimationState.IDLE);
        }

        if(other.node.group === Group.ENEMY && other.tag === EnemySkillTag.ARROW){
            this.hp--;
            this.heroAni.play(AnimationState.HIT);
            console.log(this.hp);
            this.setAni(AnimationState.IDLE);
        }

        if(other.node.group === Group.ENEMY && other.tag === EnemySkillTag.EXPLOSION){
            this.hp--;
            this.heroAni.play(AnimationState.HIT);
            console.log(this.hp);
            this.setAni(AnimationState.IDLE);
        }

        if(other.node.group === Group.ENEMY && other.tag === EnemySkillTag.AIRARROW){
            this.hp--;
            this.heroAni.play(AnimationState.HIT);
            this.setAni(AnimationState.IDLE);    
        }

        if(other.node.group === Group.ENEMY && other.tag === EnemySkillTag.BLUEFIRE){
            this.hp--;
            this.heroAni.play(AnimationState.HIT);
            this.setAni(AnimationState.IDLE);    
        }

        if(other.node.group === Group.ENEMY && other.tag === EnemySkillTag.AIRBLADE){
            this.hp--;
            this.heroAni.play(AnimationState.HIT);
            console.log(this.hp);
            this.setAni(AnimationState.IDLE);
        }

        if(other.node.group === Group.ENEMY && other.tag === EnemySkillTag.SCORPIONAT){
            this.hp--;
            this.heroAni.play(AnimationState.HIT);
            console.log(this.hp);
            this.setAni(AnimationState.IDLE);
        }

        if(other.node.group === Group.ENEMY && other.tag === EnemySkillTag.KARKINOSAT){
            this.hp--;
            this.heroAni.play(AnimationState.HIT);
            console.log(this.hp);
            this.setAni(AnimationState.IDLE);
        }

        if(other.node.group === Group.ENEMY && other.tag === EnemySkillTag.TRIDENT){
            this.hp--;
            this.heroAni.play(AnimationState.HIT);
            console.log(this.hp);
            this.setAni(AnimationState.IDLE);
        }

        if(other.node.group === Group.ENEMY && other.tag === EnemySkillTag.TRIDENTAT){
            this.hp--;
            this.heroAni.play(AnimationState.HIT);
            console.log(this.hp);
            this.setAni(AnimationState.IDLE);
        }

        if(other.node.group === Group.ENEMY && other.tag === EnemySkillTag.TIAMAT){
            this.hp--;
            this.heroAni.play(AnimationState.HIT);
            console.log(this.hp);
            this.setAni(AnimationState.IDLE);
        }

        if(other.node.group === Group.ENEMY && other.tag === EnemySkillTag.TIAMATU){
            this.hp--;
            this.heroAni.play(AnimationState.HIT);
            console.log(this.hp);
            this.setAni(AnimationState.IDLE);
        }

        if(other.node.group === Group.ARTIFACT && other.tag === Artifact.KEY){
            this.artifact++;
            cc.sys.localStorage.setItem(LocalStorage.ARTIFACTKEY, this.artifact);
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.FIREBALLLEFT){
            DragonChild.instance.throwFireBallPlayer(true);
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.FIREBALLRIGHT){
            DragonChild.instance.throwFireBallPlayer(false);
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.ENEMYGREEN){
            EnemyGreen.instance.attack(true);
            console.log('enemy');
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.DRYADSARROWLEFT){
            DryadsArcher.instance.throwArrowPlayer(true);
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.DRYADSARROWRIGHT){
            DryadsArcher.instance.throwArrowPlayer(false);
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.SEAMERMAID){
            SeaMermaid.instance.appearMermaid(true);

            this.scheduleOnce(function(){
                SeaMermaid.instance.appearStone();
            },4);
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.LEAFENATTACKLEFT){
            Leafen.instance.arrowAttackLeft();
            console.log('leafenLeft');
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.LEAFENATTACKRIGHT){
            Leafen.instance.arrowAttackRight();
            console.log('leafenRight');
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.NOVUSATTACKLEFT){
            this.count++;
            if(this.count % 2 === 0){
                Novus.instance.comboAttackLeft(this.count);
            }
            else{
                Novus.instance.attackLeft(true);
            }
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.NOVUSATTACKRIGHT){
            this.count++;
            if(this.count % 2 === 0){
                Novus.instance.comboAttackRIght(this.count);
            }
            else
                Novus.instance.attackRight(false);
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.BLUEFIREL){
            MageShroom.instance.attackLeft(true);
            console.log("bluefl");
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.BLUEFIRER){
            MageShroom.instance.attackRight(true);
            console.log("bluefl");
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.FIRE1){
            let _artifact = cc.sys.localStorage.getItem(LocalStorage.ARTIFACTKEY);
            let pos = this.node.getPosition();
            if(_artifact > 0){
                cc.tween(this.node)
                .to(1,{position: new cc.Vec3(pos.x,pos.y+150,0)})
                .start();

                Glyph.instance.appearGlyh1();
                // ManagerScene03.intance.appearGlyh1();

                this.checkLevelKey+=1;
                _artifact--;
                cc.sys.localStorage.setItem(LocalStorage.ARTIFACTKEY, _artifact);
            }
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.FIRE2){
            let _artifact = cc.sys.localStorage.getItem(LocalStorage.ARTIFACTKEY);
            let pos = this.node.getPosition();
            if(_artifact > 0){
                cc.tween(this.node)
                .to(1,{position: new cc.Vec3(pos.x,pos.y+150,0)})
                .start();

                Glyph.instance.appearGlyh2();
                // ManagerScene03.intance.appearGlyh2();

                _artifact--;
                cc.sys.localStorage.setItem(LocalStorage.ARTIFACTKEY, _artifact);
            }
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.FIRE3){
            let _artifact = cc.sys.localStorage.getItem(LocalStorage.ARTIFACTKEY);
            let pos = this.node.getPosition();
            if(_artifact > 0){
                cc.tween(this.node)
                .to(1,{position: new cc.Vec3(pos.x,pos.y+150,0)})
                .start();

                Glyph.instance.appearGlyh3();
                // ManagerScene03.intance.appearGlyh3();

                _artifact--;
                cc.sys.localStorage.setItem(LocalStorage.ARTIFACTKEY, _artifact);

                // ManagerScene03.intance.appearStone();
                Glyph.instance.appearStone();
            }
        }

        if(other.node.group == Group.CHECKPOINT && other.tag === CheckpointTag.CHECKGLYPHMAP2){
            GlyphMap2.instance.appear();
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.ANUBISAPPEAR){
            // cc.director.pause();
            Anubis.instance.appearAnubis(true);
            // cc.director.resume();
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.AIRBLADEAT){
            Anubis.instance.attackAirBlade(true);
            console.log("airblade");
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.SCORPION){
            Scorpion.instance.attackLeft(true);
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.SCORPION2){
            Scorpion.instance.attackRight(true);
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.POSEIDEN){
            Poseidon.instance.appearDialogue(true);
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.KARKINOS1){
            Karkinos.instance.attackB(true);
            console.log("attackB");
        }

        
        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.KARKINOS2){
            Karkinos.instance.attackD(true);
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.SPELLPOSEIDONL){
            Poseidon.instance.spellAttackl(true);
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.SPELLPOSEIDONR){
            Poseidon.instance.spellAttackr(true);
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.POSEIDONATL){
            Poseidon.instance.attackTridentL(true);
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.POSEIDONATR){
            Poseidon.instance.attackTridentR(true);
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.TIAMATGA){
            Tiamat.instance.attackGauntlet(true);
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.TIAMATSL){
            Tiamat.instance.attackSlash(true);
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.POINTTELE){
            PointTele.instance.telePlay();
            this.scheduleOnce(function(){
                this.setAni(AnimationState.HEAL);
                this.node.active = false;
                this.node.setPosition(36,134);
                PointTele.instance.levelUp();
                GameManager.instance.OnFinishLevel();
            },1.5);
        }

        if(other.node.group === Group.CHECKPOINT && other.tag === CheckpointTag.CHECKAPPEARTIAMAT){
            Tiamat.instance.appearTiamatBoss(true);
        }


    }

    onDestroy(): void {
        cc.systemEvent.off('keydown',this.onKeyDown,this);
        cc.systemEvent.off('keyup',this.onKeyUp,this);
        // this.heroAni.off('finished',this.onAnimationFinished,this);
    }

    setAni(_anim){
        if(this.anim == _anim) return;

        this.anim = _anim;
        this.heroAni.play(this.anim);
    }

    thunderStrike(pos){
        let _pos = this.node.getPosition();
        _pos.x += pos;
        let thunder_prefab = cc.instantiate(this.thunder);
        thunder_prefab.parent = this.node.parent;
        thunder_prefab.setPosition(_pos);
        console.log('thunder');
    }

    thunderBirdStrike(pos){
        let _pos = this.node.getPosition();
        _pos.x += pos;
        let thunderBird_prefab = cc.instantiate(this.thunderBird);
        thunderBird_prefab.parent = this.node.parent;
        thunderBird_prefab.setPosition(_pos);
        thunderBird_prefab.scale = pos;
        let posStrike = this.node.getPosition();
        if(pos > 0){
            posStrike.x += 350;
            cc.tween(thunderBird_prefab)
            .to(1,{position: new cc.Vec3(posStrike.x,posStrike.y,0)},{easing:'quartOut'})
            .start();
        }
        else{
            posStrike.x -= 350;
            cc.tween(thunderBird_prefab)
            .to(1,{position: new cc.Vec3(posStrike.x,posStrike.y,0)},{easing:'quartOut'})
            .start();
        }
        console.log('birdthunder');
    }

    movePlayer(){

        this.lv = this.Rigid_Body.linearVelocity;

        if(Input[cc.macro.KEY.left] || Input[cc.macro.KEY.a]){
            this.node.getChildByName('heal').setPosition(2030,1150);
            this.node.getChildByName('heallabel').setPosition(1912,1148);
            this.node.getChildByName('healNum').setPosition(1813,1146);
            this.node.getChildByName('healNum').scaleX = -1;
            this.node.getChildByName('key').setPosition(1495,1157);
            this.node.getChildByName('key').scaleX = -1;
            this.node.getChildByName('key').angle = -37;
            this.node.getChildByName('keylabel').setPosition(1395,1155);
            this.node.getChildByName('keyNum').setPosition(1310,1150);
            this.node.getChildByName('keyNum').scaleX = -1;

            this.sp.x = -1;
            this.node.scaleX = -0.3;
            this.node.getComponent(cc.PhysicsBoxCollider).size.width = 63.5;
            this.node.getComponent(cc.PhysicsBoxCollider).size.height = 12.3;
            this.node.getComponent(cc.PhysicsBoxCollider).offset.x = -17.5;
            this.node.getComponent(cc.PhysicsBoxCollider).offset.y = -179.3;
            this.setAni(AnimationState.RUN);
            this.pos_X_thunder = -250;
            this.scale_x_thunder_bird = -1;
        }
        else if (Input[cc.macro.KEY.right] || Input[cc.macro.KEY.d]){
            this.node.getChildByName('heal').setPosition(-2030,1150);
            this.node.getChildByName('heallabel').setPosition(-1912,1148);
            this.node.getChildByName('healNum').setPosition(-1813,1146);
            this.node.getChildByName('healNum').scaleX = 1;
            this.node.getChildByName('key').setPosition(-1495,1157);
            this.node.getChildByName('key').scaleX = 1;
            this.node.getChildByName('key').angle = 37;
            this.node.getChildByName('keylabel').setPosition(-1395,1155);
            this.node.getChildByName('keyNum').setPosition(-1310,1150);
            this.node.getChildByName('keyNum').scaleX = 1;

            this.sp.x = 1;
            this.node.scaleX = 0.3;
            this.node.getComponent(cc.PhysicsBoxCollider).size.width = 63.5;
            this.node.getComponent(cc.PhysicsBoxCollider).size.height = 12.3;
            this.node.getComponent(cc.PhysicsBoxCollider).offset.x = -54.5;
            this.node.getComponent(cc.PhysicsBoxCollider).offset.y = -179.3;
            this.setAni(AnimationState.RUN);
            this.pos_X_thunder = 250;
            this.scale_x_thunder_bird = 1;
        }
        else{
            this.sp.x = 0;
            this.setAni(AnimationState.IDLE);
        }

        if(Input[cc.macro.KEY.up] || Input[cc.macro.KEY.w] || Input[cc.macro.KEY.space]){
            this.heroAni.play(AnimationState.JUMP);
            if(this.on_the_ground){
                this.charState = State.STAND;
                this.Rigid_Body.applyForceToCenter(cc.v2(0,this.jump_force), true);
                this.on_the_ground = false;
            }
        }

        if(Input[cc.macro.KEY.h]){
            this.charState = State.STAND;
            // this.heroAni.play(AnimationState.TELEIN);
            let pos = this.node.getPosition();
            if(this.node.scaleX == -0.3){
                this.node.setPosition(pos.x-30, pos.y);
            }
            else{
                this.node.setPosition(pos.x+30, pos.y);
            }
            // this.heroAni.play(AnimationState.TELEOUT);
        }

        if(this.sp.x){
            this.lv.x = this.sp.x * this._speed;
        }
        else{
            this.lv.x = 0;
        }

        this.Rigid_Body.linearVelocity = this.lv;

    }

    start () {

    }

    returnLevelPlayer(){
        // this.node.pauseSystemEvents(false);
        this.hp = 10;
        this.node.active = false;
        this.node.setPosition(36,134);
    }

    update (dt) {
        if(this.hp == 0 || this.hp < 0){
            // this.node.pauseSystemEvents(true);
            // this.heroAni.play(AnimationState.DEAD);
            if(GameManager.instance.loadState == 0){
                this.returnLevelPlayer();
                this.scheduleOnce(function(){
                    GameManager.instance.returnLevel();
                },0.5);
            }
        }

        this.node.getChildByName('healNum').getComponent(cc.Label).string = this.hp.toString();
        this.node.getChildByName('keyNum').getComponent(cc.Label).string = this.artifact.toString();

        switch(this.charState){
            case State.STAND: {

                if(Input[cc.macro.KEY.j]){
                    this.charState = State.ATTACK;
                }

                if(Input[cc.macro.KEY.k]){
                    this.charState = State.ATTACK;
                }

                if(Input[cc.macro.KEY.l]){
                    this.charState = State.ATTACK;
                }

                if(Input[cc.macro.KEY.m]){
                    this.charState = State.ATTACK;
                }

                if(Input[cc.macro.KEY.g]){
                    this.charState = State.ATTACK;
                }
                
                break;
            }
        }

        if(this.charState == State.ATTACK){
            if(Input[cc.macro.KEY.j]){
                if(this.attackState == AttackState.NONE){
                    this.setAni(AnimationState.ATTACK);
                    this.node.getComponent(cc.BoxCollider).size.width = 330;
                    this.node.getComponent(cc.BoxCollider).offset.x = 75;
                    this.node.getComponent(cc.BoxCollider).tag = 5;
    
                    this.scheduleOnce(function(){
                        this.node.getComponent(cc.BoxCollider).size.width = 60;
                        this.node.getComponent(cc.BoxCollider).offset.x = 0;
                        this.node.getComponent(cc.BoxCollider).tag = 0;
                    },0.75)
                }
            }

            if(Input[cc.macro.KEY.k]){
                if(this.attackState == AttackState.NONE){
                    // if(this.spellThunder > 0){
                        this.setAni(AnimationState.THUNDER);

                        this.scheduleOnce(function(){
                            this.thunderStrike(this.pos_X_thunder);
                        },0.75)
                        this.attackState = AttackState.KTHUNDER;
                        console.log('kthunder')
                        // this.spellThunder -= 1;
                    // }
                    // else{
                    //     this.charState = State.STAND;
                    //     this.attackState = AttackState.NONE;
                    // }
                }
                // else
                //     return;
            }

            if(Input[cc.macro.KEY.l]){
                if(this.attackState == AttackState.NONE){
                    // if(this.spellBirdThunder > 0){
                        this.attackState = AttackState.LTHUNDER;
                        console.log('lthunder');
                        this.setAni(AnimationState.THUNDER);
                        this.scheduleOnce(function(){
                            this.thunderBirdStrike(this.scale_x_thunder_bird);
                        },0.75)
                        // this.spellBirdThunder -= 1;
                    // }
                    // else{
                    //     this.charState = State.STAND;
                    //     this.attackState = AttackState.NONE;
                    // }
                }
                // else
                //     return;
            }

            if(Input[cc.macro.KEY.g]){
                if(this.attackState == AttackState.NONE){

                    this.attackState = AttackState.SHIELD;
                    this.setAni(AnimationState.SHIELD);
                    let shield = cc.instantiate(this.shield);
                    shield.parent = this.node.parent;
                    let pos = this.node.getPosition();
                    if(this.node.scaleX == -0.3){
                        shield.scaleX = 1;
                        shield.setPosition(pos.x-50, pos.y);
                        this.scheduleOnce(function(){
                            shield.destroy();
                        },1);
                    }
                    else{
                        shield.scaleX = -1;
                        shield.setPosition(pos.x+50, pos.y);
                        this.scheduleOnce(function(){
                            shield.destroy();
                        },1);
                    }
                }
            }
        }

        if(this.charState != State.STAND){
            this.sp.x = 0;
        }
        else{
            if(this.charState == State.STAND){
                this.movePlayer();
            }
        }
    }
}
