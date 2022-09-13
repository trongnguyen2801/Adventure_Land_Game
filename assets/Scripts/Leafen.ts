
const {ccclass, property} = cc._decorator;

export enum AnimationState{
    IDLE = 'leafen',
    HIT = 'leafenhit',
    ATTACK = 'leafenat',
    NONE = 'none',
}

@ccclass
export default class Leafen extends cc.Component {

    @property(cc.Animation)
    anim: cc.Animation = null;

    public static instance: Leafen;

    @property(cc.Prefab)
    arrow_prefab: cc.Prefab = null;

    @property(cc.Node)
    cpleft:cc.Node = null;

    @property(cc.Node)
    cpright:cc.Node = null;

    @property(cc.Prefab)
    key:cc.Prefab = null;

    hp:number = 0;

    is_death:boolean = false;

    animState:string = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Leafen.instance = this;
        this.hp = 3;
        this.animState = AnimationState.NONE;
        this.anim = this.getComponent(cc.Animation);
        this.anim.on('finished',this.onAnimationFinished,this);
        this.anim.play(AnimationState.IDLE)
    }

    onAnimationFinished(event, data){
        if(data.name === AnimationState.HIT){
            if(this.hp == 0 || this.hp < 0){
                this.spawnKey(1);
                this.is_death = true;
                this.cpleft.destroy();
                this.cpright.destroy();
                this.node.destroy();
            }
        }

        if(data.name === AnimationState.ATTACK){
            this.animState = AnimationState.NONE;
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

    spawnKey(i){
        let key = cc.instantiate(this.key);
        key.parent = this.node.parent;
        let pos = this.node.getPosition();
        pos.x+= 20;
        pos.y += 20;
        key.setPosition(pos);
    }

    arrowAttackLeft(){
        if(this.animState == AnimationState.NONE){
            this.animState = AnimationState.ATTACK;

            if(this.node.scaleX < 0){
                this.node.scaleX = 0.5;
            }

            let _arrow_prefab = cc.instantiate(this.arrow_prefab);
            _arrow_prefab.parent = this.node.parent;
            let pos = this.node.getPosition();
            _arrow_prefab.scaleX = -1;
            _arrow_prefab.scaleY = 0.4;
            this.anim.play(AnimationState.ATTACK);

            _arrow_prefab.setPosition(pos);
            pos.x -= 350;
    
            
            cc.tween(_arrow_prefab)
            .to(2,{position: new cc.Vec3(pos.x,pos.y,0)},{easing:'quartOut'})
            .start();
        }
    }

    arrowAttackRight(){

        if(this.animState == AnimationState.NONE){
            this.animState = AnimationState.ATTACK;

            if(this.node.scaleX > 0){
                this.node.scaleX = -0.5;
            }

            let _arrow_prefab = cc.instantiate(this.arrow_prefab);
            _arrow_prefab.parent = this.node.parent;
            let pos = this.node.getPosition();
            _arrow_prefab.scaleX = 1;
            _arrow_prefab.scaleY = 0.4;
            this.anim.play(AnimationState.ATTACK);
    
            _arrow_prefab.setPosition(pos);
            pos.x += 350;
    
            
            cc.tween(_arrow_prefab)
            .to(2,{position: new cc.Vec3(pos.x,pos.y,0)},{easing:'quartOut'})
            .start();
        }

    }

    start () {

    }

    // update (dt) {}
}
