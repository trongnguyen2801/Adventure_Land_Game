const {ccclass, property} = cc._decorator;

export enum AnimationState{
    IDLE = 'slimeidle',
    HIT = 'slimehit',
}

@ccclass
export default class Slime extends cc.Component {

    public static instance: Slime;
    @property(cc.Animation)
    anim:cc.Animation = null;

    @property(cc.Node)
    player:cc.Node = null;

    is_death:boolean = false;



    hp:number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Slime.instance = this;
        this.hp = 2;

        this.anim = this.getComponent(cc.Animation);
        this.anim.play(AnimationState.IDLE);
        this.anim.on('finished',this.onAnimationFinished,this);
    }

    onAnimationFinished(event, data){
        if(data.name === AnimationState.HIT){
            if(this.hp == 0 || this.hp < 0){
                this.is_death = true;
                this.node.destroy();
            }
        }
    };

    onCollisionEnter(other, self){
        if(other.node.group === 'player' && other.tag === 5){
            this.hp--;
            this.anim.play(AnimationState.HIT);
        }

        if(other.node.group === 'thunder' && other.tag === 35){
            this.hp = 0;
            this.anim.play(AnimationState.HIT);
            console.log('dieb');
        }

        if(other.node.group === 'thunder' && other.tag === 30){
            this.hp = 0;
            this.anim.play(AnimationState.HIT);
            console.log('die');
        }
    }

    attack(is_attack){
        if(is_attack){
            this.node.getChildByName('checkpointslime').destroy();
        }
        this.schedule(function(){
            this.anim.play(AnimationState.IDLE);
            let pos = this.player.getPosition();
            let nodePos = this.node.getPosition();

            if(nodePos.x < pos.x){
                this.node.scaleX = -0.6;
                cc.tween(this.node)
                .to(2,{position: new cc.Vec3(pos.x,-222,0)})
                .start();
            }
            else{
                this.node.scaleX = 0.6; 
                cc.tween(this.node) 
                .to(2,{position: new cc.Vec3(pos.x,-222,0)}) 
                .start();
            }
        },1);
    }
}
