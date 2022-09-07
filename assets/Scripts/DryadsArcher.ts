
export enum AnimationState{
    DRYADSIDLE = 'dryadsidle',
    DRYADSHIT = 'dryadshit',
    ARCHERATTACK = 'archerat',

}

const {ccclass, property} = cc._decorator;

@ccclass
export default class DryadsArcher extends cc.Component {

    @property(cc.Animation)
    anim: cc.Animation = null;

    @property(cc.Prefab)
    arrow_prefab: cc.Prefab = null;

    hp:number = 0;

    is_death:boolean = false;

    @property(cc.Node)
    checkpoint: cc.Node = null;

    @property(cc.Node)
    checkpoint2: cc.Node = null;

    public static intance; DryadsArcher;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        DryadsArcher.intance = this;
        this.hp = 2;
        this.anim = this.getComponent(cc.Animation);
        this.anim.on('finished',this.onAnimationFinished,this);
        this.anim.play(AnimationState.DRYADSIDLE)
    }

    onAnimationFinished(event, data){
        if(data.name === AnimationState.DRYADSHIT){
            if(this.hp == 0 || this.hp < 0){
                this.is_death = true;
                this.checkpoint.destroy();
                this.checkpoint2.destroy();
                this.node.destroy();
            }
        }

        if(data.name === AnimationState.ARCHERATTACK){
            this.anim.play(AnimationState.DRYADSIDLE);
        }
    }

    onCollisionEnter(other, self){
        if(other.node.group === 'player' && other.tag === 5){
            this.hp--;
            this.anim.play(AnimationState.DRYADSHIT);
        }

        if(other.node.group === 'thunder' && other.tag === 35){
            this.hp = 0;
            this.anim.play(AnimationState.DRYADSHIT);
        }

        if(other.node.group === 'thunder' && other.tag === 30){
            this.hp = 0;
            this.anim.play(AnimationState.DRYADSHIT);
        }
    }

    throwArrowPlayer(check:boolean){
        if(check){
            this.node.setScale(-0.4,0.4);
            this.scheduleOnce(function(){
                this.arrowAttackLeft();
            },0.5)
            this.anim.play(AnimationState.ARCHERATTACK);
            
        }
        else{
            this.node.setScale(0.4,0.4);
            this.scheduleOnce(function(){
                this.arrowAttackRight();
            },0.5)
            this.anim.play(AnimationState.ARCHERATTACK);
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
        .to(1,{position: new cc.Vec3(pos.x,pos.y,0)},{easing:'quartOut'})
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
        .to(1,{position: new cc.Vec3(pos.x,pos.y,0)},{easing:'quartOut'})
        .start();
    }


    start () {

    }

    // update (dt) {}
}
