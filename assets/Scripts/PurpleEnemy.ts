
const {ccclass, property} = cc._decorator;

export enum AnimationState{
    FLY = 'purplefly',
    HIT = 'purplehit',

}

@ccclass
export default class PurpleEnemy extends cc.Component {

    @property(cc.Animation)
    anim: cc.Animation = null;

    @property(cc.Prefab)
    thunder_blue: cc.Prefab = null;

    hp:number = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.hp = 1;
        this.anim = this.getComponent(cc.Animation);
        this.anim.play(AnimationState.FLY);
    }

    start () {
        // if(this.hp ===0 || this.hp < 0 ){
        //     this.node.destroy();
        // }

        this.schedule(function(){
            cc.tween(this.node)
            .to(0.1,{scaleX: -0.3})
            .to(4,{position: new cc.Vec3(2262,280,0)})
            .to(0.1,{scaleX: 0.3})
            .to(4,{position: new cc.Vec3(2725,280,0)})
            .start();
        },8,20,0.1);

        this.schedule(function(){
            let _pos = this.node.getPosition();
            let thunder_blue_prefab = cc.instantiate(this.thunder_blue);
            thunder_blue_prefab.parent = this.node.parent;
            thunder_blue_prefab.setPosition(_pos);
            console.log('thunder');
        },1.5,50,0.1);
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

    update (dt) {
        if(this.hp === 0 || this.hp < 0){
            this.node.destroy();
        }
    }
}
