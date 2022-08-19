
// cc.Class({
//     extends: cc.Component,

//     properties: {
//         wind_num: 1,

//         wind_label: {
//             default: null,
//             type: cc.Label,
//             tooltip: "风力描述label"
//         }
//     },

//     // LIFE-CYCLE CALLBACKS:

//     onLoad() {

//         globalThis.WeatherManager = this;


//     },

//     start() {
//         this.schedule(function (){
//             this.wind_num = -1;
//         },1.5,50,1);
//     },

//     update(dt) {

//         // this.wind_label.string = "风力: " + this.wind_num;


//     },


//     // on_change_wind: function (slider, customEventData) {

//     //     this.wind_num = slider.progress * 10 - 5;

//     // }
// });
