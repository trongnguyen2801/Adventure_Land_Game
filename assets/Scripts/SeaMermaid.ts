import { State } from "./Player2";

export enum SeaMermaidState{
    NONE = 0,
    SUMMONSHIP = 1,
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class SeaMermaid extends cc.Component {

    @property(cc.Prefab)
    stone: cc.Prefab = null;

    @property(cc.Prefab)
    stone2: cc.Prefab = null;

    @property(cc.Node)
    dialogue: cc.Node = null;

    @property(cc.Animation)
    anim: cc.Animation = null;

    StateMermaid: number;

    public static intance: SeaMermaid;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.anim = this.getComponent(cc.Animation);
        this.StateMermaid = SeaMermaidState.NONE;
        SeaMermaid.intance = this;


    }

    appearMermaid(check){
        if(check){


            this.scheduleOnce(function(){
                this.node.opacity = 100;
            },0.5);
            this.scheduleOnce(function(){
                this.node.opacity = 200;
            },1);
            this.scheduleOnce(function(){
                this.node.opacity = 255;
            },1.25);

            this.scheduleOnce(function(){
                // var dialogue_prefab = cc.instantiate(this.dialogue);
                // this.dialogue.parent = this.node.parent;
                // let _pos = this.node.getPosition();
                // this.dialogue.setPosition(_pos.x-100, _pos.y-90);
                this.dialogue.active = true;
            },1.1);

            this.scheduleOnce(function(){
                this.dialogue.destroy();
            },6);
        }
    }

    appearStone(){
        if(this.StateMermaid == SeaMermaidState.NONE){
            this.StateMermaid = SeaMermaidState.SUMMONSHIP;
            this.node.scaleX = 0.7;
            this.anim.play('seamermaid');
            this.scheduleOnce(function(){
                let stone_prefab = cc.instantiate(this.stone);
                let stone_prefab2 = cc.instantiate(this.stone2);
                let stone_prefab3= cc.instantiate(this.stone);
                let stone_prefab4 = cc.instantiate(this.stone2);
                stone_prefab.parent = this.node.parent;
                stone_prefab2.parent = this.node.parent;
                stone_prefab3.parent = this.node.parent;
                stone_prefab4.parent = this.node.parent;
                let _pos = this.node.getPosition();
                stone_prefab.setPosition(_pos.x + 250,_pos.y);
                stone_prefab2.setPosition(_pos.x + 600,_pos.y+90);
                stone_prefab3.setPosition(_pos.x + 1350,_pos.y);
                stone_prefab4.setPosition(_pos.x + 970,_pos.y+60);
            },1)
            
            this.scheduleOnce(function(){
                this.anim.play('mermaididle');
            },2)
        }
    }

    // disappearMermaid(){
        
    // }

    start () {

    }

    // update (dt) {}
}
