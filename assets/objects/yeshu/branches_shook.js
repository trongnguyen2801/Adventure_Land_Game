

cc.Class({
    extends: cc.Component,

    properties: {
        material: {
            default: null,
            type: cc.Material
        },


        time: {
            default: 0
        },


        wind_num: {
            default: 1,
        },

        radian: {
            default: 0,
        },

        Flexibility: {
            default: 1,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.set_raotaion();

    },


    start() {
        this.material = this.node.getComponent(cc.Sprite).getMaterial(0);
    },

    update(dt) {
        this.time += dt;
        if (globalThis.WeatherManager) {

            this.wind_num = globalThis.WeatherManager.wind_num;
            
        }

        if (this.node.active && this.material != null) {

            this.radian = (this.node.angle) * Math.PI / 180;

            
            // this.material.setProperty("time", this.time);
            // this.material.setProperty("radian2", this.radian2);
            this.material.setProperty("wind_num", this.wind_num);
            this.material.setProperty("radian", this.radian);
            this.material.setProperty("Flexibility", this.Flexibility);

        }

        this.update_wind(dt);

    },

    // 树枝对风力值感受

    // 1.树枝角度变形
    set_raotaion: function () {
        // 记录树枝的角度
        this.angle = this.node.angle;
        if (this.angle < 0) {
            this.angle += 360;
        }

        this.time = Math.random() * 2;
    },

    // 2.根据风大小方向，动态抖动树叶角度，抖动树叶弯曲值1
    update_wind: function (dt) {

        this.time += dt;

        // 根据时间值,计算出sin规律
        var _num1 = Math.sin(this.time * (this.wind_num / 2));

        // 计算出偏移角度

        // if (this.wind_num > 0) {
        if (this.angle > 90 && this.angle < 270) {
            this.node.angle = this.angle + (this.wind_num * (_num1 + 1));
        } else {
            this.node.angle = this.angle - (this.wind_num * (_num1 + 1));
        }

        // }



        // if (this.wind_num < 0) {
        //     if (this.angle > 90 && this.angle < 270) {
        //         this.node.angle = this.angle + (this.wind_num * (_num1 + 1) * 2);
        //     } else {
        //         this.node.angle = this.angle - (this.wind_num * (_num1 + 1) * 2);
        //     }

        // }

        // 计算出偏移抖动值1
        this.material.setProperty("value_1", Math.abs(this.wind_num) * (_num1 + 1) * 0.02 + 0.1);


    }
});
