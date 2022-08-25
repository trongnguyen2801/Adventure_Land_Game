
const {ccclass, property} = cc._decorator;

export enum AnimationState{
    ATTACKSINGGLE = 'novusattack2',
    ATTACKCOMBO = 'novusattack',
    IDLE = 'novusidle',
    HIT = 'novushit',
}
@ccclass
export default class Novus extends cc.Component {

    @property(cc.Animation)
    anim: cc.Animation = null;

    hp:number = null;


    @property(cc.Prefab)
    iceArrow: cc.Prefab = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.anim = this.getComponent(cc.Animation);
        this.anim.play('novusidle');
        this.hp = 6;
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

    comboAttackLeft(num){
        if(num % 2 === 0){

            if(this.node.scaleX < 0){
                this.node.scaleX = 0.5;
            }

            this.anim.play(AnimationState.ATTACKCOMBO);
            this.scheduleOnce(function(){
                let iceArrow_pref = cc.instantiate(this.iceArrow);
                let iceArrow_pref2 = cc.instantiate(this.iceArrow);
                let iceArrow_pref3 = cc.instantiate(this.iceArrow);

                iceArrow_pref.parent = this.node.parent;
                iceArrow_pref2.parent = this.node.parent;
                iceArrow_pref3.parent = this.node.parent;

                let pos = this.node.getPosition();
                iceArrow_pref.scaleX = iceArrow_pref2.scaleX = iceArrow_pref3.scaleX = 0.5;
                iceArrow_pref.scaleY = iceArrow_pref2.scaleY = iceArrow_pref3.scaleY = 0.4;
                iceArrow_pref.setPosition(pos.x-20,pos.y+100);
                iceArrow_pref2.setPosition(pos.x+20,pos.y+100);
                iceArrow_pref3.setPosition(pos.x+40,pos.y+100);
                pos.x -= 450;
                pos.y -= 100;
                
                cc.tween(iceArrow_pref)
                .to(1.5,{position: new cc.Vec3(pos.x-20,pos.y,-100)},{easing:'quartOut'})
                .start();

                cc.tween(iceArrow_pref2)
                .to(1.5,{position: new cc.Vec3(pos.x+40,pos.y,-100)},{easing:'quartOut'})
                .start();

                cc.tween(iceArrow_pref3)
                .to(1.5,{position: new cc.Vec3(pos.x+60,pos.y,-100)},{easing:'quartOut'})
                .start();

                this.scheduleOnce(function(){
                    this.anim.play(AnimationState.IDLE);
                },0.5);

            },0.5);

        }
    }

    comboAttackRIght(num){
        if(num % 2 === 0){
            this.node.scaleX = -0.5;

            this.anim.play(AnimationState.ATTACKCOMBO);
            this.scheduleOnce(function(){
                let iceArrow_pref = cc.instantiate(this.iceArrow);
                let iceArrow_pref2 = cc.instantiate(this.iceArrow);
                let iceArrow_pref3 = cc.instantiate(this.iceArrow);

                iceArrow_pref.parent = this.node.parent;
                iceArrow_pref2.parent = this.node.parent;
                iceArrow_pref3.parent = this.node.parent;

                let pos = this.node.getPosition();
                iceArrow_pref.scaleX = iceArrow_pref2.scaleX = iceArrow_pref3.scaleX = -0.5;
                iceArrow_pref.scaleY = iceArrow_pref2.scaleY = iceArrow_pref3.scaleY = 0.4;
                iceArrow_pref.setPosition(pos.x-20,pos.y+100);
                iceArrow_pref2.setPosition(pos.x+20,pos.y+100);
                iceArrow_pref3.setPosition(pos.x+40,pos.y+100);
                pos.x += 400;
                pos.y -= 100;
                
                cc.tween(iceArrow_pref)
                .to(1.5,{position: new cc.Vec3(pos.x-20,pos.y,-100)},{easing:'quartOut'})
                .start();

                cc.tween(iceArrow_pref2)
                .to(1.5,{position: new cc.Vec3(pos.x+40,pos.y,-100)},{easing:'quartOut'})
                .start();

                cc.tween(iceArrow_pref3)
                .to(1.5,{position: new cc.Vec3(pos.x+60,pos.y,-100)},{easing:'quartOut'})
                .start();

                this.scheduleOnce(function(){
                    this.anim.play(AnimationState.IDLE);
                },0.5);

            },0.5);

        }
    }

    attackLeft(check){
        if(check){
            if(this.node.scaleX < 0){
                this.node.scaleX = 0.5;
            }
            this.anim.play(AnimationState.ATTACKSINGGLE);
            this.scheduleOnce(function(){
                let iceA_prefab = cc.instantiate(this.iceArrow);
                iceA_prefab.parent = this.node.parent;
                let pos = this.node.getPosition();
                iceA_prefab.scaleX = 0.5;
                iceA_prefab.scaleY = 0.4;
                iceA_prefab.setPosition(pos.x,pos.y+100);
                pos.x -= 450;
                pos.y -= 100;
                cc.tween(iceA_prefab)
                .to(1.5,{position: new cc.Vec3(pos.x,pos.y,-100)},{easing:'quartOut'})
                .start();
            },0.5);

            this.scheduleOnce(function(){
                this.anim.play(AnimationState.IDLE);
            },0.5);
        }
    }

    attackRight(check){
        if(!check){
            this.node.scaleX = -0.5;
            this.anim.play(AnimationState.ATTACKSINGGLE);
            this.scheduleOnce(function(){
                let iceAr_prefab = cc.instantiate(this.iceArrow);
                let scale = iceAr_prefab.scaleX;
                iceAr_prefab.parent = this.node.parent;
                let pos = this.node.getPosition();
                iceAr_prefab.scaleX = -0.5;
                iceAr_prefab.scaleY = 0.4;
                iceAr_prefab.setPosition(pos.x,pos.y+100);
                pos.x += 400;
                pos.y -= 100;
                cc.tween(iceAr_prefab)
                .to(1.5,{position: new cc.Vec3(pos.x,pos.y,-100)},{easing:'quartOut'})
                .start();
            },0.5)

            this.scheduleOnce(function(){
                this.anim.play(AnimationState.IDLE);
            },0.5);
        }
    }

    // update (dt) {}
}
