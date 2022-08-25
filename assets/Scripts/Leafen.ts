
const {ccclass, property} = cc._decorator;

export enum AnimationState{
    IDLE = 'leafen',
    HIT = 'leafenhit',
    ATTACK = 'leafenat',
}

@ccclass
export default class DryadsArcher extends cc.Component {

    @property(cc.Animation)
    anim: cc.Animation = null;

    @property(cc.Prefab)
    arrow_prefab: cc.Prefab = null;

    hp:number = 0;

    is_death:boolean = false;

    @property(cc.Node)
    checkpoint_range: cc.Node = null;

    @property(cc.Node)
    checkpoint2range: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.hp = 2;
        this.anim = this.getComponent(cc.Animation);
        this.anim.on('finished',this.onAnimationFinished,this);
        this.anim.play(AnimationState.IDLE)
    }

    onAnimationFinished(event, data){
        if(data.name === AnimationState.HIT){
            if(this.hp == 0 || this.hp < 0){
                this.is_death = true;
                this.checkpoint_range.destroy();
                this.checkpoint2range.destroy();
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

    throwArrowPlayer(check:boolean){
        if(check){
            this.node.setScale(-0.5,0.5);
            this.anim.play(AnimationState.ATTACK);
            this.scheduleOnce(function(){
                this.arrowAttackLeft();
            },0.5)
            this.anim.play(AnimationState.IDLE);

        }
        else{
            this.node.setScale(0.5,0.5);
            this.anim.play(AnimationState.ATTACK);
            this.scheduleOnce(function(){
                this.arrowAttackRight();
            },0.5)
            this.anim.play(AnimationState.IDLE);
        }
    }

    arrowAttackLeft(){
        let _arrow_prefab = cc.instantiate(this.arrow_prefab);
        _arrow_prefab.parent = this.node.parent;
        let pos = this.node.getPosition();
        _arrow_prefab.scaleX = -1;
        _arrow_prefab.scaleY = 0.4;
        _arrow_prefab.setPosition(pos);
        pos.x -= 300;
        cc.tween(_arrow_prefab)
        .to(2,{position: new cc.Vec3(pos.x,pos.y,0)},{easing:'quartOut'})
        .start();
    }

    arrowAttackRight(){
        let _arrow_prefab = cc.instantiate(this.arrow_prefab);
        _arrow_prefab.parent = this.node.parent;
        let pos = this.node.getPosition();
        _arrow_prefab.setPosition(pos);
        _arrow_prefab.scaleX = 1;
        _arrow_prefab.scaleY = 0.4;

        _arrow_prefab.setPosition(pos);
        pos.x += 350;
        cc.tween(_arrow_prefab)
        .to(2,{position: new cc.Vec3(pos.x,pos.y,0)},{easing:'quartOut'})
        .start();
    }

    start () {

    }

    // update (dt) {}
}
