
const {ccclass, property} = cc._decorator;

export enum AnimationState{
    ATTACK = 'dragonchildat',
    HIT = 'dragonhit',
    IDLE = 'dragonchildidle',
}


@ccclass
export default class DragonChild extends cc.Component {

    @property(cc.Animation)
    anim: cc.Animation = null;

    @property(cc.Prefab)
    fire_ball: cc.Prefab = null;

    hp:number = 0;

    is_death:boolean = false;

    @property(cc.Node)
    checkpoint: cc.Node = null;

    @property(cc.Node)
    checkpoint2: cc.Node = null;

    public static intance: DragonChild;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        DragonChild.intance = this;
        this.hp = 2;
        this.anim.play(AnimationState.IDLE);
        this.anim = this.getComponent(cc.Animation);
        this.anim.on('finished',this.onAnimationFinished,this);
    }

    onAnimationFinished(event, data){
        if(data.name === AnimationState.HIT){
            if(this.hp == 0 || this.hp < 0){
                this.is_death = true;
                this.checkpoint.destroy();
                this.checkpoint2.destroy();
                this.node.destroy();
            }
        }
    }

    onCollisionEnter(other, self){
        if(other.node.group === 'player' && other.tag === 5){
            this.hp--;
            this.anim.play(AnimationState.HIT);
        }

        if(other.node.group === 'thunder' && other.tag === 35){
            this.hp = 0;
            this.anim.play(AnimationState.HIT);
        }

        if(other.node.group === 'thunder' && other.tag === 30){
            this.hp = 0;
            this.anim.play(AnimationState.HIT);
        }
    }

    
    throwFireBallPlayer(check:boolean){
        // if(this.player.is_throwbomb){
            if(check){
                this.node.setScale(-1.5,1.5);
                this.anim.play(AnimationState.ATTACK);
                this.scheduleOnce(function(){
                    this.fireBallAttackLeft();
                },0.5)
            }
            else{
                this.node.setScale(1.5,1.5);
                this.anim.play(AnimationState.ATTACK);
                this.scheduleOnce(function(){
                    this.fireBallAttackRight();
                },0.5)
            }

            // this.anim2.play('idlebomb');
        // }
    }

    fireBallAttackLeft(){
        let fire_ball_prefab = cc.instantiate(this.fire_ball);
        fire_ball_prefab.parent = this.node.parent;
        let pos = this.node.getPosition();
        fire_ball_prefab.scale = -1;
        fire_ball_prefab.setPosition(pos);
        pos.x -= 300;
        cc.tween(fire_ball_prefab)
        .to(1,{position: new cc.Vec3(pos.x,pos.y+20,0)},{easing:'quartOut'})
        .start();
    }

    fireBallAttackRight(){
        let fire_ball_prefab = cc.instantiate(this.fire_ball);
        fire_ball_prefab.parent = this.node.parent;
        let pos = this.node.getPosition();
        fire_ball_prefab.setPosition(pos);
        fire_ball_prefab.scale = 1;
        fire_ball_prefab.setPosition(pos);
        pos.x += 350;
        cc.tween(fire_ball_prefab)
        .to(1,{position: new cc.Vec3(pos.x,pos.y+20,0)},{easing:'quartOut'})
        .start();
    }

    start () {

    }

    // update (dt) {}
}
