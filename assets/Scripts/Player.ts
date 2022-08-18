import DragonChild from "./DragonChild";
const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    Direction: number;
    Velocity_X_max: number;
    Rigid_Body: cc.RigidBody;
    walk_force: number;
    jump_force: number;
    on_the_ground: boolean;

    dragon_child: DragonChild = null;

    @property(cc.Animation)
    anim:cc.Animation = null;

    is_moving: boolean = false;
    is_hit: boolean;
    hp: number;

    // countCoin: number;



    onLoad () {
        this.dragon_child = cc.find('Canvas/dragonchild').getComponent(DragonChild);
        // this.countCoin = 0;
        this.hp = 3;

        //kích hoạt trình vật lý
        let physics = cc.director.getPhysicsManager();

        //active debugDrawPhysics

        // physics.enabled = true;
        // physics.debugDrawFlags = 1;

        // cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        
        //kích hoạt event key
        this.anim = this.getComponent(cc.Animation);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyPressed, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyReleased, this);

        //khởi tạo giá trị cho vật lý
        this.Direction = 0;
        this.Velocity_X_max = 200;
        this.Rigid_Body = this.node.getComponent(cc.RigidBody);
        this.walk_force = 4000;
        this.jump_force = 100000;
        this.on_the_ground = false;

        //kích hoạt va chạm
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;

    }

    onKeyPressed(event){
        let key_code = event.keyCode;

        switch(key_code){
            case cc.macro.KEY.left:
                this.anim.play('plrun');
                this.Direction = -1;

            break;
            case cc.macro.KEY.right:
                this.anim.play('plrun');
                this.Direction = 1;

            break;
            case cc.macro.KEY.up:
                if(this.on_the_ground){
                    console.log("up2");
                    this.Rigid_Body.applyForceToCenter(cc.v2(0,this.jump_force), true);
                    this.on_the_ground = false;
                }
            break;

            case cc.macro.KEY.space:
                this.anim.play('plat');
            break;
        }
    }

    onBeginContact(contact, selfCollider, otherCollider){
        if(selfCollider.tag === 2){
            this.on_the_ground = true;
        }
    }

    onKeyReleased(event){
        let key_code = event.keyCode;

        switch(key_code){
            case cc.macro.KEY.left:
            case cc.macro.KEY.right:
                this.Direction = 0;
                this.anim.play('plidle');
            break;
        }
    }

    onCollisionEnter(other){
        if(other.tag === 1){
            this.dragon_child.attack();
        }
    }

    update (dt) {

        if(this.Direction > 0 && this.Rigid_Body.linearVelocity.x < this.Velocity_X_max){
            this.Rigid_Body.applyForceToCenter(cc.v2(this.Direction*this.walk_force,0), true);
            this.node.setScale(0.7,0.7,0);
        }

        if(this.Direction < 0 && this.Rigid_Body.linearVelocity.x > -this.Velocity_X_max){
            this.Rigid_Body.applyForceToCenter(cc.v2(this.Direction*this.walk_force,0), true);
            this.node.setScale(-0.7,0.7,0);
        }
    }
}