
const {ccclass, property} = cc._decorator;

export enum AnimationState{
    HIT = 'mageshroomhit',
    IDLE = 'mageshroomidle',
    ATTACK = 'mageshroomattack',
}

@ccclass
export default class MageShroom extends cc.Component {

    @property(cc.Prefab)
    bluefire: cc.Prefab = null;

    hp: number = null;

    @property(cc.Animation)
    anim: cc.Animation = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.anim = this.getComponent(cc.Animation);
        this.anim.play(AnimationState.IDLE);
        this.hp = 4;
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

    attackLeft(check){
        if(check){
            if(this.node.scaleX < 0){
                this.node.scaleX = 0.6;
            }
            this.anim.play(AnimationState.ATTACK);
            this.scheduleOnce(function(){
                let blurefire_prefab = cc.instantiate(this.bluefire);
                blurefire_prefab.parent = this.node.parent;
                let pos = this.node.getPosition();
                blurefire_prefab.setPosition(pos);
                pos.x -= 300;
                cc.tween(blurefire_prefab)
                .to(1,{position: new cc.Vec3(pos.x,pos.y,100)},{easing:'quartOut'})
                .start();
            },0.5);

            this.scheduleOnce(function(){
                this.anim.play(AnimationState.IDLE);
            },0.5);
        }
    }

    attackRight(check){
        if(check){
            this.node.scaleX = -0.6;
            this.anim.play(AnimationState.ATTACK);
            this.scheduleOnce(function(){
                let blurefire_prefab = cc.instantiate(this.bluefire);
                blurefire_prefab.scaleX = -1;
                blurefire_prefab.parent = this.node.parent;
                let pos = this.node.getPosition();
                blurefire_prefab.setPosition(pos);
                pos.x += 300;
                cc.tween(blurefire_prefab)
                .to(1,{position: new cc.Vec3(pos.x,pos.y,100)},{easing:'quartOut'})
                .start();
            },0.5);

            this.scheduleOnce(function(){
                this.anim.play(AnimationState.IDLE);
            },0.5);
        }
    }

    // update (dt) {}
}
