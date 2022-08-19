const Input = {};

export enum State{
    STAND = 1,
    ATTACK = 2,
}

export enum AttackState{
    NONE = 0, 
    KTHUNDER = 1, 
    LTHUNDER = 2,
}

export enum AnimationState{
    IDLE = 'idle',
    RUN = 'plrun',
    TELEIN = 'teleport',
    TELEOUT = 'teleportout',
    ATTACK = 'att',
    DEAD = 'pldead',
    HIT = 'plhit',
}

export enum CheckpointTag{
    FIREBALLLEFT = 1,
    FIREBALLRIGHT = 2,
    ENEMYGREEN = 3,
    DRYADSARROWLEFT = 4,
    DRYADSARROWRIGHT = 5,
    SEAMERMAID = 6,
    SLIMEATTACK = 7,
    LEAFENATTACKLEFT = 8,
    BALLFIRE = 10,
}

import DragonChild from "./DragonChild";
import EnemyGreen from "./EnemyObGreen";
import DryadsArcher from "./DryadsArcher";
import SeaMermaid from "./SeaMermaid";
import Slime from "./Slime";
import Leafen from "./Leafen";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player2 extends cc.Component {

    _speed: number = 0;
    charState: number;
    attackState: number;
    on_the_ground: boolean;
    anim: string;
    jump_force: number;
    is_l_o_r: boolean = false;
    active_green_enemy: boolean = false;
    active_attack: boolean = false;
    hp:number;
    is_death: boolean = false;
    pos_X_thunder: number = 0;
    scale_x_thunder_bird:number = 0;

    dragon_child: DragonChild = null;
    enemy_green: EnemyGreen = null;
    enemy_green2: EnemyGreen = null;
    dryads_archer: DryadsArcher = null;
    sea_mermaid: SeaMermaid = null
    slime: Slime = null;
    leafen: Leafen = null;

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

    @property(cc.Node)
    dialoguebox: cc.Node = null;

    @property(cc.Node)
    scene01_node: cc.Node = null;

    @property(cc.Node)
    scene02_node: cc.Node = null;



    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let physics = cc.director.getPhysicsManager();

        this.dragon_child = cc.find('Canvas/scene01/dragonchild').getComponent(DragonChild);
        this.enemy_green = cc.find('Canvas/enemygreen').getComponent(EnemyGreen);
        this.dryads_archer = cc.find('Canvas/scene01/DryadsArcher').getComponent(DryadsArcher);
        this.sea_mermaid = cc.find('Canvas/scene01/SeaMermaid').getComponent(SeaMermaid);
        this.slime = cc.find('Canvas/slime').getComponent(Slime);
        this.leafen = cc.find("Canvas/scene02/leafen").getComponent(Leafen);

        //active debugDrawPhysics

        physics.enabled = true;
        physics.debugDrawFlags = 1;

        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;

        this.heroAni = this.getComponent(cc.Animation);
        this.Rigid_Body = this.node.getComponent(cc.RigidBody);

        this._speed = 200;
        this.jump_force = 100000;
        this.sp = cc.v2(0,0);
        this.hp = 4;

        this.charState = State.STAND;
        this.attackState = AttackState.NONE;
        this.heroAni.on('finished',this.onAnimationFinished,this);

        cc.systemEvent.on('keydown',this.onKeyDown,this);
        cc.systemEvent.on('keyup',this.onKeyUp,this);

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;

        cc.director.preloadScene("scene_01");

    }

    onKeyDown(event){
        Input[event.keyCode] = 1;
    }

    onKeyUp(event){
        Input[event.keyCode] = 0;
    }

    onAnimationFinished(event, data){
        if(data.name === 'att'){
            this.charState = State.STAND;
            this.setAni(AnimationState.ATTACK);
            this.attackState = AttackState.NONE;
        }

        if(data.name === AnimationState.HIT){
            if(this.hp == 0 || this.hp < 0){
                this.node.pauseAllActions();
                this.is_death = true;
                this.heroAni.play(AnimationState.DEAD);
                this.scheduleOnce(function(){
                    this.node.destroy();
                    cc.director.loadScene("scene_01");
                },1)

            }
        }
    }

    onBeginContact(contact, selfCollider, otherCollider){
        if(selfCollider.tag === 2){
            this.on_the_ground = true;
        }
    }

    onCollisionEnter(other,self){
        if(other.node.group == 'checkpoint' && other.tag === 1){
            this.is_l_o_r = true;
            this.dragon_child.throwFireBallPlayer(this.is_l_o_r);
        }

        if(other.node.group == 'checkpoint' && other.tag === 2){
            this.is_l_o_r = false;
            this.dragon_child.throwFireBallPlayer(this.is_l_o_r);
        }

        if(other.node.group == 'checkpoint' && other.tag === 3){
            this.active_green_enemy = true;
            this.enemy_green.attack(this.active_green_enemy);
            console.log('enemy');
        }

        if(other.node.group == 'checkpoint' && other.tag === 4){
            this.is_l_o_r = true;
            this.dryads_archer.throwArrowPlayer(this.is_l_o_r);
        }

        if(other.node.group == 'checkpoint' && other.tag === 5){
            this.is_l_o_r = false;
            this.dryads_archer.throwArrowPlayer(this.is_l_o_r);
        }

        if(other.node.group == 'checkpoint' && other.tag === 6){
            this.sea_mermaid.appearMermaid();
            this.scheduleOnce(function(){
                this.dialoguebox.active = true;
            },1);
        }

        if(other.node.group == 'checkpoint' && other.tag === 7){
            this.active_attack = true;
            this.slime.attack(this.active_attack);
            console.log('slime');
        }

        if(other.node.group == 'checkpoint' && other.tag === 8){
            this.leafen.arrowAttackLeft();
            console.log('leafen');
        }

        if(other.node.group == 'enemy' && other.tag === 10){
            this.hp--;
            this.heroAni.play(AnimationState.HIT);
            console.log(this.hp);
            this.setAni(AnimationState.IDLE);
        }

        if(other.node.group == 'enemy' && other.tag === 15){
            this.hp--;
            this.heroAni.play(AnimationState.HIT);
            console.log(this.hp);
            this.setAni(AnimationState.IDLE);
        }

        if(other.node.group == 'enemy' && other.tag === 20){
            this.hp--;
            this.heroAni.play(AnimationState.HIT);
            console.log(this.hp);
            this.setAni(AnimationState.IDLE);
        }

        if(other.node.group == 'enemy' && other.tag === 6 && self.tag ==0){
            this.hp--;
            this.heroAni.play(AnimationState.HIT);
            console.log(this.hp);
            this.setAni(AnimationState.IDLE);
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
            posStrike.x += 250;
            cc.tween(thunderBird_prefab)
            .to(1,{position: new cc.Vec3(posStrike.x,posStrike.y,0)},{easing:'quartOut'})
            .start();
        }
        else{
            posStrike.x -= 250;
            cc.tween(thunderBird_prefab)
            .to(1,{position: new cc.Vec3(posStrike.x,posStrike.y,0)},{easing:'quartOut'})
            .start();
        }
        console.log('birdthunder');
    }

    movePlayer(){
        this.lv = this.Rigid_Body.linearVelocity;
        let anim = this.anim;
        let _scaleX = Math.abs(this.node.scaleX);

        if(Input[cc.macro.KEY.left] || Input[cc.macro.KEY.a]){
            this.sp.x = -1;
            this.node.scaleX = -_scaleX;
            this.setAni(AnimationState.RUN);
            this.pos_X_thunder = -150;
            this.scale_x_thunder_bird = -1;
        }
        else if (Input[cc.macro.KEY.right] || Input[cc.macro.KEY.d]){
            this.sp.x = 1;
            this.node.scaleX = _scaleX;
            this.setAni(AnimationState.RUN);
            this.pos_X_thunder = 150;
            this.scale_x_thunder_bird = 1;
        }
        else{
            this.sp.x = 0;
            this.setAni(AnimationState.IDLE);
        }

        if(Input[cc.macro.KEY.up] || Input[cc.macro.KEY.w]){
            if(this.on_the_ground){
                this.Rigid_Body.applyForceToCenter(cc.v2(0,this.jump_force), true);
                this.on_the_ground = false;
            }
        }

        if(Input[cc.macro.KEY.g]){
            this.sea_mermaid.appearShip();
            this.dialoguebox.destroy();
        }

        if(Input[cc.macro.KEY.h]){
            this.heroAni.play(AnimationState.TELEIN);
            let pos = this.node.getPosition();
            if(this.node.scaleX == -0.7){
                this.node.setPosition(pos.x-30, pos.y);
            }
            else{
                this.node.setPosition(pos.x+30, pos.y);
            }
            this.heroAni.play(AnimationState.TELEOUT);
            this.charState = State.STAND;
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

    update (dt) {

        if(this.hp == 0 || this.hp < 0){
            this.node.pauseAllActions();
            this.is_death = true;
            this.heroAni.play(AnimationState.DEAD);
            this.scheduleOnce(function(){
                this.node.destroy();
                cc.director.loadScene("scene_01");
            },1)
        }

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
                break;
            }
        }

        if(this.charState == State.ATTACK){
            if(Input[cc.macro.KEY.j]){
                if(this.attackState == AttackState.NONE){
                    this.setAni(AnimationState.ATTACK);
                    this.node.getComponent(cc.BoxCollider).size.width = 130;
                    this.node.getComponent(cc.BoxCollider).offset.x = 35;
                    this.node.getComponent(cc.BoxCollider).tag = 5;
    
                    this.scheduleOnce(function(){
                        this.node.getComponent(cc.BoxCollider).size.width = 60;
                        this.node.getComponent(cc.BoxCollider).offset.x = 0;
                        this.node.getComponent(cc.BoxCollider).tag = 0;
                    },0.7)
                }
            }

            if(Input[cc.macro.KEY.k]){
                if(this.attackState == AttackState.NONE){
                    this.attackState = AttackState.KTHUNDER;
                    console.log('kthunder')
                    this.setAni(AnimationState.ATTACK);
                    this.thunderStrike(this.pos_X_thunder);
                    // this.charState = State.stand;
                }
            }

            if(Input[cc.macro.KEY.l]){
                if(this.attackState == AttackState.NONE){
                    this.attackState = AttackState.LTHUNDER;
                    console.log('lthunder');
                    this.setAni(AnimationState.ATTACK);
                    this.thunderBirdStrike(this.scale_x_thunder_bird);
                    // this.charState = State.stand;
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
